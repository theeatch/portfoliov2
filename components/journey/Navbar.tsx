"use client";

import { motion } from "framer-motion";
import { FaBriefcase, FaCode, FaDownload, FaEnvelope, FaUser } from "react-icons/fa6";

import { navItems, resumeDownload, scenes, type SceneId } from "@/data";
import { cn } from "@/lib/utils";
import { useJourney } from "./context";
import ThemeToggle from "./ThemeToggle";

const ICONS: Record<string, React.ReactNode> = {
  about: <FaUser />,
  projects: <FaCode />,
  experience: <FaBriefcase />,
  contact: <FaEnvelope />,
};

/**
 * Always-on bar. DH (home) on the far left, the sections in the middle as a
 * short run of keys with the current one pressed, résumé + theme switch on the
 * far right. It never hides: the journey is paged, so there is no scroll
 * direction to react to.
 */
const Navbar = () => {
  const { index, goTo } = useJourney();
  const activeId: SceneId = scenes[index].id;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 px-3 sm:px-6"
      style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}
    >
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Primary"
        // equal-width side columns from sm up keep the keys on the true centre line
        className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-1 sm:gap-2"
      >
        {/* DH mark → launch */}
        <button
          type="button"
          onClick={() => goTo("home")}
          aria-label="Dhruv Negi: back to the keyboard"
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center border border-ink bg-page font-display text-[0.95rem] tracking-wider text-ink transition-colors hover:bg-ink hover:text-page focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
            activeId === "home" && "bg-ink text-page"
          )}
        >
          DH
        </button>

        {/* sections */}
        <ul className="flex items-stretch border border-ink bg-page">
          {navItems.map((item, i) => {
            const active = item.id === activeId;
            return (
              <li key={item.id} className={cn(i > 0 && "border-l border-ink/30")}>
                <a
                  href={item.link}
                  onClick={(e) => {
                    e.preventDefault();
                    goTo(item.id);
                  }}
                  aria-current={active ? "page" : undefined}
                  className="relative flex h-[2.625rem] items-center gap-2 px-3 text-sm transition-colors sm:px-5"
                >
                  {/* the pressed key slides to whichever section you are in */}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 bg-ink"
                    />
                  )}
                  <span
                    className={cn(
                      "relative text-[0.95rem] md:hidden",
                      active ? "text-page" : "text-white-100"
                    )}
                  >
                    {ICONS[item.id]}
                  </span>
                  <span
                    className={cn(
                      "relative hidden font-display text-[12px] tracking-[0.14em] md:inline",
                      active ? "text-page" : "text-white-100 hover:text-ink"
                    )}
                  >
                    {item.name}
                  </span>
                  <span className="sr-only md:hidden">{item.name}</span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* résumé + theme */}
        <div className="flex items-center justify-self-end gap-1 sm:gap-2">
          <a
            href={resumeDownload}
            target="_blank"
            rel="noreferrer"
            download
            aria-label="Download résumé"
            className="group flex h-11 items-center gap-2 border border-ink bg-page px-3.5 font-display text-[12px] tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-page focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:px-4"
          >
            <FaDownload className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
            <span className="hidden lg:inline">Résumé</span>
          </a>
          <ThemeToggle />
        </div>
      </motion.nav>
    </header>
  );
};

export default Navbar;
