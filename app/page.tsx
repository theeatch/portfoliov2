"use client";

import { navItems } from "@/data";

import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import Footer from "@/components/Footer";
import Approach from "@/components/Approach";
import Experience from "@/components/Experience";
import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import SpaceBackground from "@/components/ui/SpaceBackground";

const Home = () => {
  return (
    <main className="relative mx-auto flex flex-col items-center justify-center overflow-x-clip px-5 sm:px-10">
      {/* fixed starfield, nebulae and grain behind everything */}
      <SpaceBackground />

      <div className="relative z-10 w-full max-w-7xl">
        <FloatingNav navItems={navItems} />
        <Hero />
        <Grid />
        <RecentProjects />
        <Experience />
        <Approach />
        <Footer />
      </div>
    </main>
  );
};

export default Home;
