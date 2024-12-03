"use client";
import { useLenis } from "@studio-freight/react-lenis";

import {
  useScroll,
  useMotionValueEvent,
  motion,
  useTransform,
  useSpring,
  AnimatePresence,
  motionValue,
} from "framer-motion";
import { ChevronUp, Mouse } from "lucide-react";
import { useStore } from "@/store";
import { TextShimmer } from "@/components/core/text-shimmer";
import { ScrollProgress as Progress } from "./core/scroll-progress";
export default function ScrollTop() {
  const { scrollYProgress, scrollY } = useScroll();
  const scale = useSpring(0, { stiffness: 200, damping: 20 });
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 2500) {
      scale.set(1);
    } else if (latest < 1000) {
      scale.set(0);
    }
  });
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
        style={{ opacity: scale, scale }}
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
  return (
    <div className="absolute w-full top-0 left-0">
      <Progress
        className="absolute top-0 h-2 w-full z-[999999999999999] bg-[linear-gradient(to_right,rgba(0,0,0,0),#0f1700_75%,#0f1700_100%)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0),#ffffff_75%,#ffffff_100%)]"
        springOptions={{
          stiffness: 280,
          damping: 18,
          mass: 0.3,
        }}
      />
    </div>
  );
}

function ScrollIndicator() {
  return (
    <div className="absolute w-full bottom-0 left-0 flex justify-center font-bold mb-5 z-[99999] pointer-events-auto">
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
