// Renders resume/resume.html to resume/Aryan_Gupta_Resume.pdf (US Letter) with Playwright.
// Usage: node resume/build-pdf.cjs
const path = require("path");
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("file://" + path.join(__dirname, "resume.html"));
  await page.pdf({ path: path.join(__dirname, "Aryan_Gupta_Resume.pdf"), format: "Letter", preferCSSPageSize: true, printBackground: true });
  const pages = await page.evaluate(() => Math.ceil(document.body.scrollHeight / (11 * 96 - 0.95 * 96)));
  console.log("wrote Aryan_Gupta_Resume.pdf (estimated pages:", pages + ")");
  await browser.close();
})();
