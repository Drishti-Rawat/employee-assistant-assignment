"use client";

import React, { useState, useMemo } from "react";
import { useApp } from "@/context/AppContext";
import { EmployeeCard } from "@/components/directory/EmployeeCard";
import { AddEmployeeModal } from "@/components/directory/AddEmployeeModal";
import { Department, EmployeeStatus } from "@/types";
import {
  Users,
  Search,
  Filter,
  UserPlus,
  Download,
  Grid,
  List,
  RotateCcw,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { exportToCSV } from "@/lib/utils";

const DEPARTMENTS: (Department | "All")[] = [
  "All",
  "Engineering",
  "Product",
  "Human Resources",
  "Marketing",
  "Design",
  "Sales",
  "Finance",
];

export default function DirectoryPage() {
  const { employees } = useApp();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState<Department | "All">("All");
  const [selectedStatus, setSelectedStatus] = useState<EmployeeStatus | "All">("All");
  const [sortBy, setSortBy] = useState<"name" | "department" | "joinDate">("name");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Filter & Sort Logic
  const filteredEmployees = useMemo(() => {
    return employees
      .filter((emp) => {
        // Department filter
        if (selectedDept !== "All" && emp.department !== selectedDept) {
          return false;
        }
        // Status filter
        if (selectedStatus !== "All" && emp.status !== selectedStatus) {
          return false;
        }
        // Search filter
        if (searchTerm.trim()) {
          const query = searchTerm.toLowerCase();
          const matchName = emp.name.toLowerCase().includes(query);
          const matchDept = emp.department.toLowerCase().includes(query);
          const matchPos = emp.position.toLowerCase().includes(query);
          const matchEmail = emp.email.toLowerCase().includes(query);
          const matchSkills = emp.skills.some((s) => s.toLowerCase().includes(query));
          return matchName || matchDept || matchPos || matchEmail || matchSkills;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "name") {
          return a.name.localeCompare(b.name);
        } else if (sortBy === "department") {
          return a.department.localeCompare(b.department);
        } else {
          return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
        }
      });
  }, [employees, searchTerm, selectedDept, selectedStatus, sortBy]);

  const handleExportCSV = () => {
    const formatted = filteredEmployees.map((emp) => ({
      ID: emp.id,
      Name: emp.name,
      Department: emp.department,
      Position: emp.position,
      Email: emp.email,
      Phone: emp.phone,
      Status: emp.status,
      Location: emp.location,
      JoinDate: emp.joinDate,
      Skills: emp.skills.join("; "),
    }));
    exportToCSV(formatted, "Employee_Directory_Export");
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedDept("All");
    setSelectedStatus("All");
    setSortBy("name");
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md">
              <Users className="w-4 h-4" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Employee Directory
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
              {filteredEmployees.length} Total
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Search, filter by department, export records, or add new team members.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            Add Employee
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, role, email, skill, or department..."
              className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Status Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as EmployeeStatus | "All")}
              className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Statuses (Active, Remote...)</option>
              <option value="Active">Active Only</option>
              <option value="Remote">Remote Only</option>
              <option value="On Leave">On Leave Only</option>
            </select>
          </div>

          {/* Sort By & View Mode */}
          <div className="md:col-span-3 flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="flex-1 px-3 py-2.5 text-xs sm:text-sm rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="name">Sort by Name</option>
              <option value="department">Sort by Department</option>
              <option value="joinDate">Sort by Join Date</option>
            </select>

            <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                    : "text-slate-400 hover:text-slate-600"
                }`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "table"
                    ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                    : "text-slate-400 hover:text-slate-600"
                }`}
                title="Table View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Department Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-semibold text-slate-400 mr-1 shrink-0">Depts:</span>
          {DEPARTMENTS.map((dept) => {
            const isSelected = selectedDept === dept;
            return (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`text-xs px-3 py-1.5 rounded-xl font-medium shrink-0 transition-all ${
                  isSelected
                    ? "bg-indigo-600 text-white shadow-xs font-semibold"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {dept}
              </button>
            );
          })}
        </div>
      </div>

      {/* Directory Grid / Table List */}
      {filteredEmployees.length === 0 ? (
        /* Empty State */
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center space-y-4 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-500 mx-auto flex items-center justify-center">
            <Users className="w-8 h-8 opacity-60" />
          </div>
          <div className="space-y-1 max-w-sm mx-auto">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Employees Found</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              No employee cards match your search criteria "{searchTerm}" or active filters.
            </p>
          </div>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2.5 rounded-2xl bg-indigo-600 text-white text-xs font-semibold shadow-md inline-flex items-center gap-2 hover:bg-indigo-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset All Filters
          </button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((emp) => (
            <EmployeeCard key={emp.id} employee={emp} viewMode="grid" />
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Employee</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((emp) => (
                  <EmployeeCard key={emp.id} employee={emp} viewMode="table" />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Employee Modal */}
      <AddEmployeeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}
