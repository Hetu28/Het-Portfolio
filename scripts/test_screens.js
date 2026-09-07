const puppeteer = require("puppeteer-core");
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function testScreens() {
  const browser = await puppeteer.launch({ executablePath: chromePath, headless: "new", args: ["--no-sandbox"] });
  
  const widths = [1280, 1366, 1440, 1536, 1600, 1920];
  for (const w of widths) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: 900 });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });

    const data = await page.evaluate(() => {
      const showreelEl = Array.from(document.querySelectorAll("header nav a")).find(a => a.innerText.includes("Showreel"));
      const sRect = showreelEl ? showreelEl.getBoundingClientRect() : null;

      const filmmaker = document.querySelector(".hero-filmmaker-title");
      const fRect = filmmaker ? filmmaker.getBoundingClientRect() : null;

      const rightCol = document.querySelector("#home .masonry-container") || document.querySelector("#home .masonry-col");
      const rRect = rightCol ? rightCol.getBoundingClientRect() : null;

      return {
        showreel: sRect ? { left: sRect.left, right: sRect.right, mid: (sRect.left + sRect.right) / 2 } : null,
        filmmaker: fRect ? { left: fRect.left, right: fRect.right } : null,
        scrollingPosters: rRect ? { left: rRect.left, right: rRect.right } : null,
        isOverlapping: fRect && rRect ? fRect.right > rRect.left : false
      };
    });

    console.log(`Width ${w}px:`, data);
    await page.close();
  }

  await browser.close();
}

testScreens().catch(console.error);
