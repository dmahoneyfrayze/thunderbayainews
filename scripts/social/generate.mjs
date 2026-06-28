#!/usr/bin/env node
// Thunder Bay AI social engine — calcified renderer.
// Turns one weekly spec (the editorial choices: cover hook + 5 stories + CTA) into the
// full social set: an 8-slide carousel (1080x1350), a ~10s reel MP4 (1080x1920), a story
// frame (1080x1920), and captions.json. Deterministic; the LLM owns the spec, this owns
// the pixels. Standing rules baked in (social-carousel-standards): scroll-stopping cover +
// follow/comment/save CTA. GOTCHA: no CSS filter:blur on the tall stacked page — it times
// out the screenshot rasterizer; glows are plain radial-gradients.
//
// Usage: node scripts/social/generate.mjs <spec.json> [outDir]
import puppeteer from 'puppeteer';
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const specPath = process.argv[2];
if (!specPath) { console.error('usage: generate.mjs <spec.json> [outDir]'); process.exit(1); }
const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
const outDir = process.argv[3] || path.join(path.dirname(specPath), 'out', spec.iso || 'latest');
fs.mkdirSync(outDir, { recursive: true });

const PALETTE = ['#00f0ff', '#ff4db8', '#1fd97a', '#7b9bff', '#b800ff'];
const items = (spec.items || []).map((it, i) => ({ accent: PALETTE[i % PALETTE.length], ...it }));

