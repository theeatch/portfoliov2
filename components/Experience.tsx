"use client";

import { motion } from "framer-motion";
import { FaLocationArrow } from "react-icons/fa6";

import { workExperience, resumeLink, scenes } from "@/data";
import { cn } from "@/lib/utils";
import SectionHeading from "./ui/SectionHeading";
import MagicButton from "./MagicButton";
import { Scene, useRise } from "./journey/Scene";

/**
 * Bar III: the log as one vertical line. Every leg is on the page at once;
 * the line down the left is the route, newest first.
 */
const Experience = () => {
  const rise = useRise();

  return (
    <Scene className="justify-start">
      <SectionHeading
        eyebrow={scenes[3].tag}
        title="Where I've"
        accent="been shipping"
        subtitle="Two years at GoSamplify going from intern to engineer, on top of an IT degree from Manipal."
      />

      <ol className="relative mx-auto mt-10 w-full max-w-3xl">
        <span
          aria-hidden
          className="absolute bottom-6 left-[0.95rem] top-6 w-px bg-gradient-to-b from-brand via-brand/40 to-transparent sm:left-[1.2rem]"
        />
        {workExperience.map((card, i) => (
          <motion.li key={card.id} {...rise(3 + i, 28)} className="relative pb-6 pl-11 sm:pl-14">
            {/* waypoint */}
            <span
              aria-hidden
              className={cn(
                "absolute left-[0.45rem] top-7 h-3 w-3 rounded-full border-2 sm:left-[0.7rem]",
                card.kind === "education"
                  ? "border-brand/60 bg-surface-900"
                  : "border-brand bg-brand shadow-glow"
              )}
            />

            <div className="surface-solid glow-ring rounded-3xl border border-hair/[0.16] p-5 shadow-orbit sm:p-7">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-brand">
                    {card.period}
                  </p>
                  <h3 className="mt-1.5 font-display text-lg font-bold leading-snug text-ink sm:text-xl">
                    {card.title}
                  </h3>
                  <p className="mt-1 text-sm text-white-100">{card.org}</p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-3">
                  <span
                    className={cn(
                      "rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em]",
                      card.kind === "education"
                        ? "border-hair/40 text-white-100"
                        : "border-brand/40 text-brand"
                    )}
                  >
                    {card.kind === "education" ? "Education" : "Work"}
                  </span>
                  <img
                    src={card.thumbnail}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="duotone h-12 w-12 object-contain sm:h-14 sm:w-14"
                  />
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white-100 sm:text-base">{card.desc}</p>
            </div>
          </motion.li>
        ))}
      </ol>

      <motion.div {...rise(7, 12)} className="mt-2 flex justify-center">
        <a href={resumeLink} target="_blank" rel="noreferrer">
          <MagicButton title="View full résumé" icon={<FaLocationArrow />} position="right" />
        </a>
      </motion.div>
    </Scene>
  );
};

export default Experience;
