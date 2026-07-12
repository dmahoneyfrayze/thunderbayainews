import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import './App.css';
import BoltMark from './components/BoltMark';
import { initSmoothScroll, destroySmoothScroll } from './lib/smoothScroll';
import { useSectionNav } from './lib/useSectionNav';
import Header from './components/Header';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import About from './pages/About';
import Funding from './pages/Funding';
import FundingProgram from './pages/FundingProgram';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Feed from './pages/Feed';

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

  // GA4 page_view per SPA route (config uses send_page_view:false); skip prerender/bots
  useEffect(() => {
    if (typeof window.gtag === 'function' && !navigator.webdriver) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [location.pathname, location.search]);

  const handleScrollTo = (id) => goToSection(id);

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
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
          <Route path="/funding" element={<Funding />} />
          <Route path="/funding/:id" element={<FundingProgram />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="dark-band" style={styles.footer}>
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
            <span style={styles.credit}>
              Built and operated by{' '}
              <a href="https://frayze.ca/?utm_source=thunderbayai&utm_medium=referral&utm_campaign=hub&utm_content=footer" target="_blank" rel="noopener noreferrer" style={styles.creditLink}>Frayze</a>
              {' '}— a Thunder Bay AI and automation studio.
            </span>
            <span style={styles.legal}>
              <Link to="/privacy" style={styles.legalLink}>Privacy</Link>
              <span style={styles.legalDot}>·</span>
              <Link to="/terms" style={styles.legalLink}>Terms</Link>
            </span>
          </div>

          <div style={styles.footerLinksGroup}>
            <div style={styles.linksCol}>
              <h4 style={styles.linksTitle}>Platform</h4>
              <Link to="/funding" style={{ ...styles.footerHref, display: 'block' }}>Funding Radar</Link>
              <span style={styles.footerLink} onClick={() => handleScrollTo('intelligence')}>Intelligence Feed</span>
              <span style={styles.footerLink} onClick={() => handleScrollTo('weekly-brief')}>Weekly Brief</span>
              <Link to="/blog" style={{ ...styles.footerHref, display: 'block' }}>Journal</Link>
              <a href="/rss.xml" style={{ ...styles.footerHref, display: 'block' }}>RSS Feed</a>
            </div>
            <div style={styles.linksCol}>
              <h4 style={styles.linksTitle}>The Hub</h4>
              <Link to="/about" style={{ ...styles.footerHref, display: 'block' }}>Why we built this</Link>
              <span style={styles.footerLink} onClick={() => handleScrollTo('funded-builds')}>How it works</span>
              <Link to="/feed" style={{ ...styles.footerHref, display: 'block' }}>The Feed</Link>
              <a href="https://www.instagram.com/thunderbayai/" target="_blank" rel="noopener noreferrer" style={{ ...styles.footerHref, display: 'block' }}>Instagram</a>
              <a href="https://www.facebook.com/profile.php?id=908676642332247" target="_blank" rel="noopener noreferrer" style={{ ...styles.footerHref, display: 'block' }}>Facebook</a>
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
    background: '#0B1020',
    borderTop: '1px solid rgba(255, 255, 255, 0.07)',
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
    fontFamily: 'var(--font-heading-sans)',
    fontSize: '18px',
    fontWeight: '800',
    letterSpacing: '-0.5px',
    color: '#fff',
  },
  description: {
    fontSize: '14px',
    color: '#A9B4C6',
    lineHeight: '1.5',
  },
  copyright: {
    fontSize: '12px',
    color: '#7A8496',
    marginTop: '10px',
  },
  credit: {
    fontSize: '12px',
    color: '#7A8496',
    marginTop: '6px',
    lineHeight: 1.5,
  },
  creditLink: {
    color: '#C9D3E0',
    textDecoration: 'none',
  },
  legal: {
    marginTop: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '12px',
  },
  legalLink: {
    color: '#7A8496',
    textDecoration: 'none',
  },
  legalDot: {
    color: '#7A8496',
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
    letterSpacing: '0.2em',
    fontWeight: '600',
    color: '#F4F7FB',
    textTransform: 'uppercase',
    marginBottom: '8px',
  },
  footerLink: {
    fontSize: '14px',
    color: '#A9B4C6',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
  },
  footerHref: {
    fontSize: '14px',
    color: '#A9B4C6',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    cursor: 'pointer',
  },
};
