"use client";

import Image from "next/image";
import { useClienteleLogos } from "@/hooks/useClienteleLogos";

export default function ClienteleSection() {
  const { data: clients = [], isLoading } = useClienteleLogos();

  // Loading skeleton or null state
  if (isLoading) {
    return (
      <section id="clientele" className="section-y px-6 lg:px-24 max-w-[1440px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="about-heading text-decograph-red mb-4">Clientele</h2>
          <p className="type-body text-gray-600 max-w-xl mx-auto">
            Building long-term partnerships with leading organizations across diverse industries.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="w-full h-32 bg-gray-50 animate-pulse rounded-xl border border-gray-100" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="clientele" className="section-y px-6 lg:px-24 max-w-[1440px] mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="about-heading text-decograph-red mb-4">
          Clientele
        </h2>
        <p className="type-body text-gray-600 max-w-xl mx-auto">
          Building long-term partnerships with leading organizations across
          diverse industries.
        </p>
      </div>

      {/* Client Logos Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {clients.map((client) => (
          <div
            key={client.id}
            className="group relative w-full h-32 flex items-center justify-center p-6 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-gray-300 transition-all duration-300"
          >
            <div className="relative w-full h-full transition-all duration-300">
              {client.logoUrl && (
                <Image
                  src={client.logoUrl}
                  alt={client.name || "Client Logo"}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
