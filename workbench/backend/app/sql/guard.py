"""State 3: static compilation and guardrails with SQLGlot.

Nothing reaches the database unless it compiles here. The compiler:

1. Parses with the target dialect (syntax errors carry line/column).
2. Requires exactly one statement whose root is a read-only query
   (SELECT / UNION / INTERSECT / EXCEPT, optionally with CTEs).
3. Walks the AST and rejects any write/DDL/session node anywhere in the tree
   (e.g. a data-modifying CTE) and denylisted functions.
4. Checks every physical table against the catalogue allowlist.
5. Qualifies every column against the real schema, so hallucinated columns
   and ambiguous references are caught *before* execution, with a precise
   message the generator can act on.
6. Enforces an outer LIMIT so a single query cannot stream an unbounded result.

Diagnostics are structured (`CompilerDiagnostic`) and rendered into a
compiler log that is fed back to the generation node on failure.
"""

from __future__ import annotations

from collections.abc import Iterable, Mapping
from typing import Literal

import sqlglot
from pydantic import BaseModel, Field
from sqlglot import exp
from sqlglot.errors import OptimizeError, ParseError
from sqlglot.optimizer.qualify import qualify

DiagnosticCode = Literal[
    "PARSE_ERROR",
    "EMPTY",
    "MULTIPLE_STATEMENTS",
    "NOT_A_QUERY",
    "FORBIDDEN_NODE",
    "FORBIDDEN_FUNCTION",
    "UNKNOWN_TABLE",
    "UNKNOWN_COLUMN",
    "SELECT_STAR_UNRESOLVED",
]

# Expression types that must never appear anywhere in the AST. Resolved by
# name so the guard keeps working across SQLGlot versions that add/rename nodes.
_FORBIDDEN_NODE_NAMES = (
    "Insert", "Update", "Delete", "Merge", "Drop", "Create", "Alter", "AlterTable", "TruncateTable",
    "Command", "Pragma", "Set", "Transaction", "Commit", "Rollback", "Grant", "Revoke",
    "Attach", "Detach", "Copy", "Use", "Into", "LoadData", "Analyze", "Cache", "Uncache", "Refresh",
)
FORBIDDEN_NODES: tuple[type[exp.Expression], ...] = tuple(
    t for name in _FORBIDDEN_NODE_NAMES if isinstance(t := getattr(exp, name, None), type)
)

FORBIDDEN_FUNCTIONS = frozenset({
    # SQLite
    "load_extension", "readfile", "writefile", "edit", "fts3_tokenizer",
    # Postgres
    "pg_sleep", "pg_read_file", "pg_read_binary_file", "pg_ls_dir", "pg_stat_file", "lo_import", "lo_export",
    "dblink", "dblink_exec", "pg_terminate_backend", "pg_cancel_backend", "set_config", "current_setting",
    # MySQL / MSSQL / generic
    "sleep", "benchmark", "load_file", "xp_cmdshell", "openrowset", "opendatasource",
})

READ_ROOTS: tuple[type[exp.Expression], ...] = (exp.Select, exp.Union, exp.Intersect, exp.Except)


class CompilerDiagnostic(BaseModel):
    code: DiagnosticCode
    message: str
    line: int | None = None
    column: int | None = None
    hint: str | None = None


class ValidationReport(BaseModel):
    ok: bool
    dialect: str
    input_sql: str
    compiled_sql: str | None = Field(default=None, description="Normalised SQL that will be executed.")
    tables: list[str] = Field(default_factory=list)
    limit_injected: bool = False
    diagnostics: list[CompilerDiagnostic] = Field(default_factory=list)

    def compiler_log(self) -> str:
        """Human/LLM readable log, in the style of a compiler's error output."""
        if self.ok:
            return "compile ok"
        lines = [f"SQLGlot static compilation failed ({self.dialect}):"]
        for d in self.diagnostics:
            loc = f" at line {d.line}, col {d.column}" if d.line is not None else ""
            lines.append(f"  error[{d.code}]{loc}: {d.message}")
            if d.hint:
                lines.append(f"    hint: {d.hint}")
        return "\n".join(lines)


SchemaMapping = Mapping[str, Mapping[str, str]]  # table -> column -> type


def _fail(report: ValidationReport, *diags: CompilerDiagnostic) -> ValidationReport:
    report.ok = False
    report.diagnostics.extend(diags)
    return report


