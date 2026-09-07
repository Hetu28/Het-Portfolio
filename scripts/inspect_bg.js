const puppeteer = require('puppeteer-core');
(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  const html = await page.evaluate(() => {
    const bg = document.querySelector('div[aria-hidden=true]');
    return bg ? bg.outerHTML : 'Not found';
  });
  console.log('Background outerHTML:', html);
  await browser.close();
})();
