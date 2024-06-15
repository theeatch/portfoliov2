"use client";
import React from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { motion } from "framer-motion";

type Props = {}

const portfolio = (props: Props) => {
  const products = [
    
    {
      title: "My Sheets",
      link: "/",
      thumbnail:
        "https://images.pexels.com/photos/7520832/pexels-photo-7520832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "A soon to be published websites for all the sheet music I've created",
    },
    {
      title: "Upease",
      link: "www.upease.biz",
      thumbnail:
        "/images/upeasebiz.jpeg",
        description: 'Website developed for the startup UpEase, combining Copilot AI with institute management system!',
    },
    {
      title: "LifekShell",
      link: "https://www.lifeshell.co.in/",
      thumbnail:
        "/images/lifeshell.jpeg",
      description: "Website developed for the startup LifeShell, a medical firm"
    },
    {
      title: "Diamond Estate",
      link: "https://diamond-estate.vercel.app/",
      thumbnail:
        "/images/diamondestate.jpeg",
        description: 'A college project for a real estate website for residents in manipal'
    },
  ];
  return <motion.div className="h-full"
  initial={{ y: "-200vh" }}
  animate={{ y: "0%" }}
  transition={{ duration: 0.8 }}>
  
  <HeroParallax products={products} />;</motion.div>
}

export default portfolio;