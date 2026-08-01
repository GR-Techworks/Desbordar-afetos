"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: "🌿",
    number: "01",
    title: "Psicoterapia individual",
    desc: "Encontros semanais, presenciais ou online, para aprofundar o autoconhecimento e ressignificar experiências — no seu tempo.",
  },
  {
    icon: "🧵",
    number: "02",
    title: "Arte como linguagem",
    desc: "Bordado, pintura e colagem entram no processo. Nenhuma experiência artística é necessária — só a vontade de expressar.",
  },
  {
    icon: "🦋",
    number: "03",
    title: "Processo singular",
    desc: "Cada percurso é único. Construímos juntos um espaço de escuta real, onde o que você traz importa e faz sentido.",
  },
];

export default function Reception() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".reception-header-item",
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
      className="py-[100px] md:py-[70px] bg-warm-white"
    >
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <span className="reception-header-item section-label opacity-0">
          Psicoterapia
        </span>
        <h2 className="reception-header-item section-title opacity-0">
          Um espaço de <span className="highlight">escuta</span> e criação
        </h2>
        <p className="reception-header-item section-subtitle centered mx-auto text-center opacity-0">
          A psicoterapia aqui não segue um roteiro fixo. É um encontro vivo —
          entre quem você é e quem você pode se tornar.
        </p>

        <div className="reception-steps grid grid-cols-1 md:grid-cols-3 gap-[24px] lg:gap-[30px] mt-12 max-w-[480px] md:max-w-none mx-auto">
          {services.map((s) => (
            <div
              key={s.number}
              className="step text-center py-9 px-6 bg-white rounded-[20px] border border-primary/[0.06] shadow-[0_4px_24px_rgba(44,16,10,0.03)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(44,16,10,0.06)] relative opacity-0"
            >
              <span className="text-[2.4rem] block mb-2">{s.icon}</span>
              <div className="font-display text-[2.8rem] font-semibold text-primary opacity-15 leading-none mb-1">
                {s.number}
              </div>
              <h4 className="font-display text-[1.2rem] font-semibold mb-2 text-soft-text">
                {s.title}
              </h4>
              <p className="text-[0.95rem] text-muted-text leading-[1.6]">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA sutil */}
        <div className="reception-header-item opacity-0 mt-10">
          <a
            href="#textile"
            className="inline-block font-body text-[0.95rem] text-primary border border-primary/30 rounded-[60px] py-3 px-8 transition-all duration-300 hover:bg-primary hover:text-white hover:-translate-y-0.5"
          >
            Agendar primeira conversa
          </a>
        </div>
      </div>
    </section>
  );
}
