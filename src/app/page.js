"use client";

import SloganSection from "@/components/sections/SloganSection";
import AboutSection from "@/components/sections/AboutSection";
import CardSection from "@/components/sections/CardSection";
import MainSection from "@/components/sections/MainSection";

import { useStore } from "@/store";
import VideoSection from "@/components/sections/VideoSection";
import CardDevSection from "@/components/sections/CardDevSection";
import CarouselSection from "@/components/sections/Carousel";
export default function Home() {
  const { intro } = useStore();
  return (
    <>
      <div className="flex flex-col w-full relative z-50">
        {!intro && (
          <>
            <MainSection />
            <SloganSection />
            <VideoSection />
            <CarouselSection />
            <CardDevSection />
            <CardSection />
            <AboutSection />
          </>
        )}
      </div>
    </>
  );
}
