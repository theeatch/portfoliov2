"use client";

import { useEffect, useRef, useState } from "react";

import { techStack } from "@/data";
import { playNote } from "@/lib/piano";
import { cn } from "@/lib/utils";
import { TECH } from "@/lib/tech";

/** the staff's steps from the bottom line up (E4 F#4 G4 A4 B4 C5 D5 E5 F#5): G major */
const STEP_MIDI = [64, 66, 67, 69, 71, 72, 74, 76, 78];
const PER_SYSTEM = 7;

/**
 * The tech stack as a tune. Each technology is a note sitting where its pitch
 * belongs on the staff; press one (or Tab to it and hit Enter) and it sounds.
 * Played left to right the fourteen of them are the first bars of Ode to Joy.
 * Lives inside a two-system <StaffCard>, whose --gap sets the scale.
 */
const TechNotes = () => {
  const [lit, setLit] = useState<number | null>(null);
  const off = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(off.current), []);

  const strike = (j: number) => {
    playNote(STEP_MIDI[techStack[j].step], 0.75);
    setLit(j);
    clearTimeout(off.current);
    off.current = setTimeout(() => setLit(null), 320);
  };

  return (
    <>
      {/* G major: one sharp, on the top line of each system */}
      {[0, 1].map((s) => (
        <svg
          key={s}
          aria-hidden
          viewBox="0 0 10 26"
          className="absolute -translate-y-1/2 fill-ink"
          style={{
            left: "calc(var(--gap) * 0.62)",
            top: `calc(var(--gap) * ${s * 5.5})`,
            height: "calc(var(--gap) * 1.2)",
          }}
        >
          <rect x="2.6" y="1" width="1.1" height="23" />
          <rect x="6.3" y="0" width="1.1" height="23" />
          <polygon points="0.5,9.6 9.5,6.6 9.5,9.1 0.5,12.1" />
          <polygon points="0.5,16.6 9.5,13.6 9.5,16.1 0.5,19.1" />
        </svg>
      ))}

      <div className="absolute inset-y-0" style={{ left: "calc(var(--gap) * 1.9)", right: "calc(var(--gap) * 0.3)" }}>
        {techStack.map(({ tech, step }, j) => {
          const system = Math.floor(j / PER_SYSTEM);
          const col = j % PER_SYSTEM;
          const { Icon, label } = TECH[tech];
          return (
            <button
              key={tech}
              type="button"
              aria-label={`${label}: play the note`}
              title={label}
              onClick={() => strike(j)}
              onPointerEnter={(e) => e.pointerType === "mouse" && e.buttons === 1 && strike(j)}
              className={cn(
                "absolute flex items-center justify-center transition-[transform,background-color,color] duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink",
                lit === j ? "-translate-y-1.5 bg-ink text-page" : "bg-page text-ink hover:-translate-y-1"
              )}
              style={{
                left: `${((col + 0.5) / PER_SYSTEM) * 100}%`,
                top: `calc(var(--gap) * ${system * 5.5 + (8 - step) / 2})`,
                width: "calc(var(--gap) * 1.05)",
                height: "calc(var(--gap) * 1.05)",
                // centred on its place in the staff with margins, so the lift can use transform
                marginLeft: "calc(var(--gap) * -0.525)",
                marginTop: "calc(var(--gap) * -0.525)",
                fontSize: "calc(var(--gap) * 0.66)",
              }}
            >
              <Icon aria-hidden />
            </button>
          );
        })}
      </div>
    </>
  );
};

export default TechNotes;
