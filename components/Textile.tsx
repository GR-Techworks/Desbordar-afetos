"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const articles = [
  {
    tag: "Substack",
    title: "O que acontece quando damos forma ao que sentimos?",
    excerpt:
      "Sobre a mediação artística como linguagem do processo terapêutico e como ela transforma o encontro clínico.",
    year: "2025",
    href: "#", // substituir pelo link real do Substack
  },
  {
    tag: "Reflexão",
    title: "Arte têxtil e saúde mental: o que o bordado pode nos ensinar",
    excerpt:
      "Uma reflexão sobre como o gesto de bordar cria espaço para elaborar o que ainda não tem palavras — e por que a lentidão importa.",
    year: "2025",
    href: "#",
  },
  {
    tag: "Pesquisa",
    title: "Psicologia Histórico-Cultural e processos criativos",
    excerpt:
      "A subjetividade como construção relacional: notas sobre a interseção entre Vigotski e a prática clínica com arte.",
    year: "2024",
    href: "#",
  },
];

export default function Textile() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".textile-header-item",
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
        },
      );

      gsap.fromTo(
        ".substack-block",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".substack-block",
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        ".article-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".articles-grid",
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="textile"
      ref={sectionRef}
      className="py-[100px] md:py-[70px] bg-warm-beige"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="textile-header-item section-label opacity-0">
            Publicações
          </span>
          <h2 className="textile-header-item section-title opacity-0">
            Pesquisas e <span className="highlight">escritos</span>
          </h2>
          <p className="textile-header-item section-subtitle centered mx-auto opacity-0">
            Reflexões sobre psicologia, arte e o que acontece quando os dois se
            encontram.
          </p>
        </div>

        {/* Bloco Substack em destaque */}
        <div className="substack-block opacity-0 bg-primary text-white rounded-[24px] p-8 md:p-12 mb-10 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          {/* Radial decorativo */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 80% 50%, rgba(255,255,255,0.06), transparent 60%)",
            }}
          />
          <div className="flex-1 relative z-10">
            <span className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-white/50 mb-3 block">
              Newsletter
            </span>
            <h3 className="font-display text-[1.6rem] md:text-[2rem] font-semibold leading-[1.2] mb-3">
              Desbordar Afetos no Substack
            </h3>
            <p className="text-white/75 text-[1rem] leading-[1.7] max-w-md">
              Textos sobre clínica, arte, afeto e processo terapêutico —
              enviados com calma, no tempo certo. Sem spam, só o que importa.
            </p>
          </div>
          <div className="flex-shrink-0 relative z-10">
            <a
              href="#" /* substituir pelo link do Substack */
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-body font-medium text-[0.95rem] py-3.5 px-8 bg-white text-primary rounded-[60px] transition-all duration-300 hover:bg-acolhimento hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.15)] whitespace-nowrap"
            >
              Assinar gratuitamente
            </a>
          </div>
        </div>

        {/* Cards de artigos */}
        <div className="articles-grid grid grid-cols-1 md:grid-cols-3 gap-[20px]">
          {articles.map((a) => (
            <a
              key={a.title}
              href={a.href}
              target="_blank"
              rel="noopener noreferrer"
              className="article-card opacity-0 group block bg-white rounded-[20px] overflow-hidden border border-primary/[0.05] shadow-[0_4px_20px_rgba(44,16,10,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(44,16,10,0.08)] no-underline"
            >
              {/* Faixa de cor no topo */}
              <div className="h-1.5 bg-primary opacity-60 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="p-7">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[0.68rem] tracking-[0.15em] uppercase text-primary/60 bg-primary/[0.06] px-3 py-1 rounded-full">
                    {a.tag}
                  </span>
                  <span className="font-mono text-[0.72rem] text-muted-text">
                    {a.year}
                  </span>
                </div>

                <h4 className="font-display text-[1.05rem] font-semibold leading-[1.35] text-soft-text mb-3 transition-colors duration-300 group-hover:text-primary">
                  {a.title}
                </h4>

                <p className="text-[0.88rem] text-muted-text leading-[1.6] mb-5">
                  {a.excerpt}
                </p>

                <span className="font-body text-[0.85rem] text-primary border-b border-primary/30 pb-0.5 transition-all duration-300 group-hover:border-primary">
                  Ler →
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Link para ver mais */}
        <div className="text-center mt-10">
          <a
            href="#" /* link do Substack ou blog */
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-body text-[0.9rem] text-muted-text hover:text-primary transition-colors duration-300"
          >
            Ver todos os textos →
          </a>
        </div>
      </div>
    </section>
  );
}
