import React from 'react';

export default function Hero() {
  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" style={styles.heroSection}>
      <div className="container" style={styles.heroContainer}>
        <div style={styles.badgeWrapper}>
          <span className="badge badge-active" style={styles.waveBadge}>
            <span style={styles.badgePulse}></span> $200M AI Adoption Wave Active
          </span>
        </div>
        
        <h1 style={styles.title} className="gradient-text">
          Unlock AI Funding for Northwestern Ontario Businesses
        </h1>
        
        <p style={styles.subtitle}>
          We track local funding programs, analyze your eligibility, and build custom AI-powered software and automation platforms for your business—fully funded by regional development grants.
        </p>
        
        <div style={styles.ctaGroup}>
          <button 
            className="btn btn-cyan" 
            style={styles.ctaPrimary}
            onClick={() => handleScrollTo('radar')}
          >
            Explore Active Grants
            <span style={styles.arrowIcon}>→</span>
          </button>
          <button 
            className="btn btn-secondary" 
            style={styles.ctaSecondary}
            onClick={() => handleScrollTo('funded-builds')}
          >
            Book Free Assessment
          </button>
        </div>

        {/* Floating statistics panel (Premium visual touch) */}
        <div style={styles.statsContainer} className="glass-panel">
          <div style={styles.statBox}>
            <span style={styles.statNumber} className="accent-text">$200M</span>
            <span style={styles.statLabel}>Federal AI Budget</span>
          </div>
          <div style={styles.statDivider}></div>
          <div style={styles.statBox}>
            <span style={styles.statNumber} className="accent-text">Up to 75%</span>
            <span style={styles.statLabel}>Cost Coverage</span>
          </div>
          <div style={styles.statDivider}></div>
          <div style={styles.statBox}>
            <span style={styles.statNumber} className="accent-text">0-Spec</span>
            <span style={styles.statLabel}>Frayze Risk Build</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  heroSection: {
    padding: '120px 0 80px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  heroContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 2,
  },
  badgeWrapper: {
    marginBottom: '24px',
  },
  waveBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(6, 182, 212, 0.1)',
    color: 'hsl(var(--primary-cyan))',
    border: '1px solid hsla(184, 100%, 48%, 0.2)',
    padding: '6px 16px',
    fontSize: '13px',
    fontWeight: '700',
  },
  badgePulse: {
    width: '8px',
    height: '8px',
    backgroundColor: 'hsl(var(--primary-cyan))',
    borderRadius: '50%',
    display: 'inline-block',
    boxShadow: '0 0 8px hsl(var(--primary-cyan))',
    animation: 'pulseGlow 2s infinite',
  },
  title: {
    fontSize: '54px',
    lineHeight: '1.15',
    maxWidth: '900px',
    marginBottom: '24px',
  },
  subtitle: {
    fontSize: '18px',
    color: 'hsl(var(--text-secondary))',
    maxWidth: '720px',
    marginBottom: '40px',
    lineHeight: '1.6',
  },
  ctaGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    marginBottom: '80px',
    width: '100%',
    '@media (max-width: 576px)': {
      flexDirection: 'column',
    },
  },
  ctaPrimary: {
    fontSize: '16px',
    padding: '14px 32px',
  },
  arrowIcon: {
    marginLeft: '4px',
    transition: 'transform 0.2s ease',
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
    marginTop: '20px',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      gap: '24px',
    },
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
    fontSize: '13px',
    color: 'hsl(var(--text-muted))',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  statDivider: {
    width: '1px',
    height: '40px',
    background: 'hsla(0, 0%, 100%, 0.08)',
    '@media (max-width: 600px)': {
      display: 'none',
    },
  },
};
