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
      color: "from-indigo-500 to-blue-600",
    },
    {
      title: "Active Employees",
      value: activeEmp,
      change: "95.1% active status",
      isPositive: true,
      icon: TrendingUp,
      color: "from-emerald-500 to-teal-600",
    },
    {
      title: "Departments",
      value: 6,
      change: "Across 4 global hubs",
      isPositive: true,
      icon: Building2,
      color: "from-purple-500 to-pink-600",
    },
    {
      title: "AI Resolution Rate",
      value: "98.4%",
      change: "1,420 queries resolved",
      isPositive: true,
      icon: Sparkles,
      color: "from-amber-500 to-orange-600",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold shadow-md">
              <BarChart3 className="w-4 h-4" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Analytics Dashboard
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Real-time workforce headcount metrics, department breakdown, and AI query statistics.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-semibold border border-indigo-200 dark:border-indigo-800">
          <Zap className="w-3.5 h-3.5 text-amber-500 fill-current" /> Live Data Sync
        </div>
      </div>

      {/* Metric Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs hover:shadow-xl transition-all space-y-3 relative overflow-hidden group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {metric.title}
                </span>
                <div className={`w-9 h-9 rounded-2xl bg-gradient-to-tr ${metric.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {metric.value}
                </h3>
                <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" />
                  {metric.change}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Bar Chart Card */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Department Headcount Breakdown
              </h3>
              <p className="text-xs text-slate-500">Distribution of active employees per core department</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              Bar Chart
            </span>
          </div>

          <DepartmentBarChart />
        </div>

        {/* Pie Chart Card */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Workplace Model Ratio
              </h3>
              <p className="text-xs text-slate-500">Remote vs Hybrid vs On-Site workforce</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              Donut Chart
            </span>
          </div>

          <DepartmentPieChart />
        </div>
      </div>

      {/* Detailed Department Performance Summary Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Department Operations Summary
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[11px] font-bold">
                <th className="py-3 px-4">Department Name</th>
                <th className="py-3 px-4">Headcount</th>
                <th className="py-3 px-4">Active Ratio</th>
                <th className="py-3 px-4">Satisfaction Score</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">Engineering</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">42 Members</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">97% Active</td>
                <td className="py-3 px-4 text-emerald-600 font-semibold">96 / 100</td>
                <td className="py-3 px-4 text-right">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                    Optimal
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">Sales & Growth</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">28 Members</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">92% Active</td>
                <td className="py-3 px-4 text-emerald-600 font-semibold">91 / 100</td>
                <td className="py-3 px-4 text-right">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                    Optimal
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">Marketing</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">18 Members</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">95% Active</td>
                <td className="py-3 px-4 text-emerald-600 font-semibold">94 / 100</td>
                <td className="py-3 px-4 text-right">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                    Optimal
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">Product & Design</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">16 Members</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">100% Active</td>
                <td className="py-3 px-4 text-emerald-600 font-semibold">98 / 100</td>
                <td className="py-3 px-4 text-right">
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
