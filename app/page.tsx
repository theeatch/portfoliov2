"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import Hero from "@/components/Hero";
import Backdrop from "@/components/journey/Backdrop";
import Hud from "@/components/journey/Hud";
import Loader from "@/components/journey/Loader";
import Navbar from "@/components/journey/Navbar";
import Stage from "@/components/journey/Stage";
import { JourneyProvider } from "@/components/journey/context";

// Only the launch scene ships in the first bundle; the rest are fetched while
// the visitor reads the hero (see the idle prefetch below).
const importGrid = () => import("@/components/Grid");
const importProjects = () => import("@/components/RecentProjects");
const importExperience = () => import("@/components/Experience");
const importContact = () => import("@/components/Contact");
const loaders: (() => Promise<unknown>)[] = [
  importGrid,
  importProjects,
  importExperience,
  importContact,
];

const Grid = dynamic(importGrid);
const RecentProjects = dynamic(importProjects);
const Experience = dynamic(importExperience);
const Contact = dynamic(importContact);

/** Flight order: must match `scenes` in data/index.ts. */
const views = [Hero, Grid, RecentProjects, Experience, Contact];

const Home = () => {
  const [ready, setReady] = useState(false);

  // warm every remaining chunk once the page is idle, so moving to a scene
  // never waits on the network
  useEffect(() => {
    const warm = () => loaders.forEach((load) => load().catch(() => {}));
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
    };
    if (w.requestIdleCallback) w.requestIdleCallback(warm, { timeout: 2500 });
    else setTimeout(warm, 1200);
  }, []);

  return (
    <JourneyProvider>
      <Loader onDone={() => setReady(true)} />
      <Backdrop />
      {ready && (
        <>
          <Navbar />
          <Stage views={views} />
          <Hud />
        </>
      )}
    </JourneyProvider>
  );
};

export default Home;
