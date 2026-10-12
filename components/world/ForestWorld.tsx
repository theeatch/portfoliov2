"use client";

import type { Size } from "@/lib/useSize";
import { Bird, Butterfly, Cloud, Leaf, Sun } from "./art";
import { TrunkInterior } from "./Interiors";
import { Layer, Ribbon, type Cam } from "./shared";

/**
 * The forest, as the same path as the ocean:
 *
 *   y 0.00  above the canopy (home)
 *   y 1.00  inside the crown (about, then right along a branch: the projects)
 *   y 2.00  a hollow in the trunk (experience)
 *   y 0.45  back up near the treetop (contact)
 *
 * The canopy line sits where the ocean's waterline does, so the camera moves
 * identically in both themes.
 */

const CANOPY = 0.55;

/** a row of round treetops, tiled twice by <Ribbon/> */
const bumps = (n: number, w: number, h: number) => {
  let d = `M0 ${h + 20} L0 ${h}`;
  for (let i = 1; i <= n * 2; i++) d += ` A${w / 2} ${h} 0 0 1 ${i * w} ${h}`;
  return `${d} V${h + 20} Z`;
};
const BUMPS_A = bumps(12, 100, 40);
const BUMPS_B = bumps(9, 134, 46);

const LEAVES: [number, number, number, number, string, string][] = [
  // world x (vw), world y (vh), width (px), rotation, colour, vein
  [2, 112, 80, 20, "#4ea05f", "#2f7a43"],
  [95, 120, 64, -25, "#6cbf6c", "#3f8f4f"],
  [8, 168, 92, -30, "#3f9456", "#2a6f3e"],
  [88, 182, 70, 35, "#58ad62", "#2f7a43"],
  [104, 110, 76, 15, "#4ea05f", "#2f7a43"],
  [196, 118, 66, -18, "#6cbf6c", "#3f8f4f"],
  [206, 174, 88, 28, "#3f9456", "#2a6f3e"],
  [150, 186, 60, -40, "#58ad62", "#2f7a43"],
  [248, 150, 84, 12, "#4ea05f", "#2f7a43"],
  [50, 190, 58, 50, "#6cbf6c", "#3f8f4f"],
];

const FALLING = [
  { l: 8, d: 17, de: 0, sx: 70 },
  { l: 22, d: 21, de: 6, sx: -60 },
  { l: 39, d: 18, de: 11, sx: 80 },
  { l: 55, d: 23, de: 3, sx: -70 },
  { l: 70, d: 19, de: 9, sx: 60 },
  { l: 86, d: 22, de: 14, sx: -50 },
];

