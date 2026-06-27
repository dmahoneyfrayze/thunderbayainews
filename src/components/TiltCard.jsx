import React, { useRef, useState } from 'react';

export default function TiltCard({ children, style, className }) {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Position of cursor relative to card bounding box
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalized position from -0.5 to 0.5
    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;
    
    // Tilt settings
    const maxRotateX = 10; // max tilt degrees
    const maxRotateY = 10;
    
    const rotateX = -(normalizedY * maxRotateX).toFixed(2);
    const rotateY = (normalizedX * maxRotateY).toFixed(2);
    
    setTransformStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transform: transformStyle,
        transition: 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)',
        transformStyle: 'preserve-3d',
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
}