const bolt = (s) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none"><defs><linearGradient id="b${s}" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse"><stop stop-color="#00f0ff"/><stop offset="1" stop-color="#b800ff"/></linearGradient></defs><path d="M13.5 2 4 13.2a.6.6 0 0 0 .46.99H10l-1.4 7.2a.4.4 0 0 0 .72.3L20 11.5a.6.6 0 0 0-.47-.98H14l1.2-8.2a.4.4 0 0 0-.7-.32z" fill="url(#b${s})"/></svg>`;
const esc = (s) => String(s == null ? '' : s);

async function shoot(html, w, h, count, namer, page) {
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'load', timeout: 30000 });
  await new Promise((r) => setTimeout(r, 1900));
  for (let i = 0; i < count; i++) {
    await page.screenshot({ path: path.join(outDir, namer(i)), type: 'png', clip: { x: 0, y: i * h, width: w, height: h } });
  }
}

// ---------- CAROUSEL (1080x1350) ----------
function carouselHtml() {
  const W = 1080, H = 1350;
  const N = 2 + items.length + 1; // cover + items + summary + cta
  const bg = (i, accent) => { const t = i / (N - 1); const ax = 8 + t * 78, bx = 92 - t * 78; const a = accent || '#00f0ff'; return `radial-gradient(720px circle at ${ax}% 14%, ${a}26 0%, transparent 52%),radial-gradient(760px circle at ${bx}% 88%, #b800ff22 0%, transparent 52%),hsl(224,33%,4%)`; };
  const slides = [];
  // cover
  slides.push({ accent: '#00f0ff', html: `<div class="issue"><span class="dot"></span>THE SIGNAL · NO.${esc(spec.issueNo)} · ${esc(spec.dateLabel)}</div><h1 class="cov">${esc(spec.cover.hook)}</h1><div class="sub">${esc(spec.cover.sub)}</div><div class="bar"></div>` });
  // items
  items.forEach((s) => slides.push({ accent: s.accent, html: `<div class="chip"><span class="cdot" style="background:${s.accent}"></span>${esc(s.tag)}</div><div class="bigwrap"><div class="big" style="font-size:${s.bigSize};background:linear-gradient(120deg,${s.accent},#ffffff 130%);-webkit-background-clip:text;-webkit-text-fill-color:transparent">${esc(s.big)}</div></div><h1 class="nh">${esc(s.title)}</h1><div class="body">${esc(s.body)}</div><div class="tease" style="color:${s.accent}">${esc(s.tease)}</div>` }));
  // summary
  slides.push({ accent: '#00f0ff', html: `<div class="chip"><span class="cdot" style="background:#00f0ff"></span>THE THROUGHLINE</div><h1 class="nh" style="font-size:62px">${esc(spec.summary.title)}</h1><div class="body" style="font-size:31px">${esc(spec.summary.body)}</div>` });
  // cta
  slides.push({ accent: '#b800ff', html: `<div class="issue"><span class="dot"></span>STAY ON THE SIGNAL</div><h1 class="cov" style="font-size:64px">Follow for the weekly <span class="grad">Signal</span></h1><div class="actions"><div class="act"><span class="an">${bolt(26)}</span><div><b>Follow @${esc(spec.handle)}</b><div class="ad">The AI signal for the Northwest, every week.</div></div></div><div class="act"><span class="an">?</span><div><b>Comment</b><div class="ad">Which of these matters most to your business?</div></div></div><div class="act"><span class="an">+</span><div><b>Save &amp; share</b><div class="ad">Send this to a Northwest owner who should see it.</div></div></div></div><div class="link">Full breakdown — link in bio</div>`, cta: true });
  const slide = (s, i) => `<div class="slide" style="background:${bg(i, s.accent)}"><div class="frame"><div class="top"><div class="brand">${bolt(40)}<span>Thunder Bay <span class="ac">AI</span></span></div><div class="pg">${i + 1} / ${N}</div></div><div class="mid">${s.html}</div><div class="foot"><span class="handle">thunderbayai.com</span>${s.cta ? '' : '<span class="sw">swipe &rarr;</span>'}</div></div></div>`;
  return { W, H, N, html: `<!doctype html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&family=Space+Grotesk:wght@400;500;600&display=swap" rel="stylesheet"><style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Outfit',sans-serif}
.slide{width:${W}px;height:${H}px;overflow:hidden;color:#fff;position:relative}
.frame{position:absolute;inset:0;padding:74px 70px 64px;display:flex;flex-direction:column;z-index:2}
.top{display:flex;align-items:center;justify-content:space-between}
.brand{display:flex;align-items:center;gap:14px}.brand span{font-size:28px;font-weight:800;letter-spacing:-.02em}
.ac,.grad{background:linear-gradient(135deg,#00f0ff,#b800ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.pg{font-family:'Space Grotesk',monospace;font-size:21px;color:hsl(224,16%,60%)}
.mid{flex:1;display:flex;flex-direction:column;justify-content:center}
.issue{display:inline-flex;align-items:center;gap:13px;font-family:'Space Grotesk',monospace;font-size:22px;letter-spacing:.16em;text-transform:uppercase;color:hsl(184,100%,64%);margin-bottom:30px}
.dot{width:9px;height:9px;border-radius:50%;background:hsl(184,100%,52%)}
.cov{font-weight:900;font-size:82px;letter-spacing:-.04em;line-height:.99;margin-bottom:26px}
.sub{font-size:34px;line-height:1.38;color:hsl(224,16%,84%);max-width:900px}
.bar{height:7px;width:200px;border-radius:4px;margin-top:42px;background:linear-gradient(90deg,#00f0ff,#b800ff,transparent)}
.chip{display:inline-flex;align-items:center;gap:13px;align-self:flex-start;font-family:'Space Grotesk',monospace;font-size:21px;letter-spacing:.16em;text-transform:uppercase;color:hsl(224,16%,78%);padding:11px 20px;border:1px solid hsla(0,0%,100%,.12);border-radius:100px;margin-bottom:28px}
.cdot{width:11px;height:11px;border-radius:50%}
.bigwrap{margin:6px 0 22px}
.big{font-weight:900;letter-spacing:-.045em;line-height:.9}
.nh{font-weight:800;font-size:56px;letter-spacing:-.03em;line-height:1.04;margin-bottom:20px}
.body{font-size:32px;line-height:1.45;color:hsl(224,16%,80%);max-width:900px}
.tease{margin-top:30px;font-family:'Space Grotesk',monospace;font-size:24px;font-weight:500}
.actions{display:flex;flex-direction:column;gap:26px;margin-top:38px}
.act{display:flex;align-items:center;gap:22px}.act b{font-weight:700;font-size:34px}
.an{flex:0 0 auto;width:58px;height:58px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Space Grotesk',monospace;font-size:30px;font-weight:600;color:#04060c;background:linear-gradient(135deg,#00f0ff,#b800ff)}
.ad{color:hsl(224,16%,74%);font-size:26px;line-height:1.3;margin-top:3px}
.link{margin-top:40px;font-family:'Space Grotesk',monospace;font-size:25px;color:hsl(184,100%,64%)}
.foot{display:flex;align-items:center;justify-content:space-between}
.handle{font-family:'Space Grotesk',monospace;font-size:22px;color:hsl(224,16%,46%)}
.sw{font-family:'Space Grotesk',monospace;font-size:24px;color:hsl(224,16%,58%)}
</style></head><body>${slides.map(slide).join('')}</body></html>` };
}

