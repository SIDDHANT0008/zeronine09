"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Preloader from "@/components/preloader/Preloader";
import Navigation from "@/components/navigation/Navigation";
import Hero from "@/components/hero/Hero";
import Projects from "@/components/projects/Projects";
import Services from "@/components/services/Services";
import TechStack from "@/components/tech-stack/TechStack";
import Metrics from "@/components/ui/Metrics";
import Process from "@/components/process/Process";
import Studio from "@/components/studio/Studio";
import FinalCTA from "@/components/cta/FinalCTA";
import Footer from "@/components/footer/Footer";
import SectionDivider from "@/components/ui/SectionDivider";
import Marquee from "@/components/ui/Marquee";
import PerformanceBanner from "@/components/ui/PerformanceBanner";

const CustomCursor = dynamic(() => import("@/components/cursor/CustomCursor"), { ssr: false });
const SmoothScroll = dynamic(() => import("@/components/ui/SmoothScroll"), { ssr: false });

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      <CustomCursor />

      <SmoothScroll>
        <main className="relative">
          <Navigation />
          <Hero />
          <Projects />
          <Marquee text="DESIGN · ENGINEER · SCALE · SHIP · ITERATE" />
          <Services />
          <PerformanceBanner />
          <SectionDivider label="How we work" />
          <Metrics />
          <Process />
          <TechStack />
          <Studio />
          <FinalCTA />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
