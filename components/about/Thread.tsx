"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { playNote } from "@/lib/piano";
import { cn } from "@/lib/utils";

/**
 * The About bar is strung together: one loose thread ties every card to the
 * next, and it is a piano string, tuned to A (A for About). Press it, or drag
 * across it, and it vibrates and sounds. As on a real piano the longer the
 * stretch the lower the A: the longest span is A2, the shortest A5.
 *
 * The thread runs between "pegs": every element inside with a `data-peg`, taken
 * in document order. It is measured from the DOM, so it follows the layout through
 * every breakpoint and re-wrap. A span hangs under gravity (sags down); where the
 * pegs stack in one column it bows out sideways instead, and either way it keeps
 * clear of the cards (see `measure`).
 */

const A_NOTES = [45, 57, 69, 81]; // A2 A3 A4 A5
const WEIGHT = [2.6, 2, 1.5, 1.1]; // lower strings are thicker

type Seg = {
  ax: number;
  ay: number;
  bx: number;
  by: number;
  /** unit direction of the sag */
  nx: number;
  ny: number;
  sag: number;
  midi: number;
  weight: number;
};

const bend = (s: Seg, offset: number) => {
  const mx = (s.ax + s.bx) / 2 + s.nx * 2 * offset;
  const my = (s.ay + s.by) / 2 + s.ny * 2 * offset;
  return `M${s.ax} ${s.ay}Q${mx} ${my} ${s.bx} ${s.by}`;
};

type Rect = { l: number; r: number; t: number; b: number };

/** How many points of the curve lie inside a card (apart from the stretch right at the pegs). */
const collisions = (s: Seg, offset: number, cards: Rect[]) => {
  const cx = (s.ax + s.bx) / 2 + s.nx * 2 * offset;
  const cy = (s.ay + s.by) / 2 + s.ny * 2 * offset;
  let n = 0;
  for (let k = 1; k < 28; k++) {
    const t = k / 28;
    const x = (1 - t) * (1 - t) * s.ax + 2 * (1 - t) * t * cx + t * t * s.bx;
    const y = (1 - t) * (1 - t) * s.ay + 2 * (1 - t) * t * cy + t * t * s.by;
    if (Math.hypot(x - s.ax, y - s.ay) < 14 || Math.hypot(x - s.bx, y - s.by) < 14) continue;
    if (cards.some((c) => x > c.l && x < c.r && y > c.t - 3 && y < c.b + 3)) n++;
  }
  return n;
};

/**
 * The pegs of the thread, as segments, with a pitch by length rank. Each span
 * hangs as loose as it can without crossing a card: gravity first (down), or for
 * a near-vertical span out to the side; slack is taken in until the curve clears.
 */
const measure = (root: HTMLElement): Seg[] => {
  const rb = root.getBoundingClientRect();
  const pts = Array.from(root.querySelectorAll<HTMLElement>("[data-peg]")).map((el) => {
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2 - rb.left, y: r.top + r.height / 2 - rb.top };
  });
  const cards: Rect[] = Array.from(root.querySelectorAll<HTMLElement>("[data-staff]")).map((el) => {
    const r = el.getBoundingClientRect();
    // a thread may brush a card's outer edge; it must not cross the body, so the sides are drawn in
    return { l: r.left - rb.left + 14, r: r.right - rb.left - 14, t: r.top - rb.top, b: r.bottom - rb.top };
  });

  const segs = pts.slice(1).map((b, i) => {
    const a = pts[i];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy);
    const full = Math.min(90, Math.max(26, len * 0.14));
    const vertical = Math.abs(dy) > Math.abs(dx) * 1.2;
    const dirs = vertical
      ? [[-1, 0], [1, 0], [0, 1], [0, -1]]
      : [[0, 1], [0, -1], [-1, 0], [1, 0]];

    const seg: Seg & { len: number } = {
      ax: a.x, ay: a.y, bx: b.x, by: b.y,
      nx: dirs[0][0], ny: dirs[0][1], sag: full * 0.35, midi: 0, weight: 0, len,
    };
    let best = Infinity;
    search: for (const scale of [1, 0.65, 0.35]) {
      for (const [nx, ny] of dirs) {
        const sag = full * scale;
        const hit = collisions({ ...seg, nx, ny }, sag, cards);
        if (hit < best) {
          best = hit;
          seg.nx = nx;
          seg.ny = ny;
          seg.sag = sag;
        }
        if (hit === 0) break search;
      }
    }
    return seg;
  });

  const rank = [...segs].sort((p, q) => q.len - p.len);
  segs.forEach((s) => {
    const r = rank.indexOf(s);
    const k = segs.length > 1 ? Math.min(3, Math.floor((r / (segs.length - 1)) * 3 + 0.5)) : 1;
    s.midi = A_NOTES[k];
    s.weight = WEIGHT[k];
  });
  return segs;
};

