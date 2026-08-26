"use client";

import { gridItems } from "@/data";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";
import SectionHeading from "./ui/SectionHeading";

const Grid = () => {
  return (
    <section id="about" className="py-20">
      <SectionHeading
        eyebrow="Mission profile"
        title="A little about"
        accent="who I am"
        subtitle="Drag the tech cards around, spin the globe - this panel is meant to be poked at."
      />

      <BentoGrid className="w-full pt-14">
        {gridItems.map((item, i) => (
          <BentoGridItem
            id={item.id}
            key={i}
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
    </section>
  );
};

export default Grid;
