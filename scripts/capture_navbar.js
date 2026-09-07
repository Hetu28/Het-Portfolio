const puppeteer = require("puppeteer-core");
const path = require("path");
const fs = require("fs");

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function main() {
  const outDir = path.join(__dirname, "../public/screenshots");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 1000));

  const navElement = await page.$("header");
  if (navElement) {
    const boundingBox = await navElement.boundingBox();
    if (boundingBox) {
      await page.screenshot({
        path: path.join(outDir, "liquid-glass-nav-preview.png"),
        clip: {
          x: Math.max(0, boundingBox.x - 40),
          y: Math.max(0, boundingBox.y - 15),
          width: boundingBox.width + 80,
          height: boundingBox.height + 30
        }
      });
      console.log("Nav screenshot saved to public/screenshots/liquid-glass-nav-preview.png");
    }
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
