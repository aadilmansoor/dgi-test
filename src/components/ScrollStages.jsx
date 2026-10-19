"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Pinned panel that wipes from one stage to the next as the page scrolls.
 * stages: [{ title, description, image, href?, linkLabel? }]
 */
export default function ScrollStages({ stages }) {
  const containerRef = useRef(null);
  const imageRefs    = useRef([]);
  const titleRefs    = useRef([]);
  const descRefs     = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Base state: stage 0 showing, the rest clipped away above it.
      // z-index follows the stage order, so a stage always wipes in over the one
      // before it — and un-wipes cleanly when the scrub runs backwards.
      stages.forEach((_, i) => {
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

      // 1 unit of timeline time == 1 viewport of scroll: stage k owns scroll
      // [k, k+1) viewports, sitting still for the first HOLD of it and wiping to
      // stage k+1 over the rest.
      const HOLD = 0.4;
      const WIPE = 1 - HOLD;

      stages.slice(0, -1).forEach((_, k) => {
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
  }, [stages]);

  return (
    <div ref={containerRef} style={{ height: `${(stages.length + 1) * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen bg-white flex flex-col overflow-hidden">

        {/* Title */}
        <div className="shrink-0 relative" style={{ height: "clamp(120px, 18vh, 150px)" }}>
          {stages.map((stage, i) => (
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
            {stages.map((stage, i) => (
              <div key={i} ref={el => (imageRefs.current[i] = el)} className="absolute inset-0">
                <Image src={stage.image} alt={stage.title} fill sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover object-center" />
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="shrink-0 relative" style={{ height: "clamp(140px, 18vh, 180px)" }}>
          {stages.map((stage, i) => (
            <div
              key={i}
              ref={el => (descRefs.current[i] = el)}
              className="text-center"
              style={{
                position: "absolute",
                top: "1rem",
                left: "50%",
                width: "min(860px, calc(100% - 3rem))",
                willChange: "transform, opacity",
              }}
            >
              <p className="about-text text-gray-500">{stage.description}</p>
              {stage.href && (
                <Link
                  href={stage.href}
                  className="inline-block mt-4 text-decograph-red text-sm uppercase tracking-widest hover:opacity-70 transition-opacity"
                >
                  {stage.linkLabel || "View"} →
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
