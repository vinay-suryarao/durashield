"use client";
import Image from 'next/image';
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Products" },
  { href: "/before-after", label: "Before / After" },
  { href: "/contact", label: "Contact Us" },
  { href: "/booking", label: "Book Now", isButton: true }
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/" className="header-logo-link" style={{ display: 'block' }}>
            <Image
              src="/logo1 (2).png"
              alt="Durashield Logo"
              width={140}
              height={45}
              style={{ objectFit: 'contain' }}
              priority
            />
          </Link>
          <div className="brand-sub">Defending Your Drive,Invisibly</div>
        </div>
        <nav className="nav" aria-label="Main navigation">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${link.isButton ? "nav-button" : ""} ${isActive && !link.isButton ? "active" : ""}`.trim()}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
