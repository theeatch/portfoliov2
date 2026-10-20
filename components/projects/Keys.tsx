"use client";

import { useEffect, useRef, useState } from "react";

import { playNote } from "@/lib/piano";
import { cn } from "@/lib/utils";

const NATURALS = [0, 2, 4, 5, 7, 9, 11];

/** an octave from `from` (a C) up to the next C: eight naturals, and the five sharps that sit on the seams between them */
const octave = (from: number) => {
  const whites: number[] = [];
  const blacks: { seam: number; midi: number }[] = [];
  for (let m = from; m <= from + 12; m++) {
    if (NATURALS.includes(m % 12)) whites.push(m);
    else blacks.push({ seam: whites.length, midi: m });
  }
  return { whites, blacks };
};

/** A key: it sinks and sounds when pressed, or when you drag across it. */
const Key = ({ midi, className, style }: { midi: number; className: string; style?: React.CSSProperties }) => {
  const [down, setDown] = useState(false);
  const off = useRef<ReturnType<typeof setTimeout>>();
  const pointer = useRef("mouse");
  useEffect(() => () => clearTimeout(off.current), []);

  const strike = () => {
    playNote(midi, 0.75);
    setDown(true);
    clearTimeout(off.current);
    off.current = setTimeout(() => setDown(false), 260);
  };

  return (
    <span
      aria-hidden
      className={cn("pk-key", className, down && "down")}
      style={style}
      onPointerDown={(e) => {
        pointer.current = e.pointerType;
        // a finger that starts a scroll must not sound: touch plays on the tap (click) instead
        if (e.pointerType !== "touch") strike();
      }}
      onPointerEnter={(e) => e.pointerType === "mouse" && e.buttons === 1 && strike()}
      onClick={() => pointer.current === "touch" && strike()}
    />
  );
};

/**
 * One octave of keys in a case, the width of the book that stands on it. A touch
 * out of focus, like the room behind a stage. The keys are playable.
 */
const Keys = ({ from, className }: { from: number; className?: string }) => {
  const { whites, blacks } = octave(from);

  return (
    <div className={cn("border border-ink/70 bg-[rgb(var(--key-black))] px-1 pt-1", className)}>
      <div aria-hidden className="relative h-14 sm:h-[4.5rem]">
        <div className="absolute inset-0 blur-[0.5px]">
          <div className="absolute inset-0 flex">
            {whites.map((midi) => (
              <Key key={midi} midi={midi} className="pk-white flex-1" />
            ))}
          </div>
          {blacks.map(({ seam, midi }) => (
            <Key
              key={midi}
              midi={midi}
              className="pk-black absolute top-0 z-[1] h-[58%] w-[7%]"
              style={{ left: `calc(${(seam / whites.length) * 100}% - 3.5%)` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Keys;
