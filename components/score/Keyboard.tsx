"use client";

import { useEffect, useMemo, useRef } from "react";
import { useReducedMotion } from "framer-motion";

import { playNote } from "@/lib/piano";
import { KEY, KEYBOARD_X, PAGE, SHEET, buildKeys } from "@/lib/score";

/** Für Elise, the opening: what the keys play to themselves while you read. */
const TUNE = [76, 75, 76, 75, 76, 71, 74, 72, 69, 0, 60, 64, 69, 71, 0, 64, 68, 71, 72, 0, 0];

/**
 * The keyboard, from above. Every key is a rect: press one (click, tap or drag
 * across them) and it sinks and sounds. While the visitor is on the home scene
 * and idle, a few keys press themselves, quietly and without sound.
 * All the motion is class toggles on the elements, so nothing re-renders.
 */
const Keyboard = ({ active }: { active: boolean }) => {
  const reduced = useReducedMotion();
  const keys = useMemo(buildKeys, []);
  const root = useRef<SVGGElement>(null);
  const held = useRef(new Set<Element>());

  const press = (el: Element | null) => {
    const midi = Number(el?.getAttribute("data-midi"));
    if (!el || !midi || held.current.has(el)) return;
    held.current.add(el);
    el.classList.add("down");
    playNote(midi);
  };
  const releaseAll = () => {
    held.current.forEach((el) => el.classList.remove("down"));
    held.current.clear();
  };
  const keyOf = (t: EventTarget) => (t as Element).closest?.("[data-midi]") ?? null;

  useEffect(() => {
    if (!active || reduced) return;
    const g = root.current;
    if (!g) return;
    let i = 0;
    let off: ReturnType<typeof setTimeout>;
    const step = () => {
      const midi = TUNE[i++ % TUNE.length];
      if (midi && !document.hidden) {
        const el = g.querySelector(`[data-midi="${midi}"]`);
        el?.classList.add("ghost");
        setTimeout(() => el?.classList.remove("ghost"), 260);
      }
    };
    const id = setInterval(step, 330);
    return () => {
      clearInterval(id);
      clearTimeout(off);
      g.querySelectorAll(".ghost").forEach((el) => el.classList.remove("ghost"));
    };
  }, [active, reduced]);

  return (
    <g
      ref={root}
      className="kb"
      onPointerDown={(e) => press(keyOf(e.target))}
      onPointerOver={(e) => e.buttons === 1 && press(keyOf(e.target))}
      onPointerUp={releaseAll}
      onPointerLeave={releaseAll}
      onPointerCancel={releaseAll}
    >
      {keys.map((k) => (
        <rect
          key={k.midi}
          data-midi={k.midi}
          className={k.black ? "k k-black" : "k k-white"}
          x={k.x + (k.black ? 0 : 1)}
          y={KEY.y}
          width={k.w - (k.black ? 0 : 2)}
          height={k.h}
        />
      ))}

      {/* the key slip: where the keys disappear under the case */}
      <rect
        className="sc-slip"
        x={KEYBOARD_X - 4}
        y={PAGE.y + PAGE.h + 4}
        width={52 * KEY.w + 8}
        height={30}
        pointerEvents="none"
      />
      <text
        x={SHEET.w / 2}
        y={PAGE.y + PAGE.h + 25}
        textAnchor="middle"
        className="sc-slip-text"
        pointerEvents="none"
      >
        DH · GRAND
      </text>
    </g>
  );
};

export default Keyboard;
