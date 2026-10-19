import { useEffect, useRef, useState } from "react";

/** Copies `text` to the clipboard; `copied` reads true for a couple of seconds afterwards. */
export const useCopy = (text: string) => {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = () => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2400);
  };

  return { copied, copy };
};
