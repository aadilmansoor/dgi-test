"use client";

import Image from "next/image";

// PLACEHOLDER DATA: replace names, roles and photos with the real team.
// Set `photo` to an image path (e.g. "/images/team/jane.webp") to replace the placeholder.
const team = [
  { name: "Team Member", role: "Founder & Managing Director", photo: null },
  { name: "Team Member", role: "Design Director", photo: null },
  { name: "Team Member", role: "Lead Interior Designer", photo: null },
  { name: "Team Member", role: "Project Manager", photo: null },
  { name: "Team Member", role: "MEP Engineer", photo: null },
  { name: "Team Member", role: "Site Engineer", photo: null },
  { name: "Team Member", role: "Joinery Supervisor", photo: null },
  { name: "Team Member", role: "Procurement Manager", photo: null },
];

function PhotoPlaceholder() {
  return (
    <div className="absolute inset-0 flex items-end justify-center bg-gray-100">
      <svg viewBox="0 0 120 120" className="w-3/4 text-white" fill="currentColor" aria-hidden="true">
        <circle cx="60" cy="44" r="24" />
        <path d="M14 120c0-26 20.6-44 46-44s46 18 46 44z" />
      </svg>
    </div>
  );
}

export default function TeamSection() {
  return (
    <section id="team" className="section-y px-6 lg:px-24 max-w-[1440px] mx-auto">
      {/* Section Header */}
      <div className="mb-14">
        <h2 className="about-heading text-decograph-red mb-4">Our Team</h2>
        <p className="type-body text-gray-600 max-w-xl">
          Skilled designers, architects and craftsmen who bring spaces to life.
        </p>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
        {team.map((member, idx) => (
          <div key={idx} className="group">
            <div className="relative aspect-[4/5] overflow-hidden mb-4">
              {member.photo ? (
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-500"
                />
              ) : (
                <PhotoPlaceholder />
              )}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-decograph-red scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
            </div>
            <h3 className="type-h3 text-gray-900 group-hover:text-decograph-red transition-colors">
              {member.name}
            </h3>
            <p className="service-description text-gray-600">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
