import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const IgIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const FbIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
import TiltCard from '../components/TiltCard';
import BriefSignup from '../components/BriefSignup';
import FEED from '../data/socialFeed.json';
import { useDocumentMeta } from '../lib/useDocumentMeta';

const IG_URL = 'https://www.instagram.com/thunderbayai/';
const FB_URL = 'https://www.facebook.com/profile.php?id=908676642332247';

const fmtDate = (iso) => new Date(iso + 'T12:00:00').toLocaleDateString('en-CA', { month: 'long', day: 'numeric', year: 'numeric' });

export default function Feed() {
  useDocumentMeta({
    title: 'The Feed — daily AI signal cards for Northwestern Ontario | Thunder Bay AI',
    description: 'One card a day: AI news, funding programs, and practical moves for Northwestern Ontario businesses — the same cards we post to Instagram and Facebook, archived here.',
    path: '/feed',
  });
  return (
    <div style={styles.page}>
      <div style={styles.glow1} />
      <div style={styles.glow2} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={styles.header}
        >
          <span className="font-label">THE FEED</span>
          <h1 style={styles.title}>
            One card a day,<br />
            <span className="accent-text">for the Northwest</span>
          </h1>
          <p style={styles.dek}>
            The daily signal we post to social — funding programs, practical AI moves, and the
            news that matters here — archived where no algorithm decides whether you see it.
          </p>
          <div style={styles.followRow}>
            <a href={IG_URL} target="_blank" rel="noopener noreferrer" style={styles.followBtn}>
              <IgIcon /> Follow on Instagram
            </a>
            <a href={FB_URL} target="_blank" rel="noopener noreferrer" style={styles.followBtn}>
              <FbIcon /> Follow on Facebook
            </a>
          </div>
        </motion.div>

        <div style={styles.grid}>
          {FEED.map((post, i) => (
            <motion.div
              key={post.iso}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard className="glass-panel tilt-card" style={styles.card} max={5}>
                <a href={IG_URL} target="_blank" rel="noopener noreferrer" style={styles.cardLink} aria-label={`${post.hook} — see the full carousel on Instagram`}>
                  <img src={post.image} alt={`${post.pillar}: ${post.hook}`} width={800} height={1000} loading="lazy" decoding="async" style={styles.cardImg} />
                  <div style={styles.cardBody}>
                    <div style={styles.cardTop}>
                      <span className="badge badge-active" style={styles.cat}>{post.pillar}</span>
                      <ArrowUpRight size={16} color="hsl(var(--text-muted))" />
                    </div>
                    <p style={styles.hook}>{post.hook}</p>
                    <span style={styles.date}>{fmtDate(post.iso)}</span>
                  </div>
                </a>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop: '64px' }}>
          <BriefSignup heading="Get the weekly version in your inbox" />
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { position: 'relative', minHeight: '100vh', padding: '160px 0 120px', overflow: 'hidden' },
  glow1: {
    position: 'absolute', top: '-5%', left: '-5%', width: '500px', height: '500px',
    background: 'radial-gradient(circle, hsla(184,100%,48%,0.10) 0%, transparent 70%)',
    filter: 'blur(80px)', pointerEvents: 'none', zIndex: 1,
  },
  glow2: {
    position: 'absolute', top: '20%', right: '-8%', width: '500px', height: '500px',
    background: 'radial-gradient(circle, hsla(275,80%,56%,0.10) 0%, transparent 70%)',
    filter: 'blur(90px)', pointerEvents: 'none', zIndex: 1,
  },
  header: { maxWidth: '760px', marginBottom: '56px' },
  title: {
    fontFamily: 'var(--font-heading)', fontWeight: 800,
    fontSize: 'clamp(36px, 6vw, 64px)', letterSpacing: '-0.04em', lineHeight: 1.02,
    margin: '20px 0 24px',
  },
  dek: { fontSize: '18px', color: 'hsl(var(--text-secondary))', lineHeight: 1.6, maxWidth: '620px' },
  followRow: { display: 'flex', gap: '14px', marginTop: '26px', flexWrap: 'wrap' },
  followBtn: {
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    padding: '10px 18px', borderRadius: '999px',
    border: '1px solid hsla(0,0%,100%,0.14)', background: 'hsla(0,0%,100%,0.04)',
    color: 'hsl(var(--text-primary))', textDecoration: 'none',
    fontFamily: 'var(--font-label)', fontSize: '13px', letterSpacing: '0.04em',
  },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '28px' },
  card: { padding: 0, overflow: 'hidden', height: '100%' },
  cardLink: { display: 'flex', flexDirection: 'column', height: '100%', textDecoration: 'none', color: 'inherit' },
  cardImg: { width: '100%', height: 'auto', display: 'block', aspectRatio: '4 / 5', objectFit: 'cover' },
  cardBody: { padding: '20px 22px 22px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  cat: { fontSize: '11px' },
  hook: { fontFamily: 'var(--font-heading)', fontSize: '17px', fontWeight: 700, lineHeight: 1.35, letterSpacing: '-0.01em', flex: 1 },
  date: { fontFamily: 'var(--font-label)', fontSize: '12px', color: 'hsl(var(--text-muted))', letterSpacing: '0.04em' },
};
