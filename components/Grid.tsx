"use client";

import { gridItems, scenes } from "@/data";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";
import SectionHeading from "./ui/SectionHeading";
import { Scene } from "./journey/Scene";

/** Bar I: a poke-around bento panel. Drag the tech cards. */
const Grid = () => {
  return (
    <Scene className="justify-start sm:justify-center">
      <SectionHeading
        eyebrow={scenes[1].tag}
        title="A little about"
        accent="who I am"
        subtitle="Drag the tech cards around - this panel is meant to be poked at."
      />

      <BentoGrid className="w-full pt-10">
        {gridItems.map((item, i) => (
          <BentoGridItem
            id={item.id}
            key={i}
            delay={i * 0.08}
            title={item.title}
            description={item.description}
            className={item.className}
            img={item.img}
            imgClassName={item.imgClassName}
            titleClassName={item.titleClassName}
            spareImg={item.spareImg}
          />
        ))}
      </BentoGrid>
    </Scene>
  );
};

export default Grid;
