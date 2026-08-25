"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaLocationArrow } from "react-icons/fa6";

import { workExperience, resumeLink } from "@/data";
import { Button } from "./ui/MovingBorders";
import SectionHeading from "./ui/SectionHeading";
import MagicButton from "./MagicButton";

const Experience = () => {
  const reduced = useReducedMotion();

  return (
    <section className="w-full py-20" id="experiences">
      <SectionHeading
        eyebrow="Flight log"
        title="Where I've"
        accent="been shipping"
        subtitle="Two years at GoSamplify going from intern to engineer, on top of an IT degree from Manipal."
      />

      <div className="mt-14 grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {workExperience.map((card, i) => (
          <motion.div
            key={card.id}
            initial={reduced ? undefined : { opacity: 0, y: 30 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.65,
              delay: i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Button
              as="div"
              // fixed per-card cadence keeps server and client render identical
              duration={11000 + i * 2300}
              borderRadius="1.75rem"
              containerClassName="w-full h-full !col-span-1"
              className="h-full border-white/[0.08]"
              style={{ borderRadius: `calc(1.75rem * 0.96)` }}
            >
              <div className="flex h-full flex-col gap-4 p-6 lg:p-8">
                <div className="flex items-start justify-between gap-3">
                  <img
                    src={card.thumbnail}
                    alt=""
                    className="duotone-nebula h-16 w-16 shrink-0 object-contain object-left drop-shadow-[0_0_18px_rgba(56,189,248,0.3)] lg:h-20 lg:w-20"
                  />
                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] ${
                      card.kind === "education"
                        ? "border-nebula-violet/25 text-nebula-plasma/80"
                        : "border-nebula-cyan/25 text-nebula-cyan/80"
                    }`}
                  >
                    {card.kind === "education" ? "Education" : "Work"}
                  </span>
                </div>

                <div>
                  <h3 className="text-start font-display text-lg font-bold leading-snug text-starlight lg:text-xl">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-start font-mono text-[11px] leading-relaxed tracking-wide text-nebula-cyan/70">
                    {card.org}
                    <br />
                    <span className="text-white-100/60">{card.period}</span>
                  </p>
                </div>

                <p className="text-start text-sm leading-relaxed text-white-100">
                  {card.desc}
                </p>
              </div>
            </Button>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <a href={resumeLink} target="_blank" rel="noreferrer">
          <MagicButton
            title="View full résumé"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>
    </section>
  );
};

export default Experience;
