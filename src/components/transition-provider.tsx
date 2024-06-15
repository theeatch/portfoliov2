"use client";

import { AnimatePresence } from "framer-motion";
import Navbar from "./navbar";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const TransitionProvider = ({ children }) => {
  const pathName = usePathname();

  return (
    <AnimatePresence mode="wait">
      <div
        key={pathName}
        className="w-full h-full bg-gradient-to-b from-blue-100 to-red-100"
      >
        <motion.div
          className="h-screen w-screen fixed bg-slate-800 rounded-b-[100px] z-50"
          initial={{x:"-100vw"}}
          animate={{ height: "0vh", x: "0vh"}}
          exit={{ height: "140vh" }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        />
        <motion.div
          className="fixed m-auto top-0 bottom-0 left-0 right-0 text-white text-8xl cursor-default z-50 w-fit h-fit"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {pathName === "/" ? "Home" : pathName.substring(1) }
        </motion.div>
        <motion.div
          className="h-screen w-screen fixed bg-slate-800 rounded-t-[100px] bottom-0 z-30"
          initial={{ height: "140vh" }}
          animate={{ height: "0vh", x:"-100vw", transition: { delay: 0.2, duration: 0.6} }}
        />
        <div className="">{children}</div>
      </div>
    </AnimatePresence>
  );
};

export default TransitionProvider;