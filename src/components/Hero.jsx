import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { AnimatedGridPattern } from './AnimatedGridPattern';
import { scrollToId } from '../lib/smoothScroll';
import { useIsMobile } from '../lib/useIsMobile';
import { GRANTS_DATA } from '../data';

export default function Hero() {
  const containerRef = useRef(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Spring-smoothed scroll progress -> buttery parallax (the raw value was stiff)
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 24, restDelta: 0.001 });
  const y = useTransform(smooth, [0, 1], ["0%", "45%"]);
  const opacity = useTransform(smooth, [0, 0.6], [1, 0]);
  const scale = useTransform(smooth, [0, 1], [1, 1.12]);

  const handleScrollTo = (id) => scrollToId(id);

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
            AI FOR NORTHWESTERN ONTARIO
          </span>

          <h1 style={styles.title}>
            Understand AI.
            <br />
            <span className="accent-text">Find the funding.</span>
          </h1>

          <p style={styles.subtitle}>
            A free local resource tracking the AI news, tools, and grants worth knowing for
            Northwestern Ontario — in plain language, no hype. Updated weekly, reviewed by humans.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={styles.ctaGroup}
        >
          <Link
            to="/blog"
            className="btn btn-cyan"
            style={{ ...styles.ctaPrimary, textDecoration: 'none' }}
          >
            Read the Journal
            <span>→</span>
          </Link>
          <button
            className="btn btn-secondary"
            style={styles.ctaSecondary}
            onClick={() => handleScrollTo('weekly-brief')}
          >
            Get the weekly brief
          </button>
        </motion.div>

        {/* Floating statistics panel */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ ...styles.statsContainer, flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '24px' : 0 }}
          className="glass-panel"
        >
          <div style={styles.statBox}>
            <span style={styles.statNumber} className="accent-text">Free</span>
            <span style={styles.statLabel}>Always free to read</span>
          </div>
          {!isMobile && <div style={styles.statDivider} />}
          <div style={styles.statBox}>
            <span style={styles.statNumber} className="accent-text">$200M</span>
            <span style={styles.statLabel}>Regional AI funding tracked</span>
          </div>
          {!isMobile && <div style={styles.statDivider} />}
          <div style={styles.statBox}>
            <span style={styles.statNumber} className="accent-text">{GRANTS_DATA.length}</span>
            <span style={styles.statLabel}>Funding programs tracked</span>
          </div>
        </motion.div>
      </div>

      {/* Bouncing scroll indicator (from Stitch) */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={styles.scrollIndicator}
      >
        <ChevronDown size={32} strokeWidth={1} color="hsl(var(--text-muted))" />
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
    background: 'linear-gradient(to bottom, transparent 0%, hsla(45, 33%, 98%, 0.25) 50%, hsl(45 33% 98%) 100%)',
    zIndex: 10,
  },
  gridPattern: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    maskImage: 'radial-gradient(600px circle at center, white, transparent)',
    WebkitMaskImage: 'radial-gradient(600px circle at center, white, transparent)',
    stroke: 'hsla(222, 20%, 20%, 0.07)',
    fill: 'hsla(222, 20%, 20%, 0.04)',
    color: 'hsl(192 91% 36%)',
    pointerEvents: 'none',
    zIndex: 1,
  },
  glowCircle1: {
    position: 'absolute',
    top: '5%',
    left: '10%',
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, hsla(192, 91%, 40%, 0.12) 0%, transparent 70%)',
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
    background: 'radial-gradient(circle, hsla(262, 68%, 48%, 0.09) 0%, transparent 70%)',
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
    background: 'radial-gradient(circle, hsla(160, 60%, 40%, 0.07) 0%, transparent 70%)',
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
    fontWeight: 600,
    fontSize: 'clamp(38px, 7.5vw, 78px)',
    letterSpacing: '-0.015em',
    lineHeight: 1.04,
    marginBottom: '28px',
  },
  subtitle: {
    fontSize: '19px',
    color: 'hsl(var(--text-secondary))',
    maxWidth: '640px',
    marginBottom: '44px',
    lineHeight: 1.65,
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
    fontSize: '11px',
    letterSpacing: '0.18em',
    color: 'hsl(var(--text-muted))',
    fontWeight: '400',
    textTransform: 'uppercase',
  },
  statDivider: {
    width: '1px',
    height: '40px',
    background: 'hsla(var(--border-light))',
  },
  scrollIndicator: {
    position: 'absolute',
    bottom: '40px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 20,
  },
};
