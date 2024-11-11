"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import Logo from "./Logo";
import { useStore } from "@/store";
export default function Preloader2() {
  const { introLoaded } = useStore();

  return (
    <motion.div
      initial="open"
      animate={introLoaded ? "closed" : "open"}
      className="fixed z-[999] inset-0 pointer-events-none grid place-items-center"
    >
      <header className="absolute z-50 top-0 left-0 w-full grid place-items-center pt-2">
        <motion.div
          layout
          className="bg-white px-2"
          style={{ borderRadius: "999px" }}
        >
          {introLoaded && (
            <motion.div className="relative h-20 w-20">
              <LogoContainer />
            </motion.div>
          )}
        </motion.div>
      </header>
      {!introLoaded && (
        <div className="size-60 md:size-[18rem]">
          <motion.div
            className="relative size-full z-50 "
            initial={{ scale: 0, opacity: 0, rotate: 180 }}
            animate={{ opacity: 1, scale: 1, rotate: 360 }}
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
        className="absolute z-0 inset-0 bg-slate-950 pointer-events-auto"
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
