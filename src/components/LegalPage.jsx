import React from 'react';
import { motion } from 'framer-motion';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { useJsonLd } from '../lib/useJsonLd';

// Shared layout for the Privacy and Terms pages. Sections are data-driven: each body
// entry is a string (paragraph) or an array of strings (bullet list).
export default function LegalPage({ metaTitle, metaDesc, path, title, updated, lead, sections }) {
  useDocumentMeta({ title: metaTitle, description: metaDesc, path });
  useJsonLd({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `https://thunderbayai.com${path}`,
    url: `https://thunderbayai.com${path}`,
    name: title,
    description: metaDesc,
    inLanguage: 'en-CA',
    isPartOf: { '@id': 'https://thunderbayai.com/#website' },
    publisher: { '@type': 'Organization', name: 'Frayze', url: 'https://frayze.ca' },
  });

  return (
    <div style={styles.page}>
      <div style={styles.glow} />
      <article className="container" style={styles.wrap}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
          <span className="font-label" style={styles.eyebrow}>LEGAL</span>
          <h1 style={styles.title}>{title}</h1>
          <p style={styles.updated}>Last updated: {updated}</p>
          {lead && <p style={styles.lead}>{lead}</p>}
        </motion.div>

        {sections.map((s, i) => (
          <section key={i} style={styles.section}>
            <h2 style={styles.h2}>{s.h}</h2>
            {s.body.map((para, j) =>
              Array.isArray(para) ? (
                <ul key={j} style={styles.ul}>
                  {para.map((li, k) => (
                    <li key={k} style={styles.li}><span style={styles.bullet} /><span>{li}</span></li>
                  ))}
                </ul>
              ) : (
                <p key={j} style={styles.p}>{para}</p>
              )
            )}
          </section>
        ))}

        <p style={styles.note}>This page is general information, not legal advice.</p>
      </article>
    </div>
  );
}

const styles = {
  page: { position: 'relative', minHeight: '100vh', padding: '150px 0 120px', overflow: 'hidden' },
  glow: {
    position: 'absolute', top: '-5%', left: '50%', transform: 'translateX(-50%)',
    width: '700px', height: '460px', filter: 'blur(110px)', pointerEvents: 'none', zIndex: 1,
    background: 'radial-gradient(circle, hsla(184,100%,48%,0.10) 0%, hsla(275,80%,56%,0.06) 45%, transparent 72%)',
  },
  wrap: { position: 'relative', zIndex: 2, maxWidth: '760px' },
  eyebrow: { display: 'block', marginBottom: '20px' },
  title: { fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 52px)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '14px' },
  updated: { fontFamily: 'var(--font-label)', fontSize: '13px', letterSpacing: '0.04em', color: 'hsl(var(--text-muted))', marginBottom: '28px' },
  lead: { fontSize: '18px', color: 'hsl(224, 16%, 80%)', lineHeight: 1.6, marginBottom: '8px' },
  section: { marginTop: '44px' },
  h2: { fontFamily: 'var(--font-heading)', fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '14px', color: 'hsl(var(--text-primary))' },
  p: { fontSize: '16px', color: 'hsl(224, 16%, 74%)', lineHeight: 1.75, marginBottom: '14px' },
  ul: { listStyle: 'none', margin: '0 0 14px', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' },
  li: { display: 'flex', gap: '12px', fontSize: '16px', color: 'hsl(224, 16%, 74%)', lineHeight: 1.6 },
  bullet: { flexShrink: 0, width: '6px', height: '6px', borderRadius: '50%', marginTop: '10px', background: 'linear-gradient(135deg, hsl(var(--primary-cyan)), hsl(var(--primary-violet)))' },
  note: { marginTop: '52px', paddingTop: '24px', borderTop: '1px solid hsla(0,0%,100%,0.07)', fontSize: '14px', color: 'hsl(var(--text-muted))', fontStyle: 'italic' },
};
