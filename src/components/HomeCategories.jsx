"use client";

import { useMemo } from "react";
import Link from "next/link";
import CategoryTile from "@/components/CategoryTile";
import { useWorkCategories } from "@/hooks/useWorkCategories";
import { categoryHref } from "@/lib/categories";

// The three categories from the home page design, with its photos. One that
// has no published works yet is swapped for the newest other category.
const FEATURED = [
  { name: "Interior Design", image: "/images/home/category-interior-design.jpg" },
  { name: "Corporate Office", image: "/images/home/category-corporate-office.jpg" },
  { name: "Food & Beverage", image: "/images/home/category-food-beverage.jpg" },
];

// Ignores case and a trailing "s", so "Food & Beverage" finds "Food & Beverages".
const key = (name = "") => name.trim().toLowerCase().replace(/s$/, "");

export default function HomeCategories() {
  const { data: categories } = useWorkCategories();

  const tiles = useMemo(() => {
    const byName = new Map(categories.map((c) => [key(c.name), c]));
    const others = categories.filter((c) => !FEATURED.some((f) => key(f.name) === key(c.name)));

    return FEATURED.map((featured) => {
      const match = byName.get(key(featured.name));
      // Still loading, or the category exists: keep the design's tile.
      if (match || categories.length === 0) {
        return { ...featured, href: match ? `/works/category/${match.slug}` : categoryHref(featured.name) };
      }
      const other = others.shift();
      return other
        ? { name: other.name, image: other.coverImage, href: `/works/category/${other.slug}` }
        : { ...featured, href: categoryHref(featured.name) };
    });
  }, [categories]);

  return (
    <section className="bg-white pb-20 lg:pb-[5vw]">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
        {tiles.map((tile) => (
          <CategoryTile key={tile.name} name={tile.name} href={tile.href} image={tile.image} />
        ))}
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
