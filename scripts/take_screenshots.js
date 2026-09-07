const puppeteer = require("puppeteer-core");
const path = require("path");
const fs = require("fs");

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const viewports = [
  { name: "mobile-390", width: 390, height: 844 },
  { name: "mobile-375", width: 375, height: 812 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "desktop-1920", width: 1920, height: 1080 }
];

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 300;
      const timer = setInterval(() => {
        const scrollHeight = document.documentElement.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight + 1000) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 80);
    });
  });
}

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

  for (const vp of viewports) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 2 });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle0", timeout: 30000 });
    
    // Auto scroll to load and render all sections
    await autoScroll(page);
    await new Promise((r) => setTimeout(r, 1000));

    // Capture hero viewport screenshot
    await page.screenshot({
      path: path.join(outDir, `${vp.name}-hero.png`),
      clip: { x: 0, y: 0, width: vp.width, height: Math.min(vp.height, 900) }
    });

    // Capture full page screenshot
    await page.screenshot({
      path: path.join(outDir, `${vp.name}-full.png`),
      fullPage: true
    });

    console.log(`Captured ${vp.name}`);
    await page.close();
  }

  await browser.close();
  console.log("All screenshots captured successfully!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
