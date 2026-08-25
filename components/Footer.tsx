"use client";

import { FaLocationArrow } from "react-icons/fa6";
import { motion, useReducedMotion } from "framer-motion";

import { socialMedia, contactEmail } from "@/data";
import MagicButton from "./MagicButton";

const Footer = () => {
  const reduced = useReducedMotion();

  return (
    <footer className="relative w-full pb-24 pt-20 md:pb-10" id="contact">
      {/* a second horizon: the page ends on the edge of another world */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-[420px] w-screen -translate-x-1/2 overflow-hidden"
      >
        <div
          className="absolute -bottom-[300px] left-1/2 h-[520px] w-[180vw] -translate-x-1/2 rounded-[50%]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 10%, rgba(19,26,51,0.9) 0%, rgba(4,6,14,0.95) 60%)",
            boxShadow:
              "inset 0 1px 0 0 rgba(167,139,250,0.55), 0 -30px 90px -30px rgba(167,139,250,0.3)",
          }}
        />
        <div
          className="absolute -bottom-[200px] left-1/2 h-[360px] w-[150vw] -translate-x-1/2 rounded-[50%] blur-2xl"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, rgba(167,139,250,0.28) 0%, transparent 65%)",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 24 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <p className="eyebrow mb-5">Open channel</p>

          <h2 className="heading heading-cosmic lg:max-w-[45vw]">
            Got something{" "}
            <span className="bg-gradient-to-br from-nebula-ice via-nebula-cyan to-nebula-violet bg-clip-text text-transparent">
              worth building?
            </span>
          </h2>

          <p className="my-5 max-w-2xl text-center text-sm leading-relaxed text-white-100 md:mt-8 md:text-base">
            I&apos;m always up for talking about backend architecture, hard
            scaling problems, or an idea you can&apos;t stop thinking about.
            The inbox is open.
          </p>

          <a href={`mailto:${contactEmail}`}>
            <MagicButton
              title="Let's get in touch"
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>
        </motion.div>
      </div>

      <div className="relative z-10 mt-20 flex flex-col items-center justify-between gap-6 border-t border-white/[0.07] pt-8 md:flex-row md:gap-3 md:pe-40">
        <p className="font-mono text-[11px] tracking-wide text-white-100/70 md:text-xs">
          © {new Date().getFullYear()} Dhruv Negi — built from orbit
        </p>

        <div className="flex items-center gap-4 md:gap-3">
          {socialMedia.map((info) => (
            <a
              href={info.url}
              key={info.id}
              target="_blank"
              rel="noreferrer"
              aria-label={info.name}
              className="glass-panel flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl transition duration-500 hover:-translate-y-2 hover:border-nebula-cyan/40 hover:shadow-glow"
            >
              <img src={info.img} alt="" width={20} height={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
