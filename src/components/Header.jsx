"use client";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Logo from "./Logo";
import { useStore } from "@/store";
import { useState, useEffect } from "react";

function useBoundedScroll(threshold) {
  let { scrollY } = useScroll();
  let scrollYBounded = useMotionValue(0);
  let scrollYBoundedProgress = useTransform(
    scrollYBounded,
    [0, threshold],
    [0, 1]
  );

  useEffect(() => {
    return scrollY.on("change", (current) => {
      let previous = scrollY.getPrevious();
      let diff = current - previous;
      let newScrollYBounded = scrollYBounded.get() + diff;

      scrollYBounded.set(clamp(newScrollYBounded, 0, threshold));
    });
  }, [threshold, scrollY, scrollYBounded]);

  return { scrollYBounded, scrollYBoundedProgress };
}

export default function Header() {
  const [scrolledPixels, setScrolledPixels] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("up");
  let { scrollYBoundedProgress } = useBoundedScroll(400);
  let scrollYBoundedProgressDelayed = useTransform(
    scrollYBoundedProgress,
    [0, 0.75, 1],
    [0, 0, 1]
  );
  return (
    <div className="fixed top-0 left-0 w-full">
      <motion.header
        initial="initial"
        animate="animate"
        exit="exit"
        className="relative w-full grid place-items-center  "
      >
        <motion.div
          variants={{
            initial: {
              y: "-100%",
              opacity: 0,
            },
            animate: {
              y: 0,
              opacity: 1,
              transition: {
                type: "tween",
                duration: 1,
                ease: [0.78, 0.15, 0.84, 0.67],
              },
            },
            exit: {
              y: "-100%",
              opacity: 0,
            },
          }}
          style={{
            translateY: useTransform(
              scrollYBoundedProgressDelayed,
              [0, 1],
              ["0%", "-100%"]
            ),
          }}
          className="absolute bg-white/5 backdrop-blur-lg backdrop-saturate-50 backdrop-contrast-150 backdrop-brightness-125 shadow-lg inset-0"
        ></motion.div>
        <div className="relative h-20 w-20">
          <LogoContainer
            scrollYBoundedProgressDelayed={scrollYBoundedProgressDelayed}
          />
        </div>
      </motion.header>
    </div>
  );
}

function LogoContainer({ scrollYBoundedProgressDelayed }) {
  return (
    <motion.div
      layoutId="layout-page-logo"
      transition={{
        layout: {
          type: "spring",
          stiffness: 100,
          damping: 20,
        },
      }}
      style={{
        scale: useTransform(scrollYBoundedProgressDelayed, [0, 1], [1, 0.8]),
      }}
      className="relative z-50 w-full h-full pointer-events-auto !origin-top"
    >
      <Logo />
    </motion.div>
  );
}

let clamp = (number, min, max) => Math.min(Math.max(number, min), max);
