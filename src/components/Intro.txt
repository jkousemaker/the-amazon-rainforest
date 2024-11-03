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
const rows = [
  [
    {
      id: 0,
      label: "monkey",
      offsets: [
        [0, 1],
        [911, 0],
      ],
      img: "/1.jpg",
    },
    {
      id: 1,
      label: "monkey2",
      offsets: [
        [0, 1],
        [911, 0],
      ],
      img: "/1.jpg",
    },
    {
      id: 2,
      label: "monkey3",
      offsets: [
        [0, 1],
        [911, 0],
      ],
      img: "/1.jpg",
    },
    {
      id: 3,
      label: "monkey4",
      offsets: [
        [0, 1],
        [911, 0],
      ],
      img: "/1.jpg",
    },
    {
      id: 4,
      label: "monkey5",
      offsets: [
        [0, 1],
        [911, 0],
      ],
      img: "/1.jpg",
    },
    {
      id: 5,
      label: "monkey6",
      offsets: [
        [0, 1],
        [911, 0],
      ],
      img: "/1.jpg",
    },
    {
      id: 6,
      label: "monkey7",
      offsets: [
        [0, 1],
        [911, 0],
      ],
      img: "/1.jpg",
    },
  ],
  [
    {
      id: 7,
      label: "elephant",
      offsets: [
        [0, 1],
        [911, 0],
      ],
      img: "/2.jpg",
    },
    {
      id: 8,
      label: "giraffe",
      offsets: [
        [0, 1],
        [911, 0],
      ],
      img: "/3.jpg",
    },
    {
      id: 9,
      label: "tiger",
      offsets: [
        [0, 1],
        [911, 0],
      ],
      img: "/4.jpg",
    },
    {
      id: 10,
      label: "lion",
      offsets: [
        [0, 1],
        [911, 0],
      ],
      img: "/5.jpg",
    },
    {
      id: 11,
      label: "zebra",
      offsets: [
        [0, 1],
        [911, 0],
      ],
      img: "/6.jpg",
    },
    {
      id: 12,
      label: "panda",
      offsets: [
        [0, 1],
        [911, 0],
      ],
      img: "/7.jpg",
    },
    {
      id: 13,
      label: "koala",
      offsets: [
        [0, 1],
        [911, 0],
      ],
      img: "/8.jpg",
    },
  ],
  [
    {
      id: 14,
      label: "kangaroo",
      offsets: [
        [0, 1],
        [911, 0],
      ],
      img: "/9.jpg",
    },
    {
      id: 15,
      label: "penguin",
      offsets: [
        [0, 1],
        [911, 0],
      ],
      img: "/10.jpg",
    },
    {
      id: 16,
      label: "dolphin",
      offsets: [
        [0, 1],
        [911, 0],
      ],
      img: "/11.jpg",
    },
    {
      id: 17,
      label: "shark",
      offsets: [
        [0, 1],
        [911, 0],
      ],
      img: "/12.jpg",
    },
    {
      id: 18,
      label: "whale",
      offsets: [
        [0, 1],
        [911, 0],
      ],
      img: "/13.jpg",
    },
    {
      id: 19,
      label: "eagle",
      offsets: [
        [0, 1],
        [911, 0],
      ],
      img: "/14.jpg",
    },
    {
      id: 20,
      label: "hawk",
      offsets: [
        [0, 1],
        [911, 0],
      ],
      img: "/15.jpg",
    },
  ],
  [
    {
      id: 21,
      label: "owl",
      offsets: [
        [0, 1],
        [911, 0],
      ],
      img: "/16.jpg",
    },
    {
      id: 22,
      label: "snake",
      offsets: [
        [0, 1],
        [911, 0],
      ],
      img: "/17.jpg",
    },
    {
      id: 23,
      label: "lizard",
      offsets: [
        [0, 1],
        [911, 0],
      ],
      img: "/18.jpg",
    },
    {
      id: 24,
      label: "turtle",
      offsets: [
        [0, 1],
        [911, 0],
      ],
      img: "/19.jpg",
    },
    {
      id: 25,
      label: "crocodile",
      offsets: [
        [0, 1],
        [911, 0],
      ],
      img: "/20.jpg",
    },
    {
      id: 26,
      label: "fox",
      offsets: [
        [0, 1],
        [911, 0],
      ],
      img: "/hero.jpg", // Using hero.jpg for remaining images
    },
    {
      id: 27,
      label: "wolf",
      offsets: [
        [0, 1],
        [911, 0],
      ],
      img: "/hero.jpg",
    },
  ],
  [
    {
      id: 28,
      label: "bear",
      offsets: [
        [0, 1],
        [911, 0],
      ],
      img: "/hero.jpg",
    },
    {
      id: 29,
      label: "raccoon",
      offsets: [
        [0, 1],
        [911, 0],
      ],
      img: "/hero.jpg",
    },
    {
      id: 30,
      label: "squirrel",
      offsets: [
        [0, 1],
        [911, 0],
      ],
      img: "/hero.jpg",
    },
    {
      id: 31,
      label: "deer",
      offsets: [
        [0, 1],
        [911, 0],
      ],
      img: "/hero.jpg",
    },
    {
      id: 32,
      label: "rabbit",
      offsets: [
        [0, 1],
        [911, 0],
      ],
      img: "/hero.jpg",
    },
    {
      id: 33,
      label: "mouse",
      offsets: [
        [0, 1],
        [911, 0],
      ],
      img: "/hero.jpg",
    },
    {
      id: 34,
      label: "cat",
      offsets: [
        [0, 1],
        [911, 0],
      ],
      img: "/hero.jpg",
    },
  ],
];
const MotionImage = motion(Image);
const baseAmt = 0.1;
const minAmt = 0.05;
const maxAmt = 0.1;
function Row({ row, index, middleRow, middleRowIndex, onImageLoad }) {
  const screenSize = useScreenSize();
  const mousePosition = useMousePosition();
  const ref = useRef();

  const calculateMappedX = () => {
    return (
      (((mousePosition.x.get() / screenSize.width) * 2 - 1) *
        40 *
        screenSize.width) /
      100
    );
  };

  const numRowItems = middleRow.length;
  const middleRowItemIndex = Math.floor(numRowItems / 2);

  const distanceFromMiddle = Math.abs(index - middleRowIndex);
  const amt = Math.max(baseAmt - distanceFromMiddle * 0.03, minAmt);
  const scaleAmt = Math.min(baseAmt + distanceFromMiddle * 0.03, maxAmt);
  const mouse = calculateMappedX();

  return (
    <>
      {row.map((card, i) => {
        if (row === middleRow && i === middleRowItemIndex) {
          return (
            <div
              key={card.id}
              className="relative size-full overflow-hidden rounded-xl"
            >
              <motion.div
                transition={{
                  layout: { duration: 1, ease: [0.81, 0.04, 0.53, 0.75] },
                }}
                layoutId="main"
                className="overflow-clip size-full z-[999] relative block"
              >
                <MotionImage
                  src="/18.jpg"
                  fill
                  alt="dev"
                  className="object-cover [background-position:_50%_70%;] will-change-[transform,_filter]"
                  onLoad={() => onImageLoad(card.id)}
                />
              </motion.div>
            </div>
          );
        } else {
          return (
            <div key={card.id} className="relative">
              <motion.div className="relative size-full overflow-hidden rounded-xl">
                <Image
                  src={card.img}
                  alt={card.label}
                  placeholder="empty"
                  fill
                  style={{ objectFit: "cover" }}
                  onLoad={() => onImageLoad(card.id)}
                />
              </motion.div>
            </div>
          );
        }
      })}
    </>
  );
}

