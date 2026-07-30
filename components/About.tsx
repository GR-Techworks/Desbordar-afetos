"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power2.out", duration: 0.9 },
      });

      tl.fromTo(
        ".about-text-item",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.08 }
      ).fromTo(
        ".about-image-wrap",
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.9 },
        "-=0.3"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-[100px] md:py-[70px] bg-warm-white relative"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] lg:gap-[60px] items-center">
          {/* Image */}
          <div className="about-image-wrap relative rounded-2xl overflow-hidden bg-acolhimento aspect-[4/5] shadow-[0_20px_60px_rgba(44,16,10,0.08)] opacity-0">
            <img
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='1000' viewBox='0 0 800 1000'%3E%3Crect width='800' height='1000' fill='%23F5ECE4'/%3E%3Cpath d='M200 300 Q350 200 500 350 Q650 500 450 700 Q300 850 200 700 Q100 550 200 300' fill='%23E8D5C4' opacity='0.5'/%3E%3Ccircle cx='400' cy='500' r='120' fill='%23D4B8A8' opacity='0.3'/%3E%3C/svg%3E"
              alt="Espaço acolhedor do Atelier Desbordar Afetos"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Decorative dashed circle */}
            <div className="absolute -bottom-5 -right-5 w-[120px] h-[120px] rounded-full border-2 border-dashed border-primary opacity-20 pointer-events-none" />
          </div>

          {/* Text */}
          <div className="about-text flex flex-col gap-0">
            <span className="about-text-item section-label opacity-0">Sobre</span>
            <h2 className="about-text-item section-title opacity-0">
              Um espaço onde a{" "}
              <span className="highlight">arte</span> encontra a{" "}
              <span className="highlight">escuta</span>
            </h2>
            <p className="about-text-item text-muted-text mb-4 text-[1.05rem] leading-[1.8] opacity-0">
              O <strong>Desbordar Afetos</strong> é um atelier clínico criado por{" "}
              <strong>Ana Clara</strong>, psicóloga e artista, onde a psicologia e a
              arte se encontram para acolher, refletir e transformar.
            </p>
            <p className="about-text-item text-muted-text mb-4 text-[1.05rem] leading-[1.8] opacity-0">
              Inspirado na Psicologia Histórico-Cultural, esse espaço reconhece a
              subjetividade como construção relacional e utiliza a arte — bordado,
              pintura, arte têxtil — como ferramenta de expressão e ressignificação.
            </p>
            <p className="about-text-item text-muted-text mb-4 text-[1.05rem] leading-[1.8] opacity-0">
              Aqui, cada fio, cada cor, cada gesto criativo é um convite a desbordar
              afetos e a tecer novas narrativas.
            </p>
            <div className="about-text-item font-display text-2xl italic text-primary mt-2 opacity-0">
              — Ana Clara
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
