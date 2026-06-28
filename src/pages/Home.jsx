import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToId } from '../lib/smoothScroll';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import Hero from '../components/Hero';
import FundingRadar from '../components/FundingRadar';
import IntelligenceFeed from '../components/IntelligenceFeed';
import FundedBuilds from '../components/FundedBuilds';
import WeeklyBrief from '../components/WeeklyBrief';

// Infinite marquee band (from Stitch)
function Marquee() {
  const brands = [
    "AI NEWS", "LOCAL TECH", "GOVERNMENT", "FUNDING & GRANTS", "MODEL WATCH",
    "MUNICIPAL AI", "FEDNOR RAII", "NOIC", "NWO INNOVATION", "AI ADOPTION",
  ];
  return (
    <div style={marqueeStyles.wrapper}>
      <div className="marquee-track">
        {[...brands, ...brands, ...brands].map((brand, i) => (
          <span key={i} style={marqueeStyles.brand}>{brand}</span>
        ))}
      </div>
    </div>
  );
}

const marqueeStyles = {
  wrapper: {
    padding: '40px 0',
    overflow: 'hidden',
    borderTop: '1px solid hsla(0, 0%, 100%, 0.05)',
    borderBottom: '1px solid hsla(0, 0%, 100%, 0.05)',
    background: 'rgba(26, 25, 25, 0.1)',
  },
  brand: {
    fontFamily: 'var(--font-heading)',
    fontWeight: 800,
    fontSize: 'clamp(28px, 4vw, 48px)',
    letterSpacing: '-0.04em',
    color: 'hsla(0, 0%, 100%, 0.06)',
    cursor: 'default',
    transition: 'color 0.3s ease',
    flexShrink: 0,
  },
};

export default function Home() {
  const location = useLocation();
  useDocumentMeta({
    title: 'Thunder Bay AI — Autonomous AI Intelligence Hub for Northwestern Ontario',
    description: 'An autonomous agent tracks the AI news, local tech, government and municipal projects, funding, and tools that matter for Northwestern Ontario — then surfaces the signal. Reviewed by humans.',
    path: '/',
  });
  // When navigated here from another route with a target section, scroll to it.
  useEffect(() => {
    const id = location.state && location.state.scrollTo;
    if (id) {
      const t = setTimeout(() => scrollToId(id), 120);
      return () => clearTimeout(t);
    }
  }, [location.state]);

  return (
    <>
      <Hero />
      <Marquee />
      <FundingRadar />
      <IntelligenceFeed />
      <FundedBuilds />
      <WeeklyBrief />
    </>
  );
}
