import { useEffect } from 'react';

const SITE = 'https://thunderbayai.com';
const DEFAULT_IMAGE = `${SITE}/og.png`;
const SITE_NAME = 'Thunder Bay AI';

function setMeta(attr, key, value) {
  if (!value) return;
  const selector = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector(selector);
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
  el.setAttribute('content', value);
}

function setLink(rel, href) {
  if (!href) return;
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) { el = document.createElement('link'); el.setAttribute('rel', rel); document.head.appendChild(el); }
  el.setAttribute('href', href);
}

// Per-route <title>, description, canonical, and the full Open Graph + Twitter card.
// The prerender captures the DOM after these run, so each static page ships its own
// social/SEO head — what crawlers, social scrapers, and AI engines read.
export function useDocumentMeta({ title, description, path, image, type = 'website' }) {
  useEffect(() => {
    const url = path ? `${SITE}${path}` : undefined;
    const img = image || DEFAULT_IMAGE;

    if (title) document.title = title;
    setMeta('name', 'description', description);
    if (url) setLink('canonical', url);

    // Open Graph
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:site_name', SITE_NAME);
    setMeta('property', 'og:locale', 'en_CA');
    if (url) setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', img);
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height', '630');
    setMeta('property', 'og:image:alt', title || SITE_NAME);

    // Twitter / X
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', img);
  }, [title, description, path, image, type]);
}
