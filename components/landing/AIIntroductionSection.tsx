"use client";

import React from "react";
import Link from "next/link";
import { Brain, Mic, FileText, ChevronRight } from "lucide-react";

export function AIIntroductionSection() {
  return (
    <section className="space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-widest text-amber-800 dark:text-amber-400">
          Smart Conversational Core
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">
          Built for Modern Workplaces
        </h2>
        <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base">
          WorkWise AI connects seamlessly with employee documentation, directory profiles, and organizational metrics to deliver immediate results.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="p-7 rounded-3xl bg-white dark:bg-[#24201D] border border-amber-200/60 dark:border-stone-800 shadow-xs hover:shadow-xl hover:border-amber-400/50 transition-all duration-300 space-y-4 group">
          <div className="w-12 h-12 rounded-2xl bg-amber-100/80 dark:bg-amber-950/80 text-amber-800 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform font-bold">
            <Brain className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-white">Natural Policy Q&A</h3>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
            Ask complex HR policy questions, leave rules, remote stipends, or expense guidelines in plain English.
          </p>
          <div>
            <Link href="/assistant" className="text-xs font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1 hover:gap-2 transition-all">
              Try Q&A Assistant <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-7 rounded-3xl bg-white dark:bg-[#24201D] border border-amber-200/60 dark:border-stone-800 shadow-xs hover:shadow-xl hover:border-amber-400/50 transition-all duration-300 space-y-4 group">
          <div className="w-12 h-12 rounded-2xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 flex items-center justify-center group-hover:scale-110 transition-transform font-bold">
            <Mic className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-white">Voice Command Input</h3>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
            Hands-free interaction using built-in speech recognition. Speak your query and view instant answers.
          </p>
          <div>
            <Link href="/assistant" className="text-xs font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1 hover:gap-2 transition-all">
              Test Microphone <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-7 rounded-3xl bg-white dark:bg-[#24201D] border border-amber-200/60 dark:border-stone-800 shadow-xs hover:shadow-xl hover:border-amber-400/50 transition-all duration-300 space-y-4 group">
          <div className="w-12 h-12 rounded-2xl bg-amber-100/80 dark:bg-amber-950/80 text-amber-800 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform font-bold">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-white">Automated Draft Generation</h3>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
            Draft onboarding emails, team announcements, meeting agendas, and performance outlines effortlessly.
          </p>
          <div>
            <Link href="/assistant" className="text-xs font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1 hover:gap-2 transition-all">
              Generate Drafts <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
