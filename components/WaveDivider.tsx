/**
 * WaveDivider — transição orgânica entre seções.
 */
export default function WaveDivider({
  from,
  to,
  toStyle, // Nova propriedade para receber texturas/gradientes em CSS
  flip = false,
  height = 80,
}: {
  from: string;
  to?: string;
  toStyle?: React.CSSProperties;
  flip?: boolean;
  height?: number;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        // O pulo do gato: aplica a textura complexa no fundo da div!
        ...(toStyle || { backgroundColor: to }),
        lineHeight: 0,
        display: "block",
        overflow: "hidden",
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
          INVERTIDO: Agora o SVG desenha de CIMA para BAIXO.
          Ele usa a cor sólida da seção superior ('from') e deixa a textura inferior ('toStyle') aparecer no recorte.
        */}
        <path
          d="M0 62 C 200 28, 400 72, 620 48 S 960 18, 1160 55 S 1350 72, 1440 44 L1440 0 L0 0 Z"
          fill={from}
          opacity="0.45"
        />
        <path
          d="M0 50 C 180 15, 360 70, 540 40 S 900 5, 1080 45 S 1300 70, 1440 30 L1440 0 L0 0 Z"
          fill={from}
        />
      </svg>
    </div>
  );
}
