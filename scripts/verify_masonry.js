const puppeteer = require("puppeteer-core");
const path = require("path");
const fs = require("fs");

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function verify() {
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

  // Wait 1 second
  await new Promise(r => setTimeout(r, 1000));

  // Check animation execution
  const transform1Before = await page.evaluate(() => {
    const el = document.querySelector(".masonry-track-col1");
    return el ? window.getComputedStyle(el).transform : null;
  });

  // Wait 2.5 seconds
  await new Promise(r => setTimeout(r, 2500));

  const transform1After = await page.evaluate(() => {
    const el = document.querySelector(".masonry-track-col1");
    const el2 = document.querySelector(".masonry-track-col2");
    return {
      t1: el ? window.getComputedStyle(el).transform : null,
      t2: el2 ? window.getComputedStyle(el2).transform : null,
      anim1: el ? window.getComputedStyle(el).animationName : null,
      anim2: el2 ? window.getComputedStyle(el2).animationName : null,
      col1Cards: document.querySelectorAll(".masonry-track-col1 .masonry-card").length,
      col2Cards: document.querySelectorAll(".masonry-track-col2 .masonry-card").length,
    };
  });

  console.log("Animation check result:", {
    transform1Before,
    ...transform1After
  });

  // Capture desktop hero screenshot
  await page.screenshot({
    path: path.join(outDir, "hero-desktop-updated.png"),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log("Captured hero-desktop-updated.png");

  // Switch to mobile viewport
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({
    path: path.join(outDir, "hero-mobile-updated.png"),
    clip: { x: 0, y: 0, width: 390, height: 844 }
  });
  console.log("Captured hero-mobile-updated.png");

  await browser.close();
}

verify().catch(err => {
  console.error(err);
  process.exit(1);
});
