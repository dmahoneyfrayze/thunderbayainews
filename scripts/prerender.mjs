#!/usr/bin/env node
// Prerender the SPA routes to static HTML so crawlers and AI engines receive
// real content (the GEO/Layer-1 bet). Same pattern proven on frayze.ca:
// serve dist, drive it with headless Chrome, save the rendered DOM per route.
// Runs in `npm run build` after `vite build`; Chrome is provisioned by the
// postinstall (`puppeteer browsers install chrome`).
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import { POSTS } from '../src/data/posts.js';
import { GRANTS_DATA } from '../src/data.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(process.cwd(), 'dist');

const routes = [
  '/', '/about', '/funding', '/privacy', '/terms', '/blog', '/feed',
  ...POSTS.map((p) => `/blog/${p.slug}`),
  ...GRANTS_DATA.map((g) => `/funding/${g.id}`),
];

const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2', '.ico': 'image/x-icon' };

const startServer = () =>
  new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let filePath = path.join(distPath, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        if (fs.existsSync(path.join(filePath, 'index.html'))) filePath = path.join(filePath, 'index.html');
        else filePath = path.join(distPath, 'index.html'); // SPA fallback
      }
      const type = MIME[path.extname(filePath)] || 'text/html';
      fs.readFile(filePath, (err, content) => {
        if (err) { res.writeHead(200, { 'Content-Type': 'text/html' }); res.end(fs.readFileSync(path.join(distPath, 'index.html'))); }
        else { res.writeHead(200, { 'Content-Type': type }); res.end(content); }
      });
    });
    server.listen(4178, '127.0.0.1', () => resolve(server));
  });

const run = async () => {
  console.log('Prerendering', routes.length, 'routes...');
  const server = await startServer();
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  try {
    for (const route of routes) {
      try {
        await page.goto(`http://127.0.0.1:4178${route}`, { waitUntil: 'networkidle0', timeout: 60000 });
        try { await page.waitForSelector('h1, h2', { timeout: 15000 }); } catch { /* capture anyway */ }
        // Reveal-safe capture: framer-motion ships initial={opacity:0} until a whileInView
        // scroll fires — which a crawler never does — so the static HTML would otherwise
        // ship the hero, stats and funding cards invisible. Force every reveal element to
        // its visible resting state before capturing; real browsers re-hydrate and still
        // animate on scroll. See [[prerender-safe-motion]].
        await page.evaluate(() => {
          document.querySelectorAll('[style*="opacity: 0"], [style*="opacity:0"]').forEach((el) => {
            el.style.opacity = '1';
            el.style.transform = 'none';
          });
        });
        const html = await page.content();
        const dir = route === '/' ? distPath : path.join(distPath, route.replace(/^\/|\/$/g, ''));
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'index.html'), html);
        console.log('  saved', route);
      } catch (e) {
        console.error('  FAILED', route, e.message);
      }
    }
    // Real 404 (NotFound route renders Home in this app; capture a generic shell as 404)
    await page.goto('http://127.0.0.1:4178/__not-found__', { waitUntil: 'networkidle0', timeout: 60000 });
    fs.writeFileSync(path.join(distPath, '404.html'), await page.content());
    console.log('  saved 404.html');

    // sitemap.xml + robots.txt (crawl essentials for ranking)
    const SITE = 'https://thunderbayai.com';
    const today = new Date().toISOString().slice(0, 10);
    // Netlify pretty-URLs 301s every non-slash path to its trailing-slash form, so the
    // sitemap MUST list the trailing-slash canonical — else Google files each URL as
    // "Page with redirect" and never indexes it.
    const canon = (r) => (r === '/' ? '/' : r.endsWith('/') ? r : `${r}/`);
    const urls = routes
      .map((r) => `  <url><loc>${SITE}${canon(r)}</loc><lastmod>${today}</lastmod></url>`)
      .join('\n');
    fs.writeFileSync(
      path.join(distPath, 'sitemap.xml'),
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
    );

    // Google News sitemap — only articles published in the last 2 days qualify
    const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const cutoff = new Date(Date.now() - 2 * 864e5).toISOString().slice(0, 10);
    const newsItems = POSTS.filter((p) => p.iso >= cutoff).map((p) =>
      `  <url>\n    <loc>${SITE}/blog/${p.slug}/</loc>\n    <news:news>\n      <news:publication><news:name>Thunder Bay AI</news:name><news:language>en</news:language></news:publication>\n      <news:publication_date>${p.iso}</news:publication_date>\n      <news:title>${esc(p.title)}</news:title>\n    </news:news>\n  </url>`
    ).join('\n');
    fs.writeFileSync(
      path.join(distPath, 'news-sitemap.xml'),
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n${newsItems}\n</urlset>\n`
    );

    fs.writeFileSync(
      path.join(distPath, 'robots.txt'),
      `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\nSitemap: ${SITE}/news-sitemap.xml\n`
    );
    console.log('  saved sitemap.xml + news-sitemap.xml + robots.txt');
    console.log('Prerendering complete.');
  } finally {
    await browser.close();
    server.close();
  }
};

run().catch((e) => { console.error('Prerender failed:', e); process.exit(1); });
