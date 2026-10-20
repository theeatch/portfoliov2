"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import { scenes } from "@/data";
import { cn } from "@/lib/utils";
import { useJourney } from "./context";

/**
 * Bottom pager: where you are among the five stops (as a short run of piano
 * keys), with previous / next. It is the main way to travel on a phone. It
 * stays out of the way on the home scene, where the keys are playable.
 */
const Hud = () => {
  const { index, goTo, next, prev } = useJourney();
  const scene = scenes[index];

  return (
    <AnimatePresence>
      {index > 0 && (
        <motion.div
          key="pager"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed left-1/2 z-40 flex items-center gap-1 border border-ink bg-page p-1"
          // x lives here, not in a -translate-x-1/2 class: motion writes its own transform for y and would drop the class's
          style={{ x: "-50%", bottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          <button
            type="button"
            onClick={prev}
            aria-label="Previous bar"
            className="flex h-9 w-9 items-center justify-center text-ink transition active:translate-y-0.5 enabled:hover:bg-ink enabled:hover:text-page"
          >
            <FaChevronLeft className="h-3.5 w-3.5" />
          </button>

          <ol className="flex items-center gap-1 px-1">
            {scenes.map((s, i) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to ${s.label}`}
                  aria-current={i === index}
                  className="group flex h-9 items-center justify-center px-1"
                >
                  {/* a key: it sinks (and fills) when it is the current stop */}
                  <span
                    className={cn(
                      "block w-2.5 border transition-all duration-300",
                      i === index
                        ? "h-4 translate-y-0.5 border-ink bg-ink"
                        : "h-5 border-ink/50 bg-transparent group-hover:border-ink group-hover:bg-ink/20"
                    )}
                  />
                </button>
              </li>
            ))}
          </ol>

          <span className="hidden min-w-[8rem] px-2 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-ink sm:block">
            {scene.label}
            <span className="text-white-100"> · {scene.code}</span>
          </span>

          <button
            type="button"
            onClick={next}
            disabled={index === scenes.length - 1}
            aria-label="Next bar"
            className="flex h-9 w-9 items-center justify-center text-ink transition active:translate-y-0.5 enabled:hover:bg-ink enabled:hover:text-page disabled:opacity-30"
          >
            <FaChevronRight className="h-3.5 w-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Hud;
