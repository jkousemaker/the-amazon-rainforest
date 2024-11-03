"use client";
import { useLenis } from "@studio-freight/react-lenis";
import {
  useScroll,
  useMotionValueEvent,
  motion,
  useTransform,
  useSpring,
} from "framer-motion";
import { ChevronUp } from "lucide-react";
import { useStore } from "@/store";
export default function ScrollTop() {
  const { scrollYProgress } = useScroll();

  const lenis = useLenis();
  const scrollToTop = () => {
    // You can use either of these methods
    lenis?.scrollTo(0, { duration: 1.5 }); // 1.5 seconds duration
  };
  return (
    <motion.button
      onClick={scrollToTop}
      whileHover={{ scale: 1.2 }}
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
  );
}
