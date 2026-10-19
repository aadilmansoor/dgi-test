"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 28, suffix: "+", label: "Engineers & Interior Designers" },
  { value: 105, suffix: "+", label: "Skilled Craftsmen" },
];

function CountUp({ target, suffix, display, inView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || display) return;

    let current = 0;
    const steps = 60;
    const increment = target / steps;
    const interval = 2000 / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [inView, target, display]);

  if (display) return <span>{display}</span>;
  return <span>{inView ? count.toLocaleString() + suffix : "0" + suffix}</span>;
}

// `showTagline` adds the company profile's strapline above the figures (We Are page).
export default function TrustStrip({ showTagline = false }) {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-decograph-red py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {showTagline && (
          <div className="text-center text-white mb-14">
            <p className="text-xs md:text-sm uppercase tracking-[0.45em] text-white/70 mb-3">Transforming</p>
            <h2 className="century-gothic text-3xl md:text-5xl font-bold tracking-wide mb-3">Visions into Reality</h2>
            <p className="text-xs md:text-sm uppercase tracking-widest text-white/70">Elevate your lifestyle by redefining your space</p>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 text-white">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`flex flex-col items-center text-center ${
                i < stats.length - 1 ? "md:border-r md:border-white/20" : ""
              }`}
            >
              <span className="text-5xl lg:text-6xl font-light tracking-tight mb-3">
                <CountUp
                  target={stat.value}
                  suffix={stat.suffix}
                  display={stat.display}
                  inView={inView}
                />
              </span>
              <span className="text-xs uppercase tracking-widest text-white/70 font-light">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
