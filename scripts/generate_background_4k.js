const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function generate4KBackground() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const bgHtml = fs.readFileSync('d:/A.I/het-portfolio/CV/background_template.html', 'utf-8');
  const page = await browser.newPage();
  
  // 4K UHD Resolution: 3840 x 2160 pixels
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });
  await page.setContent(bgHtml, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  if (!fs.existsSync('d:/A.I/het-portfolio/CV')) {
    fs.mkdirSync('d:/A.I/het-portfolio/CV', { recursive: true });
  }
  if (!fs.existsSync('d:/A.I/het-portfolio/public/images')) {
    fs.mkdirSync('d:/A.I/het-portfolio/public/images', { recursive: true });
  }

  const outPath1 = 'd:/A.I/het-portfolio/CV/website_background_4k.png';
  const outPath2 = 'd:/A.I/het-portfolio/CV/background_4k.png';
  const outPath3 = 'd:/A.I/het-portfolio/public/images/website_background_4k.png';

  await page.screenshot({ path: outPath1, type: 'png', clip: { x: 0, y: 0, width: 1920, height: 1080 } });
  fs.copyFileSync(outPath1, outPath2);
  fs.copyFileSync(outPath1, outPath3);
  console.log('Successfully generated 4K background images:');
  console.log(' - ' + outPath1);
  console.log(' - ' + outPath2);
  console.log(' - ' + outPath3);

  await browser.close();
}

generate4KBackground().catch(err => {
  console.error('Error generating 4K background:', err);
  process.exit(1);
});
