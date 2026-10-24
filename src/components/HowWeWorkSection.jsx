"use client";

import Image from "next/image";

// "How do we work" process, from the company profile. `focus` is the photo's
// focal point, keeping its subject in frame on the tall cards.
const phases = [
  {
    title: "Pre-design",
    image: "/images/hero/build-stage-1.webp",
    focus: "40% 50%",
    alt: "An empty room with a sofa, chest of drawers and floor lamp, before design begins",
    steps: ["Initial Consultation", "Gather Information", "Site Visit & Measurements"],
  },
  {
    title: "Design",
    image: "/images/hero/build-stage-3.webp",
    focus: "45% 50%",
    alt: "A finished open-plan living room with timber wall panelling and a grey sofa",
    steps: ["Concept Development", "Design Presentation", "Design Refinement"],
  },
  {
    title: "Construction & delivery",
    image: "/images/hero/build-stage-2.webp",
    focus: "55% 50%",
    alt: "Workers fixing steel reinforcement on a construction site",
    steps: [
      "Material Selection & Procurement",
      "Project Execution",
      "Regular Updates",
      "Installation & Styling",
      "Final Walkthrough & Handover",
      "Post-Project Support",
    ],
  },
];

// One tall photo card per phase, numbered because the phases run in order.
export default function HowWeWorkSection() {
  return (
    <section id="process" className="section-y px-6 lg:px-24">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="mb-16 max-w-2xl">
          <h2 className="about-heading text-decograph-red mb-6">How Do We Work</h2>
          <p className="type-body text-gray-600 mb-4">
            To achieve our primary objective of ensuring client satisfaction, we
            meticulously follow a series of steps aimed at achieving perfection
            in interior design.
          </p>
          <p className="type-body text-gray-600">
            Our processes are carefully crafted to create spaces that radiate
            tranquility and captivate the eye, all with the ultimate aim of
            delighting each and every client. Client happiness is at the heart
            of our business and drives our every effort.
          </p>
        </div>

        {/* Phase cards */}
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {phases.map((phase, idx) => (
            <li key={phase.title} className="group relative overflow-hidden min-h-[460px] md:min-h-[560px] flex flex-col justify-end">
              <Image
                src={phase.image}
                alt={phase.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: phase.focus }}
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.6) 45%, rgba(0,0,0,0.1) 100%)" }}
                aria-hidden="true"
              />

              <div className="relative p-8 text-white">
                <span className="block text-sm tracking-[0.2em] text-white/60 mb-3">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="service-title text-white mb-5">{phase.title}</h3>
                <ul className="space-y-2 border-t border-white/25 pt-5">
                  {phase.steps.map((step) => (
                    <li key={step} className="flex items-start gap-3 text-white/85 font-light">
                      <span className="mt-[0.6em] w-3 h-px bg-white/70 shrink-0" aria-hidden="true" />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
