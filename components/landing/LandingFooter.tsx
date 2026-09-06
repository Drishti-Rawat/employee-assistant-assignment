"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Sun, Moon, Globe, Share2, MessageCircle, Mail } from "lucide-react";
import { useApp } from "@/context/AppContext";

export function LandingFooter() {
  const { theme, toggleTheme } = useApp();

  return (
    <footer className="w-full border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#0B1020] text-slate-600 dark:text-slate-400 pt-12 pb-8">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-100 dark:border-slate-800">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#6366F1] flex items-center justify-center text-white font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-xl text-slate-900 dark:text-white tracking-tight">
                WorkWise
              </span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium max-w-xs leading-relaxed">
              Smarter People. Brighter Workplaces. Empower your employee workflows with conversational AI intelligence.
            </p>

            <div className="flex items-center gap-3 pt-2 text-slate-400 dark:text-slate-500">
              <a href="#" className="hover:text-[#6366F1] transition-colors" title="Website"><Globe className="w-4 h-4" /></a>
              <a href="#" className="hover:text-[#6366F1] transition-colors" title="Social"><Share2 className="w-4 h-4" /></a>
              <a href="#" className="hover:text-[#6366F1] transition-colors" title="Community"><MessageCircle className="w-4 h-4" /></a>
              <a href="#" className="hover:text-[#6366F1] transition-colors" title="Contact"><Mail className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs">
            {/* Product */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/assistant" className="hover:text-[#6366F1] transition-colors">AI Q&A Assistant</Link></li>
                <li><Link href="/directory" className="hover:text-[#6366F1] transition-colors">Employee Directory</Link></li>
                <li><Link href="/analytics" className="hover:text-[#6366F1] transition-colors">Analytics & Insights</Link></li>
                <li><Link href="/settings" className="hover:text-[#6366F1] transition-colors">Personalized Settings</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#6366F1] transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-[#6366F1] transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-[#6366F1] transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-[#6366F1] transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#6366F1] transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-[#6366F1] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#6366F1] transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-[#6366F1] transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 WorkWise. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
