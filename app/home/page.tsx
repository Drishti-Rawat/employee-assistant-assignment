"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import {
  Sparkles,
  ArrowRight,
  Zap,
  Calendar,
  PlusCircle,
  Users,
  FileText,
  Headphones,
  Clock,
  ChevronRight,
  ShieldCheck,
  Megaphone,
  MessageSquare,
  HelpCircle,
  CheckCircle2,
  Lock,
  ExternalLink,
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const { userProfile } = useApp();

  const quickActions = [
    {
      label: "Apply for Leave",
      icon: Calendar,
      bgColor: "bg-[#F0F2FE] dark:bg-indigo-950/50",
      borderColor: "border-indigo-100/80 dark:border-indigo-800/40",
      iconBg: "bg-[#6366F1]/10 text-[#6366F1] dark:text-indigo-400",
      prompt: "How do I apply for leave?",
    },
    {
      label: "Raise a Request",
      icon: PlusCircle,
      bgColor: "bg-[#EBF5FF] dark:bg-blue-950/50",
      borderColor: "border-blue-100/80 dark:border-blue-800/40",
      iconBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      prompt: "How do I submit an HR request?",
    },
    {
      label: "Find a Colleague",
      icon: Users,
      bgColor: "bg-[#E6F8F3] dark:bg-emerald-950/50",
      borderColor: "border-emerald-100/80 dark:border-emerald-800/40",
      iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      href: "/directory",
    },
    {
      label: "Company Policies",
      icon: FileText,
      bgColor: "bg-[#FFF4EC] dark:bg-amber-950/50",
      borderColor: "border-amber-100/80 dark:border-amber-800/40",
      iconBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
      prompt: "What are our core company policies?",
    },
    {
      label: "IT Support",
      icon: Headphones,
      bgColor: "bg-[#FDF0F6] dark:bg-pink-950/50",
      borderColor: "border-pink-100/80 dark:border-pink-800/40",
      iconBg: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
      prompt: "I need help with IT and tech support",
    },
    {
      label: "Book a Room",
      icon: Calendar,
      bgColor: "bg-[#F3EFEF] dark:bg-purple-950/50",
      borderColor: "border-purple-100/80 dark:border-purple-800/40",
      iconBg: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
      prompt: "How do I book a conference room?",
    },
  ];

  const companyUpdates = [
    {
      title: "Office will remain closed on Jan 26",
      desc: "In observance of Republic Day",
      date: "Jan 20, 2026",
      icon: ShieldCheck,
      iconBg: "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400",
    },
    {
      title: "New Health Insurance Policy",
      desc: "Enhanced coverage for you and your family",
      date: "Jan 18, 2026",
      icon: ShieldCheck,
      iconBg: "bg-indigo-50 dark:bg-indigo-950/60 text-[#6366F1] dark:text-indigo-400",
    },
    {
      title: "Townhall Meeting",
      desc: "Join us for Q1 updates and roadmap",
      date: "Jan 16, 2026",
      icon: Users,
      iconBg: "bg-pink-50 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400",
    },
    {
      title: "WorkWise is now live! 🎉",
      desc: "Your AI-powered workplace assistant",
      date: "Jan 12, 2026",
      icon: Sparkles,
      iconBg: "bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400",
    },
  ];

  const recentQueries = [
    { text: "How do I apply for leave?", time: "2h ago" },
    { text: "What is our working policy?", time: "1d ago" },
    { text: "How to set up VPN?", time: "2d ago" },
    { text: "Where can I find payroll info?", time: "3d ago" },
  ];

  const aiPrompts = [
    "What is our leave policy?",
    "How do I apply for remote work?",
    "How do I reset my password?",
    "Tell me about our health insurance.",
    "List upcoming company holidays.",
  ];

  const handleActionClick = (action: typeof quickActions[0]) => {
    if (action.href) {
      router.push(action.href);
    } else if (action.prompt) {
      router.push(`/assistant?query=${encodeURIComponent(action.prompt)}`);
    }
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto p-3 sm:p-5 lg:p-6 space-y-4 sm:space-y-6">
      
      {/* MAIN DASHBOARD GRID (LEFT 8 COLS + RIGHT 4 COLS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        
        {/* LEFT & CENTER COLUMN (8 COLS) */}
        <div className="lg:col-span-8 space-y-4 sm:space-y-6">
          
          {/* 1. HERO BANNER CARD */}
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#EEF2FF] via-[#E8EDFF] to-[#E0E7FF] dark:from-[#1E1B4B]/90 dark:via-[#1E1B4B]/70 dark:to-[#0F172A] border border-indigo-100/90 dark:border-indigo-800/40 p-5 sm:p-8 shadow-xs group">
            
            {/* Background Decorative Blobs */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-indigo-300/20 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 right-1/3 w-48 h-48 bg-purple-300/20 dark:bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Left Content */}
              <div className="md:col-span-7 space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/80 dark:bg-white/10 text-slate-800 dark:text-slate-200 backdrop-blur-xs border border-indigo-200/50 dark:border-white/10 shadow-2xs">
                  <span>Good Morning, {userProfile.name.split(" ")[0]}!</span>
                  <span>☀️</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                  Make work<br />
                  <span className="text-[#6366F1] dark:text-indigo-400">easier, together.</span>
                </h1>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-md">
                  Your intelligent workplace assistant. Ask me anything about company policies, people, tools, or general work queries.
                </p>

                <div className="pt-2">
                  <Link
                    href="/assistant"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#6366F1] hover:bg-indigo-600 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-indigo-500/25 transition-all hover:scale-105 active:scale-95 group/btn"
                  >
                    <span>Ask WorkWise AI</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Right Side Illustration Image Container (Flush-aligned to card bottom right for seamless finish) */}
              <div className="md:col-span-5 relative min-h-[220px] sm:min-h-[260px] flex items-end justify-center md:justify-end">
                <div className="relative z-10 w-full max-w-[340px] sm:max-w-[400px] h-full flex items-end justify-center md:justify-end">
                  <img
                    src="/home-banner.png"
                    alt="WorkWise AI Banner Illustration"
                    className="w-full h-auto object-contain object-bottom drop-shadow-sm"
                  />
                  {/* Subtle Gradient Blend to Eliminate Hard Cutoff Line */}
                  <div className="absolute inset-x-0 -bottom-1 h-3 bg-gradient-to-t from-[#E0E7FF] dark:from-[#0F172A] to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>


          {/* 2. QUICK ACTIONS SECTION */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#6366F1] fill-current" />
                <h2 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                  Quick Actions
                </h2>
              </div>
              <Link
                href="/assistant"
                className="text-xs font-bold text-[#6366F1] dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* 6 Grid Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {quickActions.map((action, idx) => {
                const Icon = action.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleActionClick(action)}
                    className={`flex flex-col items-center justify-center p-3.5 rounded-2xl ${action.bgColor} ${action.borderColor} border shadow-2xs hover:shadow-md transition-all hover:-translate-y-0.5 active:scale-95 group text-center space-y-2`}
                  >
                    <div className={`w-9 h-9 rounded-xl ${action.iconBg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-xs text-slate-800 dark:text-slate-200 leading-tight">
                      {action.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>


          {/* 3. MIDDLE ROW: LEAVE BALANCE & COMPANY UPDATES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* LEAVE BALANCE CARD */}
            <div className="bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-5 shadow-xs flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#6366F1]" />
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    Leave Balance
                  </h3>
                </div>
                <Link
                  href="/assistant?query=What+is+my+leave+balance?"
                  className="text-xs font-bold text-[#6366F1] dark:text-indigo-400 hover:underline flex items-center gap-1"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Counter Number */}
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                    18
                  </span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    days remaining
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1 pt-1">
                  <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex">
                    <div className="h-full bg-gradient-to-r from-[#6366F1] to-indigo-400 rounded-full w-[64%]" />
                  </div>
                  <div className="flex justify-end">
                    <span className="text-[10px] font-bold text-slate-400">18/28</span>
                  </div>
                </div>
              </div>

              {/* Breakdown List */}
              <div className="space-y-2 pt-1 border-t border-slate-100 dark:border-slate-800/60 text-xs font-medium">
                <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#6366F1]" />
                    <span>Annual Leave</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white">18 days</span>
                </div>

                <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>Sick Leave</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white">10 days</span>
                </div>

                <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Casual Leave</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white">5 days</span>
                </div>

                <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-400" />
                    <span>Maternity/Paternity</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white">As per policy</span>
                </div>
              </div>
            </div>


            {/* COMPANY UPDATES CARD */}
            <div className="bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-5 shadow-xs flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Megaphone className="w-4 h-4 text-[#6366F1]" />
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    Company Updates
                  </h3>
                </div>
                <Link
                  href="/assistant?query=What+are+the+latest+company+updates?"
                  className="text-xs font-bold text-[#6366F1] dark:text-indigo-400 hover:underline flex items-center gap-1"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Updates List */}
              <div className="space-y-2.5">
                {companyUpdates.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-start justify-between p-2.5 rounded-2xl bg-slate-50/70 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/60 transition-all hover:bg-slate-100/70 dark:hover:bg-slate-800/60"
                    >
                      <div className="flex items-start gap-2.5">
                        <div className={`w-7 h-7 rounded-xl ${item.iconBg} flex items-center justify-center shrink-0 mt-0.5`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="font-extrabold text-xs text-slate-900 dark:text-white leading-tight">
                            {item.title}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-semibold text-slate-400 shrink-0 ml-2">
                        {item.date}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>


        {/* RIGHT COLUMN: AI ASSISTANT WIDGETS (4 COLS) */}
        <div className="lg:col-span-4 space-y-5 sm:space-y-6">
          
          {/* AI ASSISTANT PROMPT SUGGESTIONS CARD */}
          <div className="bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4.5 h-4.5 text-[#6366F1]" />
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  AI Assistant
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950 text-[#6366F1] dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/40">
                New
              </span>
            </div>

            {/* Prompt Item Links */}
            <div className="space-y-2">
              {aiPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => router.push(`/assistant?query=${encodeURIComponent(prompt)}`)}
                  className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 hover:bg-indigo-50/80 dark:hover:bg-indigo-950/50 border border-slate-100 dark:border-slate-800/60 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all group text-left"
                >
                  <span className="pr-2 leading-snug">{prompt}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#6366F1] group-hover:translate-x-0.5 transition-all shrink-0" />
                </button>
              ))}
            </div>

            {/* Start Conversation Button */}
            <Link
              href="/assistant"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#6366F1] hover:bg-indigo-600 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-indigo-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Start a conversation</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>


          {/* BOTTOM AI ROBOT BANNER CARD */}
          <div className="relative overflow-hidden rounded-3xl bg-[#F0F4FF] dark:bg-[#1E1B4B]/80 border border-indigo-100/90 dark:border-indigo-800/40 shadow-xs min-h-[300px] flex items-end justify-center p-0 group">
            <div className="relative z-10 w-full h-full flex items-end justify-center">
              <img
                src="/home-robot.png"
                alt="AI Robot Assistant"
                className="w-full h-auto max-h-[310px] object-contain object-bottom drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
              />
              {/* Subtle Gradient Blend to Eliminate Cutoff Line */}
              <div className="absolute inset-x-0 -bottom-1 h-3 bg-gradient-to-t from-[#F0F4FF] dark:from-[#1E1B4B] to-transparent pointer-events-none" />
            </div>
          </div>

        </div>

      </div>


      {/* FULL WIDTH RECENT QUERIES SECTION (SPANS ACROSS ALL 12 COLUMNS) */}
      <div className="w-full bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#6366F1]" />
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
              Recent Queries
            </h3>
          </div>
          <Link
            href="/assistant"
            className="text-xs font-bold text-[#6366F1] dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Query Chips */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {recentQueries.map((q, idx) => (
            <button
              key={idx}
              onClick={() => router.push(`/assistant?query=${encodeURIComponent(q.text)}`)}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 hover:bg-indigo-50/80 dark:hover:bg-indigo-950/50 border border-slate-100 dark:border-slate-800/60 transition-all text-left group"
            >
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <Sparkles className="w-3.5 h-3.5 text-[#6366F1] shrink-0" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                  {q.text}
                </span>
              </div>
              <span className="text-[11px] font-semibold text-slate-400 shrink-0">
                {q.time}
              </span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
