import React from 'react';
import { motion } from 'framer-motion';
import './App.css';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import Hero from './components/Hero';
import FundingRadar from './components/FundingRadar';
import IntelligenceFeed from './components/IntelligenceFeed';
import FundedBuilds from './components/FundedBuilds';
import WeeklyBrief from './components/WeeklyBrief';

// Marquee component (from Stitch)
function Marquee() {
  const brands = [
    "FEDNOR RAII", "NOIC COSTARTER", "CEDC YOUTH EFFECT", "FRAYZE",
    "NEXT LEVEL DIGITAL", "THUNDER BAY AI", "NWO INNOVATION", "AI ADOPTION WAVE"
  ];

  return (
    <div style={marqueeStyles.wrapper}>
      <div className="marquee-track">
        {[...brands, ...brands, ...brands].map((brand, i) => (
          <span key={i} style={marqueeStyles.brand}>
            {brand}
          </span>
        ))}
      </div>
    </div>
  );
}

const marqueeStyles = {
  wrapper: {
    padding: '40px 0',
    overflow: 'hidden',
    borderTop: '1px solid hsla(0, 0%, 100%, 0.05)',
    borderBottom: '1px solid hsla(0, 0%, 100%, 0.05)',
    background: 'rgba(26, 25, 25, 0.1)',
  },
  brand: {
    fontFamily: 'var(--font-heading)',
    fontWeight: 800,
    fontSize: 'clamp(28px, 4vw, 48px)',
    letterSpacing: '-0.04em',
    color: 'hsla(0, 0%, 100%, 0.06)',
    cursor: 'default',
    transition: 'color 0.3s ease',
    flexShrink: 0,
  },
};

export default function App() {
  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

      {/* Main Page Layout */}
      <main>
        <Hero />
        <Marquee />
        <FundingRadar />
        <IntelligenceFeed />
        <FundedBuilds />
        <WeeklyBrief />
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
              <span style={styles.logoIcon}>⚡</span>
              <span style={styles.logoText}>Thunder Bay <span className="accent-text">AI</span></span>
            </motion.div>
            <p style={styles.description}>
              The autonomous intelligence asset and regional business-funding radar for Northwestern Ontario.
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
            </div>
            <div style={styles.linksCol}>
              <h4 style={styles.linksTitle}>Operator</h4>
              <a href="https://frayze.ca" target="_blank" rel="noopener noreferrer" style={styles.footerHref}>
                Frayze
              </a>
              <span style={styles.footerLink} onClick={() => handleScrollTo('funded-builds')}>Funded Builds</span>
              <a href="mailto:denis@frayze.ca" style={styles.footerHref}>Contact Denis</a>
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
