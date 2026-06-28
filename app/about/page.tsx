"use client";

import { useEffect, useRef, useState } from "react";

// Public folder se images link ki hain
const factoryImgSrc = "/images/factory.jpeg";
const installationImgSrc = "/images/installation.jpeg";

const stats = [
  { label: "Cars Protected", value: 12000, suffix: "+" },
  { label: "Factory QA Hours", value: 56, suffix: "k" },
  { label: "Premium Installations", value: 6000, suffix: "+" },
  
];

const timelineSteps = [
  
  {
    title: "Custom Pattern Plotting",
    detail: "Each panel is cut to exact vehicle geometry using advanced CNC profiling.",
  },
  {
    title: "Quality Validation",
    detail: "Every roll is inspected with premium-grade testing before it reaches our install teams.",
  },
  {
    title: "Factory-Level Application",
    detail: "Our certified specialists apply the film with the same rigor as our in-house manufacturing process.",
  },
];

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, active };
}

function useCountUp(target: number, active: boolean, duration = 1200) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start: number | null = null;

    const animate = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCurrent(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [target, active, duration]);

  return current;
}

export default function AboutPage() {
  const hero = useInView(0.2);
  const story = useInView(0.2);
  const statsGroup = useInView(0.25);
  const why = useInView(0.25);
  const process = useInView(0.25);

  return (
    <section className="about-shell">
      <div className="about-container">
      <section className={`hero panel ${hero.active ? "in-view" : ""}`} ref={hero.ref}>
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">About Us</span>
            <h1>Built for comfort, clarity,<br />and long-term protection.</h1>
            <p>
              Dura Shield delivers advanced protection films with precision manufacturing and trusted
              installation for every vehicle owner.
            </p>
          </div>
        </div>
      </section>

      <section className="vision-wrap">
        <div className="vision-inner">
          <div className="vision-cards">
          <div className="vision-card">
            <div className="vision-icon" aria-hidden>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5C7 5 3.3 8.1 2 12c1.3 3.9 5 7 10 7s8.7-3.1 10-7c-1.3-3.9-5-7-10-7zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" fill="currentColor"/>
                <circle cx="12" cy="12" r="2" fill="currentColor" />
              </svg>
            </div>
            <div className="vision-text">
              <h3>Vision</h3>
              <p>To become India's most trusted name for automotive surface protection, known for cooler cabins, safer interiors, and a premium finish quality.</p>
              <p className="card-accent">Driven by innovation in film technology.</p>
            </div>
          </div>

          <div className="vision-card">
            <div className="vision-icon" aria-hidden>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2l6 3v5c0 5-3 9-6 12-3-3-6-7-6-12V5l6-3z" fill="currentColor"/>
              </svg>
            </div>
            <div className="vision-text">
              <h3>Mission</h3>
              <p>To provide the right film, precise fitment, and transparent guidance so every Dura Shield customer gets long-lasting protection, heat reduction, and confident driving comfort.</p>
            </div>
          </div>
          </div>
        </div>
      </section>

      <section className={`why-choose panel ${why.active ? "in-view" : ""}`} ref={why.ref}>
        <div className="why-inner">
          <div className="why-intro">
            <span className="eyebrow">Why Choose Dura Shield</span>
            <h2>Factory-made shields, precision fit, lifetime-grade protection.</h2>
            <p>
              We design and manufacture premium protective films and deliver vehicle-specific
              kits that fit precisely, reject heat and UV, and preserve paint and interiors
              for the long term.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card" style={{ transitionDelay: `0ms` }}>
              <div className="feature-icon" aria-hidden>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l7 4v5c0 6-4 10-7 11-3-1-7-5-7-11V6l7-4z" fill="currentColor"/></svg>
              </div>
              <div className="feature-body">
                <h3>Warranty Backed Protection</h3>
                <p>Every installation is backed by a trusted warranty, ensuring long-term confidence, reliable performance, and hassle-free ownership.</p>
              </div>
            </div>

            <div className="feature-card" style={{ transitionDelay: `80ms` }}>
              <div className="feature-icon" aria-hidden>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 12l3-2 4 5 7-9 4 8v4H3v-6z" fill="currentColor"/></svg>
              </div>
              <div className="feature-body">
                <h3>Vehicle-Specific Fit</h3>
                <p>Custom-cut patterns for each model ensure seamless edges, faster installs, and no impact on paint finish.</p>
              </div>
            </div>

            <div className="feature-card" style={{ transitionDelay: `160ms` }}>
              <div className="feature-icon" aria-hidden>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3c1 0 4 1 6 3 2 2 2 5 2 8 0 4-3 7-8 9-5-2-8-5-8-9 0-3 0-6 2-8 2-2 5-3 6-3z" fill="currentColor"/></svg>
              </div>
              <div className="feature-body">
                <h3>Thermal & UV Defense</h3>
                <p>Blocks harmful UV and reduces cabin heat to protect surfaces and improve passenger comfort.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`story-section panel ${story.active ? "in-view" : ""}`} ref={story.ref}>
        <div className="story-copy">
          <span className="eyebrow">Our Story</span>
          <h2>The Manufacturer Edge</h2>
          <p>
            Most protection brands rely on third-party film and third-party installers. At Dura Shield,
            we own both sides of the experience — manufacturing our premium Paint Protection Film and
            applying it with our own certified installation teams.
          </p>
          <ul>
            
            <li>End-to-end quality control from roll to vehicle</li>
            <li>Dedicated installers trained on our exacting standards</li>
          </ul>
        </div>
        <div className="story-images">
          <div className="image-panel image-panel-top"><img src={factoryImgSrc} alt="Factory"/></div>
          <div className="image-panel image-panel-bottom"><img src={installationImgSrc} alt="Installation"/></div>
        </div>
      </section>

      <section className={`stats-section panel ${statsGroup.active ? "in-view" : ""}`} ref={statsGroup.ref}>
        <div className="stats-intro">
          <span className="eyebrow">Performance Metrics</span>
          <h2>Measured by excellence, not promises.</h2>
          <p>
            Every number reflects our commitment to premium protection, meticulous craftsmanship,
            and customer satisfaction.
          </p>
        </div>
        <div className="stats-grid">
          {stats.map((item, index) => {
            const number = useCountUp(typeof item.value === "number" ? item.value : 0, statsGroup.active, 1200);
            return (
              <article className="stat-card" key={index} style={{ transitionDelay: `${index * 120}ms` }}>
                <span className="stat-label">{item.label}</span>
                <h3>
                  {number}
                  <span className="stat-suffix">{item.suffix}</span>
                </h3>
                <p>Elite-grade results delivered at every step.</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className={`process-panel panel ${process.active ? "in-view" : ""}`} ref={process.ref}>
        <div className="process-header">
          <span className="eyebrow">Our Process</span>
          <h2>From precision to finished vehicle perfection.</h2>
          <p>
            A premium finish requires a premium workflow. Every step is engineered and monitored
            for the highest level of film performance and installation accuracy.
          </p>
        </div>
        <div className="timeline">
          {timelineSteps.map((step, index) => (
            <div className="timeline-step" key={index} style={{ transitionDelay: `${index * 110}ms` }}>
              <div className="step-marker">{index + 1}</div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

        .about-shell {
          width: 100vw;
          margin-left: calc(50% - 50vw);
          padding: 0 0 120px; 
        }

        .about-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .panel {
          position: relative;
          overflow: visible;
          border-radius: 0;
          padding: 32px 0;
          margin-bottom: 28px;
          background: transparent;
          border: none;
          box-shadow: none;
          transform: translateY(18px);
          opacity: 0;
          transition: opacity 0.7s ease, transform 0.7s ease;
        }

        .panel.in-view {
          transform: none;
          opacity: 1;
        }

        /* 1. HERO SECTION: Deep black/dark gradient as per screenshot */
        .hero {
          width: 100vw;
          margin-left: calc(50% - 50vw);
          padding: 72px 0 56px;
          margin-bottom: 0; 
          background: linear-gradient(180deg, #050607 0%, #080b12 100%);
          border-bottom: 1px solid rgba(255, 181, 153, 0.05);
        }

        .hero-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: grid;
          gap: 36px;
          align-items: center;
        }

        .hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top left, rgba(255, 181, 153, 0.03), transparent 50%);
          pointer-events: none;
        }

        .hero-copy {
          position: relative;
          z-index: 1;
          max-width: 760px;
        }

        .eyebrow {
          display: inline-block;
          margin-bottom: 18px;
          color: var(--brand);
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 8px 18px;
          border-radius: 999px;
          border: 1px solid rgba(255, 181, 153, 0.2);
          background: rgba(255, 181, 153, 0.05);
        }

        .hero-copy h1 {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          color: var(--ink);
          margin: 0 0 14px;
          font-size: clamp(2.8rem, 5vw, 4.6rem);
          letter-spacing: -0.02em;
          line-height: 1.02;
        }

        .story-copy h2,
        .stats-intro h2,
        .process-header h2 {
          font-family: 'Poppins', sans-serif;
          letter-spacing: 0.02em;
          color: var(--ink);
          margin: 0 0 16px;
          font-size: clamp(1.6rem, 2.6vw, 2.4rem);
        }

        .hero-copy p,
        .story-copy p,
        .stats-intro p,
        .process-header p,
        .stat-card p,
        .step-content p {
          color: var(--muted);
          line-height: 1.75;
          font-size: 1rem;
        }

        .hero-copy p {
          max-width: 760px;
          margin-bottom: 20px;
        }

        .card-accent {
          margin-top: 12px;
          color: var(--brand);
          font-weight: 600;
          font-size: 0.98rem;
        }

        /* 2. VISION WRAP SECTION: Distinct Navy Band */
        .vision-wrap {
          width: 100vw;
          margin-left: calc(50% - 50vw);
          padding: 48px 0 56px;
          background: #080d1a; 
          border-bottom: 1px solid rgba(255, 181, 153, 0.05);
        }

        .vision-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .vision-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
        }

        /* Darker cards to contrast with the navy band */
        .vision-card {
          background: #04060a;
          border-left: 6px solid var(--brand);
          padding: 32px 30px;
          border-radius: 12px;
          border-top: 1px solid rgba(255, 181, 153, 0.05);
          border-right: 1px solid rgba(255, 181, 153, 0.05);
          border-bottom: 1px solid rgba(255, 181, 153, 0.05);
          box-shadow: 0 15px 40px rgba(0,0,0,0.5);
          display: flex;
          gap: 20px;
          align-items: flex-start;
          min-height: 180px;
        }

        .vision-icon {
          min-width: 56px;
          min-height: 56px;
          border-radius: 10px;
          background: linear-gradient(180deg, var(--brand), rgba(246,120,29,0.95));
          display: grid;
          place-items: center;
          color: #0b1326;
          font-weight: 800;
          box-shadow: 0 8px 22px rgba(246, 120, 29, 0.2);
          flex-shrink: 0;
        }

        .vision-text h3 {
          margin: 0 0 8px;
          color: var(--ink);
          font-size: 1.05rem;
        }

        .vision-text p {
          margin: 0;
          color: var(--muted);
          line-height: 1.6;
        }

        .vision-card h3 {
          margin: 0 0 10px;
          color: var(--ink);
          font-size: 1.05rem;
        }

        .vision-card p {
          margin: 0;
          color: var(--muted);
          line-height: 1.75;
          max-width: 640px;
        }

        .why-choose .why-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 32px 20px 18px;
          display: grid;
          gap: 26px;
        }

        .why-intro h2 {
          margin: 0 0 8px;
          color: var(--ink);
          font-family: 'Poppins', sans-serif;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .feature-card {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          padding: 24px;
          border-radius: 14px;
          background: rgba(23, 31, 51, 0.4);
          border: 1px solid rgba(255, 181, 153, 0.1);
          transform: translateY(18px);
          opacity: 0;
          transition: transform 0.6s ease, opacity 0.6s ease, border-color 0.3s;
        }
        
        .feature-card:hover {
          border-color: rgba(255, 181, 153, 0.3);
        }

        .why-choose.in-view .feature-card {
          transform: none;
          opacity: 1;
        }

        .feature-icon {
          min-width: 56px;
          min-height: 56px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          background: var(--brand);
          color: #0b1326;
          font-weight: 800;
          flex-shrink: 0;
        }

        .feature-body h3 { margin: 0 0 8px; color: var(--ink); }

        .story-section {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 38px;
          align-items: center;
        }

        .story-copy ul {
          display: grid;
          gap: 14px;
          margin: 24px 0 0;
          padding-left: 20px;
          list-style: none;
        }

        .story-copy li {
          position: relative;
          padding-left: 28px;
          color: var(--muted);
        }

        .story-copy li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 10px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--brand);
          box-shadow: 0 0 12px rgba(255, 181, 153, 0.4);
        }

        .story-images {
          display: grid;
          gap: 24px;
        }

        .image-panel {
          min-height: 220px;
          border-radius: 24px;
          background: rgba(23, 31, 51, 0.4);
          border: 1px solid rgba(255, 181, 153, 0.1);
          display: block;
          overflow: hidden;
        }

        .image-panel img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .image-panel-top {
          min-height: 260px;
        }

        .stats-section {
          display: grid;
          gap: 32px;
        }

        .stats-intro {
          max-width: 620px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 20px;
        }

        .stat-card {
          padding: 28px;
          border-radius: 22px;
          background: rgba(23, 31, 51, 0.4);
          border: 1px solid rgba(255, 181, 153, 0.1);
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }

        .stat-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
          border-color: rgba(255, 181, 153, 0.3);
        }

        .stat-label {
          display: block;
          margin-bottom: 16px;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-size: 0.76rem;
        }

        .stat-card h3 {
          font-size: 3rem;
          margin: 0;
          color: var(--ink);
        }

        .stat-suffix {
          margin-left: 6px;
          color: var(--brand);
          font-size: 1.3rem;
        }

        .process-panel {
          display: grid;
          gap: 36px;
        }

        .timeline {
          display: grid;
          gap: 22px;
        }

        .timeline-step {
          display: grid;
          grid-template-columns: 60px minmax(0, 1fr);
          gap: 18px;
          align-items: start;
          padding: 24px;
          border-radius: 24px;
          background: rgba(23, 31, 51, 0.4);
          border: 1px solid rgba(255, 181, 153, 0.1);
          transform: translateY(24px);
          opacity: 0;
          transition: transform 0.7s ease, opacity 0.7s ease;
        }

        .timeline-step:nth-child(1) { transition-delay: 0ms; }
        .timeline-step:nth-child(2) { transition-delay: 80ms; }
        .timeline-step:nth-child(3) { transition-delay: 160ms; }
        .timeline-step:nth-child(4) { transition-delay: 240ms; }

        .process-panel.in-view .timeline-step {
          transform: none;
          opacity: 1;
        }

        .step-marker {
          min-width: 60px;
          min-height: 60px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          border: 1px solid rgba(255, 181, 153, 0.3);
          background: rgba(255, 181, 153, 0.1);
          color: var(--brand);
          font-size: 1.1rem;
          font-weight: 800;
        }

        .step-content h3 {
          margin: 0 0 10px;
          font-size: 1.2rem;
          color: var(--ink);
        }

        @media (max-width: 980px) {
          .hero,
          .story-section {
            grid-template-columns: 1fr;
          }
          .stats-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .vision-cards { grid-template-columns: 1fr; }
          .features-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 680px) {
          .about-shell { padding: 0 0 80px; }
          .panel { padding: 32px 24px; }
          .hero-copy h1 { font-size: 2.4rem; }
          .stats-grid { grid-template-columns: 1fr; }
          .timeline-step { grid-template-columns: 1fr; }
          .step-marker { justify-self: start; }
        }

        @media (max-width: 480px) {
          .about-shell { padding: 0 0 60px; }
          .about-container { padding: 0 14px; }
          .panel { padding: 20px 12px; margin-bottom: 16px; }
          .hero { padding: 40px 0 32px; }
          .hero-copy h1 { font-size: 1.8rem; }
          .hero-copy p { font-size: 0.9rem; }
          .eyebrow { font-size: 10px; padding: 6px 12px; margin-bottom: 12px; }
          .vision-wrap { padding: 28px 0 36px; }
          .vision-card { padding: 20px 16px; min-height: auto; flex-direction: column; gap: 14px; }
          .vision-icon { min-width: 44px; min-height: 44px; }
          .vision-text h3, .vision-card h3 { font-size: 0.95rem; }
          .vision-text p, .vision-card p { font-size: 0.88rem; }
          .why-choose .why-inner { padding: 20px 12px 12px; }
          .why-intro h2 { font-size: 1.3rem; }
          .feature-card { padding: 16px; flex-direction: column; gap: 12px; }
          .feature-icon { min-width: 44px; min-height: 44px; }
          .feature-body h3 { font-size: 0.95rem; }
          .story-copy h2, .stats-intro h2, .process-header h2 { font-size: 1.3rem; }
          .story-copy ul { padding-left: 8px; gap: 10px; }
          .story-copy li { padding-left: 22px; font-size: 0.9rem; }
          .stat-card { padding: 18px; border-radius: 16px; }
          .stat-card h3 { font-size: 2rem; }
          .stat-suffix { font-size: 1rem; }
          .stat-label { font-size: 0.7rem; margin-bottom: 10px; }
          .timeline-step { padding: 16px; border-radius: 16px; }
          .step-marker { min-width: 46px; min-height: 46px; font-size: 0.95rem; }
          .step-content h3 { font-size: 1rem; }
          .image-panel { min-height: 160px; border-radius: 16px; }
          .image-panel-top { min-height: 200px; }
        }
      `}</style>
    </section>
  );
}