"use client";

import Link from "next/link";

const footerLinks = [
  { href: "/about", label: "We Are" },
  { href: "/about#services", label: "Services" },
  { href: "/works", label: "Portfolio" },
  { href: "/about#clientele", label: "Clientele" },
  { href: "/contact", label: "Contact Us" },
];

export default function Footer({ onSubscribeClick }) {
  return (
    <footer className="bg-gray-950 text-white">
      {/* Main Footer Content */}
      <div className="px-6 lg:px-20 py-16 lg:py-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

            {/* Column 1 - Brand */}
            <div className="lg:col-span-1">
              <Link href="/">
                <img src="/images/logo.png" alt="Decograph Interiors" className="h-10 w-auto mb-6" />
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Full-service interior design and fit-out studio specializing in residential, commercial, retail, and hospitality spaces.
              </p>
              {/* Social Links */}
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="w-9 h-9 flex items-center justify-center border border-white/20 text-gray-400 hover:border-decograph-red-light hover:text-decograph-red-light transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="YouTube"
                  className="w-9 h-9 flex items-center justify-center border border-white/20 text-gray-400 hover:border-decograph-red-light hover:text-decograph-red-light transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="X (Twitter)"
                  className="w-9 h-9 flex items-center justify-center border border-white/20 text-gray-400 hover:border-decograph-red-light hover:text-decograph-red-light transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2 - Navigation */}
            <div>
              <h3 className="text-white text-xs font-medium uppercase tracking-widest mb-6">Navigation</h3>
              <ul className="space-y-3">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-gray-400 text-sm hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Contact & Address */}
            <div>
              <h3 className="text-white text-xs font-medium uppercase tracking-widest mb-6">Contact</h3>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-decograph-red-light mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+971563970724" className="text-gray-400 text-sm hover:text-white transition-colors">
                    +971 56 397 0724
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-decograph-red-light mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:info@decographinteriors.com" className="text-gray-400 text-sm hover:text-white transition-colors break-all">
                    info@decographinteriors.com
                  </a>
                </li>
              </ul>

              <h3 className="text-white text-xs font-medium uppercase tracking-widest mb-4">Address</h3>
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 text-decograph-red-light mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-400 text-sm leading-relaxed">
                  Dubai, United Arab Emirates
                </span>
              </div>
            </div>

            {/* Column 4 - Newsletter & Legal */}
            <div>
              <h3 className="text-white text-xs font-medium uppercase tracking-widest mb-6">Newsletter</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">
                Subscribe to receive updates on our latest projects and design insights.
              </p>
              {onSubscribeClick && (
                <button
                  onClick={onSubscribeClick}
                  className="w-full py-3 bg-decograph-red text-white text-sm font-medium hover:bg-red-800 transition-colors"
                >
                  Subscribe Now
                </button>
              )}

              <div className="mt-8 pt-6 border-t border-white/10">
                <h4 className="text-white text-xs font-medium uppercase tracking-widest mb-4">Legal</h4>
                <div className="flex flex-col gap-2">
                  <Link href="/terms-conditions" className="text-gray-500 text-sm hover:text-white transition-colors">
                    Terms &amp; Conditions
                  </Link>
                  <Link href="/privacy-policy" className="text-gray-500 text-sm hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 px-6 lg:px-20 py-5">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} Decograph Interiors. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs">
            Powered by{" "}
            <a
              href="https://snapinfinity.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white transition-colors"
            >
              Snapinfinity
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
