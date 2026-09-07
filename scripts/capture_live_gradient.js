const puppeteer = require('puppeteer-core');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function captureShowreelHeading() {
  const browser = await puppeteer.launch({ executablePath: chromePath, headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('https://het-director.preview.emergentagent.com', { waitUntil: 'networkidle2', timeout: 30000 });
  
  await new Promise(r => setTimeout(r, 2000));
  
  // Press PageDown twice
  await page.keyboard.press('PageDown');
  await new Promise(r => setTimeout(r, 600));
  await page.keyboard.press('PageDown');
  await new Promise(r => setTimeout(r, 1000));
  
  for (let i = 0; i < 4; i++) {
    await page.screenshot({
      path: `public/screenshots/live_showreel_gradient_${i}.png`
    });
    await new Promise(r => setTimeout(r, 1200));
  }
  console.log('Saved 4 live showreel gradient full viewport frames!');
  await browser.close();
}
captureShowreelHeading().catch(err => console.error(err));
