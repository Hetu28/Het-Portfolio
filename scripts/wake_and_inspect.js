const puppeteer = require('puppeteer-core');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const fs = require('fs');

async function wakeAndInspect() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  console.log('Navigating to preview...');
  await page.goto('https://het-director.preview.emergentagent.com', { waitUntil: 'networkidle2', timeout: 60000 });
  
  // Click "Wake up servers"
  try {
    const frames = page.frames();
    for (const frame of frames) {
      const btn = await frame.$('button');
      if (btn) {
        const text = await frame.evaluate(el => el.textContent, btn);
        console.log('Found button in frame:', text);
        if (text.includes('Wake up servers')) {
          console.log('Clicking "Wake up servers"...');
          await btn.click();
          break;
        }
      }
    }
  } catch (e) {
    console.log('Error clicking button:', e.message);
  }

  // Poll every 5s for up to 3 minutes until preview is ready
  console.log('Polling until preview server starts...');
  for (let i = 0; i < 36; i++) {
    await new Promise(r => setTimeout(r, 5000));
    console.log(`Poll check ${i + 1}/36 (after ${(i + 1) * 5}s)...`);
    
    const pageTitle = await page.title();
    const frames = page.frames();
    console.log('Page title:', pageTitle, 'Frames:', frames.length);
    
    // Check if any frame or main page has real content
    let hasLoaded = false;
    for (const frame of frames) {
      try {
        const h1 = await frame.$('h1, h2, nav, [class*="portfolio"]');
        if (h1) {
          const text = await frame.evaluate(el => el.textContent, h1);
          console.log('Found element in frame:', text);
          if (!text.includes('Ready to start your preview')) {
            hasLoaded = true;
            break;
          }
        }
      } catch (e) {}
    }
    
    if (hasLoaded) {
      console.log('Preview successfully loaded!');
      break;
    }
  }

  await page.screenshot({ path: 'public/screenshots/live_ref_woken.png', fullPage: true });
  console.log('Saved woken screenshot!');
  
  await browser.close();
}

wakeAndInspect().catch(err => console.error(err));
