import { TECH, type TechKey } from "./TechIcon";

/**
 * Stand-in artwork for a project that has no screenshot yet: its lead technology
 * glyph over a faint ring pattern. Reads as designed rather than as a broken image.
 * Always drawn on a dark "viewscreen", so it looks the same in both themes.
 */
const ProjectGlyph = ({ tech }: { tech?: TechKey }) => {
  const Icon = tech ? TECH[tech]?.Icon : undefined;

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div className="absolute h-[130%] w-[130%] rounded-full border border-[#38BDF8]/[0.1]" />
      <div className="absolute h-[95%] w-[95%] rounded-full border border-[#38BDF8]/[0.14]" />
      <div className="absolute h-[62%] w-[62%] rounded-full border border-[#A78BFA]/[0.16]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 55%, rgba(56,189,248,0.18) 0%, transparent 62%)",
        }}
      />
      {Icon && (
        <Icon className="relative h-16 w-16 text-[#7DD3FC]/70 drop-shadow-[0_0_24px_rgba(56,189,248,0.45)] lg:h-20 lg:w-20" />
      )}
    </div>
  );
};

export default ProjectGlyph;
