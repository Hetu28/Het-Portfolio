const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 1800, deviceScaleFactor: 2 });
  
  const pdfBase64 = fs.readFileSync('d:/A.I/het-portfolio/CV/reference_ks_cv.pdf').toString('base64');

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
    <style>
      body { margin: 0; padding: 20px; background: #111; display: flex; flex-direction: column; align-items: center; }
      canvas { max-width: 100%; height: auto; box-shadow: 0 10px 30px rgba(0,0,0,0.5); margin-bottom: 20px; }
    </style>
  </head>
  <body>
    <div id="container"></div>
    <script>
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      const pdfData = atob('${pdfBase64}');
      const loadingTask = pdfjsLib.getDocument({ data: pdfData });
      loadingTask.promise.then(async function(pdf) {
        console.log('PDF loaded, pages:', pdf.numPages);
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const viewport = page.getViewport({ scale: 2.0 });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          document.getElementById('container').appendChild(canvas);
          await page.render({ canvasContext: context, viewport: viewport }).promise;
        }
        window.pdfRendered = true;
      }).catch(err => console.error(err));
    </script>
  </body>
  </html>
  `;
  
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.waitForFunction('window.pdfRendered === true', { timeout: 30000 });
  await page.screenshot({ path: 'd:/A.I/het-portfolio/CV/ref_preview_clear.png', fullPage: true });
  console.log('Clear reference preview saved!');
  await browser.close();
})();
