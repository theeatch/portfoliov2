"use client";

import { FaLocationArrow } from "react-icons/fa6";
import { motion, useReducedMotion } from "framer-motion";

import MagicButton from "./MagicButton";
import { Spotlight } from "./ui/Spotlight";
import PlanetHorizon from "./ui/PlanetHorizon";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";

const Hero = () => {
  const reduced = useReducedMotion();

  return (
    <div className="relative min-h-[100svh] pb-28 pt-36">
      {/* distant light sources washing across the void */}
      <div>
        <Spotlight
          className="-left-10 -top-40 h-screen md:-left-32 md:-top-20"
          fill="#38BDF8"
        />
        <Spotlight
          className="left-full top-10 h-[80vh] w-[50vw]"
          fill="#A78BFA"
        />
        <Spotlight
          className="left-80 top-28 h-[80vh] w-[50vw]"
          fill="#22D3EE"
        />
      </div>

      <div className="relative z-10 my-16 flex justify-center md:my-20">
        <div className="flex max-w-[89vw] flex-col items-center justify-center md:max-w-2xl lg:max-w-[62vw]">
          {/* telemetry-style eyebrow */}
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: -8 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 flex items-center gap-2.5 rounded-full border border-nebula-cyan/20 bg-space-600/40 px-4 py-1.5 backdrop-blur-md"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-nebula-cyan opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-nebula-cyan" />
            </span>
            <p className="eyebrow">Signal from Gurugram, IN</p>
          </motion.div>

          <TextGenerateEffect
            words="I build APIs and real-time systems"
            accentFrom={4}
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
          />

          <motion.p
            initial={reduced ? undefined : { opacity: 0 }}
            animate={reduced ? undefined : { opacity: 1 }}
            transition={{ delay: 1.5, duration: 2 }}
            className="mb-4 max-w-2xl text-center text-sm text-white-200 md:text-lg md:tracking-wider lg:text-xl"
          >
            I&apos;m Dhruv Negi - Software Developer Engineer at GoSamplify,
            working on REST APIs, real-time services and the backend
            architecture underneath them.
          </motion.p>

          <motion.a
            initial={reduced ? undefined : { opacity: 0 }}
            animate={reduced ? undefined : { opacity: 1 }}
            transition={{ delay: 2, duration: 2 }}
            href="#about"
          >
            <MagicButton
              title="Show my work"
              icon={<FaLocationArrow />}
              position="right"
            />
          </motion.a>
        </div>
      </div>

      {/* the planet below */}
      <PlanetHorizon />

      {/* scroll cue */}
      <motion.div
        initial={reduced ? undefined : { opacity: 0 }}
        animate={reduced ? undefined : { opacity: 1 }}
        transition={{ delay: 3, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white-100/60">
            Descend
          </span>
          <div className="h-10 w-[1px] overflow-hidden bg-white/10">
            <motion.div
              animate={reduced ? undefined : { y: ["-100%", "300%"] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-4 w-full bg-gradient-to-b from-transparent via-nebula-cyan to-transparent"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
