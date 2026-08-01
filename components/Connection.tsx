"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Connection() {
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
        ".connection-text-item",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.08 },
      ).fromTo(
        ".connection-image-wrap",
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.9 },
        "-=0.3",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const svgFallback =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='1000' viewBox='0 0 800 1000'%3E%3Crect width='800' height='1000' fill='%23F5ECE4'/%3E%3Cpath d='M200 300 Q350 200 500 350 Q650 500 450 700 Q300 850 200 700 Q100 550 200 300' fill='%23E8D5C4' opacity='0.5'/%3E%3Ccircle cx='400' cy='500' r='120' fill='%23D4B8A8' opacity='0.3'/%3E%3C/svg%3E";

  return (
    <section
      id="connection"
      ref={sectionRef}
      className="py-[100px] md:py-[70px] bg-acolhimento-light relative"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] lg:gap-[60px] items-center">
          {/* Colagem de fotos */}
          <div className="connection-image-wrap relative w-full aspect-[4/5] opacity-0 group">
            <div className="absolute top-0 left-0 w-[70%] h-[65%] z-10 -rotate-3 transition-all duration-500 hover:rotate-0 hover:z-40 hover:scale-105 shadow-lg rounded-2xl overflow-hidden border-[6px] border-white">
              <img
                src="/foto-detalhe-arte.jpg"
                alt="Momento de criação no atelier"
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = svgFallback;
                  e.currentTarget.onerror = null;
                }}
              />
            </div>
            <div className="absolute bottom-4 right-0 w-[75%] h-[70%] z-20 rotate-2 transition-all duration-500 hover:-rotate-1 hover:z-40 hover:scale-105 shadow-2xl rounded-2xl overflow-hidden border-[6px] border-white">
              <img
                src="/foto-comunidade.jpg"
                alt="Comunidade Desbordar Afetos"
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = svgFallback;
                  e.currentTarget.onerror = null;
                }}
              />
            </div>
            <div className="absolute top-[20%] -right-4 md:-right-8 w-[40%] aspect-square z-30 rotate-12 transition-all duration-500 hover:rotate-0 hover:scale-110 shadow-xl rounded-full overflow-hidden border-[4px] border-[#F5ECE4]">
              <img
                src="/foto-extra.jpg"
                alt="Encontro e conexão"
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = svgFallback;
                  e.currentTarget.onerror = null;
                }}
              />
            </div>
            <div className="absolute -bottom-8 left-8 w-[140px] h-[140px] rounded-full border-2 border-dashed border-primary opacity-20 pointer-events-none -z-10" />
          </div>

          {/* Texto */}
          <div className="flex flex-col gap-0 mt-8 md:mt-0">
            <span className="connection-text-item section-label opacity-0">
              Comunidade
            </span>
            <h2 className="connection-text-item section-title opacity-0">
              Comunidade <span className="highlight">Desbordar Afetos</span>
            </h2>
            <p className="connection-text-item text-muted-text mb-4 text-[1.05rem] leading-[1.8] opacity-0">
              O Desbordar Afetos existe também como comunidade — um espaço de
              encontro coletivo onde a arte, a escuta e o afeto se entrelaçam
              além das sessões individuais.
            </p>
            <p className="connection-text-item text-muted-text mb-4 text-[1.05rem] leading-[1.8] opacity-0">
              Círculos de criação, encontros temáticos e grupos de expressão
              artística abertos a pessoas que buscam se reconectar consigo
              mesmas — em companhia, com leveza.
            </p>
            <p className="connection-text-item text-muted-text mb-4 text-[1.05rem] leading-[1.8] opacity-0">
              Aqui, ninguém precisa saber desenhar, bordar ou pintar. Só precisa
              querer desbordar o que carrega.
            </p>

            {/* Destaques */}
            <div className="connection-text-item opacity-0 mt-3 grid grid-cols-2 gap-4">
              {[
                {
                  label: "Círculos de criação",
                  detail: "Encontros em grupo com mediação artística",
                },
                {
                  label: "Online e presencial",
                  detail: "Formatos acessíveis para diferentes realidades",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white/70 rounded-xl p-4 border border-primary/[0.06]"
                >
                  <p className="font-display text-[0.95rem] font-semibold text-soft-text mb-1">
                    {item.label}
                  </p>
                  <p className="text-[0.82rem] text-muted-text leading-[1.5]">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="connection-text-item opacity-0 mt-6 self-start font-body text-[0.9rem] text-primary border-b border-primary/40 pb-0.5 transition-all duration-300 hover:border-primary"
            >
              Quero fazer parte →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
