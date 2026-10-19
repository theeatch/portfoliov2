"use client";

import { motion } from "framer-motion";
import { FaArrowDown } from "react-icons/fa6";

import KeyButton from "./KeyButton";
import { useRise } from "./journey/Scene";
import { useJourney } from "./journey/context";

/**
 * The title block over the overview: the page of music and the keyboard are
 * drawn by <Score/> underneath. Everything here lets pointer events fall
 * through to the keys, except the button.
 */
const Hero = () => {
  const rise = useRise();
  const { next } = useJourney();

  return (
    <div className="pointer-events-none relative h-full min-h-[34rem] w-full overflow-hidden">
      <div className="absolute inset-x-0 top-0 flex flex-col items-center px-5 pt-[4.75rem] text-center sm:pt-[5.25rem]">
        <motion.p {...rise(0, -8)} className="eyebrow mb-3">
          Dhruv Negi · Gurugram, IN
        </motion.p>

        <motion.h1
          {...rise(1)}
          className="heading max-w-5xl text-ink"
        >
          Backend systems,{" "}
          <em className="text-ink/75">composed with care</em>
        </motion.h1>

        <motion.p
          {...rise(2)}
          className="mt-3 max-w-2xl text-sm leading-relaxed text-white-100 sm:text-base"
        >
          Software Developer Engineer at GoSamplify. Press a key, or begin the score.
        </motion.p>

        <motion.div {...rise(3, 12)} className="pointer-events-auto mt-1 w-full max-w-[15rem]">
          <KeyButton title="Begin the score" icon={<FaArrowDown />} position="right" handleClick={next} />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
