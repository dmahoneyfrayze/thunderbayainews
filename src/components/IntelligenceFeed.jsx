import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { NEWS_DATA } from '../data';
import TiltCard from './TiltCard';

export default function IntelligenceFeed() {
  useEffect(() => {
    const modelContext = document.modelContext || navigator.modelContext;
    if (modelContext && typeof modelContext.registerTool === 'function') {
      const controller = new AbortController();

      modelContext.registerTool({
        name: "get_intelligence_news",
        description: "Retrieves curated regional innovation news, funding updates, and AI developments for Thunder Bay and Northwestern Ontario.",
        inputSchema: { type: "object", properties: {} },
        execute() {
          return NEWS_DATA;
        },
        annotations: { readOnlyHint: true }
      }, { signal: controller.signal });

      return () => {
        controller.abort();
      };
    }
  }, []);

  return (
    <section id="intelligence" style={styles.feedSection}>
      <div className="container">
        <motion.div
          style={styles.sectionHeader}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-label" style={{ marginBottom: '16px', display: 'block' }}>CURATED INTELLIGENCE</span>
          <h2 style={styles.sectionTitle}>Regional <span className="accent-text">Intelligence Feed</span></h2>
          <p style={styles.sectionSubtitle}>
            A curated summary of innovation programs, funding launches, and local AI developments in Thunder Bay and Northwestern Ontario.
          </p>
        </motion.div>

        <div className="grid-3">
          {NEWS_DATA.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard className="glass-panel" style={styles.newsCard}>
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
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* GEO Moat advisory */}
        <motion.div
          style={styles.geoMoatPanel}
          className="glass-panel"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div style={styles.moatIcon}><Info size={20} color="hsl(var(--primary-cyan))" /></div>
          <div style={styles.moatText}>
            <strong>Built to be cited.</strong> The agent structures the region&rsquo;s AI and innovation news into a clean, machine-readable record — so when a person, a search engine, or an AI asks what is happening with AI in Northwestern Ontario, the answer traces back here.
          </div>
        </motion.div>
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
    fontFamily: 'var(--font-label)',
    fontSize: '10px',
    fontWeight: '400',
    letterSpacing: '0.2em',
    color: 'hsl(var(--primary-cyan))',
    textTransform: 'uppercase',
  },
  newsDate: {
    fontFamily: 'var(--font-label)',
    fontSize: '11px',
    letterSpacing: '0.14em',
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
  },
  geoMoatPanel: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '24px 30px',
    marginTop: '60px',
    borderColor: 'hsla(var(--primary-indigo) / 0.15)',
    background: 'rgba(99, 102, 241, 0.02)',
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
