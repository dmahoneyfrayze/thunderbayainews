#!/usr/bin/env node
// Generate the default Open Graph / social share card (1200x630) -> public/og.png.
// Coded card (no AI gen): brand fonts + the BoltMark bolt over the dark aurora background,
// so type stays pixel-perfect and the URL stays absolute (the og:image FB needs).
// Run once when the brand/tagline changes: `node scripts/og-card.mjs`.
import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(__dirname, '..', 'public', 'og.png');

const html = `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Space+Grotesk:wght@400;500&display=swap" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:1200px; height:630px; overflow:hidden; font-family:'Outfit',sans-serif;
         background:hsl(224,32%,4%); color:#fff; position:relative; }
  .grid { position:absolute; inset:0;
    background-image:linear-gradient(hsla(184,100%,48%,0.05) 1px,transparent 1px),
                     linear-gradient(90deg,hsla(184,100%,48%,0.05) 1px,transparent 1px);
    background-size:48px 48px;
    -webkit-mask-image:radial-gradient(700px circle at 30% 40%,#000,transparent 80%); }
  .glow1 { position:absolute; top:-120px; left:-80px; width:560px; height:560px; border-radius:50%;
    background:radial-gradient(circle,hsla(184,100%,48%,0.22) 0%,transparent 70%); filter:blur(40px); }
  .glow2 { position:absolute; bottom:-160px; right:-100px; width:620px; height:620px; border-radius:50%;
    background:radial-gradient(circle,hsla(275,80%,56%,0.20) 0%,transparent 70%); filter:blur(50px); }
  .frame { position:absolute; inset:0; padding:72px 80px; display:flex; flex-direction:column;
    justify-content:space-between; z-index:2; }
  .brand { display:flex; align-items:center; gap:16px; }
  .brand span { font-size:30px; font-weight:800; letter-spacing:-0.02em; }
  .accent { background:linear-gradient(135deg,#00f0ff,#b800ff); -webkit-background-clip:text;
    -webkit-text-fill-color:transparent; }
  .label { font-family:'Space Grotesk',monospace; font-size:18px; letter-spacing:0.28em;
    text-transform:uppercase; color:hsl(184,100%,62%); }
  h1 { font-size:74px; font-weight:800; letter-spacing:-0.035em; line-height:0.98; max-width:1000px; }
  .sub { margin-top:26px; font-size:25px; line-height:1.45; color:hsl(224,16%,76%); max-width:880px;
    font-weight:400; }
  .bar { height:5px; width:160px; border-radius:4px; margin-top:36px;
    background:linear-gradient(90deg,#00f0ff,#b800ff,transparent); }
  .foot { display:flex; align-items:center; gap:14px; font-family:'Space Grotesk',monospace;
    font-size:17px; letter-spacing:0.06em; color:hsl(224,16%,62%); }
  .dot { width:6px; height:6px; border-radius:50%; background:hsl(184,100%,48%); }
</style></head>
<body>
  <div class="grid"></div><div class="glow1"></div><div class="glow2"></div>
  <div class="frame">
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <div class="brand">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          <defs><linearGradient id="b" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop stop-color="#00f0ff"/><stop offset="1" stop-color="#b800ff"/></linearGradient></defs>
          <path d="M13.5 2 4 13.2a.6.6 0 0 0 .46.99H10l-1.4 7.2a.4.4 0 0 0 .72.3L20 11.5a.6.6 0 0 0-.47-.98H14l1.2-8.2a.4.4 0 0 0-.7-.32z" fill="url(#b)"/>
        </svg>
        <span>Thunder Bay <span class="accent">AI</span></span>
      </div>
      <div class="label">NORTHWESTERN ONTARIO</div>
    </div>
    <div>
      <h1>The AI signal for<br>Northwestern Ontario.</h1>
      <p class="sub">An autonomous agent tracks the AI, funding, government and tech moves that matter for the Northwest — then breaks down what they mean.</p>
      <div class="bar"></div>
    </div>
    <div class="foot"><span class="dot"></span>Autonomous monitoring<span class="dot"></span>Reviewed by humans<span class="dot"></span>thunderbayai.com</div>
  </div>
</body></html>`;

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 400)); // let webfonts settle
await page.screenshot({ path: out, type: 'png' });
await browser.close();
console.log('Wrote', out);
