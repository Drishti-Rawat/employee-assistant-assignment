"use client";

import React from "react";
import { Employee } from "@/types";
import { Mail, MapPin, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

interface EmployeeCardProps {
  employee: Employee;
  viewMode: "grid" | "table";
}

export function EmployeeCard({ employee, viewMode }: EmployeeCardProps) {
  const router = useRouter();

  const handleAskAIAboutEmployee = () => {
    router.push(`/assistant?query=${encodeURIComponent(`Tell me more about ${employee.name} in ${employee.department}`)}`);
  };

  const statusColors = {
    Active: "bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-800",
    "On Leave": "bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-200/60 dark:border-amber-800",
    Remote: "bg-indigo-50 dark:bg-indigo-950/80 text-[#6366F1] dark:text-indigo-300 border-indigo-200/60 dark:border-indigo-800",
    Offline: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700",
  };

  if (viewMode === "table") {
    return (
      <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors border-b border-slate-100 dark:border-slate-800 text-xs sm:text-sm">
        <td className="py-3.5 px-4 flex items-center gap-3">
          <img
            src={employee.avatar}
            alt={employee.name}
            className="w-9 h-9 rounded-xl object-cover ring-2 ring-indigo-500/20"
          />
          <div>
            <div className="font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              {employee.name}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">{employee.position}</div>
          </div>
        </td>
        <td className="py-3.5 px-4">
          <span className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            {employee.department}
          </span>
        </td>
        <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 font-mono text-xs">
          {employee.email}
        </td>
        <td className="py-3.5 px-4">
          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${statusColors[employee.status]}`}>
            {employee.status}
          </span>
        </td>
        <td className="py-3.5 px-4 text-right">
          <a
            href={`mailto:${employee.email}`}
            className="text-xs text-[#6366F1] dark:text-indigo-400 hover:underline font-mono"
          >
            Email
          </a>
        </td>
      </tr>
    );
  }

  return (
    <div className="bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-5 shadow-xs hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-700/60 transition-all duration-300 flex flex-col justify-between space-y-4 group">
      {/* Top Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <img
            src={employee.avatar}
            alt={employee.name}
            className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-500/20 group-hover:scale-105 transition-transform"
          />
          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-[#6366F1] dark:group-hover:text-indigo-400 transition-colors">
              {employee.name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{employee.position}</p>
          </div>
        </div>

        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusColors[employee.status]}`}>
          {employee.status}
        </span>
      </div>

      {/* Department & Location */}
      <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-400">Department:</span>
          <span className="font-bold text-slate-800 dark:text-slate-200 px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800">
            {employee.department}
          </span>
        </div>

        <div className="flex items-center gap-2 pt-0.5 text-slate-500 dark:text-slate-400 font-medium">
          <MapPin className="w-3.5 h-3.5 text-[#6366F1] shrink-0" />
          <span className="truncate">{employee.location}</span>
        </div>
      </div>

      {/* Skills Badges */}
      {employee.skills && employee.skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {employee.skills.slice(0, 3).map((skill, idx) => (
            <span
              key={idx}
              className="text-[10px] px-2 py-0.5 rounded-md bg-indigo-50/80 dark:bg-indigo-950/80 text-[#6366F1] dark:text-indigo-300 font-bold border border-indigo-100/60 dark:border-indigo-800/40"
            >
              {skill}
            </span>
          ))}
          {employee.skills.length > 3 && (
            <span className="text-[10px] px-1.5 py-0.5 text-slate-400 font-semibold">
              +{employee.skills.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Contact Bar Footer */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <a
          href={`mailto:${employee.email}`}
          className="text-xs text-[#6366F1] dark:text-indigo-400 hover:underline flex items-center gap-1.5 font-mono truncate w-full"
        >
          <Mail className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{employee.email}</span>
        </a>
      </div>
    </div>
  );
}
