"use client";

import { useEffect, useRef, useState } from "react";
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

export default function Reception() {
  const sectionRef = useRef<HTMLElement>(null);

  // null = nenhum card aberto; string = número do card ativo (ex: "01")
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const toggleCard = (number: string) => {
    // Alterna: abre o card clicado, fecha se já estava aberto
    setActiveCard((prev) => (prev === number ? null : number));
  };

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
          {services.map((s) => {
            const isActive = activeCard === s.number;

            return (
              <div
                key={s.number}
                // ── Acessibilidade ──────────────────────────────────────────
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                aria-label={`${s.title}: ${isActive ? "recolher" : "expandir"} descrição`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleCard(s.number);
                  }
                }}
                onClick={() => toggleCard(s.number)}
                // ── Layout e visual base ────────────────────────────────────
                className={[
                  "step group relative overflow-hidden",
                  "flex flex-col justify-center text-center",
                  "py-10 px-6 rounded-[20px] border",
                  "min-h-[280px] cursor-pointer select-none",
                  "transition-all duration-500",
                  // Estado ativo (clicado/tocado) — espelha o hover
                  isActive
                    ? "border-primary/20 shadow-[0_16px_48px_rgba(44,16,10,0.1)] -translate-y-1.5 bg-white/80"
                    : "border-primary/[0.07] shadow-[0_4px_24px_rgba(44,16,10,0.04)] bg-white/70",
                  // Hover: só entra em cena em dispositivos com mouse real
                  "hover:border-primary/20 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(44,16,10,0.1)] hover:bg-white/80",
                  "backdrop-blur-[2px]",
                ].join(" ")}
              >
                {/* ── Indicador "+" / "×" ─────────────────────────────────────
                    Visível apenas em mobile/tablet (md:hidden).
                    Em desktop, o hover já comunica a interatividade.      */}
                <div
                  aria-hidden
                  className={[
                    "absolute top-4 right-4 md:hidden",
                    "w-7 h-7 rounded-full border flex items-center justify-center",
                    "transition-all duration-300",
                    isActive
                      ? "border-primary/40 bg-primary/[0.06] text-primary/60 rotate-45"
                      : "border-primary/15 bg-white/60 text-primary/30",
                  ].join(" ")}
                >
                  {/* Ícone "+" que vira "×" ao rotacionar 45° */}
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <line
                      x1="5"
                      y1="1"
                      x2="5"
                      y2="9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <line
                      x1="1"
                      y1="5"
                      x2="9"
                      y2="5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                {/* ── Conteúdo principal (sobe no hover/ativo) ────────────────
                    group-hover: age no mouse (desktop).
                    Classe condicional: age no estado React (mobile/toque). */}
                <div
                  className={[
                    "transition-transform duration-500 ease-out",
                    isActive ? "-translate-y-[18px]" : "",
                    "group-hover:-translate-y-[18px]",
                  ].join(" ")}
                >
                  <div
                    className="font-display font-semibold leading-none mb-4 transition-colors duration-500 group-hover:text-primary/[0.04]"
                    style={{
                      fontSize: "3.5rem",
                      color: isActive
                        ? "rgba(124,7,12,0.04)"
                        : "rgba(124,7,12,0.08)",
                    }}
                  >
                    {s.number}
                  </div>

                  <h4 className="font-display text-[1.4rem] font-semibold mb-2 text-soft-text">
                    {s.title}
                  </h4>

                  {/* Traço decorativo que se expande */}
                  <div
                    className={[
                      "h-[2px] mx-auto mt-4 transition-all duration-500",
                      isActive ? "w-12 bg-primary/50" : "w-6 bg-primary/20",
                      "group-hover:w-12 group-hover:bg-primary/50",
                    ].join(" ")}
                  />
                </div>

                {/* ── Descrição revelada ───────────────────────────────────────
                    Em desktop: group-hover: controla a visibilidade.
                    Em mobile:  classes condicionais via isActive controlam.
                    As duas camadas coexistem sem conflito.                */}
                <div
                  className={[
                    "absolute bottom-6 left-6 right-6",
                    "transition-all duration-500 ease-out pointer-events-none",
                    isActive
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-3",
                    "group-hover:opacity-100 group-hover:translate-y-0",
                  ].join(" ")}
                >
                  <p className="text-[0.9rem] text-muted-text leading-[1.65]">
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dica visual — aparece apenas em mobile, some após o primeiro toque */}
        <p
          className={[
            "md:hidden mt-5 font-mono text-[0.65rem] tracking-[0.18em] uppercase",
            "transition-opacity duration-500",
            activeCard ? "opacity-0 pointer-events-none" : "opacity-40",
          ].join(" ")}
          style={{ color: "#8a6a6a" }}
          aria-hidden
        >
          Toque para explorar
        </p>

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
