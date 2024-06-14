"use client";

import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./navbar";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface TransitionProviderProps {
  children: ReactNode;
}

const TransitionProvider = ({ children }: TransitionProviderProps) => {
  const pathName = usePathname();

  return (
    <AnimatePresence mode="wait">
      <div
        key={pathName}
        className="w-full h-full bg-gradient-to-b from-blue-100 to-red-100"
      >
        <motion.div
          className="h-screen w-screen fixed bg-slate-800 rounded-b-[100px] z-40"
          initial={{ x: "-100vw" }}
          animate={{ height: "0vh", x: "0vh" }}
          exit={{ height: "140vh" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        <motion.div
          className="fixed m-auto bottom-0 left-0 right-0 text-white text-8xl cursor-default z-30 w-fit h-[50%] top-[50]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {pathName === "/" ? "Home" : pathName.substring(1)}
        </motion.div>
        <motion.div
          className="h-screen w-screen fixed bg-slate-800 bottom-0 z-30"
          initial={{ height: "100vh" }}
          animate={{
            height: "0vh",
            x: "-100vw",
            transition: { delay: 0.4, duration: 0.5 },
          }}
        />
        <div className="">{children}</div>
      </div>
    </AnimatePresence>
  );
};

export default TransitionProvider;
