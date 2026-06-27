import React from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import FundingRadar from './components/FundingRadar';
import IntelligenceFeed from './components/IntelligenceFeed';
import FundedBuilds from './components/FundedBuilds';
import WeeklyBrief from './components/WeeklyBrief';

export default function App() {
  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-shell">
      {/* Navigation */}
      <Header />

      {/* Main Page Layout */}
      <main>
        <Hero />
        <FundingRadar />
        <IntelligenceFeed />
        <FundedBuilds />
        <WeeklyBrief />
      </main>

      {/* Footer (Premium branding and attributions) */}
      <footer style={styles.footer}>
        <div className="container" style={styles.footerContainer}>
          <div style={styles.footerLeft}>
            <div style={styles.logo}>
              <span style={styles.logoIcon}>⚡</span>
              <span style={styles.logoText}>Thunder Bay <span className="accent-text">AI</span></span>
            </div>
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
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      gap: '40px',
    },
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
    '@media (max-width: 576px)': {
      gap: '40px',
    },
  },
  linksCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  linksTitle: {
    fontSize: '14px',
    fontWeight: '700',
    color: 'hsl(var(--text-primary))',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '8px',
  },
  footerLink: {
    fontSize: '14px',
    color: 'hsl(var(--text-secondary))',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
    '&:hover': {
      color: 'hsl(var(--primary-cyan))',
    },
  },
  footerHref: {
    fontSize: '14px',
    color: 'hsl(var(--text-secondary))',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    cursor: 'pointer',
    '&:hover': {
      color: 'hsl(var(--primary-cyan))',
    },
  },
};
