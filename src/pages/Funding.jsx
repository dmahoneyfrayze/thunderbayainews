import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { GRANTS_DATA } from '../data';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { useJsonLd } from '../lib/useJsonLd';
import BriefSignup from '../components/BriefSignup';

const SITE = 'https://thunderbayai.com';
const count = GRANTS_DATA.length;

// Static, crawlable funding index. The interactive eligibility checker lives on the
// home Funding Radar (/#radar); this page is the rankable, AI-citable list (ItemList schema).
export default function Funding() {
  useDocumentMeta({
    title: `AI & business grants in Northwestern Ontario — ${count} programs (2026) | Thunder Bay AI`,
    description: `A verified, source-linked list of ${count} AI, technology, and business funding programs open to Northwestern Ontario — FedNor RAII, NOIC BBAA, NOHFC Invest North, NRC IRAP, SR&ED and more. Confirm eligibility with each program.`,
    path: '/funding',
  });

  useJsonLd({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE}/funding`,
        url: `${SITE}/funding`,
        name: `AI and business grants in Northwestern Ontario — ${count} verified programs (2026)`,
        description: `A verified, source-linked directory of ${count} AI, technology, and business funding programs available to Northwestern Ontario businesses and organizations.`,
        inLanguage: 'en-CA',
        isPartOf: { '@id': `${SITE}/#website` },
        about: { '@id': `${SITE}/#org` },
      },
      {
        '@type': 'ItemList',
        name: 'Funding and grant programs for Northwestern Ontario',
        numberOfItems: count,
        itemListOrder: 'https://schema.org/ItemListUnordered',
        itemListElement: GRANTS_DATA.map((g, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: g.name,
          url: g.sourceUrl,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
          { '@type': 'ListItem', position: 2, name: 'Funding', item: `${SITE}/funding` },
        ],
      },
    ],
  });

  return (
    <div style={styles.page}>
      <div style={styles.glow1} />
      <div style={styles.glow2} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={styles.header}
        >
          <span className="font-label">FUNDING RADAR</span>
          <h1 style={styles.title}>
            AI and business grants in{' '}
            <span className="accent-text">Northwestern Ontario</span>
          </h1>
          <p style={styles.dek}>
            A verified, source-linked list of {count} AI, technology, and business funding programs
            open to Northwestern Ontario businesses and organizations in 2026 — from FedNor RAII and
            NOIC BBAA to NOHFC Invest North, NRC IRAP, and SR&amp;ED. Each entry links to the official
            program page. Eligibility and amounts are decided by each program — always confirm directly
            before planning around a figure here.
          </p>
          <div style={styles.headerCtas}>
            <Link to="/" state={{ scrollTo: 'radar' }} className="btn btn-cyan" style={{ textDecoration: 'none' }}>
              Run the eligibility checker
            </Link>
            <Link to="/blog/fund-a-custom-ai-build-with-a-grant" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
              How to fund a build with a grant
            </Link>
          </div>
        </motion.div>

        <div style={styles.grid}>
          {GRANTS_DATA.map((g, i) => (
            <motion.div
              key={g.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel"
              style={{ ...styles.card, ...(g.featured ? styles.cardFeatured : {}) }}
            >
              {g.featured && <span style={styles.featuredTag}>FEATURED · AI ADOPTION</span>}
              <div style={styles.cardHead}>
                <span style={styles.source}>{g.source}</span>
                <span className={`badge badge-${g.badgeType}`}>{g.status}</span>
              </div>
              <h2 style={styles.cardTitle}>{g.name}</h2>
              <p style={styles.cardDesc}>{g.description}</p>
              <div style={styles.metaRow}>
                <div style={styles.metaCol}><span style={styles.metaLabel}>Max funding</span><span style={styles.metaValue} className="accent-text">{g.maxAmount}</span></div>
                <div style={styles.metaCol}><span style={styles.metaLabel}>Coverage</span><span style={styles.metaValue}>{g.coverage}</span></div>
                <div style={styles.metaCol}><span style={styles.metaLabel}>Deadline</span><span style={styles.metaValue}>{g.deadline}</span></div>
              </div>
              {g.sourceUrl && (
                <a href={g.sourceUrl} target="_blank" rel="noopener noreferrer" style={styles.officialLink}>
                  Official program page <ExternalLink size={14} />
                </a>
              )}
            </motion.div>
          ))}
        </div>

        {/* deeper reads */}
        <div style={styles.readsWrap}>
          <span className="font-label">GO DEEPER</span>
          <div style={styles.readsList}>
            <Link to="/blog/bbaa-ai-adoption-grant-northwestern-ontario" style={styles.readLink}><span>The BBAA grant: up to $20K to adopt AI</span> <ArrowUpRight size={15} /></Link>
            <Link to="/blog/fednor-raii-who-qualifies-thunder-bay" style={styles.readLink}><span>FedNor RAII: who actually qualifies</span> <ArrowUpRight size={15} /></Link>
            <Link to="/blog/noic-costarter-accelerator-readiness" style={styles.readLink}><span>NOIC Costarter: the Northwest's accelerator</span> <ArrowUpRight size={15} /></Link>
          </div>
        </div>

        <div style={{ marginTop: '48px' }}>
          <BriefSignup heading="New programs, deadlines, and AI moves — weekly" dek="The funding radar updates as programs open and close. Get the ones that matter for Northwestern Ontario in one email a week, checked by a human." />
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { position: 'relative', minHeight: '100vh', padding: '160px 0 120px', overflow: 'hidden' },
  glow1: { position: 'absolute', top: '-5%', left: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, hsla(184,100%,48%,0.10) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 1 },
  glow2: { position: 'absolute', top: '15%', right: '-8%', width: '500px', height: '500px', background: 'radial-gradient(circle, hsla(275,80%,56%,0.10) 0%, transparent 70%)', filter: 'blur(90px)', pointerEvents: 'none', zIndex: 1 },
  header: { maxWidth: '820px', marginBottom: '56px' },
  title: { fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(34px, 6vw, 60px)', letterSpacing: '-0.04em', lineHeight: 1.03, margin: '20px 0 24px' },
  dek: { fontSize: '18px', color: 'hsl(var(--text-secondary))', lineHeight: 1.65, maxWidth: '760px' },
  headerCtas: { display: 'flex', gap: '14px', marginTop: '28px', flexWrap: 'wrap' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' },
  card: { padding: '28px', borderRadius: '18px', display: 'flex', flexDirection: 'column' },
  cardFeatured: { borderColor: 'hsla(184,100%,48%,0.45)', boxShadow: '0 0 26px hsla(184,100%,48%,0.16)' },
  featuredTag: { fontFamily: 'var(--font-label)', fontSize: '10px', letterSpacing: '0.22em', fontWeight: 700, color: 'hsl(var(--primary-cyan))', marginBottom: '12px' },
  cardHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', gap: '10px' },
  source: { fontSize: '12px', fontWeight: 700, color: 'hsl(var(--primary-cyan))', textTransform: 'uppercase', letterSpacing: '0.05em' },
  cardTitle: { fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 700, lineHeight: 1.3, letterSpacing: '-0.02em', marginBottom: '12px' },
  cardDesc: { fontSize: '14px', color: 'hsl(var(--text-secondary))', lineHeight: 1.6, marginBottom: '22px', flex: 1 },
  metaRow: { display: 'flex', justifyContent: 'space-between', borderTop: '1px solid hsla(0,0%,100%,0.06)', paddingTop: '16px', marginBottom: '18px', gap: '12px' },
  metaCol: { display: 'flex', flexDirection: 'column' },
  metaLabel: { fontSize: '10px', color: 'hsl(var(--text-muted))', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' },
  metaValue: { fontSize: '12.5px', fontWeight: 600 },
  officialLink: { display: 'inline-flex', alignItems: 'center', gap: '7px', fontSize: '13px', fontWeight: 600, color: 'hsl(var(--primary-cyan))', textDecoration: 'none' },
  readsWrap: { marginTop: '64px' },
  readsList: { display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px', maxWidth: '620px' },
  readLink: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', padding: '14px 18px', borderRadius: '12px', textDecoration: 'none', color: 'hsl(var(--text-primary))', fontSize: '15px', fontWeight: 600, background: 'rgba(255,255,255,0.02)', border: '1px solid hsla(0,0%,100%,0.07)' },
};
