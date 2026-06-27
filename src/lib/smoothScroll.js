import Lenis from 'lenis';

// Single Lenis instance shared across the app. Lenis drives the buttery
// inertia scroll that gives the site its "dev showcase" feel; framer-motion's
// useScroll still reads window scroll, so the two cooperate.
let lenis = null;

export function initSmoothScroll() {
  if (lenis) return lenis;
  // Skip on touch / reduced-motion — native scroll is better there.
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  if (reduce || coarse) return null;

  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
  });

  let rafId;
  function raf(time) {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  }
  rafId = requestAnimationFrame(raf);

  lenis._stop = () => {
    cancelAnimationFrame(rafId);
    lenis.destroy();
    lenis = null;
  };
  return lenis;
}

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -80, duration: 1.2 });
  else el.scrollIntoView({ behavior: 'smooth' });
}

export function destroySmoothScroll() {
  if (lenis && lenis._stop) lenis._stop();
}
