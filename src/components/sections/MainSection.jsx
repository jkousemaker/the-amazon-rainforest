"use client";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useTransform,
  useMotionTemplate,
  useSpring,
} from "framer-motion";
import SectionVideo from "../SectionVideo";
import { useStore } from "@/store";

import { useState, useRef } from "react";
import useMousePosition from "@/hooks/useMousePosition";
import { cn } from "@/lib/cn";
import Image from "next/image";
import { ScrollText } from "lucide-react";
export default function MainSection() {
  const { loaded, intro } = useStore();

  const section = useRef();
  const { scrollYProgress } = useScroll({
    target: section,
  });
  return (
    <section ref={section} className="h-[300vh] relative overflow-clip">
      <motion.div className="h-screen w-full sticky top-0">
        <div className="size-full relative">
          <Background progress={scrollYProgress} loaded={loaded} />
          <ScrollingText progress={scrollYProgress} />
        </div>
      </motion.div>
    </section>
  );
}

function Background({ progress, loaded }) {
  const MotionImage = motion.create(Image);
  const blur = useTransform(progress, [0.3, 1], [0, 20]);
  const brightness = useTransform(progress, [0, 1], [1, 0.5]);
  const saturate = useTransform(progress, [0, 1], [1, 2.5]);
  const filter = useMotionTemplate`blur(${blur}px) brightness(${brightness}) saturate(${saturate})`;

  const scale = useTransform(progress, [0, 1], [1, 1.5]);

  return (
    <>
      <MotionImage
        layout
        src="/img/hero.jpg"
        fill
        alt="dev"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        layoutId="hero-layout-image"
        className="object-cover [background-position:_50%_70%;] will-change-[transform,_filter]"
        style={{ filter, scale }}
        transition={{
          duration: 0.8,
          ease: [0.84, 0.01, 0.6, 0.9],
        }}
      />

      <motion.div
        layoutId="intro-img"
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{
          duration: 0.5,
          delay: 0,
        }}
        style={{ filter, scale }}
        className="overflow-clip size-full z-10 relative block"
      >
        <SectionVideo />
      </motion.div>
    </>
  );
}

function ScrollingText({ progress }) {
  return (
    <motion.div
      initial={{
        scale: 0.5,
        opacity: 0,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      transition={{
        delay: 0.6,
        duration: 1,
        ease: [0, 0.25, 0, 0.99],
      }}
      className="z-50 top-0 left-0 w-full absolute h-full flex justify-center items-center"
    >
      <Slider progress={progress} />
      <Header progress={progress} />
    </motion.div>
  );
}
function Slider({ progress }) {
  const scaleX = useTransform(progress, [0.7, 0.9, 1], [0, 0.5, 1]);
  return (
    <motion.div
      style={{ scaleX }}
      className="absolute inset-0 z-50 size-full bg-black"
    ></motion.div>
  );
}

function Header({ progress }) {
  const scale = useTransform(progress, [0, 0.5, 1], [1, 10, 40]);
  const origin = {
    x: useTransform(progress, [0, 1], [63, 62.66]),
    y: useTransform(progress, [0, 1], [30, 60]),
  };
  return (
    <motion.h1
      style={{
        scale,
        transformOrigin: useMotionTemplate`${origin.x}% ${origin.y}%`,
      }}
      className="text-9xl whitespace-nowrap  font-semibold tracking-[-0.06em]   "
    >
      Amazon Rainforest
    </motion.h1>
  );
}
