"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubscribeModal from "@/components/SubscribeModal";
import PortalPopup from "@/components/PortalPopup";
import CategoryIcon from "@/components/CategoryIcon";
import WorksBentoGrid, { BentoGridSkeleton } from "@/components/WorksBentoGrid";
import { useWorkCategories } from "@/hooks/useWorkCategories";

export default function WorkCategoryPage({ params }) {
  const { category: slug } = use(params);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const { data: categories, isLoading } = useWorkCategories();
  const category = categories.find((c) => c.slug === slug);


  useEffect(() => {
    if (category) document.title = `${category.name} | Our Work`;
  }, [category]);

  return (
    <div className="min-h-screen bg-white pt-14 md:pt-16">
      {/* Header */}
      <Header isWhiteBg={true} isDark={true} />

      <section className="py-8 px-4 lg:px-8">
        <div className="max-w-[1400px] mx-auto space-y-3">
          {/* Navigation Bar */}
          <div className="flex items-center justify-between gap-4 pb-4 mb-5 border-b border-gray-900">
            <Link
              href="/works"
              className="flex items-center gap-2 text-gray-900 hover:text-decograph-red transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-xl">Our Work</span>
            </Link>

            {category && (
              <div className="flex items-center gap-3 text-gray-900 min-w-0">
                <span className="text-decograph-red">
                  <CategoryIcon iconSvg={category.iconSvg} iconUrl={category.iconUrl} size={28} />
                </span>
                <h1 className="truncate text-xl">
                  {category.name}
                </h1>
              </div>
            )}
          </div>

          {isLoading ? (
            <>
              <div className="md:hidden space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-64 bg-gray-100 animate-pulse w-full"></div>
                ))}
              </div>
              <BentoGridSkeleton />
            </>
          ) : category ? (
            <WorksBentoGrid
              works={category.projects}
              icon={{ iconSvg: category.iconSvg, iconUrl: category.iconUrl }}
            />
          ) : (
            <div className="text-center py-20 text-gray-500">
              <p className="mb-4">This category has no works yet.</p>
              <Link href="/works" className="text-decograph-red hover:underline">
                See all categories
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer onSubscribeClick={() => setIsSubscribeOpen(true)} />

      {/* Subscribe Modal */}
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
