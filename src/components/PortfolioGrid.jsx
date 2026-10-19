"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import CategoryTile from "@/components/CategoryTile";
import { useWorkCategories } from "@/hooks/useWorkCategories";

// Home page carousel of work categories; each tile opens that category's works.
export default function PortfolioGrid() {
  const { data: categories, isLoading } = useWorkCategories();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const touchStartX = useRef(null);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1024) setSlidesPerView(3);
      else if (w >= 640) setSlidesPerView(2);
      else setSlidesPerView(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, categories.length - slidesPerView);

  const goNext = () => setCurrentIndex((i) => Math.min(i + 1, maxIndex));
  const goPrev = () => setCurrentIndex((i) => Math.max(i - 1, 0));

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? goNext() : goPrev();
    touchStartX.current = null;
  };

  if (isLoading) {
    return (
      <section className="py-12 md:py-16 px-6 lg:px-20 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="h-10 w-48 bg-gray-100 animate-pulse" />
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-gray-100 animate-pulse" />
              <div className="w-10 h-10 bg-gray-100 animate-pulse" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="aspect-[4/3] bg-gray-100 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return (
      <section className="py-12 md:py-16 px-6 lg:px-20 bg-white">
        <div className="max-w-[1400px] mx-auto flex items-center justify-center h-64">
          <p className="text-gray-400">No projects available.</p>
        </div>
      </section>
    );
  }

  const progressPercent = Math.min(((currentIndex + slidesPerView) / categories.length) * 100, 100);

  return (
    <section className="relative py-12 md:py-16 px-6 lg:px-20 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8">
          <h2 className="about-heading text-gray-900">Our Projects</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400 hidden sm:block">
              {Math.min(currentIndex + slidesPerView, categories.length)} / {categories.length}
            </span>
            <button
              onClick={goPrev}
              disabled={currentIndex === 0}
              className="w-10 h-10 flex items-center justify-center border border-gray-300 hover:border-decograph-red hover:text-decograph-red transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goNext}
              disabled={currentIndex === maxIndex}
              className="w-10 h-10 flex items-center justify-center border border-gray-300 hover:border-decograph-red hover:text-decograph-red transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel Track */}
        <div
          className="overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)` }}
          >
            {categories.map((category) => (
              <div
                key={category.slug}
                className="flex-shrink-0 px-1.5"
                style={{ width: `${100 / slidesPerView}%` }}
              >
                <CategoryTile {...category} />
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-200">
            <div
              className="h-full bg-decograph-red transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* View All Link */}
        <div className="flex justify-center mt-10">
          <Link
            href="/works"
            className="inline-flex items-center gap-2 px-6 py-3 border border-decograph-red text-decograph-red hover:bg-decograph-red hover:text-white transition-colors text-sm font-normal"
          >
            View All Projects
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
