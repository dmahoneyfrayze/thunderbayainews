import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, ArrowUpRight } from 'lucide-react';
import { GRANTS_DATA, formatVerified } from '../data';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { useJsonLd } from '../lib/useJsonLd';
import BriefSignup from '../components/BriefSignup';

const SITE = 'https://thunderbayai.com';

function buildFaq(g) {
  const eligParts = [`${g.name} is open to ${g.eligibility.businessType} in ${g.eligibility.location}.`];
  if (g.eligibility.excludes) {
    eligParts.push(`Not eligible: ${g.eligibility.excludes}.`);
  }
  eligParts.push(`Confirm your specific eligibility directly with ${g.source} before applying.`);

  return [
    {
      q: `What is the ${g.name}?`,
      a: g.description,
    },
    {
      q: `Who can apply for the ${g.name}?`,
      a: eligParts.join(' '),
    },
    {
      q: `How much funding does the ${g.name} provide?`,
      a: `The ${g.name} can provide up to ${g.maxAmount}. Coverage: ${g.coverage}. Current funding availability and your specific entitlement must be confirmed with ${g.source} — amounts depend on program budget and individual circumstances.`,
    },
    {
      q: `How do I apply for the ${g.name}?`,
      a: `${g.eligibility.requirements} Visit the official program page for the full application process. Deadline: ${g.deadline}.`,
    },
  ];
}

