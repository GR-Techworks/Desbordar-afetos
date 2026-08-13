"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const articles = [
  {
    image: "/substack-1.jpg",
    tag: "Substack",
    title: "Quando a natureza, o cinema e o teatro nos ensinam sobre o luto",
    excerpt:
      "uma carta sobre a experiência de assistir Hamnet e sobre as muitas formas de continuar vivendo com a perda.",
    date: "MAR, 2026",
    href: "https://anaclarabrcontato.substack.com/p/10-quando-a-natureza-o-cinema-e-o",
  },
  {
    image: "/substack-2.jpg",
    tag: "Substack",
    title: "A arquitetura da ferida",
    excerpt:
      "a memória que permanece nas paredes, nos objetos, nas sombras e nas rachaduras da casa-corpo, mesmo quando não há grito nem espetáculo.",
    date: "FEV, 2026",
    href: "https://anaclarabrcontato.substack.com/p/9-a-arquitetura-da-ferida",
  },
  {
    image: "/substack-3.jpg",
    tag: "Substack",
    title: "Eu permaneço",
    excerpt:
      "um texto sobre finalizar o ano e aprender a habitar o próprio voo.",
    date: "DEZ, 2025",
    href: "https://anaclarabrcontato.substack.com/p/8-eu-permaneco",
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
            Escritas e <span className="highlight">pesquisas</span>
          </h2>
          <p className="textile-header-item section-subtitle centered mx-auto opacity-0">
            Entre a clínica, a arte e a pesquisa, algumas perguntas continuam
            ecoando. Este é um espaço onde compartilho reflexões, ensaios,
            escritos e percursos que seguem desdobrando aquilo que atravessa o
            ateliê-clínico.
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
              href="https://open.substack.com/pub/anaclarabrcontato?utm_source=share&utm_medium=android&r=1nnmvl"
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
              className="article-card opacity-0 group flex flex-col bg-white rounded-[20px] overflow-hidden border border-primary/[0.05] shadow-[0_4px_20px_rgba(44,16,10,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(44,16,10,0.08)] no-underline"
            >
              {/* Imagem da capa com zoom suave no hover */}
              <div className="relative w-full h-[180px] overflow-hidden bg-primary/5">
                <img
                  src={a.image}
                  alt={a.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-7 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[0.68rem] tracking-[0.15em] uppercase text-primary/60 bg-primary/[0.06] px-3 py-1 rounded-full">
                      {a.tag}
                    </span>
                    <span className="font-mono text-[0.72rem] text-muted-text">
                      {a.date}
                    </span>
                  </div>

                  <h4 className="font-display text-[1.05rem] font-semibold leading-[1.35] text-soft-text mb-3 transition-colors duration-300 group-hover:text-primary">
                    {a.title}
                  </h4>

                  <p className="text-[0.88rem] text-muted-text leading-[1.6] mb-5">
                    {a.excerpt}
                  </p>
                </div>

                <div>
                  <span className="font-body text-[0.85rem] text-primary border-b border-primary/30 pb-0.5 transition-all duration-300 group-hover:border-primary">
                    Ler no Substack →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Link para ver todos */}
        <div className="text-center mt-10">
          <a
            href="https://anaclarabrcontato.substack.com/"
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
