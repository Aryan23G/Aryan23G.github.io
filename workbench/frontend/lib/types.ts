/**
 * API contracts. Mirrors backend/app/api/schemas.py and backend/app/agent/runner.py.
 * Keep in sync when the Pydantic models change.
 */

export type JsonScalar = string | number | boolean | null;

export type NodeName = "retrieve_context" | "generate_sql" | "validate_sql" | "execute_sql" | "format_response" | "fail";
export type StepStatus = "pending" | "running" | "done" | "error" | "skipped";
export type Outcome = "success" | "unanswerable" | "failed";

export interface ForeignKey {
  column: string;
  ref_table: string;
  ref_column: string;
}

export interface ColumnInfo {
  name: string;
  type: string;
  nullable: boolean;
  primary_key: boolean;
  foreign_key: ForeignKey | null;
  description: string | null;
  sample_values: string[];
}

export interface TableMeta {
  name: string;
  description: string | null;
  row_count: number;
  columns: ColumnInfo[];
}

export interface DatabaseInfo {
  name: string;
  dialect: string;
  tables: TableMeta[];
}

export interface SchemaResponse {
  databases: DatabaseInfo[];
  indexed_collection: string;
}

export interface HealthResponse {
  status: string;
  model: string;
  dialect: string;
  tables: number;
  embedder: string;
  index_collection: string;
}

export interface ColumnMeta {
  name: string;
  type: "number" | "string" | "boolean" | "date" | "null";
}

export interface TokenUsage {
  input_tokens: number;
  output_tokens: number;
  cache_read_input_tokens: number;
  cache_creation_input_tokens: number;
}

export interface SqlDraft {
  reasoning_chain: string[];
  sql_query: string;
  tables_used: string[];
  answerable: boolean;
  clarification: string;
}

export interface GenerationRecord {
  attempt: number;
  trigger: "initial" | "static_error" | "runtime_error";
  model: string;
  latency_ms: number;
  usage: TokenUsage;
  request_id: string | null;
  draft: SqlDraft;
}

export interface CorrectionFeedback {
  attempt: number;
  stage: "static" | "runtime";
  sql: string;
  log: string;
}

export interface CompilerDiagnostic {
  code: string;
  message: string;
  line: number | null;
  column: number | null;
  hint: string | null;
}

export interface StepRecord {
  node: NodeName;
  label: string;
  status: "done" | "error" | "skipped";
  started_at_ms: number;
  duration_ms: number;
  detail: string | null;
}

export interface RetrievedTable {
  name: string;
  score: number;
  reason: "semantic" | "lexical" | "fk_neighbor" | "join_path";
  matched_columns: string[];
  via: string[];
}

export interface RetrievalResult {
  tables: RetrievedTable[];
  candidates: [string, number][];
  total_tables: number;
}

export interface FormattedResult {
  columns: ColumnMeta[];
  records: Record<string, JsonScalar>[];
  row_count: number;
  truncated: boolean;
  execution_ms: number;
}

export interface RunTrace {
  run_id: string;
  question: string;
  model: string;
  dialect: string;
  outcome: Outcome;
  error: string | null;
  sql: string | null;
  reasoning_chain: string[];
  clarification: string | null;
  retrieval: RetrievalResult | null;
  generations: GenerationRecord[];
  feedback: CorrectionFeedback[];
  diagnostics: CompilerDiagnostic[];
  steps: StepRecord[];
  usage: TokenUsage;
  llm_calls: number;
  static_retries: number;
  runtime_retries: number;
  total_ms: number;
  result: FormattedResult | null;
}

export type AgentEvent =
  | { type: "run_started"; run_id: string; question: string; model: string; dialect: string }
  | {
      type: "step";
      node: NodeName;
      status: "running" | "done" | "error" | "skipped";
      label: string;
      started_at_ms: number | null;
      duration_ms: number | null;
      detail: string | null;
      data: { sql?: string; attempt?: number; tables?: RetrievedTable[] } | null;
    }
  | { type: "run_completed"; trace: RunTrace }
  | { type: "run_error"; run_id: string; message: string };

export interface ValidationReport {
  ok: boolean;
  dialect: string;
  input_sql: string;
  compiled_sql: string | null;
  tables: string[];
  limit_injected: boolean;
  diagnostics: CompilerDiagnostic[];
}

export interface ExecutionResult {
  ok: boolean;
  sql: string;
  columns: ColumnMeta[];
  rows: JsonScalar[][];
  row_count: number;
  truncated: boolean;
  elapsed_ms: number;
  error_type: string | null;
  error_message: string | null;
  stack_trace: string | null;
}

export interface ExecuteResponse {
  validation: ValidationReport;
  execution: ExecutionResult | null;
  records: Record<string, JsonScalar>[];
}
