import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock } from 'lucide-react';
import TiltCard from '../components/TiltCard';
import BriefSignup from '../components/BriefSignup';
import { POSTS } from '../data/posts';
import { useDocumentMeta } from '../lib/useDocumentMeta';

export default function Blog() {
  useDocumentMeta({
    title: 'The Journal — AI, tech, funding & government for Northwestern Ontario | Thunder Bay AI',
    description: 'Structured, source-linked breakdowns of the AI news, funding (FedNor RAII, NOIC BBAA), government moves, model comparisons, and practical tips that matter for Northwestern Ontario businesses.',
    path: '/blog',
  });
  return (
    <div style={styles.page}>
      {/* ambient glow */}
      <div style={styles.glow1} />
      <div style={styles.glow2} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={styles.header}
        >
          <span className="font-label">THE JOURNAL</span>
          <h1 style={styles.title}>
            Everything AI,<br />
            <span className="accent-text">for Northwestern Ontario</span>
          </h1>
          <p style={styles.dek}>
            Local tech and AI news and what it means for the region — for businesses,
            municipalities, and the people here. Model breakdowns, practical tips, government and
            funding moves, and honest takes on the tools. The signal for AI in the Northwest.
          </p>
          <span style={styles.cadence}>New briefs published weekly — checked by a human before they go live.</span>
        </motion.div>

        <div style={styles.grid}>
          {POSTS.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard className="glass-panel tilt-card" style={styles.card} max={6}>
                <Link to={`/blog/${post.slug}`} style={styles.cardLink}>
                  <div style={{ ...styles.cardAccent, background: `linear-gradient(90deg, ${post.accent[0]}, ${post.accent[1]})` }} />
                  <div style={styles.cardTop}>
                    <span className="badge badge-active" style={styles.cat}>{post.category}</span>
                    <ArrowUpRight size={18} color="hsl(var(--text-muted))" />
                  </div>
                  <h2 style={styles.cardTitle}>{post.title}</h2>
                  <p style={styles.cardDek}>{post.dek}</p>
                  <div style={styles.cardMeta}>
                    <span>{post.date}</span>
                    <span style={styles.metaDot} />
                    <span style={styles.readMins}><Clock size={13} /> {post.readMins} min read</span>
                  </div>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop: '64px' }}>
          <BriefSignup heading="Never miss the Northwest's AI signal" />
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    position: 'relative',
    minHeight: '100vh',
    padding: '160px 0 120px',
    overflow: 'hidden',
  },
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
  header: { maxWidth: '760px', marginBottom: '64px' },
  title: {
    fontFamily: 'var(--font-heading)', fontWeight: 800,
    fontSize: 'clamp(36px, 6vw, 64px)', letterSpacing: '-0.04em', lineHeight: 1.02,
    margin: '20px 0 24px',
  },
  dek: { fontSize: '18px', color: 'hsl(var(--text-secondary))', lineHeight: 1.6, maxWidth: '620px' },
  cadence: { display: 'block', marginTop: '18px', fontFamily: 'var(--font-label)', fontSize: '12px', letterSpacing: '0.08em', color: 'hsl(var(--primary-cyan))' },
  grid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '28px',
  },
  card: { padding: 0, overflow: 'hidden', height: '100%' },
  cardLink: {
    display: 'flex', flexDirection: 'column', height: '100%',
    padding: '28px', textDecoration: 'none', color: 'inherit', position: 'relative',
  },
  cardAccent: { position: 'absolute', top: 0, left: 0, right: 0, height: '3px' },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  cat: { fontSize: '11px' },
  cardTitle: {
    fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700,
    lineHeight: 1.25, letterSpacing: '-0.02em', marginBottom: '12px',
  },
  cardDek: { fontSize: '14.5px', color: 'hsl(var(--text-secondary))', lineHeight: 1.6, marginBottom: '24px', flex: 1 },
  cardMeta: {
    display: 'flex', alignItems: 'center', gap: '10px',
    fontFamily: 'var(--font-label)', fontSize: '12px', color: 'hsl(var(--text-muted))',
    letterSpacing: '0.04em',
  },
  metaDot: { width: '3px', height: '3px', borderRadius: '50%', background: 'hsl(var(--text-muted))' },
  readMins: { display: 'inline-flex', alignItems: 'center', gap: '5px' },
};
