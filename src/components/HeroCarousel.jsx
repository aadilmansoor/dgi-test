"use client";

import { useEffect, useRef, useState } from "react";

// The 11 project clips, in order, re-encoded at two sizes: 1080p for desktop
// and 720p for phones (much smaller downloads on mobile data).
const CLIP_COUNT = 11;
const clipSrc = (i, res) => `/videos/hero/${res}/${String(i + 1).padStart(2, "0")}.webm`;

const FADE_S = 0.8; // crossfade length, and how early before the end it starts

// Home hero: the clips play one after another, pinned behind the page while
// the content scrolls up over it.
//
// Two <video> slots take turns: while one plays, the next clip is already
// loading in the other, hidden one. Near the end of a clip the hidden slot
// starts and fades in over it, so the browser never has to blank a video
// while it loads a new file (the black blink between clips). If the next clip
// isn't ready yet, the current one holds its last frame until it is.
export default function HeroCarousel() {
  const slotARef = useRef(null);
  const slotBRef = useRef(null);
  const [front, setFront] = useState(0);         // slot on top, fading in
  const [fadingFrom, setFadingFrom] = useState(null); // slot underneath during a fade

  useEffect(() => {
    const slots = [slotARef.current, slotBRef.current];
    const res = window.matchMedia("(max-width: 767px)").matches ? 720 : 1080;
    const clipIn = [0, 1];  // clip index loaded in each slot
    let frontSlot = 0;
    let switching = false;
    let fadeTimer;

    const load = (slot, clip) => {
      clipIn[slot] = clip;
      slots[slot].src = clipSrc(clip, res);
      slots[slot].load();
    };

    const swap = () => {
      if (switching) return;
      const back = 1 - frontSlot;
      const next = slots[back];
      // Not buffered yet: wait for it (the playing clip holds its last frame)
      if (next.readyState < 3) {
        next.addEventListener("canplay", swap, { once: true });
        return;
      }
      switching = true;
      next.currentTime = 0;
      next.play().catch(() => {});
      const old = frontSlot;
      frontSlot = back;
      setFadingFrom(old);
      setFront(back);

      // Once the fade is over, queue the clip after next in the slot that faded out
      fadeTimer = setTimeout(() => {
        setFadingFrom(null);
        slots[old].pause();
        load(old, (clipIn[back] + 1) % CLIP_COUNT);
        switching = false;
      }, FADE_S * 1000 + 100);
    };

    const onTime = (slot) => () => {
      const v = slots[slot];
      if (slot !== frontSlot || !v.duration) return;
      if (v.duration - v.currentTime <= FADE_S) swap();
    };
    const onEnded = (slot) => () => {
      if (slot === frontSlot) swap(); // safety net if timeupdate missed the window
    };

    const listeners = slots.map((v, slot) => {
      const time = onTime(slot);
      const ended = onEnded(slot);
      v.addEventListener("timeupdate", time);
      v.addEventListener("ended", ended);
      return () => {
        v.removeEventListener("timeupdate", time);
        v.removeEventListener("ended", ended);
        v.removeEventListener("canplay", swap);
      };
    });

    load(0, 0);
    slots[0].play().catch(() => {});
    load(1, 1);

    return () => {
      clearTimeout(fadeTimer);
      listeners.forEach((off) => off());
    };
  }, []);

  // The incoming clip fades in on top while the outgoing one stays fully
  // visible underneath, so the fade never dips towards the black behind.
  const slotProps = (slot) => ({
    muted: true,
    playsInline: true,
    preload: "auto",
    className: "absolute inset-0 w-full h-full object-cover transition-opacity ease-linear",
    style: {
      zIndex: front === slot ? 2 : 1,
      opacity: front === slot || fadingFrom === slot ? 1 : 0,
      transitionDuration: front === slot ? `${FADE_S * 1000}ms` : "0ms",
    },
  });

  return (
    <section className="fixed inset-0 h-screen z-0 bg-black overflow-hidden">
      <video ref={slotARef} {...slotProps(0)} />
      <video ref={slotBRef} {...slotProps(1)} />

      {/* Dark overlay so the logo reads over every clip */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
    </section>
  );
}
