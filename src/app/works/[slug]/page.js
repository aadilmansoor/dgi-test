"use client";


import { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubscribeModal from "@/components/SubscribeModal";
import PortalPopup from "@/components/PortalPopup";
import { useProject } from "@/hooks/useProject";
import { categoryHref } from "@/lib/categories";

export default function WorkDetailPage({ params }) {
  const { slug } = use(params);  
  const { data: project, isLoading } = useProject(slug || "");
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [isMoreInfoOpen, setIsMoreInfoOpen] = useState(false);


  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <h1 className="text-2xl font-light text-gray-900 mb-4">Project not found</h1>
        <Link href="/works" className="text-decograph-red hover:underline">
          Return to Works
        </Link>
      </div>
    );
  }

  // Sort gallery by order if available
  const galleryImages = project.gallery?.sort((a, b) => (a.order || 0) - (b.order || 0)) || [];
  const categoryName = project.category || "Interior Design";

  return (
    <div className="min-h-screen bg-white pt-14 md:pt-16">
      {/* Header */}
      <Header isWhiteBg={true} isDark={true} />

      {/* Content */}
      <main className="max-w-[1280px] mx-auto px-4 lg:px-12 py-12">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between py-4 border-b border-gray-900">
          <Link
            href={categoryHref(categoryName)}
            className="flex items-center gap-2 text-gray-900 hover:text-decograph-red transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span style={{ fontFamily: 'Deuterium Variable, sans-serif', fontWeight: 400, fontSize: '20px' }}>{categoryName}</span>
          </Link>
          <button 
            onClick={() => setIsMoreInfoOpen(!isMoreInfoOpen)}
            className="flex items-center gap-2 text-gray-900 hover:text-decograph-red transition-colors"
          >
            <svg 
              className={`w-6 h-6 transition-transform duration-300 ${isMoreInfoOpen ? 'rotate-45' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span style={{ fontFamily: 'Deuterium Variable, sans-serif', fontWeight: 400, fontSize: '20px' }}>More Info</span>
          </button>
        </div>

        {/* Expandable Description (First section usually contains summary) */}
        <div 
          className={`overflow-hidden transition-all duration-300 ease-in-out ${isMoreInfoOpen ? 'max-h-96 opacity-100 py-6' : 'max-h-0 opacity-0'}`}
        >
          <p 
            className="leading-relaxed border-b border-gray-200 pb-6 max-w-3xl"
            style={{ 
              fontFamily: 'Deuterium Variable, sans-serif',
              fontWeight: 400,
              fontSize: '16px',
              color: '#4B5563'
            }}
          >
             {project.sections && project.sections.length > 0 ? project.sections[0].description : "No description available."}
          </p>
        </div>

        <div className="mb-12 mt-12">
          <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
            <Link
              href={categoryHref(categoryName)}
              className="bg-gray-100 px-3 py-1 rounded-full hover:text-decograph-red transition-colors"
            >
              {categoryName}
            </Link>
            {project.year && <span>{project.year}</span>}
            {project.client && (
              <>
                <span>•</span>
                <span>Client: {project.client}</span>
              </>
            )}
          </div>
          <h1 className="text-5xl lg:text-6xl font-light text-gray-900 tracking-tight">
            {project.title || "Project Title"}
          </h1>
        </div>

        {/* Hero Image */}
        {project.coverImage && (
          <div className="relative mb-16 rounded-lg overflow-hidden bg-gray-100 group aspect-[3/2]">
            <Image
              src={project.coverImage}
              alt={project.title || "Project Cover"}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover transition-transform duration-1500 ease-out group-hover:scale-110"
              placeholder="empty"
            />
          </div>
        )}

        {/* Project Details (Dynamic Sections) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          {project.sections && project.sections.map((section, idx) => (
             <div key={idx} className="space-y-3">
               <h3 className="text-xl font-medium text-gray-900 mb-3">
                 {section.heading}
               </h3>
               <p className="text-gray-600 leading-relaxed">
                 {section.description}
               </p>
             </div>
          ))}
        </div>

        {/* Gallery Grid - Single column on mobile */}
        {galleryImages.length > 0 && (
          <div className="mb-16 grid grid-cols-1 gap-4 lg:hidden">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className="relative rounded-lg overflow-hidden bg-gray-100 aspect-[4/3]"
              >
                <img
                  src={img.imageUrl}
                  alt={`${project.title} gallery ${idx + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        )}

        {/* Bento Gallery Grid - Desktop only (First 4 images) */}
        {galleryImages.length > 0 && (
          <div 
            className="mb-16 gap-4 hidden lg:grid"
            style={{
              gridTemplateAreas: `"a a b b" "a a c d"`,
              gridTemplateColumns: '1fr 1fr 1fr 1fr',
              gridTemplateRows: '250px 250px',
            }}
          >
            {galleryImages.slice(0, 4).map((img, idx) => {
              const areas = ['a', 'b', 'c', 'd'];
              return (
                <div
                  key={idx}
                  className="relative rounded-lg overflow-hidden bg-gray-100"
                  style={{ gridArea: areas[idx] }}
                >
                  <img
                    src={img.imageUrl}
                    alt={`${project.title} gallery ${idx + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer onSubscribeClick={() => setIsSubscribeOpen(true)} />

      {/* Subscribe Modal */}
      {isSubscribeOpen && (
        <PortalPopup
          overlayColor="rgba(0, 0, 0, 0.8)"
          placement="Centered"
          onOutsideClick={() => setIsSubscribeOpen(false)}
        >
          <SubscribeModal onClose={() => setIsSubscribeOpen(false)} />
        </PortalPopup>
      )}
    </div>
  );
}
