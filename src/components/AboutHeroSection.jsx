"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

// The Decograph mark itself (Group 36.png, 170 × 305) is the mask, so the
// shape matches the logo exactly. The photo shows through the "d"; the tail
// below it is solid brand red, as on the profile cover. TAIL_START is the
// middle of the transparent gap between the two (rows 229–237 of 305).
const ICON_MASK = 'url("/images/Group%2036.png")';
const TAIL_START = `${(233 / 305) * 100}%`;

const maskStyle = {
  WebkitMaskImage: ICON_MASK,
  maskImage: ICON_MASK,
  WebkitMaskSize: "100% 100%",
  maskSize: "100% 100%",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
};

// Full-screen hero in the same style as the Portfolio page, followed by the
// studio's introduction beside a photo set inside the brand "d".
export default function AboutHeroSection() {
  const heroImgRef   = useRef(null);
  const heroTitleRef = useRef(null);
  const heroSubRef   = useRef(null);
  const heroLineRef  = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroImgRef.current, { scale: 1.1 }, { scale: 1, duration: 3.5, ease: "power2.out" });
      gsap.from(heroTitleRef.current, {
        clipPath: "inset(0 0 100% 0)", y: 32, duration: 1.5, ease: "power3.out", delay: 0.3,
      });
      gsap.from(heroSubRef.current, {
        opacity: 0, y: 14, letterSpacing: "0.7em", duration: 1.2, ease: "power3.out", delay: 1.1,
      });
      gsap.from(heroLineRef.current, {
        scaleX: 0, duration: 1.4, ease: "power3.inOut", delay: 1.5, transformOrigin: "center center",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative h-screen w-full overflow-hidden">
        <div ref={heroImgRef} className="absolute inset-0">
          <Image
            src="/images/hero/hero-9.webp"
            alt="A Decograph bedroom with a sculpted headboard, brass chandelier and city view"
            fill
            priority
            unoptimized
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.65) 100%)" }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1
            ref={heroTitleRef}
            style={{
              fontFamily: 'var(--font-cormorant), "Playfair Display", Georgia, serif',
              fontStyle: "italic", fontWeight: 400,
              fontSize: "clamp(4rem, 12vw, 11rem)",
              color: "#fff", letterSpacing: "-0.02em", lineHeight: 0.95,
            }}
          >
            About Us
          </h1>
          <p ref={heroSubRef} className="helvetica-regular text-white/55 uppercase tracking-[0.4em] text-xs mt-7">
            Decograph Interiors
          </p>
          <div ref={heroLineRef} className="w-24 h-px bg-white/30 mt-8" />
        </div>
      </section>

      {/* ── Introduction ──────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-24 max-w-[1440px] mx-auto py-20 md:py-28 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-14 lg:gap-20 items-center">
        <div className="max-w-xl">
          <h2
            className="text-decograph-red mb-8"
            style={{
              fontFamily: '"Deuterium Variable", sans-serif',
              fontWeight: 480,
              fontSize: "clamp(2rem, 3.8vw, 3.25rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
            }}
          >
            Where spaces transform and dreams come to life
          </h2>
          <p className="about-text text-gray-700 leading-relaxed mb-5">
            With a sharp eye for design and an unwavering commitment to
            precision, we turn ordinary environments into extraordinary
            experiences.
          </p>
          <p className="about-text text-gray-700 leading-relaxed">
            Our work spans retail, residential and commercial interiors, with a
            full suite of services from interior design to civil works and MEP
            (mechanical, electrical and plumbing).
          </p>
        </div>

        {/* Photo inside the brand "d" */}
        <div
          className="relative mx-auto lg:mx-0 lg:justify-self-end h-[340px] md:h-[460px] lg:h-[520px]"
          style={{ aspectRatio: "170 / 305" }}
        >
          <div
            className="absolute inset-0"
            style={{ ...maskStyle, clipPath: `inset(0 0 calc(100% - ${TAIL_START}) 0)` }}
          >
            <Image
              src="/images/hero/hero-3.webp"
              alt="A Decograph living space with a timber ceiling, round mirror and herringbone floor"
              fill
              sizes="(max-width: 1024px) 60vw, 30vw"
              className="object-cover object-[30%_40%]"
              // Crops out the white curtain on the right edge and the pale wall on
              // the left, which would otherwise blend into the white page.
              style={{ transform: "scale(1.2)", transformOrigin: "30% 40%" }}
            />
          </div>
          <div
            className="absolute inset-0 bg-decograph-red"
            style={{ ...maskStyle, clipPath: `inset(${TAIL_START} 0 0 0)` }}
            aria-hidden="true"
          />
        </div>
      </section>
    </>
  );
}
