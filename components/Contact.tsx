"use client";

import { useState } from "react";
import { FaGithub, FaLinkedinIn, FaYoutube, FaLocationArrow, FaMusic } from "react-icons/fa6";
import { IoCopyOutline } from "react-icons/io5";
import { motion } from "framer-motion";

import { socialMedia, contactEmail, scenes } from "@/data";
import MagicButton from "./MagicButton";
import ParticleBurst from "./ui/ParticleBurst";
import { Scene, useRise } from "./journey/Scene";

const ICONS = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
};

/** Bar IV, the final bar: the open channel, and everywhere else I can be found. */
const Contact = () => {
  const rise = useRise();
  const [copied, setCopied] = useState(false);
  const [burst, setBurst] = useState(0);

  const copy = () => {
    navigator.clipboard?.writeText(contactEmail);
    setCopied(true);
    setBurst((n) => n + 1);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <Scene className="items-center pb-40 text-center">
      <motion.div {...rise(0)} className="mb-5 flex items-center gap-3">
        <FaMusic className="h-3 w-3 text-brand" />
        <p className="eyebrow">{scenes[4].tag}</p>
      </motion.div>

      <motion.h2 {...rise(1)} className="heading heading-grad max-w-4xl lg:text-[3.4rem]">
        Got something{" "}
        <em className="font-normal italic text-brand-soft">worth building?</em>
      </motion.h2>

      <motion.p
        {...rise(2)}
        className="mt-5 max-w-2xl text-sm leading-relaxed text-white-100 md:text-base"
      >
        I&apos;m always up for talking about backend architecture, hard scaling
        problems, or an idea you can&apos;t stop thinking about. The inbox is open.
      </motion.p>

      <motion.div
        {...rise(3)}
        className="relative mt-3 flex w-full flex-col items-center gap-0 sm:w-auto sm:flex-row sm:gap-4"
      >
        <a href={`mailto:${contactEmail}`} className="w-full sm:w-auto">
          <MagicButton title="Let's get in touch" icon={<FaLocationArrow />} position="right" />
        </a>
        <div className="relative w-full sm:w-auto">
          <ParticleBurst
            trigger={burst}
            className="absolute -bottom-8 left-1/2 h-56 w-[22rem] -translate-x-1/2"
          />
          <MagicButton
            title={copied ? "Email is copied!" : "Copy my email address"}
            icon={<IoCopyOutline />}
            position="left"
            handleClick={copy}
            otherClasses="!bg-surface-600/90"
          />
        </div>
      </motion.div>

      <ul className="mt-12 grid w-full max-w-4xl gap-3 sm:grid-cols-3">
        {socialMedia.map((s, i) => {
          const Icon = ICONS[s.icon];
          return (
            <motion.li key={s.id} {...rise(5 + i, 30)}>
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="surface-card glow-ring group flex h-full items-center gap-4 rounded-2xl border border-hair/[0.14] p-4 text-left transition-transform duration-500 hover:-translate-y-1.5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-hair/15 bg-surface-700/70 text-lg text-brand-soft transition-colors group-hover:border-brand/50 group-hover:text-brand">
                  <Icon />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-base font-semibold text-ink">
                    {s.name}
                  </span>
                  <span className="block truncate font-mono text-[11px] tracking-wide text-brand/90">
                    {s.handle}
                  </span>
                </span>
                <FaLocationArrow className="ml-auto h-3 w-3 shrink-0 text-white-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand" />
              </a>
            </motion.li>
          );
        })}
      </ul>

      <motion.p
        {...rise(9, 8)}
        className="mt-10 font-mono text-[11px] tracking-wide text-white-100 md:text-xs"
      >
        © {new Date().getFullYear()} Dhruv Negi — <em className="italic">fine</em>
      </motion.p>
    </Scene>
  );
};

export default Contact;
