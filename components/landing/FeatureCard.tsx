"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, LucideIcon } from "lucide-react";

export type FeatureAccent = "purple" | "emerald" | "amber" | "blue";

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
  accent: FeatureAccent;
}

const accentStyles: Record<
  FeatureAccent,
  {
    cardBg: string;
    cardBorder: string;
    iconBg: string;
    linkText: string;
  }
> = {
  purple: {
    cardBg: "bg-purple-500/[0.04] dark:bg-purple-500/[0.07] backdrop-blur-xs",
    cardBorder:
      "border-purple-200/80 dark:border-purple-500/30 hover:border-purple-400 dark:hover:border-purple-400/80 hover:shadow-xl hover:shadow-purple-500/10",
    iconBg:
      "bg-purple-500/10 dark:bg-purple-500/15 border border-purple-500/20 text-purple-600 dark:text-purple-400 shadow-sm shadow-purple-500/10",
    linkText:
      "text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300",
  },
  emerald: {
    cardBg: "bg-emerald-500/[0.04] dark:bg-emerald-500/[0.07] backdrop-blur-xs",
    cardBorder:
      "border-emerald-200/80 dark:border-emerald-500/30 hover:border-emerald-400 dark:hover:border-emerald-400/80 hover:shadow-xl hover:shadow-emerald-500/10",
    iconBg:
      "bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 shadow-sm shadow-emerald-500/10",
    linkText:
      "text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300",
  },
  amber: {
    cardBg: "bg-amber-500/[0.04] dark:bg-amber-500/[0.07] backdrop-blur-xs",
    cardBorder:
      "border-amber-200/80 dark:border-amber-500/30 hover:border-amber-400 dark:hover:border-amber-400/80 hover:shadow-xl hover:shadow-amber-500/10",
    iconBg:
      "bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/20 text-amber-600 dark:text-amber-400 shadow-sm shadow-amber-500/10",
    linkText:
      "text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300",
  },
  blue: {
    cardBg: "bg-sky-500/[0.04] dark:bg-sky-500/[0.07] backdrop-blur-xs",
    cardBorder:
      "border-sky-200/80 dark:border-sky-500/30 hover:border-sky-400 dark:hover:border-sky-400/80 hover:shadow-xl hover:shadow-sky-500/10",
    iconBg:
      "bg-sky-500/10 dark:bg-sky-500/15 border border-sky-500/20 text-sky-600 dark:text-sky-400 shadow-sm shadow-sky-500/10",
    linkText:
      "text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300",
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function FeatureCard({ feature }: { feature: FeatureItem }) {
  const Icon = feature.icon;
  const styles = accentStyles[feature.accent];

  return (
    <motion.div
      variants={itemVariants}
      className={`p-7 rounded-[28px] ${styles.cardBg} border ${styles.cardBorder} transition-all duration-300 space-y-6 group flex flex-col justify-between shadow-xs`}
    >
      <div className="space-y-4">
        {/* Icon box with glowing rounded container */}
        <div
          className={`w-12 h-12 rounded-2xl ${styles.iconBg} flex items-center justify-center group-hover:scale-105 transition-transform duration-300 font-bold`}
        >
          <Icon className="w-6 h-6" />
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            {feature.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            {feature.description}
          </p>
        </div>
      </div>

      {/* Action link */}
      <div className="pt-2">
        <Link
          href={feature.link}
          className={`inline-flex items-center gap-1.5 text-xs font-bold ${styles.linkText} transition-all group/link`}
        >
          <span>Learn more</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}
