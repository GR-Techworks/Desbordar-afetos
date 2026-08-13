"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Section = { id: string; label: string };

// Order matches the sections rendered in app/page.tsx
const DEFAULT_SECTIONS: Section[] = [
  { id: "hero", label: "Início" },
  { id: "connection", label: "Conexão" },
  { id: "reception", label: "Acolhimento" },
  { id: "expression", label: "Expressão" },
  { id: "autonomy", label: "Autonomia" },
  { id: "community", label: "Comunidade" },
  { id: "textile", label: "Têxtil" },
  { id: "vulnerability", label: "Vulnerabilidade" },
  { id: "contact", label: "Contato" },
];

type Point = Section & {
  progress: number; // scroll progress (0–1) at which this section starts
  x: number; // position along the SVG path, viewBox coords (0–20)
  y: number; // position along the SVG path, viewBox coords (0–100)
};

export default function ThreadProgress({
  sections = DEFAULT_SECTIONS,
}: {
  sections?: Section[];
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);

  const [points, setPoints] = useState<Point[]>([]);
  const pointsRef = useRef<Point[]>([]);

  const maxScrollRef = useRef(1);
  const viewportHeightRef = useRef(1);

  useEffect(() => {
    pointsRef.current = points;
  }, [points]);

  const [activeDotId, setActiveDotId] = useState<string | null>(null);
  const [activeBadgeId, setActiveBadgeId] = useState<string | null>(null);

  const measurePoints = useCallback(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    const vh = window.innerHeight;
    viewportHeightRef.current = vh;

    const maxScroll = Math.max(document.documentElement.scrollHeight - vh, 1);
    maxScrollRef.current = maxScroll;

    const measured = sections
      .map((s, index) => {
        const el = document.getElementById(s.id);
        if (!el) return null;

        const absoluteTop = el.getBoundingClientRect().top + window.scrollY;
        const offset = vh * 0.35;
        let targetScroll = absoluteTop - offset;

        // Se for o primeiro ponto (hero), aplicamos uma folga extra para não colar no topo absoluto
        if (s.id === "hero" || index === 0) {
          targetScroll = vh * 0.15; // Joga o primeiro ponto um pouco mais para baixo
        } else if (targetScroll < 0) {
          targetScroll = 0;
        }

        const progress = Math.min(targetScroll / maxScroll, 1);
        const { x, y } = path.getPointAtLength(length * progress);

        return { ...s, progress, x, y };
      })
      .filter((p): p is Point => p !== null)
      .sort((a, b) => a.progress - b.progress);

    setPoints(measured);
  }, [sections]);

  useEffect(() => {
    const path = pathRef.current;
    const dot = dotRef.current;
    const rail = railRef.current;
    if (!path || !dot || !rail) return;

    const length = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    measurePoints();

    const settleTimeout = setTimeout(measurePoints, 300);
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(measurePoints, 200);
    };
    window.addEventListener("resize", onResize);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const p = self.progress;

          gsap.set(path, { strokeDashoffset: length * (1 - p) });

          const point = path.getPointAtLength(length * p);
          gsap.set(dot, { attr: { cx: point.x, cy: point.y } });

          rail.style.opacity = p > 0.015 && p < 0.99 ? "1" : "0";

          const pts = pointsRef.current;
          const maxScroll = maxScrollRef.current;
          const vh = viewportHeightRef.current;

          let currentDot: string | null = null;
          let currentBadge: string | null = null;

          const touchTolerance = 18 / vh;
          const badgeDuration = 500 / maxScroll;

          for (let i = 0; i < pts.length; i++) {
            const start = pts[i].progress - touchTolerance;
            const end = pts[i + 1] ? pts[i + 1].progress - touchTolerance : 1.1;

            if (p >= start && p < end) {
              currentDot = pts[i].id;
            }

            const badgeStart = pts[i].progress - touchTolerance - 0.01;
            const badgeEnd = pts[i].progress + badgeDuration;

            if (p >= badgeStart && p <= badgeEnd) {
              currentBadge = pts[i].id;
            }
          }

          setActiveDotId(currentDot);
          setActiveBadgeId(currentBadge);
        },
      });
    });

    return () => {
      ctx.revert();
      clearTimeout(settleTimeout);
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", onResize);
    };
  }, [measurePoints]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      ref={railRef}
      className="pointer-events-none fixed left-5 top-0 z-40 hidden h-screen w-6 md:block lg:left-8"
      style={{ opacity: 0, transition: "opacity 0.6s ease" }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 20 100"
        preserveAspectRatio="none"
        className="h-full w-full overflow-visible"
      >
        <path
          d="M10 0 C 4 12, 16 24, 10 36 S 4 60, 10 72 S 16 92, 10 100"
          stroke="#7c070c"
          strokeOpacity="0.12"
          strokeWidth="0.6"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />

        <path
          ref={pathRef}
          d="M10 0 C 4 12, 16 24, 10 36 S 4 60, 10 72 S 16 92, 10 100"
          stroke="#7c070c"
          strokeWidth="0.9"
          strokeLinecap="round"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />

        <circle ref={dotRef} cx="10" cy="0" r="1.8" fill="#7c070c" />
      </svg>

      {/* Embroidery points — one per section, plus their name badges */}
      {points.map((point) => {
        const isDotActive = activeDotId === point.id;
        const isBadgeActive = activeBadgeId === point.id;

        return (
          <button
            key={point.id}
            type="button"
            onClick={() => scrollToSection(point.id)}
            aria-label={`Ir para a seção ${point.label}`}
            aria-current={isDotActive ? "true" : undefined}
            className="group pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 p-2"
            style={{
              left: `${(point.x / 20) * 100}%`,
              top: `${point.y}%`,
            }}
          >
            {/* The stitch mark itself — uses isDotActive */}
            <span
              className={`block rounded-full border transition-all duration-300 ${
                isDotActive
                  ? "h-3 w-3 scale-110 border-[#7c070c] bg-[#7c070c]"
                  : "h-2 w-2 border-[#7c070c]/50 bg-[#fdf7f2] group-hover:scale-125 group-hover:border-[#7c070c]"
              }`}
            />

            {/* Name badge — uses isBadgeActive, but always visible on hover */}
            <span
              className={`pointer-events-none absolute left-full top-1/2 ml-2 -translate-y-1/2 whitespace-nowrap rounded-full bg-[#7c070c] px-3 py-1 text-xs font-medium text-[#fdf7f2] shadow-md transition-all duration-500 ease-out ${
                isBadgeActive
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
              }`}
            >
              {point.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
