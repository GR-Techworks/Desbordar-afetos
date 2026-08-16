"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const backgrounds = [
  {
    id: "bg-image",
    type: "image",
    src: "/bg-hero-3.jpg",
  },
];

export default function Hero() {
  const [activeBg, setActiveBg] = useState(0);

  const wrapperRef = useRef<HTMLElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const quoteTextRef = useRef<HTMLDivElement>(null);
  const oldHeroContentRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respeita prefers-reduced-motion (acessibilidade)
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      gsap.set([quoteTextRef.current, oldHeroContentRef.current], {
        opacity: 1,
        y: 0,
        scale: 1,
        clearProps: "all",
      });
      return;
    }

    // gsap.matchMedia() é a forma correta de ter configs diferentes por breakpoint
    const mm = gsap.matchMedia();

    // ── DESKTOP (769px+) ─────────────────────────────────────────────────────
    mm.add("(min-width: 769px)", (context) => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          quoteTextRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.8, delay: 0.3, ease: "power3.out" },
        );

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: "+=100%",
            scrub: 1,
            invalidateOnRefresh: true, // Recalcula se a janela redimensionar
          },
        });

        tl.to(curtainRef.current, { yPercent: -100, ease: "none" }, 0);
        tl.fromTo(
          oldHeroContentRef.current,
          { scale: 0.85, opacity: 0, y: 60 },
          { scale: 1, opacity: 1, y: 0, ease: "power2.out" },
          0,
        );
        tl.to(indicatorRef.current, { opacity: 0, y: -20, duration: 0.3 }, 0);
      }, wrapperRef);

      return () => ctx.revert();
    });

    // ── MOBILE / TABLET (até 768px) ──────────────────────────────────────────
    mm.add("(max-width: 768px)", (context) => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          quoteTextRef.current,
          { opacity: 0, y: 15 }, // Deslocamento menor no mobile
          { opacity: 1, y: 0, duration: 1.2, delay: 0.3, ease: "power3.out" },
        );

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: "+=100%",
            // scrub menor = a animação responde mais rápido ao touch,
            // evitando aquela sensação de "atraso" no iOS/Android
            scrub: 0.3,
            invalidateOnRefresh: true,
          },
        });

        tl.to(curtainRef.current, { yPercent: -100, ease: "none" }, 0);

        // Sem scale no mobile: evita repaints caros e texto borrado durante o transform
        tl.fromTo(
          oldHeroContentRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, ease: "power2.out" },
          0,
        );

        tl.to(indicatorRef.current, { opacity: 0, duration: 0.2 }, 0);
      }, wrapperRef);

      return () => ctx.revert();
    });

    // Recalcula o ScrollTrigger ao girar o dispositivo
    const handleOrientationChange = () => {
      // Pequeno delay para o browser terminar o resize antes de recalcular
      setTimeout(() => ScrollTrigger.refresh(true), 200);
    };

    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      mm.revert();
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);

  return (
    <section
      ref={wrapperRef}
      id="hero-wrapper"
      className="relative w-full bg-[#2c100a]"
      // dvh (dynamic viewport height) = se adapta à barra de endereço
      // do Safari/Chrome mobile que aparece/desaparece durante o scroll.
      // vh normal causa "salto" de layout no iOS.
      style={{ height: "200dvh" }}
    >
      {/* Container Sticky — usa dvh pelo mesmo motivo */}
      <div
        className="sticky top-0 left-0 w-full overflow-hidden"
        style={{ height: "100dvh" }}
      >
        {/* =========================================
            SESSÃO 2 (REVELADA POR BAIXO)
            ========================================= */}
        <div className="absolute inset-0 z-0">
          {/* Background */}
          <div className="absolute inset-0 z-0 bg-[#2c100a]">
            {backgrounds.map((bg, index) => (
              <div
                key={bg.id}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                  index === activeBg ? "opacity-100" : "opacity-0"
                }`}
              >
                {bg.type === "image" ? (
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${bg.src})` }}
                  />
                ) : (
                  <div className="w-full h-full" />
                )}
              </div>
            ))}
          </div>

          {/* Overlay */}
          <div
            className="absolute inset-0 z-[1] pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(44, 16, 10, 0.4) 0%, rgba(44, 16, 10, 0.6) 100%)",
            }}
          />

          {/* Conteúdo do Ateliê */}
          <div
            ref={oldHeroContentRef}
            className="relative z-[2] w-full h-full flex flex-col items-center justify-center px-6 text-center text-white"
            // will-change avisa o browser para criar uma camada GPU antecipadamente,
            // evitando o "flash" na primeira frame da animação
            style={{ willChange: "opacity, transform" }}
          >
            <span className="font-mono text-[0.7rem] tracking-[0.25em] uppercase text-white/60 mb-5 inline-block border border-white/15 py-1.5 px-4 rounded-[60px] backdrop-blur-sm">
              ✦ Ateliê-Clínico
            </span>

            <h1 className="font-display text-[clamp(2.8rem,8vw,5.4rem)] font-semibold leading-[1.08] mb-[18px] tracking-[-0.02em]">
              Desbordar
              <br />
              <span className="italic text-[#f0c8b0]">Afetos</span>
            </h1>

            <p className="font-body text-[clamp(1rem,1.5vw,1.35rem)] max-w-[560px] mx-auto mb-8 leading-[1.7] font-light">
              Entrelace entre texto, têxtil, poético, político e visual.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="#connection"
                className="inline-block font-body font-medium text-[0.95rem] py-[14px] px-9 rounded-[60px] cursor-pointer no-underline tracking-[0.02em] transition-all duration-300 bg-white text-primary-dark shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:bg-acolhimento hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)]"
              >
                Iniciar jornada
              </a>
              <a
                href="#contact"
                className="inline-block font-body font-light text-[0.95rem] py-[14px] px-9 bg-transparent text-white border border-white/40 rounded-[60px] cursor-pointer no-underline tracking-[0.02em] transition-all duration-300 backdrop-blur-sm hover:bg-white/12 hover:border-white/70 hover:-translate-y-0.5"
              >
                Agendar horário
              </a>
            </div>
          </div>
        </div>

        {/* =========================================
            SESSÃO 1 (CORTINA) — Clarice Lispector
            ========================================= */}
        <div
          ref={curtainRef}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center shadow-2xl"
          style={{
            background:
              "radial-gradient(ellipse at 30% 40%, rgba(122,26,46,0.95) 0%, rgba(44,16,10,1) 80%), radial-gradient(ellipse at 70% 60%, rgba(74,44,94,0.4) 0%, transparent 60%)",
            backgroundColor: "#2c100a",
            // will-change na cortina: o yPercent é animado direto nela
            willChange: "transform",
          }}
        >
          {/* Filtro de ruído: desabilitado em mobile (hidden) e tablet (sm:hidden md:block).
              SVG filters são caríssimos em GPUs móveis e causam jank visível. */}
          <div
            className="absolute inset-0 z-0 pointer-events-none opacity-[0.25] mix-blend-overlay hidden md:block"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          <div ref={quoteTextRef} className="relative z-10 max-w-[800px]">
            <h2 className="font-display text-[clamp(2.2rem,6vw,4rem)] font-medium leading-[1.2] mb-6 text-[#f5ece4] drop-shadow-lg">
              &quot;Depois do medo,
              <br />
              vem o mundo.&quot;
            </h2>
            <p className="font-body text-xl md:text-2xl text-white/80 italic font-light tracking-wider">
              — Clarice Lispector
            </p>
          </div>

          <div
            ref={indicatorRef}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-white/60 font-mono text-[0.65rem] tracking-[0.2em] uppercase animate-float-down"
          >
            <span>Desvendar</span>
            <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
