"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsVisible(y > 80);
      setIsScrolled(y > 880);

      let current = "hero";
      for (const link of navLinks) {
        const el = document.getElementById(link.href.substring(1));
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150)
            current = link.href.substring(1);
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);
  const headerVisible = isVisible || isMobileMenuOpen;

  return (
    <>
      {/*
        ─── HEADER PILL ────────────────────────────────────────────
        Usa transition-transform para o show/hide.

        IMPORTANTE: o drawer mobile NÃO pode ser filho deste elemento.
        Qualquer `position: fixed` dentro de um pai com CSS transform
        passa a se posicionar relativo ao pai — não à viewport — e
        quebra o posicionamento. O drawer fica no fragmento abaixo,
        como elemento irmão.
      */}
      <header
        className={[
          "fixed top-0 left-0 w-xs md:w-full z-50 p-4",
          "transition-transform duration-500 ease-out",
          headerVisible ? "translate-y-0" : "-translate-y-full",
        ].join(" ")}
      >
        <div className="mx-auto flex items-center justify-between gap-1 max-w-5xl rounded-full bg-white/30 backdrop-blur-md border border-white/20 shadow-lg px-3 py-2 md:px-6 md:py-3 transition-colors duration-300">
          {/* Logo */}
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
                      ? "bg-rose-900 text-white shadow-md"
                      : isScrolled
                        ? "text-zinc-800 hover:text-rose-700"
                        : "text-gray-100 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Hambúrguer mobile */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            <span
              className={`block w-5 h-0.5 transition-all duration-300 ${
                isMobileMenuOpen
                  ? "rotate-45 translate-y-2 bg-white"
                  : isScrolled
                    ? "bg-zinc-900"
                    : "bg-white"
              }`}
            />
            <span
              className={`block w-5 h-0.5 transition-all duration-300 ${
                isMobileMenuOpen
                  ? "opacity-0"
                  : isScrolled
                    ? "bg-zinc-900 opacity-100"
                    : "bg-white opacity-100"
              }`}
            />
            <span
              className={`block w-5 h-0.5 transition-all duration-300 ${
                isMobileMenuOpen
                  ? "-rotate-45 -translate-y-2 bg-white"
                  : isScrolled
                    ? "bg-zinc-900"
                    : "bg-white"
              }`}
            />
          </button>
        </div>
      </header>

      <div
        className={`fixed top-0 right-0 h-full w-[240px] z-40 md:hidden
          bg-white/95 backdrop-blur-xl shadow-2xl border-l border-white/40
          p-6 pt-28 flex flex-col
          transition-transform duration-300
          ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
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
    </>
  );
}
