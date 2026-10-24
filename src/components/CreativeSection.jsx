"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Same image used for both layers — grayscale underneath, full colour on top
const PHOTO = "/images/hero/hero-1.webp";

export default function CreativeSection() {
  const outerRef  = useRef(null);
  const revealRef = useRef(null);
  const lineRef   = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: outerRef.current,
        start:   "top top",
        end:     "bottom bottom",
        scrub:   1,
        onUpdate: (self) => {
          const pct = (1 - self.progress) * 100;
          if (revealRef.current) {
            // colour photo starts fully clipped (right 100%), opens left→right
            revealRef.current.style.clipPath = `inset(0 ${pct}% 0 0)`;
          }
          if (lineRef.current) {
            lineRef.current.style.left = `${100 - pct}%`;
          }
        },
      });
    }, outerRef);
    return () => ctx.revert();
  }, []);

  return (
    /* scroll distance = 2 × viewport height */
    <div ref={outerRef} className="relative h-[200vh]">

      {/* Sticky frame */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* ── LAYER 1 : Colorless / drawing state (always visible underneath) */}
        <div className="absolute inset-0">
          <Image
            src={PHOTO}
            alt=""
            fill
            sizes="100vw"
            quality={90}
            className="object-cover object-center"
            style={{
              /*
               * grayscale        → removes all colour
               * contrast(1.15)   → subtle lift to make edges crisper
               * brightness(1.05) → keeps mid-tones natural, not blown out
               * This looks like a high-quality architectural greyscale render /
               * pencil-tone sketch — clean and distinct from the colour state.
               */
              filter: "grayscale(1) contrast(1.15) brightness(1.05)",
            }}
            aria-hidden
          />
          {/* light vignette for text legibility */}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* ── LAYER 2 : Full colour photo — hidden until scroll reveals it */}
        <div
          ref={revealRef}
          className="absolute inset-0"
          style={{ clipPath: "inset(0 100% 0 0)" }}
        >
          <Image
            src={PHOTO}
            alt="Decograph Interior Design"
            fill
            sizes="100vw"
            quality={95}
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/25" />
        </div>

        {/* ── Divider line that travels with the reveal edge ────────── */}
        <div
          ref={lineRef}
          className="absolute top-0 bottom-0 z-20 pointer-events-none"
          style={{
            left: "0%",
            width: "2px",
            background:
              "linear-gradient(to bottom,transparent,rgba(255,255,255,0.9) 20%,#fff 50%,rgba(255,255,255,0.9) 80%,transparent)",
            boxShadow: "0 0 8px 2px rgba(255,255,255,0.35)",
          }}
        />

        {/* ── Text overlay ──────────────────────────────────────────── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-6">
          <p className="type-eyebrow text-white/60 mb-5">
            Decograph Interiors
          </p>

          <h2 className="leading-none mb-7">
            <span
              className="type-display block text-white/90 mb-2 drop-shadow-lg"
            >
              From Vision
            </span>
            <span
              className="type-h1 block text-white drop-shadow-lg"
            >
              to Built Reality
            </span>
          </h2>

          <div className="w-10 h-px bg-white/40 mb-6" />

          <p className="text-white/65 text-sm md:text-base max-w-sm leading-relaxed helvetica-regular drop-shadow">
            Every space begins as an idea. We transform your vision into a
            meticulously crafted environment — built to endure and inspire.
          </p>
        </div>

        {/* ── Scroll indicator ──────────────────────────────────────── */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className="text-[9px] uppercase tracking-[0.3em] text-white/35 helvetica-regular">
            Scroll
          </span>
          <div className="w-px h-10 bg-white/25" />
        </div>

      </div>
    </div>
  );
}
