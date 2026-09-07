const puppeteer = require('puppeteer-core');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const fs = require('fs');

async function launchAndInspect() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  console.log('Navigating to live preview...');
  await page.goto('https://het-director.preview.emergentagent.com', { waitUntil: 'networkidle2', timeout: 60000 });
  
  // Click "Launch App"
  const frames = page.frames();
  for (const frame of frames) {
    try {
      const btn = await frame.$('button, a');
      const elements = await frame.$$('button, a');
      for (const el of elements) {
        const text = await frame.evaluate(e => e.textContent, el);
        if (text && text.includes('Launch App')) {
          console.log('Clicking "Launch App"...');
          await el.click();
          break;
        }
      }
    } catch (e) {}
  }

  // Wait for navigation or iframe to load
  await new Promise(r => setTimeout(r, 6000));
  
  console.log('Current URL after launch:', page.url());
  const allFrames = page.frames();
  console.log('Frames after launch:', allFrames.map(f => f.url()));

  // Let's capture the loaded page
  await page.screenshot({ path: 'public/screenshots/live_app_launched.png', fullPage: true });
  console.log('Saved launched app screenshot!');
  
  await browser.close();
}

launchAndInspect().catch(err => console.error(err));
