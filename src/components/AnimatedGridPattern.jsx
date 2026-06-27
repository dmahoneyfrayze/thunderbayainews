import React, { useEffect, useId, useRef, useState } from "react";

export function AnimatedGridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 30,
  className,
  style,
  ...props
}) {
  const id = useId();
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [squares, setSquares] = useState([]);

  // Generate random squares within dimensions
  useEffect(() => {
    if (!dimensions.width || !dimensions.height) return;
    
    const cols = Math.floor(dimensions.width / width);
    const rows = Math.floor(dimensions.height / height);
    
    if (cols === 0 || rows === 0) return;
    
    const newSquares = Array.from({ length: numSquares }, (_, i) => ({
      id: i,
      x: Math.floor(Math.random() * cols),
      y: Math.floor(Math.random() * rows),
      delay: Math.random() * 6, // random delay for staggered entrance
      duration: 4 + Math.random() * 5 // random duration for fading cycle
    }));
    
    setSquares(newSquares);
  }, [dimensions, numSquares, width, height]);

  // ResizeObserver to track container sizes
  useEffect(() => {
    const currentContainer = containerRef.current;
    
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    if (currentContainer) {
      resizeObserver.observe(currentContainer);
    }

    return () => {
      if (currentContainer) {
        resizeObserver.unobserve(currentContainer);
      }
    };
  }, []);

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className || ''}`}
      style={{
        zIndex: 0,
        ...style
      }}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      <svg x={x} y={y} className="overflow-visible">
        {squares.map((sq) => (
          <rect
            key={sq.id}
            width={width - 1}
            height={height - 1}
            x={sq.x * width + 1}
            y={sq.y * height + 1}
            className="pulse-grid-square"
            style={{
              opacity: 0,
              animationName: 'pulseSquare',
              animationDuration: `${sq.duration}s`,
              animationDelay: `${sq.delay}s`,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'ease-in-out',
              willChange: 'opacity',
              fill: 'currentColor',
              strokeWidth: 0
            }}
          />
        ))}
      </svg>
    </svg>
  );
}
