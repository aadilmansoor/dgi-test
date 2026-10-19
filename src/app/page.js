"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import AnimatedLogo from "@/components/AnimatedLogo";
import AboutSectionDesktop from "@/components/AboutSectionDesktop";
import AboutSectionMobile from "@/components/AboutSectionMobile";
import PortfolioGrid from "@/components/PortfolioGrid";
import CreativeSection from "@/components/CreativeSection";
import OurProcessSection from "@/components/OurProcessSection";
import TrustStrip from "@/components/TrustStrip";
import Footer from "@/components/Footer";
import PortalPopup from "@/components/PortalPopup";
import SubscribeModal from "@/components/SubscribeModal";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavLogoVisible, setIsNavLogoVisible] = useState(false);
  const [isSubscribeOpen, setSubscribeOpen] = useState(false);
  const [isNavDark, setIsNavDark] = useState(false);
  const [isNavWhiteBg, setIsNavWhiteBg] = useState(false);
  const [isLogoRed, setIsLogoRed] = useState(false);
  // null until measured, so neither hero video loads on the wrong screen size
  const [isDesktop, setIsDesktop] = useState(null);
  const whiteGradientRef = useRef(null);
  const portfolioRef = useRef(null);

  useEffect(() => {
    const handleWheel = (e) => {
      if (!isScrolled && e.deltaY > 0) {
        // Scrolling down - trigger animation
        setIsScrolled(true);
      } else if (isScrolled && e.deltaY < 0 && window.scrollY <= 0) {
        // Scrolling up at top of page - reverse animation
        setIsScrolled(false);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isScrolled]);

  useEffect(() => {
    // <html> has `scroll-smooth`, which turns each per-frame window.scrollTo()
    // of this tween into a smooth scroll that the next frame cancels, so the
    // page never actually moves. Switch it off while the tween runs.
    const html = document.documentElement;
    const restoreScrollBehavior = () => { html.style.scrollBehavior = ""; };
    html.style.scrollBehavior = "auto";

    // No ScrollTrigger.refresh() here: nothing changes layout, and a refresh
    // snaps AnimatedLogo's scrubbed animation straight to its end mid-flight.
    // The navbar logo is revealed by AnimatedLogo's onDockedChange once the
    // flying logo has landed on it.
    const tween = gsap.to(window, {
      scrollTo: { y: isScrolled ? window.innerHeight : 0, autoKill: false },
      duration: 0.6,
      ease: "none",
      onComplete: restoreScrollBehavior,
    });

    return () => {
      tween.kill();
      restoreScrollBehavior();
    };
  }, [isScrolled]);

  // ScrollTrigger for nav color change when white gradient reaches top
  useEffect(() => {
    if (!whiteGradientRef.current) return;
    
    const trigger = ScrollTrigger.create({
      trigger: whiteGradientRef.current,
      start: "top top",
      end: "bottom top",
      onEnter: () => setIsNavDark(true),
      onLeaveBack: () => setIsNavDark(false),
    });

    return () => trigger.kill();
  }, []);

  // ScrollTrigger for navbar white bg and red logo when white gradient reaches white color
  useEffect(() => {
    if (!whiteGradientRef.current) return;
    
    // Adjusted trigger point since white gradient is further down now
    const trigger = ScrollTrigger.create({
      trigger: whiteGradientRef.current,
      start: "bottom top+=100", // Start transitioning earlier or based on visual need
      end: "bottom top",
      onEnter: () => {
        setIsNavWhiteBg(true);
        setIsLogoRed(true);
      },
      onLeaveBack: () => {
        setIsNavWhiteBg(false);
        setIsLogoRed(false);
      },
    });

    return () => trigger.kill();
  }, []);

  // Force white navbar styling on mobile since we start directly with white content
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsNavWhiteBg(true);
        setIsNavDark(true);
        setIsLogoRed(true);
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const openSubscribe = () => setSubscribeOpen(true);
  const closeSubscribe = () => setSubscribeOpen(false);

  return (
    <>
      <div className="bg-white lg:bg-decograph-red min-h-screen">
        {/* Header/Navigation */}
        <Header onSubscribeClick={openSubscribe} isDark={isNavDark} isWhiteBg={isNavWhiteBg} hideLogo={!isNavLogoVisible} />

        {/* Hero Section with Carousel (Fixed) - Desktop Only */}
        <div className="hidden lg:block">
          {isDesktop && <HeroCarousel />}
        </div>
        
        {/* Animated Logo Overlay - Desktop Only */}
        <div className="hidden lg:block">
          <AnimatedLogo onDockedChange={setIsNavLogoVisible} />
        </div>

        {/* Content stack that slides up */}
        <div className="relative z-10 lg:mt-[100vh]">
          {/* Part 1: Gradient Part (Full Screen) - Desktop Only */}
          <div 
            className="hidden lg:block h-screen w-full"
            style={{
              background: 'linear-gradient(to bottom, rgba(114, 27, 36, 0), rgba(114, 27, 36, 0.015) 8.8%, rgba(114, 27, 36, 0.059) 17.4%, rgba(114, 27, 36, 0.121) 24.8%, rgba(114, 27, 36, 0.193) 31.3%, rgba(114, 27, 36, 0.269) 37.2%, rgba(114, 27, 36, 0.348) 42.8%, rgba(114, 27, 36, 0.429) 48.3%, rgba(114, 27, 36, 0.509) 53.8%, rgba(114, 27, 36, 0.589) 59.4%, rgba(114, 27, 36, 0.667) 65.2%, rgba(114, 27, 36, 0.743) 71.3%, rgba(114, 27, 36, 0.815) 77.8%, rgba(114, 27, 36, 0.883) 84.7%, rgba(114, 27, 36, 0.945) 92.1%, rgb(114, 27, 36))'
            }}
          />
          
          {/* Part 2: About Section Desktop (Sticky with spacer) */}
          <div className="hidden lg:block">
            <AboutSectionDesktop />
          </div>

          {/* Part 3: Transition Gradient (White fade) - Desktop Only */}
          <div 
            ref={whiteGradientRef}
            className="hidden lg:block h-screen w-full relative z-10 lg:-mt-[200vh]"
            style={{
              backgroundImage: 'linear-gradient(to top, hsl(0, 0%, 100%), hsla(0, 0%, 100%, 0.94505) 7.9%, hsla(0, 0%, 100%, 0.88294) 15.3%, hsla(0, 0%, 100%, 0.81522) 22.2%, hsla(0, 0%, 100%, 0.7426) 28.7%, hsla(0, 0%, 100%, 0.66692) 34.8%, hsla(0, 0%, 100%, 0.58891) 40.6%, hsla(0, 0%, 100%, 0.50925) 46.2%, hsla(0, 0%, 100%, 0.42866) 51.7%, hsla(0, 0%, 100%, 0.34817) 57.2%, hsla(0, 0%, 100%, 0.2693) 62.8%, hsla(0, 0%, 100%, 0.19309) 68.7%, hsla(0, 0%, 100%, 0.12126) 75.2%, hsla(0, 0%, 100%, 0.05882) 82.6%, hsla(0, 0%, 100%, 0.01457) 91.2%, hsla(0, 0%, 100%, 0))'
            }}
          />

          {/* Mobile: same hero and about sections as desktop, without the pinned scroll animations */}
          <div className="lg:hidden pt-16">
            <div className="relative h-[calc(100svh-4rem)] min-h-[520px]">
              {isDesktop === false && <HeroCarousel fixed={false} />}
              {/* Bottom fade so the copy stays legible over any clip */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
              {/* pb-40 keeps the CTAs clear of the floating call/WhatsApp buttons */}
              <div className="absolute inset-x-0 bottom-0 px-6 pb-40 text-white">
                <p className="helvetica-regular uppercase tracking-[0.3em] text-[10px] text-white/70 mb-4">
                  Interior Design &amp; Fit-Out Studio
                </p>
                <h1
                  className="mb-8 max-w-[18ch]"
                  style={{
                    fontFamily: '"Deuterium Variable", sans-serif',
                    fontWeight: 480,
                    fontSize: "clamp(2rem, 9vw, 2.75rem)",
                    lineHeight: 1.08,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Where spaces transform and dreams come to life
                </h1>
                <div className="flex gap-3">
                  <Link href="/works" className="flex-1 text-center bg-white text-decograph-red text-sm uppercase tracking-wider py-3.5">
                    View Portfolio
                  </Link>
                  <Link href="/contact" className="flex-1 text-center border border-white/80 text-white text-sm uppercase tracking-wider py-3.5">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
            <AboutSectionMobile />
          </div>

          {/* Part 4: Portfolio Gallery (white background) - scrolls over About */}
          <div ref={portfolioRef} className="relative z-10">
            {/* Projects carousel */}
            <PortfolioGrid />

            {/* Creative scroll-reveal section */}
            <CreativeSection />

            {/* Our Process */}
            <OurProcessSection />

            {/* Trust Strip */}
            <TrustStrip />

            {/* Footer */}
            <Footer onSubscribeClick={openSubscribe} />
          </div>

        </div>
      </div>

      {/* Subscribe Modal */}
      {isSubscribeOpen && (
        <PortalPopup
          overlayColor="rgba(255, 255, 255, 0.98)"
          onOutsideClick={closeSubscribe}
        >
          <SubscribeModal onClose={closeSubscribe} />
        </PortalPopup>
      )}
    </>
  );
}
