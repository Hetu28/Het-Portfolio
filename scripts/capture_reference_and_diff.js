const puppeteer = require("puppeteer-core");
const path = require("path");
const fs = require("fs");

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

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

async function extractMetrics(page) {
  return await page.evaluate(() => {
    const metrics = {};
    const hero = document.querySelector("#home") || document.querySelector("section");
    if (hero) {
      const h1 = hero.querySelector("h1");
      const h2 = hero.querySelector("h2");
      const p = hero.querySelector("p");
      const status = hero.querySelector("span, div");
      metrics.hero = {
        height: hero.offsetHeight,
        paddingTop: window.getComputedStyle(hero).paddingTop,
        paddingBottom: window.getComputedStyle(hero).paddingBottom,
        h1FontSize: h1 ? window.getComputedStyle(h1).fontSize : null,
        h1LineHeight: h1 ? window.getComputedStyle(h1).lineHeight : null,
        h2FontSize: h2 ? window.getComputedStyle(h2).fontSize : null,
        pFontSize: p ? window.getComputedStyle(p).fontSize : null,
        pMaxWidth: p ? window.getComputedStyle(p).maxWidth : null,
      };
    }
    const showreel = document.querySelector("#showreel");
    if (showreel) {
      metrics.showreel = {
        height: showreel.offsetHeight,
        paddingTop: window.getComputedStyle(showreel).paddingTop,
        paddingBottom: window.getComputedStyle(showreel).paddingBottom,
      };
    }
    const portfolio = document.querySelector("#portfolio");
    if (portfolio) {
      const cards = portfolio.querySelectorAll(".group");
      metrics.portfolio = {
        cardCount: cards.length,
        firstCardWidth: cards[0] ? cards[0].offsetWidth : null,
        firstCardHeight: cards[0] ? cards[0].offsetHeight : null,
      };
    }
    return metrics;
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

  const targets = [
    { url: "https://het-director.preview.emergentagent.com", prefix: "ref" },
    { url: "http://localhost:3000", prefix: "curr" }
  ];

  const viewports = [
    { name: "390", width: 390, height: 844 },
    { name: "1440", width: 1440, height: 900 }
  ];

  const results = {};

  for (const target of targets) {
    results[target.prefix] = {};
    for (const vp of viewports) {
      const page = await browser.newPage();
      await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 2 });
      
      try {
        await page.goto(target.url, { waitUntil: "networkidle0", timeout: 35000 });
      } catch (e) {
        console.log(`Failed networkidle0 for ${target.url}, proceeding with domcontentloaded`);
      }
      
      await autoScroll(page);
      await new Promise((r) => setTimeout(r, 1500));

      const metrics = await extractMetrics(page);
      results[target.prefix][vp.name] = metrics;

      await page.screenshot({
        path: path.join(outDir, `${target.prefix}-${vp.name}-full.png`),
        fullPage: true
      });

      await page.screenshot({
        path: path.join(outDir, `${target.prefix}-${vp.name}-hero.png`),
        clip: { x: 0, y: 0, width: vp.width, height: Math.min(vp.height, 900) }
      });

      console.log(`Captured ${target.prefix}-${vp.name}`);
      await page.close();
    }
  }

  fs.writeFileSync(path.join(outDir, "metrics_comparison.json"), JSON.stringify(results, null, 2));
  console.log("Metrics saved to metrics_comparison.json");

  await browser.close();
  console.log("Reference and Current captures complete!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
