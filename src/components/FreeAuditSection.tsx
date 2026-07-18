"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

export default function FreeAuditSection() {
  const [formData, setFormData] = useState({
    websiteUrl: '',
    email: '',
    challenge: 'Low Conversion Rates & Outdated Design',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycby-cZSKk0EIWBFC9h6YZUvFldxvxmpDoSW6xoqbuNbu-SdB_6tHvGlSUAciTObSpPq0/exec";

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formType: "Free 24-Hour Video Audit Request",
          websiteUrl: formData.websiteUrl,
          email: formData.email,
          challenge: formData.challenge,
          timestamp: new Date().toISOString(),
        }),
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Audit request error:", error);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="free-audit" className="free-audit-section">
      <ScrollReveal>
        <div className="audit-card">
          {/* Glowing background accents */}
          <div className="glow-sphere glow-1" />
          <div className="glow-sphere glow-2" />

          <div className="audit-header">
            <span className="audit-pill">🎁 100% Free Lead Magnet • Zero Commitment</span>
            <h2 className="audit-title">Get a Free 5-Minute Video Breakdown of Your Website</h2>
            <p className="audit-subtitle">
              Enter your website URL or app idea below. Our senior architects will record a custom Loom video audit uncovering critical UX bottlenecks, speed issues, and instant conversion opportunities — delivered to your inbox within 24 hours.
            </p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="audit-success"
            >
              <div className="success-icon">🎉</div>
              <h3>Video Audit Claimed Successfully!</h3>
              <p>
                Our engineering team is already analyzing <strong style={{ color: 'var(--crux-yellow)' }}>{formData.websiteUrl}</strong>. Check your inbox within 24 hours for your personalized video breakdown and action roadmap!
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="audit-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="websiteUrl">Website URL or Company Name</label>
                  <input
                    type="text"
                    id="websiteUrl"
                    required
                    placeholder="e.g. https://yourbrand.com or New Project Idea"
                    value={formData.websiteUrl}
                    onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Work Email Address</label>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="challenge">What is your #1 Growth or Technical Challenge right now?</label>
                <select
                  id="challenge"
                  value={formData.challenge}
                  onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                >
                  <option value="Low Conversion Rates & Outdated Design">Low Conversion Rates & Outdated Design</option>
                  <option value="Slow Page Load Speeds & Poor Mobile UX">Slow Page Load Speeds & Poor Mobile UX</option>
                  <option value="Need to Build a Custom Web or Mobile App from Scratch">Need to Build a Custom Web or Mobile App from Scratch</option>
                  <option value="Brand Identity & UI/UX Overhaul Needed">Brand Identity & UI/UX Overhaul Needed</option>
                </select>
              </div>

              <div className="audit-footer">
                <button type="submit" disabled={isSubmitting} className="submit-audit-btn">
                  {isSubmitting ? 'Generating Request...' : '🚀 Claim My Free Video Audit (3 Slots Left Today) →'}
                </button>
                <span className="security-note">🔒 No credit card required. 100% confidential analysis.</span>
              </div>
            </form>
          )}
        </div>
      </ScrollReveal>

      <style jsx>{`
        .free-audit-section {
          padding: 80px 5vw;
          position: relative;
          z-index: 2;
        }

        .audit-card {
          position: relative;
          background: linear-gradient(135deg, rgba(20, 18, 26, 0.95) 0%, rgba(30, 20, 36, 0.95) 100%);
          border: 1px solid rgba(255, 0, 0, 0.35);
          border-radius: 28px;
          padding: 60px 48px;
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.5), 0 0 40px rgba(255, 0, 0, 0.12);
          overflow: hidden;
          max-width: 1100px;
          margin: 0 auto;
        }

        .glow-sphere {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }

        .glow-1 {
          top: -60px;
          left: -60px;
          width: 300px;
          height: 300px;
          background: rgba(255, 0, 0, 0.2);
        }

        .glow-2 {
          bottom: -80px;
          right: -80px;
          width: 350px;
          height: 350px;
          background: rgba(255, 237, 0, 0.15);
        }

        .audit-header {
          position: relative;
          z-index: 1;
          text-align: center;
          margin-bottom: 40px;
        }

        .audit-pill {
          display: inline-block;
          padding: 6px 16px;
          background: rgba(255, 237, 0, 0.15);
          border: 1px solid rgba(255, 237, 0, 0.4);
          color: var(--crux-yellow);
          border-radius: 30px;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 18px;
        }

        .audit-title {
          font-size: 2.5rem;
          font-family: var(--font-heading);
          font-weight: 800;
          color: #fff;
          margin-bottom: 16px;
          line-height: 1.2;
        }

        .audit-subtitle {
          font-size: 1.05rem;
          color: rgba(255, 255, 255, 0.75);
          max-width: 780px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .audit-form {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 22px;
        }

        @media (max-width: 768px) {
          .audit-card {
            padding: 40px 24px;
          }
          .audit-title {
            font-size: 1.85rem;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
          text-align: left;
        }

        .form-group label {
          font-size: 0.88rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          font-family: var(--font-heading);
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 14px 18px;
          border-radius: 14px;
          background: rgba(0, 0, 0, 0.45);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: white;
          font-size: 0.95rem;
          font-family: var(--font-body);
          transition: border-color 0.3s, box-shadow 0.3s;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: var(--crux-red);
          box-shadow: 0 0 16px rgba(255, 0, 0, 0.3);
        }

        .form-group input::placeholder {
          color: rgba(255, 255, 255, 0.35);
        }

        .audit-footer {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          margin-top: 10px;
        }

        .submit-audit-btn {
          width: 100%;
          max-width: 500px;
          padding: 16px 28px;
          background: linear-gradient(135deg, var(--crux-red) 0%, var(--crux-magenta) 100%);
          border: none;
          border-radius: 50px;
          color: white;
          font-size: 1.05rem;
          font-weight: 700;
          font-family: var(--font-heading);
          cursor: pointer;
          transition: transform 0.25s, box-shadow 0.25s;
          box-shadow: 0 10px 30px rgba(255, 0, 0, 0.4);
        }

        .submit-audit-btn:hover:not(:disabled) {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 16px 45px rgba(255, 0, 0, 0.6);
        }

        .submit-audit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .security-note {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .audit-success {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 30px 20px;
          background: rgba(255, 255, 255, 0.04);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .success-icon {
          font-size: 3.5rem;
          margin-bottom: 16px;
        }

        .audit-success h3 {
          font-size: 1.8rem;
          color: #fff;
          margin-bottom: 12px;
          font-family: var(--font-heading);
        }

        .audit-success p {
          color: rgba(255, 255, 255, 0.8);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
          font-size: 1rem;
        }
      `}</style>
    </section>
  );
}
