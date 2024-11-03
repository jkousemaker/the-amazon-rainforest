"use client";
import { useEffect, useRef, useState } from "react";
import {
  useMotionValue,
  useSpring,
  motion,
  AnimatePresence,
} from "framer-motion";
import { smoothOptions } from "@/data/transitions";
import getMousePos from "@/hooks/useMousePosition";
export default function AnimatedCursor() {
  const mousePos = getMousePos();
  const smoothMousePosition = {
    x: useSpring(mousePos.x, smoothOptions),

    y: useSpring(mousePos.y, smoothOptions),
  };
  return (
    <motion.div
      style={{
        x: smoothMousePosition.x,
        y: smoothMousePosition.y,
      }}
      className="relative    z-[999999] size-4 bg-black rounded-full pointer-events-none"
    ></motion.div>
  );
}
