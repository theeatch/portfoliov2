"use client";
import React from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { profile } from "console";

type Props = {}

const portfolio = (props: Props) => {
  const products = [
    
    {
      title: "My Sheets",
      link: "/",
      thumbnail:
        "https://images.pexels.com/photos/7520832/pexels-photo-7520832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Upease",
      link: "www.upease.biz",
      thumbnail:
        "/images/upeasebiz.jpeg",
    },
    {
      title: "LifekShell",
      link: "https://www.lifeshell.co.in/",
      thumbnail:
        "/images/lifeshell.jpeg",
    },
    {
      title: "Diamond Estate",
      link: "https://diamond-estate.vercel.app/",
      thumbnail:
        "/images/diamondestate.jpeg",
    },
  ];
  return <HeroParallax products={products} />;
}

export default portfolio;