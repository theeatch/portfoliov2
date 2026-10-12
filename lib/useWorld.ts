"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

/**
 * Which world we're in: the ocean (dark, the default) or the forest (light).
 * The server always renders the ocean, so until the client has mounted we say
 * "ocean" too; otherwise a saved light theme would hydrate differently from the
 * HTML it was sent.
 */
export const useWorld = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const world: "ocean" | "forest" = mounted && resolvedTheme === "light" ? "forest" : "ocean";
  return { world, forest: world === "forest", ocean: world === "ocean" };
};
