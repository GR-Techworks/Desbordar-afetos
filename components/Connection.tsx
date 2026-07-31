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

  // SVG de Fallback para manter o código limpo
  const svgFallback =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='1000' viewBox='0 0 800 1000'%3E%3Crect width='800' height='1000' fill='%23F5ECE4'/%3E%3Cpath d='M200 300 Q350 200 500 350 Q650 500 450 700 Q300 850 200 700 Q100 550 200 300' fill='%23E8D5C4' opacity='0.5'/%3E%3Ccircle cx='400' cy='500' r='120' fill='%23D4B8A8' opacity='0.3'/%3E%3C/svg%3E";

  return (
    <section
      id="connection"
      ref={sectionRef}
      className="py-[100px] md:py-[70px] bg-warm-white relative"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] lg:gap-[60px] items-center">
          {/* Área da Colagem de Imagens */}
          <div className="connection-image-wrap relative w-full aspect-[4/5] opacity-0 group">
            {/* Foto 1: Fundo (Superior Esquerda) */}
            <div className="absolute top-0 left-0 w-[70%] h-[65%] z-10 -rotate-3 transition-all duration-500 hover:rotate-0 hover:z-40 hover:scale-105 shadow-lg rounded-2xl overflow-hidden border-[6px] border-white">
              <img
                src="/foto-detalhe-arte.jpg" // Sugestão: Uma foto focada em um bordado ou detalhe do consultório
                alt="Detalhe da arte no atelier"
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = svgFallback;
                  e.currentTarget.onerror = null;
                }}
              />
            </div>

            {/* Foto 2: Principal (Inferior Direita) */}
            <div className="absolute bottom-4 right-0 w-[75%] h-[70%] z-20 rotate-2 transition-all duration-500 hover:-rotate-1 hover:z-40 hover:scale-105 shadow-2xl rounded-2xl overflow-hidden border-[6px] border-white">
              <img
                src="/foto-ana.jpg" // A foto principal da Ana
                alt="Ana Clara no Atelier Desbordar Afetos"
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = svgFallback;
                  e.currentTarget.onerror = null;
                }}
              />
            </div>

            {/* Foto 3: Destaque Redondo (Centro/Direita) */}
            <div className="absolute top-[20%] -right-4 md:-right-8 w-[40%] aspect-square z-30 rotate-12 transition-all duration-500 hover:rotate-0 hover:scale-110 shadow-xl rounded-full overflow-hidden border-[4px] border-[#F5ECE4]">
              <img
                src="/foto-extra.jpg" // Sugestão: Ferramentas de arte, texturas ou um rosto sorrindo
                alt="Acolhimento e arte"
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = svgFallback;
                  e.currentTarget.onerror = null;
                }}
              />
            </div>

            {/* Círculo tracejado decorativo (Ajustado para compor com a colagem) */}
            <div className="absolute -bottom-8 left-8 w-[140px] h-[140px] rounded-full border-2 border-dashed border-primary opacity-20 pointer-events-none -z-10" />
          </div>

          {/* Text */}
          <div className="connection-text flex flex-col gap-0 mt-8 md:mt-0">
            <span className="connection-text-item section-label opacity-0 block mb-2 font-medium tracking-wider text-sm uppercase text-primary">
              Conexão
            </span>
            <h2 className="connection-text-item section-title opacity-0 text-3xl md:text-4xl font-bold mb-4">
              Um espaço onde a <span className="text-primary">arte</span>{" "}
              encontra a <span className="text-primary">escuta</span>
            </h2>
            <p className="connection-text-item text-muted-text mb-4 text-[1.05rem] leading-[1.8] opacity-0">
              O <strong>Desbordar Afetos</strong> é um atelier clínico criado
              por <strong>Ana Clara</strong>, psicóloga e artista, onde a
              psicologia e a arte se encontram para acolher, refletir e
              transformar.
            </p>
            <p className="connection-text-item text-muted-text mb-4 text-[1.05rem] leading-[1.8] opacity-0">
              Inspirado na Psicologia Histórico-Cultural, esse espaço reconhece
              a subjetividade como construção relacional e utiliza a arte —
              bordado, pintura, arte têxtil — como ferramenta de expressão e
              ressignificação.
            </p>
            <p className="connection-text-item text-muted-text mb-4 text-[1.05rem] leading-[1.8] opacity-0">
              Aqui, cada fio, cada cor, cada gesto criativo é um convite a
              desbordar afetos e a tecer novas narrativas.
            </p>
            <div className="connection-text-item font-display text-2xl italic text-primary mt-4 opacity-0">
              — Ana Clara
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