export default function FundingProgram() {
  const { id } = useParams();
  const program = GRANTS_DATA.find((g) => g.id === id);

  const related = program
    ? [
        ...GRANTS_DATA.filter((g) => g.id !== id && g.source === program.source),
        ...GRANTS_DATA.filter((g) => g.id !== id && g.source !== program.source),
      ].slice(0, 3)
    : [];

  const pageUrl = program ? `${SITE}/funding/${program.id}` : undefined;
  const faq = program ? buildFaq(program) : [];

  useDocumentMeta({
    title: program
      ? `${program.name} — ${program.eligibility.location} funding guide (2026) | Thunder Bay AI`
      : 'Program not found | Thunder Bay AI',
    description: program
      ? `${program.name} (${program.source}): up to ${program.maxAmount}, ${program.coverage}. ${program.status} — deadline: ${program.deadline}. Verify eligibility with the program.`
      : undefined,
    path: program ? `/funding/${program.id}` : undefined,
  });

  useJsonLd(
    program
      ? {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'GovernmentService',
              '@id': pageUrl,
              name: program.name,
              description: program.description,
              url: pageUrl,
              serviceUrl: program.sourceUrl,
              serviceType: 'Business Funding Program',
              provider: {
                '@type': 'Organization',
                name: program.source,
              },
              areaServed: {
                '@type': 'AdministrativeArea',
                name: program.eligibility.location,
              },
              offers: {
                '@type': 'Offer',
                description: `${program.coverage}. Maximum: ${program.maxAmount}.`,
              },
              isPartOf: { '@id': `${SITE}/#website` },
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
                { '@type': 'ListItem', position: 2, name: 'Funding', item: `${SITE}/funding` },
                { '@type': 'ListItem', position: 3, name: program.name, item: pageUrl },
              ],
            },
            {
              '@type': 'FAQPage',
              mainEntity: faq.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            },
          ],
        }
      : null
  );

  if (!program) {
    return (
      <div style={{ ...styles.page, textAlign: 'center' }}>
        <div className="container">
          <h1 style={styles.title}>Program not found</h1>
          <p style={styles.dek}>That program does not exist in the funding database.</p>
          <Link to="/funding" style={styles.backLink}>
            <ArrowLeft size={16} /> Funding Radar
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.glow} />

      <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '820px' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link to="/funding" style={styles.backLink}>
            <ArrowLeft size={16} /> Funding Radar
          </Link>

          <div style={styles.metaTop}>
            <span style={styles.source}>{program.source}</span>
            <span className={`badge badge-${program.badgeType}`}>{program.status}</span>
          </div>

          <h1 style={styles.title}>{program.name}</h1>

          {/* Direct-answer box — the pattern AI engines cite */}
          <div style={styles.answer}>
            <span style={styles.answerLabel}>THE SHORT ANSWER</span>
            <p style={styles.answerText}>{program.description}</p>
          </div>

          <div style={styles.metaRow}>
            <div style={styles.metaCol}>
              <span style={styles.metaLabel}>Max funding</span>
              <span style={styles.metaValue} className="accent-text">{program.maxAmount}</span>
            </div>
            <div style={styles.metaCol}>
              <span style={styles.metaLabel}>Coverage</span>
              <span style={styles.metaValue}>{program.coverage}</span>
            </div>
            <div style={styles.metaCol}>
              <span style={styles.metaLabel}>Deadline</span>
              <span style={styles.metaValue}>{program.deadline}</span>
            </div>
            {program.lastVerified && (
              <div style={styles.metaCol}>
                <span style={styles.metaLabel}>Last verified</span>
                <span style={styles.metaValue}>{formatVerified(program.lastVerified)}</span>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <section style={styles.section}>
            <h2 style={styles.h2}>Who can apply</h2>
            <div className="glass-panel" style={styles.eligGrid}>
              <div style={styles.eligRow}>
                <span style={styles.eligLabel}>Location</span>
                <span style={styles.eligValue}>{program.eligibility.location}</span>
              </div>
              <div style={styles.eligRow}>
                <span style={styles.eligLabel}>Business type</span>
                <span style={styles.eligValue}>{program.eligibility.businessType}</span>
              </div>
              {program.eligibility.excludes && (
                <div style={styles.eligRow}>
                  <span style={styles.eligLabel}>Not eligible</span>
                  <span style={styles.eligValue}>{program.eligibility.excludes}</span>
                </div>
              )}
              <div style={{ ...styles.eligRow, borderBottom: 'none' }}>
                <span style={styles.eligLabel}>Requirements</span>
                <span style={styles.eligValue}>{program.eligibility.requirements}</span>
              </div>
            </div>
            <p style={styles.caveat}>
              Eligibility is guidance only — always confirm directly with {program.source} before
              planning around this program. Never assume you qualify based on this summary alone.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.h2}>Frequently asked</h2>
            {faq.map((f, i) => (
              <div key={i} style={styles.faqItem}>
                <h3 style={styles.faqQ}>{f.q}</h3>
                <p style={styles.faqA}>{f.a}</p>
              </div>
            ))}
          </section>

          <div className="glass-panel" style={styles.officialWrap}>
            <p style={styles.officialNote}>
              This page summarizes publicly available program information verified against official
              sources. All amounts, deadlines, and eligibility details must be confirmed with the
              program administrator before applying.
            </p>
            <a
              href={program.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-cyan"
              style={{ textDecoration: 'none', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              Official program page <ExternalLink size={14} />
            </a>
          </div>

          <div style={{ marginTop: '52px' }}>
            <BriefSignup
              heading="Get program updates and deadlines"
              dek="Funding deadlines change. Get the programs that matter for Northwestern Ontario in one email a week."
            />
          </div>

          {related.length > 0 && (
            <div style={styles.relatedWrap}>
              <span className="font-label">MORE FUNDING PROGRAMS</span>
              <div style={styles.relatedGrid}>
                {related.map((r) => (
                  <Link key={r.id} to={`/funding/${r.id}`} className="glass-panel" style={styles.relatedCard}>
                    <span style={styles.relatedSource}>{r.source}</span>
                    <h4 style={styles.relatedName}>{r.name}</h4>
                    <span style={styles.relatedAmount} className="accent-text">{r.maxAmount}</span>
                    <span style={styles.relatedMore}>
                      View details <ArrowUpRight size={13} />
                    </span>
                  </Link>
                ))}
              </div>
              <Link to="/funding" style={styles.allLink}>
                View all {GRANTS_DATA.length} programs <ArrowUpRight size={15} />
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    position: 'relative', minHeight: '100vh', padding: '150px 0 120px', overflow: 'hidden',
  },
  glow: {
    position: 'absolute', top: '-5%', left: '-5%', width: '500px', height: '500px',
    background: 'radial-gradient(circle, hsla(184,100%,48%,0.10) 0%, transparent 70%)',
    filter: 'blur(80px)', pointerEvents: 'none', zIndex: 1,
  },
  backLink: {
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    fontFamily: 'var(--font-label)', fontSize: '12px', letterSpacing: '0.15em',
    textTransform: 'uppercase', color: 'hsl(var(--text-secondary))', textDecoration: 'none',
    marginBottom: '32px',
  },
  metaTop: {
    display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', flexWrap: 'wrap',
  },
  source: {
    fontSize: '12px', fontWeight: 700, color: 'hsl(var(--primary-cyan))',
    textTransform: 'uppercase', letterSpacing: '0.05em',
  },
  title: {
    fontFamily: 'var(--font-heading)', fontWeight: 800,
    fontSize: 'clamp(28px, 5vw, 48px)', letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: '28px',
  },
  dek: {
    fontSize: '19px', color: 'hsl(var(--text-secondary))', lineHeight: 1.6, marginBottom: '28px',
  },
  answer: {
    margin: '0 0 32px', padding: '22px 24px', borderRadius: '14px',
    background: 'linear-gradient(135deg, hsla(184,100%,48%,0.07) 0%, hsla(275,80%,56%,0.05) 100%)',
    borderLeft: '3px solid hsl(var(--primary-cyan))',
  },
  answerLabel: {
    fontFamily: 'var(--font-label)', fontSize: '10px', letterSpacing: '0.24em',
    color: 'hsl(var(--primary-cyan))', textTransform: 'uppercase', display: 'block', marginBottom: '10px',
  },
  answerText: {
    fontSize: '17px', color: 'hsl(var(--text-primary))', lineHeight: 1.65, margin: 0,
  },
  metaRow: {
    display: 'flex', flexWrap: 'wrap', gap: '0',
    borderTop: '1px solid hsla(0,0%,100%,0.07)', borderBottom: '1px solid hsla(0,0%,100%,0.07)',
    padding: '20px 0', marginBottom: '44px',
  },
  metaCol: {
    display: 'flex', flexDirection: 'column', flex: '1 1 180px', padding: '0 24px 0 0',
  },
  metaLabel: {
    fontSize: '10px', color: 'hsl(var(--text-muted))', textTransform: 'uppercase',
    letterSpacing: '0.08em', marginBottom: '6px',
  },
  metaValue: {
    fontSize: '15px', fontWeight: 600, lineHeight: 1.4,
  },
  section: {
    marginBottom: '48px',
  },
  h2: {
    fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700,
    letterSpacing: '-0.02em', marginBottom: '20px', color: 'hsl(var(--text-primary))',
  },
  eligGrid: {
    padding: '0', overflow: 'hidden', borderRadius: '16px',
  },
  eligRow: {
    display: 'flex', gap: '20px', padding: '15px 22px',
    borderBottom: '1px solid hsla(0,0%,100%,0.05)', flexWrap: 'wrap',
  },
  eligLabel: {
    fontSize: '11px', fontWeight: 700, color: 'hsl(var(--text-muted))',
    textTransform: 'uppercase', letterSpacing: '0.05em',
    minWidth: '120px', paddingTop: '3px', flexShrink: 0,
  },
  eligValue: {
    fontSize: '14.5px', color: 'hsl(var(--text-secondary))', lineHeight: 1.55, flex: 1,
  },
  caveat: {
    fontSize: '13px', color: 'hsl(var(--text-muted))', lineHeight: 1.55,
    marginTop: '14px', fontStyle: 'italic',
  },
  faqItem: {
    padding: '20px 0', borderTop: '1px solid hsla(0,0%,100%,0.07)',
  },
  faqQ: {
    fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 700,
    marginBottom: '8px', letterSpacing: '-0.01em',
  },
  faqA: {
    fontSize: '15.5px', color: 'hsl(var(--text-secondary))', lineHeight: 1.65, margin: 0,
  },
  officialWrap: {
    display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
    gap: '20px', padding: '24px', borderRadius: '16px', flexWrap: 'wrap',
  },
  officialNote: {
    fontSize: '14px', color: 'hsl(var(--text-muted))', lineHeight: 1.55,
    margin: 0, maxWidth: '500px',
  },
  relatedWrap: {
    marginTop: '64px',
  },
  relatedGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
    gap: '18px', marginTop: '20px', marginBottom: '22px',
  },
  relatedCard: {
    display: 'flex', flexDirection: 'column', gap: '10px',
    padding: '22px', borderRadius: '16px', textDecoration: 'none', color: 'inherit',
  },
  relatedSource: {
    fontSize: '11px', fontWeight: 700, color: 'hsl(var(--primary-cyan))',
    textTransform: 'uppercase', letterSpacing: '0.05em',
  },
  relatedName: {
    fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700,
    lineHeight: 1.3, letterSpacing: '-0.01em',
  },
  relatedAmount: {
    fontSize: '13px', fontWeight: 600,
  },
  relatedMore: {
    display: 'inline-flex', alignItems: 'center', gap: '4px',
    fontSize: '12.5px', color: 'hsl(var(--text-muted))', marginTop: 'auto',
  },
  allLink: {
    display: 'inline-flex', alignItems: 'center', gap: '7px',
    fontSize: '14px', fontWeight: 600, color: 'hsl(var(--text-secondary))', textDecoration: 'none',
  },
};
