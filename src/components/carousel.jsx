"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useDragControls } from "framer-motion";
import Image from "next/image";

import { items } from "@/data/carouselitems";
import { Spotlight } from "./core/spotlight";
import CanvasButton from "./ui/CanvasButton";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogImage,
  DialogSubtitle,
  DialogClose,
  DialogDescription,
  DialogContainer,
} from "@/components/core/dialog";
const MotionImage = motion.create(Image);
function Carousel() {
  const controls = useDragControls();

  const [activeItem, setActiveItem] = useState(items[0]);
  const [width, setWidth] = useState(0);
  const carousel = useRef(null);
  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, [carousel]);
  const MotionDialogTrigger = motion.create(DialogTrigger);
  return (
    <motion.div
      layoutScroll
      ref={carousel}
      style={{ width: "100vw", overflow: "scroll" }}
      className="w-full flex"
    >
      <motion.div
        drag="x"
        layout
        className="flex will-change-transform cursor-grab active:cursor-grabbing p-4 gap-6"
      >
        {items?.map((itemData, index) => {
          return <Card key={index} itemData={itemData} index={index} />;
        })}
      </motion.div>
    </motion.div>
  );
}

function Card({ itemData, index }) {
  const triggerRef = useRef(null);
  const [state, setState] = useState(false);
  return (
    <Dialog key={index}>
      <DialogTrigger triggerRef={triggerRef} className="size-full h-full">
        <motion.div
          initial="initial"
          animate="animate"
          whileHover="hover"
          className="min-w-[30rem] min-h-[25rem] overflow-hidden rounded-md relative bg-black"
        >
          <Spotlight
            className="z-[999] !bg-transparent bg-none backdrop-blur-[1px] bg-blend-color-dodge pointer-events-none"
            size={300}
          />
          <motion.div
            variants={{
              initial: {
                scale: 1,
              },
              animate: {
                scale: 1,
                filter: " contrast(1) ",
              },
              hover: {
                scale: 1.1,
                filter: " contrast(1.5) ",
              },
            }}
            transition={{
              type: "tween",
              ease: "easeOut",
              duration: 1,
            }}
          >
            <DialogImage
              src={itemData?.url}
              width={400}
              height={400}
              alt="img"
              className="w-full h-full object-cover pointer-events-none  "
            />
          </motion.div>
          <div className="absolute inset-0 p-10 flex flex-col justify-between items-center">
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
              className="relative top-0 text-white text-3xl mt-7 ml-4 font-semibold tracking-widest z-[9999]"
            >
              {itemData?.title}
            </motion.h3>
            <motion.div
              variants={{
                initial: {
                  opacity: 0,
                },
                hover: {
                  opacity: 1,
                },
              }}
            >
              <CanvasButton ref={triggerRef} className="!z-[999909] relative">
                Discover
              </CanvasButton>
            </motion.div>
          </div>
        </motion.div>
      </DialogTrigger>
      <DialogContainer>
        <DialogContent
          style={{
            borderRadius: "24px",
          }}
          className="pointer-events-auto relative flex h-auto w-full flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900 sm:w-[500px]"
        >
          <DialogImage
            src={itemData?.url}
            width={400}
            height={400}
            alt="img"
            className="w-full h-full object-cover pointer-events-none  "
          />
        </DialogContent>
      </DialogContainer>
    </Dialog>
  );
}

export default Carousel;
