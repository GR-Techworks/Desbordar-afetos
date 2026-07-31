"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  // Estado para controlar o método de contato selecionado
  const [contactMethod, setContactMethod] = useState<"whatsapp" | "email">(
    "whatsapp",
  );

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
        },
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
        },
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
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nome = formData.get("nome");
    const mensagem = formData.get("mensagem");

    if (contactMethod === "whatsapp") {
      // Formata a mensagem para o WhatsApp
      const textoBase = `Olá! Meu nome é ${nome}. ${mensagem}`;
      const textoCodificado = encodeURIComponent(textoBase);
      // ATENÇÃO: Substitua o número abaixo pelo WhatsApp real da Ana (código do país + ddd + numero)
      const numeroWhatsApp = "5511999999999";

      window.open(
        `https://wa.me/${numeroWhatsApp}?text=${textoCodificado}`,
        "_blank",
      );
    } else {
      // Lógica de envio por Email (Formspree, Resend, etc.)
      const email = formData.get("email");
      console.log("Enviar email para:", email);
      alert("Mensagem enviada por email! Em breve entrarei em contato.");
    }
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
          <span className="contact-header-item section-label opacity-0 block mb-2 font-medium tracking-wider text-sm uppercase text-primary">
            Contato
          </span>
          <h2 className="contact-header-item section-title opacity-0 text-3xl md:text-4xl font-bold mb-4">
            Vamos <span className="text-primary">conversar</span>?
          </h2>
          <p
            className="contact-header-item section-subtitle mx-auto text-center opacity-0 text-soft-text/80"
            style={{ maxWidth: "480px" }}
          >
            Entre em contato para agendar sua primeira conversa ou tirar
            dúvidas.
          </p>
        </div>

        <div className="contact-grid grid grid-cols-1 md:grid-cols-2 gap-[36px] lg:gap-[50px] items-start">
          {/* Info */}
          <div className="contact-info opacity-0">
            <p className="font-semibold text-soft-text mb-2 text-lg">
              Estou aqui para ouvir você.
            </p>
            <p className="text-muted-text text-[1rem] leading-[1.8] mb-8 text-soft-text/80">
              O Desbordar Afetos é um espaço pensado para acolher sua história
              com sensibilidade e respeito. Os atendimentos são realizados de
              forma totalmente online, adaptando-se à sua rotina.
            </p>

            <div className="flex flex-col gap-1 mb-8">
              {[
                { label: "Email", value: "ana@desbordarafetos.com" },
                { label: "WhatsApp", value: "(32) 99817-5767" },
                { label: "Local", value: "100% online" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 py-3 border-b border-soft-text/[0.05]"
                >
                  <span className="font-mono text-[0.75rem] uppercase tracking-[0.1em] text-soft-text/60 min-w-[70px]">
                    {item.label}
                  </span>
                  <span className="text-[0.95rem] text-soft-text font-medium">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Redes Sociais */}
            <div>
              <span className="block font-mono text-[0.75rem] uppercase tracking-[0.1em] text-soft-text/60 mb-4">
                Acompanhe nas redes
              </span>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/desbordar_afetos/"
                  target="_blank"
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-soft-text/10 text-soft-text hover:text-primary hover:border-primary/30 transition-all"
                >
                  {/* Ícone Instagram */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <span className="text-sm font-medium">Instagram</span>
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-soft-text/10 text-soft-text hover:text-primary hover:border-primary/30 transition-all"
                >
                  {/* Ícone TikTok (simplificado/padrão SVG) */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                  </svg>
                  <span className="text-sm font-medium">TikTok</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            className="contact-form bg-white p-8 rounded-[24px] shadow-sm border border-soft-text/5 opacity-0"
            onSubmit={handleSubmit}
          >
            {/* Toggle Switch */}
            <div className="flex p-1 bg-warm-beige/50 rounded-xl mb-6">
              <button
                type="button"
                onClick={() => setContactMethod("whatsapp")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  contactMethod === "whatsapp"
                    ? "bg-white text-primary shadow-sm"
                    : "text-soft-text/60 hover:text-soft-text"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
                WhatsApp
              </button>
              <button
                type="button"
                onClick={() => setContactMethod("email")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  contactMethod === "email"
                    ? "bg-white text-primary shadow-sm"
                    : "text-soft-text/60 hover:text-soft-text"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                Email
              </button>
            </div>

            <div>
              <label className="block text-[0.85rem] font-medium text-soft-text mb-1.5 ml-1">
                Nome
              </label>
              <input
                type="text"
                name="nome"
                placeholder="Seu nome"
                required
                className={inputClass}
              />
            </div>

            {/* Renderização condicional: Só aparece se a aba for "email" */}
            {contactMethod === "email" && (
              <div>
                <label className="block text-[0.85rem] font-medium text-soft-text mb-1.5 ml-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="seu@email.com"
                  required
                  className={inputClass}
                />
              </div>
            )}

            <div>
              <label className="block text-[0.85rem] font-medium text-soft-text mb-1.5 ml-1">
                Mensagem
              </label>
              <textarea
                name="mensagem"
                placeholder="Como posso ajudar você?"
                required
                className={`${inputClass} resize-y min-h-[120px]`}
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 mt-2 bg-primary text-white rounded-[12px] font-body text-[1rem] font-medium cursor-pointer border-none transition-all duration-300 hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20"
            >
              <span>
                {contactMethod === "whatsapp"
                  ? "Enviar via WhatsApp"
                  : "Enviar mensagem"}
              </span>
              {/* Ícone de Avião de Papel */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="-mt-0.5"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
