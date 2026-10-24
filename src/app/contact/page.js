"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubscribeModal from "@/components/SubscribeModal";
import PortalPopup from "@/components/PortalPopup";
import { submitEnquiry } from "@/lib/firestore";

export default function ContactPage() {
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await submitEnquiry(formData);
      setSubmitStatus("success");
      // Reset form on success
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Header */}
      <Header isWhiteBg={true} isDark={true} />

      {/* Content */}
      <main className="section-y max-w-[1280px] mx-auto px-6 lg:px-24">
        {/* Page Header */}
        <div className="mb-16">
          <h1 className="type-h1 text-decograph-red mb-4">
            Contact Us
          </h1>
          <p className="type-body text-gray-600 max-w-xl">
            Let's create something extraordinary together. Reach out to discuss
            your next interior design project.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-900 mb-16" />

        {/* Contact Form & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <div>
            <h2 className="type-h2 text-decograph-red mb-6">
              Get in Touch
            </h2>
            <p className="text-gray-600 mb-8">
              Have a project in mind? We'd love to hear from you. Fill out the
              form and we'll get back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-decograph-red focus:ring-1 focus:ring-decograph-red outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-decograph-red focus:ring-1 focus:ring-decograph-red outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+971 50 123 4567"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-decograph-red focus:ring-1 focus:ring-decograph-red outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="How can we help?"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-decograph-red focus:ring-1 focus:ring-decograph-red outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your project..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-decograph-red focus:ring-1 focus:ring-decograph-red outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-solid"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              {submitStatus === "success" && (
                <p className="text-green-600 mt-4">
                  Thank you! Your message has been sent successfully.
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-red-600 mt-4">
                  Something went wrong. Please try again later.
                </p>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="type-h3 text-gray-900 mb-3">
                Office Location
              </h3>
              <div className="text-gray-600 space-y-1">
                <p>England cluster X26</p>
                <p>Office No S-12</p>
                <p>International City</p>
                <p>Dubai, UAE</p>
              </div>
            </div>

            <div>
              <h3 className="type-h3 text-gray-900 mb-3">Email</h3>
              <div className="text-gray-600 space-y-1">
                <p>info@decographinteriors.com</p>
              </div>
            </div>

            <div>
              <h3 className="type-h3 text-gray-900 mb-3">Phone</h3>
              <div className="text-gray-600 space-y-1">
                <p>+971-563970724</p>
              </div>
            </div>

            <div>
              <h3 className="type-h3 text-gray-900 mb-3">
                Business Hours
              </h3>
              <div className="text-gray-600 space-y-1">
                <p>Monday - Saturday: 9:00 AM - 6:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer onSubscribeClick={() => setIsSubscribeOpen(true)} />

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
