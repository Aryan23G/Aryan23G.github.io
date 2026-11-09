"""Schema RAG index on Qdrant: select only the tables a question needs.

Retrieval pipeline (deterministic for a given index + question):

1. Vector search over TABLE and COLUMN documents.
2. Aggregate hits per table: best score, plus a small bonus for multiple
   matching columns (a table that matches on three attributes is more likely
   relevant than one that matches on one).
3. Lexical pinning: a table explicitly named in the question is always kept.
4. Keep the top-k tables scoring within `relative_cutoff` of the best table.
5. FK-neighbour relaxation: a table one foreign-key hop from a selected table
   needs only `neighbor_cutoff` of the best score (a dimension joined to a
   selected fact - e.g. `employees` for "CSAT by support agent" - is cheap to
   include and usually needed).
6. FK join-path closure: if two selected tables are connected only through an
   intermediate table (e.g. `returns` -> `order_items` -> `products`), add the
   bridge tables on the shortest foreign-key path so the model can write the join.

Qdrant runs embedded (local file / in-memory) by default, or against a server
via `QP_QDRANT_URL`. The collection name embeds a schema fingerprint, so the
index is rebuilt only when the schema changes.
"""

from __future__ import annotations

import re
import uuid
from collections import deque
from typing import Literal

from pydantic import BaseModel, Field
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, PointStruct, VectorParams

from app.rag.documents import SchemaDocument, TableMeta, build_documents, schema_fingerprint
from app.rag.embeddings import Embedder

_NS = uuid.UUID("6f1b8f8e-6c1e-4c35-9c55-2c0c8d0f6a01")


class RetrievedTable(BaseModel):
    name: str
    score: float
    reason: Literal["semantic", "lexical", "fk_neighbor", "join_path"]
    matched_columns: list[str] = Field(default_factory=list)
    via: list[str] = Field(default_factory=list, description="For join_path: the tables it bridges.")


class RetrievalResult(BaseModel):
    tables: list[RetrievedTable]
    candidates: list[tuple[str, float]] = Field(description="Top scored tables before selection (observability).")
    total_tables: int


