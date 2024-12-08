"use client";
import { useEffect, useRef, useState } from "react";
import {
  useMotionValue,
  useSpring,
  motion,
  AnimatePresence,
  useVelocity,
  useTransform,
} from "framer-motion";
import { smoothOptions } from "@/data/transitions";
import getMousePos from "@/hooks/useMousePosition";
import MouseSVG from "./MouseSvg";
export default function AnimatedCursor() {
  const mousePos = getMousePos();
  const opacity = useMotionValue(0);
  const smoothMousePosition = {
    x: useSpring(mousePos.x, smoothOptions),

    y: useSpring(mousePos.y, smoothOptions),
  };
  const velocity = useVelocity(smoothMousePosition.x);
  const rotate = useTransform(velocity, [0, 1000], [0, 30], {
    clamp: false,
  });

  useEffect(() => {
    console.log(mousePos);
    const timeout = setTimeout(() => {
      opacity.set(1);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  });
  return (
    <motion.div
      style={{
        x: smoothMousePosition.x,
        y: smoothMousePosition.y,
        rotate,
        opacity,
      }}
      className="relative    z-[999999] size-10 rounded-full pointer-events-none"
    >
      <MouseSVG />
    </motion.div>
  );
}
