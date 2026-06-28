import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import './App.css';
import BoltMark from './components/BoltMark';
import { initSmoothScroll, destroySmoothScroll } from './lib/smoothScroll';
import { useSectionNav } from './lib/useSectionNav';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import About from './pages/About';

export default function App() {
  const location = useLocation();
  const goToSection = useSectionNav();

  useEffect(() => {
    initSmoothScroll();
    return () => destroySmoothScroll();
  }, []);

  // Reset scroll to top on route change (except when a section target is set)
  const sectionTarget = location.state && location.state.scrollTo;
  useEffect(() => {
    if (!sectionTarget) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, sectionTarget]);

  const handleScrollTo = (id) => goToSection(id);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', cursor: 'none' }}>
      {/* Custom cursor (from Stitch) */}
      <CustomCursor />

      {/* Interactive Background Grid (from Stitch) */}
      <div className="interactive-grid" style={styles.interactiveGrid} />

      {/* Film Grain Texture Overlay (from Stitch) */}
      <div className="grain-texture" style={styles.grainOverlay} />

      {/* Navigation */}
      <Header />

      {/* Routed Page Layout */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <div className="container" style={styles.footerContainer}>
          <div style={styles.footerLeft}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={styles.logo}
            >
              <BoltMark size={20} />
              <span style={styles.logoText}>Thunder Bay <span className="accent-text">AI</span></span>
            </motion.div>
            <p style={styles.description}>
              The autonomous AI intelligence hub for Northwestern Ontario — tracking the news, local
              tech, government moves, funding, and tools that matter for the region.
            </p>
            <span style={styles.copyright}>
              &copy; {new Date().getFullYear()} Thunder Bay AI. All rights reserved.
            </span>
          </div>

          <div style={styles.footerLinksGroup}>
            <div style={styles.linksCol}>
              <h4 style={styles.linksTitle}>Platform</h4>
              <span style={styles.footerLink} onClick={() => handleScrollTo('radar')}>Funding Radar</span>
              <span style={styles.footerLink} onClick={() => handleScrollTo('intelligence')}>Intelligence Feed</span>
              <span style={styles.footerLink} onClick={() => handleScrollTo('weekly-brief')}>Weekly Brief</span>
              <Link to="/blog" style={{ ...styles.footerHref, display: 'block' }}>Journal</Link>
            </div>
            <div style={styles.linksCol}>
              <h4 style={styles.linksTitle}>The Hub</h4>
              <Link to="/about" style={{ ...styles.footerHref, display: 'block' }}>Why we built this</Link>
              <span style={styles.footerLink} onClick={() => handleScrollTo('funded-builds')}>How it works</span>
              <Link to="/blog" style={{ ...styles.footerHref, display: 'block' }}>Journal</Link>
              <a href="mailto:denis@frayze.ca" style={styles.footerHref}>Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  interactiveGrid: {
    position: 'fixed',
    inset: 0,
    zIndex: 0,
    pointerEvents: 'none',
    opacity: 0.2,
  },
  grainOverlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 100,
    pointerEvents: 'none',
  },
  footer: {
    background: 'hsl(var(--bg-base))',
    borderTop: '1px solid hsla(0, 0%, 100%, 0.05)',
    padding: '80px 0 40px 0',
    position: 'relative',
    zIndex: 1,
  },
  footerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '60px',
    flexWrap: 'wrap',
  },
  footerLeft: {
    maxWidth: '360px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    textAlign: 'left',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoIcon: {
    fontSize: '20px',
    background: 'linear-gradient(135deg, #00f0ff, #b800ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  logoText: {
    fontFamily: 'var(--font-heading)',
    fontSize: '18px',
    fontWeight: '800',
    letterSpacing: '-0.5px',
  },
  description: {
    fontSize: '14px',
    color: 'hsl(var(--text-secondary))',
    lineHeight: '1.5',
  },
  copyright: {
    fontSize: '12px',
    color: 'hsl(var(--text-muted))',
    marginTop: '10px',
  },
  footerLinksGroup: {
    display: 'flex',
    gap: '80px',
    flexWrap: 'wrap',
    textAlign: 'left',
  },
  linksCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  linksTitle: {
    fontFamily: 'var(--font-label)',
    fontSize: '10px',
    letterSpacing: '0.3em',
    fontWeight: '400',
    color: 'hsl(var(--text-primary))',
    textTransform: 'uppercase',
    marginBottom: '8px',
  },
  footerLink: {
    fontSize: '14px',
    color: 'hsl(var(--text-secondary))',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
  },
  footerHref: {
    fontSize: '14px',
    color: 'hsl(var(--text-secondary))',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    cursor: 'pointer',
  },
};
