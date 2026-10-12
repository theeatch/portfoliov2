"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FaLeaf, FaWater } from "react-icons/fa6";

import { cn } from "@/lib/utils";

/**
 * Ocean <-> forest. The new world opens from the button as a widening circle (View Transitions API), then settles; browsers without it just swap.
 * The knob is positioned by CSS off the `.light` class so it never flashes the
 * wrong state before hydration.
 */
const ThemeToggle = ({ className }: { className?: string }) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const inForest = mounted && resolvedTheme === "light";

  const toggle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = inForest ? "dark" : "light";
    const apply = () => {
      const root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(next);
      root.style.colorScheme = next;
      setTheme(next);
    };

    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void> };
    };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!doc.startViewTransition || reduced) {
      apply();
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(cx, window.innerWidth - cx),
      Math.max(cy, window.innerHeight - cy)
    );

    const transition = doc.startViewTransition(apply);
    try {
      await transition.ready;
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${cx}px ${cy}px)`,
            `circle(${radius}px at ${cx}px ${cy}px)`,
          ],
        },
        {
          duration: 950,
          easing: "cubic-bezier(0.65, 0, 0.25, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    } catch {
      /* transition skipped: the theme has already been applied */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={inForest}
      aria-label={inForest ? "Back to the ocean" : "Climb into the forest"}
      title={inForest ? "Back to the ocean" : "Climb into the forest"}
      className={cn(
        "group relative flex h-9 w-[3.75rem] sm:w-[4.25rem] shrink-0 items-center rounded-full border border-hair/20 bg-surface-700/70 p-1 backdrop-blur-md transition-colors hover:border-brand/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60",
        className
      )}
    >
      {/* glyphs sit under the knob, the active one is hidden by it */}
      <FaWater className="absolute left-2.5 h-3.5 w-3.5 text-brand-soft" />
      <FaLeaf className="absolute right-2.5 h-3.5 w-3.5 text-white-100" />
      <span
        className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-brand-soft to-accent text-white shadow-glow transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] [.light_&]:translate-x-6 sm:[.light_&]:translate-x-8"
      >
        <FaWater className="h-3.5 w-3.5 [.light_&]:hidden" />
        <FaLeaf className="hidden h-3.5 w-3.5 [.light_&]:block" />
      </span>
    </button>
  );
};

export default ThemeToggle;
