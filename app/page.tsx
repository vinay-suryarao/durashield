"use client";

import "./home.css";

const heroBackgroundSrc = "/images/hero-bg.jpg";

export default function HomePage() {
  const year = new Date().getFullYear();

  return (
    <div className="homepage">
      <section className="hero-premium">
        <img
          className="hero-bg"
          src={heroBackgroundSrc}
          alt="Black supercar in a concrete studio"
        />
        <div className="hero-overlay" />
        <div className="hero-panel">
          <div className="hero-content">
            <p className="hero-eyebrow">Premium Paint Protection Film</p>
            <p className="hero-tagline">Studio-grade protection. Road-ready confidence.</p>
            <h1 className="hero-title">Dura Shield PPF crafted for the boldest rides.</h1>
            <p className="hero-subtitle">
              Precision-cut film. Heat-molded installation. Showroom clarity that stands up to the road.
            </p>
            <div className="hero-actions">
              <a className="hero-primary" href="/booking">Book a consultation</a>
              <a className="hero-secondary" href="/products">Explore PPF packages</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="section-kicker">About our PPF</p>
          <h2>Invisible armor engineered for modern paint systems.</h2>
          <p>
            Our film is engineered to absorb impact, resist yellowing, and self-heal from surface swirls with
            warmth. Every install is hand-finished to contour edges, lights, and mirrors for a seamless result.
          </p>
        </div>
        <div className="section-grid">
          {[
            {
              title: "Hydrophobic top coat",
              body: "Repels water and grime to keep finishes cleaner for longer."
            },
            {
              title: "Self-healing surface",
              body: "Micro-scratches disappear with heat from sun or warm water."
            },
            {
              title: "Custom precision cut",
              body: "Templates tailored to each vehicle for a near-invisible edge."
            }
          ].map((card) => (
            <div key={card.title} className="feature-card">
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-block section-dark why-choose">
        <div className="why-choose-layout">
          <div className="why-choose-intro">
            <p className="section-kicker">Why choose Dura Shield</p>
            <h2>Protection built like a studio, delivered like a race team.</h2>
            <p>
              Every install is a controlled process: measured lighting, temperature-stable prep, and
              post-cure inspections that leave nothing to chance.
            </p>
            <div className="why-choose-metrics">
              <div className="why-choose-metric">
                <span>01</span>
                <p>Clean-room style prep and lighting.</p>
              </div>
              <div className="why-choose-metric">
                <span>02</span>
                <p>Certified PPF specialists for all platforms.</p>
              </div>
              <div className="why-choose-metric">
                <span>03</span>
                <p>Warranty coverage for long-term clarity.</p>
              </div>
            </div>
          </div>
          <div className="why-choose-cards">
            {[
              {
                title: "Studio-grade install bay",
                body: "Controlled lighting and dust-free prep for flawless adhesion."
              },
              {
                title: "Certified technicians",
                body: "PPF specialists trained on exotics, EVs, and daily drivers alike."
              },
              {
                title: "Warranty-backed protection",
                body: "Coverage on yellowing, cracking, and peeling for peace of mind."
              }
            ].map((card) => (
              <div key={card.title} className="why-choose-card">
                <div className="why-choose-pill">Dura Shield</div>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="process-grid">
          <div className="section-heading">
            <p className="section-kicker">Our process</p>
            <h2>From consultation to delivery, every step is deliberate.</h2>
            <p>
              We start with a paint inspection, map out coverage zones, and wrap with heat-formed precision.
              Final inspections confirm clarity, edge perfection, and finish depth.
            </p>
            <a className="hero-secondary" href="/contact">Schedule a walk-through</a>
          </div>
          <div className="process-steps">
            {[
              {
                step: "01",
                title: "Paint correction",
                body: "Restore and refine clear coat before sealing it."
              },
              {
                step: "02",
                title: "Precision layout",
                body: "Custom-cut film aligned to every edge and contour."
              },
              {
                step: "03",
                title: "Heat-formed finish",
                body: "Seamless bonding with a mirror-gloss inspection."
              }
            ].map((item) => (
              <div key={item.step} className="process-card">
                <span>{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block section-cta">
        <div className="cta-card">
          <div>
            <p className="section-kicker">Ready for PPF?</p>
            <h2>Protect the finish you waited for.</h2>
            <p>
              Book a consultation and receive a tailored protection plan designed for your vehicle and driving
              style.
            </p>
          </div>
          <div className="cta-actions">
            <a className="hero-primary" href="/booking">Reserve your slot</a>
            <p className="cta-note">{year} availability is limited each month.</p>
          </div>
        </div>
      </section>

    </div>
  );
}