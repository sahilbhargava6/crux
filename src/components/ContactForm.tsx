"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectTypes: [] as string[],
    budget: '',
    details: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

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
        body: JSON.stringify(formData)
      });
      // no-cors means we won't get a readable response, so we just assume success if it didn't throw network error
      setSubmitted(true);
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitted(true); // fallback so the user isn't stuck
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="glass-card" 
        style={{ padding: '60px 40px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🚀</div>
        <h3 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>Project Request Received!</h3>
        <p style={{ color: 'var(--crux-gray)', lineHeight: 1.7 }}>
          Thank you for reaching out to CRUX.TSC. We&apos;ve received your details and our team will get back to you within 24-48 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto', padding: '40px', textAlign: 'left', position: 'relative', zIndex: 10 }}>
      {/* Progress Bar */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '40px' }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{ 
            height: '4px', 
            flex: 1, 
            background: step >= i ? 'var(--crux-red)' : 'var(--crux-light-gray)',
            borderRadius: '2px',
            transition: 'background 0.3s ease'
          }} />
        ))}
      </div>

      <form onSubmit={step === 4 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Let&apos;s start with the basics</h3>
              <p style={{ color: 'var(--crux-gray)', marginBottom: '30px' }}>What should we call you and how can we reach you?</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <input 
                  required
                  type="text" 
                  placeholder="Your Full Name" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="form-input"
                />
                <input 
                  required
                  type="email" 
                  placeholder="Your Email Address" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="form-input"
                />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>What do you need help with?</h3>
              <p style={{ color: 'var(--crux-gray)', marginBottom: '30px' }}>Select all that apply.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {['Landing Page', 'Custom Web App', 'Mobile App', 'UI/UX Design', 'Brand Kit', 'Social Media'].map(type => {
                  const isSelected = formData.projectTypes.includes(type);
                  return (
                    <div 
                      key={type}
                      onClick={() => {
                        const newTypes = isSelected 
                          ? formData.projectTypes.filter(t => t !== type)
                          : [...formData.projectTypes, type];
                        setFormData({...formData, projectTypes: newTypes});
                      }}
                      style={{
                        padding: '16px',
                        border: `2px solid ${isSelected ? 'var(--crux-red)' : 'var(--crux-light-gray)'}`,
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontWeight: 600,
                        textAlign: 'center',
                        transition: 'all 0.2s ease',
                        background: isSelected ? 'rgba(255,0,0,0.05)' : 'transparent'
                      }}
                    >
                      {type}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>What is your estimated budget?</h3>
              <p style={{ color: 'var(--crux-gray)', marginBottom: '30px' }}>This helps us recommend the right package for you.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Under ₹10,000', '₹10,000 - ₹50,000', '₹50,000 - ₹1,00,000', '₹1,00,000+'].map(budget => (
                  <div 
                    key={budget}
                    onClick={() => setFormData({...formData, budget})}
                    style={{
                      padding: '16px 20px',
                      border: `2px solid ${formData.budget === budget ? 'var(--crux-red)' : 'var(--crux-light-gray)'}`,
                      borderRadius: '12px',
                      cursor: 'pointer',
                      fontWeight: 600,
                      transition: 'all 0.2s ease',
                      background: formData.budget === budget ? 'rgba(255,0,0,0.05)' : 'transparent'
                    }}
                  >
                    {budget}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Tell us a bit more</h3>
              <p style={{ color: 'var(--crux-gray)', marginBottom: '30px' }}>Any specific details or links you want to share?</p>
              
              <textarea 
                rows={5}
                placeholder="Project details, goals, timelines, links to inspiration..." 
                value={formData.details}
                onChange={e => setFormData({...formData, details: e.target.value})}
                className="form-input"
                style={{ resize: 'none' }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
          {step > 1 ? (
            <button type="button" onClick={prevStep} className="btn-outline" style={{ padding: '12px 24px' }}>Back</button>
          ) : <div />}
          
          <button 
            type="submit" 
            className="btn-primary" 
            style={{ padding: '12px 32px' }}
            disabled={
              isSubmitting ||
              (step === 1 && (!formData.name || !formData.email)) ||
              (step === 2 && formData.projectTypes.length === 0) ||
              (step === 3 && !formData.budget)
            }
          >
            {isSubmitting ? 'Submitting...' : step === 4 ? 'Submit Request' : 'Next Step →'}
          </button>
        </div>
      </form>
      
      <style jsx global>{`
        .form-input {
          width: 100%;
          padding: 16px 20px;
          border: 2px solid var(--crux-light-gray);
          borderRadius: 12px;
          font-size: 1rem;
          font-family: var(--font-body);
          outline: none;
          transition: border-color 0.3s;
          background: transparent;
        }
        .form-input:focus {
          border-color: var(--crux-red);
        }
      `}</style>
    </div>
  );
}
