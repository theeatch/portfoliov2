"use client";
import React from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { motion } from "framer-motion";

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
      title: "UpEase",
      link: "https://www.upease.biz/",
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
  ];
  return (
    <motion.div
      className="h-full"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 0.8 }}
    >
      <HeroParallax products={products} />
    </motion.div>
  );
};

export default portfolio;
