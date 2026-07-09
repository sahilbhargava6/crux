"use client";

export default function Marquee() {
  const items = [
    'WEB DEVELOPMENT',
    '★',
    'UI/UX DESIGN',
    '★',
    'BRAND KIT',
    '★',
    'GRAPHICS',
    '★',
    'SOCIAL MEDIA',
    '★',
    'MOBILE APPS',
    '★',
    'DIGITAL STRATEGY',
    '★',
  ];

  const content = items.join('   ');

  return (
    <div style={{
      overflow: 'hidden',
      padding: '24px 0',
      borderTop: '1px solid var(--crux-light-gray)',
      borderBottom: '1px solid var(--crux-light-gray)',
      whiteSpace: 'nowrap',
    }}>
      <div style={{
        display: 'inline-flex',
        animation: 'marquee 25s linear infinite',
      }}>
        {[0, 1, 2].map((i) => (
          <span key={i} style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.5rem',
            fontWeight: 700,
            letterSpacing: '4px',
            color: 'var(--crux-black)',
            opacity: 0.9,
            paddingRight: '60px',
          }}>
            {content}
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </div>
  );
}
