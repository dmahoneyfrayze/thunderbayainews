import React, { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header style={styles.header}>
      <div className="container" style={styles.navContainer}>
        {/* Logo */}
        <div style={styles.logo} onClick={() => handleScrollTo('hero')}>
          <span style={styles.logoIcon}>⚡</span>
          <span style={styles.logoText}>Thunder Bay <span className="accent-text">AI</span></span>
        </div>

        {/* Desktop Navigation */}
        <nav style={styles.desktopNav}>
          <span style={styles.navLink} onClick={() => handleScrollTo('radar')}>Funding Radar</span>
          <span style={styles.navLink} onClick={() => handleScrollTo('intelligence')}>Intelligence Feed</span>
          <span style={styles.navLink} onClick={() => handleScrollTo('funded-builds')}>Funded Builds</span>
          <span style={styles.navLink} onClick={() => handleScrollTo('weekly-brief')}>Weekly Brief</span>
        </nav>

        <div style={styles.desktopCta}>
          <button className="btn btn-secondary" onClick={() => handleScrollTo('weekly-brief')}>Subscribe</button>
          <button className="btn btn-primary" onClick={() => handleScrollTo('funded-builds')}>Get Funded Build</button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          style={styles.mobileMenuToggle} 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div style={styles.mobileDropdown} className="glass-panel">
          <span style={styles.mobileNavLink} onClick={() => handleScrollTo('radar')}>Funding Radar</span>
          <span style={styles.mobileNavLink} onClick={() => handleScrollTo('intelligence')}>Intelligence Feed</span>
          <span style={styles.mobileNavLink} onClick={() => handleScrollTo('funded-builds')}>Funded Builds</span>
          <span style={styles.mobileNavLink} onClick={() => handleScrollTo('weekly-brief')}>Weekly Brief</span>
          <div style={styles.mobileCtaGroup}>
            <button className="btn btn-secondary" style={{ width: '100%' }} onClick={() => handleScrollTo('weekly-brief')}>Subscribe</button>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => handleScrollTo('funded-builds')}>Get Funded Build</button>
          </div>
        </div>
      )}
    </header>
  );
}

const styles = {
  header: {
    position: 'sticky',
    top: 0,
    left: 0,
    width: 100 + '%',
    background: 'rgba(4, 5, 8, 0.75)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid hsla(0, 0%, 100%, 0.05)',
    zIndex: 999,
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
    gap: '32px',
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  navLink: {
    fontSize: '14px',
    fontWeight: '500',
    color: 'hsl(var(--text-secondary))',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
    '&:hover': {
      color: 'hsl(var(--text-primary))',
    },
  },
  desktopCta: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  mobileMenuToggle: {
    display: 'none',
    background: 'none',
    border: 'none',
    color: 'hsl(var(--text-primary))',
    cursor: 'pointer',
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
    fontSize: '16px',
    fontWeight: '600',
    color: 'hsl(var(--text-secondary))',
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

// Simple media query handler for CSS objects in React inline styles
if (typeof window !== 'undefined' && window.innerWidth <= 868) {
  styles.desktopNav.display = 'none';
  styles.desktopCta.display = 'none';
  styles.mobileMenuToggle.display = 'block';
}
