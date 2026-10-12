import { useEffect, useState } from "react";

export type Size = { w: number; h: number };

/** viewport size; `ready` is false until measured (so SSR output isn't trusted) */
export const useSize = () => {
  const [size, setSize] = useState<Size & { ready: boolean }>({ w: 1280, h: 800, ready: false });
  useEffect(() => {
    let raf = 0;
    const read = () => setSize({ w: window.innerWidth, h: window.innerHeight, ready: true });
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return size;
};
