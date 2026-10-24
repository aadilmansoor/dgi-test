import Image from "next/image";

// Home hero photo, pinned behind the page while the content scrolls up over it.
export default function HomeHero() {
  return (
    <section className="fixed inset-0 h-screen z-0 bg-black overflow-hidden">
      <Image
        src="/images/home/hero.jpg"
        alt="A Decograph dressing room with fluted timber panels, an arched cane mirror and lit glass wardrobes"
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover"
      />
    </section>
  );
}
