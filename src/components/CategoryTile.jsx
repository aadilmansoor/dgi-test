"use client";

import Link from "next/link";
import Image from "next/image";
import CategoryIcon from "@/components/CategoryIcon";
import { shimmer, toBase64 } from "@/lib/shimmer";

// Category tile: cover photo with the category's icon, name and work count
export default function CategoryTile({ name, slug, coverImage, iconSvg, iconUrl, projects }) {
  const count = projects.length;

  return (
    <Link
      href={`/works/category/${slug}`}
      className="relative block overflow-hidden group aspect-[4/3] bg-gray-100"
    >
      {coverImage && (
        <Image
          src={coverImage}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 525))}`}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}

      {/* Always-visible label so categories can be read without hovering */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-5 pb-5 pt-16 text-white flex items-end gap-3 transition-opacity duration-300 md:group-hover:opacity-0">
        <CategoryIcon iconSvg={iconSvg} iconUrl={iconUrl} size={28} />
        <div className="min-w-0">
          <span className="portfolio-title2 block leading-tight truncate">{name}</span>
          <span className="portfolio-title1 block opacity-80 text-sm">
            {count} {count === 1 ? "project" : "projects"}
          </span>
        </div>
      </div>

      {/* Desktop hover: brand overlay, matching the work tiles */}
      <div className="hidden md:flex absolute inset-0 bg-decograph-red opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-col items-center justify-center text-white pointer-events-none">
        <CategoryIcon iconSvg={iconSvg} iconUrl={iconUrl} size={48} />
        <span className="portfolio-title2 mt-4">{name}</span>
        <span className="portfolio-title1 mt-1">
          View {count} {count === 1 ? "project" : "projects"}
        </span>
      </div>
    </Link>
  );
}
