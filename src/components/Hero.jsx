import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { AnimatedGridPattern } from './AnimatedGridPattern';

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Stitch-style parallax transforms
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={containerRef} id="hero" style={styles.heroSection}>
      {/* Parallax background layer with scale (Stitch effect) */}
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        {/* Gradient overlay */}
        <div style={styles.gradientOverlay} />
        {/* Animated grid pattern */}
        <AnimatedGridPattern
          style={styles.gridPattern}
          numSquares={40}
        />
        {/* Cosmic glow circles */}
        <div style={styles.glowCircle1} />
        <div style={styles.glowCircle2} />
        <div style={styles.glowCircle3} />
      </motion.div>

      {/* Content with scroll-linked opacity */}
      <div style={styles.contentWrap}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ opacity }}
        >
          <span className="font-label" style={styles.label}>
            AI-POWERED FUNDING & GROWTH SYSTEMS
          </span>

          <h1 style={styles.title}>
            UNLOCK{' '}
            <span className="accent-text">AI FUNDING</span>
            <br />
            FOR NWO BUSINESS
          </h1>

          <p style={styles.subtitle}>
            We track local funding programs, analyze your eligibility, and build custom AI-powered software—fully funded by regional development grants.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={styles.ctaGroup}
        >
          <button
            className="btn btn-cyan"
            style={styles.ctaPrimary}
            onClick={() => handleScrollTo('radar')}
          >
            Explore Active Grants
            <span>→</span>
          </button>
          <button
            className="btn btn-secondary"
            style={styles.ctaSecondary}
            onClick={() => handleScrollTo('funded-builds')}
          >
            Book Free Assessment
          </button>
        </motion.div>

        {/* Floating statistics panel */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={styles.statsContainer}
          className="glass-panel"
        >
          <div style={styles.statBox}>
            <span style={styles.statNumber} className="accent-text">$200M</span>
            <span style={styles.statLabel}>Federal AI Budget</span>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.statBox}>
            <span style={styles.statNumber} className="accent-text">Up to 75%</span>
            <span style={styles.statLabel}>Cost Coverage</span>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.statBox}>
            <span style={styles.statNumber} className="accent-text">0-Spec</span>
            <span style={styles.statLabel}>Frayze Risk Build</span>
          </div>
        </motion.div>
      </div>

      {/* Bouncing scroll indicator (from Stitch) */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={styles.scrollIndicator}
      >
        <ChevronDown size={32} strokeWidth={1} color="hsl(224, 16%, 52%)" />
      </motion.div>
    </section>
  );
}

const styles = {
  heroSection: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    overflow: 'hidden',
  },
  gradientOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to bottom, transparent 0%, rgba(4,5,8,0.2) 50%, hsl(224, 32%, 4%) 100%)',
    zIndex: 10,
  },
  gridPattern: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    maskImage: 'radial-gradient(600px circle at center, white, transparent)',
    WebkitMaskImage: 'radial-gradient(600px circle at center, white, transparent)',
    stroke: 'hsla(184, 100%, 48%, 0.06)',
    fill: 'hsla(184, 100%, 48%, 0.04)',
    color: 'hsl(184, 100%, 48%)',
    pointerEvents: 'none',
    zIndex: 1,
  },
  glowCircle1: {
    position: 'absolute',
    top: '5%',
    left: '10%',
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, hsla(184, 100%, 48%, 0.15) 0%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(60px)',
    pointerEvents: 'none',
  },
  glowCircle2: {
    position: 'absolute',
    bottom: '10%',
    right: '8%',
    width: '500px',
    height: '500px',
    background: 'radial-gradient(circle, hsla(275, 80%, 56%, 0.12) 0%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(80px)',
    pointerEvents: 'none',
  },
  glowCircle3: {
    position: 'absolute',
    top: '40%',
    right: '30%',
    width: '300px',
    height: '300px',
    background: 'radial-gradient(circle, hsla(250, 84%, 56%, 0.1) 0%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(50px)',
    pointerEvents: 'none',
  },
  contentWrap: {
    position: 'relative',
    zIndex: 20,
    padding: '120px 24px 60px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '1000px',
  },
  label: {
    marginBottom: '24px',
    display: 'block',
  },
  title: {
    fontFamily: 'var(--font-heading)',
    fontWeight: 800,
    fontSize: 'clamp(40px, 8vw, 80px)',
    letterSpacing: '-0.04em',
    lineHeight: 0.95,
    marginBottom: '28px',
  },
  subtitle: {
    fontSize: '18px',
    color: 'hsl(224, 16%, 76%)',
    maxWidth: '640px',
    marginBottom: '44px',
    lineHeight: 1.6,
  },
  ctaGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    marginBottom: '80px',
    flexWrap: 'wrap',
  },
  ctaPrimary: {
    fontSize: '16px',
    padding: '14px 32px',
  },
  ctaSecondary: {
    fontSize: '16px',
    padding: '14px 32px',
  },
  statsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: '800px',
    padding: '30px 20px',
  },
  statBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: '32px',
    fontWeight: '800',
    fontFamily: 'var(--font-heading)',
    marginBottom: '4px',
  },
  statLabel: {
    fontFamily: 'var(--font-label)',
    fontSize: '10px',
    letterSpacing: '0.2em',
    color: 'hsl(224, 16%, 52%)',
    fontWeight: '400',
    textTransform: 'uppercase',
  },
  statDivider: {
    width: '1px',
    height: '40px',
    background: 'hsla(0, 0%, 100%, 0.08)',
  },
  scrollIndicator: {
    position: 'absolute',
    bottom: '40px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 20,
  },
};
