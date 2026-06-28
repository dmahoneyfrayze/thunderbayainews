import { useEffect } from 'react';

// Injects a per-route JSON-LD <script> into <head>. The prerender captures it, so
// each static page ships its own structured data — what AI engines and Google parse
// to understand the entity (the core GEO bet). One managed tag per route, replaced
// on navigation so stale schema never lingers.
const ID = 'route-jsonld';

export function useJsonLd(data) {
  useEffect(() => {
    if (!data) return;
    let el = document.getElementById(ID);
    if (!el) {
      el = document.createElement('script');
      el.type = 'application/ld+json';
      el.id = ID;
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);
    return () => {
      // leave it in place between routes; the next route overwrites textContent
    };
  }, [data]);
}
