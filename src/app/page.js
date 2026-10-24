"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Header from "@/components/Header";
import HomeHero from "@/components/HomeHero";
import AnimatedLogo from "@/components/AnimatedLogo";
import HomeAboutSection from "@/components/HomeAboutSection";
import HomeCategories from "@/components/HomeCategories";
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
  const transitionRef = useRef(null);

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

  // Navbar turns white with dark text once the building scene's white lower
  // half reaches the top; above that its white text sits over the photo.
  useEffect(() => {
    if (!transitionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: transitionRef.current,
      start: "35% top",
      onEnter: () => {
        setIsNavDark(true);
        setIsNavWhiteBg(true);
      },
      onLeaveBack: () => {
        setIsNavDark(false);
        setIsNavWhiteBg(false);
      },
    });

    return () => trigger.kill();
  }, []);

  const openSubscribe = () => setSubscribeOpen(true);
  const closeSubscribe = () => setSubscribeOpen(false);

  return (
    <>
      <div className="bg-white min-h-screen">
        {/* Header/Navigation */}
        <Header onSubscribeClick={openSubscribe} isDark={isNavDark} isWhiteBg={isNavWhiteBg} hideLogo={!isNavLogoVisible} transparentOnMobile />

        {/* Hero, fixed behind the page */}
        <HomeHero />

        {/* Logo that flies from the hero into the navbar as the page scrolls */}
        <AnimatedLogo onDockedChange={setIsNavLogoVisible} />

        {/* Content stack that slides up over the hero */}
        <div className="relative z-10 mt-[100vh]">
          {/* Interior photo fading into the watercolour building (rendered from the design) */}
          <div ref={transitionRef} className="bg-white">
            <Image
              src="/images/home/transition.jpg"
              alt=""
              width={2880}
              height={2355}
              sizes="100vw"
              className="block w-full h-auto"
            />
          </div>

          <div className="relative z-10">
            <HomeAboutSection />
            <HomeCategories />

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
