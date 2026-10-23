const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
(async () => {
  const font = '/home/claude/animeblog/leadmagnet/node_modules/@fontsource/bebas-neue/files/bebas-neue-latin-400-normal.woff2';
  const b64 = fs.readFileSync(font).toString('base64');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 800 }, deviceScaleFactor: 1 });
  for (const f of fs.readdirSync('out').filter(x => x.endsWith('.svg'))) {
    const svg = fs.readFileSync(path.join('out', f), 'utf8');
    await page.setContent(`<style>@font-face{font-family:'Bebas Neue';src:url(data:font/woff2;base64,${b64}) format('woff2')}body{margin:0}</style>${svg}`);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join('out', f.replace('.svg', '.jpg')), type: 'jpeg', quality: 86 });
    console.log(f);
  }
  await browser.close();
})();
