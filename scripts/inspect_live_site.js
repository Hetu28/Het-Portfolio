const puppeteer = require('puppeteer-core');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const fs = require('fs');

async function inspectLiveSite() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  console.log('Navigating to live preview...');
  
  await page.goto('https://het-director.preview.emergentagent.com', { waitUntil: 'networkidle2', timeout: 60000 });
  
  // Wait up to 30s for the real app inside iframe or redirected
  console.log('Waiting for content to load inside iframe/page...');
  
  let targetFrame = null;
  for (let i = 0; i < 30; i++) {
    const frames = page.frames();
    console.log(`Found ${frames.length} frames at check ${i + 1}`);
    for (const frame of frames) {
      const frameUrl = frame.url();
      console.log('Frame URL:', frameUrl);
      if (!frameUrl.includes('loading-preview') && !frameUrl.includes('about:blank') && frameUrl.length > 5) {
        targetFrame = frame;
        break;
      }
    }
    if (targetFrame) break;
    await new Promise(r => setTimeout(r, 1500));
  }
  
  if (targetFrame) {
    console.log('Target frame found:', targetFrame.url());
    // Navigate directly to target frame URL if possible
    await page.goto(targetFrame.url(), { waitUntil: 'networkidle2', timeout: 30000 });
  } else {
    // Check if iframe changed src
    const iframeSrc = await page.evaluate(() => {
      const ifr = document.querySelector('iframe');
      return ifr ? ifr.src : null;
    });
    console.log('Current iframe src:', iframeSrc);
    if (iframeSrc && !iframeSrc.includes('loading-preview')) {
      await page.goto(iframeSrc, { waitUntil: 'networkidle2' });
    }
  }

  await new Promise(r => setTimeout(r, 3000));
  
  await page.screenshot({ path: 'public/screenshots/live_ref_loaded.png', fullPage: true });
  console.log('Saved loaded live reference screenshot to public/screenshots/live_ref_loaded.png');
  
  const content = await page.content();
  fs.writeFileSync('public/screenshots/live_ref_loaded_html.html', content);
  
  await browser.close();
}

inspectLiveSite().catch(err => console.error(err));
