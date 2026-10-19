"use client";

// Vision and Mission, from the company profile.
const statements = [
  {
    title: "Vision",
    paragraphs: [
      "Our vision is to achieve sustainable growth by delivering high-quality projects using innovative technology.",
      "We are dedicated to collaborating with all stakeholders to build lasting partnerships and empower them to share in our journey.",
    ],
  },
  {
    title: "Mission",
    paragraphs: [
      "Offering an extensive array of construction services, thereby delivering optimal value to our customers.",
      "We aim to bolster their core operations and collectively ensure mutual success.",
    ],
  },
];

export default function VisionMissionSection() {
  return (
    <section className="px-6 lg:px-24 py-20 md:py-28">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20">
        {statements.map(({ title, paragraphs }) => (
          <div key={title} className="border-t-2 border-decograph-red pt-8">
            <h2 className="about-heading text-decograph-red mb-6">{title}</h2>
            {paragraphs.map((text, j) => (
              <p
                key={j}
                className={`about-text text-[#3d3b3b] leading-relaxed max-w-xl ${j < paragraphs.length - 1 ? "mb-4" : ""}`}
              >
                {text}
              </p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