export default function Intro() {
  const { introLoaded, setIntroLoaded, intro, setIntro } = useStore();
  const ref = useRef();
  const [hasClicked, setHasClicked] = useState(false);
  const screenSize = useScreenSize();
  const [loadedImages, setLoadedImages] = useState(new Set());

  // Calculate total number of images
  const totalImages = rows.reduce((total, row) => total + row.length, 0);

  const handleImageLoad = (imageId) => {
    setLoadedImages((prev) => {
      const newSet = new Set(prev);
      newSet.add(imageId);
      return newSet;
    });
  };

  useEffect(() => {
    if (loadedImages.size === totalImages) {
      setIntroLoaded();
      // Run your initialization code here
      console.log("All images have loaded!");
    }
  }, [loadedImages, totalImages]);

  const mousePosition = useMousePosition();
  const translateXVal = useTransform(
    mousePosition.x,
    [0, screenSize.width],
    [-screenSize.width / 3, screenSize.width / 3]
  );

  const translateXX = useSpring(translateXVal);
  const brightness = useTransform(
    mousePosition.x,
    [0, screenSize.width / 2, screenSize.width],
    [50, 100, 50]
  );

  const contrast = useTransform(
    mousePosition.x,
    [0, screenSize.width / 2, screenSize.width],
    [200, 100, 200]
  );

  const numRows = rows.length;
  const middleRowIndex = Math.floor(numRows / 2);
  const middleRow = rows[middleRowIndex];

  // Only render content when all images are loaded
  return (
    <>
      <motion.div
        layout
        layoutRoot
        style={{
          rotate: -15,
          opacity: introLoaded ? 1 : 0, // Fade in when loaded
        }}
        ref={ref}
        className="grid pointer-events-auto bg-black gap-4 flex-none relative w-[200vw] h-[200vh] grid-rows-[repeat(5,1fr)] grid-cols-[100%] origin-[center_center]"
      >
        {rows.map((row, i) => {
          const translateX = useSpring(translateXVal, { stiffness: 300 });
          const distanceFromMiddle = Math.abs(i - middleRowIndex);
          const amt = Math.max(baseAmt - distanceFromMiddle * 0.03, minAmt);
          const scaleAmt = Math.min(
            baseAmt + distanceFromMiddle * 0.03,
            maxAmt
          );

          return (
            <motion.div
              style={{
                translateX,
                filter: useMotionTemplate`contrast(${contrast}%) brightness(${brightness}%)`,
              }}
              key={i}
              className="grid gap-4 grid-cols-[repeat(7,1fr)] will-change-[transform,filter] size-full"
            >
              <Row
                row={row}
                index={i}
                middleRow={middleRow}
                middleRowIndex={middleRowIndex}
                onImageLoad={handleImageLoad}
              />
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
      <AnimatePresence>
        {!introLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1,
              delay: 0.3,
            }}
            className="fixed inset-0 flex items-center justify-center bg-black z-[999]"
          >
            <motion.div
              className="absolute w-full h-4 bg-green-700 top-0 left-0 origin-left"
              initial={{
                scaleX: 0,
              }}
              animate={{
                scaleX: ((loadedImages.size / totalImages) * 100) / 100,
                transition: {
                  duration: 0.3,
                  ease: [0.81, 0.04, 0.53, 0.75],
                },
              }}
            ></motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
