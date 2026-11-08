"""LangGraph wiring: the deterministic cyclic state machine.

    START
      │
      ▼
    retrieve_context ──► generate_sql ──┬─(error)────────────────────────► fail ──► END
                           ▲            ├─(unanswerable)─────────────────► format_response ──► END
                           │            ▼
                           │       validate_sql ──┬─(ok)──► execute_sql ──┬─(ok)──► format_response ──► END
                           │                      │                       │
                           ├──(static error, ≤2)──┘                       │
                           └──(runtime error, ≤2)─────────────────────────┘
                                         (retry budget exhausted) ──────────► fail ──► END

Routing is pure functions of state - no LLM decides control flow.
"""

from __future__ import annotations

from typing import Literal

from langgraph.graph import END, START, StateGraph
from langgraph.graph.state import CompiledStateGraph

from app.agent.nodes import AgentDeps, AgentNodes
from app.agent.state import AgentState


def route_after_generate(state: AgentState) -> Literal["validate_sql", "format_response", "fail"]:
    if state.get("error"):
        return "fail"
    if not state["draft"].answerable:
        return "format_response"
    return "validate_sql"


def make_route_after_validate(max_retries: int):  # type: ignore[no-untyped-def]
    def route(state: AgentState) -> Literal["execute_sql", "generate_sql", "fail"]:
        if state["validation"].ok:
            return "execute_sql"
        return "generate_sql" if state.get("static_retries", 0) <= max_retries else "fail"

    return route


def make_route_after_execute(max_retries: int):  # type: ignore[no-untyped-def]
    def route(state: AgentState) -> Literal["format_response", "generate_sql", "fail"]:
        if state["execution"].ok:
            return "format_response"
        return "generate_sql" if state.get("runtime_retries", 0) <= max_retries else "fail"

    return route


def build_graph(deps: AgentDeps) -> CompiledStateGraph:  # type: ignore[type-arg]
    nodes = AgentNodes(deps)
    g = StateGraph(AgentState)
    g.add_node("retrieve_context", nodes.retrieve_context)
    g.add_node("generate_sql", nodes.generate_sql)
    g.add_node("validate_sql", nodes.validate_sql)
    g.add_node("execute_sql", nodes.execute_sql)
    g.add_node("format_response", nodes.format_response)
    g.add_node("fail", nodes.fail)

    g.add_edge(START, "retrieve_context")
    g.add_edge("retrieve_context", "generate_sql")
    g.add_conditional_edges("generate_sql", route_after_generate)
    g.add_conditional_edges("validate_sql", make_route_after_validate(deps.config.max_static_retries))
    g.add_conditional_edges("execute_sql", make_route_after_execute(deps.config.max_runtime_retries))
    g.add_edge("format_response", END)
    g.add_edge("fail", END)
    return g.compile()
