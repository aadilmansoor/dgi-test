"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { handleAboutLinkClick } from "@/lib/aboutNav";

const mainNavLinks = [
  { href: "/about", label: "We Are" },
  { href: "/about#services", label: "Services" },
  { href: "/works", label: "Portfolio" },
];

// `transparentOnMobile` (home page) lets the mobile bar follow `isWhiteBg` like the
// desktop one: transparent with a white logo over the hero, white below it.
export default function Header({ isDark = false, isWhiteBg = false, hideLogo = false, hideOnScrollDown = false, transparentOnMobile = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isNavHidden, setIsNavHidden] = useState(false);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const pathname = usePathname();
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
        } else {
          setActiveSection((current) => (current === entry.target.id ? "" : current));
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

  const effectiveDark = isDark || (hideOnScrollDown && isScrolledPastHero);

  const getTextColor = (href) => {
    if (isMenuOpen) return "text-black";
    const isActive = isLinkActive(href);
    if (isActive) return effectiveDark ? "text-decograph-red" : "text-white";
    return effectiveDark ? "text-black" : "text-white";
  };

  // Over a hero photo a hovered link gets the active link's outline pill (a
  // colour change would be lost on dark or busy photos); on white it turns red.
  // The border is always there, transparent, so hovering doesn't shift the menu.
  const navLinkClass = (href) => [
    "px-3 py-1.5 text-sm font-normal rounded-full border transition-colors duration-300",
    getTextColor(href),
    isLinkActive(href) ? "border-current" : "border-transparent",
    effectiveDark ? "hover:text-decograph-red" : "hover:border-current",
  ].join(" ");

  const logoSrc = (isWhiteBg || isMenuOpen || (hideOnScrollDown && isScrolledPastHero)) ? "/images/logo-red.png" : "/images/logo.png";
  const desktopBgClass = isWhiteBg ? "lg:bg-white" : "lg:bg-transparent";
  const mobileOverHero = transparentOnMobile && !isWhiteBg && !isMenuOpen;
  const headerBg = (hideOnScrollDown && isScrolledPastHero)
    ? "bg-white shadow-sm"
    : `${mobileOverHero ? "bg-transparent" : "bg-white"} ${desktopBgClass}`;
  const toggleBarColor = mobileOverHero ? "bg-white" : "bg-black";

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
        <nav className="flex items-center justify-between h-16 relative">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 -ml-2 hover:opacity-70 transition-opacity flex flex-col justify-center gap-[6px] w-8 h-8"
            aria-label="Toggle Menu"
          >
            <span className={`block w-6 h-0.5 ${toggleBarColor} transition-transform duration-300 ease-in-out origin-center ${isMenuOpen ? "rotate-45 translate-y-[4px]" : ""}`} />
            <span className={`block w-6 h-0.5 ${toggleBarColor} transition-transform duration-300 ease-in-out origin-center ${isMenuOpen ? "-rotate-45 -translate-y-[4px]" : ""}`} />
          </button>

          {/* Mobile Logo (Center) */}
          <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:hidden ${hideLogo && !isMenuOpen ? "opacity-0 pointer-events-none" : ""}`}>
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              <img data-nav-logo src={mobileOverHero ? "/images/logo.png" : "/images/logo-red.png"} alt="Decograph Interiors" className="h-7 w-auto object-contain" />
            </Link>
          </div>

          {/* Left Navigation (Desktop) */}
          <ul className="century-gothic hidden lg:flex items-center gap-0 xl:gap-1">
            {mainNavLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={link.href === "/about" ? (e) => handleAboutLinkClick(e, pathname) : undefined}
                  className={navLinkClass(link.href)}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {/* Clientele */}
            <li>
              <Link
                href="/about#clientele"
                className={navLinkClass("/about#clientele")}
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
            <img data-nav-logo src={logoSrc} alt="Decograph Interiors" className="w-[75px] md:w-[98px] lg:w-[120px] h-auto" />
          </Link>

          {/* Contact Us Button (Desktop) */}
          <Link
            href="/contact"
            className={`btn hidden lg:inline-flex px-5 py-2 text-xs ${
              effectiveDark
                ? "border-decograph-red text-decograph-red hover:bg-decograph-red hover:text-white"
                : "border-white text-white hover:bg-white hover:text-decograph-red"
            }`}
          >
            Contact Us
          </Link>
        </nav>
      </div>

    </header>

      {/* Mobile Full Screen Menu */}
      <div
        className={`fixed inset-0 bg-white z-40 transition-transform duration-500 ease-in-out lg:hidden flex flex-col justify-start items-start pt-20 px-6 ${isMenuOpen ? "translate-y-0" : "-translate-y-full"}`}
      >
        <ul className="century-gothic flex flex-col items-start gap-0 w-full">
          {mainNavLinks.map((link) => {
            const isActive = isLinkActive(link.href);
            return (
              <li key={link.href} className="w-full text-left">
                <Link
                  href={link.href}
                  onClick={(e) => {
                    setIsMenuOpen(false);
                    if (link.href === "/about") handleAboutLinkClick(e, pathname);
                  }}
                  className={`text-5xl font-normal ${isActive ? "text-decograph-red" : "text-black"} hover:text-decograph-red transition-colors uppercase leading-[0.95] block w-full`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}

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
              className="btn text-base border-decograph-red text-decograph-red hover:bg-decograph-red hover:text-white"
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
