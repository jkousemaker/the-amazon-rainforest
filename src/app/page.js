"use client";
import Image from "next/image";
import Logo from "@/components/Logo";
//import MainSection from "@/components/sections/MainSection";
import dynamic from "next/dynamic";
import SloganSection from "@/components/sections/SloganSection";
import AboutSection from "@/components/sections/AboutSection";
import CardSection from "@/components/sections/CardSection";
import MainSection from "@/components/sections/MainSection";
import ScrollSection from "@/components/sections/ScrollSection";
import { motion } from "framer-motion";
import SectionVideo from "@/components/SectionVideo";
import { useStore } from "@/store";
export default function Home() {
  const { intro, loaded } = useStore();
  return (
    <>
      {!intro && (
        <div className="flex flex-col w-full">
          <MainSection />
          <ScrollSection />

          <SloganSection />
          <CardSection />

          <AboutSection />
        </div>
      )}
    </>
  );
}
