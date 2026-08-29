"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

// Forma abstrata diferente para cada etapa — como uma poesia visual
function StepShape({ index }: { index: number }) {
  if (index === 0) {
    // Compreender: círculos concêntricos — introspecção, camadas internas
    return (
      // <svg viewBox="0 0 240 240" fill="none" className="w-[58%] h-[58%]">
      //   <circle cx="120" cy="120" r="108" fill="rgba(122,26,46,0.05)" />
      //   <circle cx="120" cy="120" r="72" fill="rgba(122,26,46,0.04)" />
      //   <circle cx="120" cy="120" r="36" fill="rgba(122,26,46,0.07)" />
      //   <circle cx="120" cy="120" r="6" fill="rgba(122,26,46,0.15)" />
      // </svg>
      <img
        src="compreender.jpg"
        alt=""
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />
    );
  }
  if (index === 1) {
    // Ressignificar: forma orgânica/folha — abertura, transformação suave
    return (
      // <svg viewBox="0 0 240 240" fill="none" className="w-[58%] h-[58%]">
      //   <path
      //     d="M120 14 Q194 58 198 120 Q194 182 120 226 Q46 182 42 120 Q46 58 120 14Z"
      //     fill="rgba(122,26,46,0.05)"
      //   />
      //   <path
      //     d="M120 54 Q170 84 172 120 Q170 156 120 186 Q70 156 68 120 Q70 84 120 54Z"
      //     fill="rgba(122,26,46,0.06)"
      //   />
      //   <circle cx="120" cy="120" r="16" fill="rgba(122,26,46,0.08)" />
      // </svg>
      <img
        src="ressignificar.jpg"
        alt=""
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />
    );
  }
  // Transformar: triângulo ascendente — movimento, nova direção
  return (
    // <svg viewBox="0 0 240 240" fill="none" className="w-[58%] h-[58%]">
    //   <path d="M120 14 L226 206 L14 206 Z" fill="rgba(122,26,46,0.04)" />
    //   <path d="M120 62 L194 194 L46 194 Z" fill="rgba(122,26,46,0.05)" />
    //   <path d="M120 108 L162 182 L78 182 Z" fill="rgba(122,26,46,0.07)" />
    //   <circle cx="120" cy="164" r="8" fill="rgba(122,26,46,0.14)" />
    // </svg>
    <img
      src="transformar.jpg"
      alt=""
      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      loading="lazy"
    />
  );
}

export default function Reception() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const visualRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (nextIndex: number) => {
      if (nextIndex === activeIndex || isAnimating) return;
      setIsAnimating(true);

      gsap.to([visualRef.current, textRef.current], {
        opacity: 0,
        y: 10,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          setActiveIndex(nextIndex);
          // Double rAF garante que o React renderizou o novo conteúdo antes de animar
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              gsap.fromTo(
                [visualRef.current, textRef.current],
                { opacity: 0, y: -10 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.38,
                  ease: "power2.out",
                  stagger: 0.07,
                  onComplete: () => setIsAnimating(false),
                },
              );
            });
          });
        },
      });
    },
    [activeIndex, isAnimating],
  );

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
        ".reception-main",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".reception-main",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const active = services[activeIndex];

  return (
    <section
      id="reception"
      ref={sectionRef}
      className="py-[100px] md:py-[70px]"
      style={COTTON_BG}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* ── Header centrado ─────────────────────────────────────────── */}
        <div className="text-center">
          <span className="reception-header-item section-label opacity-0">
            Psicoterapia
          </span>

          <h2 className="reception-header-item section-title opacity-0">
            O que pode a <span className="highlight">psicoterapia</span>?
          </h2>

          <div className="reception-header-item opacity-0 mt-5 mb-2">
            <p
              className="font-display italic leading-[1.75] max-w-[560px] mx-auto"
              style={{
                fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
                color: "#5a3a3a",
              }}
            >
              &ldquo;Costuraremos com linha dupla todas as feridas
              abertas.&rdquo;
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
        </div>

        {/* ── Layout principal em duas colunas ────────────────────────── */}
        <div className="reception-main opacity-0 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 mt-14 items-center">
          {/* Coluna esquerda — painel visual */}
          <div
            ref={visualRef}
            className="relative aspect-square rounded-2xl bg-white/55 backdrop-blur-[2px] shadow-[0_8px_40px_rgba(44,16,10,0.06)] border border-primary/[0.06] overflow-hidden flex items-center justify-center"
          >
            {/* Número como marca d'água */}
            <span
              aria-hidden
              className="absolute font-display font-bold leading-none select-none pointer-events-none"
              style={{
                fontSize: "clamp(7rem, 20vw, 13rem)",
                color: "rgba(122,26,46,0.04)",
              }}
            >
              {active.number}
            </span>

            {/* Forma geométrica abstrata */}
            <div className="relative z-10 flex items-center justify-center w-full h-full">
              <StepShape index={activeIndex} />
            </div>

            {/* Dots de navegação */}
            <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-3">
              {services.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Ir para etapa ${i + 1}`}
                  className={[
                    "rounded-full transition-all duration-300",
                    i === activeIndex
                      ? "w-7 h-[5px] bg-primary/50"
                      : "w-[5px] h-[5px] bg-primary/20 hover:bg-primary/40",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>

          {/* Coluna direita — texto */}
          <div ref={textRef} className="flex flex-col justify-center">
            {/* Tabs de passo clicáveis */}
            <div className="flex gap-6 mb-8 border-b border-primary/10 pb-4">
              {services.map((s, i) => (
                <button
                  key={s.number}
                  onClick={() => goTo(i)}
                  className={[
                    "font-mono text-[0.7rem] tracking-[0.2em] uppercase transition-all duration-300",
                    "-mb-[17px] pb-4 border-b-2",
                    i === activeIndex
                      ? "text-primary/80 border-primary/50"
                      : "text-muted-text/40 border-transparent hover:text-muted-text/70 hover:border-primary/20",
                  ].join(" ")}
                >
                  {s.number}
                </button>
              ))}
            </div>

            <h3
              className="font-display font-semibold text-soft-text leading-tight mb-5"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)" }}
            >
              {active.title}
            </h3>

            <p className="text-muted-text leading-[1.8] text-[1rem] max-w-[440px]">
              {active.desc}
            </p>

            {/* Setas de navegação */}
            <div className="flex gap-3 mt-10">
              <button
                onClick={() =>
                  goTo((activeIndex - 1 + services.length) % services.length)
                }
                disabled={isAnimating}
                aria-label="Etapa anterior"
                className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary/40 hover:border-primary/50 hover:text-primary/70 transition-all duration-300 disabled:opacity-30"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M9 2L4 7L9 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={() => goTo((activeIndex + 1) % services.length)}
                disabled={isAnimating}
                aria-label="Próxima etapa"
                className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary/40 hover:border-primary/50 hover:text-primary/70 transition-all duration-300 disabled:opacity-30"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M5 2L10 7L5 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── CTA ─────────────────────────────────────────────────────── */}
        <div className="reception-header-item opacity-0 mt-14 text-center">
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
