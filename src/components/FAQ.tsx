"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "What is your typical project timeline?",
    answer: "Our timelines start at 3-5 Days for a Landing Page Website and scale up to 1-4 Weeks for a Custom Web Application."
  },
  {
    question: "Do you offer post-launch support?",
    answer: "Yes, we offer comprehensive Website Maintenance Care Plans to keep digital assets secure and up-to-date."
  },
  {
    question: "What is your minimum project budget?",
    answer: "Our minimum project budget is ₹6,000 for a Landing Page Website."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
      {faqs.map((faq, index) => (
        <div 
          key={index}
          style={{
            borderBottom: '1px solid var(--crux-light-gray)',
            marginBottom: '16px'
          }}
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px 0',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              fontFamily: 'var(--font-heading)',
              fontSize: '1.2rem',
              fontWeight: 600,
              color: openIndex === index ? 'var(--crux-red)' : 'var(--crux-black)',
              transition: 'color 0.3s ease'
            }}
          >
            {faq.question}
            <span style={{ 
              fontSize: '1.5rem',
              transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0)',
              transition: 'transform 0.3s ease'
            }}>
              +
            </span>
          </button>
          
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ overflow: 'hidden' }}
              >
                <p style={{ 
                  paddingBottom: '24px', 
                  color: 'var(--crux-gray)',
                  lineHeight: 1.7,
                  fontSize: '1.05rem'
                }}>
                  {faq.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
