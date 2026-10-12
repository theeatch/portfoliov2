"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { scenes } from "@/data";
import { useJourney } from "./context";

/**
 * The viewport the journey plays out in. Exactly one planet's surface is
 * mounted at a time (two while one slides out and the next in).
 *
 * Travel is "next stop / previous stop": ← → keys, a sideways swipe, the nav or
 * the pager. Exploring a stop is vertical: its content scrolls, and reaching
 * the end of that scroll with a fresh gesture also carries on to the next stop,
 * so a plain mouse wheel can do the whole tour. (Which way the camera actually
 * moves, down / right / up, is decided by where the stops sit in the world.)
 *
 * Gestures that start on something draggable (marked data-no-travel: the tech
 * cards, the globe) never travel, so you can fling them freely.
 */

const WHEEL_THRESHOLD = 70;
const SWIPE_THRESHOLD = 60;

const edges = (el: HTMLElement | null) => {
  if (!el) return { scrollable: false, top: true, bottom: true };
  const max = el.scrollHeight - el.clientHeight;
  return {
    scrollable: max > 2,
    top: el.scrollTop <= 1,
    bottom: el.scrollTop >= max - 1,
  };
};

const scrollerOf = (target: EventTarget | null) =>
  target instanceof Element ? (target.closest("[data-scroller]") as HTMLElement | null) : null;

const noTravel = (target: EventTarget | null) =>
  target instanceof Element && !!target.closest("[data-no-travel]");

// compositor-only: opacity + transform, nothing that repaints
type Vec = { dx: number; dy: number };

// the new scene arrives from the way we are heading (below when diving, from
// the right when swimming right) and the old one leaves the opposite way
const variants = {
  enter: (v: Vec) => ({ opacity: 0, x: `${v.dx * 14}vw`, y: `${v.dy * 12}vh` }),
  center: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (v: Vec) => ({
    opacity: 0,
    x: `${v.dx * -14}vw`,
    y: `${v.dy * -12}vh`,
    transition: { duration: 0.4, ease: [0.5, 0, 0.75, 0] },
  }),
};

const fade = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const Stage = ({ views }: { views: React.ComponentType[] }) => {
  const { index, vec, next, prev, goTo } = useJourney();
  const reduced = useReducedMotion();

  const acc = useRef({ x: 0, y: 0 });
  const lastWheel = useRef(0);
  const freshGesture = useRef(true);
  const nav = useRef({ next, prev, goTo });
  nav.current = { next, prev, goTo };

  useEffect(() => {
    const move = (d: 1 | -1) => (d > 0 ? nav.current.next() : nav.current.prev());

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return; // pinch-zoom

      const now = performance.now();
      if (now - lastWheel.current > 140) {
        // a pause means a new gesture: momentum from the last one is spent
        freshGesture.current = true;
        acc.current = { x: 0, y: 0 };
      }
      lastWheel.current = now;

      const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);

      if (horizontal) {
        e.preventDefault(); // also stops the browser's swipe-back gesture
        if (!freshGesture.current || noTravel(e.target)) return;
        acc.current.x += e.deltaX;
        if (Math.abs(acc.current.x) >= WHEEL_THRESHOLD) {
          const d = acc.current.x > 0 ? 1 : -1;
          acc.current = { x: 0, y: 0 };
          freshGesture.current = false;
          move(d);
        }
        return;
      }

      const dy = e.deltaY;
      if (!dy) return;
      const { scrollable, top, bottom } = edges(scrollerOf(e.target));

      // tall stops scroll natively until the edge; momentum past it is ignored
      if (scrollable && ((dy > 0 && !bottom) || (dy < 0 && !top))) {
        freshGesture.current = false;
        acc.current = { x: 0, y: 0 };
        return;
      }

      e.preventDefault();
      if (!freshGesture.current) return;
      acc.current.y += dy;
      if (Math.abs(acc.current.y) >= WHEEL_THRESHOLD) {
        const d = acc.current.y > 0 ? 1 : -1;
        acc.current = { x: 0, y: 0 };
        freshGesture.current = false;
        move(d);
      }
    };

    let touch: {
      x: number;
      y: number;
      el: HTMLElement | null;
      atTop: boolean;
      atBottom: boolean;
      locked: boolean;
    } | null = null;

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      const el = scrollerOf(e.target);
      const { top, bottom } = edges(el);
      touch = { x: t.clientX, y: t.clientY, el, atTop: top, atBottom: bottom, locked: noTravel(e.target) };
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!touch) return;
      const t = e.changedTouches[0];
      const dx = touch.x - t.clientX;
      const dy = touch.y - t.clientY;
      const start = touch;
      touch = null;
      if (start.locked) return;

      // sideways swipe: travel
      if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy) * 1.4) {
        move(dx > 0 ? 1 : -1);
        return;
      }

      // vertical swipe from the end of a stop's scroll: carry on
      if (Math.abs(dy) < SWIPE_THRESHOLD * 1.2 || Math.abs(dy) < Math.abs(dx) * 1.4) return;
      const end = edges(start.el);
      if (dy > 0 && start.atBottom && end.bottom) move(1);
      if (dy < 0 && start.atTop && end.top) move(-1);
    };

    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (t && (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable)) return;

      // an exiting scene can linger in the DOM for a moment: the newest one is live
      const active =
        Array.from(document.querySelectorAll<HTMLElement>("[data-scroller]")).pop() ?? null;
      const { scrollable, top, bottom } = edges(active);

      const step = (d: 1 | -1, amount: number) => {
        if (scrollable && ((d > 0 && !bottom) || (d < 0 && !top))) {
          active?.scrollBy({ top: d * amount, behavior: "smooth" });
        } else {
          move(d);
        }
      };
      const onControl = !!t && /^(BUTTON|A)$/.test(t.tagName);

      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          move(1);
          break;
        case "ArrowLeft":
          e.preventDefault();
          move(-1);
          break;
        case "ArrowDown":
          e.preventDefault();
          step(1, 140);
          break;
        case "ArrowUp":
          e.preventDefault();
          step(-1, 140);
          break;
        case "PageDown":
          e.preventDefault();
          step(1, window.innerHeight * 0.8);
          break;
        case "PageUp":
          e.preventDefault();
          step(-1, window.innerHeight * 0.8);
          break;
        case " ":
          if (onControl) return;
          e.preventDefault();
          step(e.shiftKey ? -1 : 1, window.innerHeight * 0.8);
          break;
        case "Home":
          nav.current.goTo(0);
          break;
        case "End":
          nav.current.goTo(scenes.length - 1);
          break;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const View = views[index];

  return (
    <main className="fixed inset-0 z-10">
      <AnimatePresence custom={vec} initial={false}>
        <motion.div
          key={index}
          custom={vec}
          variants={reduced ? fade : variants}
          initial="enter"
          animate="center"
          exit="exit"
          data-scroller
          className="absolute inset-0 overflow-y-auto overflow-x-hidden overscroll-contain"
        >
          <View />
        </motion.div>
      </AnimatePresence>
    </main>
  );
};

export default Stage;