// ---------- REEL + STORY (1080x1920) ----------
function vertHtml() {
  const W = 1080, H = 1920;
  const reel = [
    { kind: 'hook', accent: '#ff4db8', title: esc(spec.cover.hook), sub: esc(spec.reelSub || 'And more moves that hit the Northwest this week.') },
    ...items.map((s) => ({ kind: 'kw', accent: s.accent, big: esc(s.big), bigSize: (parseInt(s.bigSize) > 130 ? '300px' : '170px'), sub: esc(s.reelLine || s.tease.replace(/^Next: ?/, '').replace(/->$/, '').trim() || s.title) })),
    { kind: 'mid', accent: '#00f0ff', title: 'The AI signal for the Northwest.', sub: 'Every week. Localized. Reviewed by humans.' },
    { kind: 'cta', accent: '#b800ff', title: `Follow @${esc(spec.handle)}`, sub: 'Link in bio for the full Signal.' },
  ];
  const story = { kind: 'story', accent: '#ff4db8', title: esc(spec.cover.hook), sub: esc(spec.storySub || 'What it means for a Northwest business.'), cta: 'Read the full Signal — link in bio' };
  const frames = [story, ...reel];
  const bg = (a) => `radial-gradient(820px circle at 22% 16%, ${a}2e 0%, transparent 55%),radial-gradient(880px circle at 82% 86%, #b800ff26 0%, transparent 55%),hsl(224,33%,4%)`;
  const frame = (f) => {
    let mid = '';
    if (f.kind === 'kw') mid = `<div class="big" style="font-size:${f.bigSize};background:linear-gradient(120deg,${f.accent},#fff 135%);-webkit-background-clip:text;-webkit-text-fill-color:transparent">${f.big}</div><div class="sub">${f.sub}</div>`;
    else mid = `<div class="hl" style="font-size:${f.kind === 'hook' || f.kind === 'story' ? '86px' : (f.kind === 'cta' ? '78px' : '82px')}">${f.title}</div><div class="sub">${f.sub}</div>`;
    const footer = f.kind === 'story' ? `<div class="storycta">${f.cta}</div>` : (f.kind === 'cta' ? '' : '<div class="vhandle">thunderbayai.com</div>');
    return `<div class="vf" style="background:${bg(f.accent)}"><div class="vwrap"><div class="vtop">${bolt(46)}<span>Thunder Bay <span class="ac">AI</span></span></div><div class="vmid">${mid}</div><div class="vbot">${footer}</div></div></div>`;
  };
  return { W, H, count: frames.length, html: `<!doctype html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;800;900&family=Space+Grotesk:wght@500&display=swap" rel="stylesheet"><style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Outfit',sans-serif}
.vf{width:${W}px;height:${H}px;overflow:hidden;color:#fff;position:relative}
.vwrap{position:absolute;inset:0;padding:130px 90px 150px;display:flex;flex-direction:column;z-index:2}
.vtop{display:flex;align-items:center;gap:18px}.vtop span{font-size:38px;font-weight:800;letter-spacing:-.02em}
.ac{background:linear-gradient(135deg,#00f0ff,#b800ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.vmid{flex:1;display:flex;flex-direction:column;justify-content:center}
.big{font-weight:900;letter-spacing:-.05em;line-height:.88;margin-bottom:34px}
.hl{font-weight:900;letter-spacing:-.04em;line-height:1.0;margin-bottom:34px}
.sub{font-size:44px;line-height:1.32;color:hsl(224,16%,84%);font-weight:400}
.vbot{min-height:60px;display:flex;align-items:flex-end}
.vhandle{font-family:'Space Grotesk',monospace;font-size:30px;color:hsl(224,16%,52%)}
.storycta{font-family:'Space Grotesk',monospace;font-size:36px;color:hsl(184,100%,64%);font-weight:500}
</style></head><body>${frames.map(frame).join('')}</body></html>` };
}

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'], protocolTimeout: 120000 });
  const page = await browser.newPage();

  const car = carouselHtml();
  await shoot(car.html, car.W, car.H, car.N, (i) => `carousel-${String(i + 1).padStart(2, '0')}.png`, page);
  console.log('  carousel:', car.N, 'slides');

  const vert = vertHtml();
  await shoot(vert.html, vert.W, vert.H, vert.count, (i) => i === 0 ? 'story.png' : `reel-${String(i).padStart(2, '0')}.png`, page);
  console.log('  story + reel frames:', vert.count - 1, 'reel frames');

  await browser.close();

  // assemble reel.mp4 from reel-*.png
  const reelFrames = fs.readdirSync(outDir).filter((f) => /^reel-\d+\.png$/.test(f)).sort();
  const listPath = path.join(outDir, 'reel-list.txt');
  let list = '';
  reelFrames.forEach((f, i) => { const d = i === 0 ? 1.9 : (i === reelFrames.length - 1 ? 1.9 : (i === reelFrames.length - 2 ? 1.5 : 1.2)); list += `file '${f}'\nduration ${d}\n`; });
  list += `file '${reelFrames[reelFrames.length - 1]}'\n`;
  fs.writeFileSync(listPath, list);
  execFileSync('ffmpeg', ['-y', '-f', 'concat', '-safe', '0', '-i', listPath, '-vf', 'fps=30,scale=1080:1920,format=yuv420p', '-c:v', 'libx264', '-movflags', '+faststart', path.join(outDir, 'reel.mp4')], { stdio: 'ignore' });
  console.log('  reel.mp4 assembled');

  // captions
  fs.writeFileSync(path.join(outDir, 'captions.json'), JSON.stringify(spec.captions || {}, null, 2));
  console.log('Done ->', outDir);
})();
