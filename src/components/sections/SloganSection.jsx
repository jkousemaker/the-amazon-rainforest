"use client";
import { useRef } from "react";
import { useScroll } from "framer-motion";
import Paragraph from "../scroll-opacity/Character";
export default function SloganSection() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,

    offset: ["start 0.9", "start 0.25"],
  });
  return (
    <section
      ref={container}
      className="h-screen grid place-items-center bg-black text-white"
    >
      <Paragraph
        paragraph={
          "Enter the world of the Amazon Rainforest, a world where you can freely explore the most amazing species that exist in the wonders of the forest."
        }
      />
    </section>
  );
}
