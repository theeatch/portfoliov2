"use client";

import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { CanvasRevealEffect } from "./ui/CanvasRevealEffect";
import SectionHeading from "./ui/SectionHeading";

const Approach = () => {
  const reduced = useReducedMotion();

  const cards = [
    {
      title: "Github",
      order: "GH",
      icon: "/git.svg",
      link: "https://github.com/theeatch",
      reveal: {
        animationSpeed: 4.2,
        containerClassName: "bg-space-600 rounded-3xl overflow-hidden",
        colors: [
          [56, 189, 248],
          [125, 211, 252],
        ],
      },
    },
    {
      title: "Youtube",
      order: "YT",
      icon: "/yt.svg",
      link: "https://www.youtube.com/@DHsPianoLand",
      reveal: {
        animationSpeed: 3,
        containerClassName: "bg-space-500 rounded-3xl overflow-hidden",
        colors: [
          [167, 139, 250],
          [196, 181, 253],
        ],
        dotSize: 2,
      },
    },
    {
      title: "LinkedIn",
      order: "IN",
      icon: "/link.svg",
      link: "https://www.linkedin.com/in/dhruv-negi",
      reveal: {
        animationSpeed: 3,
        containerClassName: "bg-space-600 rounded-3xl overflow-hidden",
        colors: [[99, 102, 241]],
      },
    },
  ];

  return (
    <section className="w-full py-20">
      <SectionHeading
        eyebrow="Open channels"
        title="Find me"
        accent="out there"
        subtitle="Code, piano and everything in between — pick a frequency."
      />

      <div className="mt-16 flex w-full flex-col items-center justify-center gap-4 lg:flex-row">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={reduced ? undefined : { opacity: 0, y: 30 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.7,
              delay: i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-full max-w-sm"
          >
            <Card
              title={card.title}
              icon={<OrbitBadge order={card.order} />}
              des={card.icon}
              link={card.link}
            >
              <CanvasRevealEffect {...card.reveal} />
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Approach;

const Card = ({
  title,
  icon,
  children,
  link,
  des,
}: {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  link: string;
  des: string;
}) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group/canvas-card glow-ring relative mx-auto flex w-full items-center justify-center rounded-3xl border border-white/[0.1] p-4 lg:h-[24rem]"
      style={{
        background:
          "linear-gradient(158deg, rgba(19,26,51,0.7) 0%, rgba(8,12,27,0.9) 55%, rgba(4,6,14,0.95) 100%)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* corner registration marks, like a viewport reticle */}
      <Icon className="absolute -left-3 -top-3 h-10 w-10 text-nebula-cyan/40" />
      <Icon className="absolute -bottom-3 -left-3 h-10 w-10 text-nebula-cyan/40" />
      <Icon className="absolute -right-3 -top-3 h-10 w-10 text-nebula-cyan/40" />
      <Icon className="absolute -bottom-3 -right-3 h-10 w-10 text-nebula-cyan/40" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 h-full w-full"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <a
        className="relative z-20 px-10"
        href={link}
        target="_blank"
        rel="noreferrer"
      >
        <div className="absolute left-[50%] top-[50%] mx-auto flex min-w-40 translate-x-[-50%] translate-y-[-50%] items-center justify-center text-center transition duration-200 group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0">
          {icon}
        </div>
        <h3 className="relative z-10 mt-4 text-center font-display text-3xl font-bold text-starlight opacity-0 transition duration-200 group-hover/canvas-card:-translate-y-2 group-hover/canvas-card:opacity-100">
          {title}
        </h3>
        <Image
          src={des}
          alt={title}
          width={100}
          height={100}
          className="relative z-10 mx-auto self-center opacity-0 transition duration-200 group-hover/canvas-card:-translate-y-2 group-hover/canvas-card:opacity-100"
        />
      </a>
    </div>
  );
};

/** The idle-state badge: a slowly orbiting cyan→violet ring around a label. */
const OrbitBadge = ({ order }: { order: string }) => {
  return (
    <div>
      <span className="relative inline-flex overflow-hidden rounded-full p-[1px]">
        <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#7DD3FC_0%,#6366F1_40%,#A78BFA_70%,#22D3EE_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-space-800/95 px-5 py-2 font-display text-2xl font-bold text-nebula-ice backdrop-blur-3xl">
          {order}
        </span>
      </span>
    </div>
  );
};

export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
