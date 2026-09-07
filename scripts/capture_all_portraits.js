const puppeteer = require('puppeteer-core');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Homepage Hero
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'd:/A.I/het-portfolio/public/screenshots/verify_hero_portrait.png' });
  
  // 2. Homepage About Section
  const aboutEl = await page.$('#about');
  if (aboutEl) {
    await aboutEl.scrollIntoView();
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: 'd:/A.I/het-portfolio/public/screenshots/verify_about_card.png' });
  }

  // 3. About Page Carousel
  await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'd:/A.I/het-portfolio/public/screenshots/verify_about_page_carousel.png' });

  console.log('All verification screenshots captured!');
  await browser.close();
})();
