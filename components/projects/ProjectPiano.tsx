"use client";

import { useEffect, useRef, useState } from "react";
import { LuArrowUpRight } from "react-icons/lu";

import { playNote } from "@/lib/piano";
import { TECH, type TechKey } from "@/lib/tech";
import { cn } from "@/lib/utils";

/** one octave, C4 to C5: eight naturals, and the five sharps that sit on the seams between them */
const WHITES = [60, 62, 64, 65, 67, 69, 71, 72];
const BLACKS = [
  { seam: 1, midi: 61 },
  { seam: 2, midi: 63 },
  { seam: 4, midi: 66 },
  { seam: 5, midi: 68 },
  { seam: 6, midi: 70 },
];

const ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

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
 * The standard project card: a small piano. An octave of keys in a case, a little
 * out of focus like a room behind a stage; the project's screenshot stands up out
 * of them, 75% of the width and almost sharp; the name is on an engraved
 * nameplate over it. The description and the stack are printed straight onto the
 * ivory keys at the foot of the card, no boxes: dark ink on ivory is always
 * legible, and the black keys stop well above them.
 * The keys are playable; the project opens from the name, the picture or the
 * arrow in the corner.
 */
const ProjectPiano = ({
  project,
  opus,
  className,
}: {
  project: Project;
  /** the card's number, shown on its nameplate as an opus number */
  opus: number;
  className?: string;
}) => {
  const { title, des, img, iconLists, link } = project;

  return (
    // the screenshot stands about a fifth of the card's width above the case: room is kept for it
    <article className={cn("group/pk relative pt-[21%]", className)}>
      <div className="border border-ink/70 bg-[rgb(var(--key-black))] px-1.5 pt-1.5">
        <div className="relative h-[27rem] sm:h-[24rem]">
          {/* keys: the whole keyboard sits a little out of focus */}
          <div aria-hidden className="absolute inset-0 blur-[1.5px]">
            <div className="absolute inset-0 flex">
              {WHITES.map((midi) => (
                <Key key={midi} midi={midi} className="pk-white flex-1" />
              ))}
            </div>
            {BLACKS.map(({ seam, midi }) => (
              <Key
                key={midi}
                midi={midi}
                className="pk-black absolute top-0 z-[1] h-[50%] w-[7%] sm:h-[58%]"
                style={{ left: `calc(${(seam / WHITES.length) * 100}% - 3.5%)` }}
              />
            ))}
          </div>

          {/* the screenshot, 75% wide and aligned to the seams, almost in focus */}
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
              className="h-full w-full scale-[1.02] object-cover object-top blur-[0.6px] transition-[filter] duration-500 group-hover/pk:blur-0"
            />
          </a>

          {/* the nameplate: engraved capitals in a double-ruled plate, with its opus number */}
          <h3 className="pointer-events-none absolute inset-x-0 top-3 z-20 flex justify-center">
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="pointer-events-auto block max-w-[75%] border border-ink bg-page p-[3px] sm:max-w-[84%] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              <span className="flex flex-col items-center border border-ink px-3 pb-2.5 pt-2 text-center sm:px-6">
                <span className="font-sans text-[13px] italic leading-none text-ink/70">Opus {ROMAN[opus] ?? opus}</span>
                <span className="mt-2 flex items-center gap-3 text-ink">
                  <i aria-hidden className="hidden h-1.5 w-1.5 shrink-0 bg-ink sm:block" />
                  <span className="font-display text-[1.3rem] leading-[1.15] tracking-[0.06em] [text-wrap:balance] sm:text-[1.9rem] sm:tracking-[0.08em] lg:text-[2rem]">
                    {title}
                  </span>
                  <i aria-hidden className="hidden h-1.5 w-1.5 shrink-0 bg-ink sm:block" />
                </span>
              </span>
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

          {/* description and stack: 80% of the card, at its foot, printed on the keys */}
          <div className="keyprint pointer-events-none absolute inset-x-[10%] bottom-4 z-20 flex flex-col gap-3">
            <p className="text-[15.5px] font-bold leading-[1.35] sm:text-[17px]">{des}</p>
            <ul aria-label="Built with" className="flex flex-wrap gap-x-5 gap-y-2">
              {iconLists.map((key) => {
                const { Icon, label } = TECH[key];
                return (
                  <li key={key} className="flex items-center gap-2 text-[13.5px] font-bold leading-none tracking-[0.02em]">
                    <Icon aria-hidden className="h-[18px] w-[18px] shrink-0" />
                    {label}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectPiano;
