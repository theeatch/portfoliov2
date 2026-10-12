"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FaLeaf, FaWater } from "react-icons/fa6";
import { useWorld } from "@/lib/useWorld";

/**
 * Shared scene header: a telemetry eyebrow, a ink headline with a
 * brand-gradient accent phrase, and a horizon rule that fades in from the
 * centre. Scenes mount fresh on every visit, so it animates on mount.
 */
const SectionHeading = ({
  eyebrow,
  title,
  accent,
  subtitle,
  className,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  subtitle?: string;
  className?: string;
}) => {
  const reduced = useReducedMotion();
  const { forest } = useWorld();

  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay: 0.35 + delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
        };

  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <motion.div {...rise(0)} className="flex items-center gap-3">
        {forest ? <FaLeaf className="h-3.5 w-3.5 text-brand" /> : <FaWater className="h-3.5 w-3.5 text-brand" />}
        <p className="eyebrow">{eyebrow}</p>
      </motion.div>

      <motion.h2 {...rise(0.08)} className="heading heading-grad mt-4">
        {title}
        {accent && (
          <>
            {" "}
            <span className="bg-gradient-to-br from-brand-soft via-brand to-accent bg-clip-text text-transparent">
              {accent}
            </span>
          </>
        )}
      </motion.h2>

      {subtitle && (
        <motion.p
          {...rise(0.16)}
          className="mt-4 max-w-xl text-sm leading-relaxed text-white-100 md:text-base"
        >
          {subtitle}
        </motion.p>
      )}

      <motion.span
        initial={reduced ? undefined : { scaleX: 0, opacity: 0 }}
        animate={reduced ? undefined : { scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="horizon-line mt-6 h-[1px] w-56 md:w-72"
      />
    </div>
  );
};

export default SectionHeading;
