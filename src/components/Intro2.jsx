"use client";
import Overlay from "@/components/Overlay";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import useScreenSize from "@/hooks/useScreenSize";
import useMousePosition from "@/hooks/useMousePosition";
import { useStore } from "@/store";
import { cn } from "@/lib/cn";

const MotionImage = motion.create(Image);
import { introImages } from "@/data/introImages";

function Row({ row, index, onImageLoad }) {
  return (
    <>
      {row.map((card, i) => {
        return (
          <motion.div
            key={card.id}
            className="relative size-full overflow-hidden rounded-xl"
          >
            <MotionImage
              priority
              src={card.img}
              fill
              alt="dev"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              layoutId={card.layoutId}
              onLoad={() => onImageLoad(card.id)}
              className="object-cover [background-position:_50%_70%;] will-change-[transform,_filter]"
            />
          </motion.div>
        );
      })}
    </>
  );
}

export default function Intro() {
  const [loadedImages, setLoadedImages] = useState(new Set());
  const { setIntroLoaded, setIntro } = useStore();

  // Calculate total number of images
  const totalImages = introImages.reduce((total, row) => total + row.length, 0);

  const handleImageLoad = (imageId) => {
    setLoadedImages((prev) => {
      const newSet = new Set(prev);
      newSet.add(imageId);
      return newSet;
    });
  };

  useEffect(() => {
    if (loadedImages.size === totalImages) {
      setTimeout(() => {
        setIntroLoaded();
      }, 1000);

      // Run your initialization code here
      console.log("All images have loaded!");
    }
  }, [loadedImages, totalImages]);
  return (
    <>
      <motion.div className="grid pointer-events-auto bg-black gap-4 flex-none relative w-[200vw] h-[200vh] grid-rows-[repeat(5,1fr)] grid-cols-[100%] origin-[center_center] ">
        {introImages.map((row, i) => {
          return (
            <motion.div
              key={i}
              className="grid gap-4 grid-cols-[repeat(7,1fr)] will-change-[transform,filter] size-full"
            >
              <Row row={row} index={i} onImageLoad={handleImageLoad} />
            </motion.div>
          );
        })}
      </motion.div>
      <motion.button
        onClick={() => {
          setIntro(false);
        }}
        className={cn(
          "px-10 py-4 text-sm mx-auto  absolute font-semibold pointer-events-auto bg-orange-400/30 hover:bg-[#0003] transition-all duration-300 ease-in-out rounded-full border-black border  z-20 "
        )}
      >
        EXPLORE
      </motion.button>
    </>
  );
}
