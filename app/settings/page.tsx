"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Department } from "@/types";
import {
  Settings,
  User,
  Moon,
  Sun,
  Laptop,
  Bell,
  CheckCircle2,
  Sparkles,
  Save,
  ShieldCheck,
  Volume2,
} from "lucide-react";

export default function SettingsPage() {
  const {
    theme,
    setTheme,
    userProfile,
    updateUserProfile,
    userSettings,
    updateUserSettings,
  } = useApp();

  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [position, setPosition] = useState(userProfile.position);
  const [department, setDepartment] = useState<Department>(userProfile.department);
  const [bio, setBio] = useState(userProfile.bio);
  const [avatar, setAvatar] = useState(userProfile.avatar);
  const [location, setLocation] = useState(userProfile.location);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      email,
      position,
      department,
      bio,
      avatar,
      location,
    });
    showToast("Profile information updated successfully!");
  };

  const handleToggleSetting = (key: keyof typeof userSettings) => {
    const nextVal = !userSettings[key];
    updateUserSettings({ [key]: nextVal });
    showToast("Preferences updated.");
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl font-semibold text-xs flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4" />
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md">
              <Settings className="w-4 h-4" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Profile & Preferences
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Manage your personal profile, workspace theme mode, and AI notification preferences.
          </p>
        </div>
      </div>

      {/* 1. Theme Toggle Preferences Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            {theme === "dark" ? <Moon className="w-4 h-4 text-amber-400" /> : <Sun className="w-4 h-4 text-indigo-600" />}
            Appearance & Theme
          </h2>
          <span className="text-xs text-slate-400">Active mode: {theme.toUpperCase()}</span>
        </div>

        <p className="text-xs text-slate-500">
          Choose your preferred theme interface mode. Changes take effect immediately across all dashboard pages.
        </p>

        <div className="grid grid-cols-3 gap-4 pt-2">
          {/* Light Mode */}
          <button
            type="button"
            onClick={() => setTheme("light")}
            className={`p-4 rounded-2xl border flex flex-col items-center gap-2 text-xs font-semibold transition-all ${
              theme === "light"
                ? "border-indigo-600 bg-indigo-50/50 text-indigo-900 ring-2 ring-indigo-500/20"
                : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-400"
            }`}
          >
            <Sun className="w-6 h-6 text-amber-500" />
            Light Mode
          </button>

          {/* Dark Mode */}
          <button
            type="button"
            onClick={() => setTheme("dark")}
            className={`p-4 rounded-2xl border flex flex-col items-center gap-2 text-xs font-semibold transition-all ${
              theme === "dark"
                ? "border-indigo-500 bg-indigo-950/50 text-indigo-300 ring-2 ring-indigo-500/20"
                : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-400"
            }`}
          >
            <Moon className="w-6 h-6 text-indigo-400" />
            Dark Mode
          </button>

          {/* System Mode */}
          <button
            type="button"
            onClick={() => setTheme("system")}
            className={`p-4 rounded-2xl border flex flex-col items-center gap-2 text-xs font-semibold transition-all ${
              theme === "system"
                ? "border-indigo-500 bg-indigo-950/50 text-indigo-300 ring-2 ring-indigo-500/20"
                : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-400"
            }`}
          >
            <Laptop className="w-6 h-6 text-purple-400" />
            System Auto
          </button>
        </div>
      </div>

      {/* 2. Update Profile Form */}
      <form onSubmit={handleSaveProfile} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-500" />
            Personal Profile Details
          </h2>
        </div>

        {/* Avatar preview row */}
        <div className="flex items-center gap-5">
          <img
            src={avatar}
            alt={name}
            className="w-16 h-16 rounded-2xl object-cover ring-4 ring-indigo-500/20 shadow-md"
          />
          <div className="space-y-1 flex-1">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Avatar Image URL
            </label>
            <input
              type="url"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Job Title</label>
            <input
              type="text"
              required
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Department</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value as Department)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Engineering">Engineering</option>
              <option value="Product">Product</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Marketing">Marketing</option>
              <option value="Design">Design</option>
              <option value="Sales">Sales</option>
              <option value="Finance">Finance</option>
            </select>
          </div>
        </div>

        <div className="text-xs sm:text-sm">
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="text-xs sm:text-sm">
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Short Bio</label>
          <textarea
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Profile Changes
          </button>
        </div>
      </form>

      {/* 3. Notification Preferences Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Bell className="w-4 h-4 text-purple-500" />
            Notification & AI Preferences
          </h2>
        </div>

        <div className="space-y-3 divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm">
          {/* Email Notifications */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="font-bold text-slate-900 dark:text-white">Email Digest & Task Alerts</p>
              <p className="text-xs text-slate-500">Receive weekly summaries of AI policy updates and team announcements.</p>
            </div>
            <input
              type="checkbox"
              checked={userSettings.emailNotifications}
              onChange={() => handleToggleSetting("emailNotifications")}
              className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
            />
          </div>

          {/* Slack Integration */}
          <div className="flex items-center justify-between pt-3">
            <div>
              <p className="font-bold text-slate-900 dark:text-white">Slack Workspace Sync</p>
              <p className="text-xs text-slate-500">Forward urgent employee query responses to your Slack DM.</p>
            </div>
            <input
              type="checkbox"
              checked={userSettings.slackNotifications}
              onChange={() => handleToggleSetting("slackNotifications")}
              className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
            />
          </div>

          {/* AI Insights */}
          <div className="flex items-center justify-between pt-3">
            <div>
              <p className="font-bold text-slate-900 dark:text-white">Automated AI Insights Digest</p>
              <p className="text-xs text-slate-500">Generate quarterly department headcount trends automatically.</p>
            </div>
            <input
              type="checkbox"
              checked={userSettings.aiInsightsDigest}
              onChange={() => handleToggleSetting("aiInsightsDigest")}
              className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
