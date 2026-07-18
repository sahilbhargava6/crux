"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import ScrollReveal from '@/components/ScrollReveal';
import Marquee from '@/components/Marquee';
import AnimatedCounter from '@/components/AnimatedCounter';
import Loader from '@/components/Loader';
import CustomCursor from '@/components/CustomCursor';
import TechStack from '@/components/TechStack';
import FAQ from '@/components/FAQ';
import ContactForm from '@/components/ContactForm';
import ProjectCard from '@/components/ProjectCard';
import ProjectDemoModal, { ProjectItem } from '@/components/ProjectDemoModal';
import FreeAuditSection from '@/components/FreeAuditSection';

const Scene = dynamic(() => import('@/components/three/Scene'), { ssr: false });

const projects: ProjectItem[] = [
  {
    img: '/project1.png',
    title: 'MND Designs',
    tag: 'Creative Portfolio',
    desc: 'Modern web experience for a design studio.',
    link: 'https://mnddesigns.in/',
    impact: 'Re-engineered digital showcase leading to a 2.4x surge in high-ticket client bookings.',
    metrics: [
      { value: '+140%', label: 'Inquiry Rate' },
      { value: '0.8s', label: 'Page Load' },
      { value: '100/100', label: 'Lighthouse' }
    ]
  },
  {
    img: '/miraiglobalpolymers.png',
    title: 'Mirai Global Polymers',
    tag: 'Corporate Web',
    desc: 'B2B industrial website with a professional edge.',
    link: 'https://miraiglobalpolymers.com/',
    impact: 'Transformed B2B industrial catalog into a 24/7 global lead generation funnel.',
    metrics: [
      { value: '+185%', label: 'B2B Leads' },
      { value: '99.9%', label: 'Uptime SLA' },
      { value: '3 Weeks', label: 'Delivery' }
    ]
  },
  {
    img: '/theaugrandair.png',
    title: 'The Augrand Air',
    tag: 'E-Commerce',
    desc: 'Premium online shopping experience.',
    link: 'https://www.theaugrandair.in/',
    impact: 'High-converting luxury checkout experience with sub-second page transitions.',
    metrics: [
      { value: '+65%', label: 'Checkout Conv.' },
      { value: '-42%', label: 'Abandonment' },
      { value: '4x', label: 'Speed Boost' }
    ]
  },
  {
    img: '/klothix.png',
    title: 'Klothix',
    tag: 'E-Commerce',
    desc: 'Fashion and apparel digital storefront.',
    link: 'https://klothix.com/',
    impact: 'Fashion storefront optimized for rapid mobile browsing and instant checkout.',
    metrics: [
      { value: '+210%', label: 'Mobile Sales' },
      { value: '98/100', label: 'Web Vitals' },
      { value: '+45%', label: 'Avg Order Value' }
    ]
  },
  {
    img: '/travelsamurais.png',
    title: 'Travel Samurais',
    tag: 'Travel & Tourism',
    desc: 'Booking and discovery platform for travelers.',
    link: 'https://www.travelsamurais.com/',
    impact: 'Interactive booking engine that turned casual explorers into confirmed travelers.',
    metrics: [
      { value: '3x', label: 'Booking Vol.' },
      { value: '-60%', label: 'Bounce Rate' },
      { value: '1.2s', label: 'Search Speed' }
    ]
  },
  {
    img: '/thecareergadget.png',
    title: 'The Career Gadget',
    tag: 'EdTech / Consulting',
    desc: 'Career guidance and consulting portal.',
    link: 'https://thecareergadget.com/',
    impact: 'Streamlined scheduling and portal experience driving record student consultation sign-ups.',
    metrics: [
      { value: '+320%', label: 'Consultations' },
      { value: '100%', label: 'Automated CRM' },
      { value: '5 Stars', label: 'User Rating' }
    ]
  },
  {
    img: '/healingourth.png',
    title: 'Healing Ourth',
    tag: 'Health & Wellness',
    desc: 'Holistic healing and wellness platform.',
    link: 'https://www.healingourth.com/',
    impact: 'Calming, accessible wellness ecosystem optimized for organic SEO growth and patient engagement.',
    metrics: [
      { value: '+120%', label: 'Retention' },
      { value: '0.9s', label: 'Load Speed' },
      { value: '+85%', label: 'Organic Traffic' }
    ]
  },
  {
    img: '/consideritdone.png',
    title: 'Consider It Done',
    tag: 'Corporate Services',
    desc: 'Professional services digital presence.',
    link: 'https://www.consider-itdone.com/',
    impact: 'Executive-grade corporate web presence that builds instant credibility for enterprise contracts.',
    metrics: [
      { value: '+150%', label: 'Contracts' },
      { value: '100/100', label: 'Security & SEO' },
      { value: '14 Days', label: 'Turnaround' }
    ]
  },
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
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <>
      <ProjectDemoModal project={selectedProject} onClose={() => setSelectedProject(null)} />
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
              <p className="hero-desc">
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

        {/* ═══════════ TECH STACK ═══════════ */}
        <section id="tech-stack" className="services" style={{ background: 'var(--crux-white)' }}>
          <ScrollReveal>
            <p className="section-label">Tech Stack</p>
            <h2 className="section-title">From Pixels to<br />Production</h2>
            <p className="section-subtitle">
              We bridge the gap between stunning visual design and high-performance engineering using industry-standard tools.
            </p>
          </ScrollReveal>
          <TechStack />
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
                <ProjectCard
                  project={project}
                  onOpenModal={(proj) => setSelectedProject(proj)}
                />
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ═══════════ FREE UX / PERFORMANCE AUDIT MAGNET ═══════════ */}
        <FreeAuditSection />

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

        {/* ═══════════ FAQ ═══════════ */}
        <section id="faq" className="about" style={{ background: 'var(--crux-white)' }}>
          <ScrollReveal>
            <p className="section-label" style={{ justifyContent: 'center' }}>Transparency First</p>
            <h2 className="section-title" style={{ textAlign: 'center' }}>Frequently Asked Questions</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div style={{ marginTop: '50px' }}>
              <FAQ />
            </div>
          </ScrollReveal>
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
            <p style={{ marginBottom: '60px' }}>
              Have a project in mind? We&apos;d love to hear about it. Tell us what you need and our team will get back to you with a custom proposal.
            </p>
          </ScrollReveal>
          
          <ContactForm />
        </section>

      </div>
    </>
  );
}
