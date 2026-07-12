import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import BoltMark from './BoltMark';
import { useSectionNav } from '../lib/useSectionNav';
import { useIsMobile } from '../lib/useIsMobile';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile(1024);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const goToSection = useSectionNav();
  const handleScrollTo = (id) => {
    setMobileMenuOpen(false);
    goToSection(id);
  };

  return (
    <header style={styles.header}>
      {/* Spring-physics progress bar (from Stitch) */}
      <motion.div
        style={{ scaleX, ...styles.progressBar }}
      />

      <div className="container" style={styles.navContainer}>
        {/* Logo with entrance animation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={styles.logo}
          onClick={() => handleScrollTo('hero')}
        >
          <BoltMark size={22} />
          <span style={styles.logoText}>Thunder Bay <span className="accent-text">AI</span></span>
        </motion.div>

        {/* Desktop nav links with staggered entrance */}
        {!isMobile && (
        <nav style={styles.desktopNav}>
          {[
            { label: 'JOURNAL', to: '/blog' },
            { label: 'FUNDING', to: '/funding' },
            { label: 'FEED', to: '/feed' },
            { label: 'ABOUT', to: '/about' },
          ].map((item, i) => (
            <motion.span
              key={item.to}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link to={item.to} style={{ ...styles.navLink, textDecoration: 'none' }}>{item.label}</Link>
            </motion.span>
          ))}
        </nav>
        )}

        {!isMobile && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          style={styles.desktopCta}
        >
          <button className="btn btn-cyan" onClick={() => handleScrollTo('weekly-brief')}>
            Get the Brief
          </button>
        </motion.div>
        )}

        {/* Mobile Menu Toggle */}
        {isMobile && (
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          style={styles.mobileMenuToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          style={styles.mobileDropdown}
          className="glass-panel"
        >
          <Link to="/blog" style={{ ...styles.mobileNavLink, textDecoration: 'none' }} onClick={() => setMobileMenuOpen(false)}>Journal</Link>
          <Link to="/funding" style={{ ...styles.mobileNavLink, textDecoration: 'none' }} onClick={() => setMobileMenuOpen(false)}>Funding</Link>
          <Link to="/feed" style={{ ...styles.mobileNavLink, textDecoration: 'none' }} onClick={() => setMobileMenuOpen(false)}>Feed</Link>
          <Link to="/about" style={{ ...styles.mobileNavLink, textDecoration: 'none' }} onClick={() => setMobileMenuOpen(false)}>About</Link>
          <div style={styles.mobileCtaGroup}>
            <button className="btn btn-cyan" style={{ width: '100%' }} onClick={() => handleScrollTo('weekly-brief')}>
              Get the weekly brief
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
}

const styles = {
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    background: 'rgba(251, 250, 247, 0.85)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid hsla(var(--border-light))',
    zIndex: 50,
  },
  progressBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: 'linear-gradient(90deg, hsl(192 89% 36%), hsl(var(--primary-violet)))',
    transformOrigin: 'left',
    zIndex: 60,
  },
  navContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '80px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
  },
  logoIcon: {
    fontSize: '22px',
    background: 'linear-gradient(135deg, #00f0ff, #b800ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  logoText: {
    fontFamily: 'var(--font-heading-sans)',
    fontSize: '20px',
    fontWeight: '800',
    letterSpacing: '-0.5px',
    whiteSpace: 'nowrap',
  },
  desktopNav: {
    display: 'flex',
    alignItems: 'center',
    gap: '30px',
  },
  navLink: {
    fontFamily: 'var(--font-label)',
    fontSize: '12px',
    letterSpacing: '0.13em',
    fontWeight: '500',
    color: 'hsl(var(--text-muted))',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
  },
  desktopCta: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  mobileMenuToggle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    color: 'hsl(var(--text-primary))',
    cursor: 'pointer',
    padding: 0,
  },
  mobileDropdown: {
    position: 'absolute',
    top: '80px',
    left: '20px',
    right: '20px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    background: 'hsl(var(--bg-surface))',
    border: '1px solid hsla(var(--border-light))',
    boxShadow: '0 24px 50px -18px rgba(21, 26, 38, 0.25)',
  },
  mobileNavLink: {
    fontFamily: 'var(--font-label)',
    fontSize: '13px',
    letterSpacing: '0.2em',
    fontWeight: '400',
    color: 'hsl(var(--text-secondary))',
    padding: '8px 0',
    borderBottom: '1px solid hsla(var(--border-light))',
    cursor: 'pointer',
  },
  mobileCtaGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '8px',
  },
};
