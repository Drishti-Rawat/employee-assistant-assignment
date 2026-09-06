"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Sun, Moon, Menu, X, ArrowRight, ChevronRight } from "lucide-react";
import { useApp } from "@/context/AppContext";

export interface NavItem {
  label: string;
  href: string;
}

export interface LandingHeaderProps {
  navItems?: NavItem[];
  showAuthButtons?: boolean;
  ctaText?: string;
  ctaHref?: string;
}

const defaultLandingNavItems: NavItem[] = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Impact", href: "#impact" },
  { label: "Testimonials", href: "#testimonials" },
];

export function LandingHeader({
  navItems = defaultLandingNavItems,
  showAuthButtons = true,
  ctaText = "Get Started",
  ctaHref = "/assistant",
}: LandingHeaderProps) {
  const { theme, toggleTheme } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50 w-full bg-transparent border-b border-slate-200/10 dark:border-slate-800/20 py-4 sm:py-5">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#6366F1] flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
            </div>
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white">
              WorkWise
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className="hover:text-[#6366F1] dark:hover:text-[#6366F1] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all shadow-2xs backdrop-blur-md"
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
              ) : (
                <Moon className="w-4 h-4 text-[#6366F1]" />
              )}
            </button>

            {showAuthButtons && (
              <Link
                href="/assistant"
                className="hidden sm:inline-block text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-[#6366F1] transition-colors px-3 py-2"
              >
                Sign In
              </Link>
            )}

            {/* Get Started Button (Hidden on Mobile) */}
            <Link
              href={ctaHref}
              className="hidden sm:flex px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl bg-[#6366F1] hover:bg-indigo-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-500/20 transition-all items-center gap-1.5 hover:scale-[1.02]"
            >
              {ctaText}
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white backdrop-blur-md shadow-sm active:scale-95 transition-all"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Modern Glassmorphic Full-Screen Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 md:hidden flex flex-col bg-white/95 dark:bg-[#070B14]/95 backdrop-blur-2xl h-dvh overflow-y-auto"
          >
            {/* Top Bar inside Overlay */}
            <div className="w-full max-w-[1440px] mx-auto px-5 py-4 flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5"
              >
                <div className="w-9 h-9 rounded-xl bg-[#6366F1] flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                  WorkWise
                </span>
              </Link>

              <div className="flex items-center gap-2.5">
                {/* Theme Toggle Button */}
                <button
                  onClick={toggleTheme}
                  className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center text-slate-700 dark:text-slate-200 active:scale-95 transition-all"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <Sun className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Moon className="w-4 h-4 text-[#6366F1]" />
                  )}
                </button>

                {/* Close Button */}
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center text-slate-800 dark:text-white active:scale-95 transition-all"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Navigation Body */}
            <div className="flex-1 px-6 py-8 flex flex-col justify-between max-w-md mx-auto w-full">
              {/* Clean Typography Navigation Links */}
              <nav className="flex flex-col space-y-1">
                {navItems.map((item, idx) => (
                  <motion.a
                    key={idx}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx, duration: 0.25 }}
                    className="flex items-center justify-between py-4 px-2 border-b border-slate-100 dark:border-slate-800/60 text-slate-800 dark:text-slate-100 font-bold text-lg hover:text-[#6366F1] dark:hover:text-[#6366F1] transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-indigo-500/40 group-hover:bg-[#6366F1] group-hover:scale-125 transition-all" />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#6366F1] group-hover:translate-x-1 transition-all" />
                  </motion.a>
                ))}
              </nav>

              {/* Bottom Action CTAs */}
              <div className="pt-8 space-y-3.5">
                <Link
                  href={ctaHref}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#6366F1] via-[#7C5CFC] to-[#8B5CF6] text-white font-bold text-base flex items-center justify-center gap-2 shadow-xl shadow-indigo-500/25 active:scale-[0.99] transition-all"
                >
                  <span>{ctaText}</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                {showAuthButtons && (
                  <Link
                    href="/assistant"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-800 dark:text-slate-200 font-semibold text-sm flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                  >
                    Sign In to Dashboard
                  </Link>
                )}

                {/* Subtle Brand Footer Tag */}
                <div className="pt-4 text-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800/40 text-[11px] font-semibold text-[#6366F1] dark:text-indigo-400">
                    <Sparkles className="w-3 h-3" />
                    Powered by WorkWise AI
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
