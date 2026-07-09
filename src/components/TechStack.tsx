"use client";

import ScrollReveal from './ScrollReveal';

const stack = [
  {
    category: "Design & Experience (UI/UX)",
    tools: ["Figma", "Adobe XD", "Sketch", "InVision", "Proto.io"],
    color: "var(--crux-red)"
  },
  {
    category: "Branding & Visual Assets",
    tools: ["Adobe Illustrator", "Photoshop", "After Effects", "Canva", "CorelDRAW"],
    color: "var(--crux-yellow)"
  },
  {
    category: "Frontend Development",
    tools: ["HTML5", "CSS3", "JavaScript", "Next.js"],
    color: "var(--crux-magenta)"
  },
  {
    category: "Backend & Systems",
    tools: ["Node.js", "NestJS", "Laravel", "C++"],
    color: "var(--crux-purple)"
  },
  {
    category: "Mobile Engineering",
    tools: ["React Native", "Flutter"],
    color: "var(--crux-black)"
  },
  {
    category: "Database & Architecture",
    tools: ["PostgreSQL", "MySQL", "Oracle Database"],
    color: "var(--crux-gray)"
  }
];

export default function TechStack() {
  return (
    <>
      <div className="tech-grid">
        {stack.map((item, index) => (
          <ScrollReveal key={index} delay={index * 0.1}>
            <div className="glass-card" style={{ padding: '30px', height: '100%' }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: item.color,
                marginBottom: '16px'
              }} />
              <h3 style={{ 
                fontFamily: 'var(--font-heading)', 
                fontSize: '1.1rem', 
                marginBottom: '16px',
                color: 'var(--crux-black)'
              }}>
                {item.category}
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {item.tools.map((tool, i) => (
                  <span key={i} style={{
                    padding: '6px 14px',
                    background: 'rgba(0,0,0,0.04)',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    color: 'var(--crux-gray)',
                    fontWeight: 500
                  }}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
      <style jsx>{`
        .tech-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          margin-top: 50px;
        }
        @media (max-width: 900px) {
          .tech-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .tech-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
