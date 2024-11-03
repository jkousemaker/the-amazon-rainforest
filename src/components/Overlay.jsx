"use client";
import AnimatedCursor from "@/components/AnimatedCursor";
import Preloader from "@/components/Preloader";
import ScrollTop from "@/components/ScrollTop";
import Intro2 from "./Intro2";
import { cn } from "@/lib/cn";
import { AnimatePresence } from "framer-motion";

import { useStore } from "@/store";

import Preloader2 from "./Preloader2";
import Header from "./Header";
export default function Overlay() {
  const { intro, setIntro, introLoaded } = useStore();
  const elements = [
    {
      file: AnimatedCursor,
      zIndex: 9999,
    },
    {
      file: Preloader,
      zIndex: 999,
    },
  ];
  return (
    <>
      <div className="fixed inset-0 size-full  z-[9999] flex pointer-events-none">
        <AnimatePresence>
          <OverlayElement
            key="preloader-wrapper"
            zIndex={99999}
            className="overflow-hidden absolute inset-0 "
          >
            <Preloader2 />
          </OverlayElement>
        </AnimatePresence>
        <OverlayElement
          key="intro-wrapper"
          zIndex={999}
          className="w-full h-screen overflow-hidden relative flex items-center justify-center  after:content-[''] after:absolute after:inset-0 after:size-full  after:bg-[url(/noise.png),radial-gradient(circle,#f9a13275_0%,_transparent_100%)] [background-size:_250px,_100%]"
        >
          {intro && (
            <>
              <Intro2 />
            </>
          )}
        </OverlayElement>

        <OverlayElement zIndex={9999}>
          <AnimatedCursor />
        </OverlayElement>

        <OverlayElement zIndex={10}>
          <ScrollTop />
        </OverlayElement>
      </div>
    </>
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
