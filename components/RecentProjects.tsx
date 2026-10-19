"use client";

import { motion } from "framer-motion";

import { projects, scenes } from "@/data";
import { cn } from "@/lib/utils";
import SectionHeading from "./ui/SectionHeading";
import ProjectPiano from "./projects/ProjectPiano";
import { Scene, useRise } from "./journey/Scene";

/**
 * Bar II: the work. Every project is the same little piano (see ProjectPiano);
 * they are laid out unevenly on purpose: two unequal columns, the second one
 * dropped, so the pianos sit like notes at different heights on a staff.
 */
const RecentProjects = () => {
  const rise = useRise();

  return (
    <Scene className="justify-start">
      <SectionHeading
        eyebrow={scenes[2].tag}
        title="Things I've"
        accent="designed and shipped"
        subtitle="Backend infrastructure, AI tooling and full-stack apps; the work I'd point at first. The keys play."
      />

      <div className="mt-6 grid gap-x-14 gap-y-12 lg:mt-10 lg:grid-cols-[1.15fr_1fr] lg:pb-32">
        {projects.map((item, i) => (
          <motion.div
            key={item.id}
            {...rise(3 + i, 30)}
            className={cn(
              "w-full max-w-[38rem]",
              // below lg one column, alternating sides; from lg the even ones hang lower than their neighbour
              i % 2 ? "justify-self-end lg:justify-self-stretch" : "justify-self-start",
              "lg:max-w-none lg:even:mt-36 lg:even:-mb-36"
            )}
          >
            <ProjectPiano project={item} />
          </motion.div>
        ))}
      </div>
    </Scene>
  );
};

export default RecentProjects;
