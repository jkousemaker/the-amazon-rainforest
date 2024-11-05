"use client";
import { useLenis } from "@studio-freight/react-lenis";

import {
  useScroll,
  useMotionValueEvent,
  motion,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { ChevronUp, Mouse } from "lucide-react";
import { useStore } from "@/store";
import { TextShimmer } from "@/components/core/text-shimmer";

export default function ScrollTop() {
  const { scrollYProgress } = useScroll();

  const lenis = useLenis();
  const scrollToTop = () => {
    // You can use either of these methods
    lenis?.scrollTo(0, { lerp: 0.1 }); // 1.5 seconds duration
  };
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        delay: 1.5,
        duration: 0.5,
      }}
    >
      <motion.button
        onClick={scrollToTop}
        className="absolute bottom-0 right-0 m-5 pointer-events-auto bg-white size-14 rounded-full"
      >
        <span className="size-full absolute inset-0">
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="block w-full -rotate-90 pointer-events-none"
          >
            <motion.circle
              cx="50"
              cy="50"
              r="48"
              stroke="black"
              strokeWidth="4"
              fill="none"
              style={{
                pathLength: scrollYProgress,
              }}
            ></motion.circle>
          </svg>
        </span>
        <span className="relative grid place-items-center">
          <ChevronUp size={40} />
        </span>
      </motion.button>

      <ScrollIndicator />
      <ScrollProgress />
    </motion.div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <div className="absolute w-full top-0 left-0">
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="w-full h-1 bg-blue-400 origin-left"
      />
    </div>
  );
}

function ScrollIndicator() {
  return (
    <div className="absolute w-full bottom-0 left-0 flex justify-center font-bold mb-5">
      <TextShimmer
        duration={3}
        spread={10}
        initialPosition={120}
        animatePosition={-20}
        className="text-2xl flex relative [--base-color:theme(colors.black)] [--base-gradient-color:theme(colors.blue.200)]"
      >
        SCROLL DOWN
      </TextShimmer>
    </div>
  );
}
