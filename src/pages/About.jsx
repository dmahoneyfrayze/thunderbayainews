import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Radar, FileText, Compass, ShieldCheck } from 'lucide-react';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { useJsonLd } from '../lib/useJsonLd';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
};

export default function About() {
  useDocumentMeta({
    title: 'Why Thunder Bay AI exists | Thunder Bay AI',
    description:
      'AI moves faster than any region can follow. Thunder Bay AI is an autonomous agent that monitors the AI, funding, government and tech shifts hitting Northwestern Ontario, reports them in plain language, and breaks down what they actually mean for the Northwest. Reviewed by humans. Operated by Frayze.',
    path: '/about',
  });

  useJsonLd({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': 'https://thunderbayai.com/about#aboutpage',
        url: 'https://thunderbayai.com/about',
        name: 'Why Thunder Bay AI exists',
        description:
          'The purpose behind Thunder Bay AI: an autonomous, human-reviewed AI intelligence layer for Northwestern Ontario, operated by Frayze.',
        inLanguage: 'en-CA',
        isPartOf: { '@id': 'https://thunderbayai.com/#website' },
        about: { '@id': 'https://thunderbayai.com/#org' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://thunderbayai.com' },
          { '@type': 'ListItem', position: 2, name: 'About', item: 'https://thunderbayai.com/about' },
        ],
      },
    ],
  });

  const steps = [
    {
      icon: Radar,
      title: 'Monitor',
      desc: 'An autonomous agent watches the sources around the clock — national AI news, model releases, government and municipal tech, funding programs and deadlines — and filters for what touches the Northwest.',
    },
    {
      icon: FileText,
      title: 'Report',
      desc: 'It pulls the signal out of the noise and drafts it in plain language. No hype, no jargon dump — the who, what, the deadline, and the source link, written to be read in a minute.',
    },
    {
      icon: Compass,
      title: 'Break it down',
      desc: 'The part that matters most: what it actually means here. Whether a model launch, a policy move, or a new grant changes anything for a business, a worker, or a council in Northwestern Ontario.',
    },
    {
      icon: ShieldCheck,
      title: 'Human review',
      desc: 'Nothing publishes unread. A person checks every brief against its source before it goes live. The agent does the volume; a human holds the line on accuracy. Signal, not slop.',
    },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.glow} />

      <article className="container" style={styles.wrap}>
        {/* Intro */}
        <motion.div {...fadeUp}>
          <span className="font-label" style={styles.eyebrow}>THE PURPOSE</span>
          <h1 style={styles.title}>
            AI moves faster than any region<br />can keep up with.{' '}
            <span className="accent-text">So we built something that doesn&apos;t sleep.</span>
          </h1>
          <p style={styles.lead}>
            Thunder Bay AI is not a company with a press office. It&apos;s a regional intelligence
            layer — an autonomous agent that tracks the AI, funding, government and tech shifts
            landing on Northwestern Ontario, and a human who makes sure none of it reaches you wrong.
          </p>
        </motion.div>

        {/* The problem */}
        <motion.section {...fadeUp} style={styles.section}>
          <h2 style={styles.h2}>The problem this solves</h2>
          <p style={styles.body}>
            The pace of AI is the story of the decade, and almost none of the coverage is written
            for a place like this. National headlines tell you a new model shipped. They don&apos;t
            tell you whether it changes anything for a dealership in Thunder Bay, a council in Kenora,
            or a manufacturer in Dryden. Funding programs open and close on their own schedules.
            Government and municipal technology decisions move quietly. A region this size can&apos;t
            keep a full-time AI desk staffed to watch all of it.
          </p>
          <p style={styles.body}>
            So the signal that actually matters here gets buried — under national noise that
            doesn&apos;t apply, and vendor hype that&apos;s trying to sell you something. The cost
            isn&apos;t abstract. It&apos;s a business that misses a grant it qualified for, or adopts
            a tool a month after a free one would have done the job.
          </p>
        </motion.section>

        {/* What it is */}
        <motion.section {...fadeUp} style={styles.section}>
          <h2 style={styles.h2}>What Thunder Bay AI is — and isn&apos;t</h2>
          <div style={styles.isGrid}>
            <div className="glass-panel" style={styles.isCard}>
              <span style={styles.isLabel}>It is</span>
              <ul style={styles.isList}>
                <li>A neutral intelligence layer for AI and tech in Northwestern Ontario</li>
                <li>An autonomous agent, monitoring continuously, reviewed by a human</li>
                <li>Plain-language briefs with the source linked every time</li>
                <li>Built to tell you what a change means <em>here</em></li>
              </ul>
            </div>
            <div className="glass-panel" style={styles.isCard}>
              <span style={{ ...styles.isLabel, color: 'hsl(var(--text-muted))' }}>It isn&apos;t</span>
              <ul style={styles.isList}>
                <li>A business directory — that lane is saturated and dead</li>
                <li>A vendor trying to sell you an AI product under its own name</li>
                <li>An auto-generated content farm — nothing publishes unread</li>
                <li>National news rewritten without a local lens</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* How it works */}
        <motion.section {...fadeUp} style={styles.section}>
          <h2 style={styles.h2}>How it works</h2>
          <p style={styles.body}>
            Four steps, run continuously. The first three are the agent&apos;s job. The fourth is
            the one rule it never breaks.
          </p>
          <div style={styles.stepsGrid}>
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="glass-panel"
                  style={styles.stepCard}
                >
                  <Icon size={22} color="hsl(var(--primary-cyan))" />
                  <span style={styles.stepTitle}>{s.title}</span>
                  <p style={styles.stepDesc}>{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Who runs it — disclosure */}
        <motion.section {...fadeUp} style={styles.section}>
          <h2 style={styles.h2}>Who runs it</h2>
          <p style={styles.body}>
            Thunder Bay AI is built and operated by{' '}
            <a href="https://frayze.ca/?utm_source=thunderbayai&utm_medium=referral&utm_campaign=hub&utm_content=about" target="_blank" rel="noopener noreferrer" style={styles.link}>Frayze</a>,
            a Thunder Bay AI, web, and automation studio. We run it because we live in this region
            and we&apos;d want this to exist whether or not we built it. The hub stays deliberately
            neutral: it reports the landscape, it doesn&apos;t pitch you a product under its own
            banner. Where a story touches funding a business could actually use, we&apos;ll say so
            and point to the real program — sourced, with the standing caution to confirm eligibility
            with the program directly.
          </p>
          <p style={styles.body}>
            That&apos;s the whole arrangement, stated plainly. An agent does the watching. A human
            does the checking. The region gets the signal.
          </p>
        </motion.section>

        {/* CTA */}
        <motion.div {...fadeUp} className="glass-panel" style={styles.cta}>
          <h3 style={styles.ctaTitle}>Get the signal, once a week</h3>
          <p style={styles.ctaDesc}>
            One email: the AI, funding, government, and tech moves that matter for Northwestern
            Ontario — already filtered, source-linked, and read by a human before it reaches you.
          </p>
          <div style={styles.ctaBtns}>
            <Link to="/" state={{ scrollTo: 'weekly-brief' }} className="btn btn-cyan" style={{ textDecoration: 'none' }}>
              Get the weekly brief
            </Link>
            <Link to="/blog" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
              Read the Journal
            </Link>
          </div>
        </motion.div>
      </article>
    </div>
  );
}

