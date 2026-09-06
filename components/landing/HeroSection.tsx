"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Play, CheckCircle2, X } from "lucide-react";
import { useApp } from "@/context/AppContext";

export function HeroSection() {
  const { theme } = useApp();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <section className="relative w-full overflow-hidden min-h-screen flex items-center pt-28 pb-16 lg:pt-32 lg:pb-20 transition-all duration-300">
      {/* Background Ambient Glow Accent */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Content Grid Container */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left/Center Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start max-w-2xl mx-auto lg:mx-0"
          >
            {/* Hero Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50/90 dark:bg-indigo-950/90 border border-indigo-200/80 dark:border-indigo-800/80 text-[#6366F1] dark:text-indigo-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#6366F1]" />
              AI FOR A SMARTER WORKPLACE
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12]">
              Your Intelligent{" "}
              <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent block">
                Employee Assistant
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl font-normal">
              Get instant answers, find colleagues, access company information, and be more productive — all in one place with the power of AI.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full sm:w-auto pt-2">
              <Link
                href="/assistant"
                className="w-full sm:w-auto px-6 sm:px-7 py-3.5 rounded-2xl bg-[#6366F1] hover:bg-indigo-600 text-white font-bold text-xs sm:text-sm shadow-xl shadow-indigo-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                Get Started for Free
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="w-full sm:w-auto px-5 sm:px-6 py-3.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-800 dark:text-white font-semibold text-xs sm:text-sm hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2.5 shadow-xs"
              >
                <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white flex items-center justify-center">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                Watch Demo
              </button>
            </div>

            {/* Check Points */}
            <div className="pt-2 sm:pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Easy setup
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Trusted by teams
              </span>
            </div>

            {/* Mobile Hero Artwork Image (/hero-img-mobile.png) */}
            <div className="block lg:hidden w-full max-w-sm sm:max-w-md mx-auto -mt-2 sm:-mt-4 pt-0">
              <img
                src="/hero-img-mobile.png"
                alt="WorkWise AI Mobile Assistant"
                className="w-full h-auto object-contain drop-shadow-xl"
              />
            </div>
          </motion.div>

          {/* Right Column: Hero Artwork Image (Displayed Desktop Only) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:flex lg:col-span-5 relative items-center justify-end"
          >
            <div className="relative w-full max-w-none">
              {/* Ambient Glow behind Hero Artwork */}
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-sky-500/20 rounded-3xl blur-3xl pointer-events-none" />

              {/* 3D Robot Assistant Hero Artwork */}
              <img
                src={theme === "dark" ? "/hero-img-dark.png" : "/hero-img-light.png"}
                alt="WorkWise AI Assistant"
                className="relative z-10 w-full h-auto max-h-[580px] object-contain rounded-3xl drop-shadow-2xl transition-all duration-500"
              />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Video Modal Demo */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-2xl w-full shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#6366F1]" />
                WorkWise AI Product Walkthrough
              </h3>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video bg-slate-900 rounded-2xl flex flex-col items-center justify-center text-white space-y-3">
              <Play className="w-12 h-12 text-[#6366F1] animate-bounce" />
              <p className="text-sm font-semibold">Interactive Demo Active</p>
              <Link
                href="/assistant"
                onClick={() => setIsVideoModalOpen(false)}
                className="px-4 py-2 bg-[#6366F1] rounded-xl text-xs font-bold"
              >
                Launch AI Assistant Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
