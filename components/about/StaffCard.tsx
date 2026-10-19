"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * A card with no box: a fragment of staff. Five lines, a thick barline where the
 * system starts, and the text set on it one line to a space, the way lyrics sit
 * under a melody. The staff scales with the type (`size` sets --gap, the distance
 * between lines), so a small aside gets a small staff, like a cue-size stave.
 *
 * Every card has a peg on the end of its middle line: that is where the thread
 * ties on (see Thread.tsx). On a phone every thread ties on the left.
 */
const StaffCard = ({
  size,
  side,
  systems = 1,
  final = false,
  kicker,
  footer,
  className,
  children,
}: {
  /** classes that set --gap, e.g. "[--gap:1.5rem] md:[--gap:2rem]" */
  size: string;
  /** the edge the thread ties on from lg up */
  side: "left" | "right";
  /** staves stacked, each with its own five lines; with more than one the children place themselves */
  systems?: number;
  /** close the fragment with a double barline */
  final?: boolean;
  /** a tempo marking set above the staff */
  kicker?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) => {
  const content = useRef<HTMLDivElement>(null);
  // text fills the spaces between the lines; if it runs past four of them the staff grows to hold it
  const [spaces, setSpaces] = useState(4);

  useEffect(() => {
    const el = content.current;
    if (!el || systems > 1) return;
    const measure = () => {
      const gap = parseFloat(getComputedStyle(el).lineHeight);
      if (gap) setSpaces(Math.max(4, Math.round(el.scrollHeight / gap)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [systems]);

  const stack = systems > 1;
  // one system is `spaces` gaps tall; stacked systems are four gaps each, with a gap and a half between
  const height = stack ? 4 * systems + 1.5 * (systems - 1) : spaces;
  const rows = stack ? Array.from({ length: systems }, (_, s) => ({ top: s * 5.5, n: 4 })) : [{ top: 0, n: spaces }];

  return (
    <div data-staff className={cn("relative", size, className)}>
      {kicker && <div style={{ paddingLeft: "calc(var(--gap) * 1.1)" }}>{kicker}</div>}

      <div className="relative" style={{ height: `calc(var(--gap) * ${height})` }}>
        {/* the lines */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {rows.map(({ top, n }) => (
            <div key={top}>
              {Array.from({ length: n + 1 }, (_, i) => (
                <span
                  key={i}
                  className="absolute inset-x-0 h-px bg-ink/35"
                  style={{ top: `calc(var(--gap) * ${top + i})` }}
                />
              ))}
              {/* the barline that opens the system */}
              <span
                className="absolute left-0 w-[3px] bg-ink"
                style={{ top: `calc(var(--gap) * ${top})`, height: `calc(var(--gap) * ${n} + 1px)` }}
              />
              {final && (
                <>
                  <span
                    className="absolute right-[7px] w-px bg-ink"
                    style={{ top: `calc(var(--gap) * ${top})`, height: `calc(var(--gap) * ${n} + 1px)` }}
                  />
                  <span
                    className="absolute right-0 w-[4px] bg-ink"
                    style={{ top: `calc(var(--gap) * ${top})`, height: `calc(var(--gap) * ${n} + 1px)` }}
                  />
                </>
              )}
            </div>
          ))}
        </div>

        {/* the peg: a square on the end of the middle line, where the thread ties on */}
        <span
          aria-hidden
          className={cn(
            "absolute z-30 flex h-[9px] w-[16px] -translate-y-1/2 items-center",
            side === "right"
              ? "left-[-16px] flex-row-reverse lg:left-auto lg:right-[-16px] lg:flex-row"
              : "left-[-16px] flex-row-reverse"
          )}
          style={{ top: "calc(var(--gap) * 2 + 0.5px)" }}
        >
          <i className="block h-px flex-1 bg-ink/50" />
          <i data-peg className="block h-[9px] w-[9px] border border-ink bg-page" />
        </span>

        <div
          ref={content}
          className={cn("font-sans text-ink", stack ? "absolute inset-0" : "relative")}
          style={{
            paddingLeft: "calc(var(--gap) * 1.1)",
            paddingRight: "calc(var(--gap) * 0.5)",
            lineHeight: "var(--gap)",
            fontSize: "calc(var(--gap) * 0.7)",
          }}
        >
          {children}
        </div>
      </div>

      {footer}
    </div>
  );
};

export default StaffCard;
