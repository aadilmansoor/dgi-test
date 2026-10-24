import { Didact_Gothic } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/QueryProvider";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SITE_URL } from "@/lib/site";

// Free stand-in for Century Gothic, the site's one typeface (see --font-brand
// in globals.css), on devices that don't have it installed.
const didactGothic = Didact_Gothic({
  variable: "--font-didact-gothic",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Decograph Interiors | Interior Design & Fit-Out Studio",
  description:
    "Decograph Interior Design Studio is a full-service interior design and fit-out company specializing in residential, commercial, retail, and hospitality spaces.",
  keywords: [
    "interior design",
    "fit-out",
    "commercial interiors",
    "residential design",
    "hospitality design",
    "retail interiors",
  ],
  openGraph: {
    title: "Decograph Interiors | Interior Design & Fit-Out Studio",
    description:
      "Decograph Interior Design Studio is a full-service interior design and fit-out company specializing in residential, commercial, retail, and hospitality spaces.",
    url: SITE_URL,
    siteName: "Decograph Interiors",
    images: [
      {
        url: "/images/og-logo.jpg", // Ensure this image exists or is replaced
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Decograph Interiors | Interior Design & Fit-Out Studio",
    description:
      "Decograph Interior Design Studio is a full-service interior design and fit-out company specializing in residential, commercial, retail, and hospitality spaces.",
    images: ["/images/og-logo.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    // data-scroll-behavior lets Next.js switch smooth scrolling off while it
    // resets scroll on route changes, so new pages open at the top.
    <html lang="en" className="scroll-smooth overscroll-none" data-scroll-behavior="smooth">
      <body
        className={`${didactGothic.variable} antialiased overscroll-none`}
      >
        <QueryProvider>
          {children}
        </QueryProvider>
        <WhatsAppButton />
      </body>
    </html>
  );
}
