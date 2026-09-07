const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--font-render-hinting=medium',
      '--enable-font-antialiasing'
    ]
  });
  
  const cvHtml = fs.readFileSync('d:/A.I/het-portfolio/CV/cv_template.html', 'utf-8');
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });
  await page.setContent(cvHtml, { waitUntil: 'networkidle0' });
  
  // Ensure all Google fonts are fully parsed and rendered
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  
  await new Promise(r => setTimeout(r, 600));
  
  if (!fs.existsSync('d:/A.I/het-portfolio/public/CV')) {
    fs.mkdirSync('d:/A.I/het-portfolio/public/CV', { recursive: true });
  }

  const pdfPath1 = 'd:/A.I/het-portfolio/CV/Het_Patel_CV.pdf';
  const pdfPath2 = 'd:/A.I/het-portfolio/public/CV/Het_Patel_CV.pdf';

  // Standard universal 1920x1080 1-page vector PDF
  await page.pdf({
    path: pdfPath1,
    width: '1920px',
    height: '1080px',
    printBackground: true,
    pageRanges: '1',
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });

  fs.copyFileSync(pdfPath1, pdfPath2);
  console.log('PDF regenerated at:', pdfPath1, 'and', pdfPath2);

  // Take high-res preview screenshot
  await page.screenshot({
    path: 'd:/A.I/het-portfolio/CV/preview_1page_perfect.png',
    clip: { x: 0, y: 0, width: 1920, height: 1080 }
  });
  console.log('Preview screenshot saved!');

  await browser.close();
})();
