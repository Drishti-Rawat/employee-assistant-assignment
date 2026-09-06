"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Smile, Clock, Zap, Sparkles, LucideIcon } from "lucide-react";

export interface ImpactMetric {
  id: string;
  value: string;
  label: string;
  sublabel: string;
  icon: LucideIcon;
  iconBg: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function ImpactSection() {
  const metrics: ImpactMetric[] = [
    {
      id: "employees",
      value: "500+",
      label: "Employees",
      sublabel: "Active Enterprise Users",
      icon: Users,
      iconBg: "bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 border border-purple-200/60 dark:border-purple-800/60",
    },
    {
      id: "satisfaction",
      value: "95%",
      label: "Satisfaction Rate",
      sublabel: "4.9/5 Average Rating",
      icon: Smile,
      iconBg: "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60",
    },
    {
      id: "support",
      value: "24/7",
      label: "AI Support",
      sublabel: "99.9% Uptime SLA",
      icon: Clock,
      iconBg: "bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/60",
    },
    {
      id: "access",
      value: "50%",
      label: "Faster Info Access",
      sublabel: "3.5 hrs saved / week",
      icon: Zap,
      iconBg: "bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 border border-sky-200/60 dark:border-sky-800/60",
    },
  ];

  return (
    <section className="relative py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto space-y-12">
      {/* Header */}
      <div className="relative z-10 text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50/80 dark:bg-indigo-950/80 border border-indigo-200/80 dark:border-indigo-800/80 text-[11px] font-extrabold uppercase tracking-wider text-[#6366F1] dark:text-indigo-400 backdrop-blur-md shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#6366F1]" />
          IMPACT
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          Helping Teams Work Smarter
        </h2>

        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-normal max-w-xl mx-auto leading-relaxed">
          Join hundreds of enterprise teams already multiplying productivity with WorkWise.
        </p>
      </div>

      {/* Open Minimalist Stat Bar Layout (No Card Boxes) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-4"
      >
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.id}
              variants={itemVariants}
              className={`text-center space-y-3 px-2 sm:px-4 lg:border-r border-slate-200/80 dark:border-slate-800/80 last:border-r-0 ${
                idx >= 2 ? "pt-4 sm:pt-0" : ""
              }`}
            >
              {/* Circular Icon Badge */}
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full ${metric.iconBg} mx-auto flex items-center justify-center transition-transform hover:scale-110 duration-300 shadow-xs`}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              {/* Stat Value & Title */}
              <div className="space-y-1">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
                  {metric.value}
                </h3>
                <p className="text-xs sm:text-sm lg:text-base font-bold text-slate-800 dark:text-slate-200">
                  {metric.label}
                </p>
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-normal leading-tight">
                  {metric.sublabel}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
