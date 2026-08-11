/**
 * WaveDivider — transição orgânica entre seções.
 *
 * Uso em page.tsx:
 *   <WaveDivider from="#1a0a08" to="#f0e6d2" />
 *
 * Props:
 *   from  → cor da seção ACIMA  (ex: cor de fundo do Hero)
 *   to    → cor da seção ABAIXO (ex: cor de fundo da Reception)
 *   flip  → inverte verticalmente (para usar a onda de cabeça pra baixo)
 *   height → altura em px da zona de transição (padrão 80)
 */
export default function WaveDivider({
  from,
  to,
  flip = false,
  height = 80,
}: {
  from: string;
  to: string;
  flip?: boolean;
  height?: number;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        backgroundColor: from,     // cor que "fica atrás"
        lineHeight: 0,
        display: "block",
        overflow: "hidden",
        // ocupa espaço próprio — não usa margin negativo
        // para evitar conflitos com z-index das seções
      }}
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        width="100%"
        height={height}
        style={{ display: "block", transform: flip ? "scaleY(-1)" : "none" }}
      >
        {/*
          Onda dupla para suavizar a transição:
          — camada de fundo mais suave (opacidade média)
          — camada principal sólida por cima
          O efeito final é parecido com tinta absorvida por tecido.
        */}
        <path
          d="M0 50 C 180 15, 360 70, 540 40 S 900 5, 1080 45 S 1300 70, 1440 30 L1440 80 L0 80 Z"
          fill={to}
          opacity="0.45"
        />
        <path
          d="M0 62 C 200 28, 400 72, 620 48 S 960 18, 1160 55 S 1350 72, 1440 44 L1440 80 L0 80 Z"
          fill={to}
        />
      </svg>
    </div>
  );
}
