"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import { items } from "@/data/carouselitems";

const MotionImage = motion.create(Image);
function Carousel() {
  const [activeItem, setActiveItem] = useState(items[0]);
  const [width, setWidth] = useState(0);
  const carousel = useRef(null);
  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, [carousel]);
  return (
    <div className="w-full overflow-hidden">
      <motion.div
        ref={carousel}
        drag="x"
        whileDrag={{ scale: 0.95 }}
        dragElastic={0.2}
        dragConstraints={{ right: 0, left: -width }}
        dragTransition={{ bounceDamping: 30 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="flex will-change-transform cursor-grab active:cursor-grabbing p-4 gap-4"
      >
        {items?.map((itemData, index) => {
          return (
            <motion.div
              variants={{
                initial: {
                  opacity: 0,
                },
                animate: {
                  opacity: 1,
                },
                hover: {
                  opacity: 1,
                },
              }}
              initial="initial"
              animate="animate"
              whileHover="hover"
              key={index}
              className="min-w-[20rem] min-h-[25rem] overflow-hidden rounded-md relative"
            >
              <MotionImage
                variants={{
                  initial: {
                    scale: 1,
                  },
                  animate: {
                    scale: 1,
                  },
                  hover: {
                    scale: 1.1,
                    filter: "blur(2px) contrast(1.1) brightness(1.1)",
                  },
                }}
                transition={{
                  type: "tween",
                  ease: "easeOut",
                }}
                src={itemData?.url}
                width={400}
                height={400}
                alt="img"
                className="w-full h-full object-cover pointer-events-none  "
              />
              <motion.h3
                variants={{
                  initial: {
                    opacity: 0,
                    filter: "blur(8px)",
                  },
                  animate: {
                    opacity: 0,
                    filter: "blur(8px)",
                  },
                  hover: {
                    opacity: 1,
                    filter: "blur(0px)",
                  },
                }}
                transition={{
                  type: "tween",
                  ease: "easeOut",
                  duration: 0.5,
                }}
                className="absolute top-0 text-white text-3xl mt-7 ml-4 font-semibold tracking-widest"
              >
                {itemData?.title}
              </motion.h3>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
export default Carousel;
