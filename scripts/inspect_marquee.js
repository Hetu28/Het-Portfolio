const puppeteer = require('puppeteer-core');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function inspectMarqueeLaunched() {
  const browser = await puppeteer.launch({ executablePath: chromePath, headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('https://het-director.preview.emergentagent.com', { waitUntil: 'networkidle2', timeout: 30000 });
  
  // Find iframe and click launch if needed
  for (const frame of page.frames()) {
    try {
      await frame.click('button');
    } catch(e) {}
  }
  
  await new Promise(r => setTimeout(r, 6000));
  
  for (const frame of page.frames()) {
    const marqueeData = await frame.evaluate(() => {
      const allEls = Array.from(document.querySelectorAll('*'));
      const marqueeEl = allEls.find(el => el.textContent && el.textContent.includes('COLOR GRADING') && el.textContent.includes('DIRECTION'));
      if (!marqueeEl) return null;
      
      let container = marqueeEl;
      while (container.parentElement && container.tagName !== 'SECTION' && container.tagName !== 'BODY') {
        container = container.parentElement;
      }
      
      const cs = window.getComputedStyle(container);
      const track = container.querySelector('.marquee-track') || container.querySelector('div');
      const trackCs = track ? window.getComputedStyle(track) : null;
      
      const textSpans = Array.from(container.querySelectorAll('span')).filter(s => s.innerText && s.innerText.includes('DIRECTION'));
      const textCs = textSpans.length > 0 ? window.getComputedStyle(textSpans[0]) : null;
      
      const dots = Array.from(container.querySelectorAll('span')).filter(s => !s.innerText || s.innerText.trim() === '');
      const dot = dots[0];
      const dotCs = dot ? window.getComputedStyle(dot) : null;
      
      return {
        containerTag: container.tagName,
        className: container.className,
        containerHtml: container.outerHTML.slice(0, 1500),
        section: {
          height: cs.height,
          paddingTop: cs.paddingTop,
          paddingBottom: cs.paddingBottom,
          marginTop: cs.marginTop,
          marginBottom: cs.marginBottom,
          borderTop: cs.borderTop,
          borderBottom: cs.borderBottom,
          background: cs.background
        },
        track: trackCs ? {
          className: track.className,
          animation: trackCs.animation,
          animationDuration: trackCs.animationDuration,
          display: trackCs.display,
          gap: trackCs.gap
        } : null,
        text: textCs ? {
          className: textSpans[0].className,
          fontSize: textCs.fontSize,
          fontWeight: textCs.fontWeight,
          letterSpacing: textCs.letterSpacing,
          color: textCs.color,
          lineHeight: textCs.lineHeight
        } : null,
        dot: dotCs ? {
          className: dots[0].className,
          styleAttr: dots[0].getAttribute('style'),
          width: dotCs.width,
          height: dotCs.height,
          background: dotCs.background,
          boxShadow: dotCs.boxShadow
        } : null
      };
    }).catch(() => null);
    
    if (marqueeData) {
      console.log('--- FOUND LIVE MARQUEE DATA ---');
      console.log(JSON.stringify(marqueeData, null, 2));
      break;
    }
  }
  
  await browser.close();
}
inspectMarqueeLaunched().catch(err => console.error(err));
