"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Textura de algodão cru — três camadas CSS sobrepostas:
//   1. Ruído fractal SVG   → irregularidade natural do fio
//   2. Trama horizontal    → fios da urdidura
//   3. Trama vertical      → fios da trama
export const COTTON_BG: React.CSSProperties = {
  backgroundColor: "#f0e6d2",
  backgroundImage: [
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' seed='5' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)' opacity='0.11'/%3E%3C/svg%3E\")",
    "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(130,100,65,0.06) 3px, rgba(130,100,65,0.06) 4px)",
    "repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(130,100,65,0.06) 3px, rgba(130,100,65,0.06) 4px)",
  ].join(", "),
};

const services = [
  {
    number: "01",
    title: "Compreender",
    desc: "Olhar para sua história e para as relações que a atravessam, reconhecendo como experiências, afetos e condições concretas participam daquilo que você vive hoje.",
  },
  {
    number: "02",
    title: "Ressignificar",
    desc: "Construir novos sentidos para experiências já vividas, ampliando a autoconsciência e encontrando outras formas de se relacionar consigo, com o outro e com o mundo.",
  },
  {
    number: "03",
    title: "Transformar",
    desc: "Criar novas possibilidades de ação diante da própria realidade. Não apagando o que foi vivido, mas construindo outras maneiras de estar, escolher e agir no mundo.",
  },
];

export default function Reception() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".reception-header-item",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        ".step",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".reception-steps",
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="reception"
      ref={sectionRef}
      className="py-[100px] md:py-[70px]"
      style={COTTON_BG}
    >
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <span className="reception-header-item section-label opacity-0">
          Psicoterapia
        </span>

        <h2 className="reception-header-item section-title opacity-0">
          O que pode a <span className="highlight">psicoterapia</span>?
        </h2>

        {/*
          Citação — Lygia Fagundes Telles
          Correção: text-soft-text/80 não funciona com cores hex no Tailwind.
          Usando valores explícitos de cor para garantir visibilidade.
        */}
        <div className="reception-header-item opacity-0 mt-5 mb-2">
          <p
            className="font-display italic leading-[1.75] max-w-[560px] mx-auto"
            style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)", color: "#5a3a3a" }}
          >
            &ldquo;Costuraremos com linha dupla todas as feridas abertas.&rdquo;
          </p>
          <span
            className="font-mono uppercase mt-3 block"
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              color: "#8a6a6a",
            }}
          >
            — Lygia Fagundes Telles
          </span>
        </div>

        <div className="reception-steps grid grid-cols-1 md:grid-cols-3 gap-[24px] lg:gap-[30px] mt-12 max-w-[480px] md:max-w-none mx-auto">
          {services.map((s) => (
            <div
              key={s.number}
              className="step text-center py-9 px-6 bg-white/70 backdrop-blur-[2px] rounded-[20px] border border-primary/[0.07] shadow-[0_4px_24px_rgba(44,16,10,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(44,16,10,0.07)] relative opacity-0"
            >
              <div
                className="font-display font-semibold leading-none mb-3"
                style={{ fontSize: "3rem", color: "rgba(124,7,12,0.12)" }}
              >
                {s.number}
              </div>
              <h4 className="font-display text-[1.3rem] font-semibold mb-2 text-soft-text">
                {s.title}
              </h4>
              <p className="text-[0.95rem] text-muted-text leading-[1.6]">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="reception-header-item opacity-0 mt-10">
          <a
            href="#contact"
            className="inline-block font-body text-[0.95rem] text-primary border border-primary/30 rounded-[60px] py-3 px-8 transition-all duration-300 hover:bg-primary hover:text-white hover:-translate-y-0.5"
          >
            Agendar primeira conversa
          </a>
        </div>
      </div>
    </section>
  );
}
