"use client";
import {
  useScroll,
  motion,
  useTransform,
  useMotionValueEvent,
  useMotionTemplate,
} from "framer-motion";
import { useRef } from "react";

export default function ScrollSection() {
  const ref = useRef();
  const { scrollYProgress } = useScroll({
    target: ref,
  });

  return (
    <section ref={ref} className="h-[300vh]">
      <div className="h-screen sticky top-0 grid place-items-center">
        <Slider scrollYProgress={scrollYProgress} />
        <Header scrollYProgress={scrollYProgress} />
      </div>
    </section>
  );
}

function Slider({ scrollYProgress }) {
  const scaleX = useTransform(scrollYProgress, [0.8, 1], [0, 1]);
  return (
    <motion.div
      style={{ scaleX }}
      className="absolute inset-0 z-50 size-full bg-black"
    ></motion.div>
  );
}

function Header({ scrollYProgress }) {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 40]);
  const origin = {
    x: useTransform(scrollYProgress, [0, 1], [63, 62.6]),
    y: useTransform(scrollYProgress, [0, 1], [30, 60]),
  };
  return (
    <motion.h1
      style={{
        scale,
        transformOrigin: useMotionTemplate`${origin.x}% ${origin.y}%`,
      }}
      className="text-9xl  font-semibold tracking-[-0.06em]   "
    >
      Amazon Rainforest
    </motion.h1>
  );
}
