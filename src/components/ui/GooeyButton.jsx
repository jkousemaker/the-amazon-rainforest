"use client";
import { ArrowBigRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { motion } from "framer-motion";

export const GooeyButton = ({ children, ...props }) => {
  const letters = children.split("");
  return (
    <>
      <div className="absolute z-[9999999999] w-full h-full flex justify-center items-center [filter:_url('#gooey')]">
        <motion.button
          {...props}
          variants={{
            initial: {
              scale: 0,
            },
            animate: {
              scale: 1,
              transition: {
                delay: 1,
                duration: 1,
                ease: [0.35, 0.39, 0, 0.86],
              },
            },
            hover: {
              scale: 1,
            },
          }}
          initial="initial"
          animate="animate"
          whileHover="hover"
          className="relative bg-black text-gray-200 inline-flex font-bold px-6 py-0 rounded-xl text-xl leading-5 h-16 items-center"
        >
          {letters.map((letter, i) => (
            <span key={i} className="relative flex overflow-hidden">
              <motion.span
                className="relative"
                variants={{
                  initial: {
                    y: "100%",
                  },
                  animate: {
                    y: 0,
                  },
                }}
                initial="initial"
                animate="animate"
                transition={{
                  delay: 1 + i * 0.1,
                  duration: 0.75,
                  ease: [0.45, 0.19, 0.07, 0.8],
                }}
              >
                {letter}
              </motion.span>
            </span>
          ))}

          <div className="absolute left-0 !z-[-10] grid place-items-center size-full">
            <motion.div
              variants={{
                initial: {
                  scale: 0,
                  x: "0%",
                },
                animate: {
                  scale: 0,
                  x: "0%",
                },
                hover: {
                  scale: [1, 1],
                  x: "200%",
                  transition: {
                    type: "tween",
                    duration: 1.5,
                    ease: [0.35, 0.39, 0, 0.86],
                  },
                },
              }}
              transition={{
                type: "tween",
                duration: 1.5,
                ease: [1, 0.15, 0.6, 0.62],
              }}
              className="text-white flex bg-black items-center justify-center h-16 w-16 rounded-xl"
            >
              <ArrowBigRight size={8} className="h-8 w-8" />
            </motion.div>
          </div>
        </motion.button>
      </div>

      <svg
        className="absolute hidden"
        width="0"
        height="0"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <defs>
          <filter id="gooey">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>
    </>
  );
};
