"use client";

import CategoryIcon from "@/components/CategoryIcon";
import { useServices } from "@/hooks/useServices";
import { serviceIconFor } from "@/lib/serviceIcons";

// Services from the company profile, shown until the Firestore list loads.
const fallbackServices = [
  { id: "space-planning", heading: "Space Planning", description: "For commercial & residential units" },
  { id: "design-concept", heading: "Design Concept", description: "Development consultation" },
  { id: "turnkey-fit-out", heading: "Turnkey Fit-Out", description: "Construction services" },
  { id: "bespoke-joinery", heading: "Bespoke Joinery", description: "Carpentry design" },
  { id: "mep", heading: "MEP", description: "HVAC, plumbing & electrical" },
  { id: "civil-works", heading: "Civil Works", description: "Partitions, ceiling & flooring" },
  { id: "renovation", heading: "Renovation", description: "Refurbishment services" },
  { id: "project-management", heading: "Project Management", description: "Consulting" },
];

const createdAtMillis = (service) => (service.createdAt?.seconds ?? 0) * 1000;

function ServiceCard({ service, idx }) {
  const heading = service.heading || service.title;

  return (
    <div className="group relative border border-gray-100 hover:border-decograph-red p-8 transition-all duration-300 hover:shadow-md bg-white cursor-default overflow-hidden">
      {/* Animated top border accent */}
      <div className="absolute top-0 left-0 w-0 group-hover:w-full h-0.5 bg-decograph-red transition-all duration-500" />

      {/* Background number */}
      <span className="absolute top-5 right-6 text-gray-100 group-hover:text-red-50 transition-colors text-4xl font-bold select-none leading-none">
        {String(idx + 1).padStart(2, "0")}
      </span>

      {/* Icon */}
      <div className="w-14 h-14 flex items-center justify-center bg-gray-50 group-hover:bg-red-50 transition-colors mb-6 text-decograph-red">
        <CategoryIcon iconSvg={serviceIconFor(heading)} size={28} />
      </div>

      {/* Title */}
      <h3 className="service-title text-gray-900 mb-3 group-hover:text-decograph-red transition-colors leading-snug">
        {heading}
      </h3>

      {/* Description */}
      <p className="service-description text-gray-500 leading-relaxed">
        {service.description}
      </p>
    </div>
  );
}

export default function ServicesSection() {
  const { data: fetchedServices = [], isLoading } = useServices();

  const services = fetchedServices.length > 0
    ? [...fetchedServices].sort((a, b) => createdAtMillis(a) - createdAtMillis(b))
    : fallbackServices;

  return (
    <section id="services" className="py-16 px-6 lg:px-24 max-w-[1440px] mx-auto">
      <h2 className="about-heading text-decograph-red mb-4">Services</h2>
      <p className="about-text text-gray-900 max-w-xl mb-12">
        Our services are designed to transform spaces through expert planning,
        skilled execution, and attention to detail across every stage of the project.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading
          ? fallbackServices.map((service) => (
              <div key={service.id} className="h-56 bg-gray-100 animate-pulse" />
            ))
          : services.map((service, idx) => (
              <ServiceCard key={service.id || idx} service={service} idx={idx} />
            ))}
      </div>
    </section>
  );
}
