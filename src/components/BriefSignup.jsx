import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

// Compact, reusable weekly-brief signup. Submits to the Netlify form "weekly-brief"
// (defined as a hidden static form in index.html so Netlify detects it at build).
// Real capture, zero backend; honeypot ("bot-field") is rejected server-side by Netlify
// (form-anti-spam rule). Reused at the end of blog posts and on the Journal index.
const encode = (data) =>
  Object.keys(data).map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k])).join('&');

export default function BriefSignup({
  heading = 'Get the weekly Signal',
  dek = 'The AI, funding, government, and tech moves that matter for Northwestern Ontario — one email a week, source-linked, read by a human before it reaches you.',
  compact = false,
}) {
  const [email, setEmail] = useState('');
  const [botField, setBotField] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    // fire-and-forget to Netlify; optimistic success (no backend round-trip UX)
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'weekly-brief', email, 'bot-field': botField }),
    }).catch(() => {});
    setSubscribed(true);
  };

  if (subscribed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="glass-panel"
        style={styles.wrap}
      >
        <div style={styles.successRow}>
          <CheckCircle2 size={22} color="hsl(var(--primary-cyan))" strokeWidth={1.8} />
          <span style={styles.successText}>You are on the list. The next Signal lands in your inbox.</span>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="glass-panel" style={styles.wrap}>
      <h3 style={{ ...styles.heading, fontSize: compact ? '20px' : '24px' }}>{heading}</h3>
      <p style={styles.dek}>{dek}</p>
      <form name="weekly-brief" onSubmit={handleSubmit} style={styles.form}>
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
        <input
          type="email"
          name="email"
          required
          className="form-input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <button type="submit" className="btn btn-cyan" style={styles.btn}>Get the weekly brief</button>
      </form>
      <span style={styles.note}>One email a week from Thunder Bay AI. Unsubscribe anytime.</span>
    </div>
  );
}

const styles = {
  wrap: { padding: '28px 26px', borderRadius: '18px', borderColor: 'hsla(184, 100%, 48%, 0.16)', textAlign: 'center' },
  heading: { fontFamily: 'var(--font-heading)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '10px' },
  dek: { fontSize: '14.5px', color: 'hsl(var(--text-secondary))', lineHeight: 1.55, maxWidth: '520px', margin: '0 auto 20px' },
  form: { display: 'flex', gap: '10px', maxWidth: '480px', margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' },
  input: { flex: 1, minWidth: '220px', borderRadius: '30px', padding: '13px 22px', border: '1px solid hsla(0,0%,100%,0.08)', background: 'rgba(0,0,0,0.2)' },
  btn: { borderRadius: '30px', whiteSpace: 'nowrap', padding: '13px 26px' },
  note: { display: 'block', fontSize: '12px', color: 'hsl(var(--text-muted))', marginTop: '14px' },
  successRow: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' },
  successText: { fontSize: '15px', color: 'hsl(var(--text-secondary))' },
};
