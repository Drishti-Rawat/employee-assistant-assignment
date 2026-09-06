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
    <section className="relative w-full overflow-hidden min-h-screen lg:h-screen flex items-center transition-all duration-300 pt-24 pb-12 lg:pt-0 lg:pb-0">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-400/8 dark:bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* RIGHT: Full-height Image — absolutely fills the right half, stretches top to bottom */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="hidden lg:block absolute inset-y-0 right-0 w-[55%] pointer-events-none"
      >
        {/* The image itself fills the full height */}
        <img
          src={theme === "dark" ? "/hero-img-dark.png" : "/hero-img-light.png"}
          alt="WorkWise AI Assistant"
          className="absolute inset-0 w-full h-full object-cover object-left transition-all duration-500"
        />

        {/* LEFT-SIDE BLEND GRADIENT — soft feather only at the very edge */}
        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#F8FAFF] via-[#F8FAFF]/40 to-transparent dark:from-[#0B1020] dark:via-[#0B1020]/30 dark:to-transparent pointer-events-none" />

        {/* TOP BLEND */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#F8FAFF] dark:from-[#0B1020] to-transparent pointer-events-none" />

        {/* BOTTOM BLEND */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#F8FAFF] dark:from-[#0B1020] to-transparent pointer-events-none" />
      </motion.div>

      {/* LEFT: Text Content — sits on top of everything */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="max-w-xl space-y-7 text-center lg:text-left flex flex-col items-center lg:items-start mx-auto lg:mx-0"
        >
          {/* Hero Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50/90 dark:bg-indigo-950/90 border border-indigo-200/80 dark:border-indigo-800/80 text-[#6366F1] dark:text-indigo-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#6366F1]" />
            AI FOR A SMARTER WORKPLACE
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1]">
            Your Intelligent{" "}
            <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent block">
              Employee Assistant
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Get instant answers, find colleagues, access company information, and be more productive — all in one place with the power of AI.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <Link
              href="/assistant"
              className="px-5 sm:px-7 py-3 sm:py-3.5 rounded-2xl bg-[#6366F1] hover:bg-indigo-600 text-white font-bold text-xs sm:text-sm shadow-xl shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              Get Started for Free
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={() => setIsVideoModalOpen(true)}
              className="px-4 sm:px-6 py-3 sm:py-3.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md text-slate-800 dark:text-white font-semibold text-xs sm:text-sm hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center gap-2.5 shadow-xs"
            >
              <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white flex items-center justify-center">
                <Play className="w-3 h-3 fill-current ml-0.5" />
              </div>
              Watch Demo
            </button>
          </div>

          {/* Check Points */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 lg:gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
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
        </motion.div>

          {/* Mobile/Tablet Hero Image — shown below text on small screens */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="block lg:hidden w-full max-w-xs sm:max-w-sm mx-auto mt-8"
          >
            <img
              src="/hero-img-mobile.png"
              alt="WorkWise AI Mobile"
              className="w-full h-auto object-contain drop-shadow-xl"
            />
          </motion.div>
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
