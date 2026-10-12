"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const mainNavLinks = [
  { href: "/about", label: "We Are" },
  { href: "/about#services", label: "Services" },
  { href: "/works", label: "Portfolio" },
];

const designDropdown = {
  label: "Design and Build",
  links: [
    { href: "/design", label: "Design" },
    { href: "/build", label: "Build" },
  ],
};

export default function Header({ isDark = false, isWhiteBg = false, hideGradient = false, hideLogo = false, hideOnScrollDown = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDesignOpen, setIsMobileDesignOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isNavHidden, setIsNavHidden] = useState(false);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const pathname = usePathname();
  const dropdownTimeoutRef = useRef(null);
  const lastScrollYRef = useRef(0);

  // Intersection Observer for section detection on about page
  useEffect(() => {
    if (pathname !== "/about") {
      setActiveSection("");
      return;
    }

    const sections = ["services", "clientele"];
    const observers = [];

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        const observer = new IntersectionObserver(observerCallback, observerOptions);
        observer.observe(element);
        observers.push(observer);
      }
    });

    const handleScroll = () => {
      if (window.scrollY < 200) setActiveSection("");
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  // Hide on scroll down, show on scroll up (with background)
  useEffect(() => {
    if (!hideOnScrollDown) return;
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < 80) {
        setIsNavHidden(false);
        setIsScrolledPastHero(false);
        lastScrollYRef.current = currentY;
        return;
      }
      setIsScrolledPastHero(currentY > window.innerHeight * 0.6);
      if (currentY > lastScrollYRef.current + 5) {
        setIsNavHidden(true);
      } else if (currentY < lastScrollYRef.current - 5) {
        setIsNavHidden(false);
      }
      lastScrollYRef.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hideOnScrollDown]);

  const isLinkActive = (href) => {
    if (href.includes("#") && pathname === "/about") {
      return activeSection === href.split("#")[1];
    }
    if (href === "/about" && pathname === "/about") return activeSection === "";
    if (!href.includes("#")) return pathname === href || pathname.startsWith(href + "/");
    return false;
  };

  const isDropdownActive = designDropdown.links.some((l) => isLinkActive(l.href));

  const effectiveDark = isDark || (hideOnScrollDown && isScrolledPastHero);

  const getTextColor = (href) => {
    if (isMenuOpen) return "text-black";
    const isActive = isLinkActive(href);
    if (isActive) return effectiveDark ? "text-decograph-red" : "text-white";
    return effectiveDark ? "text-black" : "text-white";
  };

  const getDropdownTriggerColor = () => {
    if (isMenuOpen) return "text-black";
    if (isDropdownActive) return effectiveDark ? "text-decograph-red" : "text-white";
    return effectiveDark ? "text-black" : "text-white";
  };

  const logoSrc = (isWhiteBg || isMenuOpen || (hideOnScrollDown && isScrolledPastHero)) ? "/images/logo-red.png" : "/images/logo.png";
  const desktopBgClass = isWhiteBg ? "lg:bg-white" : "lg:bg-transparent";
  const headerBg = (hideOnScrollDown && isScrolledPastHero)
    ? "bg-white shadow-sm"
    : `bg-white ${desktopBgClass}`;

  const handleDropdownEnter = () => {
    clearTimeout(dropdownTimeoutRef.current);
    setIsDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setIsDropdownOpen(false), 150);
  };

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${headerBg}`}
      style={{
        transform: (isNavHidden && !isMenuOpen) ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.35s ease, background-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <div className="w-full px-4 lg:px-6 xl:px-8 relative z-50">
        <nav className="flex items-center justify-between h-20 relative">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 -ml-2 hover:opacity-70 transition-opacity flex flex-col justify-center gap-[6px] w-8 h-8"
            aria-label="Toggle Menu"
          >
            <span className={`block w-6 h-0.5 bg-black transition-transform duration-300 ease-in-out origin-center ${isMenuOpen ? "rotate-45 translate-y-[4px]" : ""}`} />
            <span className={`block w-6 h-0.5 bg-black transition-transform duration-300 ease-in-out origin-center ${isMenuOpen ? "-rotate-45 -translate-y-[4px]" : ""}`} />
          </button>

          {/* Mobile Logo (Center) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:hidden">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              <img src="/images/logo-red.png" alt="Decograph Interiors" className="h-8 w-auto object-contain" />
            </Link>
          </div>

          {/* Left Navigation (Desktop) */}
          <ul className="hidden lg:flex items-center gap-0 xl:gap-1">
            {mainNavLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`px-3 py-1.5 text-sm font-normal transition-colors duration-300 ${getTextColor(link.href)} ${isDark ? "hover:text-decograph-red" : "hover:text-black"} ${isLinkActive(link.href) ? "border border-current rounded-full" : ""}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {/* Design and Build Dropdown */}
            <li
              className="relative"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                className={`px-3 py-1.5 text-sm font-normal flex items-center gap-1 transition-colors duration-300 ${getDropdownTriggerColor()} ${isDark ? "hover:text-decograph-red" : "hover:text-black"} ${isDropdownActive ? "border border-current rounded-full" : ""}`}
              >
                {designDropdown.label}
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-0 bg-white shadow-lg min-w-[180px] py-2 z-50"
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                >
                  {designDropdown.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block px-4 py-2.5 text-sm hover:text-decograph-red hover:bg-gray-50 transition-colors ${isLinkActive(link.href) ? "text-decograph-red" : "text-gray-800"}`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            {/* Clientele */}
            <li>
              <Link
                href="/about#clientele"
                className={`px-3 py-1.5 text-sm font-normal transition-colors duration-300 ${getTextColor("/about#clientele")} ${isDark ? "hover:text-decograph-red" : "hover:text-black"} ${isLinkActive("/about#clientele") ? "border border-current rounded-full" : ""}`}
              >
                Clientele
              </Link>
            </li>
          </ul>

          {/* Center Logo (Desktop) */}
          <Link
            href="/"
            className={`hidden lg:block absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 ${hideLogo ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          >
            <img src={logoSrc} alt="Decograph Interiors" className="w-[75px] md:w-[98px] lg:w-[120px] h-auto" />
          </Link>

          {/* Contact Us Button (Desktop) */}
          <Link
            href="/contact"
            className={`hidden lg:flex items-center gap-2 px-5 py-2 text-sm font-normal border transition-colors duration-300 ${
              effectiveDark
                ? "border-decograph-red text-decograph-red hover:bg-decograph-red hover:text-white"
                : "border-white text-white hover:bg-white hover:text-decograph-red"
            }`}
          >
            Contact Us
          </Link>
        </nav>
      </div>

      {/* Mobile Gradient - Always Visible (Hidden when menu is open or hideGradient is true) */}
      {!isMenuOpen && !hideGradient && (
        <div
          className="lg:hidden absolute left-0 right-0 h-16 top-full -mt-px"
          style={{
            backgroundImage: 'linear-gradient(hsl(0, 0%, 100%), hsla(0, 0%, 100%, 0.98759) 9.9%, hsla(0, 0%, 100%, 0.96314) 19.5%, hsla(0, 0%, 100%, 0.926) 28.7%, hsla(0, 0%, 100%, 0.87667) 37.3%, hsla(0, 0%, 100%, 0.81624) 45.2%, hsla(0, 0%, 100%, 0.74699) 52.3%, hsla(0, 0%, 100%, 0.66999) 58.7%, hsla(0, 0%, 100%, 0.58775) 64.4%, hsla(0, 0%, 100%, 0.50184) 69.5%, hsla(0, 0%, 100%, 0.41394) 74.1%, hsla(0, 0%, 100%, 0.3238) 78.4%, hsla(0, 0%, 100%, 0.23172) 82.6%, hsla(0, 0%, 100%, 0.1409) 86.9%, hsla(0, 0%, 100%, 0.0541) 92%, hsla(0, 0%, 100%, 0))'
          }}
        />
      )}

      {/* Desktop fade effect - only visible when white background and hideGradient is false */}
      {isWhiteBg && !hideGradient && (
        <div
          className="hidden lg:block absolute left-0 right-0 h-24 -bottom-24"
          style={{
            backgroundImage: 'linear-gradient(hsl(0, 0%, 100%), hsla(0, 0%, 100%, 0.98759) 9.9%, hsla(0, 0%, 100%, 0.96314) 19.5%, hsla(0, 0%, 100%, 0.926) 28.7%, hsla(0, 0%, 100%, 0.87667) 37.3%, hsla(0, 0%, 100%, 0.81624) 45.2%, hsla(0, 0%, 100%, 0.74699) 52.3%, hsla(0, 0%, 100%, 0.66999) 58.7%, hsla(0, 0%, 100%, 0.58775) 64.4%, hsla(0, 0%, 100%, 0.50184) 69.5%, hsla(0, 0%, 100%, 0.41394) 74.1%, hsla(0, 0%, 100%, 0.3238) 78.4%, hsla(0, 0%, 100%, 0.23172) 82.6%, hsla(0, 0%, 100%, 0.1409) 86.9%, hsla(0, 0%, 100%, 0.0541) 92%, hsla(0, 0%, 100%, 0))'
          }}
        />
      )}
    </header>

      {/* Mobile Full Screen Menu */}
      <div
        className={`fixed inset-0 bg-white z-40 transition-transform duration-500 ease-in-out lg:hidden flex flex-col justify-start items-start pt-24 px-6 ${isMenuOpen ? "translate-y-0" : "-translate-y-full"}`}
      >
        <ul className="flex flex-col items-start gap-0 w-full">
          {mainNavLinks.map((link) => {
            const isActive = isLinkActive(link.href);
            return (
              <li key={link.href} className="w-full text-left">
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-5xl font-normal ${isActive ? "text-decograph-red" : "text-black"} hover:text-decograph-red transition-colors uppercase leading-[0.95] block w-full`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}

          {/* Design and Build expandable on mobile */}
          <li className="w-full text-left">
            <button
              onClick={() => setIsMobileDesignOpen(!isMobileDesignOpen)}
              className={`text-5xl font-normal ${isDropdownActive ? "text-decograph-red" : "text-black"} hover:text-decograph-red transition-colors uppercase leading-[0.95] flex items-center gap-3 w-full`}
            >
              Design &amp; Build
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${isMobileDesignOpen ? "rotate-180" : ""}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isMobileDesignOpen ? "max-h-40 mt-2" : "max-h-0"}`}>
              <ul className="pl-4 space-y-2">
                {designDropdown.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-2xl font-normal ${isLinkActive(link.href) ? "text-decograph-red" : "text-gray-500"} hover:text-decograph-red transition-colors uppercase block`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          {/* Clientele */}
          <li className="w-full text-left">
            <Link
              href="/about#clientele"
              onClick={() => setIsMenuOpen(false)}
              className={`text-5xl font-normal ${isLinkActive("/about#clientele") ? "text-decograph-red" : "text-black"} hover:text-decograph-red transition-colors uppercase leading-[0.95] block w-full`}
            >
              Clientele
            </Link>
          </li>

          {/* Contact Us button */}
          <li className="w-full text-left mt-6">
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="inline-block px-6 py-3 border-2 border-decograph-red text-decograph-red text-lg font-normal uppercase hover:bg-decograph-red hover:text-white transition-colors"
            >
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Powered by Snapinfinity */}
        <div className="absolute bottom-8 left-6 right-6">
          <span className="text-xs text-gray-400">
            Powered by{" "}
            <a href="https://snapinfinity.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-decograph-red transition-colors">Snapinfinity</a>
          </span>
        </div>
      </div>
    </>
  );
}
