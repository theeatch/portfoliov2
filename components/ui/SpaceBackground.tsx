"use client";

import { useEffect, useRef } from "react";

/**
 * Persistent deep-space backdrop for the whole page.
 *
 * Three canvas layers of stars at different depths parallax against scroll,
 * drift on their own, and twinkle. Shooting stars cross occasionally.
 * Nebula clouds and grain sit in the DOM above the canvas.
 *
 * Honours prefers-reduced-motion (renders one static frame) and pauses
 * entirely while the tab is hidden.
 */

type Star = {
  x: number; // 0..1 of canvas width
  y: number; // 0..worldHeight in css px
  r: number; // radius in css px
  base: number; // base alpha
  phase: number; // twinkle offset
  speed: number; // twinkle speed
  hue: "white" | "cyan" | "violet";
};

type ShootingStar = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  ttl: number;
  len: number;
};

const LAYERS = [
  // depth = how strongly the layer reacts to scroll. Far stars barely move.
  { depth: 0.04, density: 1.0, rMin: 0.4, rMax: 0.9, alphaMin: 0.2, alphaMax: 0.5 },
  { depth: 0.13, density: 0.55, rMin: 0.6, rMax: 1.3, alphaMin: 0.35, alphaMax: 0.75 },
  { depth: 0.3, density: 0.2, rMin: 0.9, rMax: 1.9, alphaMin: 0.55, alphaMax: 1.0 },
];

const HUES = {
  white: "228, 236, 255",
  cyan: "125, 211, 252",
  violet: "196, 181, 253",
};

const SpaceBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);
  const smoothScrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let worldHeight = 0;
    let dpr = 1;
    let layers: Star[][] = [];
    let shooting: ShootingStar[] = [];
    let raf = 0;
    let last = 0;
    let nextShootIn = 2200;
    let running = true;

    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    const pickHue = (): Star["hue"] => {
      const r = Math.random();
      // mostly white starlight, a few coloured accents
      if (r > 0.9) return "cyan";
      if (r > 0.82) return "violet";
      return "white";
    };

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      // stars live in a world taller than the viewport so parallax has room
      worldHeight = height * 2.2;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const isSmall = width < 768;
      // ~1 star per 5200px² on desktop, sparser on phones
      const budget = Math.min(
        isSmall ? 130 : 420,
        Math.round((width * height) / (isSmall ? 9000 : 5200))
      );

      layers = LAYERS.map((layer) => {
        const count = Math.round(budget * layer.density);
        return Array.from({ length: count }, () => ({
          x: Math.random(),
          y: Math.random() * worldHeight,
          r: rand(layer.rMin, layer.rMax),
          base: rand(layer.alphaMin, layer.alphaMax),
          phase: Math.random() * Math.PI * 2,
          speed: rand(0.4, 1.4),
          hue: pickHue(),
        }));
      });
      shooting = [];
    };

    const spawnShootingStar = () => {
      // enter from the upper band, travel down-right or down-left
      const fromLeft = Math.random() > 0.35;
      const speed = rand(0.55, 0.95);
      const angle = rand(0.32, 0.52); // radians below horizontal
      shooting.push({
        x: fromLeft ? rand(-0.1, 0.5) * width : rand(0.5, 1.1) * width,
        y: rand(-0.05, 0.35) * height,
        vx: (fromLeft ? 1 : -1) * Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        ttl: rand(700, 1200),
        len: rand(90, 190),
      });
    };

    const drawStar = (s: Star, offset: number, time: number) => {
      // wrap into the visible band as the layer scrolls
      let y = (s.y - offset) % worldHeight;
      if (y < 0) y += worldHeight;
      // cull anything off-screen (world is taller than the viewport)
      if (y < -4 || y > height + 4) return;

      const twinkle = reduced
        ? 1
        : 0.65 + 0.35 * Math.sin(time * 0.0016 * s.speed + s.phase);
      const alpha = Math.max(0, Math.min(1, s.base * twinkle));
      const x = s.x * width;

      ctx.beginPath();
      ctx.fillStyle = `rgba(${HUES[s.hue]}, ${alpha})`;
      ctx.arc(x, y, s.r, 0, Math.PI * 2);
      ctx.fill();

      // brighter stars get a soft bloom
      if (s.r > 1.2) {
        const g = ctx.createRadialGradient(x, y, 0, x, y, s.r * 5);
        g.addColorStop(0, `rgba(${HUES[s.hue]}, ${alpha * 0.4})`);
        g.addColorStop(1, `rgba(${HUES[s.hue]}, 0)`);
        ctx.beginPath();
        ctx.fillStyle = g;
        ctx.arc(x, y, s.r * 5, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawShooting = (s: ShootingStar) => {
      const fade =
        s.life < 160
          ? s.life / 160 // fade in
          : Math.max(0, 1 - (s.life - 160) / (s.ttl - 160)); // fade out
      const tailX = s.x - s.vx * s.len;
      const tailY = s.y - s.vy * s.len;

      const g = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
      g.addColorStop(0, `rgba(228, 236, 255, ${0.9 * fade})`);
      g.addColorStop(0.35, `rgba(125, 211, 252, ${0.35 * fade})`);
      g.addColorStop(1, "rgba(125, 211, 252, 0)");

      ctx.strokeStyle = g;
      ctx.lineWidth = 1.6;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(tailX, tailY);
      ctx.stroke();

      // head
      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 255, 255, ${0.95 * fade})`;
      ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    };

    const render = (time: number) => {
      const dt = Math.min(last ? time - last : 16, 48);
      last = time;

      // ease the scroll value so fast flicks don't jolt the field
      smoothScrollRef.current +=
        (scrollRef.current - smoothScrollRef.current) * 0.08;

      ctx.clearRect(0, 0, width, height);

      layers.forEach((stars, i) => {
        const { depth } = LAYERS[i];
        // scroll parallax + a slow constant drift so the sky lives on its own
        const offset = reduced
          ? 0
          : smoothScrollRef.current * depth + time * 0.0022 * depth * 6;
        stars.forEach((s) => drawStar(s, offset, time));
      });

      if (!reduced) {
        nextShootIn -= dt;
        if (nextShootIn <= 0 && shooting.length < 2) {
          spawnShootingStar();
          nextShootIn = rand(5000, 14000);
        }

        shooting = shooting.filter((s) => {
          s.x += s.vx * dt;
          s.y += s.vy * dt;
          s.life += dt;
          const alive =
            s.life < s.ttl &&
            s.x > -300 &&
            s.x < width + 300 &&
            s.y < height + 200;
          if (alive) drawShooting(s);
          return alive;
        });
      }

      if (running) raf = requestAnimationFrame(render);
    };

    const onScroll = () => {
      scrollRef.current = window.scrollY || 0;
    };

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        build();
        if (reduced) {
          ctx.clearRect(0, 0, width, height);
          layers.forEach((stars) => stars.forEach((s) => drawStar(s, 0, 0)));
        }
      }, 160);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduced && !running) {
        running = true;
        last = 0;
        raf = requestAnimationFrame(render);
      }
    };

    build();
    scrollRef.current = window.scrollY || 0;
    smoothScrollRef.current = scrollRef.current;

    if (reduced) {
      // one static frame, no loop
      layers.forEach((stars) => stars.forEach((s) => drawStar(s, 0, 0)));
    } else {
      raf = requestAnimationFrame(render);
      window.addEventListener("scroll", onScroll, { passive: true });
    }
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* deepest void */}
      <div className="absolute inset-0 bg-space-800" />

      {/* nebula clouds — slow, huge, low-opacity */}
      <div
        className="absolute -left-[15%] -top-[20%] h-[70vh] w-[70vw] animate-nebula-drift rounded-full opacity-40 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, rgba(56,189,248,0.22) 0%, rgba(56,189,248,0.06) 45%, transparent 72%)",
        }}
      />
      <div
        className="absolute -right-[20%] top-[18%] h-[80vh] w-[70vw] animate-nebula-drift-slow rounded-full opacity-45 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle at 60% 50%, rgba(167,139,250,0.2) 0%, rgba(99,102,241,0.07) 48%, transparent 74%)",
        }}
      />
      <div
        className="absolute -bottom-[25%] left-[10%] h-[70vh] w-[80vw] animate-nebula-drift rounded-full opacity-50 blur-[110px]"
        style={{
          animationDelay: "-18s",
          background:
            "radial-gradient(circle at 50% 50%, rgba(34,211,238,0.16) 0%, rgba(167,139,250,0.06) 50%, transparent 76%)",
        }}
      />

      {/* the milky-way band: a soft diagonal smear of light */}
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          background:
            "linear-gradient(112deg, transparent 34%, rgba(148,190,255,0.028) 47%, rgba(196,181,253,0.035) 52%, rgba(148,190,255,0.024) 57%, transparent 70%)",
        }}
      />

      {/* stars */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* vignette: pulls the eye to the centre and hides canvas edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 40%, transparent 35%, rgba(2,4,11,0.55) 88%, rgba(2,4,11,0.85) 100%)",
        }}
      />

      {/* grain */}
      <div className="grain-overlay absolute inset-0 opacity-[0.14]" />
    </div>
  );
};

export default SpaceBackground;
