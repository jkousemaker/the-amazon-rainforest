"use client";
import Intro2 from "@/components/Intro2";
import { cn } from "@/lib/cn";
import { AnimatePresence } from "framer-motion";
import { useStore } from "@/store";

export default function IntroWrapper() {
  const { intro, setIntro, introLoaded } = useStore();
  return (
    <AnimatePresence>
      {intro && (
        <OverlayElement
          key="intro-wrapper"
          zIndex={10}
          className="w-full h-screen overflow-hidden absolute z-10 flex items-center justify-center   after:content-[''] after:absolute after:inset-0 after:size-full after:z-[9999]  after:bg-[url(/noise.png),radial-gradient(circle,#f9a13275_0%,_transparent_100%)] [background-size:_250px,_100%]"
        >
          <Intro2 />
        </OverlayElement>
      )}
    </AnimatePresence>
  );
}
function OverlayElement({ children, zIndex, className }) {
  return (
    <div
      className={cn("absolute inset-0 size-full flex-1 ", className)}
      style={{ zIndex }}
    >
      {children}
    </div>
  );
}
