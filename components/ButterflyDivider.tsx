"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CollageTransition() {
  const butterflyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cria um efeito Parallax: a borboleta se move um pouco mais devagar
      // que o scroll da página, dando a sensação de estar flutuando
      gsap.to(butterflyRef.current, {
        y: 60, // A distância que ela vai se deslocar para baixo
        rotation: 4, // Uma leve inclinação para dar mais vida
        ease: "none",
        scrollTrigger: {
          trigger: butterflyRef.current,
          start: "top bottom", // Começa a animar quando entra na tela
          end: "bottom top", // Termina quando sai da tela
          scrub: 1, // Deixa a animação amarrada ao movimento suave do mouse/dedo
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    // O wrapper usa -my-16 para "invadir" a seção de cima e a de baixo
    // O pointer-events-none garante que a imagem não atrapalhe cliques em links próximos
    <div className="relative w-full flex justify-center -my-16 md:-my-24 z-20 pointer-events-none overflow-visible">
      <div ref={butterflyRef} className="relative">
        {/* Elemento de fundo geométrico da colagem (círculo amarelo) */}
        <div className="absolute -z-10 -bottom-2 -right-4 w-20 h-20 bg-[#F4C563] rounded-full mix-blend-multiply opacity-80" />

        {/* Imagem Principal Recortada */}
        <img
          src="/vintage-butterfly.png" // Substitua pelo caminho do seu PNG
          alt="Colagem de Borboleta"
          className="w-32 md:w-48 drop-shadow-[0_10px_15px_rgba(0,0,0,0.15)] rotate-[-5deg]"
        />
      </div>
    </div>
  );
}
