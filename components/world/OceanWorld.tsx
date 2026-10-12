"use client";

import type { Size } from "@/lib/useSize";
import { Boat, Bird, Cloud, Fish, Jelly, Kelp, Sun } from "./art";
import { SubInterior } from "./Interiors";
import { Layer, Ribbon, type Cam } from "./shared";

/**
 * The ocean, as one continuous world the camera moves through:
 *
 *   y 0.00  sky and the waterline (home)
 *   y 1.00  the shallows (about, then right: the reef with the projects)
 *   y 2.00  inside the submarine (experience)
 *   y 0.45  back near the surface, looking up at the waves (contact)
 *
 * Every moving part is a CSS transform loop or a camera-driven translate.
 */

const WATERLINE = 0.55; // in screen heights, from the top of the world

// repeating swell: 8 humps over 1200 units, tiled twice by <Ribbon/>
const WAVE =
  "M0 30 Q 75 4 150 30 T 300 30 T 450 30 T 600 30 T 750 30 T 900 30 T 1050 30 T 1200 30 T 1350 30 T 1500 30 T 1650 30 T 1800 30 T 1950 30 T 2100 30 T 2250 30 T 2400 30 V60 H0 Z";

const BUBBLES = [
  { l: 6, s: 8, d: 13, de: 0, sx: 24 },
  { l: 14, s: 5, d: 17, de: 5, sx: -18 },
  { l: 23, s: 11, d: 15, de: 9, sx: 30 },
  { l: 36, s: 6, d: 19, de: 2, sx: -26 },
  { l: 47, s: 9, d: 14, de: 7, sx: 16 },
  { l: 58, s: 5, d: 18, de: 11, sx: -22 },
  { l: 67, s: 12, d: 16, de: 4, sx: 28 },
  { l: 76, s: 7, d: 13, de: 10, sx: -16 },
  { l: 85, s: 6, d: 20, de: 1, sx: 20 },
  { l: 93, s: 10, d: 15, de: 6, sx: -30 },
];

// [world x (vw), world y (vh), width (px), dir, duration (s), delay (s), colour, fin]
const NEAR_FISH: [number, number, number, 1 | -1, number, number, string, string][] = [
  [-10, 152, 92, 1, 26, -4, "#7dd3fc", "#38bdf8"],
  [30, 168, 70, 1, 32, -18, "#5eead4", "#14b8a6"],
  [70, 158, 110, -1, 30, -8, "#fde68a", "#f59e0b"],
  [105, 150, 84, 1, 28, -2, "#93c5fd", "#3b82f6"],
  [140, 166, 100, -1, 34, -22, "#7dd3fc", "#0ea5e9"],
  [150, 172, 76, 1, 27, -12, "#fda4af", "#fb7185"],
  [188, 150, 90, -1, 31, -6, "#5eead4", "#0d9488"],
  [215, 160, 104, 1, 36, -26, "#bae6fd", "#38bdf8"],
];

const FAR_FISH: [number, number, number, 1 | -1, number, number][] = [
  [10, 112, 38, 1, 46, -10],
  [60, 140, 30, -1, 52, -30],
  [120, 128, 34, 1, 48, -20],
  [170, 112, 28, -1, 56, -5],
  [210, 146, 36, 1, 50, -35],
];

