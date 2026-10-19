import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSectionMobile() {
  const textRef = useRef(null);
  
  const text1 = "Decograph Interior Design Studio is a full-service interior design and fit-out company specializing in residential, commercial, retail, and hospitality spaces.";
  const text2 = "We provide end-to-end solutions including interior design, civil works, custom joinery, and complete MEP and HVAC services. Our work style combines modern, clean aesthetics with strong functionality and technical precision. Every project is executed with meticulous attention to detail, structured project management, and strict quality standards. At Decograph, we create refined, durable, and efficient interiors that enhance the way spaces are experienced.";

  const splitText = (text) => {
    return text.split("").map((char, index) => (
      <span key={index} className="char transition-colors duration-300" style={{ color: "#FFFFFF59" }}>
        {char}
      </span>
    ));
  };

  useLayoutEffect(() => {
    const chars = textRef.current.querySelectorAll(".char");
    
    // Simple fade in animation for mobile
    gsap.to(chars, {
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%",
        end: "bottom 50%",
        scrub: 1,
      },
      color: "#ffffff",
      stagger: 0.01,
      ease: "power2.inOut"
    });
  }, []);

  return (
    <section className="py-20 px-6 bg-decograph-red text-center">
      <div className="max-w-md mx-auto">
        <p ref={textRef} className="century-gothic text-lg leading-relaxed text-white">
            {/* Render text directly or with split if we want simple animation */}
             <span className="block mb-4">{splitText(text1)}</span>
             <span>{splitText(text2)}</span>
        </p>
      </div>
    </section>
  );
}
