"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Background from "next/bg-hero";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animations
      gsap.fromTo(
        h1Ref.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.6, ease: "power2.out" },
      );
      gsap.fromTo(
        subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.9, ease: "power2.out" },
      );
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 1.1, ease: "power2.out" },
      );

      // Scroll parallax: darken + blur video, fade content
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
          onUpdate: (self) => {
            const p = self.progress;
            if (overlayRef.current) {
              overlayRef.current.style.opacity = String(1 + p * 0.6);
            }
            if (videoRef.current) {
              videoRef.current.style.filter = `brightness(${0.65 - p * 0.3}) saturate(${0.9 - p * 0.2})`;
            }
            if (contentRef.current) {
              contentRef.current.style.opacity = String(1 - p * 0.8);
              contentRef.current.style.transform = `translateY(${p * 40}px)`;
            }
            if (indicatorRef.current) {
              indicatorRef.current.style.opacity = String(1 - p * 1.5);
            }
          },
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative w-full h-screen min-h-[700px] overflow-hidden flex items-center justify-center bg-primary-dark"
    >
      {/* Video background */}
      <video
        ref={videoRef}
        id="hero-video"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ filter: "brightness(0.65) saturate(0.9)" }}
        poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800'%3E%3Crect width='1200' height='800' fill='%237A1A2E'/%3E%3Ccircle cx='400' cy='300' r='200' fill='%239C2A42' opacity='0.3'/%3E%3Ccircle cx='800' cy='500' r='250' fill='%234A2C5E' opacity='0.2'/%3E%3C/svg%3E"
      >
        <source
          src="https://cdn.pixabay.com/video/2024/02/12/199728-909933160_large.mp4"
          type="video/mp4"
        />
      </video>

      {/* Fallback gradient */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 40%, rgba(122,26,46,0.6) 0%, rgba(44,16,10,0.85) 70%), radial-gradient(ellipse at 70% 60%, rgba(74,44,94,0.3) 0%, transparent 60%)",
        }}
      />

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(44,16,10,0.3) 0%, rgba(44,16,10,0.6) 50%, rgba(44,16,10,0.85) 100%)",
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-[3] max-w-[820px] px-6 text-center text-white opacity-0"
      >
        <span
          ref={badgeRef}
          className="font-mono text-[0.7rem] tracking-[0.25em] uppercase text-white/60 mb-5 inline-block border border-white/15 py-1.5 px-4 rounded-[60px] backdrop-blur-sm"
        >
          ✦ Ateliê-Clínico
        </span>

        <h1
          ref={h1Ref}
          className="font-display text-[clamp(2.8rem,8vw,5.4rem)] font-semibold leading-[1.08] mb-[18px] tracking-[-0.02em] opacity-0"
        >
          Desbordar
          <br />
          <span className="italic text-[#f0c8b0]">Afetos</span>
        </h1>

        <p
          ref={subRef}
          className="font-body text-[clamp(1rem,1.5vw,1.35rem)] opacity-0 max-w-[560px] mx-auto mb-8 leading-[1.7] font-light"
        >
          Onde a psicologia e a arte se entrelaçam para acolher,
          <br />
          refletir e transformar.
        </p>

        <div
          ref={ctaRef}
          className="flex flex-wrap gap-4 justify-center opacity-0"
        >
          <a
            href="#invitation"
            className="inline-block font-body font-medium text-[0.95rem] py-[14px] px-9 rounded-[60px] cursor-pointer no-underline tracking-[0.02em] transition-all duration-300 bg-white text-primary-dark shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:bg-acolhimento hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)]"
          >
            Iniciar jornada
          </a>
          <a
            href="#about"
            className="inline-block font-body font-light text-[0.95rem] py-[14px] px-9 bg-transparent text-white border border-white/40 rounded-[60px] cursor-pointer no-underline tracking-[0.02em] transition-all duration-300 backdrop-blur-sm hover:bg-white/12 hover:border-white/70 hover:-translate-y-0.5"
          >
            Conhecer mais
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={indicatorRef}
        className="absolute bottom-9 left-1/2 z-[3] flex flex-col items-center gap-2 text-white/40 font-mono text-[0.6rem] tracking-[0.15em] uppercase animate-float-down"
        style={{ transform: "translateX(-50%)" }}
      >
        <span>Rolar</span>
        <div
          className="w-px h-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.4), transparent)",
          }}
        />
      </div>
    </section>
  );
}
