"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FloatingButterflyProps {
  side: "left" | "right";
  top?: string; // Posição inicial no eixo Y (ex: "10%", "20px")
  scale?: number; // Para variar o tamanho entre as sessões
  rotation?: number; // Rotação inicial
}

export default function FloatingButterfly({
  side,
  top = "10%",
  scale = 1,
  rotation = 0,
}: FloatingButterflyProps) {
  const butterflyRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação de "voo" durante o scroll
      gsap.to(butterflyRef.current, {
        y: "250px", // Distância que ela desce ao longo da sessão
        x: side === "left" ? "40px" : "-40px", // Vai levemente para o centro
        rotation: side === "left" ? rotation + 25 : rotation - 25,
        ease: "sine.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%", // Começa quando o topo do container chega a 80% da tela
          end: "bottom top",
          scrub: 1.5, // Deixa o movimento bem suave e amarrado ao scroll
        },
      });
    });

    return () => ctx.revert();
  }, [side, rotation]);

  return (
    <div
      ref={containerRef}
      className={`absolute z-10 pointer-events-none opacity-30 md:opacity-95 transition-opacity`}
      style={{
        top: top,
        // Posiciona na esquerda ou direita, escondendo um pouco no mobile para não atrapalhar a leitura
        left: side === "left" ? "-20px" : "auto",
        right: side === "right" ? "-20px" : "auto",
        // Afasta das bordas no desktop
        ...(side === "left"
          ? { marginLeft: "min(4vw, 3rem)" }
          : { marginRight: "min(4vw, 3rem)" }),
      }}
    >
      <div
        ref={butterflyRef}
        className="relative"
        style={{ transform: `scale(${scale}) rotate(${rotation}deg)` }}
      >
        <div className="absolute -z-10 bottom-2 right-1 w-10 h-10 bg-[#F4C563] rounded-full mix-blend-multiply opacity-80" />
        <div className="absolute -z-10 bottom-4 left-1 w-10 h-10 bg-[#B0CDE6] rounded-full mix-blend-multiply opacity-80" />

        <img
          src="/vintage-butterfly.png"
          alt="Borboleta decorativa"
          className="w-20 md:w-28 drop-shadow-[0_10px_15px_rgba(0,0,0,0.15)]" // Menor que a do divider
        />
      </div>
    </div>
  );
}
