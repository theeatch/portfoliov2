"use client";

import { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";

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

  const handleCopy = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopied(true);
    setBurst((n) => n + 1);
  };

  // the wider stack, draggable
  const myItems = [
    { title: <SiNodedotjs />, className: "absolute top-10 left-[18%] rotate-[-5deg]" },
    { title: <SiExpress />, className: "absolute top-24 left-[24%] rotate-[-7deg]" },
    { title: <SiMysql />, className: "absolute top-6 left-[38%] rotate-[8deg]" },
    { title: <SiRedis />, className: "absolute top-16 left-[52%] rotate-[10deg]" },
    { title: <SiSocketdotio />, className: "absolute top-20 right-[32%] rotate-[2deg]" },
    { title: <SiNextdotjs />, className: "absolute top-24 left-[44%] rotate-[-7deg]" },
    { title: <SiTailwindcss />, className: "absolute top-8 left-[30%] rotate-[4deg]" },
    { title: <SiFastapi />, className: "absolute top-16 left-[14%] rotate-[5deg]" },
    { title: <FaAws />, className: "absolute top-20 right-[18%] rotate-[-3deg]" },
    { title: <SiDocker />, className: "absolute top-4 left-[58%] rotate-[12deg]" },
    { title: <SiAngular />, className: "absolute top-32 left-[10%] rotate-[-10deg]" },
    { title: <SiPhp />, className: "absolute top-28 right-[26%] rotate-[6deg]" },
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
            <DraggableCardContainer className="relative flex h-full w-full items-center justify-center overflow-clip">
              <p className="pointer-events-none absolute inset-x-0 bottom-5 z-20 px-6 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-nebula-cyan/70 md:text-xs">
                My evergrowing tech stack
              </p>
              <div className="mt-20 flex w-full justify-around md:mt-40">
                {[SiTypescript, SiNodedotjs, SiMysql, SiPython].map((Icon, i) => (
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
                ))}
              </div>
              {myItems.map((item, idx) => (
                <DraggableCardBody key={idx} className={item.className}>
                  <h3 className="text-center text-4xl font-bold text-nebula-ice/80">
                    {item.title}
                  </h3>
                </DraggableCardBody>
              ))}
            </DraggableCardContainer>
          )}
          {id !== 3 && (
            <>
              <div className="z-10 font-sans text-sm font-light italic text-nebula-cyan/70 md:max-w-32 md:text-xs lg:text-base">
                {description}
              </div>
              <div className="z-10 max-w-96 font-sans text-lg font-bold text-starlight lg:text-3xl">
                {title}
              </div>
            </>
          )}
          {id === 4 && (
            <motion.a
              href="https://www.youtube.com/@DHsPianoLand"
              target="_blank"
              rel="noreferrer"
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              transition={{ duration: 1 }}
              className="absolute z-50 mt-[4.5rem] hidden animate-pulse group-hover:flex"
            >
              <Image
                src="/ytpic.svg"
                alt="YouTube channel"
                width={50}
                height={50}
                className="z-50"
              />
            </motion.a>
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
