"use client";

import { useState, useMemo, useRef, useLayoutEffect, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubscribeModal from "@/components/SubscribeModal";
import PortalPopup from "@/components/PortalPopup";
import CategoryTile from "@/components/CategoryTile";
import RevealRow from "@/components/RevealRow";
import ContactCtaSection from "@/components/ContactCtaSection";
import { useWorkCategories } from "@/hooks/useWorkCategories";

gsap.registerPlugin(ScrollTrigger);

const projectDescription = (project) =>
  project.sections?.[0]?.description || project.description || "";

export default function PortfolioPage() {
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const { data: categories, isLoading } = useWorkCategories();

  const heroImgRef   = useRef(null);
  const heroTitleRef = useRef(null);
  const heroSubRef   = useRef(null);
  const heroLineRef  = useRef(null);
  const introLeftRef = useRef(null);
  const introRightRef = useRef(null);

  // The latest work from each category.
  const featured = useMemo(() => categories
    .map((category) => ({ category, project: category.projects.find((p) => p.coverImage) }))
    .filter(({ project }) => project), [categories]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroImgRef.current, { scale: 1.1 }, { scale: 1, duration: 3.5, ease: "power2.out" });
      gsap.from(heroTitleRef.current, {
        clipPath: "inset(0 0 100% 0)", y: 32, duration: 1.5, ease: "power3.out", delay: 0.3,
      });
      gsap.from(heroSubRef.current, {
        opacity: 0, y: 14, letterSpacing: "0.7em", duration: 1.2, ease: "power3.out", delay: 1.1,
      });
      gsap.from(heroLineRef.current, {
        scaleX: 0, duration: 1.4, ease: "power3.inOut", delay: 1.5, transformOrigin: "center center",
      });
      gsap.from(introLeftRef.current, {
        clipPath: "inset(0 0 100% 0)", y: 20, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: introLeftRef.current, start: "top 82%" },
      });
      gsap.from(introRightRef.current, {
        opacity: 0, y: 36, duration: 1.1, ease: "power3.out", delay: 0.2,
        scrollTrigger: { trigger: introLeftRef.current, start: "top 82%" },
      });
    });
    return () => ctx.revert();
  }, []);

  // Sections below grow once the data arrives, so recalculate scroll positions.
  useEffect(() => {
    if (!isLoading) ScrollTrigger.refresh();
  }, [isLoading, categories]);

  return (
    <div className="min-h-screen bg-white">
      <Header isWhiteBg={false} isDark={false} hideOnScrollDown={true} />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative h-screen w-full overflow-hidden">
        <div ref={heroImgRef} className="absolute inset-0">
          <Image src="/images/build/build-hero-cover.webp" alt="Portfolio" fill priority unoptimized className="object-cover object-center" />
        </div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.65) 100%)" }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 ref={heroTitleRef} className="type-display text-white">
            Portfolio
          </h1>
          <p ref={heroSubRef} className="type-eyebrow text-white/60 mt-7">
            Decograph Interiors
          </p>
          <div ref={heroLineRef} className="w-24 h-px bg-white/30 mt-8" />
        </div>
      </section>

      {/* ── Intro ─────────────────────────────────────────────────────────── */}
      <section className="section-y !pb-10 md:!pb-14 px-6 lg:px-24 max-w-[1440px] mx-auto">
        <div>
          <h2 ref={introLeftRef} className="about-heading text-decograph-red mb-4">Our Works</h2>
          <div className="w-20 h-0.5 bg-decograph-red mb-8" />
          <p ref={introRightRef} className="type-body text-gray-600 max-w-2xl">
            From residential abodes that exude comfort and style to commercial
            spaces that inspire productivity and creativity, we orchestrate
            interiors that resonate with your purpose.
          </p>
        </div>
      </section>

      {/* ── Category Grid ─────────────────────────────────────────────────── */}
      <section className="pb-16 md:pb-24 px-4 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-[4/3] md:aspect-[634/676] bg-gray-100 animate-pulse" />
              ))}
            </div>
          ) : categories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {categories.map((category) => (
                <CategoryTile key={category.slug} {...category} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500">
              <p>No works found.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Featured work from each category ──────────────────────────────── */}
      {featured.length > 0 && (
        <section className="section-y !pb-0">
          <div className="px-6 lg:px-24 max-w-[1440px] mx-auto mb-14">
            <h2 className="about-heading text-decograph-red mb-4">Featured Projects</h2>
            <div className="w-20 h-0.5 bg-decograph-red" />
          </div>

          {featured.map(({ category, project }, idx) => (
            <RevealRow
              key={project.id || project.slug}
              num={String(idx + 1).padStart(2, "0")}
              eyebrow={category.name}
              title={project.title}
              description={projectDescription(project)}
              image={project.coverImage}
              href={`/works/${project.slug}`}
              reversed={idx % 2 !== 0}
            />
          ))}
        </section>
      )}

      <ContactCtaSection />

      <Footer onSubscribeClick={() => setIsSubscribeOpen(true)} />

      {isSubscribeOpen && (
        <PortalPopup
          overlayColor="rgba(0, 0, 0, 0.8)"
          placement="Centered"
          onOutsideClick={() => setIsSubscribeOpen(false)}
        >
          <SubscribeModal onClose={() => setIsSubscribeOpen(false)} />
        </PortalPopup>
      )}
    </div>
  );
}
