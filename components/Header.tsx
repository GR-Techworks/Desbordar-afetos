"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Movido para fora para não recriar a lista a cada renderização
const navLinks = [
  { name: "Recepção", href: "#reception" },
  { name: "Conexão", href: "#connection" },
  { name: "Expressão", href: "#expression" },
  { name: "Autonomia", href: "#autonomy" },
  { name: "Vulnerabilidade", href: "#vulnerability" },
  { name: "Têxtil", href: "#textile" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      // 1. Define se a página rolou (passou de 50 pixels) para escurecer os textos
      setIsScrolled(window.scrollY > 880);

      // 2. Descobre qual seção está atualmente visível na tela
      let current = "hero";
      for (const link of navLinks) {
        const sectionId = link.href.substring(1); // Remove o '#' (ex: 'hero')
        const element = document.getElementById(sectionId);

        if (element) {
          const rect = element.getBoundingClientRect();
          // Se o topo da seção estiver na metade superior da tela, ela é a ativa
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = sectionId;
          }
        }
      }
      setActiveSection(current);
    };

    // Adiciona o "espião" de rolagem
    window.addEventListener("scroll", handleScroll);

    // Roda uma vez assim que a página carrega para garantir as cores iniciais
    handleScroll();

    // Limpa o espião quando o componente for desmontado
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 w-xs md:w-full z-50 p-4">
      <div className="mx-auto flex items-center justify-between gap-1 max-w-5xl rounded-full bg-white/30 backdrop-blur-md border border-white/20 shadow-lg px-3 py-2 md:px-6 md:py-3 transition-colors duration-300">
        {/* Logo / Nome Atualizado */}
        <Link
          href="#hero"
          className="flex items-center justify-center gap-3 mr-2"
        >
          <img
            src="/foto-ana.jpg"
            alt="Foto de Ana Clara - Desbordar Afetos"
            className="w-8 h-8 rounded-full object-cover shadow-sm border border-white/50"
          />

          <p
            className={`text-xl font-semibold italic tracking-wide hidden md:block transition-colors duration-300 ${
              isScrolled ? "text-zinc-900" : "text-white"
            }`}
          >
            Desbordar Afetos
          </p>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-2 lg:gap-4">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-rose-900 text-white shadow-md" // Botão Ativo: Vinho claro com texto branco
                    : isScrolled
                      ? "text-zinc-800 hover:text-rose-700" // Inativo & Rolado: Escuro
                      : "text-gray-100 hover:text-white" // Inativo & No Topo: Claro
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Botão Hambúrguer (Mobile) */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1 focus:outline-none z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Abrir menu"
        >
          <span
            className={`block w-5 h-0.5 transition-all duration-300 ${
              isMobileMenuOpen
                ? "rotate-45 translate-y-2 bg-white"
                : isScrolled
                  ? "bg-zinc-900" // Escuro se rolou
                  : "bg-white" // Claro no topo
            }`}
          ></span>
          <span
            className={`block w-5 h-0.5 transition-all duration-300 ${
              isMobileMenuOpen
                ? "opacity-0"
                : isScrolled
                  ? "bg-zinc-900 opacity-100"
                  : "bg-white opacity-100"
            }`}
          ></span>
          <span
            className={`block w-5 h-0.5 transition-all duration-300 ${
              isMobileMenuOpen
                ? "-rotate-45 -translate-y-2 bg-white"
                : isScrolled
                  ? "bg-zinc-900"
                  : "bg-white"
            }`}
          ></span>
        </button>
      </div>

      {/* Menu Flutuante Mobile */}
      <div
        className={`fixed top-0 right-0 h-full w-[240px] bg-white/95 backdrop-blur-xl shadow-2xl border-l border-white/40 z-40 p-6 pt-28 flex flex-col transition-transform duration-300 md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col gap-3 text-center">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                className={`text-lg font-medium py-3 rounded-xl transition-colors ${
                  isActive
                    ? "bg-rose-700 text-white shadow-md"
                    : "text-zinc-800 hover:bg-zinc-100"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
