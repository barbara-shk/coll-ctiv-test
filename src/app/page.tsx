"use client";

import { useRef } from "react";
import styled from "styled-components";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Hero } from "@/components/site/Hero";
import {
  FaqSection,
  FeaturesSection,
  HowItWorksSection,
  PurpleStorySection,
  StatsBanner,
  TestimonialsSection,
} from "@/components/site/Sections";

const Main = styled.main`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.white};
`;

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);

  const scrollToHero = () => {
    heroRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Main>
      <SiteHeader onCtaClick={scrollToHero} />
      <div ref={heroRef}>
        <Hero />
      </div>
      <PurpleStorySection />
      <HowItWorksSection />
      <FeaturesSection />
      <TestimonialsSection />
      <StatsBanner />
      <FaqSection />
      <SiteFooter />
    </Main>
  );
}
