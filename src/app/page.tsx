"use client";

import dynamic from 'next/dynamic';
import ScrollReveal from '@/components/ScrollReveal';
import Marquee from '@/components/Marquee';
import AnimatedCounter from '@/components/AnimatedCounter';
import Loader from '@/components/Loader';
import CustomCursor from '@/components/CustomCursor';

const Scene = dynamic(() => import('@/components/three/Scene'), { ssr: false });

const projects = [
  { img: '/project1.png', title: 'LuxeCart E-Commerce', tag: 'Web Development', desc: 'Full-stack e-commerce platform with modern UI' },
  { img: '/project2.png', title: 'FitTrack Pro', tag: 'Mobile App', desc: 'Cross-platform fitness tracking application' },
  { img: '/project3.png', title: 'Novara Brand Identity', tag: 'Branding', desc: 'Complete brand identity system & guidelines' },
  { img: '/project4.png', title: 'Bloom Social Campaign', tag: 'Social Media', desc: 'Multi-platform social media strategy & content' },
];

const services = [
  { icon: '⟨/⟩', bg: 'linear-gradient(135deg, #ff0000, #7f1c5f)', title: 'Web & App Development', desc: 'Scalable, performant web & mobile applications built with cutting-edge technology.' },
  { icon: '◎', bg: 'linear-gradient(135deg, #7f1c5f, #421553)', title: 'UI/UX Design', desc: 'User-centered interfaces that drive engagement and convert visitors into customers.' },
  { icon: '✦', bg: 'linear-gradient(135deg, #ffed00, #ff0000)', title: 'Brand Kit', desc: 'Complete brand identity — logos, typography, color systems, and brand guidelines.' },
  { icon: '▲', bg: 'linear-gradient(135deg, #421553, #000000)', title: 'Graphics & Illustration', desc: 'Eye-catching visual assets and custom illustrations that tell your brand story.' },
  { icon: '◈', bg: 'linear-gradient(135deg, #ff0000, #ffed00)', title: 'Social Media', desc: 'Strategic content planning, creation, and growth across all major platforms.' },
  { icon: '↗', bg: 'linear-gradient(135deg, #7f1c5f, #ff0000)', title: 'Digital Strategy', desc: 'Data-driven strategies aligned with your business goals to accelerate growth.' },
];

const testimonials = [
  { quote: 'CRUX.TSC completely transformed our digital presence. The website they built not only looks incredible but also drove a 40% increase in conversions.', name: 'Arjun Mehta', role: 'CEO, TechVault', initials: 'AM' },
  { quote: 'Working with the CRUX team felt like having an in-house design department. Their attention to detail on our brand kit was extraordinary.', name: 'Priya Sharma', role: 'Founder, Bloom Beauty', initials: 'PS' },
  { quote: 'From concept to launch in 6 weeks — their process is incredibly efficient. The mobile app exceeded every expectation we had.', name: 'Ravi Kapoor', role: 'CTO, FitTrack', initials: 'RK' },
];

