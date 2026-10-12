"use client";

import { motion } from "framer-motion";
import { FaArrowDown } from "react-icons/fa6";

import { useWorld } from "@/lib/useWorld";
import MagicButton from "./MagicButton";
import { useRise } from "./journey/Scene";
import { useJourney } from "./journey/context";

const COPY = {
  ocean: {
    title: "Backend work lives",
    accent: "beneath the surface",
    cta: "Dive in",
    cue: "Scroll to dive",
  },
  forest: {
    title: "Backend work grows",
    accent: "where you can't see it",
    cta: "Climb in",
    cue: "Scroll to climb",
  },
};

/**
 * The view from above: the surface of the ocean (or the top of the canopy)
 * fills the lower half of the screen, and the title floats in the sky above it.
 * The world itself is drawn by <Backdrop/>; this scene is just the words.
 */
const Hero = () => {
  const rise = useRise();
  const { next } = useJourney();
  const { world } = useWorld();
  const c = COPY[world];

  return (
    <div className="relative h-full min-h-[34rem] w-full overflow-hidden">
      <div className="absolute inset-x-0 top-0 flex flex-col items-center px-5 pt-[5.5rem] text-center sm:pt-24">
        <motion.p
          {...rise(0, -8)}
          className="mb-4 flex items-center gap-2.5 rounded-full border border-brand/40 bg-surface-700/85 px-4 py-1.5"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
          </span>
          <span className="eyebrow">Dhruv Negi · Gurugram, IN</span>
        </motion.p>

        <motion.h1
          {...rise(1)}
          className="heading max-w-6xl text-[2rem] leading-[1.1] text-ink sm:text-5xl lg:text-[3.2rem]"
        >
          {c.title}{" "}
          <span className="bg-gradient-to-br from-brand-soft via-brand to-accent bg-clip-text text-transparent">
            {c.accent}
          </span>
        </motion.h1>

        <motion.p
          {...rise(2)}
          className="mt-4 max-w-xl text-sm leading-relaxed text-ink/90 sm:text-base"
        >
          I&apos;m a Software Developer Engineer at GoSamplify, building REST APIs, real-time
          services and the architecture underneath them: the parts you never see. Come take a
          look.
        </motion.p>
      </div>

      {/* the invitation, floating on the water / in the leaves */}
      <motion.div
        {...rise(4)}
        className="absolute inset-x-0 flex flex-col items-center gap-3 px-5"
        style={{ top: "calc(55% + 4.5rem)" }}
      >
        <MagicButton title={c.cta} icon={<FaArrowDown />} position="right" handleClick={next} />
        <span className="stencil mt-1 hidden text-[10px] !text-white sm:block [.light_&]:!text-ink/80">
          {c.cue}
        </span>
      </motion.div>
    </div>
  );
};

export default Hero;