class SchemaIndex:
    def __init__(
        self,
        tables: list[TableMeta],
        embedder: Embedder,
        *,
        client: QdrantClient,
        collection_prefix: str = "schema",
    ) -> None:
        self.tables = {t.name: t for t in tables}
        self.embedder = embedder
        self.client = client
        self.collection = f"{collection_prefix}_{schema_fingerprint(tables)}_{embedder.dim}"
        self._graph = self._fk_graph(tables)
        self._docs = build_documents(tables)
        fit = getattr(embedder, "fit", None)
        if callable(fit):  # corpus-fitted embedders (e.g. HashingEmbedder IDF) must see the same docs every start
            fit([d.text for d in self._docs])

    # ------------------------------------------------------------------ indexing
    @classmethod
    def build(
        cls,
        tables: list[TableMeta],
        embedder: Embedder,
        *,
        qdrant_url: str | None = None,
        qdrant_path: str | None = None,
    ) -> SchemaIndex:
        if qdrant_url:
            client = QdrantClient(url=qdrant_url)
        elif qdrant_path:
            client = QdrantClient(path=qdrant_path)
        else:
            client = QdrantClient(location=":memory:")
        index = cls(tables, embedder, client=client)
        index.ensure_indexed()
        return index

    def ensure_indexed(self) -> bool:
        """Create and fill the collection if this schema version is not indexed yet. Returns True if (re)built."""
        if self.client.collection_exists(self.collection):
            return False
        docs = self._docs
        self.client.create_collection(
            self.collection, vectors_config=VectorParams(size=self.embedder.dim, distance=Distance.COSINE))
        vectors = self.embedder.embed([d.text for d in docs])
        self.client.upsert(self.collection, points=[
            PointStruct(id=str(uuid.uuid5(_NS, d.id)), vector=v, payload=d.model_dump())
            for d, v in zip(docs, vectors, strict=True)
        ])
        return True

    # ------------------------------------------------------------------ retrieval
    def retrieve(self, question: str, *, top_k: int = 5, relative_cutoff: float = 0.7, neighbor_cutoff: float = 0.45,
                 max_fk_expansion: int = 3, search_limit: int = 48) -> RetrievalResult:
        """`relative_cutoff`: keep tables scoring at least this fraction of the best table's score.
        Relative (not absolute) so the same setting works across embedders with different score scales."""
        hits = self.client.query_points(
            self.collection, query=self.embedder.embed_query(question), limit=search_limit, with_payload=True,
        ).points

        best: dict[str, float] = {}
        columns: dict[str, list[str]] = {}
        for h in hits:
            doc = SchemaDocument.model_validate(h.payload)
            best[doc.table] = max(best.get(doc.table, 0.0), float(h.score))
            if doc.kind == "column" and doc.column:
                columns.setdefault(doc.table, []).append(doc.column)
        scored = {t: s + 0.03 * min(len(columns.get(t, [])) - 1, 3) if columns.get(t) else s for t, s in best.items()}
        ranked = sorted(scored.items(), key=lambda kv: kv[1], reverse=True)
        floor = (ranked[0][1] * relative_cutoff) if ranked else 0.0

        selected: dict[str, RetrievedTable] = {}
        for name in self._mentioned_tables(question):
            selected[name] = RetrievedTable(name=name, score=round(scored.get(name, 1.0), 4), reason="lexical",
                                            matched_columns=columns.get(name, [])[:5])
        for name, score in ranked:
            if len(selected) >= top_k:
                break
            if name in selected or (score < floor and selected):
                continue
            selected[name] = RetrievedTable(name=name, score=round(score, 4), reason="semantic",
                                            matched_columns=columns.get(name, [])[:5])

        top = ranked[0][1] if ranked else 0.0
        for name, score in ranked:
            if name in selected or score < top * neighbor_cutoff or len(selected) >= top_k + 2:
                continue
            anchors = sorted(self._graph.get(name, set()) & set(selected))
            if anchors:
                selected[name] = RetrievedTable(name=name, score=round(score, 4), reason="fk_neighbor",
                                                matched_columns=columns.get(name, [])[:5], via=anchors)

        for bridge, via in self._join_bridges(list(selected), max_fk_expansion):
            selected[bridge] = RetrievedTable(name=bridge, score=round(scored.get(bridge, 0.0), 4),
                                              reason="join_path", via=via)

        return RetrievalResult(
            tables=list(selected.values()),
            candidates=[(n, round(s, 4)) for n, s in ranked[:10]],
            total_tables=len(self.tables),
        )

    # ------------------------------------------------------------------ helpers
    def _mentioned_tables(self, question: str) -> list[str]:
        q = question.lower()
        found = []
        for name in self.tables:
            words = name.replace("_", " ")
            singular = re.sub(r"(ies|s)$", lambda m: "y" if m.group(1) == "ies" else "", words)
            if re.search(rf"\b({re.escape(words)}|{re.escape(singular)})\b", q):
                found.append(name)
        return found

    @staticmethod
    def _fk_graph(tables: list[TableMeta]) -> dict[str, set[str]]:
        graph: dict[str, set[str]] = {t.name: set() for t in tables}
        for t in tables:
            for fk in t.foreign_keys:
                if fk.ref_table in graph and fk.ref_table != t.name:
                    graph[t.name].add(fk.ref_table)
                    graph[fk.ref_table].add(t.name)
        return graph

    def _shortest_path(self, a: str, b: str) -> list[str] | None:
        prev: dict[str, str | None] = {a: None}
        queue = deque([a])
        while queue:
            node = queue.popleft()
            if node == b:
                path = [b]
                while (p := prev[path[-1]]) is not None:
                    path.append(p)
                return path[::-1]
            for nxt in sorted(self._graph.get(node, ())):
                if nxt not in prev:
                    prev[nxt] = node
                    queue.append(nxt)
        return None

    def _join_bridges(self, selected: list[str], limit: int) -> list[tuple[str, list[str]]]:
        """Intermediate tables on shortest FK paths between selected tables (paths of length <= 4)."""
        chosen = set(selected)
        bridges: list[tuple[str, list[str]]] = []
        for i, a in enumerate(selected):
            for b in selected[i + 1:]:
                path = self._shortest_path(a, b)
                if not path or len(path) > 4:
                    continue
                for mid in path[1:-1]:
                    if mid not in chosen and len(bridges) < limit:
                        chosen.add(mid)
                        bridges.append((mid, [a, b]))
        return bridges
