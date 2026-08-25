import React from "react";

/**
 *  UI: border magic from tailwind css btns
 *  Link: https://ui.aceternity.com/components/tailwindcss-buttons
 *
 *  Restyled: the spinning border is a cyan→violet nebula sweep, and the face
 *  is a translucent space panel rather than opaque slate.
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
      className="group relative inline-flex h-12 w-full overflow-hidden rounded-xl p-[1px] focus:outline-none focus-visible:ring-2 focus-visible:ring-nebula-cyan/60 md:mt-10 md:w-60"
      onClick={handleClick}
    >
      <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#7DD3FC_0%,#6366F1_35%,#A78BFA_60%,#22D3EE_100%)]" />

      <span
        className={`inline-flex h-full w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-space-700/95 px-7 text-sm font-medium text-starlight backdrop-blur-3xl transition-colors duration-300 group-hover:bg-space-600/95 ${otherClasses}`}
      >
        {position === "left" && icon}
        {title}
        {position === "right" && icon}
      </span>
    </button>
  );
};

export default MagicButton;
