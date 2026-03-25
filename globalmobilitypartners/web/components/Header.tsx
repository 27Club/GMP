"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Menu, X } from "lucide-react";

const navLinks = [
  { href: "/law-firms", label: "Law Firms" },
  { href: "/businesses", label: "Businesses" },
  { href: "/technology", label: "Technology" },
  { href: "/blog", label: "Blog" },
  { href: "/team", label: "Meet The Team" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href;

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "shadow-none"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Globe className="h-7 w-7 text-gold-500 transition-transform duration-300 group-hover:rotate-12" />
          <span className="font-display text-xl font-bold text-navy-800 sm:text-2xl">
            Global Mobility Partners
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                isActive(link.href)
                  ? "text-gold-600"
                  : "text-navy-700 hover:text-gold-500"
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-gold-500" />
              )}
            </Link>
          ))}
          <Link
            href="/contact"
            className={`ml-3 inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
              isActive("/contact")
                ? "bg-gold-400 text-navy-900 shadow-md"
                : "bg-gold-500 text-navy-900 shadow-md hover:bg-gold-400 hover:shadow-lg"
            }`}
          >
            Contact Us
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-navy-700 transition-colors hover:bg-navy-50 lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Panel */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
          mobileOpen ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav
          className="border-t border-navy-100 bg-white px-4 pb-6 pt-4 sm:px-6"
          aria-label="Mobile"
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-4 py-3 text-base font-medium transition-colors duration-200 ${
                  isActive(link.href)
                    ? "bg-navy-50 text-gold-600"
                    : "text-navy-700 hover:bg-navy-50 hover:text-gold-500"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-3 inline-flex items-center justify-center rounded-lg bg-gold-500 px-5 py-3 text-base font-semibold text-navy-900 shadow-md transition-all duration-200 hover:bg-gold-400 hover:shadow-lg"
            >
              Contact Us
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
