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
    Active: "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300/60 dark:border-emerald-800",
    "On Leave": "bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300/60 dark:border-amber-800",
    Remote: "bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-300 border-stone-300/60 dark:border-stone-700",
    Offline: "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700",
  };

  if (viewMode === "table") {
    return (
      <tr className="hover:bg-stone-50/80 dark:hover:bg-stone-800/40 transition-colors border-b border-stone-100 dark:border-stone-800 text-xs sm:text-sm">
        <td className="py-3 px-4 flex items-center gap-3">
          <img
            src={employee.avatar}
            alt={employee.name}
            className="w-9 h-9 rounded-xl object-cover ring-2 ring-amber-700/20"
          />
          <div>
            <div className="font-bold text-stone-900 dark:text-white flex items-center gap-2">
              {employee.name}
            </div>
            <div className="text-xs text-stone-500 dark:text-stone-400">{employee.position}</div>
          </div>
        </td>
        <td className="py-3 px-4">
          <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
            {employee.department}
          </span>
        </td>
        <td className="py-3 px-4 text-stone-600 dark:text-stone-400 font-mono text-xs">
          {employee.email}
        </td>
        <td className="py-3 px-4">
          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${statusColors[employee.status]}`}>
            {employee.status}
          </span>
        </td>
        <td className="py-3 px-4 text-right">
          <button
            onClick={handleAskAIAboutEmployee}
            className="p-1.5 rounded-lg text-amber-800 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-stone-800 transition-colors"
            title="Query AI Assistant about this employee"
          >
            <Sparkles className="w-4 h-4" />
          </button>
        </td>
      </tr>
    );
  }

  return (
    <div className="bg-white dark:bg-[#24201D] border border-amber-200/60 dark:border-stone-800 rounded-3xl p-5 shadow-xs hover:shadow-xl hover:border-amber-400/50 transition-all duration-300 flex flex-col justify-between space-y-4 group">
      {/* Top Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <img
            src={employee.avatar}
            alt={employee.name}
            className="w-12 h-12 rounded-2xl object-cover ring-2 ring-amber-700/30 group-hover:scale-105 transition-transform"
          />
          <div>
            <h3 className="font-bold text-base text-stone-900 dark:text-white group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors">
              {employee.name}
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">{employee.position}</p>
          </div>
        </div>

        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusColors[employee.status]}`}>
          {employee.status}
        </span>
      </div>

      {/* Department & Location */}
      <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-400">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-stone-400">Department:</span>
          <span className="font-medium text-stone-800 dark:text-stone-200 px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800">
            {employee.department}
          </span>
        </div>

        <div className="flex items-center gap-2 pt-1 text-stone-500 dark:text-stone-400">
          <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
          <span className="truncate">{employee.location}</span>
        </div>
      </div>

      {/* Skills Badges */}
      {employee.skills && employee.skills.length > 0 && (
        <div className="flex flex-wrap gap-1 pt-1">
          {employee.skills.slice(0, 3).map((skill, idx) => (
            <span
              key={idx}
              className="text-[10px] px-2 py-0.5 rounded-md bg-amber-100/80 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 font-medium"
            >
              {skill}
            </span>
          ))}
          {employee.skills.length > 3 && (
            <span className="text-[10px] px-1.5 py-0.5 text-stone-400">
              +{employee.skills.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Contact Bar Footer */}
      <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
        <a
          href={`mailto:${employee.email}`}
          className="text-xs text-amber-800 dark:text-amber-400 hover:underline flex items-center gap-1 font-mono truncate max-w-[70%]"
        >
          <Mail className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{employee.email}</span>
        </a>

        <button
          onClick={handleAskAIAboutEmployee}
          className="px-2.5 py-1 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-amber-800 hover:text-white text-stone-700 dark:text-stone-300 text-xs font-medium transition-all flex items-center gap-1"
          title="Ask AI Assistant about this person"
        >
          <Sparkles className="w-3 h-3 text-amber-700 group-hover:text-white" />
          Ask AI
        </button>
      </div>
    </div>
  );
}
