"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * A one-shot burst of drifting particles, as little music notes in the theme's ink.
 *
 * Replaces the old react-lottie confetti: same "something happened!" feedback
 * for a fraction of the bundle, and it matches the rest of the scene.
 * Re-fires whenever `trigger` changes to a new truthy value.
 */

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  ttl: number;
  size: number;
  color: string;
  glyph: string;
  spin: number;
  rot: number;
};

const NOTES = ["♪", "♫", "♩", "♬"];
// light grey on the black theme, near-black on the white one
const INK = { dark: ["255, 255, 255", "220, 220, 220", "180, 180, 180"], light: ["10, 10, 10", "40, 40, 40", "80, 80, 80"] };

const ParticleBurst = ({
  trigger,
  className,
}: {
  trigger: number;
  className?: string;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    if (!trigger) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const w = rect.width || 320;
    const h = rect.height || 200;

    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const originX = w * 0.5;
    const originY = h * 0.62;

    const palette = document.documentElement.classList.contains("light") ? INK.light : INK.dark;
    const particles: Particle[] = Array.from({ length: 22 }, () => {
      // fan upward and outward
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 2.2;
      const speed = 0.12 + Math.random() * 0.34;
      return {
        x: originX + (Math.random() - 0.5) * 24,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        ttl: 900 + Math.random() * 700,
        size: 14 + Math.random() * 12,
        color: palette[Math.floor(Math.random() * palette.length)],
        glyph: NOTES[Math.floor(Math.random() * NOTES.length)],
        spin: (Math.random() - 0.5) * 0.004,
        rot: (Math.random() - 0.5) * 0.8,
      };
    });

    let last = 0;
    let alive = particles.length;

    const frame = (time: number) => {
      const dt = Math.min(last ? time - last : 16, 40);
      last = time;

      ctx.clearRect(0, 0, w, h);
      alive = 0;

      particles.forEach((p) => {
        if (p.life >= p.ttl) return;
        alive++;

        p.life += dt;
        p.vy += 0.00042 * dt; // gravity
        p.vx *= 0.996; // drag
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.rot += p.spin * dt;

        const t = p.life / p.ttl;
        const alpha = t < 0.15 ? t / 0.15 : 1 - (t - 0.15) / 0.85;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = `rgba(${p.color}, ${Math.max(0, alpha)})`;
        ctx.font = `${p.size}px serif`;
        ctx.textAlign = "center";
        ctx.fillText(p.glyph, 0, 0);
        ctx.restore();
      });

      if (alive > 0) {
        rafRef.current = requestAnimationFrame(frame);
      } else {
        ctx.clearRect(0, 0, w, h);
      }
    };

    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, [trigger]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("pointer-events-none", className)}
    />
  );
};

export default ParticleBurst;
