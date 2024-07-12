"use client";
import Vinyl from "@/components/vinyl";
import React from "react";
import { motion } from "framer-motion";
import NavbarBlack from "@/components/navbar-black";
import Link from "next/link";

type Props = {};

const MainSection = (props: Props) => {
  const ref = React.useRef(null);
  const variants = {
    fromTopLeft: {
      initial: { x: -200, y: -200, opacity: 0, rotateX: 0, rotateY: 0 },
      animate: { x: 0, y: 0, opacity: 1, rotateX: 10, rotateY: 10 }
    },
    fromBottomLeft: {
      initial: { x: -200, y: 200, opacity: 0, rotateX: 0, rotateY: 0 },
      animate: { x: 0, y: 0, opacity: 1, rotateX: 10, rotateY: 20 }
    },
    fromTopRight: {
      initial: { x: 200, y: -200, opacity: 0, rotateX: 0, rotateY: 0 },
      animate: { x: 0, y: 0, opacity: 1, rotateX: -20, rotateY: 10 }
    },
    fromBottomRight: {
      initial: { x: 200, y: 200, opacity: 0, rotateX: 0, rotateY: 0 },
      animate: { x: 0, y: 0, opacity: 1, rotateX: -10, rotateY: 10 }
    }
  };

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleClick2 = () => {
    const targetElement = document.getElementById("contact");
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start"
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="h-full w-full flex relative"
      ref={ref}
    >
      <NavbarBlack />
      <motion.div
        variants={variants.fromTopLeft}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="w-80 shadow-md shadow-white hover:cursor-pointer p-8 h-28 rounded-xl text-5xl border-b-2 hover:bg-slate-700 duration-500 border-slate-700 text-white font-semibold text-center absolute top-40 left-52 transform-gpu"
      >
        <button onClick={handleClick}>Home</button>
      </motion.div>
      <motion.div
        variants={variants.fromBottomLeft}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="w-80 shadow-md shadow-white hover:cursor-pointer p-8 h-28 rounded-xl text-5xl border-b-2 hover:bg-slate-700 duration-500 border-slate-700 text-white font-semibold text-center absolute top-[45rem] left-52 transform-gpu"
      >
        <Link href="/about">About Me</Link>
      </motion.div>
      <Vinyl />
      <motion.div
        variants={variants.fromTopRight}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="w-80 shadow-md shadow-white hover:cursor-pointer p-8 h-28 rounded-xl text-5xl border-b-2 hover:bg-slate-700 duration-500 border-slate-700 text-white font-semibold text-center absolute top-40 right-56 transform-gpu"
      >
        <Link href="portfolio">My Work</Link>
      </motion.div>
      <motion.div
        variants={variants.fromBottomRight}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="w-80 shadow-md shadow-white hover:cursor-pointer p-8 h-28 rounded-xl text-5xl border-b-2 hover:bg-slate-700 duration-500 border-slate-700 text-white font-semibold text-center absolute top-[45rem] right-56 transform-gpu"
      >
        <button onClick={handleClick2}>Contact Me</button>
      </motion.div>
    </motion.div>
  );
};

export default MainSection;

export const previewCard = () =>{
  return (
    <div className="w-80 shadow-md shadow-white hover:cursor-pointer p-8 h-28 rounded-xl text-5xl border-b-2 hover:bg-slate-700 duration-500 border-slate-700 text-white font-semibold text-center absolute top-40 right-56 transform-gpu">
      <Link href="portfolio">My Work</Link>
    </div>
  )
}
