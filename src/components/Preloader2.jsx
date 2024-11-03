"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import Logo from "./Logo";
import { useStore } from "@/store";
export default function Preloader2() {
  const { introLoaded } = useStore();

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative inset-0 size-full grid place-items-center"
    >
      <div className="size-60 md:size-[18rem]">
        <motion.div
          variants={{
            initial: {
              opacity: 0,
              scale: 0,
            },
            animate: {
              opacity: 1,
              scale: 1,
            },
          }}
          className="relative size-full z-50 "
          transition={{
            type: "spring",
            damping: 9,
            stiffness: 100,
          }}
        >
          <LogoContainer />
        </motion.div>
      </div>

      <motion.div
        variants={{
          initial: {
            y: 0,
          },
          animate: {
            y: 0,
          },
          exit: {
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
