# syntax=docker/dockerfile:1
# SentinelDesk Local: the triage worker and dashboard. The model runs in the separate Ollama service.
FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /app
COPY requirements.txt .
# Behind a TLS-inspecting corporate proxy, pass its CA at build time (never stored in the image):
#   docker build --secret id=ca,src=corporate-ca.pem -t sentineldesk:local .
RUN --mount=type=secret,id=ca,required=false \
    if [ -f /run/secrets/ca ]; then export PIP_CERT=/run/secrets/ca; fi; \
    pip install -r requirements.txt

COPY run.py ./
COPY sentineldesk_local ./sentineldesk_local
COPY sentineldesk.example.toml ./examples/sentineldesk.example.toml
COPY kb-example ./examples/kb-example

# Never run as root; /data holds sentineldesk.db and is the only writable path.
RUN useradd --system --uid 10001 --home-dir /data sentinel && mkdir -p /data /config && chown sentinel:sentinel /data
USER sentinel

ENV SENTINEL_DB=/data/sentineldesk.db \
    SENTINEL_HOST=0.0.0.0 \
    SENTINEL_ALLOW_NETWORK=1 \
    SENTINEL_PORT=8765
EXPOSE 8765
VOLUME ["/data"]

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 CMD ["python", "-m", "sentineldesk_local.healthcheck"]

CMD ["python", "run.py"]
