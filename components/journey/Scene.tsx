"use client";

import { useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

/** seconds after a stop is chosen before its content starts to appear: the camera is still landing */
export const ARRIVE = 1.0;

/**
 * Shared frame for every scene: clears the nav above and the HUD below, centres
 * the content vertically when it is shorter than the screen, and lets the
 * Stage's scroller take over when it is taller.
 */
export const Scene = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "relative mx-auto flex min-h-full w-full max-w-7xl flex-col justify-center px-5 pb-20 pt-24 sm:px-10",
      className
    )}
  >
    {children}
  </div>
);

/**
 * Staggered entrance for a scene's pieces. Scenes remount on every visit, so
 * these run on mount rather than on scroll; `i` orders them.
 */
export const useRise = () => {
  const reduced = useReducedMotion();
  return (i = 0, y = 28) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.85,
            delay: ARRIVE + i * 0.08,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          },
        };
};
