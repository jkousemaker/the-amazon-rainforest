"use client";
import React, { use, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { items } from "@/data/carouselitems";

export default function CarouselSection({}) {
  return <Carousel />;
}

function Carousel() {
  const [activeItem, setActiveItem] = useState(items[0]);
  const [width, setWidth] = useState(0);
  const carousel = useRef(null);
  const isInView = useInView(carousel, {
    amount: 0,
    margin: "-200px 0px -200px 0px",
  });
  useEffect(() => {
    console.log(isInView);
  }, [isInView]);
  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, [carousel]);
  const MotionImage = motion.create(Image);
  return (
    <section className="w-full h-screen flex items-center  overflow-hidden relative px-5 bg-[#283e01]">
      <div className="absolute h-full w-5 left-0 top-0 bg-[#283e01] z-[999]"></div>
      <div className="absolute h-full w-5 right-0 top-0 bg-[#283e01] z-[999]"></div>
      <div className="relative flex flex-col w-full">
        <motion.h1
          variants={{
            initial: { filter: "blur(4px)", opacity: 0 },
            view: { filter: "blur(0px)", opacity: 1 },
          }}
          initial="initial"
          whileInView="view"
          transition={{ delay: 0.5, duration: 0.2 }}
          className="text-9xl mb-5 whitespace-nowrap text-white  font-extrabold text-center tracking-[-0.06em]   "
        >
          Discover Our Animals
        </motion.h1>
        <motion.div
          ref={carousel}
          drag="x"
          whileDrag={{ scale: 0.95 }}
          dragElastic={0.2}
          variants={{
            initial: {},
            view: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          dragConstraints={{ right: 0, left: -width }}
          dragTransition={{ bounceDamping: 30 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          initial="initial"
          animate={isInView ? "view" : "initial"}
          className="flex will-change-transform cursor-grab active:cursor-grabbing"
        >
          {items.slice(0, 8)?.map((itemData, index) => {
            return (
              <motion.div
                variants={{
                  initial: { x: 0, scale: 0 },
                  view: { x: 0, scale: 1 },
                  hover: { scale: 1.05 },
                }}
                whileHover="hover"
                key={index}
                className="min-w-[20rem] min-h-[25rem] p-5 origin-top"
              >
                <motion.div className=" size-full relative origin-top">
                  <motion.div
                    variants={{
                      initial: { y: "0%" },
                      hover: { y: "75%" },
                    }}
                    className="w-full  bg-black absolute rounded-md bottom-0 z-10 flex items-end text-xl font-semibold tracking-tight text-white p-5 pt-10 text-balance"
                  >
                    <motion.h3
                      variants={{
                        initial: { filter: "blur(4px)", opacity: 0 },
                        hover: { filter: "blur(0px)", opacity: 1 },
                      }}
                      transition={{ delay: 0 }}
                    >
                      {itemData?.title}
                    </motion.h3>
                  </motion.div>
                  <MotionImage
                    src={itemData?.url}
                    width={400}
                    height={400}
                    alt="img"
                    className="w-full h-full object-cover pointer-events-none relative  rounded-md z-50"
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
