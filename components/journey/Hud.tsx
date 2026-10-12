"use client";

import { motion, useTransform } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import { scenes } from "@/data";
import { cn } from "@/lib/utils";
import { useWorld } from "@/lib/useWorld";
import { useJourney } from "./context";

/**
 * Bottom pager (where you are among the five stops, with previous / next; the
 * main way to travel on a phone) and a depth / height gauge that reads the real
 * camera position, so it counts up as you dive.
 */
const Hud = () => {
  const { index, goTo, next, prev, cam } = useJourney();
  const { forest } = useWorld();
  const scene = scenes[index];

  // ocean: metres below the waterline. forest: metres above the ground.
  const reading = useTransform(cam.y, (y) =>
    forest ? `${Math.round(34 - y * 12)} m` : `${Math.max(0, Math.round((y - 0.55) * 42))} m`
  );

  return (
    <>
      <div
        className="fixed left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-full border border-hair/25 bg-surface-800/95 p-1 shadow-orbit"
        style={{ bottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <button
          type="button"
          onClick={prev}
          disabled={index === 0}
          aria-label="Previous stop"
          className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition active:scale-90 enabled:hover:bg-brand/10 disabled:opacity-30"
        >
          <FaChevronLeft className="h-3.5 w-3.5" />
        </button>

        <ol className="flex items-center gap-1 px-1">
          {scenes.map((s, i) => {
            const active = i === index;
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to ${s.place[forest ? 1 : 0]}`}
                  aria-current={active}
                  className="group flex h-9 items-center justify-center px-1.5"
                >
                  <span
                    className={cn(
                      "block rounded-full transition-all duration-500",
                      active
                        ? "h-3 w-3 bg-brand shadow-glow"
                        : "h-2 w-2 bg-hair/40 group-hover:bg-brand/70"
                    )}
                  />
                </button>
              </li>
            );
          })}
        </ol>

        <span className="hidden min-w-[7.5rem] px-2 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-ink sm:block">
          {scene.place[forest ? 1 : 0]}
          <span className="text-white-100"> · {scene.code}</span>
        </span>

        <button
          type="button"
          onClick={next}
          disabled={index === scenes.length - 1}
          aria-label="Next stop"
          className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition active:scale-90 enabled:hover:bg-brand/10 disabled:opacity-30"
        >
          <FaChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="stencil pointer-events-none fixed bottom-5 left-5 z-40 hidden items-baseline gap-2 rounded-full border border-hair/25 bg-surface-800/95 px-3.5 py-1.5 text-[10px] sm:flex lg:left-8">
        <span>{forest ? "Height" : "Depth"}</span>
        <motion.span className="font-display text-sm font-bold tracking-normal text-ink">{reading}</motion.span>
      </div>
    </>
  );
};

export default Hud;
