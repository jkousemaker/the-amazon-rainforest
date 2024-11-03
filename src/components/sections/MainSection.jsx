"use client";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import SectionVideo from "../SectionVideo";
import { useStore } from "@/store";

import { useState } from "react";
import useMousePosition from "@/hooks/useMousePosition";
import { cn } from "@/lib/cn";
import Image from "next/image";
export default function MainSection() {
  const mousePosition = useMousePosition();
  const [variant, setVariant] = useState("animate");
  const { loaded, intro } = useStore();
  const scale = useMotionValue(2);
  const MotionImage = motion.create(Image);
  return (
    <section className="h-screen relative">
      <motion.div className="absolute inset-0 ">
        {!intro && (
          <MotionImage
            src="/hero.jpg"
            fill
            alt="dev"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            layoutId="hero-layout-image"
            className="object-cover [background-position:_50%_70%;] will-change-[transform,_filter]"
            transition={{
              duration: 1.2,
              ease: [0.84, 0.01, 0.6, 0.9],
            }}
          />
        )}

        <motion.div
          layoutId="intro-img"
          initial={{ opacity: 0 }}
          animate={{ opacity: variant == "continue" ? 1 : 0 }}
          transition={{
            duration: 0.5,
            delay: 0,
          }}
          className="overflow-clip size-full z-10 relative block"
        >
          <SectionVideo />
        </motion.div>
        <div className="z-50 top-0 left-0 w-full absolute h-full flex justify-center items-center">
          <motion.div
            variants={{
              initial: {
                scale: 2,
                y: "200%",
              },
              animate: {
                scale: 1.3,
                y: 0,
              },
              continue: {
                scale: 1,
                y: 0,
              },
            }}
            initial="initial"
            animate={loaded ? variant : "initial"}
            transition={{
              duration: 1.5,

              ease: [0.22, 0.61, 0.36, 1],
            }}
            onAnimationComplete={(definition) => {
              setVariant("continue");
            }}
            className="absolute z-20 "
          >
            <motion.h1
              variants={{
                initial: {
                  color: "black",
                },
                continue: {
                  color: "white",
                },
              }}
              style={{
                rotateY: 10,
              }}
              className="[font-size:_clamp(2em,7vw,10em)]  font-semibold tracking-[-0.06em]  text-white "
            >
              Amazon Rainforest
              <motion.span
                variants={{
                  initial: {
                    opacity: 0,
                  },

                  continue: {
                    opacity: 1,
                  },
                }}
                className=" absolute inset-0 bg-black/70 translate-y-[10%] scale-x-[1.2] scale-y-[1.3] rounded-full -z-10 blur-[2rem]"
              ></motion.span>
            </motion.h1>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
