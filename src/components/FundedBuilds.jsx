import React from 'react';

export default function FundedBuilds() {
  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="funded-builds" style={styles.buildsSection}>
      <div className="container">
        <div style={styles.sectionHeader}>
          <span style={styles.label}>VERTICAL INTEGRATION</span>
          <h2 style={styles.sectionTitle}>Frayze Grant-Funded Software Builds</h2>
          <p style={styles.sectionSubtitle}>
            Instead of spending your cash, leverage regional economic development funds. We help you write the application and build the technology it covers.
          </p>
        </div>

        <div style={styles.stepsGrid}>
          {/* Step 1 */}
          <div style={styles.stepCard} className="glass-panel">
            <div style={styles.stepNum} className="accent-text">01</div>
            <h3 style={styles.stepTitle}>Discovery & Matching</h3>
            <p style={styles.stepDesc}>
              We assess your business needs (AI chatbot, client portal, internal CRM, or custom database) and match them with active grants (FedNor RAII, NOIC, CEDC).
            </p>
          </div>

          {/* Step 2 */}
          <div style={styles.stepCard} className="glass-panel">
            <div style={styles.stepNum} className="accent-text">02</div>
            <h3 style={styles.stepTitle}>No-Spec Writing</h3>
            <p style={styles.stepDesc}>
              Our grant writers draft and submit the technical proposal on your behalf. We handle the paperwork and align with institutional mandates at zero spec-cost.
            </p>
          </div>

          {/* Step 3 */}
          <div style={styles.stepCard} className="glass-panel">
            <div style={styles.stepNum} className="accent-text">03</div>
            <h3 style={styles.stepTitle}>Deliver & Scale</h3>
            <p style={styles.stepDesc}>
              Once approved, Frayze builds, deploys, and maintains your custom system. The project is paid for directly by the grant, protecting your operating cash.
            </p>
          </div>
        </div>

        {/* Call to Action Container */}
        <div style={styles.ctaBox} className="glass-panel">
          <div style={styles.ctaContent}>
            <h3 style={styles.ctaTitle}>Ready to build your next system with grant funding?</h3>
            <p style={styles.ctaDesc}>
              SMEs in Thunder Bay and Northern Ontario have access to a $200M federal AI wave. Let us verify your eligibility and write your tech application.
            </p>
          </div>
          <button 
            className="btn btn-cyan" 
            style={styles.ctaBtn}
            onClick={() => handleScrollTo('radar')}
          >
            Match My Grant Now
            <span style={{ marginLeft: '4px' }}>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}

const styles = {
  buildsSection: {
    background: 'hsl(var(--bg-base))',
    borderTop: '1px solid hsla(0, 0%, 100%, 0.03)',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '80px',
  },
  label: {
    fontSize: '11px',
    fontWeight: '700',
    color: 'hsl(var(--primary-cyan))',
    letterSpacing: '0.1em',
    marginBottom: '16px',
    display: 'block',
  },
  sectionTitle: {
    fontSize: '38px',
    marginBottom: '16px',
  },
  sectionSubtitle: {
    color: 'hsl(var(--text-secondary))',
    maxWidth: '680px',
    margin: '0 auto',
    fontSize: '16px',
  },
  stepsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '30px',
    marginBottom: '80px',
    '@media (max-width: 991px)': {
      gridTemplateColumns: '1fr',
      gap: '40px',
    },
  },
  stepCard: {
    padding: '40px 32px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
  },
  stepNum: {
    fontSize: '48px',
    fontWeight: '900',
    fontFamily: 'var(--font-heading)',
    lineHeight: '1',
    marginBottom: '20px',
    opacity: '0.9',
  },
  stepTitle: {
    fontSize: '20px',
    fontWeight: '700',
    marginBottom: '12px',
  },
  stepDesc: {
    fontSize: '14px',
    color: 'hsl(var(--text-secondary))',
    lineHeight: '1.6',
  },
  ctaBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '48px 60px',
    textAlign: 'left',
    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(6, 182, 212, 0.05) 100%)',
    borderColor: 'hsla(184, 100%, 48%, 0.15)',
    boxShadow: 'var(--accent-shadow)',
    borderRadius: '24px',
    '@media (max-width: 991px)': {
      flexDirection: 'column',
      textAlign: 'center',
      gap: '30px',
      padding: '40px 30px',
    },
  },
  ctaContent: {
    maxWidth: '680px',
  },
  ctaTitle: {
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '12px',
  },
  ctaDesc: {
    fontSize: '15px',
    color: 'hsl(var(--text-secondary))',
    lineHeight: '1.5',
  },
  ctaBtn: {
    padding: '16px 36px',
    fontSize: '16px',
    whiteSpace: 'nowrap',
  },
};
