"use client";

import { useEffect, useRef, useState } from "react";
import { LuArrowUpRight } from "react-icons/lu";

import { playNote } from "@/lib/piano";
import { cn } from "@/lib/utils";
import { TechIcon, type TechKey } from "@/components/ui/TechIcon";

/** one octave, C4 to C5: eight naturals, and the five sharps that sit on the seams between them */
const WHITES = [60, 62, 64, 65, 67, 69, 71, 72];
const BLACKS = [
  { seam: 1, midi: 61 },
  { seam: 2, midi: 63 },
  { seam: 4, midi: 66 },
  { seam: 5, midi: 68 },
  { seam: 6, midi: 70 },
];

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

export type Project = {
  id: number;
  title: string;
  des: string;
  img: string;
  iconLists: TechKey[];
  link: string;
};

/**
 * The standard project card: a small piano. An octave of keys in a case; the
 * project's screenshot stands up out of the keys, 75% of the width, slightly out
 * of focus until you reach for it; the name is on a nameplate over it. The
 * description and the stack are printed on plates of their own, because a plate
 * has to be readable whether it lands on an ivory key or an ebony one.
 * The keys are playable; the project opens from the name, the picture or the
 * arrow in the corner.
 */
const ProjectPiano = ({ project, className }: { project: Project; className?: string }) => {
  const { title, des, img, iconLists, link } = project;

  return (
    // the screenshot stands about a fifth of the card's width above the case: room is kept for it
    <article className={cn("group/pk relative pt-[21%]", className)}>
      <div className="border border-ink/70 bg-[rgb(var(--key-black))] px-1.5 pt-1.5">
        <div className="relative h-[22rem]">
          {/* keys */}
          <div className="absolute inset-0 flex">
            {WHITES.map((midi) => (
              <Key key={midi} midi={midi} className="pk-white flex-1" />
            ))}
          </div>
          {BLACKS.map(({ seam, midi }) => (
            <Key
              key={midi}
              midi={midi}
              className="pk-black absolute top-0 z-[1] h-[58%] w-[7%]"
              style={{ left: `calc(${(seam / WHITES.length) * 100}% - 3.5%)` }}
            />
          ))}

          {/* the screenshot, 75% wide and aligned to the seams, a little out of focus */}
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            tabIndex={-1}
            aria-hidden
            className="absolute left-[12.5%] top-0 z-10 block aspect-[16/10] w-3/4 -translate-y-[45%] overflow-hidden border border-ink bg-page"
          >
            <img
              src={img}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full scale-[1.04] object-cover object-top blur-[1.5px] transition-[filter] duration-500 group-hover/pk:blur-0"
            />
          </a>

          {/* nameplate */}
          <h3 className="absolute left-1/2 top-3 z-20 max-w-[88%] -translate-x-1/2 border border-ink bg-page px-4 py-1.5 text-center font-display text-lg font-bold leading-tight text-ink sm:text-xl">
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              {title}
              <span className="sr-only"> (opens the project)</span>
            </a>
          </h3>

          {/* the link, top right */}
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            tabIndex={-1}
            aria-hidden
            className="absolute right-2 top-2 z-20 flex h-8 w-8 items-center justify-center border border-ink bg-page text-ink transition-colors hover:bg-ink hover:text-page"
          >
            <LuArrowUpRight className="h-4 w-4" />
          </a>

          {/* the two bottom plates: stack above description on a phone, description left and stack right from sm */}
          <div className="pointer-events-none absolute inset-x-2 bottom-2 z-20 flex flex-col items-end gap-1 sm:flex-row-reverse sm:items-end sm:justify-between sm:gap-3">
            <ul aria-label="Built with" className="pointer-events-auto flex shrink-0 gap-1 border border-ink bg-page p-1.5">
              {iconLists.map((key) => (
                <li key={key}>
                  <TechIcon name={key} />
                </li>
              ))}
            </ul>
            <p className="pointer-events-auto w-full border border-ink bg-page px-3 py-2.5 text-[12.5px] leading-[1.5] text-ink/90 sm:w-[min(40%,15rem)]">
              {des}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectPiano;
