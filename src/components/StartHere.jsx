import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Newspaper, Coins, Sparkles, ArrowRight } from 'lucide-react';

// Wayfinding band right under the hero: three plain-language doors so a first-time
// visitor (often new to AI) immediately knows where to go. No jargon, no overwhelm.
const DOORS = [
  {
    icon: Newspaper,
    tint: 'hsla(192, 91%, 32%, 0.08)', ring: 'hsla(192, 91%, 32%, 0.22)', ink: 'hsl(192 82% 31%)',
    title: 'This week in AI',
    body: 'Plain-language updates on the AI news that actually affects the Northwest.',
    cta: 'Read the Journal',
    to: '/blog',
  },
  {
    icon: Coins,
    tint: 'hsla(262, 68%, 48%, 0.08)', ring: 'hsla(262, 68%, 48%, 0.2)', ink: 'hsl(var(--primary-violet))',
    title: 'Funding you can apply for',
    body: 'Over $200M in regional AI and tech grants — tracked and explained in plain terms.',
    cta: 'See the funding',
    to: '/funding',
  },
  {
    icon: Sparkles,
    tint: 'hsla(152, 60%, 32%, 0.09)', ring: 'hsla(152, 60%, 32%, 0.22)', ink: 'hsl(152 65% 27%)',
    title: 'New to AI? Start here',
    body: 'A simple, no-jargon guide to what AI is worth doing for a local business right now.',
    cta: 'Start with the basics',
    to: '/blog/ai-for-thunder-bay-businesses-2026',
  },
];

export default function StartHere() {
  return (
    <section id="start-here" style={styles.section}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          style={styles.head}
        >
          <span className="font-label" style={styles.eyebrow}>START HERE</span>
          <h2 style={styles.title}>Three ways to use this</h2>
          <p style={styles.sub}>Pick where you are. Everything here is free to read.</p>
        </motion.div>

        <div style={styles.grid}>
          {DOORS.map((d, i) => {
            const Icon = d.icon;
            return (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link to={d.to} className="glass-panel" style={styles.card}>
                  <span style={{ ...styles.iconWrap, background: d.tint, border: `1px solid ${d.ring}` }}>
                    <Icon size={26} strokeWidth={1.75} color={d.ink} />
                  </span>
                  <h3 style={styles.cardTitle}>{d.title}</h3>
                  <p style={styles.cardBody}>{d.body}</p>
                  <span style={{ ...styles.cardCta, color: d.ink }}>
                    {d.cta} <ArrowRight size={16} strokeWidth={2.25} />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    position: 'relative',
    zIndex: 20,
    padding: '20px 0 80px',
  },
  head: {
    textAlign: 'center',
    maxWidth: '640px',
    margin: '0 auto 44px',
  },
  eyebrow: {
    display: 'block',
    marginBottom: '14px',
  },
  title: {
    fontFamily: 'var(--font-heading)',
    fontWeight: 600,
    fontSize: 'clamp(28px, 4vw, 40px)',
    letterSpacing: '-0.015em',
    marginBottom: '12px',
  },
  sub: {
    fontSize: '17px',
    color: 'hsl(var(--text-muted))',
    lineHeight: 1.5,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    maxWidth: '1080px',
    margin: '0 auto',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: '100%',
    padding: '32px 30px',
    borderRadius: '18px',
    textDecoration: 'none',
    color: 'inherit',
  },
  iconWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '54px',
    height: '54px',
    borderRadius: '14px',
    marginBottom: '22px',
  },
  cardTitle: {
    fontFamily: 'var(--font-heading-sans)',
    fontWeight: 700,
    fontSize: '22px',
    letterSpacing: '-0.02em',
    marginBottom: '12px',
  },
  cardBody: {
    fontSize: '16px',
    color: 'hsl(var(--text-muted))',
    lineHeight: 1.55,
    marginBottom: '22px',
    flex: 1,
  },
  cardCta: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    fontFamily: 'var(--font-label)',
    fontSize: '14px',
    fontWeight: 600,
    letterSpacing: '0.02em',
  },
};
