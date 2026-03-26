import Link from "next/link";
import { Globe, MapPin, Mail, Linkedin } from "lucide-react";

const quickLinks = [
  { href: "/law-firms", label: "Law Firms" },
  { href: "/businesses", label: "Businesses" },
  { href: "/technology", label: "Technology" },
  { href: "/blog", label: "Blog" },
  { href: "/team", label: "Meet The Team" },
  { href: "/contact", label: "Contact Us" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-navy-200">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Company */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Globe className="h-6 w-6 text-gold-500" />
              <span className="font-display text-lg font-bold text-white">
                Global Mobility Partners
              </span>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-navy-300">
              Comprehensive global immigration services for law firms and
              businesses. We simplify complex immigration processes so you can
              focus on what matters most — your people and your growth.
            </p>
            <div className="flex items-center gap-2 text-sm text-navy-300">
              <MapPin className="h-4 w-4 flex-shrink-0 text-gold-500" />
              <span>Atlanta, GA</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-display text-lg font-semibold text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-300 transition-colors duration-200 hover:text-gold-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="mb-4 font-display text-lg font-semibold text-white">
              Connect
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:info@globalmobilitypartnersllc.com"
                  className="flex items-center gap-2 text-sm text-navy-300 transition-colors duration-200 hover:text-gold-400"
                >
                  <Mail className="h-4 w-4 flex-shrink-0 text-gold-500" />
                  info@globalmobilitypartnersllc.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/global-mobility-partners"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-navy-300 transition-colors duration-200 hover:text-gold-400"
                >
                  <Linkedin className="h-4 w-4 flex-shrink-0 text-gold-500" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-navy-800">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-navy-400">
            &copy; {new Date().getFullYear()} Global Mobility Partners LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
