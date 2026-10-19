"use client";

import { motion } from "framer-motion";
import { FaLocationArrow } from "react-icons/fa6";

import { workExperience, resumeLink, scenes } from "@/data";
import { cn } from "@/lib/utils";
import KeyButton from "./KeyButton";
import SectionHeading from "./ui/SectionHeading";
import { Scene, useRise } from "./journey/Scene";

/**
 * Bar III: the log, set as one system. A thick barline runs down the left, every
 * entry opens on a staff line, and a note marks its kind: a filled square for
 * work, an open one for education (the way a half note differs from a quarter).
 * Newest first, everything on the page at once.
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

      <ol className="relative mt-12 max-w-4xl">
        <span aria-hidden className="absolute inset-y-0 left-0 w-[3px] bg-ink" />

        {workExperience.map((card, i) => (
          <motion.li
            key={card.id}
            {...rise(3 + i, 24)}
            className="relative grid gap-x-10 gap-y-3 border-t border-ink/35 py-8 pl-7 last:border-b sm:pl-9 md:grid-cols-[11.5rem_1fr_auto]"
          >
            <div>
              <p className="font-mono text-xs tracking-[0.16em] text-white-100">{card.period}</p>
              <p className="mt-2 flex items-center gap-2 font-display text-[12px] tracking-[0.14em] text-ink">
                <span
                  aria-hidden
                  className={cn("block h-2.5 w-2.5 border border-ink", card.kind === "education" ? "bg-transparent" : "bg-ink")}
                />
                {card.kind === "education" ? "Education" : "Work"}
              </p>
            </div>

            <div className="min-w-0">
              <h3 className="font-display text-lg leading-snug tracking-[0.05em] text-ink sm:text-2xl">{card.title}</h3>
              <p className="mt-1.5 text-lg italic text-ink/70">{card.org}</p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white-100 sm:text-base">{card.desc}</p>
            </div>

            <img
              src={card.thumbnail}
              alt=""
              loading="lazy"
              decoding="async"
              className="duotone hidden h-14 w-14 object-contain md:block"
            />
          </motion.li>
        ))}
      </ol>

      <motion.div {...rise(7, 12)} className="mt-8 max-w-4xl pl-7 sm:pl-9">
        <KeyButton href={resumeLink} title="View full résumé" icon={<FaLocationArrow />} position="right" />
      </motion.div>
    </Scene>
  );
};

export default Experience;