export default function Home() {
  return (
    <>
      <Loader />
      <CustomCursor />
      <Scene />

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ═══════════ HERO ═══════════ */}
        <section className="hero">
          <div className="hero-content">
            <ScrollReveal>
              <p className="section-label">Creative Digital Agency</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1>
                We Craft Digital<br />
                Experiences That<br />
                <span className="gradient-text">Stand Out</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p>
                A premium creative studio specializing in Web & App Development,
                UI/UX Design, Branding, Graphics, and Social Media Growth.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="hero-buttons">
                <a href="#work" className="btn-primary">Explore Our Work →</a>
                <a href="#contact" className="btn-outline">Get in Touch</a>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══════════ MARQUEE ═══════════ */}
        <Marquee />

        {/* ═══════════ SERVICES ═══════════ */}
        <section id="services" className="services">
          <ScrollReveal>
            <p className="section-label">What We Do</p>
            <h2 className="section-title">Services Built for<br />Modern Brands</h2>
            <p className="section-subtitle">
              End-to-end digital solutions to help your brand thrive in the modern landscape.
            </p>
          </ScrollReveal>

          <div className="services-grid">
            {services.map((service, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="glass-card service-card">
                  <div className="service-icon" style={{ background: service.bg, color: 'white', fontSize: '1.3rem', fontWeight: 700 }}>
                    {service.icon}
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ═══════════ PORTFOLIO ═══════════ */}
        <section id="work" className="portfolio">
          <ScrollReveal>
            <p className="section-label">Selected Work</p>
            <h2 className="section-title">Projects That Speak<br />for Themselves</h2>
            <p className="section-subtitle">
              A curated selection of our recent work across web, mobile, branding, and social media.
            </p>
          </ScrollReveal>

          <div className="portfolio-grid">
            {projects.map((project, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="project-card">
                  <img src={project.img} alt={project.title} />
                  <div className="project-overlay">
                    <span className="project-tag">{project.tag}</span>
                    <h3>{project.title}</h3>
                    <p>{project.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ═══════════ ABOUT ═══════════ */}
        <section id="about" className="about">
          <ScrollReveal direction="left" className="about-content">
            <p className="section-label">Who We Are</p>
            <h2 className="section-title">Why CRUX.TSC?</h2>
            <p className="section-subtitle" style={{ marginBottom: '20px' }}>
              At CRUX.TSC, we believe great brands are built at the intersection
              of bold design and robust engineering.
            </p>
            <p className="section-subtitle">
              Our multidisciplinary team combines creative vision with technical
              expertise to deliver digital experiences that don&apos;t just look
              stunning — they perform. From startups to established brands, we help
              businesses stand out in the digital landscape.
            </p>
          </ScrollReveal>

          <div className="about-stats">
            <AnimatedCounter end={50} suffix="+" color="var(--crux-red)" label="Projects Delivered" />
            <AnimatedCounter end={30} suffix="+" color="var(--crux-magenta)" label="Happy Clients" />
            <AnimatedCounter end={3} suffix="+" color="var(--crux-purple)" label="Years Experience" />
            <AnimatedCounter end={10} suffix="+" color="var(--crux-black)" label="Team Members" />
          </div>
        </section>

        {/* ═══════════ MARQUEE 2 ═══════════ */}
        <Marquee />

        {/* ═══════════ TESTIMONIALS ═══════════ */}
        <section className="testimonials">
          <ScrollReveal>
            <p className="section-label">Client Love</p>
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="section-subtitle">
              Don&apos;t just take our word for it — hear from the brands we&apos;ve helped grow.
            </p>
          </ScrollReveal>

          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <ScrollReveal key={i} delay={i * 0.12}>
                <div className="testimonial-card">
                  <p className="quote">{t.quote}</p>
                  <div className="client-info">
                    <div className="client-avatar">{t.initials}</div>
                    <div>
                      <div className="client-name">{t.name}</div>
                      <div className="client-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ═══════════ PROCESS ═══════════ */}
        <section id="process" className="process">
          <ScrollReveal>
            <p className="section-label">Our Process</p>
            <h2 className="section-title">How We Work</h2>
            <p className="section-subtitle">
              A proven 4-step process that turns ideas into impactful digital products.
            </p>
          </ScrollReveal>

          <div className="process-steps">
            {[
              { num: '01', title: 'Discovery', desc: 'Deep dive into your business, audience, and goals to understand the challenge.' },
              { num: '02', title: 'Strategy', desc: 'A tailored roadmap with clear milestones, tech choices, and design direction.' },
              { num: '03', title: 'Create', desc: 'Pixel-perfect design and clean code brought to life by our expert team.' },
              { num: '04', title: 'Launch & Grow', desc: 'Deploy, optimize, and provide ongoing support for lasting success.' },
            ].map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="process-step">
                  <div className="step-number">{step.num}</div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ═══════════ CTA / CONTACT ═══════════ */}
        <section id="contact" className="cta-section">
          <ScrollReveal>
            <p className="section-label" style={{ justifyContent: 'center' }}>Ready to Start?</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2>Let&apos;s Create Something<br /><span className="gradient-text">Extraordinary</span></h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p>
              Have a project in mind? We&apos;d love to hear about it. Let&apos;s discuss
              how CRUX.TSC can bring your vision to life.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <a href="mailto:hello@cruxtsc.com" className="btn-primary" style={{ fontSize: '1.1rem', padding: '18px 44px' }}>
              Start a Project →
            </a>
          </ScrollReveal>
        </section>

      </div>
    </>
  );
}
