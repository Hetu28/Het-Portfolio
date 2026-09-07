const puppeteer = require("puppeteer-core");
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function captureCleanScreenshots() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: "new",
    args: ["--no-sandbox"]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });

  await page.screenshot({ path: "scripts/hero_clean_1440.png", fullPage: false });
  console.log("Saved scripts/hero_clean_1440.png");

  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  await page.screenshot({ path: "scripts/hero_clean_1920.png", fullPage: false });
  console.log("Saved scripts/hero_clean_1920.png");

  await browser.close();
}

captureCleanScreenshots().catch(console.error);




