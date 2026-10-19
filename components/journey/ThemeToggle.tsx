"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa6";

import { cn } from "@/lib/utils";

/**
 * Black <-> white. The other theme opens from the button as a widening circle
 * (View Transitions API), then settles; browsers without it just swap.
 * The knob is positioned by CSS off the `.light` class so it never flashes the
 * wrong state before hydration.
 */
const ThemeToggle = ({ className }: { className?: string }) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isLight = mounted && resolvedTheme === "light";

  const toggle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = isLight ? "dark" : "light";
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
          duration: 850,
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
      aria-checked={isLight}
      aria-label={isLight ? "Switch to the black theme" : "Switch to the white theme"}
      title={isLight ? "Black theme" : "White theme"}
      className={cn(
        "group relative flex h-11 w-[3.75rem] shrink-0 items-center border border-ink bg-page p-1 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:w-[4.25rem]",
        className
      )}
    >
      {/* glyphs sit under the knob, the active one is hidden by it */}
      <FaMoon className="absolute left-2.5 h-3.5 w-3.5 text-ink" />
      <FaSun className="absolute right-2.5 h-3.5 w-3.5 text-ink" />
      <span className="relative z-10 flex h-8 w-7 items-center justify-center bg-ink text-page transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] [.light_&]:translate-x-6 sm:[.light_&]:translate-x-8">
        <FaMoon className="h-3.5 w-3.5 [.light_&]:hidden" />
        <FaSun className="hidden h-3.5 w-3.5 [.light_&]:block" />
      </span>
    </button>
  );
};

export default ThemeToggle;
