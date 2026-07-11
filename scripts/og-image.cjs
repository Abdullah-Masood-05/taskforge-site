/* Regenerate the OG/link-preview image from the live hero section.
   Requires `bun run docs:dev` running on port 5173 (or set PORT). */
const path = require("path");
const { chromium } = require("playwright");

const OUT = path.resolve(__dirname, "../public/og-image.png");
const PORT = process.env.PORT || 5173;
const URL = `http://localhost:${PORT}/taskforge-site/`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.screenshot({ path: OUT });
  await browser.close();
  console.log("Saved", OUT);
})();
