import Link from "next/link";

// Closing "get in touch" panel, from the company profile.
export default function ContactCtaSection() {
  return (
    <section className="bg-decograph-red text-white py-24 px-6 lg:px-24">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="century-gothic text-4xl md:text-5xl leading-tight mb-8">
          Let&apos;s design a space you&apos;ll never want to leave
        </h2>
        <Link
          href="/contact"
          className="inline-block px-8 py-3 border-2 border-white uppercase tracking-widest text-sm hover:bg-white hover:text-decograph-red transition-colors"
        >
          Get in touch
        </Link>
      </div>
    </section>
  );
}
