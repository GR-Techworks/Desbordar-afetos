"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: "🪞",
    title: "Autoconhecimento",
    desc: "Entender os próprios padrões, afetos e histórias — com curiosidade, não com julgamento.",
  },
  {
    icon: "🌱",
    title: "Expressão emocional",
    desc: "Encontrar formas de nomear e dar forma ao que se sente, mesmo quando as palavras faltam.",
  },
  {
    icon: "✨",
    title: "Ressignificação",
    desc: "Revisitar experiências difíceis e construir novos sentidos a partir delas.",
  },
  {
    icon: "🦋",
    title: "Autonomia",
    desc: "Desenvolver uma relação mais autoral com a própria vida — escolhendo quem se quer ser.",
  },
];

export default function Autonomy() {
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

  return (
    <section
      id="autonomy"
      ref={sectionRef}
      className="py-[100px] md:py-[70px] bg-acolhimento-light"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* — Abordagem clínica — */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[36px] lg:gap-[50px] items-center">
          {/* Foto */}
          <div className="autonomy-image rounded-[20px] overflow-hidden aspect-[4/5] bg-acolhimento shadow-[0_20px_60px_rgba(44,16,10,0.06)] opacity-0">
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
              Sobre <span className="highlight">mim</span>
            </h2>
            <p className="autonomy-text-item text-muted-text text-[1.05rem] leading-[1.8] mb-4 opacity-0">
              Sou Ana Clara Reis, psicóloga (CRP 04/81276), formada pelo Centro
              Universitário Academia (UniAcademia), pós-graduada em Psicologia
              Social e Comunidades e pós-graduanda em Psicologia Clínica
              Histórico-Cultural. Acredito que esse é um espaço onde histórias
              podem ser compreendidas, sentidos podem ser recriados e novas
              possibilidades de existir podem ser construídas.
            </p>
            <p className="autonomy-text-item text-muted-text text-[1.05rem] leading-[1.8] mb-4 opacity-0">
              Não acredito em neutralidade clínica. Acredito em presença real,
              em escuta que acolhe contradições, e em processos que respeitam o
              tempo de cada pessoa — sem pressa de "resolver", com disposição
              genuína para estar junto no que é difícil.
            </p>
            <p className="autonomy-text-item text-muted-text text-[1.05rem] leading-[1.8] mb-4 opacity-0">
              A arte entra não como técnica, mas como linguagem. Uma forma de
              acessar o que ainda não tem nome — e de criar novos sentidos para
              o que já vivemos.
            </p>
            <div className="autonomy-text-item font-display text-[1.2rem] italic text-primary pt-5 pb-2 border-t-2 border-primary/[0.08] mt-4 opacity-0">
              &ldquo;A arte nos ensina que o que desborda pode ser transformado
              em beleza.&rdquo;
            </div>
            <div className="autonomy-text-item font-mono text-[0.8rem] text-primary opacity-60 mt-1 opacity-0">
              Ana Clara Reis · Psicóloga · CRP 04/81276
            </div>
          </div>
        </div>

        {/* — Benefícios — */}
        <div className="mt-20 md:mt-28">
          <div className="text-center mb-10">
            <span className="section-label">
              O que você pode encontrar aqui
            </span>
          </div>
          <div className="benefits-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="benefit-item opacity-0 bg-white p-7 rounded-[20px] border border-primary/[0.06] shadow-[0_4px_24px_rgba(44,16,10,0.03)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(44,16,10,0.06)]"
              >
                <span className="text-[2rem] block mb-3">{b.icon}</span>
                <h4 className="font-display text-[1.05rem] font-semibold mb-2 text-soft-text">
                  {b.title}
                </h4>
                <p className="text-[0.88rem] text-muted-text leading-[1.6]">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
