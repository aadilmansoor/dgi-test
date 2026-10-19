"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CategoryIcon from "@/components/CategoryIcon";
import { shimmer, toBase64 } from "@/lib/shimmer";

// Portfolio item component
const PortfolioItem = ({ coverImage, slug, title, category, icon, isRevealed, onReveal }) => {
  const [isNavigating, setIsNavigating] = useState(false);

  const handleTouch = () => {
    // On touch, immediately reveal the card
    if (!isRevealed) {
      onReveal();
    }
  };

  const handleClick = (e) => {
    // On mobile, prevent default navigation and reveal first
    if (window.innerWidth < 768) {
      if (!isRevealed && !isNavigating) {
        e.preventDefault();
        onReveal();
        setIsNavigating(true);
        // Delay navigation to show the reveal animation
        setTimeout(() => {
          window.location.href = `/works/${slug || '#'}`;
        }, 300);
      }
    }
  };

  return (
    <Link
      href={`/works/${slug || '#'}`}
      className="relative overflow-hidden group cursor-pointer block h-full w-full"
      onTouchStart={handleTouch}
      onClick={handleClick}
    >
      {coverImage && (
        <Image
          src={coverImage}
          alt={title || "Portfolio Item"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={false}
        />
      )}

      {/* Desktop: CSS hover (original behavior) */}
      <div className="hidden md:flex absolute inset-0 bg-decograph-red opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-col items-center justify-center text-white pointer-events-none">
        <CategoryIcon {...icon} />
        <span className="portfolio-title1 mt-4">{category || "Category"}</span>
        <span className="portfolio-title2 mt-1">{title || "Project Name"}</span>
      </div>

      {/* Mobile: State-based reveal (persistent until another card is touched) */}
      <div className={`md:hidden absolute inset-0 bg-decograph-red transition-opacity duration-300 flex flex-col items-center justify-center text-white pointer-events-none ${
        isRevealed ? "opacity-100" : "opacity-0"
      }`}>
        <CategoryIcon {...icon} />
        <span className="portfolio-title1 mt-4">{category || "Category"}</span>
        <span className="portfolio-title2 mt-1">{title || "Project Name"}</span>
      </div>
    </Link>
  );
};

// Bento Grid Skeleton Component
export const BentoGridSkeleton = () => {
  const SkeletonItem = () => (
    <div className="w-full h-full bg-gray-100 animate-pulse rounded-none" />
  );

  return (
    <div
      className="hidden md:grid gap-3"
      style={{
        gridTemplateAreas: `
          "a b"
          "a c"
        `,
        gridTemplateColumns: '349fr 881fr',
        gridTemplateRows: '229fr 601fr',
        aspectRatio: '1230 / 830',
      }}
    >
      {/* Box A - 3 stacked images */}
      <div className="grid gap-3" style={{ gridArea: 'a', gridTemplateRows: '348fr 204fr 238fr' }}>
        {[0, 1, 2].map(i => <SkeletonItem key={i} />)}
      </div>

      {/* Box B - 3 horizontal images */}
      <div className="grid gap-3" style={{ gridArea: 'b', gridTemplateColumns: '311fr 227fr 282fr' }}>
         {[3, 4, 5].map(i => <SkeletonItem key={i} />)}
      </div>

      {/* Box C - 2 columns */}
      <div className="grid gap-3" style={{ gridArea: 'c', gridTemplateColumns: '401fr 440fr' }}>
        <div className="grid gap-3" style={{ gridTemplateRows: '217fr 344fr' }}>
           {[6, 7].map(i => <SkeletonItem key={i} />)}
        </div>
        <div className="grid gap-3" style={{ gridTemplateRows: '323fr 238fr' }}>
           {[8, 9].map(i => <SkeletonItem key={i} />)}
        </div>
      </div>
    </div>
  );
};

// Grid positions:
// Box A: positions 0, 1, 2 (3 vertical images)
// Box B: positions 3, 4, 5 (3 horizontal images)
// Box C-Left: positions 6, 7 (2 stacked images)
// Box C-Right: positions 8, 9 (2 stacked images)
const IMAGES_PER_GRID = 10;

// Bento Grid component - always maintains full structure
const BentoGrid = ({ works, startIndex, icon }) => {
  const [revealedIndex, setRevealedIndex] = useState(null);
  const gridWorks = works.slice(startIndex, startIndex + IMAGES_PER_GRID);

  // Get image at specific position or null
  const getWork = (position) => gridWorks[position] || null;

  const renderSlot = (pos) => {
    const work = getWork(pos);
    return work ? (
      <PortfolioItem
        key={pos}
        {...work}
        icon={icon}
        isRevealed={revealedIndex === pos}
        onReveal={() => setRevealedIndex(pos)}
      />
    ) : <div key={pos} className="bg-gray-50/50" />;
  };

  return (
    <div
      className="hidden md:grid gap-3"
      style={{
        gridTemplateAreas: `"a b" "a c"`,
        gridTemplateColumns: '349fr 881fr',
        gridTemplateRows: '229fr 601fr',
        aspectRatio: '1230 / 830',
      }}
    >
      {/* Box A - 3 stacked images (positions 0, 1, 2) */}
      <div
        className="grid gap-3"
        style={{
          gridArea: 'a',
          gridTemplateRows: '348fr 204fr 238fr',
        }}
      >
        {[0, 1, 2].map(renderSlot)}
      </div>

      {/* Box B - 3 horizontal images (positions 3, 4, 5) */}
      <div
        className="grid gap-3"
        style={{
          gridArea: 'b',
          gridTemplateColumns: '311fr 227fr 282fr',
        }}
      >
        {[3, 4, 5].map(renderSlot)}
      </div>

      {/* Box C - 2 columns with stacked images each */}
      <div
        className="grid gap-3"
        style={{
          gridArea: 'c',
          gridTemplateColumns: '401fr 440fr',
        }}
      >
        {/* Left column (positions 6, 7) */}
        <div
          className="grid gap-3"
          style={{ gridTemplateRows: '217fr 344fr' }}
        >
          {[6, 7].map(renderSlot)}
        </div>

        {/* Right column (positions 8, 9) */}
        <div
          className="grid gap-3"
          style={{ gridTemplateRows: '323fr 238fr' }}
        >
          {[8, 9].map(renderSlot)}
        </div>
      </div>
    </div>
  );
};

// Layouts for a final group of fewer than 10 works, so no slot is left empty.
// Each letter is one work, in order; a repeated letter spans that area.
const FIT_LAYOUTS = {
  1: { areas: ['a'], columns: '1fr' },
  2: { areas: ['a b'], columns: '1fr 1fr' },
  3: { areas: ['a b', 'a c'], columns: '3fr 2fr' },
  4: { areas: ['a b', 'c d'], columns: '1fr 1fr' },
  5: { areas: ['a b c', 'a d e'], columns: '2fr 1fr 1fr' },
  6: { areas: ['a b c', 'd e f'], columns: '1fr 1fr 1fr' },
  7: { areas: ['a b c', 'a d e', 'f f g'], columns: '2fr 1fr 1fr' },
  8: { areas: ['a b c', 'a d e', 'f g h'], columns: '2fr 1fr 1fr' },
  9: { areas: ['a b c', 'd e f', 'g h i'], columns: '1fr 1fr 1fr' },
};

// Grid sized to its works: used for the last group when it has fewer than 10.
const FitGrid = ({ works, icon }) => {
  const [revealedIndex, setRevealedIndex] = useState(null);
  const layout = FIT_LAYOUTS[works.length];

  return (
    <div
      className="hidden md:grid gap-3"
      style={{
        gridTemplateAreas: layout.areas.map((row) => `"${row}"`).join(' '),
        gridTemplateColumns: layout.columns,
        gridAutoRows: 'clamp(220px, 24vw, 340px)',
      }}
    >
      {works.map((work, pos) => (
        <div key={work.id || pos} style={{ gridArea: String.fromCharCode(97 + pos) }}>
          <PortfolioItem
            {...work}
            icon={icon}
            isRevealed={revealedIndex === pos}
            onReveal={() => setRevealedIndex(pos)}
          />
        </div>
      ))}
    </div>
  );
};

/** Works laid out as stacked cards on mobile; on desktop, bento grids of 10 then a grid sized to the rest. */
export default function WorksBentoGrid({ works, icon }) {
  const [mobileRevealedIndex, setMobileRevealedIndex] = useState(null);
  const fullGrids = Math.floor(works.length / IMAGES_PER_GRID);
  const remainder = works.slice(fullGrids * IMAGES_PER_GRID);

  return (
    <>
      {/* Mobile View: Simple stacked layout */}
      <div className="md:hidden space-y-3">
        {works.map((work, idx) => (
          <div key={work.id || idx} className="h-64">
            <PortfolioItem
              {...work}
              icon={icon}
              isRevealed={mobileRevealedIndex === idx}
              onReveal={() => setMobileRevealedIndex(idx)}
            />
          </div>
        ))}
      </div>

      {/* Desktop: Multiple Bento Grids */}
      {Array.from({ length: fullGrids }).map((_, gridIndex) => (
        <BentoGrid
          key={gridIndex}
          works={works}
          icon={icon}
          startIndex={gridIndex * IMAGES_PER_GRID}
        />
      ))}
      {remainder.length > 0 && <FitGrid works={remainder} icon={icon} />}
    </>
  );
}
