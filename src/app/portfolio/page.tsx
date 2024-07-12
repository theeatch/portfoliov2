"use client";
import React from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { motion } from "framer-motion";
import { LinkPreview } from "@/components/ui/link-preview";


type Props = {};

const portfolio = (props: Props) => {
  const products = [
    {
      title: "LifekShell",
      link: "https://www.lifeshell.co.in/",
      thumbnail: "/images/lifeshell.jpeg",
      description:
        "Website developed for the startup LifeShell, a medical firm",
    },
    {
      title: "Upease",
      link: "www.upease.biz",
      thumbnail: "/images/upeasebiz.jpeg",
      description:
        "Website developed for the startup UpEase, combining Copilot AI with institute management system!",
    },
    {
      title: "Net Guardian",
      link: "https://github.com/theeatch/NET-GUARDIAN",
      thumbnail: "/images/netguardian.jpeg",
      description:
        "A college project for a network security system, classifying packets into normal and malicious",
    },
    {
      title: "Chatty",
      link: "https://chatty-theeatchs-projects.vercel.app/conversations/",
      thumbnail: "/images/chattysc.jpeg",
      description:
        "Chat Web Application with the functionality to chat with friends and make groups!",
    },
    {
      title: "Diamond Estate",
      link: "https://diamond-estate.vercel.app/",
      thumbnail: "/images/diamondestate.jpeg",
      description:
        "A college project for a real estate website for residents in manipal",
    },

    {
      title: "Net Guardian",
      link: "https://github.com/theeatch/NET-GUARDIAN",
      thumbnail: "/images/netguardian.jpeg",
      description:
        "A college project for a network security system, classifying packets into normal and malicious",
    },
  ];
  return (
    <motion.div
      className="h-full"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 0.8 }}
    >
      <HeroParallax products={products} />;

      <h1 className="absolute bottom-52 text-6xl font-semibold ">Learn about the Tech I&apos;ve Used!</h1>
      <motion.div
      initial={{x:"-500px"}}
      whileInView={{x:"-100px"}}
      transition={{duration:1, type: "spring", stiffness: 120, ease: "easeInOut"}}
      className="w-full h-36 absolute bottom-10 bg-black text-white flex justify-around items-center ">
        <LinkPreview url="https://nextjs.org/docs" className="text-white underline z-20 text-xl md:text-3xl max-w-3xl mx-auto mb-10">NextJS</LinkPreview>
        <LinkPreview url="https://legacy.reactjs.org/docs/getting-started.html" className="text-white underline z-20 text-xl md:text-3xl max-w-3xl mx-auto mb-10">ReactJS</LinkPreview>
        <LinkPreview url="https://www.gatsbyjs.com/docs/" className="text-white underline z-20 text-xl md:text-3xl max-w-3xl mx-auto mb-10">GatsbyJS</LinkPreview>
        <LinkPreview url="https://tailwindcss.com" className="text-white underline z-20 text-xl md:text-3xl max-w-3xl mx-auto mb-10">TailwindCSS</LinkPreview>
        <LinkPreview url="https://framer.com/motion" className="text-white underline z-20 text-xl md:text-3xl max-w-3xl mx-auto mb-10">FramerMotion</LinkPreview>
      </motion.div>
    </motion.div>
  );
};

export default portfolio;
