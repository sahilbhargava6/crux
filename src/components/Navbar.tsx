"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Link href="/" className="navbar-logo">
        <img src="/logo.png" alt="CRUX.TSC" />
        <span>CRUX.TSC</span>
      </Link>

      <div className="navbar-links">
        <Link href="#services">Services</Link>
        <Link href="#work">Work</Link>
        <Link href="#about">About</Link>
        <Link href="#process">Process</Link>
        <Link href="#contact">Contact</Link>
        <button className="btn-primary">Let&apos;s Talk</button>
      </div>
    </nav>
  );
}
