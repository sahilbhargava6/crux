"use client";

import { useState, useEffect } from 'react';

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setDone(true), 400);
          setTimeout(() => setHidden(true), 1200);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  if (hidden) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'var(--crux-black)',
      zIndex: 99999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'opacity 0.8s ease, transform 0.8s ease',
      opacity: done ? 0 : 1,
      transform: done ? 'scale(1.1)' : 'scale(1)',
      pointerEvents: done ? 'none' : 'auto',
    }}>
      {/* Logo */}
      <img
        src="/logo.png"
        alt="CRUX.TSC"
        style={{
          width: '80px',
          marginBottom: '40px',
          animation: 'pulse 1.5s ease-in-out infinite',
        }}
      />

      {/* Brand name */}
      <h1 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '2rem',
        color: 'white',
        letterSpacing: '8px',
        marginBottom: '40px',
      }}>
        CRUX.TSC
      </h1>

      {/* Progress bar */}
      <div style={{
        width: '200px',
        height: '2px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '2px',
        overflow: 'hidden',
        marginBottom: '16px',
      }}>
        <div style={{
          width: `${Math.min(progress, 100)}%`,
          height: '100%',
          background: 'linear-gradient(90deg, var(--crux-red), var(--crux-yellow))',
          borderRadius: '2px',
          transition: 'width 0.15s ease',
        }} />
      </div>

      {/* Percentage */}
      <span style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '0.85rem',
        color: 'rgba(255, 255, 255, 0.4)',
        letterSpacing: '3px',
      }}>
        {Math.min(Math.floor(progress), 100)}%
      </span>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.08); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
