"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register at module level — same pattern used in every other component.
// This was the root cause of the previous error: the old lib/gsap.ts exported
// ScrollTrigger but never called registerPlugin, so GSAP didn't know about it.
gsap.registerPlugin(ScrollTrigger);

/**
 * A fixed thread that draws down the left edge of the viewport as you scroll —
 * visualising progress as a running stitch rather than a generic progress bar.
 * A small needle dot rides the live tip of the thread.
 *
 * Only visible on md+ screens (hidden on mobile where the rail would crowd the UI).
 * Fades in after the first ~1.5% of scroll and out near the very bottom.
 */
export default function ThreadProgress() {
  const railRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const dot = dotRef.current;
    const rail = railRef.current;
    if (!path || !dot || !rail) return;

    // Measure the full path length so we can animate dashoffset 0 → length
    const length = path.getTotalLength();

    // Start fully "undrawn"
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    // gsap.context() with NO scope arg — this trigger watches document.body
    // (the whole page), not a specific section, so we don't constrain it.
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const p = self.progress;

          // 1. Grow the thread from top toward the needle tip
          gsap.set(path, { strokeDashoffset: length * (1 - p) });

          // 2. Move the needle dot along the path in SVG coordinate space.
          //    getPointAtLength() returns {x, y} in the viewBox (0 0 20 100)
          //    coordinate system; setting cx/cy attributes keeps it there.
          const point = path.getPointAtLength(length * p);
          gsap.set(dot, { attr: { cx: point.x, cy: point.y } });

          // 3. Fade the rail in after the first scroll step, out near the end
          rail.style.opacity = p > 0.015 && p < 0.99 ? "1" : "0";
        },
      });
    }); // no second arg — scope is intentionally global

    return () => ctx.revert();
  }, []);

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
        {/* Faint ghost — shows the full path before the thread catches up */}
        <path
          d="M10 0 C 4 12, 16 24, 10 36 S 4 60, 10 72 S 16 92, 10 100"
          stroke="#7c070c"
          strokeOpacity="0.12"
          strokeWidth="0.6"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />

        {/* The animated thread — grows from top as you scroll */}
        <path
          ref={pathRef}
          d="M10 0 C 4 12, 16 24, 10 36 S 4 60, 10 72 S 16 92, 10 100"
          stroke="#7c070c"
          strokeWidth="0.9"
          strokeLinecap="round"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />

        {/* Needle tip — follows the live end of the thread */}
        <circle ref={dotRef} cx="10" cy="0" r="1.8" fill="#7c070c" />
      </svg>
    </div>
  );
}
