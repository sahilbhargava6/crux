"use client";

import { useState, useEffect } from 'react';
import { ProjectItem } from './ProjectDemoModal';

interface ProjectCardProps {
  project: ProjectItem;
  onOpenModal: (project: ProjectItem) => void;
}

export default function ProjectCard({ project, onOpenModal }: ProjectCardProps) {
  const [isInteractive, setIsInteractive] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  // Default to 'image' so all 8 cards load instantly (0ms) without initiating 8 heavy remote browser sessions
  const [viewMode, setViewMode] = useState<'iframe' | 'image'>('image');

  const hostname = project.link.replace(/^https?:\/\//, '').replace(/\/$/, '');

  // Safety timer: automatically clear loading badge after 3 seconds even if remote analytics delay onLoad
  useEffect(() => {
    if (viewMode === 'iframe') {
      setIframeLoaded(false);
      const timer = setTimeout(() => setIframeLoaded(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [viewMode]);

  const renderMetricsAndImpact = () => (
    <div className="metrics-impact-box">
      {project.metrics && project.metrics.length > 0 && (
        <div className="metrics-grid">
          {project.metrics.map((m, idx) => (
            <div key={idx} className="metric-badge">
              <span className="metric-val">{m.value}</span>
              <span className="metric-lbl">{m.label}</span>
            </div>
          ))}
        </div>
      )}
      {project.impact && (
        <div className="impact-line">
          <span className="impact-icon">⚡</span>
          <span className="impact-text">{project.impact}</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="browser-card">
      {/* ─── MAC BROWSER WINDOW HEADER ─── */}
      <div className="browser-header">
        <div className="window-dots">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>

        <div className="browser-url-bar">
          <span className="url-lock">🔒</span>
          <span className="url-text">{hostname}</span>
          {viewMode === 'iframe' && !iframeLoaded && (
            <span className="mini-status">⏳ Loading...</span>
          )}
        </div>

        <div className="browser-actions">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setViewMode(viewMode === 'iframe' ? 'image' : 'iframe');
            }}
            className={`action-btn ${viewMode === 'iframe' ? 'active-mode' : ''}`}
            title={viewMode === 'iframe' ? "Switch to Thumbnail View" : "Switch to Live Iframe Demo"}
          >
            {viewMode === 'iframe' ? '🟢 Live Iframe' : '🌐 Load Live Demo'}
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal(project);
            }}
            className="action-btn highlight-btn"
            title="Open Fullscreen Interactive Demo"
          >
            ⛶ Fullscreen
          </button>
        </div>
      </div>

      {/* ─── WINDOW BODY (IFRAME OR IMAGE) ─── */}
      <div 
        className={`browser-body ${isInteractive ? 'interactive-active' : ''}`}
        onClick={() => {
          if (viewMode === 'iframe' && !isInteractive) {
            setIsInteractive(true);
          }
        }}
      >
        {viewMode === 'iframe' ? (
          <>
            {/* Background thumbnail visible immediately while iframe renders */}
            <img src={project.img} alt={project.title} className="bg-blur-thumb" />

            <iframe
              src={project.link}
              title={project.title}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              onLoad={() => setIframeLoaded(true)}
              className="live-iframe"
              style={{ pointerEvents: isInteractive ? 'auto' : 'none' }}
            />

            {/* Non-interactive overlay: protects page scrolling until clicked */}
            {!isInteractive && (
              <div className="card-hover-overlay">
                <div className="overlay-content">
                  <span className="project-tag">{project.tag}</span>
                  <h3>{project.title}</h3>
                  <p>{project.desc}</p>

                  {renderMetricsAndImpact()}

                  <div className="overlay-buttons">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsInteractive(true);
                      }}
                      className="btn-interact"
                    >
                      ⚡ Click to Interact Live
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenModal(project);
                      }}
                      className="btn-fullscreen"
                    >
                      ⛶ Test Viewports
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Active interactive badge indicator */}
            {isInteractive && (
              <div className="interactive-badge" onClick={(e) => e.stopPropagation()}>
                <span>🟢 Live Interactive Mode Active</span>
                <button
                  type="button"
                  onClick={() => setIsInteractive(false)}
                  className="exit-interact-btn"
                >
                  Exit Interaction ✕
                </button>
              </div>
            )}
          </>
        ) : (
          /* Thumbnail view mode (Instant 0ms load) */
          <div className="thumbnail-view" onClick={() => onOpenModal(project)}>
            <img src={project.img} alt={project.title} className="thumb-img" />
            <div className="card-hover-overlay always-visible">
              <div className="overlay-content">
                <span className="project-tag">{project.tag}</span>
                <h3>{project.title}</h3>
                <p>{project.desc}</p>

                {renderMetricsAndImpact()}

                <div className="overlay-buttons">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setViewMode('iframe');
                    }}
                    className="btn-interact"
                  >
                    🌐 Switch to Live Iframe
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenModal(project);
                    }}
                    className="btn-fullscreen"
                  >
                    ⛶ Fullscreen Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .browser-card {
          border-radius: 20px;
          overflow: hidden;
          background: #121215;
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.15);
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.4s ease, border-color 0.4s ease;
          display: flex;
          flex-direction: column;
        }

        .browser-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.25), 0 0 25px rgba(255, 0, 0, 0.15);
          border-color: var(--crux-red);
        }

        .browser-header {
          height: 44px;
          background: linear-gradient(180deg, #28282d 0%, #1c1c20 100%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          gap: 12px;
        }

        .window-dots {
          display: flex;
          gap: 6px;
          align-items: center;
        }

        .dot {
          width: 11px;
          height: 11px;
          border-radius: 50%;
        }
        .dot-red { background: #ff5f56; }
        .dot-yellow { background: #ffbd2e; }
        .dot-green { background: #27c93f; }

        .browser-url-bar {
          flex: 1;
          max-width: 280px;
          height: 26px;
          background: rgba(0, 0, 0, 0.35);
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          align-items: center;
          padding: 0 10px;
          gap: 6px;
          font-size: 0.78rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .url-lock { font-size: 0.8rem; }
        .url-text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          flex: 1;
          color: #4da6ff;
        }

        .mini-status {
          font-size: 0.7rem;
          padding: 2px 6px;
          background: rgba(255, 237, 0, 0.15);
          color: #ffed00;
          border-radius: 10px;
          white-space: nowrap;
        }

        .browser-actions {
          display: flex;
          gap: 6px;
        }

        .action-btn {
          padding: 4px 10px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.72rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          color: white;
        }

        .active-mode {
          background: rgba(39, 201, 63, 0.18);
          border-color: rgba(39, 201, 63, 0.4);
          color: #5cf274;
        }

        .highlight-btn {
          background: rgba(255, 0, 0, 0.18);
          border-color: rgba(255, 0, 0, 0.4);
          color: #ff8080;
        }

        .highlight-btn:hover {
          background: var(--crux-red);
          color: white;
        }

        .browser-body {
          position: relative;
          aspect-ratio: 16 / 10.5;
          background: #ffffff;
          overflow: hidden;
          cursor: pointer;
        }

        .interactive-active {
          cursor: auto;
          box-shadow: inset 0 0 0 3px var(--crux-red);
        }

        .live-iframe {
          width: 100%;
          height: 100%;
          border: none;
          background: white;
          position: relative;
          z-index: 1;
        }

        .bg-blur-thumb {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.35;
          filter: blur(6px);
          z-index: 0;
        }

        .card-hover-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(0deg, rgba(12, 10, 18, 0.96) 0%, rgba(12, 10, 18, 0.65) 55%, rgba(12, 10, 18, 0.15) 100%);
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 24px 28px;
          opacity: 0;
          transition: opacity 0.35s ease;
          z-index: 3;
        }

        .browser-card:hover .card-hover-overlay {
          opacity: 1;
        }

        .always-visible {
          opacity: 0;
        }
        .thumbnail-view:hover .always-visible {
          opacity: 1;
        }

        .overlay-content {
          transform: translateY(16px);
          transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .browser-card:hover .overlay-content {
          transform: translateY(0);
        }

        .project-tag {
          display: inline-block;
          padding: 3px 10px;
          border-radius: 20px;
          background: var(--crux-red);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        .overlay-content h3 {
          font-size: 1.35rem;
          margin-bottom: 4px;
        }

        .overlay-content p {
          font-size: 0.84rem;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 12px;
          line-height: 1.45;
        }

        .metrics-impact-box {
          margin-bottom: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .metrics-grid {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .metric-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 237, 0, 0.35);
          padding: 4px 10px;
          border-radius: 30px;
          backdrop-filter: blur(4px);
        }

        .metric-val {
          color: var(--crux-yellow);
          font-weight: 700;
          font-size: 0.82rem;
          font-family: var(--font-heading);
        }

        .metric-lbl {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.74rem;
        }

        .impact-line {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          color: #ffd6e7;
          background: rgba(127, 28, 95, 0.35);
          border: 1px solid rgba(127, 28, 95, 0.6);
          padding: 4px 12px;
          border-radius: 8px;
          line-height: 1.35;
        }

        .impact-icon {
          font-size: 0.9rem;
        }

        .overlay-buttons {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .btn-interact {
          padding: 8px 16px;
          background: linear-gradient(135deg, var(--crux-red), var(--crux-magenta));
          border: none;
          border-radius: 30px;
          color: white;
          font-family: var(--font-heading);
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .btn-interact:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(255, 0, 0, 0.4);
        }

        .btn-fullscreen {
          padding: 8px 14px;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 30px;
          color: white;
          font-family: var(--font-heading);
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          backdrop-filter: blur(6px);
          transition: background 0.2s;
        }

        .btn-fullscreen:hover {
          background: rgba(255, 255, 255, 0.25);
        }

        .interactive-badge {
          position: absolute;
          bottom: 14px;
          right: 14px;
          background: rgba(15, 15, 20, 0.92);
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          padding: 6px 14px;
          border-radius: 30px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.8rem;
          color: #fff;
          z-index: 10;
          box-shadow: 0 10px 25px rgba(0,0,0,0.5);
        }

        .exit-interact-btn {
          padding: 4px 10px;
          background: var(--crux-red);
          color: white;
          border: none;
          border-radius: 20px;
          font-size: 0.72rem;
          font-weight: 600;
          cursor: pointer;
        }

        .thumbnail-view {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .browser-card:hover .thumb-img {
          transform: scale(1.06);
        }
      `}</style>
    </div>
  );
}
