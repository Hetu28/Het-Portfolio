const puppeteer = require('puppeteer-core');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const fs = require('fs');

async function extractStyles() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  console.log('Connecting to https://het-director.preview.emergentagent.com ...');
  await page.goto('https://het-director.preview.emergentagent.com', { waitUntil: 'networkidle2', timeout: 60000 });

  // Look through all frames
  const frames = page.frames();
  for (const frame of frames) {
    try {
      const title = await frame.title();
      const url = frame.url();
      console.log('Frame:', { url, title });
      if (!url.includes('loading-preview') && url !== 'about:blank') {
        console.log('Inspecting main frame:', url);
        const data = await frame.evaluate(() => {
          return {
            h1: document.querySelector('h1')?.outerHTML,
            bodyBg: window.getComputedStyle(document.body).backgroundColor,
            allSectionIds: Array.from(document.querySelectorAll('section, header, footer')).map(el => ({
              tag: el.tagName,
              id: el.id,
              class: el.className,
              computedWidth: window.getComputedStyle(el).width,
              computedPadding: window.getComputedStyle(el).padding
            }))
          };
        });
        console.log('Extracted frame data:', data);
        fs.writeFileSync('public/screenshots/live_extracted_data.json', JSON.stringify(data, null, 2));
      }
    } catch (e) {}
  }

  await browser.close();
}

extractStyles().catch(err => console.error(err));
