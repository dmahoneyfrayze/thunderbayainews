import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import BoltMark from './BoltMark';
import { useSectionNav } from '../lib/useSectionNav';
import { useIsMobile } from '../lib/useIsMobile';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile(868);
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
            { label: 'FUNDING', id: 'radar' },
            { label: 'INTELLIGENCE', id: 'intelligence' },
            { label: 'BUILDS', id: 'funded-builds' },
            { label: 'BRIEF', id: 'weekly-brief' },
          ].map((item, i) => (
            <motion.span
              key={item.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={styles.navLink}
              onClick={() => handleScrollTo(item.id)}
            >
              {item.label}
            </motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/blog" style={{ ...styles.navLink, textDecoration: 'none' }}>JOURNAL</Link>
          </motion.span>
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
          <span style={styles.mobileNavLink} onClick={() => handleScrollTo('radar')}>Funding Radar</span>
          <span style={styles.mobileNavLink} onClick={() => handleScrollTo('intelligence')}>Intelligence Feed</span>
          <span style={styles.mobileNavLink} onClick={() => handleScrollTo('funded-builds')}>Funded Builds</span>
          <span style={styles.mobileNavLink} onClick={() => handleScrollTo('weekly-brief')}>Weekly Brief</span>
          <Link to="/blog" style={{ ...styles.mobileNavLink, textDecoration: 'none' }} onClick={() => setMobileMenuOpen(false)}>Journal</Link>
          <div style={styles.mobileCtaGroup}>
            <button className="btn btn-cyan" style={{ width: '100%' }} onClick={() => handleScrollTo('funded-builds')}>
              Get Funded Build
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
    background: 'rgba(4, 5, 8, 0.6)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid hsla(0, 0%, 100%, 0.05)',
    zIndex: 50,
  },
  progressBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: 'hsl(184, 100%, 48%)',
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
    fontFamily: 'var(--font-heading)',
    fontSize: '20px',
    fontWeight: '800',
    letterSpacing: '-0.5px',
  },
  desktopNav: {
    display: 'flex',
    alignItems: 'center',
    gap: '36px',
  },
  navLink: {
    fontFamily: 'var(--font-label)',
    fontSize: '11px',
    letterSpacing: '0.25em',
    fontWeight: '400',
    color: 'hsl(224, 16%, 60%)',
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
    color: 'hsl(0, 0%, 98%)',
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
  },
  mobileNavLink: {
    fontFamily: 'var(--font-label)',
    fontSize: '13px',
    letterSpacing: '0.2em',
    fontWeight: '400',
    color: 'hsl(224, 16%, 76%)',
    padding: '8px 0',
    borderBottom: '1px solid hsla(0, 0%, 100%, 0.05)',
    cursor: 'pointer',
  },
  mobileCtaGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '8px',
  },
};
