import React, { useState } from 'react';
import { AnimatedGridPattern } from './AnimatedGridPattern';

export default function WeeklyBrief() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const submittedEmail = formData.get('subscriberEmail') || email;
    
    if (submittedEmail) {
      setEmail(submittedEmail);
      setSubscribed(true);

      const nativeEvent = e.nativeEvent || e;
      if (nativeEvent.agentInvoked && typeof nativeEvent.respondWith === 'function') {
        nativeEvent.respondWith(
          Promise.resolve(
            `Success: Subscribed ${submittedEmail} to the weekly Northwestern Ontario business funding and AI updates. First brief arrives next Thursday.`
          )
        );
      }
    }
  };

  return (
    <section id="weekly-brief" style={styles.briefSection}>
      <div className="container" style={styles.briefContainer}>
        <div style={styles.contentWrapper} className="glass-panel">
          {/* Animated background grid pattern from Stitch */}
          <AnimatedGridPattern
            style={styles.gridPattern}
            numSquares={15}
          />
          {!subscribed ? (
            <form 
              onSubmit={handleSubmit} 
              style={styles.form}
              toolname="subscribe_weekly_brief"
              tooldescription="Subscribe a business email address to the weekly NWO Funding and AI brief."
              toolautosubmit
            >
              <span style={styles.label}>CASL-COMPLIANT UPDATES</span>
              <h2 style={styles.title}>Stay Updated on Local Funding Waves</h2>
              <p style={styles.subtitle}>
                Get a weekly digest of grant deadlines, newly eligible programs, and NWO business expansion news delivered directly to your inbox. No spam. Unsubscribe anytime.
              </p>
              
              <div style={styles.inputGroup}>
                <input 
                  type="email" 
                  id="subscriberEmail"
                  name="subscriberEmail"
                  className="form-input" 
                  style={styles.emailInput} 
                  placeholder="Enter your business email address..."
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  toolparamdescription="The business email address to subscribe to the weekly brief."
                />
                <button className="btn btn-cyan" type="submit" style={styles.submitBtn}>
                  Subscribe Brief
                </button>
              </div>
              
              <span style={styles.disclaimer}>
                By subscribing, you agree to receive email briefs from Thunder Bay AI. We protect your data.
              </span>
            </form>
          ) : (
            <div style={styles.successState}>
              <span style={styles.successIcon}>✉️</span>
              <h2 style={styles.successTitle}>Subscription Confirmed!</h2>
              <p style={styles.successSubtitle}>
                Success! We have added <strong>{email}</strong> to our weekly distribution list. You will receive your first NWO Funding Brief next Thursday morning.
              </p>
              <button 
                className="btn btn-secondary" 
                onClick={() => {
                  setSubscribed(false);
                  setEmail('');
                }}
              >
                Subscribe another email
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const styles = {
  briefSection: {
    background: 'linear-gradient(180deg, hsl(var(--bg-surface)) 0%, hsl(var(--bg-base)) 100%)',
    position: 'relative',
    zIndex: 1,
  },
  briefContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    maxWidth: '850px',
    width: '100%',
    padding: '60px 40px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderColor: 'hsla(184, 100%, 48%, 0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
  gridPattern: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    maskImage: 'radial-gradient(350px circle at center, white, transparent)',
    WebkitMaskImage: 'radial-gradient(350px circle at center, white, transparent)',
    stroke: 'hsla(184, 100%, 48%, 0.04)',
    fill: 'hsla(184, 100%, 48%, 0.02)',
    color: 'hsl(var(--primary-cyan))',
    pointerEvents: 'none',
    zIndex: 0,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
    zIndex: 1,
  },
  label: {
    fontSize: '11px',
    fontWeight: '700',
    color: 'hsl(var(--primary-cyan))',
    letterSpacing: '0.1em',
    marginBottom: '16px',
  },
  title: {
    fontSize: '32px',
    marginBottom: '16px',
    lineHeight: '1.25',
  },
  subtitle: {
    fontSize: '15px',
    color: 'hsl(var(--text-secondary))',
    maxWidth: '600px',
    lineHeight: '1.6',
    marginBottom: '32px',
  },
  inputGroup: {
    display: 'flex',
    width: '100%',
    maxWidth: '540px',
    gap: '12px',
    marginBottom: '16px',
    '@media (max-width: 576px)': {
      flexDirection: 'column',
      gap: '12px',
    },
  },
  emailInput: {
    flex: 1,
    borderRadius: '30px',
    padding: '14px 24px',
    border: '1px solid hsla(0, 0%, 100%, 0.08)',
    background: 'rgba(0, 0, 0, 0.2)',
  },
  submitBtn: {
    borderRadius: '30px',
    whiteSpace: 'nowrap',
    padding: '14px 28px',
  },
  disclaimer: {
    fontSize: '12px',
    color: 'hsl(var(--text-muted))',
  },
  successState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    maxWidth: '500px',
    position: 'relative',
    zIndex: 1,
  },
  successIcon: {
    fontSize: '44px',
  },
  successTitle: {
    fontSize: '28px',
    fontWeight: '700',
  },
  successSubtitle: {
    fontSize: '15px',
    color: 'hsl(var(--text-secondary))',
    lineHeight: '1.6',
    marginBottom: '12px',
  },
};
