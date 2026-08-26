"use client";

import { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { LuRotateCcw } from "react-icons/lu";
import { FaYoutube } from "react-icons/fa6";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaAws } from "react-icons/fa";
import {
  SiAngular,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPython,
  SiRedis,
  SiSocketdotio,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

import { BackgroundGradientAnimation } from "./GradientBg";
import GridGlobe from "./GridGlobe";
import MagicButton from "../MagicButton";
import { contactEmail } from "@/data";
import ParticleBurst from "./ParticleBurst";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 md:grid-cols-6 md:grid-row-7 lg:grid-cols-5 lg:gap-8 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  id,
  title,
  description,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  className?: string;
  id: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {
  const [copied, setCopied] = useState(false);
  // bumping this re-fires the burst, so repeat copies still celebrate
  const [burst, setBurst] = useState(0);
  // bumping this springs every dragged tech card back to where it loaded
  const [stackReset, setStackReset] = useState(0);
  const [stackMoved, setStackMoved] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopied(true);
    setBurst((n) => n + 1);
  };

  // the wider stack, draggable. Kept to a middle band so the caption above and
  // the floating language icons below stay readable.
  const myItems = [
    { title: <SiNodedotjs />, className: "absolute top-14 left-[16%] rotate-[-5deg]" },
    { title: <SiExpress />, className: "absolute top-28 left-[26%] rotate-[-7deg]" },
    { title: <SiMysql />, className: "absolute top-12 left-[38%] rotate-[8deg]" },
    { title: <SiRedis />, className: "absolute top-24 left-[52%] rotate-[10deg]" },
    { title: <SiSocketdotio />, className: "absolute top-20 right-[30%] rotate-[2deg]" },
    { title: <SiNextdotjs />, className: "absolute top-32 left-[44%] rotate-[-7deg]" },
    { title: <SiTailwindcss />, className: "absolute top-20 left-[30%] rotate-[4deg]" },
    { title: <SiFastapi />, className: "absolute top-28 left-[14%] rotate-[5deg]" },
    { title: <FaAws />, className: "absolute top-14 right-[16%] rotate-[-3deg]" },
    { title: <SiDocker />, className: "absolute top-16 left-[62%] rotate-[12deg]" },
    { title: <SiAngular />, className: "absolute top-24 left-[8%] rotate-[-10deg]" },
    { title: <SiPhp />, className: "absolute top-24 right-[22%] rotate-[6deg]" },
  ];

  const iconVariants = {
    initial: { y: 0 },
    animate: (i: number) => ({
      y: [0, -10, 0],
      transition: {
        delay: i * 0.3,
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
        repeatDelay: 2,
      },
    }),
  };

  return (
    <div
      className={cn(
        "group/bento glow-ring relative row-span-1 flex flex-col justify-between overflow-hidden rounded-3xl border border-white/[0.08] transition duration-300",
        className
      )}
      style={{
        background:
          "linear-gradient(158deg, rgba(19,26,51,0.72) 0%, rgba(8,12,27,0.9) 55%, rgba(4,6,14,0.95) 100%)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* card-level nebula bloom, brightens on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-40 blur-3xl transition-opacity duration-500 group-hover/bento:opacity-80"
        style={{
          background:
            id % 2 === 0
              ? "radial-gradient(circle, rgba(167,139,250,0.35) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(56,189,248,0.32) 0%, transparent 70%)",
        }}
      />

      {/* top hairline catching the light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[1px] opacity-60"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(148,190,255,0.5), transparent)",
        }}
      />

      {/* the globe fills its card, so its copy needs something to sit on */}
      {id === 2 && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-[62%]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(4,6,14,0.92) 0%, rgba(4,6,14,0.6) 55%, transparent 100%)",
          }}
        />
      )}

      {/* Card 4 is a link to the piano channel: the whole surface turns into a
          YouTube target on hover, so there's no small hit-box to hunt for. */}
      {id === 4 && (
        <a
          href="https://www.youtube.com/@DHsPianoLand"
          target="_blank"
          rel="noreferrer"
          aria-label="Watch me play piano on YouTube — DH's Piano Land"
          className="group/yt absolute inset-0 z-40 cursor-pointer"
        >
          {/* red wash rising as the card converts */}
          <span
            aria-hidden
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/bento:opacity-100"
            style={{
              background:
                "radial-gradient(ellipse at 50% 60%, rgba(255,0,51,0.22) 0%, rgba(255,0,51,0.06) 42%, transparent 70%)",
            }}
          />

          <span className="absolute inset-0 flex scale-90 flex-col items-center justify-center gap-3 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/bento:scale-100 group-hover/bento:opacity-100">
            <FaYoutube className="h-14 w-14 text-[#FF0033] drop-shadow-[0_0_26px_rgba(255,0,51,0.6)] transition-transform duration-500 group-hover/bento:animate-pulse md:h-16 md:w-16" />
            <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-starlight/85">
              DH&apos;s Piano Land
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-nebula-cyan/70">
              Click to listen →
            </span>
          </span>
        </a>
      )}

      <div className={`${id === 6 && "flex justify-center"} h-full`}>
        <div className="mask-fade-bottom absolute h-full w-full">
          {img && (
            <img
              src={img}
              alt=""
              className={cn(
                imgClassName,
                "duotone-nebula object-cover object-center opacity-55 transition-opacity duration-500 group-hover/bento:opacity-75"
              )}
            />
          )}
        </div>
        <div
          className={`absolute right-0 -bottom-5 ${
            id === 5 && "w-full opacity-80"
          } `}
        >
          {spareImg && (
            <img
              src={spareImg}
              alt=""
              className="duotone-nebula h-full w-full object-cover object-center opacity-50"
            />
          )}
        </div>
        {id === 6 && (
          <BackgroundGradientAnimation
            gradientBackgroundStart="rgb(8, 12, 27)"
            gradientBackgroundEnd="rgb(3, 5, 13)"
            firstColor="56, 189, 248"
            secondColor="167, 139, 250"
            thirdColor="34, 211, 238"
            fourthColor="99, 102, 241"
            fifthColor="125, 211, 252"
            pointerColor="56, 189, 248"
          >
            <div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center px-4 text-center text-3xl font-bold text-white md:text-4xl lg:text-7xl"></div>
          </BackgroundGradientAnimation>
        )}

        <div
          className={cn(
            titleClassName,
            "group relative flex min-h-40 flex-col px-5 transition duration-500 ease-in-out group-hover/bento:translate-x-2 hover:cursor-pointer md:h-full",
            id === 3 ? "p-0" : "p-5 lg:p-10"
          )}
        >
          {id === 3 && (
            <DraggableCardContainer className="relative h-full w-full overflow-clip">
              {/* Fixed layer: caption pinned to the top, the four core languages
                  floating along the bottom. Both sit outside the drag band so
                  neither can be buried by the pile. */}
              <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between py-4">
                <p className="mx-auto rounded-full bg-space-900/70 px-4 py-1 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-nebula-cyan/80 backdrop-blur-sm">
                  My evergrowing tech stack
                </p>

                <div className="flex w-full justify-around px-5 drop-shadow-[0_2px_10px_rgba(2,4,11,0.9)]">
                  {[SiTypescript, SiNodedotjs, SiMysql, SiPython].map(
                    (Icon, i) => (
                      <motion.div
                        key={i}
                        className="text-2xl text-nebula-ice/90 drop-shadow-[0_0_12px_rgba(56,189,248,0.5)] md:text-3xl lg:text-4xl"
                        variants={iconVariants}
                        initial="initial"
                        animate="animate"
                        custom={i}
                      >
                        <Icon />
                      </motion.div>
                    )
                  )}
                </div>
              </div>

              {/* Drag layer */}
              {myItems.map((item, idx) => (
                <DraggableCardBody
                  key={idx}
                  className={item.className}
                  resetKey={stackReset}
                  onDragged={() => setStackMoved(true)}
                >
                  <h3 className="text-center text-2xl font-bold text-nebula-ice/80">
                    {item.title}
                  </h3>
                </DraggableCardBody>
              ))}

              {/* Appears once something has actually been thrown around */}
              <button
                type="button"
                onClick={() => {
                  setStackReset((n) => n + 1);
                  setStackMoved(false);
                }}
                aria-label="Reset the tech cards to their starting positions"
                title="Reset cards"
                className={cn(
                  "absolute right-3 top-3 z-30 flex h-8 w-8 items-center justify-center rounded-full border border-nebula-cyan/25 bg-space-900/80 text-nebula-cyan/80 backdrop-blur-sm transition-all duration-300 hover:border-nebula-cyan/60 hover:text-nebula-ice hover:shadow-glow active:scale-90",
                  stackMoved
                    ? "pointer-events-auto opacity-100"
                    : "pointer-events-none opacity-0"
                )}
              >
                <LuRotateCcw className="h-3.5 w-3.5" />
              </button>
            </DraggableCardContainer>
          )}
          {id !== 3 && (
            <div
              className={cn(
                "contents",
                // card 4 hands its space over to the YouTube reveal on hover
                id === 4 &&
                  "[&>*]:transition-all [&>*]:duration-500 group-hover/bento:[&>*]:-translate-y-2 group-hover/bento:[&>*]:opacity-0"
              )}
            >
              <div className="z-10 font-sans text-sm font-light italic text-nebula-cyan/70 md:max-w-32 md:text-xs lg:text-base">
                {description}
              </div>
              <div className="z-10 max-w-96 font-sans text-lg font-bold text-starlight lg:text-3xl">
                {title}
              </div>
            </div>
          )}

          {/* the 3d globe */}
          {id === 2 && <GridGlobe />}

          {id === 6 && (
            <div className="relative mt-5">
              <ParticleBurst
                trigger={burst}
                className="absolute -bottom-8 left-1/2 h-56 w-[22rem] -translate-x-1/2"
              />

              <MagicButton
                title={copied ? "Email is Copied!" : "Copy my email address"}
                icon={<IoCopyOutline />}
                position="left"
                handleClick={handleCopy}
                otherClasses="!bg-space-600/90"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
