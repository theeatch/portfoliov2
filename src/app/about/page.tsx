"use client";
import React from "react";
import Image from "next/image";
import { TracingBeam } from "@/components/ui/tracing-beam";
import Link from "next/link";
import { motion } from "framer-motion";
const skills = [
  "JavaScript",
  "TypeScript",
  "C++",
  "Python",
  "React.js",
  "Next.js",
  "Gatsby.js",
  "SCSS",
  "Tailwind CSS",
  "MongoDB",
  "Convex",
  "Node.js",
  "Express.js",
  "GraphQL",
  "Redux",
  "Framer Motion",
  "Vite",
  "Docker",
  "Firebase",
  "Git",
  "Vercel",
];
const Page = () => {
  return (
    <motion.div
      className="min-h-full "
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 0.8 }}
    >
      <TracingBeam className="px-6 h-full">
        <div className="max-w-2xl mt-20 mx-auto antialiased pt-4 relative">
          {dummyContent.map((item, index) => (
            <div key={`content-${index}`} className="">
              <h2 className="bg-black text-white rounded-full text-xl w-fit px-4 py-1 mb-4">
                {item.badge}
              </h2>
              <div className="text-sm py-10">
                {item?.image && (
                  <Image
                    src={item.image}
                    alt=""
                    width={200}
                    height={200}
                    className="w-40 h-40 rounded-full object-cover"
                  />
                )}
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </TracingBeam>
    </motion.div>
  );
};

const dummyContent = [
  {
    title: "Lorem Ipsum Dolor Sit Amet",
    description: (
      <div className="flex mb-64 flex-col justify-star gap-4">
        <p className="text-2xl font-semibold py-10 ">
          I am a software developer specializing in web development, with a
          focus on creating unique frontend projects.
          {/* add a newline here */}
          <br />
          <br />
          Apart from coding, I have a passion for playing the piano and creating
          distinctive piano covers, which can be found on my YouTube channel{" "}
          <Link
            className="underline text-blue-800"
            href="https://youtube.com/DHsPianoLand"
          >
            DHsPianoLand
          </Link>
        </p>
        <button className="bg-black text-white w-full hover:bg-white hover:text-black duration-300 text-xl p-2 rounded-lg ">
          <Link href="/portfolio">Check out my works!</Link>{" "}
        </button>
      </div>
    ),
    badge: "Biography",
    image: "/images/dhpic2.jpg",
  },
  {
    title: "Lorem Ipsum Dolor Sit Amet",
    description: (
      <>
        <motion.div
          initial={{ x: "-300px" }}
          whileInView={{ x: 0 }}
          transition={{repeat: 0}}
          className="flex gap-4 flex-wrap mb-64"
        >
          {skills.map((skill, index) => (
            <div
              key={index}
              className="rounded p-2 text-sm cursor-pointer bg-white text-black hover:bg-black hover:text-white"
            >
              {skill}
            </div>
          ))}
        </motion.div>
      </>
    ),
    badge: "My Skills",
    image: "",
  },
  {
    title: "Lorem Ipsum Dolor Sit Amet",
    description: (
      <div className="flex flex-col gap-16 justify-center pb-48">
        {/* EXPERIENCE TITLE */}
        <motion.h1
          initial={{ x: "-300px" }}
          whileInView={{ x: 0 }}
          transition={{ ease: "easeInOut", type: "spring"}}
          viewport={{ once: true }}
          className="font-bold text-2xl"
        >
          EXPERIENCE
        </motion.h1>
        {/* EXPERIENCE LIST */}
        <motion.div
          className=""
        >
          {/* EXPERIENCE LIST ITEM */}
          <div className="flex justify-between h-48">
            {/* LEFT */}
            <motion.div className="w-1/3 "
            initial={{ x: "-300px" }}
            whileInView={{ x: 0 }}
            transition={{duration: 1}}>
              {/* JOB TITLE */}
              <div className="bg-white text-2xl p-3 font-semibold rounded-b-lg rounded-s-lg">
                Core Developement Team
              </div>
              {/* JOB DESC */}
              <div className="p-3 text-md italic">
                Developed the front-end of the company&apos;s website and
                working on the core products.{" "}
              </div>
              {/* JOB DATE */}
              <div className="p-3 text-red-400 text-sm font-semibold">
                June 2023 - Present
              </div>
              {/* JOB COMPANY */}
              <div className=" p-3 rounded bg-white text-lg font-semibold w-fit">
                Upease
              </div>
            </motion.div>
            {/* CENTER */}
            <div className="w-1/6 flex justify-center">
              {/* LINE */}
              <div className="w-1 h-full bg-gray-600 rounded relative">
                {/* LINE CIRCLE */}
                <div className="absolute w-5 h-5 rounded-full ring-4 ring-red-400 bg-white -left-2"></div>
              </div>
            </div>
            {/* RIGHT */}
            <div className="w-1/3 "></div>
          </div>
          {/* EXPERIENCE LIST ITEM */}
          <div className="flex justify-between h-48">
            {/* LEFT */}
            <div className="w-1/3 "></div>
            {/* CENTER */}
            <div className="w-1/6 flex justify-center">
              {/* LINE */}
              <div className="w-1 h-full bg-gray-600 rounded relative">
                {/* LINE CIRCLE */}
                <div className="absolute w-5 h-5 rounded-full ring-4 ring-red-400 bg-white -left-2"></div>
              </div>
            </div>
            {/* RIGHT */}
            <motion.div className="w-1/3 "
            initial={{x:"300px"}}
            whileInView={{x:0}}
            transition={{duration:1}}
            >
              {/* JOB TITLE */}
              <div className="bg-white p-3 text-2xl font-semibold rounded-b-lg rounded-s-lg">
                Dev Core Team
              </div>
              {/* JOB DESC */}
              <div className="p-3 text-md italic">
                Collaborated with Dev-Core and Dev-Team members to ideate and
                develop innovative projects.{" "}
              </div>
              {/* JOB DATE */}
              <div className="p-3 text-red-400 text-sm font-semibold">
                Nov 2022 - present{" "}
              </div>
              {/* JOB COMPANY */}
              <div className="p-3 rounded text-lg bg-white font-semibold w-fit">
                Manipal OSF
              </div>
            </motion.div>
          </div>
          {/* EXPERIENCE LIST ITEM */}
          <div className="flex justify-between h-48">
            {/* LEFT */}
            <motion.div className="w-1/3 "
            initial={{ x: "-300px" }}
            whileInView={{ x: 0 }}
            transition={{duration: 1}}>
              {/* JOB TITLE */}
              <div className="bg-white p-3 text-xl font-semibold rounded-b-lg rounded-s-lg">
                Freelance{" "}
              </div>
              {/* JOB DESC */}
              <div className="p-3 text-md italic">
                Collaborated with a team to develop LifekShell, a dynamic
                website tailored for a medical company, built with GatsbyJS and
                powered by GraphQL.{" "}
              </div>
              {/* JOB DATE */}
              <div className="p-3 text-red-400 text-sm font-semibold">
                June 2023{" "}
              </div>
              {/* job company */}
              <div className="p-3 rounded bg-white text-lg font-semibold w-fit">
                LifekShell
              </div>
            </motion.div>
            {/* CENTER */}
            <div className="w-1/6 flex justify-center">
              {/* LINE */}
              <div className="w-1 h-full bg-gray-600 rounded relative">
                {/* LINE CIRCLE */}
                <div className="absolute w-5 h-5 rounded-full ring-4 ring-red-400 bg-white -left-2"></div>
              </div>
            </div>
            {/* RIGHT */}
            <div className="w-1/3 "></div>
          </div>
          {/* EXPERIENCE LIST ITEM */}
          <div className="flex justify-between h-48">
            {/* LEFT */}
            <div className="w-1/3 "></div>
            {/* CENTER */}
            <div className="w-1/6 flex justify-center">
              {/* LINE */}
              <div className="w-1 h-full bg-gray-600 rounded relative">
                {/* LINE CIRCLE */}
                <div className="absolute w-5 h-5 rounded-full ring-4 ring-red-400 bg-white -left-2"></div>
              </div>
            </div>
            {/* RIGHT */}
            <motion.div className="w-1/3 "
            initial={{x:"300px"}}
            whileInView={{x:0}}
            transition={{duration:1}}>
              {/* JOB TITLE */}
              <div className="bg-white p-3 text-2xl font-semibold rounded-b-lg rounded-s-lg">
                FrontEnd Intern
              </div>
              {/* JOB DESC */}
              <div className="p-3 text-md italic">
                Collaborated with a team to learn frontend and implement
                learning onto website and authenticated application.{" "}
              </div>
              {/* JOB DATE */}
              <div className="p-3 text-red-400 text-sm font-semibold">
                Feb 2023 - Jun 2023{" "}
              </div>
              {/* JOB COMPANY */}
              <div className="p-3 rounded text-lg bg-white font-semibold w-fit">
                Fundinc
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    ),
    badge: "Experience in Dev",
    image: "",
  },
];

export default Page;
