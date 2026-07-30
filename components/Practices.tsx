"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const practices = [
  {
    emoji: "🧵",
    title: "Bordado",
    desc: "O fio que costura histórias, memórias e afetos. Cada ponto é um gesto de presença.",
    imgSrc:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23F5ECE4'/%3E%3Cpath d='M100 200 Q200 100 300 200 Q400 300 500 200' stroke='%237A1A2E' stroke-width='3' fill='none' opacity='0.3'/%3E%3Ccircle cx='200' cy='220' r='40' fill='%23D4B8A8' opacity='0.3'/%3E%3Ccircle cx='400' cy='180' r='30' fill='%234A2C5E' opacity='0.2'/%3E%3C/svg%3E",
    imgAlt: "Bordado terapêutico",
  },
  {
    emoji: "🎨",
    title: "Pintura",
    desc: "As cores falam onde as palavras silenciam. A tela como espelho da alma.",
    imgSrc:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23FDF7F2'/%3E%3Crect x='150' y='100' width='300' height='200' rx='20' fill='%23E8D5C4' opacity='0.5'/%3E%3Ccircle cx='300' cy='200' r='60' fill='%237A1A2E' opacity='0.15'/%3E%3C/svg%3E",
    imgAlt: "Pintura como expressão",
  },
  {
    emoji: "🖼️",
    title: "Arte têxtil",
    desc: "Tecelagem e costura como metáfora da construção relacional da subjetividade.",
    imgSrc:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23F5ECE4'/%3E%3Cpath d='M100 250 Q300 100 500 250' stroke='%234A2C5E' stroke-width='4' fill='none' opacity='0.3'/%3E%3Cpath d='M100 150 Q300 300 500 150' stroke='%237A1A2E' stroke-width='4' fill='none' opacity='0.2'/%3E%3C/svg%3E",
    imgAlt: "Arte têxtil",
  },
];

export default function Practices() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".practices-header-item",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".practice-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".practices-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".practice-card .card-image",
        { opacity: 0, scale: 0.96 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.12,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".practices-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="practices"
      ref={sectionRef}
      className="py-[100px] md:py-[70px] bg-acolhimento-light relative"
    >
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <span className="practices-header-item section-label opacity-0">Práticas</span>
        <h2 className="practices-header-item section-title opacity-0">
          Linguagens do <span className="highlight">cuidado</span>
        </h2>
        <p className="practices-header-item section-subtitle mx-auto text-center opacity-0">
          Cada prática artística é uma porta para o autoconhecimento e a expressão genuína.
        </p>

        <div className="practices-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-10">
          {practices.map((p) => (
            <div
              key={p.title}
              className="practice-card bg-white rounded-[20px] overflow-hidden shadow-[0_4px_24px_rgba(44,16,10,0.04)] border border-primary/[0.05] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(44,16,10,0.06)] opacity-0 text-left"
            >
              <div className="card-image h-[200px] bg-warm-beige overflow-hidden relative">
                <img
                  src={p.imgSrc}
                  alt={p.imgAlt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <div className="py-6 px-[22px] pb-7">
                <h4 className="font-display text-[1.15rem] font-semibold mb-1.5 text-soft-text">
                  {p.emoji} {p.title}
                </h4>
                <p className="text-[0.92rem] text-muted-text leading-[1.6]">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
