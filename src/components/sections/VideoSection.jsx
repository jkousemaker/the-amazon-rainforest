"use client";
import { useRef } from "react";
import {
  useScroll,
  motion,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
});
import Logo from "../Logo";
export default function VideoSection() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["-1 1", "0 -0.2"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-100%", "0%"]);
  const transparent = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const black = useTransform(scrollYProgress, [0, 0.6, 1], [200, 100, 0]);
  const maskImage = useMotionTemplate`linear-gradient(to bottom, transparent ${transparent}%, black ${black}%)`;
  const blur = useTransform(scrollYProgress, [0.5, 1], [20, 0]);
  const brightness = useTransform(scrollYProgress, [0.7, 1], [0.5, 1]);
  const saturate = useTransform(scrollYProgress, [0.7, 1], [2.5, 1]);
  const filter = useMotionTemplate`blur(${blur}px) brightness(${brightness}) saturate(${saturate})`;

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.8, 1.5, 1]);
  const logoY = useTransform(scrollYProgress, [0, 1], ["-100%", "0%"]);
  console.log(
    "IN VIDEOSECTION.JSX KEEP BG VIDEO 100VH WITH TEXT ON OP TOP THAT TRANSLATES LIKE THE VIDEO ON SCROILL FROM PREVIOUS SECTION AS WELL AND MAKE THE CONTENTS THAT TELL INFO APPEAR IN A SCALE UP ANIMATION ON SCROLL"
  );
  return (
    <section
      ref={container}
      className="h-[150vh] relative z-50  bg-black text-white mb-"
    >
      <motion.div
        className="relative h-full flex flex-col"
        style={{
          y,
          maskImage,
          filter,
          scale,
        }}
      >
        <ReactPlayer
          url="/hero.mp4"
          loop={true}
          playing={true}
          muted={true}
          playsinline={true}
          controls={false}
          volume={0}
          width="100%"
          height="100%"
          className="react-player h-screen relative"
          onReady={() => {
            setTimeout(() => {
              //setLoaded();
            }, 1500);
          }}
        />
      </motion.div>
    </section>
  );
}
