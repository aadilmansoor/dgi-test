"use client";

import { useMemo } from "react";
import Link from "next/link";
import CategoryTile from "@/components/CategoryTile";
import { useWorkCategories } from "@/hooks/useWorkCategories";

// The three categories from the home page design, each shown with its own
// cover photo. One that has no published works yet is swapped for the newest
// other category.
const FEATURED = ["Interior Design", "Corporate Office", "Food & Beverage"];

// Ignores case and a trailing "s", so "Food & Beverage" finds "Food & Beverages".
const key = (name = "") => name.trim().toLowerCase().replace(/s$/, "");

export default function HomeCategories() {
  const { data: categories, isLoading } = useWorkCategories();

  const tiles = useMemo(() => {
    const byName = new Map(categories.map((c) => [key(c.name), c]));
    const others = categories.filter((c) => !FEATURED.some((name) => key(name) === key(c.name)));
    return FEATURED.map((name) => byName.get(key(name)) ?? others.shift()).filter(Boolean);
  }, [categories]);

  return (
    <section className="bg-white pb-20 lg:pb-[5vw]">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
        {isLoading
          ? FEATURED.map((name) => (
              <div key={name} className="aspect-[4/3] md:aspect-[634/676] bg-gray-100 animate-pulse" />
            ))
          : tiles.map((category) => <CategoryTile key={category.slug} {...category} />)}
      </div>

      <div className="mt-12 flex justify-center px-6 lg:mt-[3.5vw]">
        <Link
          href="/works"
          className="btn btn-outline btn-lg"
        >
          View All Projects
        </Link>
      </div>
    </section>
  );
}
