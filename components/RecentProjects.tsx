"use client";

import { FaLocationArrow } from "react-icons/fa6";
import { motion } from "framer-motion";

import { projects, scenes } from "@/data";
import { useWorld } from "@/lib/useWorld";
import SectionHeading from "./ui/SectionHeading";
import ProjectGlyph from "./ui/ProjectGlyph";
import { TechIcon } from "./ui/TechIcon";
import { Scene, useRise } from "./journey/Scene";

/** "https://github.com/theeatch/RateFlow" -> "github.com/theeatch/RateFlow" */
const linkLabel = (link: string) => {
  try {
    const u = new URL(link);
    const path = u.pathname.replace(/\/$/, "");
    return (u.host + path).replace(/^www\./, "");
  } catch {
    return link;
  }
};

/**
 * The work, drifting in the reef (or hanging from the branch). Each project is
 * a card with a small "viewscreen"; the whole card is a link.
 */
const RecentProjects = () => {
  const rise = useRise();
  const { forest } = useWorld();

  return (
    <Scene className="justify-start">
      <SectionHeading
        eyebrow={scenes[2].tag[forest ? 1 : 0]}
        title="Things I've"
        accent="designed and shipped"
        subtitle="Backend infrastructure, AI tooling and full-stack apps — the work I'd point at first."
      />

      {/* the projects drift: bobbing in the current, or swaying on the branch */}
      <div className="mt-10 grid gap-x-6 gap-y-8 md:grid-cols-2 lg:gap-x-8">
        {projects.map((item, i) => (
          <div
            key={item.id}
            className={`relative md:even:mt-12 ${forest ? "a-swing" : "a-bob"}`}
            style={{ ["--dur" as string]: `${6 + i * 1.3}s`, ["--delay" as string]: `${-i * 1.7}s` }}
          >
            {forest && (
              <span aria-hidden className="absolute -top-8 left-1/2 h-8 w-0.5 bg-gradient-to-b from-[#5b3a1c] to-brand" />
            )}
          <motion.a
            {...rise(3 + i, 30)}
            href={item.link}
            target="_blank"
            rel="noreferrer"
            aria-label={`${item.title} — open project`}
            className="surface-solid glow-ring group flex flex-col overflow-hidden rounded-3xl border border-hair/[0.16] shadow-orbit transition-transform duration-500 hover:-translate-y-1.5"
          >
            {/* viewscreen: always dark, like a monitor, in both themes */}
            <div className="relative h-44 overflow-hidden bg-[#060914] sm:h-52">
              <img
                src="/opt/bg.webp"
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover opacity-40"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 120%, rgba(56,189,248,0.28) 0%, transparent 60%)",
                }}
              />
              {item.img ? (
                <img
                  src={item.img}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-x-0 bottom-3 top-3 z-10 mx-auto h-[calc(100%-1.5rem)] object-contain transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0">
                  <ProjectGlyph tech={item.iconLists[0]} />
                </div>
              )}
              <span className="absolute left-3 top-3 z-20 rounded-full border border-white/20 bg-black/55 px-2.5 py-1 font-mono text-[10px] tracking-wide text-[#C7EBFF]">
                {linkLabel(item.link)}
              </span>
              <span className="absolute right-3 top-3 z-20 font-mono text-[10px] tracking-[0.2em] text-[#7DD3FC]">
                {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white-100">{item.des}</p>

              <div className="mt-auto flex items-center justify-between pt-5">
                <div className="flex items-center">
                  {item.iconLists.map((key) => (
                    <TechIcon key={key} name={key} className="-ms-2 first:ms-0" />
                  ))}
                </div>
                <span className="flex items-center gap-2 rounded-full border border-brand/40 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-brand transition-colors group-hover:bg-brand/10">
                  Visit
                  <FaLocationArrow className="text-[10px] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </motion.a>
          </div>
        ))}
      </div>
    </Scene>
  );
};

export default RecentProjects;
