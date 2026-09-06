"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Send } from "lucide-react";

export function HowItWorksSection() {
  const chatMessages = [
    {
      sender: "user",
      text: "What's the leave policy at our company?",
    },
    {
      sender: "ai",
      text: `Our company provides:\n• 18 days of paid annual leave\n• 10 days of sick leave\n• 5 days of casual leave\n• Maternity/Paternity leave as per policy\n\nYou can apply for leave through the HR portal. Let me know if you need any more details!`,
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Ask Anything",
      description: "Type your question or request.",
    },
    {
      number: "2",
      title: "Get AI-Powered Results",
      description: "Receive accurate, instant answers.",
    },
    {
      number: "3",
      title: "Take Action",
      description: "Find people, explore resources, or complete tasks.",
    },
  ];

  return (
    <section className="relative w-full bg-[#F4F0FF]/80 dark:bg-[#070B16] py-16 lg:py-24 my-8 transition-colors duration-300">
      {/* Upward Curve Wave SVG at top edge of full-bleed section background */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-10">
        <svg
          className="relative block w-full h-8 sm:h-12 lg:h-16 text-[#F8FAFF] dark:text-[#0B1020]"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,0 L1440,0 L1440,75 Q 950,15 0,50 Z" />
        </svg>
      </div>

      {/* Content Container (Full width container with standard side padding) */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Title & Timeline Steps */}
          <div className="lg:col-span-5 space-y-8">
            {/* Badge & Title */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-indigo-950/80 border border-indigo-200/80 dark:border-indigo-800/80 text-[11px] font-extrabold uppercase tracking-wider text-[#6366F1] dark:text-indigo-400 backdrop-blur-md shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#6366F1]" />
                HOW IT WORKS
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                Get Answers{" "}
                <span className="block bg-gradient-to-r from-[#6366F1] via-[#7C3AED] to-[#8B5CF6] bg-clip-text text-transparent">
                  in Three Simple Steps
                </span>
              </h2>

              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-normal leading-relaxed">
                Start using WorkWise in minutes and make your workday easier.
              </p>
            </div>

            {/* Timeline Steps with Vertical Connecting Line */}
            <div className="relative space-y-8 pl-2">
              {/* Vertical timeline line */}
              <div className="absolute left-[23px] top-6 bottom-6 w-0.5 bg-indigo-300/80 dark:bg-indigo-900/60 z-0" />

              {steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  viewport={{ once: true }}
                  className="relative z-10 flex gap-5 items-start group"
                >
                  {/* Step Circle Badge */}
                  <div className="w-10 h-10 rounded-full bg-[#6366F1] text-white flex items-center justify-center font-extrabold text-sm shrink-0 shadow-md shadow-indigo-500/25 group-hover:scale-110 transition-transform duration-300">
                    {step.number}
                  </div>

                  {/* Step Title & Subtitle */}
                  <div className="space-y-1 pt-1">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#6366F1] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Live Demo Chat Card */}
          <div className="lg:col-span-7 relative">
            {/* Top-Right Decorative Sparkles Accent */}
            <div className="absolute -top-3 -right-2 z-20 text-amber-500 dark:text-amber-400 animate-pulse pointer-events-none">
              <Sparkles className="w-8 h-8 opacity-90" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="rounded-3xl sm:rounded-[32px] bg-white dark:bg-[#0D1426] border border-slate-200/80 dark:border-indigo-500/30 p-4 sm:p-6 lg:p-8 shadow-2xl backdrop-blur-xl relative space-y-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-4">
                <div className="flex items-center gap-3">
                  {/* Generated 3D Robot Avatar Head */}
                  <img
                    src="/robot-avatar.png"
                    alt="WorkWise AI Robot Avatar"
                    className="w-10 h-10 rounded-2xl object-cover ring-2 ring-indigo-500/30 shrink-0 shadow-md"
                  />
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      WorkWise AI
                    </h4>
                    <span className="text-[11px] text-emerald-500 font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Online
                    </span>
                  </div>
                </div>
              </div>

              {/* Chat Conversation Display */}
              <div className="space-y-4 min-h-[260px] max-h-[360px] overflow-y-auto pr-1 text-xs sm:text-sm">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {/* Robot Avatar on left if AI */}
                    {msg.sender === "ai" && (
                      <img
                        src="/robot-avatar.png"
                        alt="Robot Avatar"
                        className="w-8 h-8 rounded-xl object-cover ring-2 ring-indigo-500/30 shrink-0 mt-1 shadow-xs"
                      />
                    )}

                    {/* Message Bubble */}
                    <div
                      className={`p-4 rounded-2xl max-w-[85%] leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-[#6366F1] text-white rounded-tr-xs shadow-md shadow-indigo-500/20 font-medium"
                          : "bg-slate-100 dark:bg-[#131B2E] text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-800 rounded-tl-xs whitespace-pre-line font-normal"
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* User Avatar on right if User */}
                    {msg.sender === "user" && (
                      <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
                        alt="User Avatar"
                        className="w-8 h-8 rounded-xl object-cover ring-2 ring-indigo-500/30 shrink-0 mt-1 shadow-xs"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Visual-Only Mock Input Bar */}
              <div className="flex items-center gap-3 pt-2 select-none pointer-events-none">
                <div className="flex-1 px-4 py-3 text-xs sm:text-sm rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/80 dark:bg-[#131B2E]/80 text-slate-400 dark:text-slate-500 font-normal">
                  Ask anything...
                </div>
                <div className="w-10 h-10 rounded-2xl bg-[#6366F1] text-white flex items-center justify-center shadow-md shadow-indigo-500/20 shrink-0">
                  <Send className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
