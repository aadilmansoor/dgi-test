"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
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

// "Food & Beverage" → ["Food &", "Beverage"]: the last word on its own line.
const titleLines = (name) => {
  const i = name.lastIndexOf(" ");
  return i > 0 ? [name.slice(0, i), name.slice(i + 1)] : [name];
};

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
          <Link
            key={tile.name}
            href={tile.href}
            className="group relative block aspect-[4/3] overflow-hidden bg-gray-200 md:aspect-[634/676]"
          >
            {tile.image && (
              <Image
                src={tile.image}
                alt={tile.name}
                fill
                sizes="(max-width: 768px) 100vw, 34vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-[11%] flex justify-center px-4">
              <h3
                className="century-gothic text-white"
                style={{ fontSize: "clamp(2.5rem, 4.5vw, 5.4rem)", lineHeight: 0.82, fontWeight: 400 }}
              >
                {titleLines(tile.name).map((line) => (
                  <span key={line} className="block">{line}</span>
                ))}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 flex justify-center px-6 lg:mt-[3.5vw]">
        <Link
          href="/works"
          className="century-gothic rounded-full border border-gray-400 px-[1.8em] py-[0.15em] uppercase text-[#6b6b6b] transition-colors duration-300 hover:border-decograph-red hover:text-decograph-red"
          style={{ fontSize: "clamp(1.1rem, 1.7vw, 2rem)" }}
        >
          View All Projects
        </Link>
      </div>
    </section>
  );
}
