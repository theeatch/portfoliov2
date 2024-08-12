"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { encode } from "qss";
import { LinkPreview } from "@/components/ui/link-preview";

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
    description: string;
  }[];
}) => {
  const firstRow = products.slice(0, 3);
  const secondRow = products.slice(3, 6);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [-200, 650]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [200, -650]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-650, 350]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className="h-[250vh] pt-32 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      {/* Parallax Background */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="w-full absolute top-[30%] "
        animate={{ y: [0, 10,-10, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      >
        <path
          fill="#a2d9ff"
          fillOpacity="1"
          d="M0,224L48,202.7C96,181,192,139,288,138.7C384,139,480,181,576,192C672,203,768,181,864,176C960,171,1056,181,1152,186.7C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </motion.svg>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="w-full absolute top-[30%] opacity-30"
        animate={{ y: [0, 12, -12, 0] }}
        transition={{
          duration: 2,
          delay: 0.5,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      >
        <path
          fill="#0099ff"
          fillOpacity="1"
          d="M0,224L48,202.7C96,181,192,139,288,138.7C384,139,480,181,576,192C672,203,768,181,864,176C960,171,1056,181,1152,186.7C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </motion.svg>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="w-full absolute top-[33%] opacity-30"
        animate={{ y: [0, 12, -12, 0] }}
        transition={{
          duration: 2,
          delay: 0.5,
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <path
          fill="#0099ff"
          fillOpacity="1"
          d="M0,96L48,106.7C96,117,192,139,288,165.3C384,192,480,224,576,229.3C672,235,768,213,864,181.3C960,149,1056,107,1152,90.7C1248,75,1344,85,1392,90.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </motion.svg>

      {/* products showcase */}
      <div className="w-full absolute top-[44%] bg-gradient-to-b from-blue-300 to-blue-950 bg-opacity-50 h-full"></div>
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div
          className="flex flex-row-reverse space-x-reverse space-x-20 mb-20"
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            bounce: 100,
          }}
        >
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div
          className="flex flex-row space-x-20 mb-20"
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            bounce: 100,
          }}
        >
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Learn my Tech Stack */}
      <div className="h-full flex flex-col justify-center bg-transparent bg-opacity-70 mt-72">
        <motion.h1
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className=" text-6xl font-bold text-white/80 p-2 z-50"
        >
          Learn about the Tech I&apos;ve Used!
        </motion.h1>
        <motion.div
          initial={{ x: "-500px" }}
          whileInView={{ x: "-100px" }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 120,
            ease: "easeInOut",
          }}
          className="w-full h-32 bg-slate-800 text-white flex justify-around items-center rounded-r-2xl"
        >
          <LinkPreview
            url="https://nextjs.org/docs"
            className="my-auto text-white underline z-20 text-xl md:text-3xl max-w-3xl mx-auto mb-10"
          >
            NextJS
          </LinkPreview>
          <LinkPreview
            url="https://legacy.reactjs.org/docs/getting-started.html"
            className="my-auto text-white underline z-20 text-xl md:text-3xl max-w-3xl mx-auto mb-10"
          >
            ReactJS
          </LinkPreview>
          <LinkPreview
            url="https://www.gatsbyjs.com/docs/"
            className="my-auto text-white underline z-20 text-xl md:text-3xl max-w-3xl mx-auto mb-10"
          >
            GatsbyJS
          </LinkPreview>
          <LinkPreview
            url="https://tailwindcss.com"
            className="my-auto text-white underline z-20 text-xl md:text-3xl max-w-3xl mx-auto mb-10"
          >
            TailwindCSS
          </LinkPreview>
          <LinkPreview
            url="https://framer.com/motion"
            className="my-auto text-white underline z-20 text-xl md:text-3xl max-w-3xl mx-auto mb-10"
          >
            FramerMotion
          </LinkPreview>
        </motion.div>
      </div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0 z-50">
      <h1 className="text-2xl md:text-7xl font-bold">My Works!</h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 font-semibold">
        I&apos;ve built a few projects and worked with teams over the years in
        ReactJs, NextJs, GatsbyJS. Utilizing multiple UI libraries like
        TailwindCSS, DaisyUI, Aceternity and ShadCN, I&apos;ve been able to
        create beautiful and responsive websites. Check them out below!
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
    description: string;
  };
  translate: MotionValue<number>;
}) => {
  const params = encode({
    url: product.link,
    screenshot: true,
    meta: false,
    embed: "screenshot.url",
    colorScheme: "dark",
    "viewport.isMobile": true,
    "viewport.deviceScaleFactor": 1,
    "viewport.width": 200 * 3,
    "viewport.height": 125 * 3,
  });
  const src = `https://api.microlink.io/?${params}`;
  console.log("products: ", product.title, src);

  return (
    <motion.div
      style={{
        x: translate,
      }}
      animate={{
        y: 0.2 ? [0, -20, 0] : 0,
      }}
      transition={{
        duration: 1.75,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      }}
      whileHover={{
        y: [-50, 0, -50],
        transition: {
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        },
      }}
      key={product.title}
      className="group/product h-[30rem] w-[30rem] relative flex-shrink-0 z-0 rounded-2xl border-8 border-white"
    >
      <Link
        href={product.link}
        className="block group-hover/product:shadow-2xl"
      >
        <Image
          src={product.title === "UpEase" ? product.thumbnail : src}
          height="800"
          width="800"
          className="object-cover absolute h-full w-full inset-0 rounded-xl"
          alt={product.title}
        />
      </Link>
      <motion.div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none duration-300"></motion.div>
      <h2 className="absolute font-bold top-14 left-4 opacity-0 group-hover/product:opacity-100 text-white text-5xl duration-500">
        {product.title}
      </h2>
      <div className="absolute top-40 left-4 opacity-0 group-hover/product:opacity-100 text-white font-semibold text-2xl duration-500">
        {product.description}
      </div>
    </motion.div>
  );
};
