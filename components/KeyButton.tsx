import React from "react";

import { cn } from "@/lib/utils";

/**
 * The site's one button: a piano key. A square-cornered face with a thick lower
 * edge, which sinks when pressed. `ivory` is a natural (the primary action),
 * `ebony` a sharp (the quieter one). It renders an <a> when it has an `href`, so
 * a link is never a button wrapped in an anchor.
 */
const KeyButton = ({
  title,
  icon,
  position = "right",
  tone = "ivory",
  href,
  handleClick,
  className,
}: {
  title: string;
  icon?: React.ReactNode;
  position?: "left" | "right";
  tone?: "ivory" | "ebony";
  href?: string;
  handleClick?: () => void;
  className?: string;
}) => {
  const classes = cn(
    "group inline-flex h-12 w-full shrink-0 items-center whitespace-nowrap justify-center gap-2.5 border border-b-[4px] px-3 font-display text-[11.5px] tracking-[0.1em] sm:px-7 sm:text-[13px]",
    "transition-[transform,background-color,border-width] duration-150 active:translate-y-[3px] active:border-b",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink md:w-auto md:min-w-60",
    tone === "ivory"
      ? "border-ink bg-[rgb(var(--key-white))] text-[rgb(var(--key-black))] hover:bg-[rgb(var(--key-white-hover))]"
      : "border-ink/50 bg-[rgb(var(--key-black))] text-[rgb(var(--key-white))] hover:bg-[rgb(var(--key-black-down))]",
    className
  );

  const inner = (
    <>
      {position === "left" && icon}
      {title}
      {position === "right" && icon}
    </>
  );

  if (href) {
    const external = /^https?:/.test(href);
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {inner}
      </a>
    );
  }

  return (
    <button type="button" className={classes} onClick={handleClick}>
      {inner}
    </button>
  );
};

export default KeyButton;
