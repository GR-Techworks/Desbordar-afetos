"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Autonomy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power2.out", duration: 0.8 },
      });

      tl.fromTo(
        ".autonomy-text-item",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.08 },
      ).fromTo(
        ".autonomy-image",
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.9 },
        "-=0.5",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="autonomy"
      ref={sectionRef}
      className="py-[100px] md:py-[70px] bg-warm-white"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[36px] lg:gap-[50px] items-center">
          {/* Image */}
          <div className="autonomy-image rounded-[20px] overflow-hidden aspect-[4/5] bg-acolhimento shadow-[0_20px_60px_rgba(44,16,10,0.06)] opacity-0">
            <img
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='1000' viewBox='0 0 800 1000'%3E%3Crect width='800' height='1000' fill='%23FDF7F2'/%3E%3Ccircle cx='400' cy='400' r='200' fill='%23E8D5C4' opacity='0.4'/%3E%3Cpath d='M300 550 Q400 700 500 550' stroke='%237A1A2E' stroke-width='2' fill='none' opacity='0.2'/%3E%3C/svg%3E"
              alt="Ana Clara - psicóloga e artista"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Text */}
          <div>
            <span className="autonomy-text-item section-label opacity-0">
              Fundadora
            </span>
            <h2 className="autonomy-text-item section-title opacity-0">
              Ana Clara <span className="highlight">Reis</span>
            </h2>
            <p className="autonomy-text-item text-muted-text text-[1.05rem] leading-[1.8] mb-4 opacity-0">
              Psicóloga clínica e artista, Ana Clara encontrou na interseção
              entre a psicologia e a arte sua vocação mais profunda. Formada em
              Psicologia com especialização em abordagens histórico-culturais,
              ela acredita que a criação artística é uma via poderosa de acesso
              ao inconsciente e de ressignificação da experiência.
            </p>
            <p className="autonomy-text-item text-muted-text text-[1.05rem] leading-[1.8] mb-4 opacity-0">
              Com sensibilidade e escuta atenta, conduz cada encontro como uma
              tela em branco — onde cada pessoa pode desenhar, bordar ou pintar
              sua própria história.
            </p>
            <div className="autonomy-text-item font-display text-[1.2rem] italic text-primary pt-5 pb-2 border-t-2 border-primary/[0.08] mt-4 opacity-0">
              &ldquo;A arte nos ensina que o que desborda pode ser transformado
              em beleza.&rdquo;
            </div>
            <div className="autonomy-text-item font-mono text-[0.8rem] text-primary opacity-60 mt-1">
              Psicóloga · CRP 12/34567
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
