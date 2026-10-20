"use client";

import Image from "next/image";
import { LuBookOpen } from "react-icons/lu";

import type { Project } from "@/data";

export const ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

/**
 * A project, closed: a book on the shelf. The cover is the project's own
 * screenshot, put out of focus (it comes into focus a little under the pointer),
 * with its name engraved on a double-ruled plate, set large enough to read from
 * across the room. The spine is a thick barline on the left, the thickness of the
 * pages a flat offset edge. Pressing it opens the book (see BookModal).
 */
const Book = ({
  project,
  opus,
  onOpen,
}: {
  project: Project;
  /** the book's number, shown on its plate as an opus number */
  opus: number;
  onOpen: (opener: HTMLElement) => void;
}) => {
  const { title, img } = project;

  return (
    <button
      type="button"
      onClick={(e) => onOpen(e.currentTarget)}
      aria-haspopup="dialog"
      aria-label={`Open ${title}`}
      // the cover is a size container: the title is set in cqw so it scales with the book, not the screen
      className="group/book relative block aspect-[3/4] w-full border border-ink/70 bg-[rgb(var(--key-black))] text-left shadow-[4px_4px_0_0_rgb(var(--ink)/0.3)] transition-[transform,box-shadow] duration-300 [container-type:inline-size] hover:-translate-y-1.5 hover:shadow-[6px_10px_0_0_rgb(var(--ink)/0.3)] focus-visible:-translate-y-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
    >
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <Image
          src={img}
          alt=""
          fill
          sizes="(min-width: 1024px) 280px, 45vw"
          className="scale-110 object-cover object-top blur-[7px] transition-[filter] duration-500 group-hover/book:blur-[3px] group-focus-visible/book:blur-[3px]"
        />
        {/* flat dimming, so the plate and the label read the same over a cream cover as over a navy one */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* the spine: a thick barline and a thin one, as at the head of every bar */}
      <span aria-hidden className="absolute inset-y-0 left-0 w-[14px] bg-[rgb(var(--key-black))]" />
      <span aria-hidden className="absolute inset-y-0 left-[14px] w-px bg-white/30" />

      <div className="absolute inset-0 flex items-center justify-center pb-6 pl-[14px] pr-1.5">
        <div className="max-w-full border border-ink bg-page p-[3px]">
          {/* padding and type both scale with the cover, so the longest word always fits its plate */}
          <div className="flex flex-col items-center border border-ink pb-3.5 pt-3 text-center" style={{ paddingInline: "3.5cqw" }}>
            <span className="font-sans text-[13px] italic leading-none text-ink/70">Opus {ROMAN[opus] ?? opus}</span>
            <span
              className="mt-2.5 font-display leading-[1.12] tracking-[0.06em] text-ink [text-wrap:balance]"
              style={{ fontSize: "clamp(0.8rem, 9cqw, 2.2rem)" }}
            >
              {title}
            </span>
          </div>
        </div>
      </div>

      <div aria-hidden className="absolute inset-x-0 bottom-3 flex justify-center pl-[14px]">
        <span className="flex items-center gap-2 bg-[rgb(var(--key-black))] px-2.5 py-1.5 font-display text-[10px] tracking-[0.18em] text-white">
          <LuBookOpen className="hidden h-3 w-3 sm:block" />
          OPEN THE BOOK
        </span>
      </div>
    </button>
  );
};

export default Book;
