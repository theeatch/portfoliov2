"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Shared section header: a telemetry eyebrow, a starlight headline with a
 * nebula-gradient accent phrase, and a horizon rule that fades in from the
 * centre — so every section reads like a new waypoint on the same journey.
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

  const rise = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
      };

  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <motion.div
        {...rise}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-3"
      >
        <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-nebula-cyan/60" />
        <p className="eyebrow">{eyebrow}</p>
        <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-nebula-cyan/60" />
      </motion.div>

      <motion.h2
        {...rise}
        transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="heading heading-cosmic mt-5"
      >
        {title}
        {accent && (
          <>
            {" "}
            <span className="bg-gradient-to-br from-nebula-ice via-nebula-cyan to-nebula-violet bg-clip-text text-transparent">
              {accent}
            </span>
          </>
        )}
      </motion.h2>

      {subtitle && (
        <motion.p
          {...rise}
          transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 max-w-xl text-sm leading-relaxed text-white-100 md:text-base"
        >
          {subtitle}
        </motion.p>
      )}

      <motion.span
        initial={reduced ? undefined : { scaleX: 0, opacity: 0 }}
        whileInView={reduced ? undefined : { scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="horizon-line mt-8 h-[1px] w-56 md:w-72"
      />
    </div>
  );
};

export default SectionHeading;
