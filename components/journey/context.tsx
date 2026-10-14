"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { animate, useMotionValue, useReducedMotion, type MotionValue } from "framer-motion";

import { scenes } from "@/data";
import { camFor, dipScale } from "@/lib/score";

type JourneyState = {
  /** active scene, 0-based (0 = the keyboard, 1-4 = the measures) */
  index: number;
  /** jump to a scene by index or id */
  goTo: (target: number | string) => void;
  next: () => void;
  prev: () => void;
  /** true while the camera is in flight */
  travelling: boolean;
  /** the camera: the world point under the screen centre, and the zoom */
  cam: { x: MotionValue<number>; y: MotionValue<number>; s: MotionValue<number> };
};

const JourneyContext = createContext<JourneyState | null>(null);

export const useJourney = () => {
  const ctx = useContext(JourneyContext);
  if (!ctx) throw new Error("useJourney must be used inside <JourneyProvider>");
  return ctx;
};

/** flight time of the camera, seconds. Input is ignored while it is in the air. */
const FLIGHT = { zoom: 1.5, pan: 1.7 };
const EASE = [0.65, 0, 0.25, 1] as [number, number, number, number];

const indexFromHash = (hash: string) => {
  const id = hash.replace(/^#/, "");
  return scenes.findIndex((s) => s.id === id);
};

export const JourneyProvider = ({ children }: { children: React.ReactNode }) => {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [travelling, setTravelling] = useState(false);

  // start from a plausible camera; the first effect seats it for the real viewport
  const camX = useMotionValue(800);
  const camY = useMotionValue(700);
  const camS = useMotionValue(0.4);
  const cam = useMemo(() => ({ x: camX, y: camY, s: camS }), [camX, camY, camS]);

  // refs mirror state so input handlers never read a stale closure
  const indexRef = useRef(0);
  const lockedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const flights = useRef<{ stop: () => void }[]>([]);
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;

  const seat = useCallback(
    (i: number) => {
      flights.current.forEach((f) => f.stop());
      const c = camFor(i, window.innerWidth, window.innerHeight);
      camX.jump(c.x);
      camY.jump(c.y);
      camS.jump(c.s);
    },
    [camX, camY, camS]
  );

  const fly = useCallback(
    (from: number, to: number) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const b = camFor(to, vw, vh);
      const bothMeasures = from > 0 && to > 0;
      const duration = reducedRef.current ? 0.25 : bothMeasures ? FLIGHT.pan : FLIGHT.zoom;

      flights.current.forEach((f) => f.stop());
      // pan between measures: pull back to see both, then settle into the next
      const scale: number | number[] = bothMeasures
        ? [camS.get(), dipScale(from, to, vw, vh), b.s]
        : b.s;
      flights.current = [
        animate(camX, b.x, { duration, ease: EASE }),
        animate(camY, b.y, { duration, ease: EASE }),
        animate(camS, scale, { duration, ease: bothMeasures ? "easeInOut" : EASE }),
      ];
      return duration;
    },
    [camX, camY, camS]
  );

  const commit = useCallback(
    (target: number, animateIt: boolean) => {
      const from = indexRef.current;
      if (target === from) return;
      indexRef.current = target;
      setIndex(target);

      const id = scenes[target].id;
      const url = id === "home" ? window.location.pathname : `#${id}`;
      window.history.replaceState(null, "", url);

      if (!animateIt) {
        seat(target);
        return;
      }
      const duration = fly(from, target);
      lockedRef.current = true;
      setTravelling(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        lockedRef.current = false;
        setTravelling(false);
      }, duration * 1000 * 0.92);
    },
    [fly, seat]
  );

  const goTo = useCallback(
    (target: number | string) => {
      const i =
        typeof target === "number" ? target : scenes.findIndex((s) => s.id === target);
      if (i < 0 || i >= scenes.length || lockedRef.current) return;
      commit(i, true);
    },
    [commit]
  );

  const next = useCallback(() => goTo(indexRef.current + 1), [goTo]);
  const prev = useCallback(() => goTo(indexRef.current - 1), [goTo]);

  // seat the camera for this viewport, keep it seated through resizes, and
  // follow deep links (#projects) on arrival and afterwards
  useEffect(() => {
    const initial = indexFromHash(window.location.hash);
    if (initial > 0) commit(initial, false);
    seat(indexRef.current);

    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => seat(indexRef.current));
    };
    const onHash = () => {
      const i = indexFromHash(window.location.hash);
      if (i >= 0) goTo(i);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("hashchange", onHash);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("hashchange", onHash);
      clearTimeout(timerRef.current);
    };
  }, [commit, goTo, seat]);

  const value = useMemo(
    () => ({ index, goTo, next, prev, travelling, cam }),
    [index, goTo, next, prev, travelling, cam]
  );

  return <JourneyContext.Provider value={value}>{children}</JourneyContext.Provider>;
};
