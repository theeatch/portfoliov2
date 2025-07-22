import { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";

// Also install this npm i --save-dev @types/react-lottie
import Lottie from "react-lottie";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaJs, FaPython, FaNodeJs } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import {
  FaAngular,
  FaPhp,
  FaReact,
  FaJava,
  FaDatabase,
  FaHtml5,
  FaCss3Alt,
} from "react-icons/fa";
import {
  SiExpress,
  SiNextdotjs,
  SiTailwindcss,
  SiMongodb,
} from "react-icons/si";

import { BackgroundGradientAnimation } from "./GradientBg";
import GridGlobe from "./GridGlobe";
import animationData from "@/data/confetti.json";
import MagicButton from "../MagicButton";
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
        // change gap-4 to gap-8, change grid-cols-3 to grid-cols-5, remove md:auto-rows-[18rem], add responsive code
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto",
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
  //   remove unecessary things here
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
  const leftLists = ["ReactJS", "Javascript", "Typescript"];
  const rightLists = ["Python", "NodeJS", "FastAPI"];

  const [copied, setCopied] = useState(false);

  const defaultOptions = {
    loop: copied,
    autoplay: copied,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleCopy = () => {
    const text = "dhruvnegiclub03@gmail.com";
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  const myItems = [
    {
      title: <FaAngular />,
      className: "absolute top-10 left-[20%] rotate-[-5deg]",
    },
    {
      title: <FaPhp />,
      className: "absolute top-40 left-[25%] rotate-[-7deg]",
    },
    {
      title: <SiExpress />,
      className: "absolute top-5 left-[40%] rotate-[8deg]",
    },
    {
      title: <FaJava />,
      className: "absolute top-32 left-[55%] rotate-[10deg]",
    },
    {
      title: <FaReact />,
      className: "absolute top-20 right-[35%] rotate-[2deg]",
    },
    {
      title: <SiNextdotjs />,
      className: "absolute top-24 left-[45%] rotate-[-7deg]",
    },
    {
      title: <SiTailwindcss />,
      className: "absolute top-8 left-[30%] rotate-[4deg]",
    },
    {
      title: <SiMongodb />,
      className: "absolute top-15 left-[15%] rotate-[5deg]",
    },
    {
      title: <FaDatabase />,
      className: "absolute top-30 right-[20%] rotate-[-3deg]",
    },
    {
      title: <FaHtml5 />,
      className: "absolute top-0 left-[60%] rotate-[12deg]",
    },
    {
      title: <FaCss3Alt />,
      className: "absolute top-50 left-[10%] rotate-[-10deg]",
    },
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
        "row-span-1 relative overflow-hidden rounded-3xl border border-white/[0.1] group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4",
        className
      )}
      style={{
        background: "rgb(4,7,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      <div className={`${id === 6 && "flex justify-center"} h-full`}>
        <div className="w-full h-full absolute">
          {img && (
            <img
              src={img}
              alt={img}
              className={cn(imgClassName, "object-cover object-center ")}
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
              alt={spareImg}
              className="object-cover object-center w-full h-full"
            />
          )}
        </div>
        {id === 6 && (
          <BackgroundGradientAnimation>
            <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl"></div>
          </BackgroundGradientAnimation>
        )}

        <div
          className={cn(
            titleClassName,
            "group group-hover/bento:translate-x-2 transition ease-in-out duration-500 relative md:h-full min-h-40 flex flex-col px-5   hover:cursor-pointer",
            id === 3 ? "p-0" : "p-5 lg:p-10"
          )}
        >
          {id === 3 && (
            <DraggableCardContainer className="relative flex h-full w-full items-center justify-center overflow-clip">
              <p
                className="absolute top-1/2 mx-auto max-w-md -translate-y-3/4 text-center text-2xl font-black md:text-4xl
                bg-gradient-to-r from-neutral-800 via-white to-neutral-800 bg-clip-text text-transparent
               dark:from-neutral-800 dark:via-white dark:to-neutral-800 dark:bg-clip-text dark:text-transparent"
              >
                My Evergrowing Tech Stack
              </p>
              <div className="flex justify-around w-full mt-20 md:mt-40">
                {" "}
                <motion.div
                  className="text-white text-2xl md:text:3xl lg:text-4xl"
                  variants={iconVariants}
                  initial="initial"
                  animate="animate"
                  custom={0} // Custom prop for staggering
                >
                  <FaJs />
                </motion.div>
                <motion.div
                  className="text-white text-2xl md:text:3xl lg:text-4xl"
                  variants={iconVariants}
                  initial="initial"
                  animate="animate"
                  custom={1} // Custom prop for staggering
                >
                  <SiTypescript />
                </motion.div>
                <motion.div
                  className="text-white text-2xl md:text:3xl lg:text-4xl"
                  variants={iconVariants}
                  initial="initial"
                  animate="animate"
                  custom={2} // Custom prop for staggering
                >
                  <FaNodeJs />
                </motion.div>
                <motion.div
                  className="text-white text-2xl md:text:3xl lg:text-4xl"
                  variants={iconVariants}
                  initial="initial"
                  animate="animate"
                  custom={3} // Custom prop for staggering
                >
                  <FaPython />
                </motion.div>
              </div>
              {myItems.map((item, idx) => (
                <DraggableCardBody key={idx} className={item.className}>
                  <h3 className=" text-center text-4xl font-bold text-neutral-700 dark:text-neutral-300">
                    {item.title}
                  </h3>
                </DraggableCardBody>
              ))}
            </DraggableCardContainer>
          )}
          {id !== 3 && (
            <>
              <div className="font-sans italic font-extralight md:max-w-32 md:text-xs lg:text-base text-sm text-[#C1C2D3] z-10">
                {description}
              </div>
              <div
                className={`font-sans text-lg lg:text-3xl max-w-96 font-bold z-10`}
              >
                {title}
              </div>
            </>
          )}
          {id === 4 && (
            <motion.a
              href="https://www.youtube.com/@DHsPianoLand"
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              transition={{ duruation: 1 }}
              className="absolute group-hover:flex animate-pulse mt-[4.5rem] hidden z-50"
            >
              <Image
                src="/ytpic.svg"
                alt="yt"
                width={50}
                height={50}
                className="z-50"
              />
            </motion.a>
          )}

          {/* for the github 3d globe */}
          {id === 2 && <GridGlobe />}

          {id === 6 && (
            <div className="mt-5 relative">
              <div
                className={`absolute -bottom-5 right-0 ${
                  copied ? "block" : "block"
                }`}
              >
                <Lottie options={defaultOptions} height={200} width={400} />
              </div>

              <MagicButton
                title={copied ? "Email is Copied!" : "Copy my email address"}
                icon={<IoCopyOutline />}
                position="left"
                handleClick={handleCopy}
                otherClasses="!bg-[#161A31]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
