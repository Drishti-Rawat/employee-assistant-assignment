"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import {
  Sparkles,
  Users,
  BarChart3,
  Settings,
  Bot,
  Sun,
  Moon,
  Menu,
  X,
  ChevronRight,
  Search,
  Zap,
  Home,
  ShieldCheck,
  PlusCircle,
  FileText,
  HelpCircle,
  Settings2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme, userProfile, chatSessions } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [quickSearch, setQuickSearch] = useState("");

  const isLandingPage = pathname === "/";

  const navigationItems = [
    { name: "Home", href: "/home", icon: Home, badge: null },
    { name: "AI Assistant", href: "/assistant", icon: Bot, badge: "AI" },
    { name: "Employee Directory", href: "/directory", icon: Users, badge: "12" },
    { name: "Analytics", href: "/analytics", icon: BarChart3, badge: "Live" },
    { name: "Profile", href: "/settings", icon: Settings2, badge: null },

  ];

  const handleQuickSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickSearch.trim()) return;
    router.push(`/assistant?query=${encodeURIComponent(quickSearch)}`);
    setQuickSearch("");
  };

  // 1. LANDING PAGE LAYOUT (FULL PAGE WIDTH, NO SIDEBAR, EXACT SPEC HEADER & FOOTER)
  if (isLandingPage) {
    return (
      <div className="min-h-screen bg-[#F8FAFF] dark:bg-[#0B1020] text-slate-900 dark:text-[#E5E7EB] flex flex-col relative transition-colors duration-300">
        <LandingHeader />
        <main className="flex-1 w-full bg-[#F8FAFF] dark:bg-[#0B1020]">{children}</main>
        <LandingFooter />
      </div>
    );
  }

  // 2. DASHBOARD APP LAYOUT (FLEXBOX H-SCREEN WITH PERFECT INDEPENDENT SIDEBAR & CONTENT SCROLLING)
  return (
    <div className="h-screen max-h-screen w-full bg-[#F8FAFF] dark:bg-[#0B1020] text-slate-900 dark:text-[#E5E7EB] flex flex-col overflow-hidden transition-colors duration-300">
      {/* Top Fixed Dashboard Header */}
      <header className="shrink-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-[#111827]/90 backdrop-blur-xl px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-2xs">
        {/* Brand Logo & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle Navigation"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href="/home" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-[#6366F1] flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
                  WorkWise
                </span>
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  AI
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Global Quick AI Search Bar with Ctrl K Badge */}
        <form
          onSubmit={handleQuickSearchSubmit}
          className="hidden md:flex items-center relative max-w-md w-full mx-4"
        >
          <Search className="w-4 h-4 absolute left-3.5 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            value={quickSearch}
            onChange={(e) => setQuickSearch(e.target.value)}
            placeholder="Search policies, people, tools..."
            className="w-full pl-9 pr-24 py-1.5 text-xs sm:text-sm rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 focus:bg-white dark:focus:bg-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#6366F1]/50 transition-all placeholder:text-slate-400 font-medium"
          />
          <div className="absolute right-2 flex items-center gap-1">
            <kbd className="hidden lg:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-semibold text-slate-400 bg-slate-200/60 dark:bg-slate-800 rounded border border-slate-300/50 dark:border-slate-700">
              Ctrl K
            </kbd>
            <button
              type="submit"
              className="px-2.5 py-1 text-xs font-medium bg-[#6366F1] hover:bg-indigo-600 text-white rounded-full transition-colors flex items-center gap-1 shadow-xs"
            >
              <Zap className="w-3 h-3 fill-current" />
              Ask
            </button>
          </div>
        </form>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-800/60 transition-all"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
            ) : (
              <Moon className="w-4 h-4 text-[#6366F1]" />
            )}
          </button>

          {/* User Profile Button */}
          <div className="relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-200/60 dark:border-slate-800/60 transition-all"
            >
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-7 h-7 rounded-lg object-cover ring-2 ring-indigo-500/30"
              />
              <span className="hidden lg:inline text-xs font-semibold text-slate-700 dark:text-slate-200">
                {userProfile.name}
              </span>
              <ChevronRight className={cn("w-3.5 h-3.5 text-slate-400 transition-transform", isProfileMenuOpen && "rotate-90")} />
            </button>

            {/* Profile Dropdown */}
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{userProfile.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{userProfile.email}</p>
                  <span className="mt-1 inline-block text-[10px] font-semibold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-[#6366F1] dark:text-indigo-400">
                    {userProfile.position}
                  </span>
                </div>
                <div className="py-1">
                  <Link
                    href="/settings"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <Settings className="w-4 h-4 text-slate-400" />
                    Account Settings
                  </Link>
                  <Link
                    href="/assistant"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <Bot className="w-4 h-4 text-[#6366F1]" />
                    AI Assistant ({chatSessions.length})
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Body with Desktop Sidebar */}
      <div className="flex-1 flex min-h-0 overflow-hidden relative">
        {/* Desktop Sidebar (Fills exact remaining vertical height) */}
        <aside className="hidden md:flex flex-col w-64 h-full shrink-0 border-r border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#0F172A]/95 p-3.5 justify-between overflow-hidden">
          {/* Navigation List */}
          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-all group",
                    isActive
                      ? "bg-[#6366F1] text-white shadow-md shadow-indigo-600/20 font-bold"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cn("w-4.5 h-4.5 transition-transform group-hover:scale-110", isActive ? "text-white" : "text-slate-400 dark:text-slate-500")} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={cn(
                        "text-[10px] px-2 py-0.5 rounded-full font-bold",
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-indigo-50 dark:bg-indigo-950 text-[#6366F1] dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/40"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Card */}
          <div className="pt-2">
            <div className="relative overflow-hidden p-4 rounded-3xl bg-[#EEF2FF] dark:bg-indigo-950/40 border border-indigo-100/80 dark:border-indigo-800/40 shadow-2xs group min-h-[125px] flex items-center justify-between">

              {/* Decorative Indigo Sparkle Accents */}
              <div className="absolute top-3 right-8 text-[#6366F1] dark:text-indigo-400 pointer-events-none">
                <Sparkles className="w-5 h-5 fill-[#6366F1]/20 dark:fill-indigo-400/20 animate-pulse" />
              </div>
              <div className="absolute bottom-3 left-12 text-[#6366F1]/50 dark:text-indigo-400/50 pointer-events-none">
                <Sparkles className="w-3.5 h-3.5" />
              </div>

              {/* Left Column: Stacked Bold Typography */}
              <div className="relative z-10 space-y-0 max-w-[110px]">
                <p className="font-extrabold text-sm sm:text-base leading-[1.25] text-slate-900 dark:text-white tracking-tight">
                  Smarter<br />
                  People<br />
                  Brighter<br />
                  Tomorrows
                </p>
              </div>

              {/* Right Side: Robot Image (Flipped horizontally towards left) */}
              <div className="absolute -right-2 -bottom-2 w-28 h-28 pointer-events-none">
                <img
                  src="/robot-1.png"
                  alt="WorkWise Robot"
                  className="w-full h-full object-contain drop-shadow-md -scale-x-100 group-hover:-scale-x-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden bg-slate-950/60 backdrop-blur-xs flex">
            <div className="w-4/5 max-w-xs bg-white dark:bg-[#111827] h-full p-5 flex flex-col justify-between shadow-2xl animate-in slide-in-from-left duration-200">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#6366F1]" />
                    <span className="font-bold text-base text-slate-900 dark:text-white">
                      WorkWise AI
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>

                <nav className="space-y-1.5">
                  {navigationItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all",
                          isActive
                            ? "bg-[#6366F1] text-white font-semibold"
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5" />
                          <span>{item.name}</span>
                        </div>
                        {item.badge && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-[#6366F1] dark:text-indigo-300">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    className="w-9 h-9 rounded-xl object-cover"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{userProfile.name}</p>
                    <p className="text-[10px] text-slate-500">{userProfile.position}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)} />
          </div>
        )}

        {/* Main Content Area (Edge-to-edge p-0 on mobile for native app feel) */}
        <main className="flex-1 overflow-y-auto min-w-0 p-0 sm:p-4 lg:p-5">
          {children}
        </main>
      </div>
    </div>
  );
}
