"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";

import { projects, scenes } from "@/data";
import SectionHeading from "./ui/SectionHeading";
import Book from "./projects/Book";
import BookModal from "./projects/BookModal";
import Keys from "./projects/Keys";
import { Scene, useRise } from "./journey/Scene";

/** each book's keys start a register higher than the last, so left to right the four are one long keyboard (C3 to C7) */
const REGISTERS = [48, 60, 72, 84];

/**
 * Bar II: the work, as sheet-music books standing on a piano. Every project is a
 * closed book on its own octave of keys; pressing the book opens it as a
 * two-page spread (see BookModal), pressing the keys plays them.
 */
const RecentProjects = () => {
  const rise = useRise();
  const [open, setOpen] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(null);
    // Safari does not focus a button on click, so the book to return to is kept by hand
    opener.current?.focus();
  }, []);

  return (
    <Scene className="justify-start">
      <SectionHeading
        eyebrow={scenes[2].tag}
        title="Things I've"
        accent="designed and shipped"
        subtitle="A rate limiter and three AI apps, bound as sheet books. Open one to read it; the keys they stand on play."
      />

      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:mt-12 lg:grid-cols-4 lg:gap-x-8">
        {projects.map((item, i) => (
          <motion.div key={item.id} {...rise(3 + i, 30)}>
            <Book
              project={item}
              opus={i + 1}
              onOpen={(el) => {
                opener.current = el;
                setOpen(i);
              }}
            />
            <Keys from={REGISTERS[i % REGISTERS.length]} />
          </motion.div>
        ))}
      </div>

      <BookModal project={open === null ? null : projects[open]} opus={(open ?? 0) + 1} onClose={close} />
    </Scene>
  );
};

export default RecentProjects;
