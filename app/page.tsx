"use client";

import React from "react";
import { HeroSection } from "@/components/landing/HeroSection";

import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { ImpactSection } from "@/components/landing/ImpactSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { CallToActionSection } from "@/components/landing/CallToActionSection";

export default function LandingPage() {
  return (
    <div className="w-full bg-[#F8FAFF] dark:bg-[#0B1020] text-slate-900 dark:text-[#E5E7EB] transition-colors">
      {/* 1. Full-bleed Hero Section */}
      <HeroSection />


      {/* 3. Features Section */}
      <div id="features">
        <FeaturesSection />
      </div>

      {/* 4. How It Works Section */}
      <div id="how-it-works">
        <HowItWorksSection />
      </div>

      {/* 5. Impact Metrics Section */}
      <div id="impact">
        <ImpactSection />
      </div>

      {/* 6. Testimonials Section */}
      <div id="testimonials">
        <TestimonialsSection />
      </div>

      {/* 7. Call To Action Banner */}
      <CallToActionSection />
    </div>
  );
}
