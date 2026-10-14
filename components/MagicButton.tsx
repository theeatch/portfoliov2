import React from "react";

/**
 *  UI: border magic from tailwind css btns
 *  Link: https://ui.aceternity.com/components/tailwindcss-buttons
 *
 *  Restyled: a silver border sweeps round a solid black (or white) face.
 */
const MagicButton = ({
  title,
  icon,
  position,
  handleClick,
  otherClasses,
}: {
  title: string;
  icon: React.ReactNode;
  position: string;
  handleClick?: () => void;
  otherClasses?: string;
}) => {
  return (
    <button
      className="group relative inline-flex h-12 w-full overflow-hidden rounded-xl p-[1px] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 md:w-60"
      onClick={handleClick}
    >
      {/* a spinner just big enough to sweep the corners (was a 22x oversized layer) */}
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="h-[480px] w-[480px] shrink-0 animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,rgb(var(--c-brand-soft))_0%,rgb(var(--c-accent-deep))_35%,rgb(var(--c-accent))_60%,rgb(var(--c-brand))_100%)]" />
      </span>

      <span
        className={`relative inline-flex h-full w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-surface-700/95 px-7 text-sm font-medium text-ink transition-colors duration-300 group-hover:bg-surface-600/95 ${otherClasses}`}
      >
        {position === "left" && icon}
        {title}
        {position === "right" && icon}
      </span>
    </button>
  );
};

export default MagicButton;
