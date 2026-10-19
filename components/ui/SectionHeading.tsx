"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ARRIVE } from "@/components/journey/Scene";

/**
 * Shared scene header, set like the top of a printed score: a tempo marking in
 * italics, the title, and a double barline down the left (a thick stroke and a
 * thin one) that opens the system. Scenes mount fresh on every visit, so it
 * animates on mount.
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
  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay: ARRIVE + delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
        };

  return (
    <div className={cn("relative max-w-3xl pl-7 sm:pl-9", className)}>
      {/* the double barline */}
      <motion.span
        aria-hidden
        initial={reduced ? undefined : { scaleY: 0 }}
        animate={reduced ? undefined : { scaleY: 1 }}
        transition={{ duration: 0.9, delay: ARRIVE, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-y-0 left-0 w-[6px] origin-top bg-ink"
      />
      <motion.span
        aria-hidden
        initial={reduced ? undefined : { scaleY: 0 }}
        animate={reduced ? undefined : { scaleY: 1 }}
        transition={{ duration: 0.9, delay: ARRIVE + 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-y-0 left-[12px] w-px origin-top bg-ink"
      />

      <motion.p {...rise(0)} className="eyebrow">
        {eyebrow}
      </motion.p>

      <motion.h2 {...rise(0.08)} className="heading mt-1.5">
        {title}
        {accent && (
          <>
            {" "}
            <em className="text-ink/75">{accent}</em>
          </>
        )}
      </motion.h2>

      {subtitle && (
        <motion.p {...rise(0.16)} className="mt-3 max-w-xl text-sm leading-relaxed text-white-100 md:text-base">
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeading;
