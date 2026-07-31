"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    icon: "🧵",
    title: "Arte têxtil",
    desc: "Bordado e costura como metáfora do tecer emocional.",
  },
  {
    icon: "🎨",
    title: "Pintura",
    desc: "As cores como expressão do que não cabe em palavras.",
  },
  {
    icon: "🖌️",
    title: "Processos criativos",
    desc: "O fazer artístico como caminho de autoconhecimento.",
  },
  {
    icon: "🤲",
    title: "Acolhimento",
    desc: "Um espaço seguro para a vulnerabilidade florescer.",
  },
];

export default function Expression() {
  const sectionRef = useRef<HTMLElement>(null);

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
        ".expression-text-item",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.08 },
      )
        .fromTo(
          ".pillar-item",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.1 },
          "-=0.4",
        )
        .fromTo(
          ".expression-visual",
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 0.9 },
          "-=0.5",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="expression"
      ref={sectionRef}
      className="py-[100px] md:py-[70px] bg-acolhimento-light relative overflow-hidden"
    >
      {/* Decorative radial */}
      <div
        className="absolute -top-[40%] -right-[20%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(122,26,46,0.04), transparent 70%)",
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[36px] lg:gap-[50px] items-center">
          {/* Text + pillars */}
          <div>
            <span className="expression-text-item section-label opacity-0">
              Encontro
            </span>
            <h2 className="expression-text-item section-title opacity-0">
              Onde a <span className="highlight">psicologia</span> e a{" "}
              <span className="highlight">arte</span> se tocam
            </h2>
            <p className="expression-text-item section-subtitle opacity-0">
              Acreditamos que a expressão artística é uma linguagem profunda da
              subjetividade. Integramos abordagens clínicas com processos
              criativos para promover autonomia, acolhimento e transformação.
            </p>

            <div className="grid grid-cols-2 gap-5 mt-6 max-[480px]:grid-cols-1">
              {pillars.map((p) => (
                <div
                  key={p.title}
                  className="pillar-item bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgba(44,16,10,0.04)] border border-primary/[0.06] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(44,16,10,0.06)] opacity-0"
                >
                  <span className="text-[1.8rem] mb-2 block">{p.icon}</span>
                  <h4 className="font-display text-[1rem] font-semibold mb-1 text-soft-text">
                    {p.title}
                  </h4>
                  <p className="text-[0.9rem] text-muted-text leading-[1.5]">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="expression-visual relative rounded-2xl overflow-hidden bg-warm-beige aspect-[4/5] shadow-[0_20px_60px_rgba(44,16,10,0.06)] opacity-0">
            <img
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='1000' viewBox='0 0 800 1000'%3E%3Crect width='800' height='1000' fill='%23FDF7F2'/%3E%3Cpath d='M100 200 Q300 100 500 250 Q700 400 550 650 Q400 850 200 700 Q50 550 100 200' fill='%23E8D5C4' opacity='0.4'/%3E%3Ccircle cx='450' cy='500' r='160' fill='%23D4B8A8' opacity='0.2'/%3E%3Crect x='280' y='400' width='240' height='200' rx='40' fill='%237A1A2E' opacity='0.08'/%3E%3C/svg%3E"
              alt="Arte e psicologia em sintonia"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