const styles = {
  page: { position: 'relative', minHeight: '100vh', padding: '150px 0 120px', overflow: 'hidden' },
  glow: {
    position: 'absolute', top: '-5%', left: '50%', transform: 'translateX(-50%)',
    width: '760px', height: '520px', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 1,
    background: 'radial-gradient(circle, hsla(192, 91%, 32%, 0.14) 0%, hsla(262, 68%, 48%, 0.08) 45%, transparent 72%)',
  },
  wrap: { position: 'relative', zIndex: 2, maxWidth: '820px' },
  eyebrow: { display: 'block', marginBottom: '24px' },
  title: {
    fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(32px, 5.5vw, 58px)',
    letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '28px',
  },
  lead: { fontSize: '20px', color: 'hsl(var(--text-secondary))', lineHeight: 1.6, maxWidth: '720px' },
  section: { marginTop: '72px' },
  h2: {
    fontFamily: 'var(--font-heading)', fontSize: 'clamp(24px, 3.5vw, 34px)', fontWeight: 700,
    letterSpacing: '-0.02em', marginBottom: '20px', color: 'hsl(var(--text-primary))',
  },
  body: { fontSize: '17px', color: 'hsl(var(--text-secondary))', lineHeight: 1.75, marginBottom: '20px' },
  link: { color: 'hsl(var(--primary-cyan))', textDecoration: 'none', fontWeight: 600 },
  isGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '8px' },
  isCard: { padding: '28px 26px', borderRadius: '18px', display: 'flex', flexDirection: 'column', gap: '14px' },
  isLabel: {
    fontFamily: 'var(--font-label)', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase',
    color: 'hsl(var(--primary-cyan))', fontWeight: 600,
  },
  isList: { listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '15.5px', color: 'hsl(var(--text-secondary))', lineHeight: 1.5 },
  stepsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginTop: '24px' },
  stepCard: { padding: '26px 24px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '12px' },
  stepTitle: { fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 700, letterSpacing: '-0.01em' },
  stepDesc: { fontSize: '14.5px', color: 'hsl(var(--text-secondary))', lineHeight: 1.6, margin: 0 },
  cta: { padding: '40px 36px', marginTop: '80px', textAlign: 'center', borderRadius: '22px' },
  ctaTitle: { fontFamily: 'var(--font-heading)', fontSize: '26px', fontWeight: 700, marginBottom: '12px' },
  ctaDesc: { fontSize: '16px', color: 'hsl(var(--text-secondary))', lineHeight: 1.6, maxWidth: '520px', margin: '0 auto 26px' },
  ctaBtns: { display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' },
};
