"use client";

import { useEffect, useRef, useState } from "react";

import { Bird, Sub } from "@/components/world/art";
import { useWorld } from "@/lib/useWorld";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * Boot screen. It is in the server HTML, so the very first paint is already
 * themed. The world's surface (sea or canopy) is already in place behind a veil
 * that thins as loading progresses; a little submarine (or, in the forest, a
 * bird) travels along the waterline. When everything is in, it dives (or
 * soars) away and the veil lifts onto the hero.
 *
 * Progress is honest: each stage that actually completes moves the bar.
 */

const Loader = ({ onDone }: { onDone: () => void }) => {
  const reduced = useReducedMotion();
  const { forest } = useWorld();
  const target = useMotionValue(0.08);
  const progress = useSpring(target, { stiffness: 70, damping: 22 });
  const pct = useTransform(progress, (v) => `${Math.min(100, Math.round(v * 100))}%`);
  const barScale = useTransform(progress, (v) => Math.min(1, v));
  // the veil thins as we load: the world comes into view
  const veil = useTransform(progress, [0, 1], [0.94, 0.3]);
  // the vessel crosses the screen along the waterline
  const shipX = useTransform(progress, [0, 1], ["-12vw", "88vw"]);
  // the waterline / canopy line sits at 55% of the height
  const shipY = useTransform(progress, (v) => `${forest ? 50 - Math.sin(Math.min(1, v) * Math.PI) * 6 : 53}vh`);

  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);
  const finished = useRef(false);

  useEffect(() => {
    const start = performance.now();
    let returning = false;
    try {
      returning = sessionStorage.getItem("dh-booted") === "1";
    } catch {}
    const minTime = reduced ? 400 : returning ? 900 : 2200;

    const stages = { hydrated: true, fonts: false, loaded: false };
    const timers: ReturnType<typeof setTimeout>[] = [];

    const finish = () => {
      if (finished.current) return;
      finished.current = true;
      target.set(1);
      timers.push(
        setTimeout(() => {
          setExiting(true);
          onDone();
          try {
            sessionStorage.setItem("dh-booted", "1");
          } catch {}
          timers.push(setTimeout(() => setGone(true), 1100));
        }, 450)
      );
    };

    const update = () => {
      const n = Object.values(stages).filter(Boolean).length;
      target.set(Math.max(target.get(), 0.1 + n * 0.26));
      if (stages.fonts && stages.loaded) {
        timers.push(setTimeout(finish, Math.max(0, minTime - (performance.now() - start))));
      }
    };

    update();
    document.fonts?.ready.then(() => {
      stages.fonts = true;
      update();
    });
    const onLoad = () => {
      stages.loaded = true;
      update();
    };
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad);

    // never trap the visitor behind a stalled request
    timers.push(setTimeout(finish, 7000));

    return () => {
      window.removeEventListener("load", onLoad);
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (gone) return null;

  return (
    <div
      id="boot"
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className="fixed inset-0 z-[100] text-[#e0f2fe] [.light_&]:text-[#12301a]"
      style={{ pointerEvents: exiting ? "none" : "auto" }}
    >
      {/* the veil over the world */}
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{ opacity: exiting ? 0 : 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: "easeIn" }}
      >
        <motion.div
          className="absolute inset-0 bg-[#031d38] [.light_&]:bg-[#e6f3d6]"
          style={{ opacity: veil }}
        />
      </motion.div>

      {/* the vessel on the waterline */}
      <motion.div
        className="absolute left-0 top-0 h-[3.2rem] w-[8rem] -translate-x-1/2 -translate-y-1/2 sm:h-[4rem] sm:w-[10rem]"
        style={{ x: reduced ? "46vw" : shipX, y: reduced ? "50vh" : shipY }}
        animate={exiting ? { opacity: 0 } : undefined}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <motion.div
          className="h-full w-full"
          animate={
            exiting
              ? forest
                ? { y: "-70vh", x: "20vw", opacity: 0 }
                : { y: "40vh", rotate: 12, opacity: 0 }
              : reduced
              ? undefined
              : { y: ["0%", "-8%", "0%"] }
          }
          transition={
            exiting
              ? { duration: 1.1, ease: [0.5, 0, 0.9, 0.4] }
              : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
          }
        >
          {forest ? <Bird color="#1f3a22" className="h-full w-full" /> : <Sub className="h-full w-full" />}
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ opacity: exiting ? 0 : 1, y: exiting ? -10 : 0 }}
        className="absolute inset-x-0 top-[20vh] flex flex-col items-center gap-3 px-6"
      >
        <p className="font-display text-sm font-semibold tracking-[0.35em]">DH</p>
        <div className="h-[3px] w-[min(78vw,18rem)] overflow-hidden rounded-full bg-current/15">
          <motion.div
            className="h-full origin-left rounded-full bg-gradient-to-r from-[#7DD3FC] via-[#38BDF8] to-[#A78BFA]"
            style={{ scaleX: barScale }}
          />
        </div>
        <div className="flex w-[min(78vw,18rem)] items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] opacity-80">
          <span>{forest ? "Climbing in" : "Diving in"}</span>
          <motion.span>{pct}</motion.span>
        </div>
      </motion.div>
    </div>
  );
};

export default Loader;
