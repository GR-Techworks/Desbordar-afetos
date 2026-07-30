"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    emoji: "🌱",
    number: "01",
    title: "Acolhimento",
    desc: "Um espaço seguro onde sua história é ouvida com presença e sensibilidade.",
  },
  {
    emoji: "🧵",
    number: "02",
    title: "Expressão",
    desc: "Através da arte, damos forma ao que habita em nós — cores, traços, texturas.",
  },
  {
    emoji: "🦋",
    number: "03",
    title: "Transformação",
    desc: "Do desbordar dos afetos nascem novas narrativas e possibilidades de ser.",
  },
];

export default function Journey() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".journey-header-item",
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
        }
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
            trigger: ".journey-steps",
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="py-[100px] md:py-[70px] bg-warm-white"
    >
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <span className="journey-header-item section-label opacity-0">Processo</span>
        <h2 className="journey-header-item section-title opacity-0">
          A jornada <span className="highlight">terapêutica</span>
        </h2>
        <p className="journey-header-item section-subtitle centered mx-auto text-center opacity-0">
          Um caminho feito de escuta, criação e transformação — passo a passo, fio a fio.
        </p>

        <div className="journey-steps grid grid-cols-1 md:grid-cols-3 gap-[24px] lg:gap-[30px] mt-12 max-w-[480px] md:max-w-none mx-auto">
          {steps.map((s) => (
            <div
              key={s.number}
              className="step text-center py-9 px-6 bg-white rounded-[20px] border border-primary/[0.06] shadow-[0_4px_24px_rgba(44,16,10,0.03)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(44,16,10,0.06)] relative opacity-0"
            >
              <span className="text-[2.4rem] block mb-2">{s.emoji}</span>
              <div className="font-display text-[2.8rem] font-semibold text-primary opacity-15 leading-none mb-1">
                {s.number}
              </div>
              <h4 className="font-display text-[1.2rem] font-semibold mb-2 text-soft-text">
                {s.title}
              </h4>
              <p className="text-[0.95rem] text-muted-text leading-[1.6]">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
