"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { DepartmentBarChart } from "@/components/analytics/DepartmentBarChart";
import { DepartmentPieChart } from "@/components/analytics/DepartmentPieChart";
import {
  BarChart3,
  Users,
  Building2,
  TrendingUp,
  Award,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function AnalyticsPage() {
  const { employees } = useApp();

  const totalEmp = Math.max(124, employees.length);
  const activeEmp = Math.round(totalEmp * 0.95);

  const metrics = [
    {
      title: "Total Employees",
      value: totalEmp,
      change: "+12.4% this quarter",
      isPositive: true,
      icon: Users,
      bgColor: "bg-indigo-50 dark:bg-indigo-950/60",
      iconBg: "bg-[#6366F1] text-white",
      borderColor: "border-indigo-100 dark:border-indigo-800/40",
    },
    {
      title: "Active Employees",
      value: activeEmp,
      change: "95.1% active status",
      isPositive: true,
      icon: TrendingUp,
      bgColor: "bg-[#E6F8F3] dark:bg-emerald-950/50",
      iconBg: "bg-emerald-600 text-white",
      borderColor: "border-emerald-100 dark:border-emerald-800/40",
    },
    {
      title: "Departments",
      value: 6,
      change: "Across 4 global hubs",
      isPositive: true,
      icon: Building2,
      bgColor: "bg-[#F3EFEF] dark:bg-purple-950/50",
      iconBg: "bg-purple-600 text-white",
      borderColor: "border-purple-100 dark:border-purple-800/40",
    },
    {
      title: "AI Resolution Rate",
      value: "98.4%",
      change: "1,420 queries resolved",
      isPositive: true,
      icon: Sparkles,
      bgColor: "bg-[#FFF4EC] dark:bg-amber-950/50",
      iconBg: "bg-amber-600 text-white",
      borderColor: "border-amber-100 dark:border-amber-800/40",
    },
  ];

  return (
    <div className="w-full max-w-[1440px] mx-auto p-3 sm:p-5 lg:p-6 space-y-4 sm:space-y-6">
      {/* Compact Responsive Header Banner Card */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#EEF2FF] via-[#E8EDFF] to-[#E0E7FF] dark:from-[#1E1B4B]/90 dark:via-[#1E1B4B]/70 dark:to-[#0F172A] border border-indigo-100/90 dark:border-indigo-800/40 p-4 sm:px-6 sm:py-4 shadow-xs group">
        
        {/* Background Decorative Blob */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-300/20 dark:bg-indigo-600/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
              <h1 className="text-base sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Analytics <span className="text-[#6366F1] dark:text-indigo-400">Dashboard</span>
              </h1>
              <span className="text-[10px] sm:text-[11px] font-extrabold px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full bg-[#6366F1] text-white shadow-2xs">
                Real-Time
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/80 dark:bg-white/10 text-slate-700 dark:text-slate-200 border border-indigo-200/50 dark:border-white/10">
                <BarChart3 className="w-3 h-3 text-[#6366F1]" />
                Workforce Metrics
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium sm:truncate max-w-xl">
              Real-time headcount statistics, active ratios, department breakdowns, and AI assistant query metrics.
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xl sm:rounded-2xl bg-white/90 dark:bg-slate-800/90 text-[#6366F1] dark:text-indigo-300 text-xs font-bold border border-indigo-100 dark:border-slate-700 shadow-2xs shrink-0">
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-current" />
            <span>Live Data Sync</span>
          </div>
        </div>
      </div>

      {/* Metric Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <div
              key={idx}
              className={`bg-white dark:bg-[#111827] border ${metric.borderColor} rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all space-y-2 sm:space-y-3 relative overflow-hidden group`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  {metric.title}
                </span>
                <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-2xl ${metric.iconBg} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform shrink-0`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="space-y-0.5 sm:space-y-1">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  {metric.value}
                </h3>
                <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3 shrink-0" />
                  <span>{metric.change}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Bar Chart Card */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xs space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                Department Headcount Breakdown
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500">Distribution of active employees per core department</p>
            </div>
            <span className="self-start sm:self-auto text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 sm:py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              Bar Chart
            </span>
          </div>

          <DepartmentBarChart />
        </div>

        {/* Pie Chart Card */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xs space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                Workplace Model Ratio
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500">Remote vs Hybrid vs On-Site workforce</p>
            </div>
            <span className="self-start sm:self-auto text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 sm:py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              Donut Chart
            </span>
          </div>

          <DepartmentPieChart />
        </div>
      </div>

      {/* Detailed Department Performance Summary Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xs space-y-3 sm:space-y-4">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
          Department Operations Summary
        </h3>

        <div className="overflow-x-auto -mx-1 sm:mx-0">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[550px]">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px] sm:text-[11px] font-bold">
                <th className="py-2.5 px-3 sm:px-4">Department Name</th>
                <th className="py-2.5 px-3 sm:px-4">Headcount</th>
                <th className="py-2.5 px-3 sm:px-4">Active Ratio</th>
                <th className="py-2.5 px-3 sm:px-4">Satisfaction Score</th>
                <th className="py-2.5 px-3 sm:px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-3 px-3 sm:px-4 font-bold text-slate-900 dark:text-white whitespace-nowrap">Engineering</td>
                <td className="py-3 px-3 sm:px-4 text-slate-600 dark:text-slate-300 whitespace-nowrap">42 Members</td>
                <td className="py-3 px-3 sm:px-4 text-slate-600 dark:text-slate-300 whitespace-nowrap">97% Active</td>
                <td className="py-3 px-3 sm:px-4 text-emerald-600 font-semibold whitespace-nowrap">96 / 100</td>
                <td className="py-3 px-3 sm:px-4 text-right whitespace-nowrap">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                    Optimal
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-3 px-3 sm:px-4 font-bold text-slate-900 dark:text-white whitespace-nowrap">Sales & Growth</td>
                <td className="py-3 px-3 sm:px-4 text-slate-600 dark:text-slate-300 whitespace-nowrap">28 Members</td>
                <td className="py-3 px-3 sm:px-4 text-slate-600 dark:text-slate-300 whitespace-nowrap">92% Active</td>
                <td className="py-3 px-3 sm:px-4 text-emerald-600 font-semibold whitespace-nowrap">91 / 100</td>
                <td className="py-3 px-3 sm:px-4 text-right whitespace-nowrap">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                    Optimal
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-3 px-3 sm:px-4 font-bold text-slate-900 dark:text-white whitespace-nowrap">Marketing</td>
                <td className="py-3 px-3 sm:px-4 text-slate-600 dark:text-slate-300 whitespace-nowrap">18 Members</td>
                <td className="py-3 px-3 sm:px-4 text-slate-600 dark:text-slate-300 whitespace-nowrap">95% Active</td>
                <td className="py-3 px-3 sm:px-4 text-emerald-600 font-semibold whitespace-nowrap">94 / 100</td>
                <td className="py-3 px-3 sm:px-4 text-right whitespace-nowrap">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                    Optimal
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-3 px-3 sm:px-4 font-bold text-slate-900 dark:text-white whitespace-nowrap">Product & Design</td>
                <td className="py-3 px-3 sm:px-4 text-slate-600 dark:text-slate-300 whitespace-nowrap">16 Members</td>
                <td className="py-3 px-3 sm:px-4 text-slate-600 dark:text-slate-300 whitespace-nowrap">100% Active</td>
                <td className="py-3 px-3 sm:px-4 text-emerald-600 font-semibold whitespace-nowrap">98 / 100</td>
                <td className="py-3 px-3 sm:px-4 text-right whitespace-nowrap">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                    Optimal
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
