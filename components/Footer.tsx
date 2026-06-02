import Link from "next/link";
import Image from "next/image";
const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Products" },
  { href: "/before-after", label: "Before / After" },
  { href: "/contact", label: "Contact Us" },
  { href: "/booking", label: "Book Now" }
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="brand-logo-container" style={{ marginBottom: '12px' }}>
            <Image
              src="/logo1 (2).png"
              alt="Durashield Logo"
              width={160}
              height={50}
              style={{ objectFit: 'contain' }}
            />
          </div>
          <p className="brand-desc">
            Premium paint protection film solutions for<br />
            scratch defense, rock chip resistance,<br />
            and lasting gloss retention.
          </p>
          <div className="social-handles">
            <a href="https://www.instagram.com/dura_shield" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
            </a>
            <a href="https://wa.me/919004252175" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="social-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9l-5.05.9" /><path d="M9 10a0.5 0.5 0 0 0 1 0v-1a0.5 0.5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a0.5 0.5 0 0 0 0 -1h-1a0.5 0.5 0 0 0 0 1" /></svg>
            </a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=durapointmumbai@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email" className="social-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
            </a>
          </div>
        </div>
        <div>
          <div className="footer-title">Quick Links</div>
          <div className="footer-links">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="footer-title">Contact Us</div>
          <div className="footer-links">
            <span className="contact-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FB923C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-icon"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
              durapointmumbai@gmail.com
            </span>
            <span className="contact-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FB923C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-icon"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              9004252175
            </span>
            <span className="contact-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FB923C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-icon"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
              K 218 ansha industries sakhivihar road sakhinaka, Near Shivsagar hotel
            </span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">Copyright 2026 DURASHIELD. All rights reserved.</div>
      </div>
    </footer>
  );
}
