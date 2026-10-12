"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

// ── SVG Icons ─────────────────────────────────────────────────────────────────
const SketchIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
    {Array.from({ length: 24 }).map((_, i) => {
      const angle = (i * 360) / 24;
      const rad = (angle * Math.PI) / 180;
      const inner = i % 2 === 0 ? 10 : 6;
      const cos = parseFloat(Math.cos(rad).toFixed(6));
      const sin = parseFloat(Math.sin(rad).toFixed(6));
      return (
        <line key={i}
          x1={40 + inner * cos} y1={40 + inner * sin}
          x2={40 + 36 * cos}   y2={40 + 36 * sin}
          stroke="#721b24" strokeWidth="1"
        />
      );
    })}
    <circle cx="40" cy="40" r="4" fill="#721b24" />
  </svg>
);

const DevelopmentIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="#721b24" strokeWidth="1.5">
    <rect x="22" y="18" width="16" height="10" />
    <rect x="42" y="18" width="16" height="10" />
    <rect x="14" y="32" width="20" height="10" />
    <rect x="38" y="32" width="22" height="10" />
    <rect x="22" y="46" width="16" height="10" />
    <rect x="42" y="46" width="16" height="10" />
  </svg>
);

const DeliveredIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="#721b24" strokeWidth="1.5">
    <polygon points="40,12 68,58 12,58" />
    <polygon points="47,34 63,58 47,58" fill="#721b24" fillOpacity="0.25" />
    <line x1="47" y1="12" x2="68" y2="58" strokeWidth="1" />
  </svg>
);

// ── Data ───────────────────────────────────────────────────────────────────────
const scrollStages = [
  {
    title: "Contours of Modern Elegance",
    description: "Where raw vision meets refined form. Our design philosophy begins with understanding the soul of a space before a single line is drawn.",
    image: "/images/design/contours-hero-4k.webp",
  },
  {
    title: "Into Design",
    description: 'Every project begins "Into Design", where your ideas are transformed into creative and practical concepts. We focus on balancing innovation with functionality, ensuring that the foundation of the project captures your vision perfectly. This stage sets the tone for everything that follows.',
    image: "/images/design/stage-2-4k.webp",
  },
  {
    title: "Takes Shape",
    description: "The blueprint breathes. Skilled hands bring the design to life, layer by layer, texture by texture, until the space begins to speak.",
    image: "/images/design/stage-3-v2-4k.webp",
  },
  {
    title: "The Spark",
    description: "The moment a space transcends its function and becomes an experience. Every detail lands exactly where it was always meant to be.",
    image: "/images/design/stage-4-v2-4k.webp",
  },
];

const pillars = [
  { Icon: SketchIcon,      title: "Sketch",      description: "We begin with creative sketches that capture your vision. This stage lays the foundation for innovative and functional design." },
  { Icon: DevelopmentIcon, title: "Development", description: "Concepts evolve into detailed plans with expert precision. We ensure every element is refined and ready for execution." },
  { Icon: DeliveredIcon,   title: "Delivered",   description: "Your project is brought to life with excellence and quality. We deliver results that match your vision and exceed expectations." },
];

