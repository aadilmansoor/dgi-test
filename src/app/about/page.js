"use client";

import Header from "@/components/Header";
import AboutHeroSection from "@/components/AboutHeroSection";
import TrustStrip from "@/components/TrustStrip";
import VisionMissionSection from "@/components/VisionMissionSection";
import TeamSection from "@/components/TeamSection";
import ServicesSection from "@/components/ServicesSection";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import PortfolioPreviewSection from "@/components/PortfolioPreviewSection";
import ClienteleSection from "@/components/ClienteleSection";
import ContactCtaSection from "@/components/ContactCtaSection";
import Footer from "@/components/Footer";

// After the hero, sections follow the company profile's order.
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header isWhiteBg={false} isDark={false} hideOnScrollDown={true} />

      <AboutHeroSection />
      <VisionMissionSection />
      <TrustStrip showTagline />
      <TeamSection />
      <ServicesSection />
      <HowWeWorkSection />
      <PortfolioPreviewSection />
      <ClienteleSection />
      <ContactCtaSection />

      <Footer />
    </div>
  );
}
