"use client";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import Image from "next/image";
import React, { useEffect } from "react";

export default function HeroSection() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
    };
}, []);
  const words = [
    {
      text: "Musician",
      className: "text-blue-800 font-bold",
    },
    {
      text: "and",
    },
    {
      text: "an",
    },
    {
      text: "Artist!",
      className: "text-blue-800 font-bold",
    },
  ];
  const handleClick = () => {
    const targetElement = document.getElementById('main');
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };
  const handleClick2 = () => {
    const targetElement = document.getElementById('contact');
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };
  return (
    <main className="flex flex-col w-full h-full items-center mt-10 overflow-x-hidden ">
      
      <Image 
      src="/images/musicbg.png"
      alt="bg music"
      className="object-contain h-[44rem] absolute opacity-15 -left-20 rotate-90 "
      width={800}
      height={800} />
       <Image 
      src="/images/musicbg.png"
      alt="bg music"
      className="object-contain h-[44rem] absolute opacity-15 -right-0 rotate-270"
      width={800}
      height={800} />
      <div className="flex flex-col items-center">
        <h1 className="text-6xl font-semibold ">Software Engineer,</h1>
        <div>
          <TypewriterEffectSmooth words={words} />
        </div>
      </div>
      <div>
        {" "}
        <Image
          src="/images/dhpic.jpeg"
          alt=""
          className="object-contain rounded-full border-8  border-gray-700  lg:w-full"
          width={350}
          height={500}
        />
      </div>
      <div className="p-2 flex flex-col items-center">
        <div className="text-2xl max-w-[64rem] text-center font-semibold">
          Frontend developer exploring the world of backend development and
          Machine Learning. Musician at heart, creating unique piano covers in
          my free time.
        </div>
        <div className="w-full flex justify-center p-6 gap-4 ">
            <button className="p-4 font-semibold bg-slate-500 rounded-xl text-white hover:bg-slate-800 duration-200" onClick={handleClick}>
              View My Work
            </button>
            <button className="p-4 font-semibold bg-slate-500 rounded-xl text-white hover:bg-slate-800 duration-200" onClick={handleClick2}>
              Contact Me
            </button>
          </div>
      </div>
    </main>
  );
}
