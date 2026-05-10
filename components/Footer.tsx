import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/before-after", label: "Before / After" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact Us" },
  { href: "/booking", label: "Book Now" }
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="brand">DURASHIELD</div>
          <p className="brand-sub">
            Premium window film solutions for UV defense, glare control, and
            lasting cabin comfort.
          </p>
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
            <span>Placeholder email</span>
            <span>Placeholder phone</span>
            <span>Placeholder address</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">Copyright 2026 DURASHIELD. All rights reserved.</div>
      </div>
    </footer>
  );
}