// ── Scroll Stages Section ─────────────────────────────────────────────────────
function ScrollStagesSection() {
  const containerRef = useRef(null);
  const imageRefs    = useRef([]);
  const titleRefs    = useRef([]);
  const descRefs     = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Base state: stage 0 showing, the rest clipped away above it.
      // z-index follows the stage order, so a stage always wipes in over the one
      // before it — and un-wipes cleanly when the scrub runs backwards.
      scrollStages.forEach((_, i) => {
        gsap.set(imageRefs.current[i], {
          clipPath: i === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
          zIndex:   i,
        });
        gsap.set(titleRefs.current[i], { autoAlpha: i === 0 ? 1 : 0, y: i === 0 ? 0 : 20 });
        gsap.set(descRefs.current[i],  { autoAlpha: i === 0 ? 1 : 0, y: i === 0 ? 0 : 15, xPercent: -50 });
      });

      // One scrubbed timeline drives every stage, so the slides are a function of
      // scroll position instead of playing on their own clock — scroll fast and the
      // wipe simply moves fast; nothing queues up and no stage can be skipped.
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: containerRef.current,
          start:   "top top",
          end:     "bottom bottom",   // = the sticky panel's full travel
          scrub:   true,
        },
      });

      // 1 unit of timeline time == 1 viewport of scroll, so the stage boundaries
      // land exactly where they did before: stage k owns scroll [k, k+1) viewports,
      // sitting still for the first HOLD of it and wiping to stage k+1 over the rest.
      const HOLD = 0.4;
      const WIPE = 1 - HOLD;

      scrollStages.slice(0, -1).forEach((_, k) => {
        const at = k + HOLD;

        tl.fromTo(imageRefs.current[k + 1],
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: WIPE },
          at
        );

        // Text crosses over inside the wipe: outgoing leaves first, incoming
        // arrives on the back half.
        tl.to(titleRefs.current[k], { autoAlpha: 0, y: -20, duration: WIPE * 0.45 }, at);
        tl.to(descRefs.current[k],  { autoAlpha: 0, y: -15, duration: WIPE * 0.45 }, at);

        tl.fromTo(titleRefs.current[k + 1],
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: WIPE * 0.5 },
          at + WIPE * 0.5
        );
        tl.fromTo(descRefs.current[k + 1],
          { autoAlpha: 0, y: 15 },
          { autoAlpha: 1, y: 0, duration: WIPE * 0.5 },
          at + WIPE * 0.5
        );
      });

      // Hold the last stage for its own viewport of scroll.
      tl.to({}, { duration: 1 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ height: `${(scrollStages.length + 1) * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen bg-white flex flex-col overflow-hidden">

        {/* Title */}
        <div className="shrink-0 relative" style={{ height: "clamp(120px, 18vh, 150px)" }}>
          {scrollStages.map((stage, i) => (
            <h2
              key={i}
              ref={el => (titleRefs.current[i] = el)}
              className="absolute bottom-4 left-0 right-0 text-center px-6 deuterium-regular text-gray-900"
              style={{
                fontSize: "clamp(1.3rem, 2.5vw, 2.2rem)",
                willChange: "transform, opacity",
              }}
            >
              {stage.title}
            </h2>
          ))}
        </div>

        {/* Image */}
        <div className="relative flex-1 w-full max-w-[1280px] mx-auto px-6 lg:px-24 flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-full max-h-[500px] aspect-[4/3] md:aspect-[16/7] overflow-hidden">
            {scrollStages.map((stage, i) => (
              <div key={i} ref={el => (imageRefs.current[i] = el)} className="absolute inset-0">
                <Image src={stage.image} alt={stage.title} fill unoptimized className="object-cover object-center" />
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="shrink-0 relative" style={{ height: "clamp(140px, 18vh, 180px)" }}>
          {scrollStages.map((stage, i) => (
            <p
              key={i}
              ref={el => (descRefs.current[i] = el)}
              className="about-text text-gray-500 text-center"
              style={{
                position: "absolute",
                top: "1rem",
                left: "50%",
                width: "min(860px, calc(100% - 3rem))",
                willChange: "transform, opacity",
              }}
            >
              {stage.description}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function DesignPage() {
  const heroImgRef    = useRef(null);
  const heroTitleRef  = useRef(null);
  const heroSubRef    = useRef(null);
  const introRef      = useRef(null);
  const approachLine1 = useRef(null);
  const pillarRefs    = useRef([]);
  const ctaRef        = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroImgRef.current,
        { scale: 1.08 },
        { scale: 1, duration: 3.2, ease: "power2.out" }
      );
      gsap.from(heroTitleRef.current, {
        clipPath: "inset(0 0 100% 0)", y: 24,
        duration: 1.4, ease: "power3.out", delay: 0.35,
      });
      gsap.from(heroSubRef.current, {
        opacity: 0, y: 12, letterSpacing: "0.6em",
        duration: 1.1, ease: "power3.out", delay: 1.15,
      });
      gsap.from(introRef.current, {
        opacity: 0, y: 40, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: introRef.current, start: "top 82%" },
      });
      gsap.from(approachLine1.current, {
        opacity: 0, y: 30, duration: 0.95, ease: "power3.out",
        scrollTrigger: { trigger: approachLine1.current, start: "top 82%" },
      });
      gsap.from(pillarRefs.current, {
        opacity: 0, y: 50, duration: 1.0, ease: "power3.out", stagger: 0.14,
        scrollTrigger: { trigger: pillarRefs.current[0], start: "top 80%" },
      });
      gsap.from(ctaRef.current, {
        opacity: 0, y: 36, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ctaRef.current, start: "top 88%" },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header isWhiteBg={false} isDark={false} hideGradient={true} hideOnScrollDown={true} />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative h-screen w-full overflow-hidden">
        <div ref={heroImgRef} className="absolute inset-0">
          <Image src="/images/hero/hero-2.webp" alt="Design" fill priority unoptimized className="object-cover object-center" />
        </div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0.6) 100%)" }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1
            ref={heroTitleRef}
            style={{
              fontFamily: 'var(--font-cormorant), "Playfair Display", Georgia, serif',
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(4.5rem, 13vw, 11rem)",
              color: "#fff",
              letterSpacing: "-0.01em",
              lineHeight: 1,
            }}
          >
            Design
          </h1>
          <p ref={heroSubRef} className="helvetica-regular text-white/60 uppercase tracking-[0.35em] text-xs mt-6">
            Decograph Interiors
          </p>
        </div>
      </section>

      {/* ── Intro ─────────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 lg:px-24 max-w-[1440px] mx-auto">
        <div ref={introRef}>
          <h2 className="about-heading text-decograph-red mb-4">Design</h2>
          <div className="w-20 h-0.5 bg-decograph-red mb-6" />
          <p className="about-text text-gray-900 max-w-xl">
            Our Design service integrates creativity with construction expertise. We handle everything from initial concept to final delivery under one roof — ensuring efficiency, cost-effectiveness, and uncompromising quality.
          </p>
        </div>
      </section>

      {/* ── Scroll Stages ─────────────────────────────────────────────────── */}
      <ScrollStagesSection />

      {/* ── Approach Section ──────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p ref={approachLine1} className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-3">
              Our Approach
            </p>
            <h2 className="text-gray-900" style={{ fontWeight: 600, fontSize: "clamp(1.6rem, 3vw, 2.6rem)", letterSpacing: "-0.02em" }}>
              Designing Built Environments
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-b border-gray-200 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {pillars.map(({ Icon, title, description }, idx) => (
              <div
                key={title}
                ref={el => (pillarRefs.current[idx] = el)}
                className="flex flex-col items-center text-center py-14 px-8"
              >
                <div className="mb-8"><Icon /></div>
                <h3 className="mb-4 text-gray-900 font-medium text-lg">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-24 max-w-[1440px] mx-auto">
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="about-heading text-decograph-red mb-2">Start Your Project</h2>
            <p className="about-text text-gray-500">Ready to bring your design vision to life?</p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 inline-block px-10 py-3 border border-decograph-red text-decograph-red helvetica-regular text-sm uppercase tracking-widest hover:bg-decograph-red hover:text-white transition-colors duration-300"
          >
            Contact Us
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
