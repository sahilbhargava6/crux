"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ProjectItem {
  img: string;
  title: string;
  tag: string;
  desc: string;
  link: string;
}

interface ProjectDemoModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectDemoModal({ project, onClose }: ProjectDemoModalProps) {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (project) {
      setIframeLoaded(false);
      setDeviceMode('desktop');
      // Safety timer: clear loading state automatically after 3 seconds if external analytics delay onLoad
      const timer = setTimeout(() => setIframeLoaded(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [project, refreshKey]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [project, onClose]);

  if (!project) return null;

  const getWidth = () => {
    if (deviceMode === 'mobile') return '375px';
    if (deviceMode === 'tablet') return '768px';
    return '100%';
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.88)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          zIndex: 100000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ scale: 0.92, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.92, y: 30, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          style={{
            width: '100%',
            maxWidth: '1300px',
            height: '90vh',
            background: '#141416',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.6), 0 0 40px rgba(255, 0, 0, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* ─── MAC BROWSER TOP BAR ─── */}
          <div
            style={{
              height: '56px',
              background: 'linear-gradient(180deg, #242428 0%, #1a1a1e 100%)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 20px',
              gap: '16px',
              flexShrink: 0,
            }}
          >
            {/* Window controls */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', minWidth: '80px' }}>
              <button
                onClick={onClose}
                title="Close Demo"
                style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: '#ff5f56',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '9px',
                  color: 'transparent',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#500000')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'transparent')}
              >
                ✕
              </button>
              <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#ffbd2e' }} />
              <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#27c93f' }} />
            </div>

            {/* Address Bar */}
            <div
              style={{
                flex: 1,
                maxWidth: '550px',
                height: '34px',
                background: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                padding: '0 14px',
                gap: '8px',
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-body)',
              }}
            >
              <span style={{ fontSize: '0.9rem' }}>🔒</span>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, color: '#4da6ff' }}>
                {project.link}
              </span>
              {!iframeLoaded ? (
                <span style={{ fontSize: '0.72rem', padding: '2px 8px', background: 'rgba(255, 237, 0, 0.15)', color: '#ffed00', borderRadius: '12px', fontWeight: 600 }}>
                  ⏳ Connecting...
                </span>
              ) : (
                <span style={{ fontSize: '0.72rem', padding: '2px 8px', background: 'rgba(39, 201, 63, 0.2)', color: '#5cf274', borderRadius: '12px', fontWeight: 600 }}>
                  🟢 Live Connected
                </span>
              )}
            </div>

            {/* Device Viewport Toggle & Actions */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div style={{ display: 'flex', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '3px', border: '1px solid rgba(255,255,255,0.08)' }}>
                {[
                  { mode: 'desktop', label: '💻 Desktop', title: 'Desktop View' },
                  { mode: 'tablet', label: '📟 Tablet', title: 'Tablet View (768px)' },
                  { mode: 'mobile', label: '📱 Mobile', title: 'Mobile View (375px)' },
                ].map((item) => (
                  <button
                    key={item.mode}
                    onClick={() => setDeviceMode(item.mode as any)}
                    title={item.title}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      background: deviceMode === item.mode ? 'var(--crux-red)' : 'transparent',
                      color: 'white',
                      border: 'none',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  setIframeLoaded(false);
                  setRefreshKey((k) => k + 1);
                }}
                title="Reload Website"
                style={{
                  padding: '6px 12px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
              >
                ↻ Reload
              </button>

              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                title="Open in new tab"
                style={{
                  padding: '6px 14px',
                  background: 'linear-gradient(135deg, var(--crux-red), var(--crux-magenta))',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                Open Tab ↗
              </a>

              <button
                onClick={onClose}
                style={{
                  padding: '6px 12px',
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
            </div>
          </div>

          {/* ─── IFRAME CONTAINER AREA ─── */}
          <div
            style={{
              flex: 1,
              background: '#0d0d0f',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'auto',
              padding: deviceMode !== 'desktop' ? '24px' : '0',
            }}
          >
            {/* Soft non-blocking background thumbnail while iframe renders */}
            <img
              src={project.img}
              alt={project.title}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: iframeLoaded ? 0 : 0.35,
                filter: 'blur(8px)',
                transition: 'opacity 0.5s ease',
                pointerEvents: 'none',
              }}
            />

            {/* Device frame when mobile/tablet */}
            <div
              style={{
                width: getWidth(),
                height: deviceMode !== 'desktop' ? '100%' : '100%',
                maxHeight: deviceMode === 'mobile' ? '740px' : deviceMode === 'tablet' ? '900px' : '100%',
                background: '#fff',
                borderRadius: deviceMode !== 'desktop' ? '24px' : '0',
                border: deviceMode !== 'desktop' ? '12px solid #28282d' : 'none',
                boxShadow: deviceMode !== 'desktop' ? '0 20px 60px rgba(0,0,0,0.8)' : 'none',
                overflow: 'hidden',
                position: 'relative',
                transition: 'width 0.35s ease, max-height 0.35s ease',
                zIndex: 1,
              }}
            >
              <iframe
                key={`${project.link}-${refreshKey}`}
                src={project.link}
                title={project.title}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                onLoad={() => setIframeLoaded(true)}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  background: 'white',
                }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .demo-spinner {
          width: 48px;
          height: 48px;
          border: 4px solid rgba(255, 255, 255, 0.1);
          border-top-color: var(--crux-red);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </AnimatePresence>
  );
}
