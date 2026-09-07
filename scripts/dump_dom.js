const puppeteer = require('puppeteer-core');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const fs = require('fs');

async function dumpDomAndStyles() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  
  await page.goto('https://het-director.preview.emergentagent.com', { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise(r => setTimeout(r, 4000));
  
  const extracted = await page.evaluate(() => {
    const res = {};
    res.bodyHtml = document.body.innerHTML;
    
    // Collect all elements with their text and styles
    const all = Array.from(document.querySelectorAll('*'));
    res.elements = all.map(el => {
      const s = window.getComputedStyle(el);
      return {
        tag: el.tagName,
        id: el.id,
        className: el.className,
        text: el.innerText ? el.innerText.slice(0, 100) : '',
        fontSize: s.fontSize,
        fontWeight: s.fontWeight,
        color: s.color,
        backgroundColor: s.backgroundColor,
        width: s.width,
        height: s.height,
        maxWidth: s.maxWidth,
        padding: s.padding,
        margin: s.margin,
        display: s.display,
        gap: s.gap
      };
    }).filter(e => e.id || (typeof e.className === 'string' && e.className.length > 0));
    
    return res;
  });

  fs.writeFileSync('public/screenshots/live_app_full_body.html', extracted.bodyHtml);
  fs.writeFileSync('public/screenshots/live_app_elements.json', JSON.stringify(extracted.elements, null, 2));
  console.log('Successfully extracted full live app DOM and computed elements!');
  
  await browser.close();
}

dumpDomAndStyles().catch(err => console.error(err));
