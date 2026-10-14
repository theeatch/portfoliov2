"use client";

import { useEffect, useRef } from "react";

import { LAND_LAT0, LAND_ROWS, LAND_STEP } from "@/lib/land";

/**
 * A small dotted globe on a <canvas>: no 3D library, just an orthographic
 * projection of land dots. It turns on its own, can be dragged, and shows
 * arcs leaving Gurugram. Drawn in the page's ink, so it follows the theme.
 */

const HOME = { lat: 28.46, lng: 77.03 }; // Gurugram
const PLACES = [
  { lat: 51.5, lng: -0.13 }, // London
  { lat: 40.71, lng: -74.0 }, // New York
  { lat: 1.35, lng: 103.82 }, // Singapore
  { lat: 35.68, lng: 139.65 }, // Tokyo
  { lat: -33.87, lng: 151.21 }, // Sydney
  { lat: 25.2, lng: 55.27 }, // Dubai
];

const rad = Math.PI / 180;

/** decode the run-length rows into [lat, lng] in radians */
const buildLand = () => {
  const pts: number[] = [];
  LAND_ROWS.forEach((row, r) => {
    const lat = LAND_LAT0 + r * LAND_STEP;
    const runs = row.split(",").map(Number);
    const n = runs.reduce((a, b) => a + b, 0);
    let i = 0;
    runs.forEach((len, k) => {
      if (k % 2 === 1) {
        for (let j = 0; j < len; j++) pts.push(lat * rad, (-180 + ((i + j + 0.5) * 360) / n) * rad);
      }
      i += len;
    });
  });
  return new Float32Array(pts);
};

type P = { lat: number; lng: number };

/** point on the sphere (radius 1 + lift) -> view space, after spinning by `rot` */
const project = (lat: number, lng: number, rot: number, tilt: number, lift = 0) => {
  const r = 1 + lift;
  const x = r * Math.cos(lat) * Math.sin(lng + rot);
  const y = r * Math.sin(lat);
  const z = r * Math.cos(lat) * Math.cos(lng + rot);
  // tilt the north pole toward the viewer
  const cy = Math.cos(tilt);
  const sy = Math.sin(tilt);
  return { x, y: y * cy - z * sy, z: y * sy + z * cy };
};

/** great-circle point between a and b, lifted into an arc */
const arcPoint = (a: P, b: P, t: number) => {
  const la = a.lat * rad, lo1 = a.lng * rad, lb = b.lat * rad, lo2 = b.lng * rad;
  const d = Math.acos(
    Math.min(1, Math.sin(la) * Math.sin(lb) + Math.cos(la) * Math.cos(lb) * Math.cos(lo2 - lo1))
  );
  if (d < 1e-4) return { lat: la, lng: lo1, lift: 0 };
  const A = Math.sin((1 - t) * d) / Math.sin(d);
  const B = Math.sin(t * d) / Math.sin(d);
  const x = A * Math.cos(la) * Math.cos(lo1) + B * Math.cos(lb) * Math.cos(lo2);
  const y = A * Math.cos(la) * Math.sin(lo1) + B * Math.cos(lb) * Math.sin(lo2);
  const z = A * Math.sin(la) + B * Math.sin(lb);
  return { lat: Math.atan2(z, Math.hypot(x, y)), lng: Math.atan2(y, x), lift: Math.sin(t * Math.PI) * d * 0.28 };
};

const Globe = ({ className }: { className?: string }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const land = buildLand();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tilt = 0.32;
    // face India first
    let rot = -HOME.lng * rad;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let visible = true;
    let raf = 0;
    let last = 0;
    let t0 = 0;
    const drag = { on: false, x: 0, vel: 0 };

    const fit = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    };

    const draw = (time: number) => {
      const dt = Math.min(last ? time - last : 16, 50);
      last = time;
      if (!t0) t0 = time;

      if (!drag.on) {
        drag.vel *= 0.94;
        rot += (reduced ? 0 : 0.00022 * dt) + drag.vel;
      }

      const light = document.documentElement.classList.contains("light");
      const ink = light ? "10,10,10" : "245,245,245";

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // the globe sits low and to the right of its box, so the copy keeps the top left
      // and the bottom of the sphere runs off the card
      const R = Math.min(w * 0.3, h * 0.52);
      const cx = w * 0.66;
      const cy = h - R * 0.1;

      // outline + a faint body so the back side reads as a sphere
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${ink},0.05)`;
      ctx.fill();
      ctx.strokeStyle = `rgba(${ink},0.35)`;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // land dots, brighter toward the middle of the disc
      const size = Math.max(1.1, R / 120);
      for (let i = 0; i < land.length; i += 2) {
        const p = project(land[i], land[i + 1], rot, tilt);
        if (p.z <= 0) continue;
        ctx.fillStyle = `rgba(${ink},${0.25 + p.z * 0.65})`;
        ctx.fillRect(cx + p.x * R - size / 2, cy - p.y * R - size / 2, size, size);
      }

      // arcs out of Gurugram, each growing in turn then fading
      const home = HOME;
      const secs = (time - t0) / 1000;
      PLACES.forEach((to, k) => {
        const phase = ((secs * 0.28 + k / PLACES.length) % 1 + 1) % 1;
        const grow = Math.min(1, phase / 0.55);
        const fade = phase < 0.8 ? 1 : 1 - (phase - 0.8) / 0.2;
        const steps = 28;
        ctx.beginPath();
        let started = false;
        for (let s = 0; s <= steps * grow; s++) {
          const q = arcPoint(home, to, s / steps);
          const p = project(q.lat, q.lng, rot, tilt, q.lift);
          if (p.z < 0) { started = false; continue; }
          const X = cx + p.x * R;
          const Y = cy - p.y * R;
          if (!started) { ctx.moveTo(X, Y); started = true; } else ctx.lineTo(X, Y);
        }
        ctx.strokeStyle = `rgba(${ink},${0.8 * fade})`;
        ctx.lineWidth = 1.4;
        ctx.stroke();
      });

      // the pin: a dot with a ring that keeps spreading
      const hp = project(home.lat * rad, home.lng * rad, rot, tilt);
      if (hp.z > 0) {
        const X = cx + hp.x * R;
        const Y = cy - hp.y * R;
        const ring = ((secs * 0.7) % 1);
        ctx.beginPath();
        ctx.arc(X, Y, 3 + ring * 16, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${ink},${0.8 * (1 - ring)})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(X, Y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${ink})`;
        ctx.fill();
      }
    };

    const frame = (time: number) => {
      raf = 0;
      if (visible && !document.hidden) draw(time);
      if (!reduced || drag.on) raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    fit();
    draw(performance.now());
    if (!reduced) start();

    const ro = new ResizeObserver(() => {
      fit();
      draw(performance.now());
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(canvas);

    // drag to spin; let go and it carries on turning
    const down = (e: PointerEvent) => {
      drag.on = true;
      drag.x = e.clientX;
      drag.vel = 0;
      canvas.setPointerCapture(e.pointerId);
      start();
    };
    const move = (e: PointerEvent) => {
      if (!drag.on) return;
      const d = ((e.clientX - drag.x) / Math.max(w, 1)) * 3.4;
      drag.x = e.clientX;
      rot += d;
      drag.vel = d * 0.6;
      if (reduced) draw(performance.now());
    };
    const up = () => {
      drag.on = false;
    };
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointercancel", up);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointercancel", up);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} style={{ touchAction: "pan-y" }} />;
};

export default Globe;
