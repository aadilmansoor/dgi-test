"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
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

  // Navbar turns white with dark text as soon as the building scene reaches
  // the top; over the hero it stays transparent with white text.
  useEffect(() => {
    if (!transitionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: transitionRef.current,
      start: "top top",
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

  // On touch screens the content's hold-back offset changes when the logo
  // docks; once it has slid into place, re-measure the scroll triggers so the
  // navbar switch above fires at the content's real position.
  useEffect(() => {
    if (!window.matchMedia("(pointer: coarse)").matches) return;
    const id = setTimeout(() => ScrollTrigger.refresh(), 750);
    return () => clearTimeout(id);
  }, [isNavLogoVisible]);

  const openSubscribe = () => setSubscribeOpen(true);
  const closeSubscribe = () => setSubscribeOpen(false);

  return (
    <>
      <div className="bg-white min-h-screen">
        {/* Header/Navigation */}
        <Header onSubscribeClick={openSubscribe} isDark={isNavDark} isWhiteBg={isNavWhiteBg} hideLogo={!isNavLogoVisible} transparentOnMobile />

        {/* Hero video, fixed behind the page */}
        <HeroCarousel />

        {/* Logo that flies from the hero into the navbar as the page scrolls */}
        <AnimatedLogo onDockedChange={setIsNavLogoVisible} />

        {/* Content stack that slides up over the hero. With a mouse or trackpad
            the logo animation uses the first screen of scrolling, so the content
            starts two screens down and only rises once the logo has docked.
            On touch screens the logo flies on its own (under a second), however
            far the finger moved. There the content starts just below the hero
            but is held 60vh lower until the logo docks, then slides up into
            place, so it arrives right after the logo, not before or long after. */}
        <div
          className={`relative z-10 mt-[200vh] pointer-coarse:mt-[110vh] pointer-coarse:transition-transform pointer-coarse:duration-700 pointer-coarse:ease-out ${
            isNavLogoVisible ? "" : "pointer-coarse:translate-y-[60vh]"
          }`}
        >
          {/* Watercolour building on a transparent background, so it sits
              straight over the hero video behind. White fills in behind the
              bottom from 80% down: the painted ground is solid from 65% to
              88% of the image, so the join is hidden, and the ragged edge
              below it then shows white rather than the video. */}
          <div ref={transitionRef} className="bg-[linear-gradient(to_bottom,transparent_80%,#fff_80%)]">
            <Image
              src="/images/home/building.webp"
              alt=""
              width={2000}
              height={1384}
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