const OceanWorld = ({ size, cam }: { size: Size; cam: Cam }) => (
  <>
    {/* the water column: sunlit turquoise at the top, black at the bottom */}
    <Layer cam={cam} size={size} oy={WATERLINE} visible={(_, y) => y < 2.2}>
      <div
        className="absolute left-0 top-0 w-full"
        style={{
          height: `${size.h * 3.2}px`,
          background:
            "linear-gradient(180deg,#1485ae 0%,#0d6a95 6%,#09507c 16%,#063a62 30%,#042844 50%,#021a30 75%,#010d1a 100%)",
        }}
      />
      {/* the sun's reflection on the surface, seen from above */}
      <div
        className="absolute"
        style={{
          left: "62%",
          top: 0,
          width: "10vw",
          height: "24vh",
          background: "linear-gradient(180deg, rgba(255,232,160,0.32), rgba(255,232,160,0))",
        }}
      />
      {/* god rays */}
      {[8, 24, 41, 58, 75, 90].map((l, i) => (
        <div
          key={l}
          className="a-ray absolute top-0"
          style={{
            left: `${l}%`,
            width: "7vw",
            height: "130vh",
            background: "linear-gradient(180deg, rgba(190,240,255,0.2), rgba(190,240,255,0))",
            ["--dur" as string]: `${8 + i * 1.7}s`,
            ["--delay" as string]: `${-i * 2}s`,
            transformOrigin: "50% 0%",
          }}
        />
      ))}
    </Layer>

    {/* distant school: small, slow, faint */}
    <Layer cam={cam} size={size} fx={0.55} fy={0.75} visible={(_, y) => y > 0.3 && y < 2.1}>
      {FAR_FISH.map(([x, y, w, dir, dur, delay], i) => (
        <div
          key={i}
          className="a-swim absolute"
          style={{ left: `${x}vw`, top: `${y}vh`, width: w, opacity: 0.35, ["--dur" as string]: `${dur}s`, ["--delay" as string]: `${delay}s`, ["--dist" as string]: `${dir * 60}vw` }}
        >
          <Fish color="#0a4a73" fin="#083a5c" style={{ transform: dir < 0 ? "scaleX(-1)" : undefined }} />
        </div>
      ))}
    </Layer>

    {/* bubbles rise through everything, in screen space */}
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {BUBBLES.map((b, i) => (
        <span
          key={i}
          className="a-rise absolute bottom-[-4vh] rounded-full border border-white/50 bg-white/10"
          style={{
            left: `${b.l}%`,
            width: b.s,
            height: b.s,
            ["--dur" as string]: `${b.d}s`,
            ["--delay" as string]: `${-b.de}s`,
            ["--sx" as string]: `${b.sx}px`,
          }}
        />
      ))}
    </div>

    {/* the reef: fish, jellies, kelp */}
    <Layer cam={cam} size={size} fx={1.12} fy={1} visible={(_, y) => y > 0.3 && y < 2.1}>
      {NEAR_FISH.map(([x, y, w, dir, dur, delay, c, f], i) => (
        <div
          key={i}
          className="a-swim absolute"
          style={{ left: `${x}vw`, top: `${y}vh`, width: w, ["--dur" as string]: `${dur}s`, ["--delay" as string]: `${delay}s`, ["--dist" as string]: `${dir * 80}vw`, ["--rise" as string]: `${(i % 3 - 1) * 24}px` }}
        >
          <Fish color={c} fin={f} style={{ transform: dir < 0 ? "scaleX(-1)" : undefined }} />
        </div>
      ))}
      {[
        [34, 160, 52],
        [92, 176, 64],
        [152, 170, 48],
        [200, 154, 58],
      ].map(([x, y, w], i) => (
        <div
          key={i}
          className="a-bob absolute"
          style={{ left: `${x}vw`, top: `${y}vh`, width: w, ["--dur" as string]: `${6 + i}s`, ["--delay" as string]: `${-i * 2}s` }}
        >
          <Jelly color={i % 2 ? "#99f6e4" : "#bae6fd"} />
        </div>
      ))}
      {Array.from({ length: 16 }, (_, i) => (
        <div
          key={i}
          className="a-sway absolute"
          style={{
            left: `${i * 16 - 6}vw`,
            top: `${200 - (14 + (i % 4) * 4)}vh`,
            height: `${14 + (i % 4) * 4}vh`,
            ["--dur" as string]: `${5 + (i % 5)}s`,
            ["--delay" as string]: `${-i}s`,
          }}
        >
          <Kelp color={i % 3 ? "#0f8f78" : "#1aa38a"} className="h-full w-auto" />
        </div>
      ))}
    </Layer>

    {/* above the water: sky, sun, boat, birds; slides away as we dive */}
    <Layer cam={cam} size={size} visible={(_, y) => y < 1.1}>
      <div
        className="absolute left-0 top-0 w-full"
        style={{
          height: `${(WATERLINE + 0.01) * 100}vh`,
          background: "linear-gradient(180deg,#06193a 0%,#0d3b6b 38%,#2c78a6 76%,#8fd3dc 100%)",
        }}
      />
      <Sun className="absolute" style={{ left: "60%", top: `${WATERLINE * 100 - 17}vh`, width: "30vmin", height: "30vmin" }} />
      <Cloud className="a-drift absolute" fill="#c8e6f5" opacity={0.16} style={{ top: "14vh", width: "26vw", ["--dur" as string]: "150s", ["--delay" as string]: "-40s" }} />
      <Cloud className="a-drift absolute" fill="#c8e6f5" opacity={0.12} style={{ top: "30vh", width: "20vw", ["--dur" as string]: "190s", ["--delay" as string]: "-120s" }} />
      {[0, 1, 2].map((i) => (
        <div key={i} className="a-swim absolute" style={{ top: `${39 + i * 3}vh`, left: `${-10 + i * 6}vw`, width: 30 - i * 5, ["--dur" as string]: `${30 + i * 8}s`, ["--delay" as string]: `${-i * 9}s`, ["--dist" as string]: "120vw" }}>
          <Bird color="#05142b" />
        </div>
      ))}
      {/* a small sailboat on the horizon */}
      <div className="a-bob absolute" style={{ left: "22%", top: `${WATERLINE * 100 - 9}vh`, width: "clamp(56px, 8vw, 110px)", ["--dur" as string]: "5s" }}>
        <Boat />
      </div>
    </Layer>

    {/* the swell on the waterline (and, from below, the underside of the surface) */}
    <Layer cam={cam} size={size} oy={WATERLINE} visible={(_, y) => y < 1.2}>
      <Ribbon path={WAVE} vbW={1200} vbH={60} fill="rgba(143,211,220,0.55)" dur="22s" className="top-[-3.4vh] h-[6vh]" />
      <Ribbon path={WAVE} vbW={1200} vbH={60} fill="rgba(20,133,174,0.9)" dur="14s" className="top-[-1.6vh] h-[5vh]" style={{ left: "-10%" }} />
    </Layer>

    {/* inside the submarine */}
    <Layer cam={cam} size={size} fx={1} fy={1} ox={1} oy={2} visible={(_, y) => y > 1.1}>
      <SubInterior />
    </Layer>
  </>
);

export default OceanWorld;
