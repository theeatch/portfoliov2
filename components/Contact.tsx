"use client";

import { FaGithub, FaLinkedinIn, FaYoutube, FaLocationArrow } from "react-icons/fa6";
import { IoCopyOutline } from "react-icons/io5";
import { motion } from "framer-motion";

import { socialMedia, contactEmail, scenes } from "@/data";
import { useCopy } from "@/lib/useCopy";
import KeyButton from "./KeyButton";
import SectionHeading from "./ui/SectionHeading";
import { Scene, useRise } from "./journey/Scene";

const ICONS = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
};

/**
 * Bar IV, the final bar: the open channel on the left, and on the right
 * everywhere else I can be found, as the spaces of a closing system: a barline
 * to open it and a double barline to end the piece. A row presses down (inverts)
 * under the pointer, like a key.
 */
const Contact = () => {
  const rise = useRise();
  const { copied, copy } = useCopy(contactEmail);

  return (
    <Scene className="justify-start pb-40 lg:justify-center">
      <div className="grid items-start gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow={scenes[4].tag}
            title="Got something"
            accent="worth building?"
            subtitle="I'm always up for talking about backend architecture, hard scaling problems, or an idea you can't stop thinking about. The inbox is open."
          />

          <motion.div {...rise(3, 12)} className="mt-8 flex flex-col gap-3 pl-7 sm:flex-row sm:pl-9">
            <KeyButton href={`mailto:${contactEmail}`} title="Let's get in touch" icon={<FaLocationArrow />} position="right" />
            <KeyButton
              tone="ebony"
              title={copied ? "Email is copied!" : "Copy my email address"}
              icon={<IoCopyOutline />}
              position="left"
              handleClick={copy}
            />
          </motion.div>
        </div>

        <ul className="relative">
          {/* the barline that opens the system, and the double one that ends the piece */}
          <span aria-hidden className="absolute inset-y-0 left-0 w-[3px] bg-ink" />
          <span aria-hidden className="absolute inset-y-0 right-[7px] w-px bg-ink" />
          <span aria-hidden className="absolute inset-y-0 right-0 w-[4px] bg-ink" />

          {socialMedia.map((s, i) => {
            const Icon = ICONS[s.icon];
            return (
              <motion.li key={s.id} {...rise(5 + i, 24)} className="border-t border-ink/35 last:border-b">
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 py-5 pl-7 pr-9 text-ink transition-colors hover:bg-ink hover:text-page focus-visible:bg-ink focus-visible:text-page focus-visible:outline-none"
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span className="min-w-0">
                    <span className="block font-display text-xl font-bold leading-tight">{s.name}</span>
                    <span className="block truncate font-mono text-[11px] tracking-wide text-ink/70 group-hover:text-page/80 group-focus-visible:text-page/80">
                      {s.handle} <span className="hidden sm:inline">· {s.blurb}</span>
                    </span>
                  </span>
                  <FaLocationArrow className="ml-auto h-3 w-3 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </motion.li>
            );
          })}
        </ul>
      </div>

      <motion.p {...rise(9, 8)} className="mt-16 font-mono text-[11px] tracking-wide text-white-100 md:text-xs">
        © {new Date().getFullYear()} Dhruv Negi - <em className="italic">fine</em>
      </motion.p>
    </Scene>
  );
};

export default Contact;
