"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  accentFrom = 4,
}: {
  words: string;
  className?: string;
  /** index of the first word that takes the nebula gradient */
  accentFrom?: number;
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
      },
      {
        duration: 1.6,
        delay: stagger(0.18),
      }
    );
  }, [scope.current]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          const accent = idx >= accentFrom;
          return (
            <motion.span
              key={word + idx}
              className={cn(
                "inline-block opacity-0 [filter:blur(6px)]",
                accent
                  ? "bg-gradient-to-br from-nebula-ice via-nebula-cyan to-nebula-violet bg-clip-text text-transparent"
                  : "heading-cosmic"
              )}
              style={{ transform: "translateY(8px)" }}
            >
              {word}&nbsp;
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="my-4">
        <div className="leading-[1.15] tracking-tight">{renderWords()}</div>
      </div>
    </div>
  );
};
