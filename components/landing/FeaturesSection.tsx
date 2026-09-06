"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Users, BarChart3, Settings, Sparkles } from "lucide-react";
import { FeatureCard, FeatureItem } from "@/components/landing/FeatureCard";

export function FeaturesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const features: FeatureItem[] = [
    {
      id: "ai-chat",
      title: "AI Chat Assistant",
      description: "Get instant answers about policies, tools, leaves, and more.",
      icon: MessageSquare,
      link: "/assistant",
      accent: "purple",
    },
    {
      id: "directory",
      title: "Employee Directory",
      description: "Find and connect with colleagues across the organization.",
      icon: Users,
      link: "/directory",
      accent: "emerald",
    },
    {
      id: "analytics",
      title: "Analytics & Insights",
      description: "Understand your organization with real-time data and visualizations.",
      icon: BarChart3,
      link: "/analytics",
      accent: "amber",
    },
    {
      id: "settings",
      title: "Personalized Experience",
      description: "Customize your profile, preferences, and notifications.",
      icon: Settings,
      link: "/settings",
      accent: "blue",
    },
  ];

  return (
    <section className="space-y-10 py-12 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50/80 dark:bg-indigo-950/80 border border-indigo-200/80 dark:border-indigo-800/80 text-[11px] font-extrabold uppercase tracking-wider text-[#6366F1] dark:text-indigo-400 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#6366F1]" />
          FEATURES
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          Everything You Need{" "}
          <span className="block bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
            in One Assistant
          </span>
        </h2>

        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-normal max-w-xl mx-auto leading-relaxed">
          From answering questions to finding the right people, WorkWise helps you get things done faster.
        </p>
      </div>

      {/* Feature Cards Grid using Reusable FeatureCard */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {features.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </motion.div>
    </section>
  );
}
