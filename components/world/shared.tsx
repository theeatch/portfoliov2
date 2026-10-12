"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

import type { Size } from "@/lib/useSize";

export type Cam = { x: MotionValue<number>; y: MotionValue<number> };

/**
 * A layer fixed in the world. `fx`/`fy` are parallax factors: 1 moves exactly
 * with the camera, <1 is far away (slides slower), >1 is close.
 * `ox`/`oy` place the layer's origin in the world, in screens.
 * `visible` optionally switches the layer off (display:none) to save paint.
 */
export const Layer = ({
  cam,
  size,
  fx = 0,
  fy = 1,
  ox = 0,
  oy = 0,
  visible,
  className,
  children,
}: {
  cam: Cam;
  size: Size;
  fx?: number;
  fy?: number;
  ox?: number;
  oy?: number;
  visible?: (x: number, y: number) => boolean;
  className?: string;
  children?: React.ReactNode;
}) => {
  const x = useTransform(cam.x, (c) => (ox - c * fx) * size.w);
  const y = useTransform(cam.y, (c) => (oy - c * fy) * size.h);
  const display = useTransform([cam.x, cam.y] as MotionValue<number>[], ([cx, cy]: number[]) =>
    visible && !visible(cx, cy) ? "none" : "block"
  );
  return (
    <motion.div
      aria-hidden
      className={`absolute left-0 top-0 h-full w-full ${className ?? ""}`}
      style={{ x, y, display }}
    >
      {children}
    </motion.div>
  );
};

/** a seamless horizontal ribbon (waves, canopy bumps) scrolling by CSS */
export const Ribbon = ({
  path,
  vbW,
  vbH,
  fill,
  dur,
  className,
  style,
}: {
  path: string;
  vbW: number;
  vbH: number;
  fill: string;
  dur: string;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <div className={`absolute left-0 w-[200%] a-wave ${className ?? ""}`} style={{ ["--dur" as string]: dur, ...style }}>
    <svg viewBox={`0 0 ${vbW * 2} ${vbH}`} preserveAspectRatio="none" className="block h-full w-full">
      <path d={path} fill={fill} />
    </svg>
  </div>
);
