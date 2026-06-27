import React, { useEffect, useRef } from 'react';

// rAF lerp-follow cursor. The previous version wrote `transform` on every
// mousemove against a CSS transform-transition, which made it lag and snap.
// Here we lerp the cursor position AND scale toward their targets every frame
// for a smooth trailing follow — the premium "Stitch" feel.
export default function CustomCursor() {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

    const el = ref.current;
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { x: pos.x, y: pos.y };
    let scale = 1;
    let targetScale = 1;
    let hovering = false;
    let raf;

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const onOver = (e) => {
      const h = !!(e.target.closest && e.target.closest('button, a, .tilt-card, input, [data-cursor]'));
      if (h !== hovering) {
        hovering = h;
        targetScale = h ? 2.6 : 1;
        if (el) el.classList.toggle('hovering', h);
      }
    };

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      scale += (targetScale - scale) * 0.2;
      if (el) {
        el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${scale.toFixed(3)})`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, []);

  return (
    <div ref={ref} className="custom-cursor">
      <div className="custom-cursor-dot" />
    </div>
  );
}
