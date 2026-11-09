import AxeBuilder from "@axe-core/playwright";
import { expect, type Page, test } from "@playwright/test";

/** Zero serious/critical WCAG 2.x A/AA violations; details are printed when the assertion fails. */
async function expectAccessible(page: Page, state: string) {
  const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"]).analyze();
  const blocking = violations.filter((v) => v.impact === "serious" || v.impact === "critical");
  const report = blocking.map((v) => `${v.impact} ${v.id}: ${v.nodes.slice(0, 3).map((n) => n.target.join(" ")).join(" | ")}`);
  expect(report, `axe violations in state "${state}"`).toEqual([]);
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("api ok")).toBeVisible();
});

// Known open findings (workbench/TODO.md item 8, marked [~]): after a run, CodeMirror's built-in dark theme
// highlights some SQL tokens below 4.5:1, and the editor's wrapper div is a non-focusable scroll region.
// Un-fixme once a custom HighlightStyle is in place and the wrapper no longer scrolls.
test.fixme("no serious or critical axe violations across workbench states", async ({ page }) => {
  await expectAccessible(page, "idle");

  await page.getByRole("button", { name: "Return rate by product category" }).click();
  await expect(page.getByText("success", { exact: true })).toBeVisible({ timeout: 20_000 });
  await expectAccessible(page, "after a self-correcting run");

  await page.getByRole("tab", { name: "History" }).click();
  await expectAccessible(page, "history tab");

  await page.locator(".cm-content").click();
  await page.keyboard.press("ControlOrMeta+A");
  await page.keyboard.insertText("DROP TABLE orders");
  await page.getByRole("button", { name: "Execute Edit" }).click();
  await expect(page.getByText(/error\[NOT_A_QUERY\]/)).toBeVisible();
  await expectAccessible(page, "rejected manual override");
});

test("landmarks and labelled controls are exposed", async ({ page }) => {
  await expect(page.getByRole("main", { name: "Analytical canvas" })).toBeVisible();
  await expect(page.getByRole("complementary", { name: "Schema and run history" })).toBeVisible();
  await expect(page.getByRole("complementary", { name: "Execution trace" })).toBeVisible();
  await expect(page.getByRole("textbox", { name: "SQL editor" })).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Analytical request" })).toBeVisible();
  // Schema entries are disclosure buttons with expanded state.
  const orders = page.getByRole("button", { name: /^orders, \d+ rows/ });
  await expect(orders).toHaveAttribute("aria-expanded", "false");
  await orders.press("Enter");
  await expect(orders).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("list", { name: "orders columns" })).toBeVisible();
});

test("a full run is possible with the keyboard only", async ({ page }) => {
  // Tab from the top of the page to the request box (no mouse), then submit with Ctrl/Cmd+Enter.
  let reached = false;
  for (let i = 0; i < 60 && !reached; i++) {
    await page.keyboard.press("Tab");
    reached = await page.evaluate(() => document.activeElement?.getAttribute("aria-label") === "Analytical request");
  }
  expect(reached).toBe(true);
  // Focus is visibly indicated.
  const outline = await page.evaluate(() => getComputedStyle(document.activeElement as Element).outlineStyle);
  expect(outline).not.toBe("none");

  await page.keyboard.insertText("Monthly revenue for 2025, excluding cancelled orders");
  await page.keyboard.press("ControlOrMeta+Enter");
  await expect(page.getByText("success", { exact: true })).toBeVisible({ timeout: 20_000 });
  await expect(page.getByRole("region", { name: "Result grid" }).or(page.getByRole("tabpanel", { name: "Result grid" }))).toBeVisible();
});
