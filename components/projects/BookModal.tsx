"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FaLocationArrow } from "react-icons/fa6";
import { LuArrowUpRight, LuX } from "react-icons/lu";

import type { Project } from "@/data";
import { TECH } from "@/lib/tech";
import KeyButton from "../KeyButton";
import { ROMAN } from "./Book";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/**
 * The book, open. Left page: the project's picture with the stack printed under
 * it. Right page: the name, what it is, and the way in. The picture and the
 * button both lead to the project. A double barline runs down the gutter, as
 * it does at the head of a system. From md up the right page turns open from the
 * spine; below that the pages stack and simply fade up.
 */
const Spread = ({ project, opus, onClose }: { project: Project; opus: number; onClose: () => void }) => {
  const { title, tagline, des, img, iconLists, link } = project;
  const reduced = useReducedMotion();
  // read once: the spread only ever mounts on the client, after a click
  const [wide] = useState(() => window.matchMedia("(min-width: 768px)").matches);
  const turn = wide && !reduced;

  const root = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => closeBtn.current?.focus(), []);

  // Escape closes; Tab stays inside the book
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !root.current) return;
      const stops = Array.from(root.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));
      if (!stops.length) return;
      const first = stops[0];
      const last = stops[stops.length - 1];
      const outside = !root.current.contains(document.activeElement);
      if (e.shiftKey && (document.activeElement === first || outside)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (document.activeElement === last || outside)) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const lift = reduced ? { initial: { opacity: 0 }, animate: { opacity: 1 } } : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 } };

  return (
    // data-modal: the journey (wheel, keys, swipes) stands still while a book is open, see Stage.tsx
    <motion.div
      ref={root}
      data-modal
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[70] overflow-y-auto overscroll-contain bg-black/75"
    >
      <div
        className="flex min-h-full items-center justify-center p-4 sm:p-8"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div className="relative w-full max-w-[60rem]" style={{ perspective: 2200 }}>
          <div className="relative grid md:grid-cols-2">
            {/* left page */}
            <motion.section
              {...lift}
              transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
              className="relative flex flex-col border border-ink bg-page p-5 shadow-[6px_6px_0_0_rgb(var(--ink)/0.3)] sm:p-7 md:border-r-0 md:pr-9"
            >
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${title} (opens in a new tab)`}
                className="group/shot relative block aspect-video w-full overflow-hidden border border-ink bg-[rgb(var(--key-black))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
              >
                <Image
                  src={img}
                  alt={`${title}: a screenshot of the app`}
                  fill
                  sizes="(min-width: 768px) 480px, 92vw"
                  className="object-cover object-top transition-transform duration-500 group-hover/shot:scale-[1.03]"
                />
                <span
                  aria-hidden
                  className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center border border-ink bg-page text-ink transition-colors group-hover/shot:bg-ink group-hover/shot:text-page"
                >
                  <LuArrowUpRight className="h-4 w-4" />
                </span>
              </a>

              {/* the stack, printed at the foot of the page */}
              <div className="mt-auto pt-6">
                <p className="eyebrow">Built with</p>
                <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2.5 border-t border-ink/35 pt-3">
                  {iconLists.map((key) => {
                    const { Icon, label } = TECH[key];
                    return (
                      <li key={key} className="flex items-center gap-2 text-[15px] leading-none text-ink">
                        <Icon aria-hidden className="h-[18px] w-[18px] shrink-0" />
                        {label}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </motion.section>

            {/* right page */}
            <motion.section
              {...(turn
                ? { initial: { rotateY: -95, opacity: 0.3 }, animate: { rotateY: 0, opacity: 1 } }
                : lift)}
              transition={{ duration: turn ? 0.8 : 0.6, delay: turn ? 0.15 : 0.12, ease: EASE }}
              style={{ transformOrigin: "left center", backfaceVisibility: "hidden" }}
              className="relative z-[1] flex flex-col border border-t-[3px] border-ink bg-page p-5 shadow-[6px_6px_0_0_rgb(var(--ink)/0.3)] sm:p-7 md:min-h-[26rem] md:border-l-0 md:border-t md:pl-9"
            >
              <div className="pr-11">
                <p className="font-sans text-[13px] italic leading-none text-ink/70">Opus {ROMAN[opus] ?? opus}</p>
                <h2
                  id={titleId}
                  className="mt-3 font-display text-[1.9rem] leading-[1.1] tracking-[0.06em] text-ink [text-wrap:balance] sm:text-[2.3rem]"
                >
                  {title}
                </h2>
                {tagline && <p className="mt-2 text-lg italic text-ink/70">{tagline}</p>}
              </div>
              <span aria-hidden className="my-5 block h-[3px] w-14 bg-ink" />
              <p className="text-base leading-relaxed text-ink/85 sm:text-[17px]">{des}</p>

              <div className="mt-auto pt-8">
                <KeyButton href={link} title="Open the project" icon={<FaLocationArrow />} position="right" />
              </div>
            </motion.section>

            {/* the gutter: a thick barline and a thin one */}
            <span aria-hidden className="pointer-events-none absolute inset-y-0 left-1/2 z-[2] hidden w-[3px] -translate-x-1/2 bg-ink md:block" />
            <span aria-hidden className="pointer-events-none absolute inset-y-0 left-1/2 z-[2] ml-[5px] hidden w-px bg-ink md:block" />
          </div>

          <button
            ref={closeBtn}
            type="button"
            onClick={onClose}
            aria-label="Close the book"
            className="absolute right-3 top-3 z-[3] flex h-9 w-9 items-center justify-center border border-ink bg-page text-ink transition-colors hover:bg-ink hover:text-page focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            <LuX className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

/** Mounts the open book over everything (on <body>, clear of the journey's transforms) while a project is chosen. */
const BookModal = ({ project, opus, onClose }: { project: Project | null; opus: number; onClose: () => void }) => {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return null;

  return createPortal(
    <AnimatePresence>
      {project && <Spread key={project.id} project={project} opus={opus} onClose={onClose} />}
    </AnimatePresence>,
    document.body
  );
};

export default BookModal;
