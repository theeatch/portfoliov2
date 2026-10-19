"use client";

import { Fragment, useEffect, useMemo, useRef } from "react";

import { scenes } from "@/data";
import { useSize } from "@/lib/useSize";
import {
  MEASURE,
  MEASURES,
  MELODIES,
  PAGE,
  SHEET,
  STAFF,
  SYSTEM_GAP,
  TEMPO,
  homeCam,
  measureRect,
} from "@/lib/score";
import { useJourney } from "@/components/journey/context";
import Keyboard from "./Keyboard";

const NOTE_RX = 17;
const NOTE_RY = 12;
const STEM = 96;
const STEP = STAFF.gap / 2;

/** One quarter / eighth note; `beam` joins a pair of eighths. */
const Notes = ({ mx, my, melody, active }: { mx: number; my: number; melody: (typeof MELODIES)[number]; active: boolean }) => {
  const base = my + STAFF.top + STAFF.gap * 4; // bottom staff line
  const pts = melody.map((n) => ({
    ...n,
    x: mx + n.beat * MEASURE.w,
    y: base - n.step * STEP,
    up: n.step < 4,
  }));
  const stemX = (p: (typeof pts)[number]) => p.x + (p.up ? NOTE_RX - 1.5 : -NOTE_RX + 1.5);
  const stemEnd = (p: (typeof pts)[number]) => p.y + (p.up ? -STEM : STEM);

  return (
    <g data-playing={active || undefined}>
      {pts.map((p, i) => {
        const beamedTo = p.eighth && pts[i + 1]?.eighth ? pts[i + 1] : null;
        return (
          <g key={i} className="sc-note-g" style={{ ["--i" as string]: i }}>
            <ellipse className="sc-note" cx={p.x} cy={p.y} rx={NOTE_RX} ry={NOTE_RY} transform={`rotate(-20 ${p.x} ${p.y})`} />
            <line className="sc-stem" x1={stemX(p)} y1={p.y} x2={stemX(p)} y2={stemEnd(p)} />
            {beamedTo && (
              <line
                className="sc-beam"
                x1={stemX(p)}
                y1={stemEnd(p)}
                x2={stemX(beamedTo)}
                y2={stemEnd(beamedTo)}
              />
            )}
          </g>
        );
      })}
    </g>
  );
};

/**
 * The world, drawn once as vector art: the page of music with its four
 * measures, and the keyboard below it. The camera never re-renders it: it just
 * rewrites the transform on the one <g> (see below), so every zoom level stays
 * sharp and the cost per frame is a single attribute.
 */
const Score = () => {
  const { cam, index, travelling, goTo } = useJourney();
  const size = useSize();
  const world = useRef<SVGGElement>(null);

  useEffect(() => {
    const g = world.current;
    if (!g) return;
    const apply = () => {
      const s = cam.s.get();
      const tx = size.w / 2 - cam.x.get() * s;
      const ty = size.h / 2 - cam.y.get() * s;
      g.setAttribute("transform", `translate(${tx} ${ty}) scale(${s})`);
    };
    apply();
    const stops = [cam.x, cam.y, cam.s].map((mv) => mv.on("change", apply));
    return () => stops.forEach((stop) => stop());
  }, [cam, size.w, size.h]);

  // titles must stay readable at the overview zoom, wherever that lands
  const label = useMemo(() => Math.max(34, 17 / homeCam(size.w, size.h).s), [size.w, size.h]);

  const view = index === 0 ? "home" : travelling ? "travel" : "zoom";
  const activeMeasure = index - 1;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 overflow-hidden transition-opacity duration-700"
      style={{ opacity: size.ready ? 1 : 0, pointerEvents: index === 0 ? "auto" : "none" }}
    >
      <svg className="score block h-full w-full" data-view={view} width="100%" height="100%">
        <g ref={world}>
          {/* the page */}
          <rect className="sc-page" x={PAGE.x} y={PAGE.y} width={PAGE.w} height={PAGE.h} />

          {/* two systems of five lines, with their barlines */}
          {[0, 1].map((row) => {
            const y0 = row * (MEASURE.h + SYSTEM_GAP) + STAFF.top;
            return (
              <Fragment key={row}>
                {[0, 1, 2, 3, 4].map((k) => (
                  <line key={k} className="sc-line" x1={0} x2={SHEET.w} y1={y0 + k * STAFF.gap} y2={y0 + k * STAFF.gap} />
                ))}
                {[0, 1, 2].map((c) => (
                  <line
                    key={c}
                    className={c === 0 ? "sc-bar sc-bar-thick" : "sc-bar"}
                    x1={c * MEASURE.w}
                    x2={c * MEASURE.w}
                    y1={y0}
                    y2={y0 + STAFF.gap * 4}
                  />
                ))}
              </Fragment>
            );
          })}
          {/* the final double bar */}
          <line className="sc-bar sc-bar-thick" x1={SHEET.w - 7} x2={SHEET.w - 7} y1={MEASURE.h + SYSTEM_GAP + STAFF.top} y2={MEASURE.h + SYSTEM_GAP + STAFF.top + STAFF.gap * 4} />

          {/* 4/4 */}
          <text className="sc-sig" x={64} y={STAFF.top + STAFF.gap * 2 - 8} textAnchor="middle">4</text>
          <text className="sc-sig" x={64} y={STAFF.top + STAFF.gap * 4 - 8} textAnchor="middle">4</text>

          {MEASURES.map((m, i) => {
            const r = measureRect(i);
            const scene = scenes[i + 1];
            return (
              <g
                key={m.id}
                className="measure"
                data-active={i === activeMeasure}
                role="button"
                tabIndex={-1}
                onClick={() => goTo(i + 1)}
              >
                <rect className="sc-hit" x={r.x} y={r.y} width={r.w} height={r.h} />
                <text className="sc-title" x={r.x + 26} y={r.y + 70} fontSize={label}>
                  <tspan className="sc-num" fontSize={label * 0.5} dy={-label * 0.12}>{scene.code}</tspan>
                  <tspan dx={label * 0.35} dy={label * 0.12}>{scene.label}</tspan>
                </text>
                <text className="sc-tempo" x={r.x + r.w - 26} y={r.y + 70} fontSize={label * 0.58} textAnchor="end">
                  {TEMPO[i]}
                </text>
                <Notes mx={r.x} my={r.y} melody={MELODIES[i]} active={i === activeMeasure && view !== "home"} />
              </g>
            );
          })}

          <Keyboard active={index === 0} />
        </g>
      </svg>
    </div>
  );
};

export default Score;