def _cte_names(tree: exp.Expression) -> set[str]:
    return {cte.alias_or_name.lower() for cte in tree.find_all(exp.CTE)}


def _physical_tables(tree: exp.Expression) -> list[str]:
    ctes = _cte_names(tree)
    out: list[str] = []
    for table in tree.find_all(exp.Table):
        name = table.name.lower()
        if not name or name in ctes:
            continue
        out.append(name if not table.db else f"{table.db.lower()}.{name}")
    return list(dict.fromkeys(out))


def _function_names(tree: exp.Expression) -> Iterable[str]:
    for fn in tree.find_all(exp.Func):
        if isinstance(fn, exp.Anonymous):
            yield str(fn.this).lower()
        else:
            yield fn.sql_name().lower()


def compile_sql(
    sql: str,
    *,
    schema: SchemaMapping,
    dialect: str = "sqlite",
    max_rows: int = 1000,
) -> ValidationReport:
    """Statically validate `sql` against `schema`. Never touches the database."""
    report = ValidationReport(ok=True, dialect=dialect, input_sql=sql)
    text = sql.strip().rstrip(";").strip()
    if not text:
        return _fail(report, CompilerDiagnostic(code="EMPTY", message="Empty query."))

    # 1. Parse.
    try:
        statements = [s for s in sqlglot.parse(text, read=dialect) if s is not None]
    except ParseError as err:
        diags = [
            CompilerDiagnostic(
                code="PARSE_ERROR",
                message=str(e.get("description") or "syntax error"),
                line=e.get("line"),
                column=e.get("col"),
                hint=f"near: {e.get('highlight')!r}" if e.get("highlight") else None,
            )
            for e in (err.errors or [{}])
        ]
        return _fail(report, *diags)

    # 2. Single read-only statement.
    if len(statements) != 1:
        return _fail(report, CompilerDiagnostic(
            code="MULTIPLE_STATEMENTS",
            message=f"Expected exactly 1 statement, found {len(statements)}.",
            hint="Combine the logic into one SELECT using CTEs or subqueries."))
    tree = statements[0]
    if not isinstance(tree, READ_ROOTS):
        return _fail(report, CompilerDiagnostic(
            code="NOT_A_QUERY",
            message=f"Statement type {tree.key.upper()} is not allowed; only read-only SELECT queries are executed."))

    # 3. Forbidden nodes / functions anywhere in the tree.
    for node in tree.walk():
        if isinstance(node, FORBIDDEN_NODES):
            return _fail(report, CompilerDiagnostic(
                code="FORBIDDEN_NODE", message=f"{node.key.upper()} is not allowed inside a read-only query."))
    for fname in _function_names(tree):
        if fname in FORBIDDEN_FUNCTIONS:
            return _fail(report, CompilerDiagnostic(
                code="FORBIDDEN_FUNCTION", message=f"Function {fname}() is not allowed."))

    # 4. Table allowlist.
    known = {t.lower() for t in schema}
    tables = _physical_tables(tree)
    report.tables = tables
    unknown = [t for t in tables if t not in known]
    if unknown:
        return _fail(report, *[
            CompilerDiagnostic(
                code="UNKNOWN_TABLE",
                message=f"Table '{t}' does not exist or is not accessible.",
                hint=f"Available tables: {', '.join(sorted(known))}.")
            for t in unknown
        ])

    # 5. Column resolution against the real schema.
    try:
        qualify(
            tree.copy(),
            schema={t: dict(cols) for t, cols in schema.items()},
            dialect=dialect,
            validate_qualify_columns=True,
            quote_identifiers=False,
        )
    except OptimizeError as err:
        message = str(err)
        code: DiagnosticCode = "SELECT_STAR_UNRESOLVED" if "*" in message else "UNKNOWN_COLUMN"
        return _fail(report, CompilerDiagnostic(
            code=code, message=message,
            hint="Use only columns listed in the schema context; qualify columns with table aliases in joins."))

    # 6. Enforce an outer LIMIT (one extra row lets the executor detect truncation).
    compiled = tree
    if isinstance(tree, exp.Query) and tree.args.get("limit") is None:
        compiled = tree.limit(max_rows + 1, copy=True)
        report.limit_injected = True

    report.compiled_sql = compiled.sql(dialect=dialect, pretty=True)
    return report
