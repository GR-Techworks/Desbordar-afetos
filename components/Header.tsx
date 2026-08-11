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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);

  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Considera que a hero section passou a partir de 70% da altura da tela (ou ~600px)
      const heroThreshold = window.innerHeight * 0.7;
      setIsPastHero(currentScrollY > heroThreshold);

      if (!isPinned) {
        if (currentScrollY <= 10) {
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY.current) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }

      setIsScrolled(currentScrollY > 50);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isPinned]);

  const closeMenu = () => setIsMobileMenuOpen(false);
  const headerVisible = isVisible || isMobileMenuOpen || isPinned;

  return (
    <>
      {/* ─── BOTÃO DE ABAIXAR O MENU (Aparece somente após a Hero e quando o header estiver escondido) ─── */}
      {!headerVisible && isPastHero && (
        <button
          onClick={() => setIsPinned(true)}
          aria-label="Abrir menu"
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 
                     bg-white/50 backdrop-blur-md border border-white/40 shadow-lg 
                     text-zinc-800 hover:text-primary hover:bg-white/80 
                     px-4 py-2 rounded-full text-sm font-medium 
                     flex items-center gap-2 transition-all duration-300 
                     hover:scale-105 cursor-pointer"
        >
          <span>Menu</span>
          <svg
            className="w-4 h-4"
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
      )}

      {/* ─── HEADER PILL ─── */}
      <header
        className={`fixed top-0 left-0 w-full z-50 p-4 transition-transform duration-500 ease-out ${
          headerVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto flex items-center justify-between gap-1 max-w-5xl rounded-full bg-white/40 backdrop-blur-md border border-white/30 shadow-lg px-3 py-2 md:px-6 md:py-3 transition-colors duration-300 relative">
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
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              // Item com Dropdown
              if (link.dropdown) {
                return (
                  <div key={link.name} className="relative group">
                    <button className="text-sm font-medium px-3 lg:px-4 py-2 rounded-full transition-all duration-300 text-zinc-800 hover:text-primary hover:bg-white/50 flex items-center gap-1 cursor-pointer">
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

                    {/* Submenu Floating Box */}
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
                  className={`text-sm font-medium px-3 lg:px-4 py-2 rounded-full transition-all duration-300 ${
                    link.name === "Agendamento"
                      ? "bg-primary text-white shadow-md hover:bg-primary/90"
                      : "text-zinc-800 hover:text-primary hover:bg-white/50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Botão para fechar no Desktop quando fixado */}
            {isPinned && (
              <button
                onClick={() => setIsPinned(false)}
                title="Fechar/Ocultar menu"
                className="ml-2 p-1.5 rounded-full text-zinc-600 hover:text-zinc-900 hover:bg-white/50 transition-colors"
                aria-label="Ocultar menu"
              >
                <svg
                  className="w-4 h-4"
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

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 md:hidden">
            {isPinned && (
              <button
                onClick={() => setIsPinned(false)}
                className="p-1.5 rounded-full text-zinc-800 hover:bg-white/50 transition-colors"
                aria-label="Ocultar menu"
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
        </div>
      </header>

      {/* Menu Mobile Drawer */}
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
