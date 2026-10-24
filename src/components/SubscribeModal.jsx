"use client";

import { useState } from "react";
import Link from "next/link";
import { X, Loader2 } from "lucide-react";
import SearchableSelect from "./SearchableSelect";
import { submitSubscriptionForm } from "@/lib/firestore";

const industries = [
  "Industry",
  "Aerospace",
  "Agricultural and Horticultural",
  "Airline",
  "Alternative Fuels",
  "Apparel and Clothing",
  "Automotive",
  "Banking",
  "Beverages Alcohol",
  "Beverages Non-Alcoholic",
  "Biotechnology",
  "Business Services",
  "Charitable Organizations",
  "Chemicals",
  "Computer Hardware",
  "Computer Services",
  "Computer Software",
  "Construction",
  "Consumer Electronics",
  "Consumer Goods",
  "Cosmetics, Toiletries and Beauty Aids",
  "Cultural Institutions",
  "DTC Prescription Products",
  "Education",
  "Electricity",
  "Energy Equipment and Energy Services",
  "Entertainment",
  "Environmental Services and Equipment",
  "Fashion Accessories",
  "Food",
  "Freight Shipping Logistics",
  "Government",
  "Health and Wellness",
  "Healthcare Services",
  "Home Furnishings and Fixtures",
  "Hotel and Lodging",
  "Industrial Manufacturing",
  "Insurance",
  "Legal",
  "Leisure",
  "Luxury Goods",
  "Marine Transportation",
  "Media",
  "Medical Equipment and Supplies",
  "Membership Organizations",
  "Metals and Mining",
  "Music",
  "Oil, Gas Exploration and Production",
  "OTC Non-prescription Products",
  "Pets",
  "Pharmaceuticals",
  "Publishing",
  "Railroads",
  "Real Estate",
  "Renewable Energy",
  "Retail",
  "Security Products and Services",
  "Shoes",
  "Sports Leagues",
  "Sports Products and Sports Apparel",
  "Telecommunications",
  "Telecommunications Equipment",
  "Tobacco",
  "Travel and Tourism Services",
  "Water Services and Equipment",
  "Financial Services",
  "Marketing Communications",
  "Public Relations",
  "Restaurants",
  "Technology",
  "Toys",
  "Confidential",
];

const countries = [
  "Country",
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "Greater China Region - Mainland China",
  "Colombia",
  "Comoros",
  "Congo, Democratic Republic of the",
  "Congo, Republic of the",
  "Costa Rica",
  "Cote D'Ivoire",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Greater China Region - Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "North Korea",
  "South Korea",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macao",
  "North Macedonia",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion Island",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Greater China Region - Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

export default function SubscribeModal({ onClose }) {
  const [formData, setFormData] = useState({
    fullName: "",
    jobTitle: "",
    company: "",
    industry: "Industry",
    country: "Country",
    email: "",
  });

  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      await submitSubscriptionForm(formData);
      setStatus("success");
      // Close modal after success message is shown
      setTimeout(() => {
        onClose();
        setStatus("idle");
        setFormData({
          fullName: "",
          jobTitle: "",
          company: "",
          industry: "Industry",
          country: "Country",
          email: "",
        });
      }, 2000);
    } catch (error) {
      console.error("Error submitting subscription:", error);
      setStatus("error");
      setErrorMessage(error.message === "Email already subscribed" 
        ? "This email is already subscribed to our newsletter." 
        : "Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="fixed inset-0 md:relative md:inset-auto w-full h-full md:w-[960px] md:h-auto bg-white/95 backdrop-blur-sm shadow-2xl overflow-y-auto md:overflow-hidden border-0 md:border border-black">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-1 hover:opacity-70 transition-opacity cursor-pointer z-50 bg-white/50 rounded-full md:bg-transparent"
      >
        <X className="w-8 h-8 md:w-6 md:h-6 text-gray-600" />
      </button>

      <div className="p-6 pt-14 md:p-16 lg:p-20">
        {/* Heading */}
        <h2 className="type-h2 text-decograph-red mb-6 md:mb-12">
          Subscribe to stay inspired by thoughtful design
        </h2>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
          {/* Left - Description */}
          <div className="text-black leading-relaxed">
            <p>
              At Decograph Interiors, we believe great spaces begin with great
              ideas. Subscribe to receive curated insights, design inspirations,
              project highlights, and industry perspectives straight to your
              inbox. Stay connected with our latest work across residential,
              retail, and commercial interiors.
            </p>
          </div>

          {/* Right - Form */}
          <form id="subscribe-form" onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            {/* Text Inputs */}
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full border-b border-black pb-2 md:pb-3 placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors ${
                formData.fullName ? "text-gray-900" : "text-gray-400"
              }`}
            />
            <input
              type="text"
              name="jobTitle"
              placeholder="Job Title"
              value={formData.jobTitle}
              onChange={handleChange}
              className={`w-full border-b border-black pb-2 md:pb-3 placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors ${
                formData.jobTitle ? "text-gray-900" : "text-gray-400"
              }`}
            />
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={formData.company}
              onChange={handleChange}
              className={`w-full border-b border-black pb-2 md:pb-3 placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors ${
                formData.company ? "text-gray-900" : "text-gray-400"
              }`}
            />

            {/* Industry Dropdown */}
            <SearchableSelect
              options={industries}
              value={formData.industry}
              onChange={handleChange}
              placeholder="Industry"
              name="industry"
            />

            {/* Country Dropdown */}
            <SearchableSelect
              options={countries}
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
              name="country"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border-b border-black pb-2 md:pb-3 placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors ${
                formData.email ? "text-gray-900" : "text-gray-400"
              }`}
            />
          </form>
        </div>
        
        {/* Bottom Row - Submit and Privacy Policy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 mt-12 md:mt-8">
          <div>
            <p className="text-sm text-gray-900 max-w-[280px]">
              Please review our{" "}
              <Link href="/privacy-policy" className="text-decograph-red underline hover:opacity-80 transition-opacity">
                Privacy Policy
              </Link>{" "}
              to understand how we handle your personal information.
            </p>
          </div>
          <div>
            <button
              type="submit"
              form="subscribe-form"
              disabled={status === "loading" || status === "success"}
              className="text-red-500 text-lg font-normal hover:opacity-70 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {status === "loading" && <Loader2 className="w-5 h-5 animate-spin" />}
              {status === "success" ? "Subscribed!" : "Submit"}
            </button>
            {status === "error" && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
