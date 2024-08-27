import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

interface HoverButtonProps {
  src: string;
  alt?: string;
  className?: string;
}

const HoverButton: React.FC<HoverButtonProps> = ({ src, alt = '', className = '' }) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const el = imgRef.current;

    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!el) return;
      const box = el.getBoundingClientRect();
      const x = box.left + box.width / 2;
      const y = box.top + box.height / 2;
      const width = box.width;
      const hoverArea = hover ? 0.7 : 0.5;
      const mouseX = e.clientX - x;
      const mouseY = e.clientY - y;
      const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);

      if (distance < width * hoverArea) {
        if (!hover) {
          setHover(true);
          gsap.to(el, {
            x: mouseX * 0.4,
            y: mouseY * 0.4,
            scale: 1.15,
            ease: 'power2.out',
            duration: 0.4,
            zIndex: 10
          });
        }
      } else if (hover) {
        setHover(false);
        gsap.to(el, {
          x: 0,
          y: 0,
          scale: 1,
          ease: 'elastic.out(1.2, 0.4)',
          duration: 0.7,
          zIndex: 1
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      gsap.killTweensOf(el); // Clean up GSAP animations
    };
  }, [hover]);

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className={`transition-transform ${className}`}
    />
  );
};

export default HoverButton;
