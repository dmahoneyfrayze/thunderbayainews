import React from 'react';

// On-brand bolt mark — replaces the emoji logo (no-emoji rule). Cyan->violet
// gradient matches --primary-cyan / --primary-violet.
export default function BoltMark({ size = 22 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{ display: 'block', flexShrink: 0 }}
    >
      <defs>
        <linearGradient id="boltGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00f0ff" />
          <stop offset="1" stopColor="#b800ff" />
        </linearGradient>
      </defs>
      <path
        d="M13.5 2 4 13.2a.6.6 0 0 0 .46.99H10l-1.4 7.2a.4.4 0 0 0 .72.3L20 11.5a.6.6 0 0 0-.47-.98H14l1.2-8.2a.4.4 0 0 0-.7-.32z"
        fill="url(#boltGrad)"
      />
    </svg>
  );
}
