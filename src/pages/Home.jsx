import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToId } from '../lib/smoothScroll';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { getOgImageUrl } from '../lib/og-images';
import Hero from '../components/Hero';
import StartHere from '../components/StartHere';
import FundingRadar from '../components/FundingRadar';
import IntelligenceFeed from '../components/IntelligenceFeed';
import FundedBuilds from '../components/FundedBuilds';
import WeeklyBrief from '../components/WeeklyBrief';

export default function Home() {
  const location = useLocation();
  useDocumentMeta({
    title: 'Thunder Bay AI — Autonomous AI Intelligence Hub for Northwestern Ontario',
    description: 'An autonomous agent tracks the AI news, local tech, government and municipal projects, funding, and tools that matter for Northwestern Ontario — then surfaces the signal. Reviewed by humans.',
    path: '/',
    image: getOgImageUrl('/') || undefined,
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
      <StartHere />
      <IntelligenceFeed />
      <FundingRadar />
      <FundedBuilds />
      <WeeklyBrief />
    </>
  );
}
