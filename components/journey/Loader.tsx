"use client";

import { useEffect, useRef, useState } from "react";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * Boot screen. It is in the server HTML, so the very first paint is already
 * themed (black, or white for the inverted theme). A row of keys fills in
 * as loading progresses; when everything is in, the veil lifts onto the hero.
 *
 * Progress is honest: each stage that actually completes moves the bar.
 */

const KEYS = 14;

const Loader = ({ onDone }: { onDone: () => void }) => {
  const reduced = useReducedMotion();
  const target = useMotionValue(0.08);
  const progress = useSpring(target, { stiffness: 70, damping: 22 });
  const pct = useTransform(progress, (v) => `${Math.min(100, Math.round(v * 100))}%`);

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
    <motion.div
      id="boot"
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-[rgb(var(--bg-void))] text-ink"
      initial={false}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 0.8, delay: 0.15, ease: "easeIn" }}
      style={{ pointerEvents: exiting ? "none" : "auto" }}
    >
      <p className="font-display text-sm tracking-[0.35em]">DH</p>

      {/* keys press down one after another as the page loads */}
      <div className="flex h-24 items-start gap-[3px]" aria-hidden>
        {Array.from({ length: KEYS }, (_, i) => (
          <Key key={i} i={i} progress={progress} reduced={!!reduced} />
        ))}
      </div>

      <div className="flex w-[min(78vw,18rem)] items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] opacity-80">
        <span>Tuning</span>
        <motion.span>{pct}</motion.span>
      </div>
    </motion.div>
  );
};

const Key = ({ i, progress, reduced }: { i: number; progress: ReturnType<typeof useSpring>; reduced: boolean }) => {
  // each key sinks as the progress passes its position
  const t = (i + 1) / KEYS;
  const y = useTransform(progress, [t - 1 / KEYS, t], [0, 10]);
  const fill = useTransform(progress, [t - 1 / KEYS, t], [1, 0.3]);
  return (
    <motion.span
      className="block h-full w-3 bg-ink sm:w-4"
      style={reduced ? undefined : { y, opacity: fill }}
    />
  );
};

export default Loader;
