"""Schema introspection -> typed table metadata -> embeddable documents.

Each table becomes:
  * one TABLE document (description, every column with type/keys, relationships,
    and low-cardinality sample values), and
  * one COLUMN document per column (so questions that mention a specific
    attribute - "csat", "carrier", "refund" - hit the owning table even when
    the table name itself is not mentioned).

The same `TableMeta` objects also drive the SQLGlot schema mapping, the
schema browser API, and the prompt context, so there is one source of truth.
"""

from __future__ import annotations

import hashlib
import json
from typing import Literal

from pydantic import BaseModel, Field
from sqlalchemy import Engine, inspect, text

from app.db.catalog import COLUMN_DESCRIPTIONS, TABLE_DESCRIPTIONS

MAX_SAMPLE_DISTINCT = 12


class ForeignKey(BaseModel):
    column: str
    ref_table: str
    ref_column: str


class ColumnInfo(BaseModel):
    name: str
    type: str
    nullable: bool
    primary_key: bool = False
    foreign_key: ForeignKey | None = None
    description: str | None = None
    sample_values: list[str] = Field(default_factory=list)


class TableMeta(BaseModel):
    name: str
    description: str | None = None
    row_count: int
    columns: list[ColumnInfo]

    @property
    def foreign_keys(self) -> list[ForeignKey]:
        return [c.foreign_key for c in self.columns if c.foreign_key]


class SchemaDocument(BaseModel):
    id: str
    kind: Literal["table", "column"]
    table: str
    column: str | None = None
    text: str


def introspect(engine: Engine) -> list[TableMeta]:
    """Read tables, columns, types, PKs, FKs and comments via SQLAlchemy's inspector."""
    insp = inspect(engine)
    tables: list[TableMeta] = []
    with engine.connect() as conn:
        for tname in sorted(insp.get_table_names()):
            pk_cols = set(insp.get_pk_constraint(tname).get("constrained_columns") or [])
            fks: dict[str, ForeignKey] = {}
            for fk in insp.get_foreign_keys(tname):
                for src_col, ref_col in zip(fk["constrained_columns"], fk["referred_columns"], strict=False):
                    fks[src_col] = ForeignKey(column=src_col, ref_table=fk["referred_table"], ref_column=ref_col)
            try:
                comment = (insp.get_table_comment(tname) or {}).get("text")
            except NotImplementedError:
                comment = None
            q = engine.dialect.identifier_preparer.quote
            row_count = int(conn.execute(text(f"SELECT count(*) FROM {q(tname)}")).scalar_one())
            columns: list[ColumnInfo] = []
            for col in insp.get_columns(tname):
                cname = col["name"]
                samples: list[str] = []
                ctype = str(col["type"])
                if "CHAR" in ctype.upper() or "TEXT" in ctype.upper():
                    distinct = conn.execute(text(
                        f"SELECT {q(cname)} FROM {q(tname)} WHERE {q(cname)} IS NOT NULL "
                        f"GROUP BY {q(cname)} LIMIT {MAX_SAMPLE_DISTINCT + 1}")).scalars().all()
                    if len(distinct) <= MAX_SAMPLE_DISTINCT:
                        samples = [str(v) for v in distinct]
                columns.append(ColumnInfo(
                    name=cname, type=ctype, nullable=bool(col.get("nullable", True)),
                    primary_key=cname in pk_cols, foreign_key=fks.get(cname),
                    description=col.get("comment") or COLUMN_DESCRIPTIONS.get(tname, {}).get(cname),
                    sample_values=samples,
                ))
            tables.append(TableMeta(
                name=tname, description=comment or TABLE_DESCRIPTIONS.get(tname),
                row_count=row_count, columns=columns))
    return tables


def _column_line(c: ColumnInfo) -> str:
    tags = [c.type]
    if c.primary_key:
        tags.append("PK")
    if c.foreign_key:
        tags.append(f"FK -> {c.foreign_key.ref_table}.{c.foreign_key.ref_column}")
    if not c.nullable:
        tags.append("NOT NULL")
    line = f"{c.name} ({', '.join(tags)})"
    if c.description:
        line += f": {c.description}"
    if c.sample_values:
        line += f" Values: {', '.join(c.sample_values)}."
    return line


def table_ddl_context(t: TableMeta) -> str:
    """Compact schema block used inside the generation prompt."""
    head = f"TABLE {t.name} -- {t.row_count:,} rows" + (f". {t.description}" if t.description else "")
    return "\n".join([head, *[f"  - {_column_line(c)}" for c in t.columns]])


def build_documents(tables: list[TableMeta]) -> list[SchemaDocument]:
    docs: list[SchemaDocument] = []
    incoming: dict[str, list[str]] = {}
    for t in tables:
        for fk in t.foreign_keys:
            incoming.setdefault(fk.ref_table, []).append(f"{t.name}.{fk.column}")
    for t in tables:
        rels = [f"{t.name}.{fk.column} -> {fk.ref_table}.{fk.ref_column}" for fk in t.foreign_keys]
        rels += [f"{src} -> {t.name}" for src in incoming.get(t.name, [])]
        body = [
            f"Table: {t.name}",
            f"Description: {t.description or 'n/a'}",
            "Columns:",
            *[f"- {_column_line(c)}" for c in t.columns],
        ]
        if rels:
            body += ["Relationships:", *[f"- {r}" for r in rels]]
        docs.append(SchemaDocument(id=f"table:{t.name}", kind="table", table=t.name, text="\n".join(body)))
        for c in t.columns:
            docs.append(SchemaDocument(
                id=f"column:{t.name}.{c.name}", kind="column", table=t.name, column=c.name,
                text=f"Column {c.name.replace('_', ' ')} of table {t.name.replace('_', ' ')}. {_column_line(c)}"))
    return docs


def schema_fingerprint(tables: list[TableMeta]) -> str:
    """Stable hash of the schema (not row counts) - the index is rebuilt only when this changes."""
    payload = [t.model_dump(exclude={"row_count"}) for t in tables]
    return hashlib.sha256(json.dumps(payload, sort_keys=True).encode()).hexdigest()[:16]


def sqlglot_schema(tables: list[TableMeta]) -> dict[str, dict[str, str]]:
    return {t.name: {c.name: c.type for c in t.columns} for t in tables}
