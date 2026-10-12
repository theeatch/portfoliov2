"use client";

import { useSize } from "@/lib/useSize";
import { useWorld } from "@/lib/useWorld";
import ForestWorld from "@/components/world/ForestWorld";
import OceanWorld from "@/components/world/OceanWorld";
import { useJourney } from "./context";

/**
 * Everything behind the content: one continuous world, chosen by theme, that the
 * camera moves through. Dark is the ocean, light is the forest. Only the active
 * world is mounted, so the other costs nothing.
 */
const Backdrop = () => {
  const { cam } = useJourney();
  const size = useSize();
  const { forest } = useWorld();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden transition-opacity duration-700"
      style={{ opacity: size.ready ? 1 : 0, background: forest ? "#d6ecbf" : "#031d38" }}
    >
      {/* keyed on size so every layer's transforms are rebuilt on resize */}
      {forest ? (
        <ForestWorld key={`f${size.w}x${size.h}`} size={size} cam={cam} />
      ) : (
        <OceanWorld key={`o${size.w}x${size.h}`} size={size} cam={cam} />
      )}
    </div>
  );
};

export default Backdrop;
