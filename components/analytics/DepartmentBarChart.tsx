"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  { name: "Engineering", count: 42, color: "#6366f1" },
  { name: "Sales", count: 28, color: "#8b5cf6" },
  { name: "Marketing", count: 18, color: "#ec4899" },
  { name: "Product", count: 16, color: "#10b981" },
  { name: "HR & People", count: 12, color: "#f59e0b" },
  { name: "Finance", count: 8, color: "#3b82f6" },
];

export function DepartmentBarChart() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="h-64 flex items-center justify-center text-xs text-slate-400">Loading Bar Chart...</div>;
  }

  return (
    <div className="w-full h-64 sm:h-72 lg:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 15, right: 10, left: -25, bottom: 15 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.15} vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 10, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
            interval={0}
          />
          <YAxis
            tick={{ fontSize: 10, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              borderColor: "#1e293b",
              borderRadius: "16px",
              color: "#fff",
              fontSize: "11px",
              padding: "8px 12px",
            }}
            cursor={{ fill: "rgba(99, 102, 241, 0.08)" }}
          />
          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