const ForestWorld = ({ size, cam }: { size: Size; cam: Cam }) => (
  <>
    {/* the crown: green canopy from above, pale sunlit leaves inside */}
    <Layer cam={cam} size={size} oy={CANOPY} visible={(_, y) => y < 2.2}>
      <div
        className="absolute left-0 top-0 w-full"
        style={{
          height: `${size.h * 3.2}px`,
          background:
            "linear-gradient(180deg,#4aa05a 0%,#62b268 6%,#8ccb86 12%,#b8e0a4 17%,#d3ebbd 24%,#d9edc2 34%,#cfe6b4 55%,#bcd99f 80%,#a9cc8a 100%)",
        }}
      />
      {/* texture on the canopy seen from above */}
      <Ribbon path={BUMPS_A} vbW={1200} vbH={60} fill="rgba(34,110,60,0.3)" dur="240s" className="top-[16vh] h-[10vh]" />
      <Ribbon path={BUMPS_B} vbW={1206} vbH={66} fill="rgba(88,170,96,0.3)" dur="300s" className="top-[30vh] h-[12vh]" style={{ left: "-20%" }} />
      {/* sun shafts through the leaves */}
      {[10, 28, 47, 66, 84].map((l, i) => (
        <div
          key={l}
          className="a-ray absolute top-0"
          style={{
            left: `${l}%`,
            width: "8vw",
            height: "120vh",
            background: "linear-gradient(180deg, rgba(255,250,205,0.55), rgba(255,250,205,0))",
            ["--dur" as string]: `${9 + i * 1.6}s`,
            ["--delay" as string]: `${-i * 2}s`,
            transformOrigin: "50% 0%",
          }}
        />
      ))}
    </Layer>

    {/* the branch you walk along, heading right */}
    <Layer cam={cam} size={size} fx={1} fy={1} visible={(_, y) => y > 0.5 && y < 2.1}>
      <svg
        viewBox="0 0 2600 140"
        preserveAspectRatio="none"
        className="absolute left-0 w-[260vw]"
        style={{ top: "123vh", height: "16vh" }}
        aria-hidden
      >
        <path d="M0 70 C200 46 420 92 720 64 S1240 84 1800 56 S2400 74 2600 66" stroke="#5b3a1c" strokeWidth="40" strokeLinecap="round" fill="none" />
        <path d="M0 62 C200 38 420 84 720 56 S1240 76 1800 48 S2400 66 2600 58" stroke="#8a5e33" strokeWidth="14" strokeLinecap="round" fill="none" opacity="0.8" />
        <path d="M900 74 C960 110 1000 124 1060 132 M1600 62 C1640 104 1700 118 1760 124" stroke="#5b3a1c" strokeWidth="14" strokeLinecap="round" fill="none" />
      </svg>
    </Layer>

    {/* leaves close to the lens */}
    <Layer cam={cam} size={size} fx={1.12} fy={1} visible={(_, y) => y > 0.5 && y < 2.1}>
      {LEAVES.map(([x, y, w, r, c, v], i) => (
        <div
          key={i}
          className="a-sway absolute"
          style={{ left: `${x}vw`, top: `${y}vh`, width: w, rotate: `${r}deg`, ["--dur" as string]: `${5 + (i % 4)}s`, ["--delay" as string]: `${-i}s` }}
        >
          <Leaf color={c} vein={v} />
        </div>
      ))}
      {[
        [140, 140, 34],
        [186, 128, 28],
        [60, 150, 30],
      ].map(([x, y, w], i) => (
        <div key={i} className="a-swim absolute" style={{ left: `${x}vw`, top: `${y}vh`, width: w, ["--dur" as string]: `${34 + i * 6}s`, ["--delay" as string]: `${-i * 11}s`, ["--dist" as string]: "50vw", ["--rise" as string]: "-60px" }}>
          <Butterfly />
        </div>
      ))}
    </Layer>

    {/* leaves and pollen drift through everything, in screen space */}
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {FALLING.map((f, i) => (
        <span key={i} className="a-fall absolute top-0 block w-5" style={{ left: `${f.l}%`, ["--dur" as string]: `${f.d}s`, ["--delay" as string]: `${-f.de}s`, ["--sx" as string]: `${f.sx}px` }}>
          <Leaf color={i % 2 ? "#6cbf6c" : "#c9a227"} vein="#3f7a43" />
        </span>
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <span key={i} className="a-rise absolute bottom-[-3vh] h-1.5 w-1.5 rounded-full bg-amber-200/90" style={{ left: `${(i * 11 + 6) % 98}%`, ["--dur" as string]: `${22 + (i % 4) * 5}s`, ["--delay" as string]: `${-i * 3}s`, ["--sx" as string]: `${(i % 2 ? 1 : -1) * 30}px` }} />
      ))}
    </div>

    {/* above the canopy: sky, sun, clouds, birds, the far treeline */}
    <Layer cam={cam} size={size} visible={(_, y) => y < 1.1}>
      <div
        className="absolute left-0 top-0 w-full"
        style={{ height: `${(CANOPY + 0.01) * 100}vh`, background: "linear-gradient(180deg,#8fd0ee 0%,#bfe6f5 52%,#eef7e2 100%)" }}
      />
      <Sun className="absolute" style={{ left: "62%", top: "10vh", width: "34vmin", height: "34vmin" }} />
      <Cloud className="a-drift absolute" fill="#fff" opacity={0.95} style={{ top: "12vh", width: "24vw", ["--dur" as string]: "150s", ["--delay" as string]: "-30s" }} />
      <Cloud className="a-drift absolute" fill="#fff" opacity={0.8} style={{ top: "27vh", width: "18vw", ["--dur" as string]: "190s", ["--delay" as string]: "-110s" }} />
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="a-swim absolute" style={{ top: `${38 + i * 3}vh`, left: `${-10 + i * 5}vw`, width: 30 - i * 3, ["--dur" as string]: `${28 + i * 7}s`, ["--delay" as string]: `${-i * 8}s`, ["--dist" as string]: "120vw" }}>
          <Bird color="#1f3a22" />
        </div>
      ))}
      {/* distant treeline */}
      <Ribbon path={BUMPS_B} vbW={1206} vbH={66} fill="#9fd6a0" dur="400s" className="h-[9vh]" style={{ top: `${CANOPY * 100 - 8.5}vh`, left: "-10%" }} />
    </Layer>

    {/* the treetops on the canopy line */}
    <Layer cam={cam} size={size} oy={CANOPY} visible={(_, y) => y < 1.2}>
      <Ribbon path={BUMPS_B} vbW={1206} vbH={66} fill="#7cc27a" dur="180s" className="top-[-5.4vh] h-[7vh]" style={{ left: "-30%" }} />
      <Ribbon path={BUMPS_A} vbW={1200} vbH={60} fill="#3f9f55" dur="120s" className="top-[-3.6vh] h-[6vh]" />
    </Layer>

    {/* inside the trunk */}
    <Layer cam={cam} size={size} fx={1} fy={1} ox={1} oy={2} visible={(_, y) => y > 1.1}>
      <TrunkInterior />
    </Layer>
  </>
);

export default ForestWorld;
