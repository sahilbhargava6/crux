import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-gradient-line" />

      <div className="footer-grid">
        <div className="footer-brand">
          <div className="navbar-logo">
            <img src="/logo.png" alt="CRUX.TSC" style={{ width: '48px' }} />
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.4rem', color: 'white' }}>
              CRUX.TSC
            </span>
          </div>
          <p>Crafting bold digital experiences that stand out. From concept to launch, we bring your vision to life.</p>
        </div>

        <div>
          <h4>Services</h4>
          <ul>
            <li>Web & App Development</li>
            <li>UI/UX Design</li>
            <li>Brand Kit</li>
            <li>Graphics & Illustration</li>
            <li>Social Media Management</li>
          </ul>
        </div>

        <div>
          <h4>Get in Touch</h4>
          <ul>
            <li>hello@cruxtsc.com</li>
            <li>+91 98765 43210</li>
            <li>India</li>
          </ul>
          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            <Link href="#" style={{ color: 'var(--crux-gray)', transition: 'color 0.2s' }}>Instagram</Link>
            <Link href="#" style={{ color: 'var(--crux-gray)', transition: 'color 0.2s' }}>LinkedIn</Link>
            <Link href="#" style={{ color: 'var(--crux-gray)', transition: 'color 0.2s' }}>X</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} CRUX.TSC. All rights reserved.
      </div>
    </footer>
  );
}
