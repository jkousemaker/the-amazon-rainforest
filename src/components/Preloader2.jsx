"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import Logo from "./Logo";
import { useStore } from "@/store";
export default function Preloader() {
  const { introLoaded } = useStore();

  return (
    <motion.div
      initial="open"
      animate={introLoaded ? "closed" : "open"}
      className="fixed z-[999] inset-0 pointer-events-none grid place-items-center"
    >
      <header className="absolute z-50 top-0 left-0 w-full grid place-items-center">
        {introLoaded && (
          <div className="relative h-20 w-20">
            <LogoContainer />
          </div>
        )}
      </header>
      {!introLoaded && (
        <div className="size-60 md:size-[18rem]">
          <motion.div
            className="relative size-full z-50 "
            initial={{ scale: 0, opacity: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              damping: 9,
              stiffness: 100,
            }}
          >
            <LogoContainer />
          </motion.div>
        </div>
      )}
      <motion.div
        variants={{
          open: {
            y: 0,
          },
          closed: {
            y: "-100%",
          },
        }}
        transition={{
          type: "tween",
          duration: 1,
          ease: [0.78, 0.15, 0.84, 0.67],
        }}
        className="absolute z-0 inset-0 bg-accent pointer-events-auto"
      ></motion.div>
    </motion.div>
  );
}

function LogoContainer() {
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
      className="relative z-50 w-full h-full pointer-events-auto"
    >
      <Logo />
    </motion.div>
  );
}

function Header() {
  const { introLoaded } = useStore();
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
