"use client";

import { useEffect, useRef, FormEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-header-item",
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
        ".contact-info",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".contact-grid",
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".contact-form",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".contact-grid",
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: integrate with form handler (e.g. Formspree, Resend, etc.)
    alert("Mensagem enviada! Em breve entrarei em contato.");
  };

  const inputClass =
    "w-full py-3 px-4 border border-soft-text/[0.08] rounded-xl font-body text-[0.95rem] bg-warm-white outline-none mb-4 text-soft-text transition-all duration-300 focus:border-primary focus:shadow-[0_0_0_3px_rgba(122,26,46,0.08)]";

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-[100px] md:py-[70px] bg-warm-beige"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="contact-header-item section-label opacity-0">Contato</span>
          <h2 className="contact-header-item section-title opacity-0">
            Vamos <span className="highlight">conversar</span>?
          </h2>
          <p
            className="contact-header-item section-subtitle mx-auto text-center opacity-0"
            style={{ maxWidth: "480px" }}
          >
            Entre em contato para agendar sua primeira conversa ou tirar dúvidas.
          </p>
        </div>

        <div className="contact-grid grid grid-cols-1 md:grid-cols-2 gap-[36px] lg:gap-[50px] items-start">
          {/* Info */}
          <div className="contact-info opacity-0">
            <p className="font-semibold text-soft-text mb-2">Estou aqui para ouvir você.</p>
            <p className="text-muted-text text-[1rem] leading-[1.8] mb-3">
              O Desbordar Afetos funciona com atendimentos presenciais e online, em um
              espaço pensado para acolher sua história com sensibilidade e respeito.
            </p>

            {[
              { label: "Email", value: "ana@desbordarafetos.com" },
              { label: "WhatsApp", value: "(11) 99999-9999" },
              { label: "Local", value: "São Paulo · SP" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 py-2.5 border-b border-soft-text/[0.05]"
              >
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-muted-text opacity-60 min-w-[60px]">
                  {item.label}
                </span>
                <span className="text-[0.95rem] text-soft-text">{item.value}</span>
              </div>
            ))}

            <div className="flex gap-4 mt-6">
              <a href="#" className="text-primary text-[0.9rem] no-underline hover:underline">
                Instagram
              </a>
              <a href="#" className="text-primary text-[0.9rem] no-underline hover:underline">
                LinkedIn
              </a>
            </div>
          </div>

          {/* Form */}
          <form
            className="contact-form bg-white py-9 px-8 rounded-[20px] shadow-[0_8px_40px_rgba(44,16,10,0.04)] border border-primary/[0.04] opacity-0"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="block text-[0.85rem] font-medium text-soft-text mb-1">
                Nome
              </label>
              <input
                type="text"
                placeholder="Seu nome"
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-[0.85rem] font-medium text-soft-text mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="seu@email.com"
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-[0.85rem] font-medium text-soft-text mb-1">
                Mensagem
              </label>
              <textarea
                placeholder="Como posso ajudar você?"
                required
                className={`${inputClass} resize-y min-h-[120px]`}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 bg-primary text-white rounded-[60px] font-body text-[1rem] font-medium cursor-pointer border-none transition-all duration-300 hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(122,26,46,0.25)]"
            >
              Enviar mensagem
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
