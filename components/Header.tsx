"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Início", href: "#hero" },
    { name: "Jornada", href: "#journey" },
    { name: "Práticas", href: "#practices" },
    { name: "Ana", href: "#ana" },
    { name: "Contato", href: "#contact" },
  ];

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    // Note que fixamos o pt-4 e px-4 aqui para ele sempre ficar descolado do topo
    <header className="fixed top-0 left-0 w-full z-50 px-4 pt-4">
      {/* Container principal com o efeito Glassmorphism fixo */}
      <div className="mx-auto flex items-center justify-between max-w-5xl rounded-2xl bg-white/30 backdrop-blur-md border border-white/20 shadow-lg px-6 py-3">
        
        {/* Logo / Nome */}
        <Link href="#hero" className="text-xl font-semibold tracking-wide text-zinc-900">
          DESBORDAR
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-zinc-800 hover:text-zinc-500 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Botão Hambúrguer (Mobile) */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Abrir menu"
        >
          <span
            className={`block w-6 h-0.5 bg-zinc-900 transition-transform duration-300 ${
              isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-zinc-900 transition-opacity duration-300 ${
              isMobileMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-zinc-900 transition-transform duration-300 ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Menu Flutuante Mobile */}
      <div
        className={`absolute top-20 left-4 right-4 bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl p-6 transition-all duration-300 md:hidden ${
          isMobileMenuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-4"
        }`}
      >
        <nav className="flex flex-col gap-4 text-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={closeMenu}
              className="text-lg font-medium text-zinc-800 py-2 border-b border-zinc-200/50 last:border-none"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}