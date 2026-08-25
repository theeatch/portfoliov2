"use client";

import { FaLocationArrow } from "react-icons/fa6";
import { motion, useReducedMotion } from "framer-motion";

import { projects } from "@/data";
import { PinContainer } from "./ui/Pin";
import SectionHeading from "./ui/SectionHeading";
import { TECH, TechIcon, type TechKey } from "./ui/TechIcon";

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
 * Stand-in artwork for a project that has no screenshot yet: its lead technology
 * glyph over a faint orbital grid. Reads as designed rather than as a broken image.
 */
const ProjectGlyph = ({ tech }: { tech?: TechKey }) => {
  const Icon = tech ? TECH[tech]?.Icon : undefined;

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      {/* concentric orbits */}
      <div className="absolute h-[130%] w-[130%] rounded-full border border-nebula-cyan/[0.09]" />
      <div className="absolute h-[95%] w-[95%] rounded-full border border-nebula-cyan/[0.12]" />
      <div className="absolute h-[62%] w-[62%] rounded-full border border-nebula-violet/[0.14]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 55%, rgba(56,189,248,0.16) 0%, transparent 62%)",
        }}
      />
      {Icon && (
        <Icon className="relative h-16 w-16 text-nebula-ice/60 drop-shadow-[0_0_24px_rgba(56,189,248,0.45)] lg:h-20 lg:w-20" />
      )}
    </div>
  );
};

const RecentProjects = () => {
  const reduced = useReducedMotion();

  return (
    <section className="py-20" id="projects">
      <SectionHeading
        eyebrow="Star charts"
        title="Things I've"
        accent="designed and shipped"
        subtitle="Backend infrastructure, AI tooling and full-stack apps — the work I'd point at first."
      />

      <div className="mt-10 grid grid-cols-1 justify-items-center gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((item, i) => (
          <motion.div
            key={item.id}
            initial={reduced ? undefined : { opacity: 0, y: 40 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.7,
              delay: (i % 3) * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex h-[26rem] w-[80vw] items-center justify-center sm:w-full sm:max-w-96 lg:h-[30rem]"
          >
            <a
              href={item.link}
              target="_blank"
              rel="noreferrer"
              aria-label={`${item.title} — open project`}
            >
              <PinContainer title={linkLabel(item.link)}>
                <div className="relative mb-10 flex h-[20vh] w-[80vw] items-center justify-center overflow-hidden sm:w-96 lg:h-[30vh]">
                  <div className="relative h-full w-full overflow-hidden bg-space-600 lg:rounded-3xl">
                    <img
                      src="/bg.png"
                      alt=""
                      className="h-full w-full object-cover opacity-40 mix-blend-luminosity"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(ellipse at 50% 120%, rgba(56,189,248,0.26) 0%, transparent 60%)",
                      }}
                    />
                    {!item.img && (
                      <div className="absolute inset-0">
                        <ProjectGlyph tech={item.iconLists[0]} />
                      </div>
                    )}
                  </div>
                  {item.img && (
                    <img
                      src={item.img}
                      alt={item.title}
                      className="absolute bottom-10 z-10 brightness-[0.88] saturate-[0.9] drop-shadow-[0_10px_30px_rgba(2,4,11,0.8)]"
                    />
                  )}
                </div>

                <h3 className="line-clamp-1 font-display text-base font-bold text-starlight md:text-xl lg:text-2xl">
                  {item.title}
                </h3>

                <p className="my-2 line-clamp-3 text-sm font-light leading-relaxed text-white-100 lg:text-base">
                  {item.des}
                </p>

                <div className="mb-3 mt-6 flex items-center justify-between">
                  <div className="flex items-center">
                    {item.iconLists.map((key, index) => (
                      <TechIcon
                        key={key}
                        name={key}
                        className="-ms-2 first:ms-0"
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-nebula-cyan transition-colors duration-300 group-hover/pin:text-nebula-ice">
                    <span className="font-mono text-[11px] uppercase tracking-[0.12em] md:text-xs">
                      Visit
                    </span>
                    <FaLocationArrow className="text-xs" />
                  </div>
                </div>
              </PinContainer>
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RecentProjects;
