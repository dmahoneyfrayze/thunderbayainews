import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Info } from 'lucide-react';
import { getPost, POSTS } from '../data/posts';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { useJsonLd } from '../lib/useJsonLd';

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
    case 'callout':
      return (
        <div className="glass-panel" style={styles.callout}>
          <Info size={18} color="hsl(var(--primary-cyan))" style={{ flexShrink: 0, marginTop: '2px' }} />
          <p style={styles.calloutText}>{block.text}</p>
        </div>
      );
    case 'source':
      return <p style={styles.source}>{block.text}</p>;
    default:
      return <p style={styles.p}>{block.text}</p>;
  }
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPost(slug);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  useDocumentMeta({
    title: post ? `${post.title} | Thunder Bay AI` : 'Not found | Thunder Bay AI',
    description: post ? post.dek : undefined,
    path: post ? `/blog/${post.slug}` : undefined,
    type: 'article',
  });

  const url = post ? `https://thunderbayai.com/blog/${post.slug}` : undefined;
  useJsonLd(post ? {
    '@context': 'https://schema.org',
    '@graph': [
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
    ],
  } : null);

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

  const more = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

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

        {/* CTA */}
        <div className="glass-panel" style={styles.cta}>
          <h3 style={styles.ctaTitle}>Stay on top of this</h3>
          <p style={styles.ctaDek}>
            The agent tracks every program, deadline, and AI shift in the region. Get the ones that
            matter in a weekly email — filtered, and checked by a human.
          </p>
          <Link to="/" state={{ scrollTo: 'weekly-brief' }} className="btn btn-cyan" style={{ textDecoration: 'none' }}>
            Get the weekly brief
          </Link>
        </div>

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
  cta: { padding: '36px', marginTop: '56px', textAlign: 'center', borderRadius: '20px' },
  ctaTitle: { fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700, marginBottom: '12px' },
  ctaDek: { fontSize: '16px', color: 'hsl(var(--text-secondary))', lineHeight: 1.6, maxWidth: '480px', margin: '0 auto 24px' },
  moreWrap: { marginTop: '72px' },
  moreGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginTop: '20px' },
  moreCard: { display: 'flex', flexDirection: 'column', gap: '14px', padding: '24px', borderRadius: '16px', textDecoration: 'none', color: 'inherit' },
  moreTitle: { fontFamily: 'var(--font-heading)', fontSize: '17px', fontWeight: 700, lineHeight: 1.3, letterSpacing: '-0.01em' },
};
