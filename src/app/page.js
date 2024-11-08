"use client";

import SloganSection from "@/components/sections/SloganSection";
import AboutSection from "@/components/sections/AboutSection";
import CardSection from "@/components/sections/CardSection";
import MainSection from "@/components/sections/MainSection";

import { useStore } from "@/store";
import VideoSection from "@/components/sections/VideoSection";
import CardDevSection from "@/components/sections/CardDevSection";
export default function Home() {
  const { intro } = useStore();
  return (
    <>
      {!intro && (
        <div className="flex flex-col w-full">
          <MainSection />

          <SloganSection />
          <VideoSection />
          <CardDevSection />
          <CardSection />

          <AboutSection />
        </div>
      )}
    </>
  );
}
