"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    word: "Ético",
    accent: "#7c070c",
    symbol: "§",
    desc: "Reconhece o sigilo, o respeito à singularidade e a responsabilidade de construir um espaço seguro de escuta.",
  },
  {
    word: "Político",
    accent: "#a0522d",
    symbol: "⊕",
    desc: "Compreende que o sofrimento nunca é apenas individual, mas também atravessado pela cultura, pela história e pelas condições concretas de vida.",
  },
  {
    word: "Estético",
    accent: "#5c3d2e",
    symbol: "✦",
    desc: "Acredita que criar também é uma forma de cuidar. A palavra, a literatura, o bordado, a pintura e outras linguagens ampliam aquilo que conseguimos sentir, narrar e transformar.",
  },
];

export default function Autonomy() {
  const sectionRef = useRef<HTMLElement>(null);
  const expandableRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

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

      gsap.fromTo(
        ".pillar-item-visible",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".pillars-block",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        ".benefit-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".benefits-grid",
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleExpand = () => {
    if (!expandableRef.current) return;

    if (!isExpanded) {
      gsap.to(expandableRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => ScrollTrigger.refresh(),
      });
    } else {
      gsap.to(expandableRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => ScrollTrigger.refresh(),
      });
    }

    setIsExpanded(!isExpanded);
  };

  return (
    <section
      id="autonomy"
      ref={sectionRef}
      className="py-[100px] md:py-[70px] bg-acolhimento-light"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* — Abordagem clínica — */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[36px] lg:gap-[50px] items-start">
          {/* Foto */}
          <div className="autonomy-image rounded-[20px] overflow-hidden aspect-[4/5] bg-acolhimento shadow-[0_20px_60px_rgba(44,16,10,0.06)] opacity-0 md:sticky md:top-28">
            <img
              src="/foto-ana.jpg"
              className="w-full h-full object-cover"
              loading="lazy"
              alt="Ana Clara Reis — psicóloga e artista"
              onError={(e) => {
                e.currentTarget.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='1000' viewBox='0 0 800 1000'%3E%3Crect width='800' height='1000' fill='%23FDF7F2'/%3E%3Ccircle cx='400' cy='400' r='200' fill='%23E8D5C4' opacity='0.4'/%3E%3C/svg%3E";
                e.currentTarget.onerror = null;
              }}
            />
          </div>

          {/* Texto */}
          <div>
            <span className="autonomy-text-item section-label opacity-0">
              Abordagem clínica
            </span>
            <h2 className="autonomy-text-item section-title opacity-0">
              Sobre <span className="highlight">Ana Clara Reis</span>
            </h2>

            <p className="autonomy-text-item text-muted-text text-[1.05rem] leading-[1.8] mb-8 opacity-0">
              Sou psicóloga (CRP 04/81276), formada pelo Centro Universitário
              Academia (UniAcademia), em Juiz de Fora–MG. Sou pós-graduada em
              Psicologia Social e Comunidades e, atualmente, pós-graduanda em
              Psicologia Clínica Histórico-Cultural.
            </p>

            {/* Frase de transição */}
            <p className="autonomy-text-item text-[0.8rem] uppercase tracking-[0.18em] text-primary/50 font-mono mb-5 opacity-0">
              Meu trabalho é sustentado por três compromissos
            </p>

            {/* Pilares */}
            <div className="pillars-block flex flex-col gap-0">
              {/* Pilar Visível: Ético */}
              <div className="pillar-item-visible opacity-0 flex gap-5 items-start py-5 border-b border-primary/[0.07]">
                <div className="flex flex-col items-center gap-1 pt-0.5 shrink-0">
                  <span
                    className="text-[1.1rem] leading-none"
                    style={{ color: pillars[0].accent }}
                  >
                    {pillars[0].symbol}
                  </span>
                </div>

                <div>
                  <span
                    className="font-display text-[1.05rem] font-semibold italic block mb-1"
                    style={{ color: pillars[0].accent }}
                  >
                    {pillars[0].word}
                  </span>
                  <p className="text-muted-text text-[0.93rem] leading-[1.75]">
                    {pillars[0].desc}
                  </p>
                </div>
              </div>

              {/* Conteúdo Oculto Expandível (Político, Estético e Linha de Fechamento) */}
              <div
                ref={expandableRef}
                className="h-0 opacity-0 overflow-hidden transition-none"
              >
                {pillars.slice(1).map((p) => (
                  <div
                    key={p.word}
                    className="flex gap-5 items-start py-5 border-b border-primary/[0.07]"
                  >
                    <div className="flex flex-col items-center gap-1 pt-0.5 shrink-0">
                      <span
                        className="text-[1.1rem] leading-none"
                        style={{ color: p.accent }}
                      >
                        {p.symbol}
                      </span>
                    </div>

                    <div>
                      <span
                        className="font-display text-[1.05rem] font-semibold italic block mb-1"
                        style={{ color: p.accent }}
                      >
                        {p.word}
                      </span>
                      <p className="text-muted-text text-[0.93rem] leading-[1.75]">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Linha de fechamento */}
                <div className="mt-6 mb-2 pl-5 border-l-2 border-primary/20">
                  <p className="text-muted-text text-[0.97rem] leading-[1.8]">
                    É desse lugar que construo a comunidade{" "}
                    <strong className="text-soft-text font-semibold">
                      Desbordar Afetos
                    </strong>
                    : uma prática comprometida com a ampliação da
                    autoconsciência, da autonomia e da criação de novos sentidos
                    para a própria história.
                  </p>
                </div>
              </div>
            </div>

            {/* Botão Ler Mais / Ler Menos */}
            <div className="my-5">
              <button
                onClick={toggleExpand}
                type="button"
                className="group inline-flex items-center gap-2 font-mono text-[0.8rem] uppercase tracking-[0.15em] text-primary hover:text-primary-dark transition-colors duration-300 cursor-pointer bg-transparent border-none p-0 focus:outline-none"
              >
                <span>{isExpanded ? "Ler menos" : "Ler mais"}</span>
                <span
                  className={`text-[0.9rem] transition-transform duration-300 ${
                    isExpanded ? "rotate-180" : "rotate-0"
                  }`}
                >
                  ↓
                </span>
              </button>
            </div>

            {/* Citação Pessoal */}
            <div className="autonomy-text-item font-display text-[1.2rem] italic text-primary pt-5 pb-2 border-t-2 border-primary/[0.08] mt-6 opacity-0">
              &ldquo;Me bordo, fio a fio. Me emendo, me enlaço, me costuro e
              desfaço. Me desbordo, bordo, e sou.&rdquo;
            </div>
            <div className="autonomy-text-item font-mono text-[0.8rem] text-primary opacity-60 mt-1 opacity-0">
              Ana Clara Reis · Psicóloga · CRP 04/81276
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
