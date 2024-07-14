"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SocialIcon } from "react-social-icons";
type Props = {};

const Footer = (props: Props) => {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleClick2 = () => {
    const targetElement = document.getElementById("main");
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    }
  };
  return (
    <footer className="bg-gradient-to-b from-transparent to-slate-100 rounded-t-2xl shadow  bottom-0 sticky w-full">
      <div className="w-full mx-auto py-6 px-24">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <Image
              src="/images/logopic.png"
              alt="logo"
              width={50}
              height={50}
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              DH Portfolio
            </span>
          </div>
          <div className="hidden md:flex items-center my-auto gap-4">
          <SocialIcon
            className="w-14 hover:-translate-y-2 duration-200"
            network="github"
            url="https://github.com/theeatch"
          ></SocialIcon>
          <SocialIcon
            className="w-14 hover:-translate-y-2 duration-200"
            network="instagram"
            url="https://instagram.com/dhxdxd"
          ></SocialIcon>
          <SocialIcon
            className="w-14 hover:-translate-y-2 duration-200"
            network="linkedin"
            url="https://www.linkedin.com/in/dhruv-negi-387a3a233/"
          ></SocialIcon>
          <SocialIcon
            className="w-14 hover:-translate-y-2 duration-200"
            network="youtube"
            url="https://youtube.com/DHsPianoLand"
          ></SocialIcon>
        </div>
          <ul className="flex flex-wrap gap-6 items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <button
                onClick={handleClick}
                className="hover:underline hover:text-black me-4 md:me-6 text-3xl"
              >
                About
              </button>{" "}
            </li>
            <li>
              <button
                onClick={handleClick2}
                className="hover:underline hover:text-black me-4 md:me-6 text-3xl"
              >
                Explore
              </button>
            </li>
          </ul>
        </div>
        
        <hr className="my-6 border-gray-200 sm:mx-auto   lg:my-8" />
      </div>
      
    </footer>
  );
};

export default Footer;
