import { useEffect } from 'react';

const SITE = 'https://thunderbayai.com';

function setTag(selector, create, attr, value) {
  if (!value) return;
  let el = document.head.querySelector(selector);
  if (!el) { el = create(); document.head.appendChild(el); }
  el.setAttribute(attr, value);
}

// Per-route <title>, meta description, and canonical. The prerender captures the
// DOM after these run, so each static page ships its own SEO head — what crawlers
// and AI engines read.
export function useDocumentMeta({ title, description, path }) {
  useEffect(() => {
    if (title) document.title = title;
    setTag('meta[name="description"]', () => { const m = document.createElement('meta'); m.setAttribute('name', 'description'); return m; }, 'content', description);
    setTag('meta[property="og:title"]', () => { const m = document.createElement('meta'); m.setAttribute('property', 'og:title'); return m; }, 'content', title);
    setTag('meta[property="og:description"]', () => { const m = document.createElement('meta'); m.setAttribute('property', 'og:description'); return m; }, 'content', description);
    if (path) setTag('link[rel="canonical"]', () => { const l = document.createElement('link'); l.setAttribute('rel', 'canonical'); return l; }, 'href', `${SITE}${path}`);
  }, [title, description, path]);
}
