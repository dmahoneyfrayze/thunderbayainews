import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { AnimatedGridPattern } from './AnimatedGridPattern';
import { useIsMobile } from '../lib/useIsMobile';

const encodeForm = (data) =>
  Object.keys(data).map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k])).join('&');

export default function WeeklyBrief() {
  const [email, setEmail] = useState('');
  const [botField, setBotField] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const isMobile = useIsMobile();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const submittedEmail = formData.get('subscriberEmail') || email;

    if (submittedEmail) {
      setEmail(submittedEmail);
      // Real capture: post to the Netlify "weekly-brief" form (detected via the hidden form in index.html)
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeForm({ 'form-name': 'weekly-brief', email: submittedEmail, 'bot-field': botField }),
      }).catch(() => {});
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
        <motion.div
          style={styles.contentWrapper}
          className="glass-panel"
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Animated background grid pattern */}
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
              <span className="font-label" style={{ marginBottom: '20px' }}>THE WEEKLY SIGNAL · CASL-COMPLIANT</span>
              <h2 style={styles.title}>One email. The Northwest&rsquo;s AI week.</h2>
              <p style={styles.subtitle}>
                A weekly digest of the AI news, local tech, government moves, funding deadlines, and
                tools that matter for Northwestern Ontario — filtered by the agent, checked by a
                human. No spam. Unsubscribe anytime.
              </p>
              
              {/* honeypot — hidden from humans, filled by bots; Netlify rejects server-side */}
              <input
                type="text"
                name="bot-field"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={botField}
                onChange={(e) => setBotField(e.target.value)}
                style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
              />
              <div style={{ ...styles.inputGroup, flexDirection: isMobile ? 'column' : 'row' }}>
                <input
                  type="email"
                  id="subscriberEmail"
                  name="subscriberEmail"
                  className="form-input"
                  style={styles.emailInput}
                  placeholder="Enter your email address..."
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  toolparamdescription="The business email address to subscribe to the weekly brief."
                />
                <button className="btn btn-cyan" type="submit" style={styles.submitBtn}>
                  Get the weekly brief
                </button>
              </div>

              <span style={styles.disclaimer}>
                One email a week from Thunder Bay AI — source-linked, checked by a human. Unsubscribe anytime; we never share your address.
              </span>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              style={styles.successState}
            >
              <CheckCircle2 size={44} color="hsl(var(--primary-cyan))" strokeWidth={1.5} />
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
            </motion.div>
          )}
        </motion.div>
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
