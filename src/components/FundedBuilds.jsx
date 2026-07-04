import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import TiltCard from './TiltCard';
import { scrollToId } from '../lib/smoothScroll';
import { useIsMobile } from '../lib/useIsMobile';

export default function FundedBuilds() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const isMobile = useIsMobile();

  const handleScrollTo = (id) => scrollToId(id);

  // Stitch-style word-by-word reveal
  const headlineWords = "Run by an agent. Read by humans.".split(" ");

  return (
    <section id="funded-builds" style={styles.buildsSection}>
      <div className="container">
        {/* Word-by-word header reveal from Stitch */}
        <div style={{ ...styles.headerGrid, gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '40px' : '60px' }}>
          <motion.div ref={ref} style={styles.headerLeft}>
            <span className="font-label" style={{ marginBottom: '24px', display: 'block' }}>
              THE AUTONOMOUS ENGINE
            </span>
            <h2 style={styles.bigTitle}>
              {headlineWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: 'inline-block', marginRight: '12px' }}
                >
                  {word}
                </motion.span>
              ))}
            </h2>
            <div style={styles.bodyText}>
              <p>
                This hub is not hand-curated. An autonomous agent watches the sources across the
                region around the clock, pulls out what is actually relevant to the Northwest, and
                drafts it into plain-language briefs.
              </p>
              <p style={{ marginTop: '16px' }}>
                The one rule it never breaks: <strong>nothing publishes unread</strong>. A human
                checks every draft for accuracy before it goes live — signal, not slop.
              </p>
            </div>
          </motion.div>

          {/* Steps grid (Stitch skill-cards style) */}
          <div style={{ ...styles.stepsGrid, gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)' }}>
            {[
              {
                num: '01',
                title: 'Monitor',
                desc: 'Scans regional and national sources around the clock — institutions, news, government and municipal pages, program updates — for anything AI-relevant to the Northwest.',
              },
              {
                num: '02',
                title: 'Structure',
                desc: 'Extracts what actually matters — who, what, the deadline, who it affects — and dedupes the noise into a clean, searchable index.',
              },
              {
                num: '03',
                title: 'Surface',
                desc: 'Ranks what is worth your attention and drafts it as plain-language briefs — the Journal and the weekly digest.',
              },
              {
                num: '04',
                title: 'Human review',
                desc: 'Nothing publishes unread. A person checks every draft for accuracy before it goes live — the guardrail against AI slop.',
              },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <TiltCard
                  className="glass-panel group"
                  style={styles.stepCard}
                >
                  <div style={styles.stepNum} className="accent-text">{step.num}</div>
                  <span style={styles.stepLabel}>{step.title}</span>
                  <span style={styles.stepValue}>{step.desc}</span>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <TiltCard
            style={{ ...styles.ctaBox, flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '24px' : '0', padding: isMobile ? '32px 24px' : '48px 60px', textAlign: isMobile ? 'center' : 'left' }}
            className="glass-panel"
          >
            <div style={styles.ctaContent}>
              <h3 style={styles.ctaTitle}>Get the signal, once a week.</h3>
              <p style={styles.ctaDesc}>
                One email: the AI, funding, government, and tech moves that matter for Northwestern
                Ontario — already filtered, no noise. Read by a human before it reaches you.
              </p>
            </div>
            <button
              className="btn btn-cyan"
              style={styles.ctaBtn}
              onClick={() => handleScrollTo('weekly-brief')}
            >
              Subscribe to the brief
              <span>→</span>
            </button>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}

const styles = {
  buildsSection: {
    background: 'hsl(var(--bg-base))',
    borderTop: '1px solid hsla(0, 0%, 100%, 0.03)',
    overflow: 'hidden',
  },
  headerGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '60px',
    alignItems: 'center',
    marginBottom: '80px',
  },
  headerLeft: {
    overflow: 'hidden',
  },
  bigTitle: {
    fontFamily: 'var(--font-heading)',
    fontWeight: 800,
    fontSize: 'clamp(32px, 5vw, 56px)',
    letterSpacing: '-0.04em',
    lineHeight: 0.95,
    marginBottom: '24px',
    overflow: 'hidden',
  },
  bodyText: {
    fontSize: '16px',
    color: 'hsl(224, 16%, 70%)',
    lineHeight: 1.6,
  },
  stepsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
  },
  stepCard: {
    padding: '28px 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '8px',
    transition: 'border-color 0.3s ease',
  },
  stepNum: {
    fontSize: '32px',
    fontWeight: '900',
    fontFamily: 'var(--font-heading)',
    lineHeight: '1',
    marginBottom: '8px',
  },
  stepLabel: {
    fontFamily: 'var(--font-label)',
    fontSize: '11px',
    letterSpacing: '0.18em',
    color: 'hsl(224, 16%, 72%)',
    textTransform: 'uppercase',
    marginBottom: '4px',
  },
  stepValue: {
    fontSize: '13px',
    color: 'hsl(224, 16%, 72%)',
    lineHeight: 1.55,
  },
  ctaBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '48px 60px',
    textAlign: 'left',
    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(6, 182, 212, 0.05) 100%)',
    borderColor: 'hsla(184, 100%, 48%, 0.15)',
    boxShadow: 'var(--accent-shadow)',
    borderRadius: '24px',
  },
  ctaContent: {
    maxWidth: '680px',
  },
  ctaTitle: {
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '12px',
  },
  ctaDesc: {
    fontSize: '15px',
    color: 'hsl(var(--text-secondary))',
    lineHeight: '1.5',
  },
  ctaBtn: {
    padding: '16px 36px',
    fontSize: '16px',
    whiteSpace: 'nowrap',
  },
};
