import Link from "next/link";
import Image from "next/image";

// "Food & Beverages" → ["Food &", "Beverages"]: the last word on its own line.
const titleLines = (name) => {
  const i = name.lastIndexOf(" ");
  return i > 0 ? [name.slice(0, i), name.slice(i + 1)] : [name];
};

// Category tile from the home page design: photo, bottom shade and the name in
// large type. Takes a category ({ name, slug, coverImage }) or an explicit
// `href` / `image`. The title is sized to the tile (container units), so it
// keeps its proportions in any grid.
export default function CategoryTile({ name, slug, coverImage, image, href, sizes = "(max-width: 768px) 100vw, 34vw" }) {
  const src = image ?? coverImage;

  return (
    <Link
      href={href ?? `/works/category/${slug}`}
      className="group relative block aspect-[4/3] overflow-hidden bg-gray-200 [container-type:inline-size] md:aspect-[634/676]"
    >
      {src && (
        <Image
          src={src}
          alt={name}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-[11%] flex justify-center px-4">
        <h3 className="text-white" style={{ fontSize: "clamp(2rem, 13.4cqw, 5.4rem)", lineHeight: 0.82, fontWeight: 400 }}>
          {titleLines(name).map((line) => (
            <span key={line} className="block">{line}</span>
          ))}
        </h3>
      </div>
    </Link>
  );
}
