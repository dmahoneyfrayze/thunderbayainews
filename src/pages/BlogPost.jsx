import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Info, Copy, Check, ArrowUpRight } from 'lucide-react';
import { getPost, POSTS } from '../data/posts';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { useJsonLd } from '../lib/useJsonLd';
import BriefSignup from '../components/BriefSignup';

function Block({ block }) {
  switch (block.type) {
    case 'h2':
      return <h2 style={styles.h2}>{block.text}</h2>;
    case 'ul':
      return (
        <ul style={styles.ul}>
          {block.items.map((it, i) => (
            <li key={i} style={styles.li}>
              <span style={styles.bullet} />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );
    case 'answer':
      return (
        <div style={styles.answer}>
          <span style={styles.answerLabel}>THE SHORT ANSWER</span>
          <p style={styles.answerText}>{block.text}</p>
        </div>
      );
    case 'callout':
      return (
        <div className="glass-panel" style={styles.callout}>
          <Info size={18} color="hsl(var(--primary-cyan))" style={{ flexShrink: 0, marginTop: '2px' }} />
          <p style={styles.calloutText}>{block.text}</p>
        </div>
      );
    case 'source':
      return <p style={styles.source}>{block.text}</p>;
    case 'figure':
      return (
        <figure style={styles.figure}>
          <img src={block.src} alt={block.alt} width={block.w} height={block.h} loading="lazy" decoding="async" style={styles.figureImg} />
          {block.caption && <figcaption style={styles.figcaption}>{block.caption}</figcaption>}
        </figure>
      );
    case 'feature':
      return (
        <figure style={styles.feature}>
          {block.label && <span style={styles.featureLabel}>{block.label}</span>}
          <img src={block.src} alt={block.alt} width={block.w} height={block.h} loading="lazy" decoding="async" style={styles.featureImg} />
          {block.caption && <figcaption style={styles.figcaption}>{block.caption}</figcaption>}
        </figure>
      );
    default:
      return <p style={styles.p}>{block.text}</p>;
  }
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPost(slug);
  const [copied, setCopied] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  useDocumentMeta({
    title: post ? `${post.title} | Thunder Bay AI` : 'Not found | Thunder Bay AI',
    description: post ? post.dek : undefined,
    path: post ? `/blog/${post.slug}` : undefined,
    type: 'article',
  });

  const url = post ? `https://thunderbayai.com/blog/${post.slug}` : undefined;
  const jsonGraph = post ? [
    {
      '@type': 'Article',
      headline: post.title,
      description: post.dek,
      datePublished: post.iso,
      dateModified: post.iso,
      articleSection: post.category,
      inLanguage: 'en-CA',
      author: { '@type': 'Organization', name: 'Thunder Bay AI', url: 'https://thunderbayai.com' },
      publisher: { '@type': 'Organization', name: 'Frayze', url: 'https://frayze.ca' },
      isPartOf: { '@id': 'https://thunderbayai.com/#website' },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      url,
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://thunderbayai.com' },
        { '@type': 'ListItem', position: 2, name: 'Journal', item: 'https://thunderbayai.com/blog' },
        { '@type': 'ListItem', position: 3, name: post.title, item: url },
      ],
    },
  ] : null;
  if (post && post.faq && post.faq.length) {
    jsonGraph.push({
      '@type': 'FAQPage',
      mainEntity: post.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }
  useJsonLd(post ? { '@context': 'https://schema.org', '@graph': jsonGraph } : null);

  if (!post) {
    return (
      <div style={{ ...styles.page, textAlign: 'center' }}>
        <div className="container">
          <h1 style={styles.title}>Not found</h1>
          <p style={styles.dek}>That entry doesn’t exist (yet).</p>
          <Link to="/blog" style={styles.backLink}><ArrowLeft size={16} /> Back to the Journal</Link>
        </div>
      </div>
    );
  }

  const sameCat = POSTS.filter((p) => p.slug !== post.slug && p.category === post.category);
  const others = POSTS.filter((p) => p.slug !== post.slug && p.category !== post.category);
  const more = [...sameCat, ...others].slice(0, 2);

  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(url)}`;
  const liUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const copyLink = () => {
    if (navigator.clipboard && url) {
      navigator.clipboard.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800); }).catch(() => {});
    }
  };

  return (
    <div style={styles.page}>
      <div style={{ ...styles.glow, background: `radial-gradient(circle, ${post.accent[0]}22 0%, transparent 70%)` }} />

      <article className="container" style={styles.article}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link to="/blog" style={styles.backLink}><ArrowLeft size={16} /> The Journal</Link>

          <div style={styles.metaTop}>
            <span className="badge badge-active">{post.category}</span>
            <span style={styles.metaText}>{post.date}</span>
            <span style={styles.metaDot} />
            <span style={{ ...styles.metaText, display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <Clock size={13} /> {post.readMins} min read
            </span>
          </div>

          <h1 style={styles.title}>{post.title}</h1>
          <p style={styles.dek}>{post.dek}</p>
          <div style={{ ...styles.rule, background: `linear-gradient(90deg, ${post.accent[0]}, ${post.accent[1]}, transparent)` }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={styles.body}
        >
          {post.blocks.map((b, i) => <Block key={i} block={b} />)}
        </motion.div>

        {/* FAQ (also emitted as FAQPage schema) */}
        {post.faq && post.faq.length > 0 && (
          <section style={styles.faqWrap}>
            <h2 style={styles.h2}>Frequently asked</h2>
            {post.faq.map((f, i) => (
              <div key={i} style={styles.faqItem}>
                <h3 style={styles.faqQ}>{f.q}</h3>
                <p style={styles.faqA}>{f.a}</p>
              </div>
            ))}
          </section>
        )}

        {/* Share */}
        <div style={styles.shareRow}>
          <span style={styles.shareLabel}>Share this brief</span>
          <div style={styles.shareBtns}>
            <button onClick={copyLink} style={styles.shareBtn}>
              {copied ? <Check size={15} /> : <Copy size={15} />} {copied ? 'Link copied' : 'Copy link'}
            </button>
            <a href={xUrl} target="_blank" rel="noopener noreferrer" style={styles.shareBtn}>Share on X</a>
            <a href={liUrl} target="_blank" rel="noopener noreferrer" style={styles.shareBtn}>Share on LinkedIn</a>
          </div>
        </div>

        {/* Inline signup — capture at the moment of highest intent */}
        <div style={{ marginTop: '44px' }}>
          <BriefSignup heading="Get the weekly Signal" />
        </div>

        {/* Related cross-links */}
        {post.related && post.related.length > 0 && (
          <div style={styles.relatedWrap}>
            <span className="font-label">RELATED ON THUNDER BAY AI</span>
            <div style={styles.relatedList}>
              {post.related.map((r, i) => (
                <Link key={i} to={r.to} style={styles.relatedLink}>
                  <span>{r.label}</span> <ArrowUpRight size={15} />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* more */}
        <div style={styles.moreWrap}>
          <span className="font-label">KEEP READING</span>
          <div style={styles.moreGrid}>
            {more.map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className="glass-panel" style={styles.moreCard}>
                <span className="badge badge-active" style={{ fontSize: '11px', alignSelf: 'flex-start' }}>{p.category}</span>
                <h4 style={styles.moreTitle}>{p.title}</h4>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}

const styles = {
  page: { position: 'relative', minHeight: '100vh', padding: '150px 0 120px', overflow: 'hidden' },
  glow: { position: 'absolute', top: '-5%', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '500px', filter: 'blur(90px)', pointerEvents: 'none', zIndex: 1 },
  article: { position: 'relative', zIndex: 2, maxWidth: '760px' },
  backLink: {
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    fontFamily: 'var(--font-label)', fontSize: '12px', letterSpacing: '0.15em',
    textTransform: 'uppercase', color: 'hsl(var(--text-secondary))', textDecoration: 'none',
    marginBottom: '32px',
  },
  metaTop: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' },
  metaText: { fontFamily: 'var(--font-label)', fontSize: '12px', color: 'hsl(var(--text-muted))', letterSpacing: '0.04em' },
  metaDot: { width: '3px', height: '3px', borderRadius: '50%', background: 'hsl(var(--text-muted))' },
  title: { fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(30px, 5vw, 50px)', letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: '20px' },
  dek: { fontSize: '19px', color: 'hsl(var(--text-secondary))', lineHeight: 1.6, marginBottom: '28px' },
  rule: { height: '2px', width: '100%', borderRadius: '2px', marginBottom: '8px' },
  body: { marginTop: '12px' },
  p: { fontSize: '17px', color: 'hsl(var(--text-secondary))', lineHeight: 1.8, marginBottom: '22px' },
  h2: { fontFamily: 'var(--font-heading)', fontSize: '26px', fontWeight: 700, letterSpacing: '-0.02em', margin: '40px 0 18px', color: 'hsl(var(--text-primary))' },
  ul: { listStyle: 'none', margin: '0 0 24px', padding: 0, display: 'flex', flexDirection: 'column', gap: '14px' },
  li: { display: 'flex', gap: '14px', fontSize: '16.5px', color: 'hsl(var(--text-secondary))', lineHeight: 1.65 },
  bullet: { flexShrink: 0, width: '7px', height: '7px', borderRadius: '50%', marginTop: '9px', background: 'linear-gradient(135deg, hsl(var(--primary-cyan)), hsl(var(--primary-violet)))' },
  callout: { display: 'flex', gap: '14px', padding: '20px 22px', margin: '28px 0', borderRadius: '14px' },
  calloutText: { fontSize: '15.5px', color: 'hsl(var(--text-secondary))', lineHeight: 1.65, fontStyle: 'italic' },
  source: { fontSize: '13px', color: 'hsl(var(--text-muted))', lineHeight: 1.6, marginTop: '36px', paddingTop: '20px', borderTop: '1px solid hsla(0,0%,100%,0.06)' },

  // in-body visuals (notebook-studio): landscape figure + portrait feature
  figure: { margin: '36px 0', display: 'flex', flexDirection: 'column', gap: '12px' },
  figureImg: { width: '100%', height: 'auto', borderRadius: '16px', border: '1px solid hsla(0,0%,100%,0.08)', boxShadow: '0 20px 60px -24px rgba(0,0,0,0.65)', display: 'block' },
  figcaption: { fontSize: '13.5px', color: 'hsl(var(--text-muted))', lineHeight: 1.55, fontStyle: 'italic', textAlign: 'center', maxWidth: '560px', margin: '0 auto' },
  feature: { margin: '44px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' },
  featureLabel: { fontFamily: 'var(--font-label)', fontSize: '10px', letterSpacing: '0.24em', color: 'hsl(var(--primary-cyan))', textTransform: 'uppercase' },
  featureImg: { width: '100%', maxWidth: '470px', height: 'auto', borderRadius: '18px', border: '1px solid hsla(0,0%,100%,0.1)', boxShadow: '0 28px 80px -28px rgba(0,0,0,0.75), 0 0 0 1px hsla(184,100%,48%,0.06)', display: 'block' },
  cta: { padding: '36px', marginTop: '56px', textAlign: 'center', borderRadius: '20px' },
  ctaTitle: { fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700, marginBottom: '12px' },
  ctaDek: { fontSize: '16px', color: 'hsl(var(--text-secondary))', lineHeight: 1.6, maxWidth: '480px', margin: '0 auto 24px' },
  moreWrap: { marginTop: '72px' },
  moreGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginTop: '20px' },
  moreCard: { display: 'flex', flexDirection: 'column', gap: '14px', padding: '24px', borderRadius: '16px', textDecoration: 'none', color: 'inherit' },
  moreTitle: { fontFamily: 'var(--font-heading)', fontSize: '17px', fontWeight: 700, lineHeight: 1.3, letterSpacing: '-0.01em' },

  // direct-answer lead box (GEO/citability)
  answer: {
    margin: '0 0 32px', padding: '22px 24px', borderRadius: '14px',
    background: 'linear-gradient(135deg, hsla(184,100%,48%,0.07) 0%, hsla(275,80%,56%,0.05) 100%)',
    borderLeft: '3px solid hsl(var(--primary-cyan))',
  },
  answerLabel: { fontFamily: 'var(--font-label)', fontSize: '10px', letterSpacing: '0.24em', color: 'hsl(var(--primary-cyan))', textTransform: 'uppercase', display: 'block', marginBottom: '10px' },
  answerText: { fontSize: '17px', color: 'hsl(var(--text-primary))', lineHeight: 1.65, margin: 0 },

  // FAQ
  faqWrap: { marginTop: '56px' },
  faqItem: { padding: '20px 0', borderTop: '1px solid hsla(0,0%,100%,0.07)' },
  faqQ: { fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.01em' },
  faqA: { fontSize: '15.5px', color: 'hsl(var(--text-secondary))', lineHeight: 1.65, margin: 0 },

  // share
  shareRow: { marginTop: '48px', display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap', paddingTop: '24px', borderTop: '1px solid hsla(0,0%,100%,0.07)' },
  shareLabel: { fontFamily: 'var(--font-label)', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'hsl(var(--text-muted))' },
  shareBtns: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
  shareBtn: {
    display: 'inline-flex', alignItems: 'center', gap: '7px', cursor: 'pointer',
    fontFamily: 'var(--font-body)', fontSize: '13px', color: 'hsl(var(--text-secondary))',
    background: 'rgba(255,255,255,0.03)', border: '1px solid hsla(0,0%,100%,0.08)',
    borderRadius: '8px', padding: '8px 14px', textDecoration: 'none',
  },

  // related cross-links
  relatedWrap: { marginTop: '52px' },
  relatedList: { display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' },
  relatedLink: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
    padding: '14px 18px', borderRadius: '12px', textDecoration: 'none',
    color: 'hsl(var(--text-primary))', fontSize: '15px', fontWeight: 600,
    background: 'rgba(255,255,255,0.02)', border: '1px solid hsla(0,0%,100%,0.07)',
  },
};
