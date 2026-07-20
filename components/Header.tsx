"use client";
import React, { Fragment, useState, useEffect, useRef } from 'react';
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
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(132); // fallback

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Dynamically measure header height
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const updateOffset = () => {
      const height = el.getBoundingClientRect().height;
      setHeaderHeight(height);
      document.documentElement.style.setProperty('--header-offset', `${height}px`);
    };

    updateOffset();

    const observer = new ResizeObserver(updateOffset);
    observer.observe(el);
    window.addEventListener('resize', updateOffset);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateOffset);
    };
  }, []);

  const stripItems = [
    "DURASHIELD",
    "Premium Paint Protection Film",
    "Self Healing",
    "High Gloss",
    "Stain Resistant"
  ];

  return (
    <>
      <div className="sticky-header" ref={headerRef}>
        <div className="top-strip">
          <div className="top-strip-track">
            {[1, 2, 3].map((trackIdx) => (
              <div key={trackIdx} className="top-strip-content">
                {stripItems.map((item, index) => (
                  <Fragment key={index}>
                    <span>{item}</span>
                    <span className="top-strip-separator">|</span>
                  </Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>
        <header className="site-header">
          <div className="container header-inner">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Link href="/" className="header-logo-link logo-offset" style={{ display: 'block' }}>
                <Image
                  src="/logo1 (2).png"
                  alt="Durashield Logo"
                  width={140}
                  height={45}
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </Link>
              <div className="brand-sub">Defending Your Drive, Invisibly</div>
            </div>

            {/* Desktop nav */}
            <nav className="nav nav-desktop" aria-label="Main navigation">
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

            {/* Hamburger button (mobile only) */}
            <button
              className={`hamburger-btn ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </header>
      </div>

      {/* Spacer div — pushes page content below the fixed header */}
      <div
        className="header-spacer"
        style={{ height: `${headerHeight + 4}px` }}
        aria-hidden="true"
      />

      {/* Mobile menu overlay */}
      <div
        className={`mobile-menu-overlay ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(false)}
      />
      <nav
        className={`mobile-menu ${menuOpen ? "open" : ""}`}
        aria-label="Mobile navigation"
      >
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`mobile-menu-link ${link.isButton ? "nav-button" : ""} ${isActive && !link.isButton ? "active" : ""}`.trim()}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}