export const Thread = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const reduced = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const [segs, setSegs] = useState<Seg[]>([]);
  const segRef = useRef<Seg[]>([]);
  const lines = useRef<(SVGPathElement | null)[]>([]);
  const ghosts = useRef<(SVGPathElement | null)[]>([]);
  const vib = useRef<({ t0: number; amp: number } | null)[]>([]);
  const last = useRef<number[]>([]);
  const raf = useRef(0);

  const remeasure = useCallback(() => {
    if (!root.current) return;
    const next = measure(root.current);
    segRef.current = next;
    setSegs(next);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    remeasure();
    const ro = new ResizeObserver(remeasure);
    ro.observe(el);
    document.fonts?.ready.then(remeasure);
    return () => ro.disconnect();
  }, [remeasure]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const tick = useCallback((now: number) => {
    let alive = false;
    segRef.current.forEach((s, i) => {
      const v = vib.current[i];
      const line = lines.current[i];
      const ghost = ghosts.current[i];
      if (!line || !ghost) return;
      if (!v) return;
      const t = (now - v.t0) / 1000;
      const amp = v.amp * Math.exp(-t / 0.55);
      if (amp < 0.35) {
        vib.current[i] = null;
        line.setAttribute("d", bend(s, s.sag));
        ghost.setAttribute("opacity", "0");
        return;
      }
      alive = true;
      const off = amp * Math.cos(t * Math.PI * 2 * 9);
      line.setAttribute("d", bend(s, s.sag + off));
      ghost.setAttribute("d", bend(s, s.sag - off));
      ghost.setAttribute("opacity", String(Math.min(1, amp / 6)));
    });
    raf.current = alive ? requestAnimationFrame(tick) : 0;
  }, []);

  const pluck = (i: number) => {
    const s = segRef.current[i];
    if (!s) return;
    const now = performance.now();
    if (now - (last.current[i] ?? 0) < 160) return;
    last.current[i] = now;
    playNote(s.midi, 0.85);
    if (reduced) return;
    vib.current[i] = { t0: now, amp: 8 + s.sag * 0.3 };
    if (!raf.current) raf.current = requestAnimationFrame(tick);
  };

  return (
    <div ref={root} className={cn("relative", className)}>
      {children}

      <svg aria-hidden className="pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible">
        {segs.map((s, i) => (
          <g
            key={i}
            className="thread-seg"
            onPointerDown={() => pluck(i)}
            // dragging across the strings strums them; a plain hover only highlights
            onPointerEnter={(e) => e.buttons === 1 && pluck(i)}
          >
            <path ref={(el) => void (ghosts.current[i] = el)} className="thread-ghost" d={bend(s, s.sag)} opacity="0" />
            <path
              ref={(el) => void (lines.current[i] = el)}
              className="thread-line"
              d={bend(s, s.sag)}
              style={{ ["--w" as string]: `${s.weight}px` }}
            />
            <path className="thread-hit" d={bend(s, s.sag)} />
          </g>
        ))}
      </svg>
    </div>
  );
};

/**
 * The A key: where the thread starts, and the note it is tuned to. A single
 * ivory key you can press by itself.
 */
export const AKey = ({ className }: { className?: string }) => {
  const [down, setDown] = useState(false);
  const off = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(off.current), []);

  const press = () => {
    playNote(69, 0.8);
    setDown(true);
    clearTimeout(off.current);
    off.current = setTimeout(() => setDown(false), 220);
  };

  return (
    <div className={cn("relative w-8", className)}>
      <button
        type="button"
        onClick={press}
        aria-label="Play the note A"
        title="A"
        className={cn(
          "relative flex h-16 w-8 items-end justify-center border border-ink pb-1.5 font-display text-lg font-bold text-[rgb(var(--key-black))] transition-[transform,background-color] duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink",
          down
            ? "translate-y-[3px] bg-[rgb(var(--key-white-down))]"
            : "bg-[rgb(var(--key-white))] hover:bg-[rgb(var(--key-white-hover))]"
        )}
      >
        A
      </button>
      {/* the thread is tied to the foot of the key */}
      <i
        aria-hidden
        data-peg
        className="absolute -bottom-[5px] left-1/2 z-30 block h-[9px] w-[9px] -translate-x-1/2 border border-ink bg-page"
      />
    </div>
  );
};
