"use client";

import React, { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();

  // visible on load so the bar shows over the hero
  const [visible, setVisible] = useState(true);
  const [active, setActive] = useState<string>(navItems[0]?.link ?? "");

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - (scrollYProgress.getPrevious() ?? 0);

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        setVisible(direction < 0);
      }
    }
  });

  // light up the nav item for whichever section is in view
  useEffect(() => {
    const ids = navItems
      .map((item) => item.link)
      .filter((link) => link.startsWith("#"));

    const sections = ids
      .map((id) => ({ id, el: document.querySelector(id) }))
      .filter((s): s is { id: string; el: Element } => Boolean(s.el));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) {
          const match = sections.find((s) => s.el === hit.target);
          if (match) setActive(match.id);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((s) => observer.observe(s.el));
    return () => observer.disconnect();
  }, [navItems]);

  return (
    <AnimatePresence mode="wait">
      <motion.nav
        initial={{ opacity: 1, y: -100 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "glass-panel fixed inset-x-0 top-6 z-[5000] mx-auto flex max-w-fit items-center gap-1 rounded-full px-2 py-2 md:top-10 md:gap-2 md:px-3",
          className
        )}
        style={{
          boxShadow:
            "0 8px 40px -12px rgba(2,4,11,0.9), inset 0 1px 0 0 rgba(148,190,255,0.1)",
        }}
      >
        {navItems.map((navItem, idx) => {
          const isActive = active === navItem.link;
          return (
            <Link
              key={`link-${idx}`}
              href={navItem.link}
              onClick={() => setActive(navItem.link)}
              className="relative flex items-center gap-1.5 rounded-full px-3 py-2 md:px-4"
            >
              {isActive && (
                <motion.span
                  layoutId="nav-pill"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="absolute inset-0 rounded-full border border-nebula-cyan/25 bg-nebula-cyan/10"
                  style={{
                    boxShadow: "0 0 24px -6px rgba(56,189,248,0.45)",
                  }}
                />
              )}
              <span className="relative block sm:hidden">{navItem.icon}</span>
              <span
                className={cn(
                  "relative cursor-pointer text-xs transition-colors duration-300 md:text-sm",
                  isActive
                    ? "text-starlight"
                    : "text-white-100 hover:text-starlight"
                )}
              >
                {navItem.name}
              </span>
            </Link>
          );
        })}
      </motion.nav>
    </AnimatePresence>
  );
};
