"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Full-width row: a large number, title and text beside an image that wipes up
 * into view on scroll. `reversed` puts the image on the left (desktop).
 */
export default function RevealRow({ num, eyebrow, title, description, image, href, linkLabel = "View project", reversed = false }) {
  const stepRef  = useRef(null);
  const imgRef   = useRef(null);
  const imgInner = useRef(null);
  const numRef   = useRef(null);
  const titleRef = useRef(null);
  const lineRef  = useRef(null);
  const descRef  = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = { trigger: stepRef.current, start: "top 78%" };
      gsap.from(numRef.current, {
        opacity: 0, x: reversed ? 40 : -40, duration: 1.2, ease: "power3.out", scrollTrigger: trigger,
      });
      gsap.from(titleRef.current, {
        clipPath: "inset(0 0 100% 0)", y: 18, duration: 1.1, ease: "power3.out", delay: 0.18, scrollTrigger: trigger,
      });
      gsap.from(lineRef.current, {
        scaleX: 0, duration: 0.9, ease: "power3.inOut", delay: 0.38,
        transformOrigin: "left center", scrollTrigger: trigger,
      });
      gsap.from(descRef.current, {
        opacity: 0, y: 22, duration: 1, ease: "power3.out", delay: 0.5, scrollTrigger: trigger,
      });
      gsap.from(imgRef.current, {
        clipPath: "inset(100% 0% 0% 0%)", duration: 1.8, ease: "power3.out",
        scrollTrigger: { trigger: imgRef.current, start: "top 82%" },
      });
      gsap.fromTo(imgInner.current,
        { scale: 1.12 },
        { scale: 1, duration: 2.6, ease: "power2.out",
          scrollTrigger: { trigger: imgRef.current, start: "top 82%" } }
      );
    }, stepRef);
    return () => ctx.revert();
  }, [reversed]);

  return (
    // overflow-x-clip: the number slides in from 40px off to the side, which
    // would otherwise widen the page and add a horizontal scrollbar.
    <div ref={stepRef} className="border-t border-gray-100 grid grid-cols-1 lg:grid-cols-2 overflow-x-clip">
      <div
        ref={imgRef}
        className={`relative overflow-hidden ${reversed ? "" : "lg:order-2"}`}
        style={{ minHeight: "clamp(280px, 48vw, 660px)" }}
      >
        <div ref={imgInner} className="absolute inset-0">
          <Image src={image} alt={title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-center" />
        </div>
      </div>

      <div className="flex flex-col justify-center px-6 lg:px-14 xl:px-20 py-10 lg:py-16">
        <span
          ref={numRef}
          className="font-bold text-gray-100 leading-none select-none mb-3"
          style={{ fontSize: "clamp(4.5rem, 9vw, 7rem)" }}
        >
          {num}
        </span>
        {eyebrow && (
          <p className="type-eyebrow text-decograph-red mb-2">{eyebrow}</p>
        )}
        <h3 ref={titleRef} className="type-h3 text-gray-900 mb-4">
          {title}
        </h3>
        <div ref={lineRef} className="w-14 h-0.5 bg-decograph-red mb-5" />
        <div ref={descRef}>
          {description && <p className="type-body text-gray-600 mb-6">{description}</p>}
          {href && (
            <Link
              href={href}
              className="btn btn-outline"
            >
              {linkLabel}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
