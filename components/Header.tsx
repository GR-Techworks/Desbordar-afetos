"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface NavItem {
  name: string;
  href?: string;
  isExternal?: boolean;
  dropdown?: { name: string; href: string }[];
}

const navLinks: NavItem[] = [
  { name: "Agendamento", href: "#contact", isExternal: false },
  {
    name: "Comunidade",
    href: "https://chat.whatsapp.com/H7pqxlyzjbwCqsS9g0poMS",
    isExternal: true,
  },
  {
    name: "Grupos",
    dropdown: [
      {
        name: "Grupo de Literatura",
        href: "https://forms.gle/mnm9hFyKMFJD3o5n8",
      },
      {
        name: "Grupo de Estudos",
        href: "https://forms.gle/EdrPZ4LhfcbeWw5x6",
      },
    ],
  },
  {
    name: "Artigo (TCC)",
    href: "https://seer.uniacademia.edu.br/index.php/cadernospsicologia/article/view/4755/3596",
    isExternal: true,
  },
  {
    name: "Newsletter",
    href: "https://open.substack.com/pub/anaclarabrcontato?utm_source=share&utm_medium=android&r=1nnmvl",
    isExternal: true,
  },
];

export default function Header() {
  // Estados Gerais
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  // Estados Mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileVisible, setIsMobileVisible] = useState(false);

  // Estado Desktop
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // === LÓGICA MOBILE ===
      // Funciona exatamente como antes: esconde descendo, aparece subindo
      if (currentScrollY <= 10) {
        setIsMobileVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        setIsMobileVisible(true);
      } else {
        setIsMobileVisible(false);
      }

      // === LÓGICA DESKTOP ===
      // Define se passamos do topo da página
      setIsScrolled(currentScrollY > 50);

      // Recolhe automaticamente o menu expandido no desktop se o usuário voltar a rolar a página
      if (
        isDesktopExpanded &&
        Math.abs(currentScrollY - lastScrollY.current) > 50
      ) {
        setIsDesktopExpanded(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDesktopExpanded]);

  const closeMenu = () => setIsMobileMenuOpen(false);
  const isPillMode = isScrolled && !isDesktopExpanded;

  return (
    <>
      {/* 
        =========================================
        🌟 DESKTOP HEADER (Expandível para os lados)
        =========================================
      */}
      <div className="hidden md:flex fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500">
        <div
          className={`flex items-center bg-white/70 backdrop-blur-md border border-white/40 rounded-full shadow-lg p-2 transition-all duration-700 ease-in-out ${
            isPillMode
              ? "max-w-[115px] overflow-hidden cursor-pointer hover:bg-white/90 hover:scale-105"
              : "max-w-[1000px] cursor-default"
          }`}
          onClick={() => {
            if (isPillMode) setIsDesktopExpanded(true);
          }}
          title={isPillMode ? "Abrir menu" : ""}
        >
          {/* Avatar & Nome */}
          <Link
            href="#hero"
            className="flex-shrink-0 flex items-center gap-3 cursor-pointer pl-1"
            onClick={(e) => {
              if (isPillMode) {
                e.preventDefault(); // Impede de subir pro topo ao clicar para expandir
              }
            }}
          >
            <img
              src="/foto-ana.jpg"
              alt="Foto de Ana Clara"
              className="w-10 h-10 rounded-full object-cover shadow-sm border border-white/50"
            />
            <p
              className={`text-xl font-semibold italic tracking-wide text-zinc-900 transition-all duration-500 whitespace-nowrap overflow-hidden ${
                isPillMode
                  ? "max-w-0 opacity-0 mr-0"
                  : "max-w-[200px] opacity-100 mr-4"
              }`}
            >
              Desbordar Afetos
            </p>
          </Link>

          {/* Nav Links */}
          <nav
            className={`flex items-center transition-all duration-700 ease-in-out overflow-hidden ${
              isPillMode
                ? "max-w-0 opacity-0 gap-0 pointer-events-none"
                : "max-w-[800px] opacity-100 gap-1 lg:gap-2 pointer-events-auto"
            }`}
          >
            {navLinks.map((link) => {
              // Item com Dropdown
              if (link.dropdown) {
                return (
                  <div key={link.name} className="relative group shrink-0">
                    <button className="text-sm font-medium px-3 lg:px-4 py-2 rounded-full transition-all duration-300 text-zinc-800 hover:text-primary hover:bg-white/50 flex items-center gap-1 cursor-pointer whitespace-nowrap">
                      <span>{link.name}</span>
                      <svg
                        className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[200px]">
                      <div className="bg-white/95 backdrop-blur-md border border-white/40 rounded-2xl shadow-xl p-2 flex flex-col gap-1">
                        {link.dropdown.map((subItem) => (
                          <a
                            key={subItem.name}
                            href={subItem.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-medium text-zinc-800 hover:text-primary hover:bg-zinc-100/80 px-3 py-2 rounded-xl transition-colors text-left block whitespace-nowrap"
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              // Item simples
              return (
                <Link
                  key={link.name}
                  href={link.href!}
                  target={link.isExternal ? "_blank" : "_self"}
                  rel={link.isExternal ? "noopener noreferrer" : ""}
                  className={`text-sm font-medium px-3 lg:px-4 py-2 rounded-full transition-all duration-300 whitespace-nowrap shrink-0 ${
                    link.name === "Agendamento"
                      ? "bg-primary text-white shadow-md hover:bg-primary/90"
                      : "text-zinc-800 hover:text-primary hover:bg-white/50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Botão de Fechar o Menu (quando expandido pela rolagem) */}
            {isScrolled && isDesktopExpanded && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDesktopExpanded(false);
                }}
                title="Recolher menu"
                className="ml-2 p-1.5 rounded-full text-zinc-600 bg-white/40 hover:text-zinc-900 hover:bg-white/80 transition-colors shrink-0"
                aria-label="Recolher menu"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </nav>

          {/* Hambúrguer Ícone (Aparece apenas quando compactado em pílula) */}
          <div
            className={`flex-shrink-0 flex flex-col justify-center items-center space-y-[4px] transition-all duration-700 overflow-hidden ${
              isPillMode ? "w-10 opacity-100 ml-1" : "w-0 opacity-0 ml-0"
            }`}
          >
            <span className="block w-[18px] h-[2px] bg-zinc-800 rounded-full"></span>
            <span className="block w-[18px] h-[2px] bg-zinc-800 rounded-full"></span>
            <span className="block w-[18px] h-[2px] bg-zinc-800 rounded-full"></span>
          </div>
        </div>
      </div>

      {/* 
        =========================================
        📱 MOBILE HEADER (Desce e sobe com scroll)
        =========================================
      */}
      <header
        className={`md:hidden fixed top-0 left-0 w-full z-50 p-4 transition-transform duration-500 ease-out ${
          isMobileVisible || isMobileMenuOpen
            ? "translate-y-0"
            : "-translate-y-full"
        }`}
      >
        <div className="mx-auto flex items-center justify-between gap-1 w-full rounded-full bg-white/40 backdrop-blur-md border border-white/30 shadow-lg px-4 py-2 transition-colors duration-300 relative">
          <Link href="#hero" className="flex items-center justify-center gap-3">
            <img
              src="/foto-ana.jpg"
              alt="Foto de Ana Clara"
              className="w-9 h-9 rounded-full object-cover shadow-sm border border-white/50"
            />
          </Link>

          {/* Mobile Hamburguer Action */}
          <button
            className="flex flex-col justify-center items-center w-8 h-8 space-y-1 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            <span
              className={`block w-5 h-0.5 transition-all duration-300 ${
                isMobileMenuOpen
                  ? "rotate-45 translate-y-2 bg-zinc-900"
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
                  ? "-rotate-45 -translate-y-2 bg-zinc-900"
                  : isScrolled
                    ? "bg-zinc-900"
                    : "bg-white"
              }`}
            />
          </button>
        </div>
      </header>

      {/* 📱 Menu Mobile Drawer Lateral */}
      <div
        className={`fixed top-0 right-0 h-full w-[270px] z-40 md:hidden
          bg-white/95 backdrop-blur-xl shadow-2xl border-l border-white/40
          p-6 pt-28 flex flex-col
          transition-transform duration-300
          ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <nav className="flex flex-col gap-3 text-center">
          {navLinks.map((link) => {
            if (link.dropdown) {
              return (
                <div key={link.name} className="flex flex-col gap-1.5 py-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    {link.name}
                  </span>
                  {link.dropdown.map((subItem) => (
                    <a
                      key={subItem.name}
                      href={subItem.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMenu}
                      className="text-[0.95rem] font-medium py-2.5 px-3 rounded-xl text-zinc-800 bg-zinc-100/80 hover:bg-zinc-200/80 transition-colors"
                    >
                      {subItem.name}
                    </a>
                  ))}
                </div>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href!}
                target={link.isExternal ? "_blank" : "_self"}
                rel={link.isExternal ? "noopener noreferrer" : ""}
                onClick={closeMenu}
                className={`text-[1.05rem] font-medium py-3 rounded-xl transition-colors ${
                  link.name === "Agendamento"
                    ? "bg-primary text-white shadow-md"
                    : "text-zinc-800 hover:bg-zinc-100 border border-transparent hover:border-zinc-200"
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
