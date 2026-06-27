import React, { useRef, useEffect, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = isHovering
          ? `translate3d(${e.clientX}px, ${e.clientY}px, 0) scale(3)`
          : `translate3d(${e.clientX}px, ${e.clientY}px, 0) scale(1)`;
      }
    };

    const handleHover = (e) => {
      const target = e.target;
      setIsHovering(!!target.closest('button, a, .group, .tilt-card'));
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, [isHovering]);

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
    >
      {isHovering && <div className="custom-cursor-dot" />}
    </div>
  );
}
