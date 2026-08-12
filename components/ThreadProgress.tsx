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

/**
 * A fixed thread that draws down the left edge of the viewport as you scroll —
 * visualising progress as a running stitch rather than a generic progress bar.
 * A small needle dot rides the live tip of the thread.
 *
 * "Embroidery points" are plotted along the thread at each section's start.
 * The point nearest the current scroll position lights up and reveals a
 * badge with the section name; scrolling past it fades the badge back out.
 * Every point is clickable and scrolls the user straight to that section.
 *
 * Only visible on md+ screens (hidden on mobile where the rail would crowd the UI).
 * Fades in after the first ~1.5% of scroll and out near the very bottom.
 */
export default function ThreadProgress({
  sections = DEFAULT_SECTIONS,
}: {
  sections?: Section[];
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);

  const [points, setPoints] = useState<Point[]>([]);
  const pointsRef = useRef<Point[]>([]); // mirror of `points`, read inside the onUpdate closure
  useEffect(() => {
    pointsRef.current = points;
  }, [points]);

  const [activeId, setActiveId] = useState<string | null>(null);

  // Recalculate where each section falls along the path. Needs to re-run on
  // resize since responsive layout can shift section offsets significantly.
  const measurePoints = useCallback(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    const maxScroll = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      1,
    );

    const measured = sections
      .map((s) => {
        const el = document.getElementById(s.id);
        if (!el) return null;
        const top = el.getBoundingClientRect().top + window.scrollY;
        const progress = Math.min(Math.max(top / maxScroll, 0), 1);
        const { x, y } = path.getPointAtLength(length * progress);
        return { ...s, progress, x, y };
      })
      .filter((p): p is Point => p !== null)
      .sort((a, b) => a.progress - b.progress);

    // Empurra o primeiro ponto um pouco pra baixo e o último um pouco pra
    // cima, só para não colarem nas pontas do fio (topo/base da tela).
    const EDGE_INSET = 0.04; // 3% do percurso — ajuste ao gosto
    if (measured.length > 0) {
      const first = measured[0];
      const adjustedFirst = Math.min(
        first.progress + EDGE_INSET,
        measured[1]?.progress ?? 1,
      );
      const firstPt = path.getPointAtLength(length * adjustedFirst);
      measured[0] = {
        ...first,
        progress: adjustedFirst,
        x: firstPt.x,
        y: firstPt.y,
      };

      const lastIdx = measured.length - 1;
      const last = measured[lastIdx];
      const adjustedLast = Math.max(
        last.progress - EDGE_INSET,
        measured[lastIdx - 1]?.progress ?? 0,
      );
      const lastPt = path.getPointAtLength(length * adjustedLast);
      measured[lastIdx] = {
        ...last,
        progress: adjustedLast,
        x: lastPt.x,
        y: lastPt.y,
      };
    }

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
    // Layout can still shift after fonts/images finish loading, so measure
    // again shortly after mount, plus on every resize (debounced).
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

          // Active section = last embroidery point whose start progress
          // has been reached but whose *next* point hasn't been yet.
          const pts = pointsRef.current;
          let current: string | null = null;
          for (let i = 0; i < pts.length; i++) {
            const start = pts[i].progress;
            const end = pts[i + 1]?.progress ?? 1;
            if (p >= start && p < end) {
              current = pts[i].id;
              break;
            }
          }
          setActiveId((prev) => (prev === current ? prev : current));
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
    // If there's a fixed header, add `scroll-margin-top` to the section
    // wrappers in page.tsx so this lands below it.
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
        const isActive = activeId === point.id;
        return (
          <button
            key={point.id}
            type="button"
            onClick={() => scrollToSection(point.id)}
            aria-label={`Ir para a seção ${point.label}`}
            aria-current={isActive ? "true" : undefined}
            className="group pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 p-2"
            style={{
              left: `${(point.x / 20) * 100}%`,
              top: `${point.y}%`,
            }}
          >
            {/* The stitch mark itself — always visible, grows when active */}
            <span
              className={`block rounded-full border transition-all duration-300 ${
                isActive
                  ? "h-3 w-3 scale-110 border-[#7c070c] bg-[#7c070c]"
                  : "h-2 w-2 border-[#7c070c]/50 bg-[#fdf7f2] group-hover:scale-125 group-hover:border-[#7c070c]"
              }`}
            />

            {/* Name badge — fades/slides in when this section is active or hovered */}
            <span
              className={`pointer-events-none absolute left-full top-1/2 ml-2 -translate-y-1/2 whitespace-nowrap rounded-full bg-[#7c070c] px-3 py-1 text-xs font-medium text-[#fdf7f2] shadow-md transition-all duration-500 ease-out ${
                isActive
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
