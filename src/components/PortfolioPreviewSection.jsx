"use client";

import Link from "next/link";
import CategoryTile from "@/components/CategoryTile";
import { useWorkCategories } from "@/hooks/useWorkCategories";

// Project categories, in the order they appear in the company profile.
export default function PortfolioPreviewSection() {
  const { data: categories, isLoading } = useWorkCategories();

  return (
    <section id="portfolio" className="section-y px-6 lg:px-24 max-w-[1440px] mx-auto">
      {/* Section Header */}
      <div className="flex items-end justify-between gap-6 mb-12">
        <h2 className="about-heading text-decograph-red">Projects</h2>
        <Link
          href="/works"
          className="btn btn-outline shrink-0"
        >
          View All Projects
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {isLoading
          ? [...Array(6)].map((_, i) => (
              <div key={i} className="aspect-[4/3] md:aspect-[634/676] bg-gray-100 animate-pulse" />
            ))
          : categories.map((category) => (
              <CategoryTile key={category.slug} {...category} />
            ))}
      </div>
    </section>
  );
}
