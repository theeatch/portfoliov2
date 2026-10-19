"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { IoCopyOutline } from "react-icons/io5";

import { aboutItems, contactEmail, scenes } from "@/data";
import { useCopy } from "@/lib/useCopy";
import { cn } from "@/lib/utils";
import KeyButton from "./KeyButton";
import SectionHeading from "./ui/SectionHeading";
import { ARRIVE, Scene } from "./journey/Scene";
import StaffCard from "./about/StaffCard";
import TechNotes from "./about/TechNotes";
import { AKey, Thread } from "./about/Thread";

const [craft, place, stack, piano, now, hello] = aboutItems;

/**
 * Bar I. Six fragments of staff, uneven in size and in where they sit, tied
 * together by one thread that is a piano string tuned to A (see Thread.tsx).
 * Only opacity animates here: the thread is measured off the cards' real
 * positions, so nothing may be mid-flight when it is drawn.
 */
const About = () => {
  const reduced = useReducedMotion();
  const { copied, copy } = useCopy(contactEmail);

  const appear = (i: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.9, delay: ARRIVE + 0.15 + i * 0.1, ease: "easeOut" as const },
        };

  return (
    <Scene className="justify-start">
      <SectionHeading
        eyebrow={scenes[1].tag}
        title="A little about"
        accent="who I am"
        subtitle="Pluck the thread: it is a piano string, tuned to A."
      />

      {/* below lg: one column, the thread runs down the left. lg up: a zigzag of cards that never share a row */}
      <Thread className="mt-12 flex flex-col gap-y-14 pl-6 lg:gap-y-20 lg:pl-0">
        <motion.div {...appear(0)} className="-ml-7 lg:ml-0 lg:mr-[16%] lg:self-end">
          <AKey />
        </motion.div>

        <motion.div {...appear(1)} className="max-w-[34rem] lg:w-[min(46%,32rem)] lg:max-w-none lg:self-start">
          <StaffCard size="[--gap:1.55rem] md:[--gap:1.8rem] lg:[--gap:2.3rem]" side="right">
            <p>{craft.title}</p>
          </StaffCard>
        </motion.div>

        <motion.div {...appear(2)} className="ml-5 max-w-[30rem] lg:ml-0 lg:mr-[5%] lg:-mt-10 lg:w-[min(34%,23rem)] lg:max-w-none lg:self-end">
          <StaffCard
            size="[--gap:1.45rem] md:[--gap:1.7rem] lg:[--gap:1.85rem]"
            side="left"
            footer={
              <p className="mt-3 font-mono text-[11px] tracking-[0.14em] text-white-100" style={{ paddingLeft: "calc(var(--gap) * 1.1)" }}>
                28.46° N · 77.03° E
              </p>
            }
          >
            <p>{place.title}</p>
          </StaffCard>
        </motion.div>

        <motion.div {...appear(3)} className="max-w-[37rem] lg:ml-[7%] lg:w-[min(56%,37rem)] lg:max-w-none lg:self-start">
          <StaffCard
            size="[--gap:1.6rem] md:[--gap:1.85rem] lg:[--gap:2.1rem]"
            side="right"
            systems={2}
            kicker={
              <div className="mb-3">
                <p className="font-display text-xl font-bold leading-none text-ink">{stack.title}</p>
                <p className="eyebrow mt-1.5">{stack.description}</p>
              </div>
            }
          >
            <TechNotes />
          </StaffCard>
        </motion.div>

        <motion.div {...appear(4)} className="ml-5 max-w-[30rem] lg:ml-0 lg:mr-[2%] lg:w-[min(36%,26rem)] lg:max-w-none lg:self-end">
          <a
            href="https://www.youtube.com/@DHsPianoLand"
            target="_blank"
            rel="noreferrer"
            aria-label="Watch me play piano on YouTube: DH's Piano Land"
            className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-ink"
          >
            <StaffCard
              size="[--gap:1.5rem] md:[--gap:1.75rem] lg:[--gap:1.95rem]"
              side="left"
              footer={
                <p
                  className="mt-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink"
                  style={{ paddingLeft: "calc(var(--gap) * 1.1)" }}
                >
                  <span className="border-b border-transparent group-hover:border-ink">DH&apos;s Piano Land</span>
                  <FaArrowUpRightFromSquare className="h-2.5 w-2.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </p>
              }
            >
              <p>{piano.title}</p>
            </StaffCard>
          </a>
        </motion.div>

        <motion.div {...appear(5)} className="max-w-[34rem] lg:ml-[3%] lg:w-[min(46%,33rem)] lg:max-w-none lg:self-start">
          <StaffCard
            size="[--gap:1.55rem] md:[--gap:1.8rem] lg:[--gap:2.1rem]"
            side="right"
            kicker={<p className="eyebrow mb-1.5">{now.description}</p>}
          >
            <p>{now.title}</p>
          </StaffCard>
        </motion.div>

        <motion.div {...appear(6)} className="ml-5 max-w-[30rem] lg:ml-0 lg:mr-[9%] lg:w-[min(36%,25rem)] lg:max-w-none lg:self-end">
          <StaffCard
            size="[--gap:1.55rem] md:[--gap:1.8rem] lg:[--gap:2rem]"
            side="left"
            final
            footer={
              <div className="mt-6" style={{ paddingLeft: "calc(var(--gap) * 1.1)" }}>
                <KeyButton
                  title={copied ? "Email is copied!" : "Copy my email address"}
                  icon={<IoCopyOutline />}
                  position="left"
                  handleClick={copy}
                />
              </div>
            }
          >
            <p>{hello.title}</p>
          </StaffCard>
        </motion.div>
      </Thread>
    </Scene>
  );
};

export default About;
