"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, {useState} from 'react';
import { SocialIcon } from 'react-social-icons';
import {motion} from 'framer-motion';
import { usePathname } from "next/navigation";

const Navbar = () => {
    const pathName = usePathname();
    const links = [
        { url: "/", title: "Home" },
        { url: "/about", title: "About" },
        { url: "/portfolio", title: "Portfolio" },
        { url: "/contact", title: "Contact" },
      ];
      const [open, setOpen] = useState(false);

  const topVariants = {
    closed: {
      rotate: 0,
    },
    opened: {
      rotate: 45,
      backgroundColor: "rgb(255,255,255)",
    },
  };
  const centerVariants = {
    closed: {
      opacity: 1,
    },
    opened: {
      opacity: 0,
    },
  };

  const bottomVariants = {
    closed: {
      rotate: 0,
    },
    opened: {
      rotate: -45,
      backgroundColor: "rgb(255,255,255)",
    },
  };

  const listVariants = {
    closed: {
      x: "100vw",
    },
    opened: {
      x: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const listItemVariants = {
    closed: {
      x: -10,
      opacity: 0,
    },
    opened: {
      x: 0,
      opacity: 1,
    },
  };
  return (
    <div
      className='w-full bg-slate-800 h-32 text-white flex items-center px-24 justify-between top-0 z-50 shadow-slate-950 shadow-md rounded-b-xl'
    >
        <div className="md:hidden lg:flex  w-1/3">
        <Link
          href="/"
          className="text-sm bg-black rounded-md p-1 font-semibold flex items-center justify-center"
        >
          <span className="text-white mr-1">DH</span>
          <span className="w-12 h-8 rounded bg-white text-black flex items-center justify-center">
            .dev
          </span>
        </Link>
      </div>
      <div className="hidden md:flex gap-4 justify-center w-1/3">
        {links.map((link, index) => (
          <Link key={index} className={`rounded font-semibold p-1 text-xl border-slate-700 ${pathName === link.url && "bg-white text-slate-700"} border-b-2  hover:border-white`} href={link.url}>
          {link.title}
        </Link>
        ))}
      </div>
      <div className="hidden md:flex justify-end gap-4 w-1/3">
        <SocialIcon className="w-14 hover:-translate-y-2 duration-200" network="github" url="https://github.com/theeatch"></SocialIcon>
        <SocialIcon className="w-14 hover:-translate-y-2 duration-200" network="instagram" url="https://instagram.com/dhxdxd"></SocialIcon>
        <SocialIcon className="w-14 hover:-translate-y-2 duration-200" network="linkedin" url="https://www.linkedin.com/in/dhruv-negi-387a3a233/"></SocialIcon>
        <SocialIcon className="w-14 hover:-translate-y-2 duration-200" network="youtube" url="https://youtube.com/DHsPianoLand"></SocialIcon>
      </div>
      <div className="md:hidden">
        {/* MENU BUTTON */}
        <button
          className="w-10 h-8 flex flex-col justify-between z-50 relative"
          onClick={() => setOpen((prev) => !prev)}
        >
          <motion.div
            variants={topVariants}
            animate={open ? "opened" : "closed"}
            className="w-10 h-1 bg-black rounded origin-left"
          ></motion.div>
          <motion.div
            variants={centerVariants}
            animate={open ? "opened" : "closed"}
            className="w-10 h-1 bg-black rounded"
          ></motion.div>
          <motion.div
            variants={bottomVariants}
            animate={open ? "opened" : "closed"}
            className="w-10 h-1 bg-black rounded origin-left"
          ></motion.div>
        </button>
        {/* MENU LIST */}
        {open && (
          <motion.div
            variants={listVariants}
            initial="closed"
            animate="opened"
            className="absolute top-0 left-0 w-screen h-screen bg-black text-white flex flex-col items-center justify-center gap-8 text-4xl z-40"
          >
            {links.map((link) => (
              <motion.div
                variants={listItemVariants}
                className=""
                key={link.title}
              >
                <Link href={link.url}>{link.title}</Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Navbar;