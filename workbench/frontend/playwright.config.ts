import { defineConfig, devices } from "@playwright/test";

// The Python interpreter for the API server (CI installs the backend into the runner's python).
const python = process.env.E2E_PYTHON ?? "python";

export default defineConfig({
  testDir: "./e2e",
  timeout: 45_000,
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["list"]] : "list",
  use: { baseURL: "http://localhost:3000", trace: "off", viewport: { width: 1600, height: 1000 } },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"], viewport: { width: 1600, height: 1000 } } }],
  webServer: [
    {
      command: `${python} -m tests.e2e_server`,
      cwd: "../backend",
      // The e2e stack runs with auth on, so the browser must send the bearer token on every call.
      env: { QP_E2E_API_TOKEN: "e2e-token" },
      url: "http://127.0.0.1:8000/api/health",
      reuseExistingServer: !process.env.CI,
      timeout: 60_000,
    },
    {
      // Production build: exercises the same bundle that ships.
      command: "npm run build && npm run start",
      url: "http://localhost:3000",
      env: { NEXT_PUBLIC_API_URL: "http://localhost:8000", NEXT_PUBLIC_API_TOKEN: "e2e-token", NEXT_TELEMETRY_DISABLED: "1" },
      reuseExistingServer: !process.env.CI,
      timeout: 180_000,
    },
  ],
});
