import React, { useRef } from 'react';

// Ref-based 3D tilt. The previous version called setState on every mousemove,
// re-rendering the component each frame (jank) while a 0.2s transform-transition
// fought the updates (rubber-banding). Here we write transform straight to the
// DOM node: a near-instant ease while tracking, a longer spring-like ease on
// leave so it settles smoothly.
export default function TiltCard({ children, style, className, max = 8 }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    const rotateX = (-ny * max).toFixed(2);
    const rotateY = (nx * max).toFixed(2);
    el.style.transition = 'transform 0.1s ease-out';
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}
