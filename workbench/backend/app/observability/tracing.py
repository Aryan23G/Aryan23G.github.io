"""Observability: OpenTelemetry tracing for the agent loop.

Span tree for one run:

    agent.run                          question, outcome, retries, total tokens
    ├── agent.node.retrieve_context    tables selected, candidates
    ├── agent.node.generate_sql        attempt, trigger, gen_ai.usage.*
    │   └── anthropic.messages.create  (emitted by the Anthropic SDK itself)
    │       └── anthropic.model_request (emitted by the Anthropic API, when API tracing is on)
    ├── agent.node.validate_sql        ok, diagnostics
    ├── agent.node.generate_sql        attempt=2, trigger=static_error   <- self-correction cycle
    ├── ...
    ├── agent.node.execute_sql         rows, db latency, error type
    └── agent.node.format_response

Exporters (`QP_OTEL_EXPORTER`):
  * `otlp`      - any OTLP/HTTP backend. Langfuse ingests OTLP natively
                  (endpoint `https://<host>/api/public/otel`, Basic auth header),
                  as do Jaeger, Tempo, Honeycomb, Datadog...
  * `traceloop` - OpenLLMetry (Traceloop SDK) auto-instrumentation. It patches
                  the Anthropic SDK itself, so the SDK's native spans are turned
                  off to avoid duplicates (see `anthropic_otel_option`).
  * `console`   - print spans (local debugging).
  * `none`      - no-op tracer (default).
"""

from __future__ import annotations

from collections.abc import Iterator
from contextlib import contextmanager
from typing import Any

from opentelemetry import trace
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor, ConsoleSpanExporter, SimpleSpanProcessor
from opentelemetry.trace import Span, Status, StatusCode

from app.config import Settings

TRACER_NAME = "querypilot.agent"
_configured = False


def _parse_headers(raw: str | None) -> dict[str, str]:
    if not raw:
        return {}
    pairs = (item.split("=", 1) for item in raw.split(",") if "=" in item)
    return {k.strip(): v.strip() for k, v in pairs}


def configure_tracing(settings: Settings) -> None:
    """Register the global tracer provider once per process."""
    global _configured
    if _configured or settings.otel_exporter == "none":
        return
    if settings.otel_exporter == "traceloop":
        from traceloop.sdk import Traceloop  # optional dependency: pip install .[openllmetry]

        Traceloop.init(
            app_name=settings.otel_service_name,
            api_endpoint=settings.otel_endpoint or "https://api.traceloop.com",
            headers=_parse_headers(settings.otel_headers),
            disable_batch=False,
        )
    else:
        provider = TracerProvider(resource=Resource.create({"service.name": settings.otel_service_name}))
        if settings.otel_exporter == "console":
            provider.add_span_processor(SimpleSpanProcessor(ConsoleSpanExporter()))
        else:
            from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter

            endpoint = settings.otel_endpoint
            if endpoint and not endpoint.rstrip("/").endswith("/v1/traces"):
                endpoint = endpoint.rstrip("/") + "/v1/traces"
            provider.add_span_processor(BatchSpanProcessor(
                OTLPSpanExporter(endpoint=endpoint, headers=_parse_headers(settings.otel_headers))))
        trace.set_tracer_provider(provider)
    _configured = True


def anthropic_otel_option(settings: Settings) -> bool | dict[str, Any]:
    """Value for the Anthropic client's `open_telemetry` option.

    The SDK emits its own GenAI spans (nested under our node spans). When
    OpenLLMetry is active it instruments the SDK too, so native spans are off.
    """
    if settings.otel_exporter in ("none", "traceloop"):
        return False
    return {"traces": {"content_mode": "content" if settings.trace_content else "metadata_only"}}


def tracer() -> trace.Tracer:
    return trace.get_tracer(TRACER_NAME)


@contextmanager
def node_span(node: str, **attributes: Any) -> Iterator[Span]:
    """Span around one state-machine node; errors mark the span as failed."""
    with tracer().start_as_current_span(f"agent.node.{node}") as span:
        span.set_attribute("agent.node", node)
        for key, value in attributes.items():
            if value is not None:
                span.set_attribute(key, value)
        try:
            yield span
        except Exception as exc:
            span.record_exception(exc)
            span.set_status(Status(StatusCode.ERROR, str(exc)))
            raise
