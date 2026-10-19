"use client";

import { useRef, useState, useEffect } from "react";

const heroVideos = [
  "/images/DRESSING_01%20(1).webm",
  "/images/DRESSING_02.webm",
  "/images/DRESSING_03.webm",
  "/images/DRESSING_04.webm",
  "/images/L%2001.webm",
  "/images/L%2002.webm",
  "/images/L%2003.webm",
  "/images/sheraton%20club%20lounge_01.webm",
  "/images/sheraton%20club%20lounge_02.webm",
  "/images/sheraton%20club%20lounge_03.webm",
  "/images/sheraton%20club%20lounge_04.webm",
];

// Hero images organized by row (7 images per row)
const heroImageRows = [
  // Row 1: images 1-7
  [
    "/images/hero/hero-1.webp",
    "/images/hero/hero-2.webp",
    "/images/hero/hero-3.webp",
    "/images/hero/hero-4.webp",
    "/images/hero/hero-5.webp",
    "/images/hero/hero-6.webp",
    "/images/hero/hero-7.webp",
  ],
  // Row 2: images 8-14
  [
    "/images/hero/hero-8.webp",
    "/images/hero/hero-9.webp",
    "/images/hero/hero-10.webp",
    "/images/hero/hero-11.webp",
    "/images/hero/hero-12.webp",
    "/images/hero/hero-13.webp",
    "/images/hero/hero-14.webp",
  ],
  // Row 3: images 15-17 + 1-4
  [
    "/images/hero/hero-15.webp",
    "/images/hero/hero-16.webp",
    "/images/hero/hero-17.webp",
    "/images/hero/hero-1.webp",
    "/images/hero/hero-2.webp",
    "/images/hero/hero-3.webp",
    "/images/hero/hero-4.webp",
  ],
  // Row 4: images 5-11
  [
    "/images/hero/hero-5.webp",
    "/images/hero/hero-6.webp",
    "/images/hero/hero-7.webp",
    "/images/hero/hero-8.webp",
    "/images/hero/hero-9.webp",
    "/images/hero/hero-10.webp",
    "/images/hero/hero-11.webp",
  ],
];

const CarouselRow = ({ rowIndex, isPaused, setIsPaused }) => {
  const images = heroImageRows[rowIndex] || heroImageRows[0];
  // Duplicate images multiple times for seamless infinite loop
  const allImages = [...images, ...images, ...images, ...images];
  const trackRef = useRef(null);

  return (
    <div 
      className="w-full overflow-hidden"
      ref={trackRef}
    >
      <div 
        className="carousel-track flex gap-[130px] pr-[130px]"
        style={{ animationPlayState: isPaused ? "paused" : "running" }}
      >
        {allImages.map((src, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 group relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="w-[160px] h-[100px] overflow-hidden">
              <img
                src={src}
                alt={`Interior Design Project ${idx + 1}`}
                className="w-full h-full object-cover"
                draggable="false"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// `fixed` pins the hero behind the page (desktop); otherwise it sits in the page flow (mobile).
export default function HeroCarousel({ fixed = true }) {
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);

  // When the index changes, load and play the new video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.src = heroVideos[currentIndex];
    video.load();
    video.play().catch(() => {});
  }, [currentIndex]);

  const handleEnded = () => {
    setCurrentIndex((prev) => (prev + 1) % heroVideos.length);
  };

  return (
    <section className={`${fixed ? "fixed inset-0 h-screen z-0" : "relative h-full"} bg-black overflow-hidden`}>
      {/* Background Video — cycles through all 11 clips */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        onEnded={handleEnded}
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={heroVideos[0]} type="video/webm" />
      </video>
      
      {/* Dark Overlay over Video */}
      <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none" />

      {/* Carousel Container */}
      <div className="relative z-10 h-full flex flex-col justify-evenly pointer-events-none">
        {/*
        <CarouselRow rowIndex={0} isPaused={isPaused} setIsPaused={setIsPaused} />
        <CarouselRow rowIndex={1} isPaused={isPaused} setIsPaused={setIsPaused} />
        <CarouselRow rowIndex={2} isPaused={isPaused} setIsPaused={setIsPaused} />
        <CarouselRow rowIndex={3} isPaused={isPaused} setIsPaused={setIsPaused} />
        */}
      </div>
    </section>
  );
}
