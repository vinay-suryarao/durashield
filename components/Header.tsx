import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/before-after", label: "Before / After" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact Us" },
  { href: "/booking", label: "Book Now", isButton: true }
];

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div>
          <div className="brand">DURASHIELD</div>
          <div className="brand-sub">Premium Suncontrol Film</div>
        </div>
        <nav className="nav" aria-label="Main navigation">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={link.isButton ? "nav-button" : ""}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
