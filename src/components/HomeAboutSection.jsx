// Studio introduction beside the brand "d", as in the home page design.
// Each sentence starts a new line; on large screens the <br>s reproduce the
// design's line breaks.
const ICON_MASK = 'url("/images/Group%2036.png")';

const Br = () => <br className="hidden lg:inline" />;

export default function HomeAboutSection() {
  return (
    <section className="bg-white px-6 pt-14 pb-20 lg:pl-[20.5vw] lg:pr-[8vw] lg:pt-[4.5vw] lg:pb-[10.5vw]">
      <div
        className="flex flex-col gap-8 lg:flex-row lg:gap-[2.6vw]"
        style={{ fontSize: "clamp(1.05rem, 1.5625vw, 2.25rem)", lineHeight: 1.22 }}
      >
        {/* The mark itself (Group 36.png) is the mask, filled grey. On large
            screens the text is 11 lines of 1.22em, and the mark spans them. */}
        <div
          aria-hidden="true"
          className="h-28 shrink-0 self-start bg-[#767676] lg:h-[13.42em]"
          style={{
            aspectRatio: "170 / 305",
            WebkitMaskImage: ICON_MASK,
            maskImage: ICON_MASK,
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          }}
        />

        <p className="century-gothic text-[#767676]">
          <span className="block">
            <strong className="font-bold">Decograph Interior</strong> Design Studio is a full-service <Br />
            interior design and fit-out company specializing in residential, <Br />
            commercial, retail, and hospitality spaces.
          </span>
          <span className="block">
            We provide end-to-end solutions including interior design, <Br />
            civil works, custom joinery, and complete MEP and HVAC services.
          </span>
          <span className="block">
            Our work style combines modern, clean aesthetics with <Br />
            strong functionality and technical precision.
          </span>
          <span className="block">
            Every project is executed with meticulous attention to detail, <Br />
            structured project management, and strict quality standards.
          </span>
          <span className="block">
            At Decograph, we create refined, durable, and efficient interiors <Br />
            that enhance the way spaces are experienced.
          </span>
        </p>
      </div>
    </section>
  );
}
