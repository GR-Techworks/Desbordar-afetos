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
          {/* Imagem Única */}
          <div className="connection-image-wrap relative w-full aspect-[4/5] opacity-0 group">
            {/* Elemento decorativo pontilhado ao fundo */}
            <div className="absolute -bottom-8 -left-8 md:-left-4 w-[140px] h-[140px] rounded-full border-2 border-dashed border-primary opacity-20 pointer-events-none z-0" />

            {/* Container da Imagem */}
            <div className="relative w-full h-full z-10 rounded-[24px] shadow-xl overflow-hidden border-[6px] border-white">
              <img
                src="/foto-conexao.jpg"
                alt="Psicologia Histórico-Cultural e Arte"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = svgFallback;
                  e.currentTarget.onerror = null;
                }}
              />
            </div>
          </div>

          {/* Texto */}
          <div className="flex flex-col gap-0 mt-8 md:mt-0">
            <span className="connection-text-item section-label opacity-0">
              Psicologia Histórico-Cultural
            </span>
            <h2 className="connection-text-item section-title opacity-0">
              Como nos tornamos quem <span className="highlight">somos</span>?
            </h2>
            <p className="connection-text-item text-muted-text mb-4 text-[1.05rem] leading-[1.8] opacity-0">
              Ninguém nasce pronto. Tornamo-nos quem somos na relação com outras
              pessoas, com a cultura, com as histórias que vivemos e com os
              sentidos que construímos ao longo da vida.{" "}
              <span className="font-bold italic">
                A Psicologia Histórico-Cultural compreende que nossa
                subjetividade não está apenas dentro de nós: ela é tecida nas
                relações, nas experiências e nas marcas do mundo que
                atravessamos.
              </span>
            </p>
            <p className="connection-text-item text-muted-text mb-4 text-[1.05rem] leading-[1.8] opacity-0">
              É por isso que acredito que{" "}
              <span className="font-bold italic">
                cuidar também é criar novas possibilidades de significar a
                própria história
              </span>
              . <span className="font-bold italic">Desbordar</span> significa
              justamente esse movimento. É quando aquilo que sentimos já não
              cabe apenas dentro de nós e procura outras formas de existir:
              palavra, silêncio, bordado, pintura, gesto ou pausa.
            </p>
            <p className="connection-text-item text-muted-text mb-4 text-[1.05rem] leading-[1.8] opacity-0">
              Mas há também o <span className="font-bold italic">"des"</span> de
              desatar, desprender, desaprender.{" "}
              <span className="font-bold italic">
                Soltar aquilo que já não faz sentido para abrir espaço para
                novas formas de viver
              </span>
              . O Desbordar Afetos nasce dessa aposta: a de que, quando uma
              experiência encontra{" "}
              <span className="font-bold italic">linguagem</span>, ela também
              pode encontrar{" "}
              <span className="font-bold italic">novos sentidos</span>.
            </p>

            <a
              href="#contact"
              className="connection-text-item opacity-0 mt-6 self-start font-body text-[0.9rem] text-primary border-b border-primary/40 pb-0.5 transition-all duration-300 hover:border-primary"
            >
              Quero saber mais →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
