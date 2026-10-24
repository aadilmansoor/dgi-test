import Link from "next/link";

// Closing "get in touch" panel, from the company profile.
export default function ContactCtaSection() {
  return (
    <section className="section-y bg-decograph-red text-white px-6 lg:px-24">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="type-h2 mb-8">
          Let&apos;s design a space you&apos;ll never want to leave
        </h2>
        <Link
          href="/contact"
          className="btn btn-light"
        >
          Get in touch
        </Link>
      </div>
    </section>
  );
}
