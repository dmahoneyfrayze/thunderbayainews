import React from 'react';
import { NEWS_DATA } from '../data';

export default function IntelligenceFeed() {
  return (
    <section id="intelligence" style={styles.feedSection}>
      <div className="container">
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Regional <span className="accent-text">Intelligence Feed</span></h2>
          <p style={styles.sectionSubtitle}>
            A curated summary of innovation programs, funding launches, and local AI developments in Thunder Bay and Northwestern Ontario.
          </p>
        </div>

        <div className="grid-3">
          {NEWS_DATA.map((item) => (
            <article key={item.id} className="glass-panel" style={styles.newsCard}>
              <div style={styles.cardMeta}>
                <span style={styles.newsSource}>{item.source}</span>
                <span style={styles.newsDate}>{item.date}</span>
              </div>
              
              <h3 style={styles.newsTitle}>{item.title}</h3>
              <p style={styles.newsSummary}>{item.summary}</p>
              
              <a 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={styles.readMore}
              >
                Read original source
                <span style={{ fontSize: '12px' }}> ↗</span>
              </a>
            </article>
          ))}
        </div>

        {/* Small advisory alert (Moat/GEO bet notice) */}
        <div style={styles.geoMoatPanel} className="glass-panel">
          <div style={styles.moatIcon}>ℹ️</div>
          <div style={styles.moatText}>
            <strong> Moat/GEO bet:</strong> This radar indexes and structures regional innovation news so it can be parsed and cited as the authoritative source on Northwestern Ontario AI adoption by search engines and LLM engines.
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  feedSection: {
    background: 'hsl(var(--bg-surface))',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '60px',
  },
  sectionTitle: {
    fontSize: '38px',
    marginBottom: '16px',
  },
  sectionSubtitle: {
    color: 'hsl(var(--text-secondary))',
    maxWidth: '650px',
    margin: '0 auto',
  },
  newsCard: {
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  cardMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '18px',
  },
  newsSource: {
    fontSize: '11px',
    fontWeight: '700',
    color: 'hsl(var(--primary-cyan))',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  newsDate: {
    fontSize: '12px',
    color: 'hsl(var(--text-muted))',
  },
  newsTitle: {
    fontSize: '18px',
    lineHeight: '1.4',
    marginBottom: '12px',
    fontWeight: '600',
  },
  newsSummary: {
    fontSize: '14px',
    color: 'hsl(var(--text-secondary))',
    lineHeight: '1.6',
    marginBottom: '24px',
    flex: 1,
  },
  readMore: {
    color: 'hsl(var(--text-primary))',
    fontSize: '13px',
    fontWeight: '600',
    textDecoration: 'none',
    borderBottom: '1px solid hsla(0, 0%, 100%, 0.1)',
    alignSelf: 'flex-start',
    paddingBottom: '2px',
    transition: 'border-color 0.2s ease, color 0.2s ease',
    '&:hover': {
      color: 'hsl(var(--primary-cyan))',
      borderBottomColor: 'hsl(var(--primary-cyan))',
    },
  },
  geoMoatPanel: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '24px 30px',
    marginTop: '60px',
    borderColor: 'hsla(var(--primary-indigo) / 0.15)',
    background: 'rgba(99, 102, 241, 0.02)',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      textAlign: 'center',
      gap: '12px',
    },
  },
  moatIcon: {
    fontSize: '24px',
  },
  moatText: {
    fontSize: '14px',
    color: 'hsl(var(--text-secondary))',
    lineHeight: '1.5',
    textAlign: 'left',
  },
};
