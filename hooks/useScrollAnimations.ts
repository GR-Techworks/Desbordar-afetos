"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Fade-up reveal for any element via a CSS class selector.
 * Wraps GSAP ScrollTrigger in a self-contained useEffect.
 */
export function useRevealOnScroll(
  selector: string,
  options?: {
    start?: string;
    stagger?: number;
    duration?: number;
    ease?: string;
    fromX?: number;
    fromScale?: number;
    trigger?: string;
  }
) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = document.querySelectorAll(selector);
      if (!els.length) return;

      gsap.fromTo(
        selector,
        {
          opacity: 0,
          y: options?.fromX !== undefined ? 0 : 40,
          x: options?.fromX ?? 0,
          scale: options?.fromScale ?? 1,
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          stagger: options?.stagger ?? 0.08,
          duration: options?.duration ?? 0.8,
          ease: options?.ease ?? "power2.out",
          scrollTrigger: {
            trigger: options?.trigger ?? selector,
            start: options?.start ?? "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [selector, options]);
}

/**
 * Simple parallax on elements (e.g., floating decorations).
 */
export function useParallax(selector: string, yAmount = 40) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      document.querySelectorAll(selector).forEach((el) => {
        gsap.to(el, {
          y: yAmount,
          ease: "sine.inOut",
          scrollTrigger: {
            trigger: el.closest("section") ?? document.body,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });
    });

    return () => ctx.revert();
  }, [selector, yAmount]);
}
