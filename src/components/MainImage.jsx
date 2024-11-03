"use client";
import { motion } from "framer-motion";
import Image from "next/image";
export default function MainPicture({ card, setIntro }) {
  return (
    <motion.div
      key="current-watch"
      onClick={setIntro}
      layout
      layoutId="main"
      className="overflow-clip size-full z-[999] relative block"
    >
      <Image src="/12.jpg" fill alt="dev" />
    </motion.div>
  );
}
