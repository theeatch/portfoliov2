"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * The curved edge of a planet rising into the bottom of the hero, seen from
 * orbit: dark surface, a bright rim light where the sun catches the limb, and
 * atmosphere glow bleeding upward into the void.
 *
 * Every layer shares one ellipse geometry (same width, same bottom offset) so
 * the curves nest instead of crossing each other. Pure CSS — no WebGL; the 3D
 * globe stays in the bento grid.
 */

// one shared geometry for every layer
const W = "172vw";
const H = "80vh";
const BOTTOM = "-52vh";

const PlanetHorizon = () => {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-0 left-1/2 z-[2] h-[46vh] w-screen -translate-x-1/2 overflow-hidden md:h-[52vh]"
    >
      {/* outer atmosphere: a wide soft halo above the limb */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-[50%] blur-3xl"
        style={{
          width: "196vw",
          height: "88vh",
          bottom: "-56vh",
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(56,189,248,0.34) 0%, rgba(99,102,241,0.14) 14%, transparent 34%)",
        }}
      />

      {/* inner atmosphere: tighter, brighter, hugging the rim */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-[50%] blur-xl"
        style={{
          width: "178vw",
          height: "82vh",
          bottom: "-53vh",
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(125,211,252,0.5) 0%, rgba(56,189,248,0.18) 8%, transparent 22%)",
        }}
      />

      {/* the planet body */}
      <motion.div
        initial={reduced ? undefined : { y: 60, opacity: 0 }}
        animate={reduced ? undefined : { y: 0, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        className="absolute left-1/2 rounded-[50%]"
        style={{
          x: "-50%",
          width: W,
          height: H,
          bottom: BOTTOM,
          background:
            "radial-gradient(ellipse at 50% 6%, #17253f 0%, #0b1226 26%, #050813 58%, #03050d 100%)",
          // the rim light lives here, so it can only ever follow the body's own curve
          boxShadow:
            "inset 0 1px 0 0 rgba(199,235,255,0.75), inset 0 6px 28px -8px rgba(125,211,252,0.45), inset 0 26px 80px -24px rgba(56,189,248,0.3)",
        }}
      >
        {/* terminator: night creeping in from the right */}
        <div
          className="absolute inset-0 rounded-[50%]"
          style={{
            background:
              "linear-gradient(100deg, rgba(3,5,13,0.15) 0%, transparent 32%, rgba(3,5,13,0.55) 82%)",
          }}
        />
        {/* faint surface banding, following the curve */}
        <div
          className="absolute inset-0 rounded-[50%] opacity-30"
          style={{
            background:
              "repeating-linear-gradient(178deg, rgba(148,190,255,0.05) 0px, transparent 3px, transparent 30px)",
          }}
        />
      </motion.div>

      {/* a satellite tracing the limb */}
      {!reduced && (
        <motion.div
          initial={{ x: "-10vw", opacity: 0 }}
          animate={{ x: "110vw", opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 26,
            times: [0, 0.1, 0.9, 1],
            repeat: Infinity,
            repeatDelay: 14,
            ease: "linear",
            delay: 4,
          }}
          className="absolute bottom-[30vh] left-0 h-[3px] w-[3px] rounded-full bg-white"
          style={{ boxShadow: "0 0 10px 2px rgba(125,211,252,0.9)" }}
        />
      )}
    </div>
  );
};

export default PlanetHorizon;
