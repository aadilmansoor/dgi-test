"use client";

import { useRef, useEffect } from "react";
import { flushSync } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Where the icon sits inside logo.png (1934 × 663), as fractions of the image.
// Group 36.png is that same icon on its own, so placing logo.png with these
// points over it makes the two pixel-aligned and the swap between them invisible.
const ICON_CX     = 215 / 1934;   // icon centre-x
const ICON_CY     = 328.5 / 663;  // icon centre-y
const ICON_H      = 609 / 1934;   // icon height, relative to logo width
const ICON_CLIP_R = 80;           // right inset (%) that shows only the icon

const REVEAL_END = 0.45;          // 0 → 45 %: text reveals · 45 → 100 %: fly to navbar
const LOGO_RATIO = 1934 / 663;    // logo.png width / height

const lerp    = (a, b, p) => a + (b - a) * p;
const clamp01 = (v) => Math.min(1, Math.max(0, v));

export default function AnimatedLogo({ onDockedChange }) {
  const iconRef = useRef(null); // Group 36.png — hero icon
  const logoRef = useRef(null); // logo.png  — full logo
  const wrapRef = useRef(null); // fixed overlay the two images are centred in
  const dockedRef = useRef(false);
  const onDockedChangeRef = useRef(onDockedChange);

  // keep the latest callback without re-running the animation setup
  useEffect(() => { onDockedChangeRef.current = onDockedChange; }, [onDockedChange]);

  useEffect(() => {
    const icon = iconRef.current;
    const logo = logoRef.current;
    const wrap = wrapRef.current;
    if (!icon || !logo || !wrap) return;

    let startScale, navScale, navCY;
    const measure = () => {
      // The navbar logo showing at this screen size (desktop or mobile), sized
      // from its CSS height when the image hasn't loaded yet.
      const target = [...document.querySelectorAll("[data-nav-logo]")].find((el) => el.offsetHeight > 0);
      const navW   = target ? target.offsetWidth || target.offsetHeight * LOGO_RATIO : 120;
      const rect   = target?.getBoundingClientRect();
      navCY        = rect ? rect.top + rect.height / 2 : 32;

      const logoW = logo.offsetWidth;                         // CSS clamp resolved
      startScale  = icon.offsetHeight / (logoW * ICON_H);     // logo's icon == Group 36 size
      navScale    = navW / logoW;
    };

    // One continuous motion, driven by a single scrubbed value t (0 → 1):
    //   t = 0         Group 36.png on screen
    //   t > 0         swapped for logo.png, clipped to its icon and laid exactly
    //                 over Group 36 — no fade, so nothing blinks
    //   0 → REVEAL    text unclips while the lock-up re-centres and settles to 1×
    //   REVEAL → 1    lock-up flies + shrinks onto the navbar logo
    //   t = 1         swapped for the navbar logo (same image, same spot)
    const state = { t: 0 };
    const render = () => {
      const { t } = state;
      const r = clamp01(t / REVEAL_END);
      const f = clamp01((t - REVEAL_END) / (1 - REVEAL_END));

      const scale = f > 0 ? lerp(1, navScale, f) : lerp(startScale, 1, r);
      // Anchor point inside the logo that sits at the viewport centre: the icon
      // at first, the middle of the full logo once the text is revealed.
      const cx = lerp(ICON_CX, 0.5, r);
      const cy = lerp(ICON_CY, 0.5, r);
      const xp = -50 - 100 * scale * (cx - 0.5);
      const yp = -50 - 100 * scale * (cy - 0.5);

      // Hero centre → navbar logo centre, from the overlay's height right now:
      // on phones it changes as the address bar slides away, and a stale value
      // would land the logo off the navbar one and make it jump at the hand-off.
      const deltaY = navCY - wrap.clientHeight / 2;

      const started = t > 0;
      const docked  = t >= 0.999;

      icon.style.opacity    = started ? "0" : "1";
      logo.style.opacity    = started ? "1" : "0";
      logo.style.visibility = docked ? "hidden" : "";
      logo.style.clipPath   = `inset(0 ${ICON_CLIP_R * (1 - r)}% 0 0)`;
      logo.style.transform  = `translate(${xp}%, ${yp}%) translateY(${deltaY * f}px) scale(${scale})`;

      // Hand-off to the static navbar logo. flushSync commits it in this same
      // frame, so the two logos never both disappear (or both show) for a frame.
      // It runs in a microtask because render can be called inside React's own
      // effect (ScrollTrigger updates on creation when the page loads scrolled),
      // where flushSync is not allowed; microtasks still run before the paint.
      if (docked !== dockedRef.current) {
        dockedRef.current = docked;
        queueMicrotask(() => {
          if (dockedRef.current !== docked) return; // superseded, or unmounted
          flushSync(() => onDockedChangeRef.current?.(docked));
        });
      }
    };

    measure();
    render();

    // Touch screens: a finger drag (and its momentum) is uneven, so tying the
    // flight to it frame by frame looks jerky and can leave the logo stopped
    // half-way. There the whole flight plays as one timed animation once the
    // page starts to scroll, and plays back at the top.
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const play = (to) => gsap.to(state, {
      t:         to,
      duration:  to ? 1.1 : 0.8,
      ease:      "power2.inOut",
      onUpdate:  render,
      overwrite: true,
    });

    const ctx = gsap.context(() => {
      if (isTouch) {
        if (window.scrollY > 8) { state.t = 1; render(); }    // loaded already scrolled
        ScrollTrigger.create({
          trigger:     document.body,
          start:       8,
          onEnter:     () => play(1),
          onLeaveBack: () => play(0),
          onRefresh:   () => { measure(); render(); },
        });
        return;
      }

      // Mouse and trackpad: the flight follows the scroll position.
      gsap.to(state, {
        t:        1,
        ease:     "none",
        onUpdate: render,
        scrollTrigger: {
          trigger:   document.body,
          start:     0,
          end:       () => window.innerHeight,
          scrub:     0.6,
          onRefresh: () => { measure(); render(); },
        },
      });
    });

    return () => {
      ctx.revert();
      icon.style.opacity = "";
      Object.assign(logo.style, { opacity: "0", visibility: "", clipPath: "", transform: "" });
      if (dockedRef.current) {
        dockedRef.current = false;
        onDockedChangeRef.current?.(false);
      }
    };
  }, []);

  return (
    <div ref={wrapRef} className="fixed inset-0 pointer-events-none z-50">
      {/* Group 36.png — large standalone icon, anchored at hero centre */}
      <img
        ref={iconRef}
        src="/images/Group 36.png"
        alt=""
        style={{
          position:  "absolute",
          top:       "50%",
          left:      "50%",
          transform: "translate(-50%, -50%)",
          // 40vw cap: on phones a bigger icon makes the half-revealed logo
          // wider than the screen while it scales down.
          height:    "min(clamp(200px, 30vh, 380px), 40vw)",
          width:     "auto",
        }}
      />

      {/*
        logo.png — opacity:0 in inline style so it is invisible on first paint,
        before useEffect runs and takes over its transform / clip / opacity.
        left:50% + top:50% are the CSS anchor the transform is computed from.
      */}
      <img
        ref={logoRef}
        src="/images/logo.png"
        alt="Decograph Interiors"
        style={{
          position: "absolute",
          top:      "50%",
          left:     "50%",
          width:    "min(clamp(500px, 50vw, 800px), 84vw)",
          height:   "auto",
          opacity:  0,
        }}
      />
    </div>
  );
}
