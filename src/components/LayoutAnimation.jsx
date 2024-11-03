"use client";
import { motion } from "framer-motion";
import SectionVideo from "./SectionVideo";
import { useStore } from "@/store";
import Intro from "./Intro";
import { cn } from "@/lib/cn";
export default function LayoutAnimation() {
  const { intro, setIntro } = useStore();
  return <>{intro ? <Intro /> : <Img setIntro={setIntro} />}</>;
}

function Img({ setIntro }) {
  return (
    <motion.div
      onClick={setIntro}
      layoutId="intro-img"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
        delay: 0,
      }}
      className="overflow-clip h-screen size-full z-[999] relative block"
    >
      ;
    </motion.div>
  );
}
