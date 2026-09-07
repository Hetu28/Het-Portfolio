const puppeteer = require('puppeteer-core');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const path = require('path');
const fs = require('fs');

async function sliceImage() {
  const browser = await puppeteer.launch({ executablePath: chromePath, headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  const refFilePath = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\f1cd3402-7aa7-459c-87f8-39bd741dc4d5\\.tempmediaStorage\\media_1786965689171.png';
  const base64Data = fs.readFileSync(refFilePath).toString('base64');
  const dataUrl = `data:image/png;base64,${base64Data}`;
  
  // Offset method
  async function captureOffset(offsetY, height, savePath) {
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { background: #000; overflow: hidden; width: 640px; height: ${height}px; }
            img { position: absolute; top: -${offsetY}px; left: 0; width: 640px; height: 4096px; display: block; }
          </style>
        </head>
        <body>
          <img id="target" src="${dataUrl}" />
        </body>
      </html>
    `);
    await new Promise(r => setTimeout(r, 600));
    await page.setViewport({ width: 640, height: height, deviceScaleFactor: 2 });
    await page.screenshot({ path: savePath });
  }

  await captureOffset(0, 550, 'public/screenshots/ref_slice_1_hero.png');
  await captureOffset(520, 550, 'public/screenshots/ref_slice_2_showreel.png');
  await captureOffset(1020, 750, 'public/screenshots/ref_slice_3_curated.png');
  await captureOffset(1720, 480, 'public/screenshots/ref_slice_4_about.png');
  await captureOffset(2140, 850, 'public/screenshots/ref_slice_5_filmography.png');
  await captureOffset(2940, 550, 'public/screenshots/ref_slice_6_experience.png');
  await captureOffset(3400, 700, 'public/screenshots/ref_slice_7_contact.png');
  
  console.log('All 7 slices successfully extracted with offset method!');
  await browser.close();
}
sliceImage();
