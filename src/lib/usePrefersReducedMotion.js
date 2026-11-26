import { useState, useEffect } from 'react';

// Live OS-level reduced-motion preference, same lazy-init + matchMedia
// pattern as useIsMobile.js. Used to skip purely decorative, pointer-driven
// effects (custom cursor follow, card tilt) for motion-sensitive users.
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
