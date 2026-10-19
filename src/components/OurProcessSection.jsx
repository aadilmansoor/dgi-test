"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function OurProcessSection() {
  const sectionRef  = useRef(null);
  const headingRef  = useRef(null);
  const leftRef     = useRef(null);
  const rightRef    = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // ── Heading: fade + slide up on enter ─────────────────────────
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
        },
      });

      // The image reveals start from an IntersectionObserver, not ScrollTrigger:
      // sections above load after this one is set up, which leaves
      // ScrollTrigger's start points stale (and a refresh here would snap
      // AnimatedLogo, see page.js).
      const mm = gsap.matchMedia();

      // ── Desktop: open outward from the centre line once on enter ─
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({ paused: true });
        tl.from(leftRef.current,  { clipPath: "inset(0 0% 0 100%)", duration: 2.4, ease: "power3.out" })
          .from(rightRef.current, { clipPath: "inset(0 100% 0 0%)", duration: 2.4, ease: "power3.out" }, "<");

        const observer = new IntersectionObserver(([entry]) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();
          tl.play();
        }, { rootMargin: "0px 0px -35% 0px" });

        observer.observe(leftRef.current.parentElement);
        return () => observer.disconnect();
      });

      // ── Phones: panels are stacked, so each opens downward as it enters ─
      mm.add("(max-width: 767px)", () => {
        const panels = [leftRef.current, rightRef.current];
        gsap.set(panels, { clipPath: "inset(0 0 100% 0)" });

        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            observer.unobserve(entry.target);
            gsap.to(entry.target, { clipPath: "inset(0 0 0% 0)", duration: 1.6, ease: "power3.out" });
          });
        }, { rootMargin: "0px 0px -20% 0px" });

        panels.forEach((panel) => observer.observe(panel));
        return () => observer.disconnect();
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white pt-16 md:pt-24 pb-0 overflow-hidden">

      {/* ── Heading block ─────────────────────────────────────────── */}
      <div ref={headingRef} className="text-center px-6 mb-10 md:mb-14">
        <h2 className="leading-none mb-8">
          <em
            style={{
              fontFamily: 'var(--font-cormorant), "Playfair Display", Georgia, serif',
              fontStyle:  "italic",
              fontWeight: 400,
              fontSize:   "clamp(2.5rem, 5.5vw, 5rem)",
              letterSpacing: "0em",
              color: "#111",
            }}
          >
            Our
          </em>{" "}
          <span
            style={{
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              fontWeight: 700,
              fontSize:   "clamp(2.5rem, 5.5vw, 5rem)",
              letterSpacing: "-0.02em",
              color: "#111",
            }}
          >
            Process
          </span>
        </h2>

        <p
          className="text-gray-500 max-w-3xl mx-auto leading-relaxed text-center"
          style={{ fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)" }}
        >
          At Decograph, process is our commitment to excellence. We combine
          technical knowledge, creative vision, and attention to detail to
          deliver interiors that embody long-term value and design distinction.
        </p>
      </div>

      {/* ── Two images: side by side on desktop, stacked on phones ─── */}
      <div className="flex flex-col md:flex-row md:h-[70vh] overflow-hidden">

        {/* Left — Design */}
        <Link
          href="/about#process"
          ref={leftRef}
          className="relative h-[45vh] md:h-auto md:flex-1 overflow-hidden group cursor-default"
        >
          <Image
            src="/images/hero/hero-2.webp"
            alt="Design"
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
            quality={90}
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
          />
          {/* Base gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: "rgba(0,0,0,0.25)",
            }}
          />
          {/* Hover darkening layer */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-white transition-transform duration-500 ease-out group-hover:-translate-y-2"
              style={{
                fontFamily: '"Century Gothic","Futura",CenturyGothic,AppleGothic,"Trebuchet MS",sans-serif',
                fontWeight: 400,
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                letterSpacing: "0.04em",
              }}
            >
              Design
            </span>
          </div>
        </Link>

        {/* Right — Build */}
        <Link
          href="/about#process"
          ref={rightRef}
          className="relative h-[45vh] md:h-auto md:flex-1 overflow-hidden group cursor-default"
        >
          <Image
            src="/images/hero/hero-5.webp"
            alt="Build"
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
            quality={90}
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div
            className="absolute inset-0"
            style={{
              background: "rgba(0,0,0,0.25)",
            }}
          />
          {/* Hover darkening layer */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-white transition-transform duration-500 ease-out group-hover:-translate-y-2"
              style={{
                fontFamily: '"Century Gothic","Futura",CenturyGothic,AppleGothic,"Trebuchet MS",sans-serif',
                fontWeight: 400,
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                letterSpacing: "0.04em",
              }}
            >
              Build
            </span>
          </div>
        </Link>

      </div>
    </section>
  );
}
