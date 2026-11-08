import { expect, type Page, test } from "@playwright/test";

const tracker = (page: Page) => page.getByRole("list", { name: "Agent state machine progress" });
const grid = (page: Page) => page.locator("table").filter({ has: page.locator("thead th", { hasText: "#" }) }).first();

async function replaceSql(page: Page, sql: string) {
  const editor = page.locator(".cm-content");
  await editor.click();
  await page.keyboard.press("ControlOrMeta+A");
  await page.keyboard.press("Delete");
  await page.keyboard.insertText(sql); // insertText: no autocomplete popups interfering
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("api ok")).toBeVisible();
  await expect(page.getByRole("tree", { name: "Database schema" }).getByText("support_tickets")).toBeVisible();
});

test("preset run self-corrects after a static compilation error", async ({ page }) => {
  await page.getByRole("button", { name: "Return rate by product category" }).click();

  // Live: the running marker appears while the state machine is executing.
  await expect(tracker(page).getByText("[⚙]").first()).toBeVisible();

  await expect(page.getByText("success", { exact: true })).toBeVisible({ timeout: 20_000 });
  const steps = tracker(page);
  await expect(steps).toContainText("Static compilation failed");
  await expect(steps).toContainText("Unknown column: category");
  await expect(steps).toContainText("generate_sql #2");
  await expect(steps).toContainText("Static compilation passed");
  await expect(steps).toContainText("8 rows");

  await expect(grid(page).locator("tbody tr")).toHaveCount(8);
  await expect(grid(page).locator("tbody tr").first()).toContainText("Footwear");
  await expect(page.getByText("1 static · 0 runtime")).toBeVisible();
  await expect(page.getByText("generated · compiled")).toBeVisible();
  // RAG context is visible in the schema tree.
  await expect(page.getByText(/\d+\/14 in context/)).toBeVisible();
});

test("manual override runs edited SQL through the same guard", async ({ page }) => {
  await page.getByRole("button", { name: "Monthly revenue for 2025" }).click();
  await expect(page.getByText("success", { exact: true })).toBeVisible({ timeout: 20_000 });
  await expect(grid(page).locator("tbody tr")).toHaveCount(12);

  await replaceSql(
    page,
    "SELECT carrier, COUNT(*) AS shipments, ROUND(AVG(julianday(delivered_date) - julianday(shipped_date)), 2) AS avg_days " +
      "FROM shipments WHERE delivered_date IS NOT NULL GROUP BY carrier ORDER BY avg_days DESC",
  );
  await expect(page.getByText("edited · manual override")).toBeVisible();
  await page.getByRole("button", { name: "Execute Edit" }).click();

  await expect(page.getByText("manual override", { exact: true })).toBeVisible();
  await expect(grid(page).locator("tbody tr")).toHaveCount(4);
  await expect(grid(page).locator("tbody tr").first()).toContainText("DHL");
});

test("history lists completed runs and reopens one", async ({ page }) => {
  await page.getByRole("button", { name: "Monthly revenue for 2025" }).click();
  await expect(page.getByText("success", { exact: true })).toBeVisible({ timeout: 20_000 });
  await page.getByRole("button", { name: "Return rate by product category" }).click();
  await expect(tracker(page)).toContainText("generate_sql #2", { timeout: 20_000 });
  await expect(page.getByText("success", { exact: true })).toBeVisible({ timeout: 20_000 });

  await page.getByRole("tab", { name: "History" }).click();
  const history = page.getByRole("list", { name: "Run history" });
  // Newest first; earlier tests in this file also ran, so look for these two specifically.
  const revenue = history.getByRole("button", { name: /Monthly revenue for 2025/ }).first();
  await expect(history.getByRole("button").first()).toContainText("Return rate by product category");
  await expect(history.getByRole("button").first()).toContainText("1 retry");

  await revenue.click();
  await expect(grid(page).locator("tbody tr")).toHaveCount(12);
  await expect(tracker(page)).not.toContainText("generate_sql #2");
  await expect(page.getByText(/loaded from history/)).toBeVisible();
});

test("exports the recorded run trace as JSON", async ({ page }) => {
  await page.getByRole("button", { name: "Return rate by product category" }).click();
  await expect(page.getByText("success", { exact: true })).toBeVisible({ timeout: 20_000 });

  const [download] = await Promise.all([page.waitForEvent("download"), page.getByRole("button", { name: "Export JSON" }).click()]);
  expect(download.suggestedFilename()).toMatch(/^querypilot-run-[0-9a-f]+\.json$/);
  const stream = await download.createReadStream();
  const chunks: Buffer[] = [];
  for await (const chunk of stream) chunks.push(chunk as Buffer);
  const trace = JSON.parse(Buffer.concat(chunks).toString("utf8"));

  expect(download.suggestedFilename()).toContain(trace.run_id);
  expect(trace.outcome).toBe("success");
  expect(trace.static_retries).toBe(1);
  expect(trace.feedback[0].log).toContain("UNKNOWN_COLUMN");
  expect(trace.result.row_count).toBe(8);
  expect(trace.steps.map((s: { node: string }) => s.node)).toEqual([
    "retrieve_context", "generate_sql", "validate_sql", "generate_sql", "validate_sql", "execute_sql", "format_response",
  ]);
});

test("write statements are blocked by the static compiler", async ({ page }) => {
  await replaceSql(page, "DROP TABLE orders");
  await page.getByRole("button", { name: "Execute Edit" }).click();
  await expect(page.getByText(/error\[NOT_A_QUERY\]/)).toBeVisible();
  await expect(page.getByText(/override rejected by SQLGlot: NOT_A_QUERY/)).toBeVisible();
});
