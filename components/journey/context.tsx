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

import { useSpring, type MotionValue } from "framer-motion";

import { scenes, stationAt } from "@/data";
import { useWorld } from "@/lib/useWorld";

type JourneyState = {
  /** active scene, 0-based */
  index: number;
  /** which way the camera is travelling: signs of the move on each axis */
  vec: { dx: -1 | 0 | 1; dy: -1 | 0 | 1 };
  /** jump to a scene by index or id */
  goTo: (target: number | string) => void;
  next: () => void;
  prev: () => void;
  /** true while a transition is in flight */
  travelling: boolean;
  /** the camera, sprung toward the current station (screens right / down) */
  cam: { x: MotionValue<number>; y: MotionValue<number> };
};

const JourneyContext = createContext<JourneyState | null>(null);

export const useJourney = () => {
  const ctx = useContext(JourneyContext);
  if (!ctx) throw new Error("useJourney must be used inside <JourneyProvider>");
  return ctx;
};

/** how long input is ignored after a jump, so one flick = one scene */
export const TRAVEL_MS = 950;

const indexFromHash = (hash: string) => {
  const id = hash.replace(/^#/, "");
  return scenes.findIndex((s) => s.id === id);
};

export const JourneyProvider = ({ children }: { children: React.ReactNode }) => {
  const [{ index, vec }, setPos] = useState<{ index: number; vec: JourneyState["vec"] }>({
    index: 0,
    vec: { dx: 0, dy: 1 },
  });
  const [travelling, setTravelling] = useState(false);
  const { forest } = useWorld();
  const forestRef = useRef(forest);
  forestRef.current = forest;
  // one spring drives every parallax layer, so the whole world moves as one
  const camX = useSpring(0, { stiffness: 46, damping: 16, restDelta: 0.001 });
  const camY = useSpring(0, { stiffness: 46, damping: 16, restDelta: 0.001 });
  const cam = useMemo(() => ({ x: camX, y: camY }), [camX, camY]);

  // refs mirror state so input handlers never read a stale closure
  const indexRef = useRef(0);
  const lockedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const commit = useCallback((target: number, animate: boolean) => {
    const from = indexRef.current;
    if (target === from) return;
    indexRef.current = target;
    const a = stationAt(from, forestRef.current);
    const b = stationAt(target, forestRef.current);
    const sign = (n: number) => (n > 0.01 ? 1 : n < -0.01 ? -1 : 0) as -1 | 0 | 1;
    if (animate) {
      camX.set(b.x);
      camY.set(b.y);
    } else {
      camX.jump(b.x);
      camY.jump(b.y);
    }
    setPos({ index: target, vec: { dx: sign(b.x - a.x), dy: sign(b.y - a.y) } });

    const id = scenes[target].id;
    const url = id === "home" ? window.location.pathname : `#${id}`;
    window.history.replaceState(null, "", url);

    if (animate) {
      lockedRef.current = true;
      setTravelling(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        lockedRef.current = false;
        setTravelling(false);
      }, TRAVEL_MS);
    }
  }, [camX, camY]);

  const goTo = useCallback(
    (target: number | string) => {
      const i =
        typeof target === "number"
          ? target
          : scenes.findIndex((s) => s.id === target);
      if (i < 0 || i >= scenes.length || lockedRef.current) return;
      commit(i, true);
    },
    [commit]
  );

  const next = useCallback(() => goTo(indexRef.current + 1), [goTo]);
  const prev = useCallback(() => goTo(indexRef.current - 1), [goTo]);

  // switching worlds re-seats the camera at the same stop of the new world
  useEffect(() => {
    const at = stationAt(indexRef.current, forest);
    camX.jump(at.x);
    camY.jump(at.y);
  }, [forest, camX, camY]);

  // deep links: land on the scene named in the hash, and follow it afterwards
  useEffect(() => {
    const initial = indexFromHash(window.location.hash);
    if (initial > 0) commit(initial, false);

    const onHash = () => {
      const i = indexFromHash(window.location.hash);
      if (i >= 0) goTo(i);
    };
    window.addEventListener("hashchange", onHash);
    return () => {
      window.removeEventListener("hashchange", onHash);
      clearTimeout(timerRef.current);
    };
  }, [commit, goTo]);

  const value = useMemo(
    () => ({ index, vec, goTo, next, prev, travelling, cam }),
    [index, vec, goTo, next, prev, travelling, cam]
  );

  return (
    <JourneyContext.Provider value={value}>{children}</JourneyContext.Provider>
  );
};
