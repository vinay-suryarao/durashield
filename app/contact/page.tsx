
'use client';

import { useState } from 'react';
import './style.css';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="contact-page">
      {/* Ambient Glow Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ffb599]/5 rounded-full blur-[120px] mix-blend-screen transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] mix-blend-screen transform -translate-x-1/3 translate-y-1/3"></div>
      </div>

      {/* Main Content */}
      <main className="contact-main">
        <div className="contact-content-grid">
          {/* Contact Methods Section */}
          <section className="contact-section-card">
            <div className="contact-card-header">
              <div className="contact-header-label">
                <span className="label-accent-line"></span>
                <span className="label-accent-text">CONTACT US</span>
              </div>
              <h1 className="contact-card-title">Get In Touch</h1>
              <p className="contact-card-subtitle">Choose the fastest way to connect with DuraShield.</p>
            </div>

            <div className="contact-methods-grid">
              {/* WhatsApp */}
              <a href="https://wa.me/919004252175" className="contact-method-card">
                <div className="method-icon whatsapp">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.012 2A9.992 9.992 0 002 12c0 1.948.553 3.766 1.517 5.257L2 22l4.887-1.492A9.962 9.962 0 0012.012 22c5.518 0 9.988-4.475 9.988-10S17.53 2 12.012 2zM12.012 20.3a8.27 8.27 0 01-4.46-1.12l-.32-.17-3.32 1.01 1.02-3.23-.19-.31A8.27 8.27 0 013.72 12c0-4.57 3.73-8.3 8.292-8.3 4.56 0 8.29 3.73 8.29 8.3s-3.73 8.3-8.29 8.3z" />
                    <path d="M16.57 14.23c-.25-.12-1.48-.73-1.71-.82-.23-.08-.41-.12-.58.12-.17.25-.66.82-.81 1-.15.17-.3.21-.55.08-.25-.12-1.06-.39-2.02-1.24-.74-.66-1.25-1.49-1.4-1.73-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.15.17-.25.25-.41.08-.17.04-.33-.02-.45-.06-.12-.58-1.41-.8-1.93-.21-.5-.43-.43-.58-.44l-.5-.01c-.18 0-.48.06-.73.33-.25.27-.96.94-.96 2.29s.99 2.66 1.13 2.85c.14.19 1.94 2.96 4.7 4.12 1.83.77 2.45.82 3.32.74.74-.06 1.48-.48 1.68-.94.19-.46.19-.85.13-.94-.06-.09-.23-.15-.48-.27z" />
                  </svg>
                </div>
                <h3 className="method-title">WhatsApp</h3>
                <p className="method-detail">Chat on 9004252175</p>
              </a>

              {/* Instagram */}
              <a href="https://instagram.com/durashield" className="contact-method-card">
                <div className="method-icon instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
                <h3 className="method-title">Instagram</h3>
                <p className="method-detail">@durashield</p>
              </a>

              {/* Email */}
              <a href="mailto:durapointmumbai@gmail.com" className="contact-method-card">
                <div className="method-icon email">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    <path d="M2 4l10 8 10-8"></path>
                  </svg>
                </div>
                <h3 className="method-title">Email</h3>
                <p className="method-detail">durapointmumbai@gmail.com</p>
              </a>

              {/* Phone */}
              <a href="tel:+919004252175" className="contact-method-card">
                <div className="method-icon phone">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <h3 className="method-title">Phone</h3>
                <p className="method-detail">9004252175</p>
              </a>
            </div>
          </section>

          {/* Location & Map Section */}
          <section className="location-section-card">
            <div className="contact-card-header">
              <div className="contact-header-label">
                <span className="label-accent-line"></span>
                <span className="label-accent-text">LOCATION</span>
              </div>
              <h2 className="contact-card-title">Visit Our Workshop</h2>
              <p className="contact-card-subtitle">Tap map for direct navigation on Google Maps.</p>
            </div>

            <div className="map-container">
              <iframe
                src="https://maps.google.com/maps?q=K%20218%20ansha%20industries%20sakhivihar%20road%20sakhinaka,%20Near%20Shivsagar%20hotel&t=&z=15&ie=UTF8&iwloc=&output=embed"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="map-frame"
                title="DuraShield Workshop Location"
              ></iframe>
              <div className="map-location-pin">
                <div className="pin-pulse"></div>
                <svg className="pin-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z"/>
                </svg>
              </div>
              <a href="https://maps.google.com/maps?q=K%20218%20ansha%20industries%20sakhivihar%20road%20sakhinaka,%20Near%20Shivsagar%20hotel" target="_blank" rel="noopener noreferrer" className="map-button">
                <svg className="button-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z"/>
                </svg>
                Open In Maps
              </a>
            </div>

            <div className="address-info-box">
              <div className="address-icon-container">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S15.33 8 14.5 8 13 8.67 13 9.5s.67 1.5 1.5 1.5z"/>
                </svg>
              </div>
              <div className="address-content">
                <h4 className="address-title">Address</h4>
                <p className="address-text">K 218 ansha industries sakhivihar road sakhinaka, Near Shivsagar hotel</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {submitted && (
        <div className="success-message-toast">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          Message sent successfully! We'll be in touch soon.
        </div>
      )}
    </div>
  );
}
