"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function CallToActionSection() {
  return (
    <section className="relative w-full bg-[#F4F0FF]/80 dark:bg-[#070B16] pt-4 pb-16 lg:pb-24 transition-colors duration-300">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl sm:rounded-[36px] bg-gradient-to-r from-[#6E4BFC] via-[#7C5CFC] to-[#8B5CF6] p-6 sm:p-10 lg:p-16 text-white shadow-2xl shadow-indigo-500/25 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Decorative background shapes */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none bg-gradient-to-l from-purple-300 via-indigo-300 to-transparent rounded-r-[36px]" />
          <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-purple-400/30 rounded-full blur-2xl pointer-events-none" />

          {/* Left Column: Headline, Subtitle, and Buttons */}
          <div className="lg:col-span-8 space-y-6 relative z-10">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-white/90">
              READY TO GET STARTED?
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-extrabold tracking-tight leading-[1.2] max-w-2xl sm:max-w-3xl">
              <span className="block">A Smarter, Happier Workplace</span>
              <span className="block text-white/95">is Just a Click Away</span>
            </h2>

            <p className="text-white/90 text-sm sm:text-base font-normal max-w-lg">
              Join WorkWise today and experience the power of AI.
            </p>

            {/* Action Buttons right below text */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/assistant"
                className="px-6 py-3.5 rounded-2xl bg-white text-[#6E4BFC] hover:bg-slate-50 font-bold text-sm shadow-xl hover:scale-105 transition-all flex items-center gap-2"
              >
                Get Started for Free
                <ArrowRight className="w-4 h-4 text-[#6E4BFC]" />
              </Link>
              <Link
                href="/assistant"
                className="px-6 py-3.5 rounded-2xl bg-transparent text-white font-semibold text-sm border border-white/40 hover:bg-white/10 backdrop-blur-md transition-all"
              >
                Talk to Sales
              </Link>
            </div>
          </div>

          {/* Right Column: Stylized Script Typography & Sparkle Accent (Desktop Only) */}
          <div className="hidden lg:flex lg:col-span-4 relative z-10 flex-col items-center lg:items-end justify-center select-none pt-4 lg:pt-0">
            <div className="relative text-left space-y-0.5 transform -rotate-[7deg] hover:-rotate-3 transition-transform duration-300">
              {/* Golden/Orange Sparkle icon above text */}
              <div className="absolute -top-7 -right-4 text-amber-300 animate-pulse flex items-center gap-0.5">
                <Sparkles className="w-7 h-7 fill-amber-300/80 stroke-amber-300" />
              </div>

              <div className="font-handwriting text-3xl sm:text-4xl lg:text-[46px] text-white font-bold leading-[1.1] tracking-wide drop-shadow-md">
                <p className="block">Smarter</p>
                <p className="block pl-3">People</p>
                <p className="block">Brighter</p>
                <p className="block pl-3">Tomorrows</p>
              </div>
              <div className="w-16 h-0.5 bg-white/90 rounded-full mt-2 ml-1" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
