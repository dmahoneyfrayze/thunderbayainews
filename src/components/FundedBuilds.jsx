import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import TiltCard from './TiltCard';
import { scrollToId } from '../lib/smoothScroll';

export default function FundedBuilds() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const handleScrollTo = (id) => scrollToId(id);

  // Stitch-style word-by-word reveal
  const headlineWords = "YOUR AI SYSTEM FUNDED IN WEEKS.".split(" ");

  return (
    <section id="funded-builds" style={styles.buildsSection}>
      <div className="container">
        {/* Word-by-word header reveal from Stitch */}
        <div style={styles.headerGrid}>
          <motion.div ref={ref} style={styles.headerLeft}>
            <span className="font-label" style={{ marginBottom: '24px', display: 'block' }}>
              VERTICAL INTEGRATION
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
                Instead of spending your cash, leverage regional economic development funds. We help you write the application and build the technology it covers.
              </p>
              <p style={{ marginTop: '16px' }}>
                Frayze's model is structurally better than standard grant-writing services because we don't stop at the application — we <strong>deliver what the grant funds</strong>.
              </p>
            </div>
          </motion.div>

          {/* Steps grid (Stitch skill-cards style) */}
          <div style={styles.stepsGrid}>
            {[
              {
                num: '01',
                title: 'Discovery & Matching',
                desc: 'We assess your business needs (AI chatbot, client portal, internal CRM, or custom database) and match them with active grants (FedNor RAII, NOIC, CEDC).',
              },
              {
                num: '02',
                title: 'No-Spec Writing',
                desc: 'Our grant writers draft and submit the technical proposal on your behalf. We handle the paperwork and align with institutional mandates at zero spec-cost.',
              },
              {
                num: '03',
                title: 'Deliver & Scale',
                desc: 'Once approved, Frayze builds, deploys, and maintains your custom system. The project is paid for directly by the grant, protecting your operating cash.',
              },
              {
                num: '04',
                title: 'Ongoing Support',
                desc: 'Continued maintenance, analytics tracking, and growth automation. Your system compounds value long after the grant funds it.',
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
          <TiltCard style={styles.ctaBox} className="glass-panel">
            <div style={styles.ctaContent}>
              <h3 style={styles.ctaTitle}>Ready to build your next system with grant funding?</h3>
              <p style={styles.ctaDesc}>
                SMEs in Thunder Bay and Northern Ontario have access to a $200M federal AI wave. Let us verify your eligibility and write your tech application.
              </p>
            </div>
            <button
              className="btn btn-cyan"
              style={styles.ctaBtn}
              onClick={() => handleScrollTo('radar')}
            >
              Match My Grant Now
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
    fontSize: '10px',
    letterSpacing: '0.2em',
    color: 'hsl(224, 16%, 60%)',
    textTransform: 'uppercase',
    marginBottom: '4px',
  },
  stepValue: {
    fontSize: '13px',
    color: 'hsl(224, 16%, 70%)',
    lineHeight: 1.5,
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
