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
 * Always-on bar. DH (home) on the far left, the sections in the middle
 * with the current one lit, résumé + theme switch on the far right. It never
 * hides: the journey is paged, so there is no scroll direction to react to.
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
        // equal-width side columns from sm up keep the section pill on the true centre line
        className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-1 sm:gap-2"
      >
        {/* DH mark → launch */}
        <button
          type="button"
          onClick={() => goTo("home")}
          aria-label="Dhruv Negi: back to the keyboard"
          className="group relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
        >
          <span className="absolute inset-0 rounded-full border border-ink/70 transition-transform duration-500 group-hover:scale-110" />
          <span
            className={cn(
              "relative flex h-[2.45rem] w-[2.45rem] items-center justify-center rounded-full bg-surface-800 font-display text-[0.95rem] font-bold tracking-tight text-ink transition-colors",
              activeId === "home" && "bg-surface-600"
            )}
          >
            DH
          </span>
        </button>

        {/* sections */}
        <ul className="glass-panel flex items-center gap-0 rounded-full p-1 shadow-orbit sm:gap-1 sm:p-1.5">
          {navItems.map((item) => {
            const active = item.id === activeId;
            return (
              <li key={item.id}>
                <a
                  href={item.link}
                  onClick={(e) => {
                    e.preventDefault();
                    goTo(item.id);
                  }}
                  aria-current={active ? "page" : undefined}
                  className="relative flex h-9 items-center gap-2 rounded-full px-2.5 text-sm transition-colors sm:px-4"
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-full border border-brand/35 bg-brand/15"
                      
                    />
                  )}
                  <span
                    className={cn(
                      "relative text-[0.95rem] md:hidden",
                      active ? "text-brand-soft" : "text-white-100"
                    )}
                  >
                    {ICONS[item.id]}
                  </span>
                  <span
                    className={cn(
                      "relative hidden md:inline",
                      active ? "font-medium text-ink" : "text-white-100 hover:text-ink"
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
            className="glass-panel group relative flex h-11 items-center gap-2 rounded-full px-3.5 text-sm text-ink transition-all hover:border-brand/50 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 sm:px-4"
          >
            <FaDownload className="h-3.5 w-3.5 text-brand transition-transform group-hover:translate-y-0.5" />
            <span className="hidden lg:inline">Résumé</span>
          </a>
          <ThemeToggle />
        </div>
      </motion.nav>
    </header>
  );
};

export default Navbar;
