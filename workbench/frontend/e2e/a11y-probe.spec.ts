import AxeBuilder from "@axe-core/playwright";
import { test } from "@playwright/test";

test("probe", async ({ page }) => {
  await page.goto("/");
  await page.getByText("api ok").waitFor();
  const idle = await new AxeBuilder({ page }).analyze();
  await page.getByRole("button", { name: "Return rate by product category" }).click();
  await page.getByText("success", { exact: true }).waitFor({ timeout: 20000 });
  const done = await new AxeBuilder({ page }).analyze();
  for (const [label, r] of [["idle", idle], ["done", done]] as const) {
    for (const v of r.violations) {
      console.log(`${label} | ${v.impact} | ${v.id} | ${v.nodes.length} nodes | ${v.nodes.slice(0, 3).map((n) => n.target.join(" ") + " :: " + (n.any[0]?.message ?? "").slice(0, 110)).join(" || ")}`);
    }
  }
});
