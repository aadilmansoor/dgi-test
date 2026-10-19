"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubscribeModal from "@/components/SubscribeModal";
import PortalPopup from "@/components/PortalPopup";

export default function TermsConditionsPage() {
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);


  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Header */}
      <Header 
        isWhiteBg={true} 
        isDark={true} onSubscribeClick={() => setIsSubscribeOpen(true)}
      />

      {/* Content */}
      <main className="max-w-[1000px] mx-auto px-6 lg:px-24 py-16">
        <h1 className="font-serif text-5xl lg:text-6xl text-gray-900 mb-12">
          Terms & Conditions
        </h1>

        <div className="prose prose-lg max-w-none text-gray-600 space-y-12 leading-relaxed">
          <section>
            <p className="text-xl text-gray-900 font-light mb-8">
              Welcome to the Decograph Interiors website. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions concerning your use of the website.
            </p>
            <p>
              Please review these terms and conditions carefully. If you do not agree to these terms, you should not use this website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-gray-900 mb-4">1. Agreement to Terms</h2>
            <p>
              These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Decograph Interiors ("we," "us," or "our"), concerning your access to and use of our website. You agree that by accessing the Site, you have read, understood, and agreed to be bound by all of these Terms and Conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-gray-900 mb-4">2. Intellectual Property Rights</h2>
            <p>
              Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-gray-900 mb-4">3. User Representations</h2>
            <p className="mb-4">
              By using the Site, you represent and warrant that:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>All registration information you submit will be true, accurate, current, and complete.</li>
              <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
              <li>You have the legal capacity and you agree to comply with these Terms and Conditions.</li>
              <li>You will not access the Site through automated or non-human means, whether through a bot, script, or otherwise.</li>
              <li>You will not use the Site for any illegal or unauthorized purpose.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-gray-900 mb-4">4. Prohibited Activities</h2>
            <p className="mb-4">
              You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us. As a user of the Site, you agree not to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Systematically retrieve data or other content from the Site to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
              <li>Make any unauthorized use of the Site, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email.</li>
              <li>Use the Site to advertise or offer to sell goods and services.</li>
              <li>Circumvent, disable, or otherwise interfere with security-related features of the Site.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-gray-900 mb-4">5. Limitation of Liability</h2>
            <p>
              In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site, even if we have been advised of the possibility of such damages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-gray-900 mb-4">6. Governing Law</h2>
            <p>
              These Terms shall be governed by and defined following the laws of the United Arab Emirates. Decograph Interiors and yourself irrevocably consent that the courts of the United Arab Emirates shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-gray-900 mb-4">7. Contact Us</h2>
            <p className="mb-4">
              To resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
            </p>
            <div className="text-gray-900 font-medium">
              <p>Decograph Interiors</p>
              <p>England cluster X26, Office No S-12</p>
              <p>International City, Dubai, UAE</p>
              <p>Email: info@decographinteriors.com</p>
              <p>Phone: +971 56 397 0724</p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer onSubscribeClick={() => setIsSubscribeOpen(true)} showBorder={true} />

      {/* Subscribe Modal */}
      {isSubscribeOpen && (
        <PortalPopup
          overlayColor="rgba(255, 255, 255, 0.98)"
          placement="Centered"
          onOutsideClick={() => setIsSubscribeOpen(false)}
        >
          <SubscribeModal onClose={() => setIsSubscribeOpen(false)} />
        </PortalPopup>
      )}
    </div>
  );
}
