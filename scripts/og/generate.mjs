#!/usr/bin/env node
// Thunder Bay AI OG-card renderer (Bold Statement). One coded template + per-route
// content (from cards.mjs), composited over a premium AI backdrop (no text) so the
// headline + logo stay pixel-perfect. Outputs 2x PNGs; convert to 1200x630 WebP after.
//
// Usage: node scripts/og/generate.mjs [outDir] [backdrop.webp]
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CARDS, renderHeadline } from './cards.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = process.argv[2] || path.join(__dirname, 'out');
const BACKDROP = process.argv[3] || path.join(__dirname, 'backdrop.webp');
const PNG_DIR = path.join(OUT_DIR, 'png');
fs.mkdirSync(PNG_DIR, { recursive: true });

// TBAI bolt glyph (matches src/components/BoltMark.jsx), cyan -> violet.
const BOLT = `<path d="M13.5 2 4 13.2a.6.6 0 0 0 .46.99H10l-1.4 7.2a.4.4 0 0 0 .72.3L20 11.5a.6.6 0 0 0-.47-.98H14l1.2-8.2a.4.4 0 0 0-.7-.32z" fill="url(#bolt)"/>`;
const bgDataUri = `data:image/webp;base64,${fs.readFileSync(BACKDROP).toString('base64')}`;

const html = (card) => `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:1200px;height:630px}
  body{font-family:'Inter',sans-serif;width:1200px;height:630px;overflow:hidden;position:relative;
    background:#080b12;color:#fff;-webkit-font-smoothing:antialiased}
  .bg{position:absolute;inset:0;background-image:url('${bgDataUri}');background-size:cover;background-position:center right}
  .scrimH{position:absolute;inset:0;background:linear-gradient(90deg,
    rgba(8,11,18,.97) 0%,rgba(8,11,18,.90) 32%,rgba(8,11,18,.55) 62%,rgba(8,11,18,.12) 100%)}
  .scrimV{position:absolute;inset:0;background:linear-gradient(0deg,rgba(8,11,18,.62) 0%,rgba(8,11,18,0) 34%)}
  .frame{position:relative;z-index:2;height:100%;padding:66px 80px;display:flex;flex-direction:column}
  .logo{display:flex;align-items:center;gap:16px}
  .logo .mark{width:56px;height:56px;filter:drop-shadow(0 6px 18px rgba(124,92,251,.5))}
  .logo .word{font-weight:800;font-size:29px;letter-spacing:.12em;text-shadow:0 2px 12px rgba(0,0,0,.5)}
  .main{flex:1;display:flex;flex-direction:column;justify-content:center}
  .headline{font-weight:800;font-size:80px;line-height:1.03;letter-spacing:-.028em;text-shadow:0 3px 28px rgba(0,0,0,.55)}
  .hl{white-space:nowrap}
  .grad{background:linear-gradient(100deg,#38e0ff,#8b7bff 52%,#c56bff);-webkit-background-clip:text;background-clip:text;color:transparent}
  .bar{width:84px;height:7px;border-radius:6px;margin:30px 0 26px;background:linear-gradient(90deg,#22d3ee,#8b5cf6 60%,#c084fc)}
  .sub{font-weight:500;font-size:28px;color:#aeb8c8;letter-spacing:-.01em;max-width:760px;line-height:1.32;text-shadow:0 2px 16px rgba(0,0,0,.6)}
  .foot{display:flex;align-items:center;justify-content:space-between}
  .domain{font-weight:700;font-size:21px;letter-spacing:.2em;color:#8390a4}
  .chip{font-weight:700;font-size:19px;letter-spacing:.16em;color:#dbe4f0;text-transform:uppercase;
    border:1.5px solid rgba(120,200,255,.32);padding:11px 22px;border-radius:999px;background:rgba(34,211,238,.06)}
</style></head>
<body>
  <div class="bg"></div><div class="scrimH"></div><div class="scrimV"></div>
  <div class="frame">
    <div class="logo">
      <svg class="mark" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="bolt" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stop-color="#00f0ff"/><stop offset="1" stop-color="#b800ff"/></linearGradient></defs>
        ${BOLT}</svg>
      <span class="word">THUNDER BAY AI</span>
    </div>
    <div class="main">
      <div class="headline">${renderHeadline(card.lines)}</div>
      <div class="bar"></div>
      <div class="sub">${card.sub}</div>
    </div>
    <div class="foot">
      <div class="domain">THUNDERBAYAI.COM</div>
      ${card.chip ? `<div class="chip">${card.chip}</div>` : ''}
    </div>
  </div>
</body></html>`;

const browser = await puppeteer.launch({ args: ['--no-sandbox', '--font-render-hinting=none'] });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
page.setDefaultNavigationTimeout(60000);
for (const card of CARDS) {
  await page.setContent(html(card), { waitUntil: 'domcontentloaded' });
  await page.evaluate(async () => { await document.fonts.ready; });
  await new Promise((r) => setTimeout(r, 350));
  await page.screenshot({ path: path.join(PNG_DIR, `${card.slug}.png`) });
  console.log('rendered', card.slug);
}
await browser.close();
console.log('done:', CARDS.length, 'cards ->', PNG_DIR);
