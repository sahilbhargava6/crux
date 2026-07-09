"use client";

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    const move = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
      if (!visible) setVisible(true);
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', move);
    animate();

    const addHoverListeners = () => {
      const interactables = document.querySelectorAll('a, button, .glass-card, .project-card, .testimonial-card, .process-step');
      interactables.forEach(el => {
        el.addEventListener('mouseenter', () => setHovered(true));
        el.addEventListener('mouseleave', () => setHovered(false));
      });
    };

    // Re-attach after DOM settles
    addHoverListeners();
    const timer = setTimeout(addHoverListeners, 2000);

    return () => {
      window.removeEventListener('mousemove', move);
      clearTimeout(timer);
    };
  }, [visible]);

  // Hide on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  return (
    <>
      {/* Outer ring */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          width: hovered ? '64px' : '36px',
          height: hovered ? '64px' : '36px',
          border: hovered ? '2px solid #ff0000' : '2px solid #ff0000',
          background: hovered ? 'rgba(255, 0, 0, 0.08)' : 'transparent',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10000,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.25s ease, height 0.25s ease, background 0.25s ease',
          opacity: visible ? 1 : 0,
        }}
      />
      {/* Inner dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          width: hovered ? '8px' : '6px',
          height: hovered ? '8px' : '6px',
          background: '#ff0000',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10001,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.15s, height 0.15s',
          opacity: visible ? 1 : 0,
        }}
      />
      <style jsx global>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>
    </>
  );
}
