"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { Department } from "@/types";
import {
  User, Moon, Sun, Laptop, Bell, CheckCircle2, Sparkles, Save,
  MapPin, Briefcase, Building2, Mail, Camera, Zap, MessageSquare,
  Calendar, Edit3, ChevronRight,
} from "lucide-react";

function Toggle({ checked, onChange, id }: { checked: boolean; onChange: () => void; id: string }) {
  return (
    <button id={id} role="switch" aria-checked={checked} onClick={onChange}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${checked ? "bg-[#6366F1]" : "bg-slate-200 dark:bg-slate-700"}`}>
      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );
}

function StatPill({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 text-xs min-w-0">
      <Icon className="w-3.5 h-3.5 text-[#6366F1] shrink-0" />
      <span className="text-slate-500 dark:text-slate-400 font-medium shrink-0">{label}:</span>
      <span className="text-slate-900 dark:text-white font-bold truncate">{value}</span>
    </div>
  );
}

function SectionCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
      className={`bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl shadow-xs overflow-hidden ${className}`}>
      {children}
    </motion.div>
  );
}

function TabBtn({ active, onClick, icon: Icon, label }: { active: boolean; onClick: () => void; icon: React.ElementType; label: string }) {
  return (
    <button onClick={onClick}
      className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex-1 sm:flex-initial justify-center ${active ? "bg-[#6366F1] text-white shadow-md shadow-indigo-500/25" : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"}`}>
      <Icon className="w-3.5 h-3.5 shrink-0" />{label}
    </button>
  );
}

type Tab = "profile" | "appearance" | "notifications" | "ai";

export default function SettingsPage() {
  const { theme, setTheme, userProfile, updateUserProfile, userSettings, updateUserSettings, chatSessions } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [position, setPosition] = useState(userProfile.position);
  const [department, setDepartment] = useState<Department>(userProfile.department);
  const [bio, setBio] = useState(userProfile.bio);
  const [avatar, setAvatar] = useState(userProfile.avatar);
  const [location, setLocation] = useState(userProfile.location);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const totalMessages = chatSessions.reduce((acc, s) => acc + s.messages.length, 0);
  const DEPTS = ["Engineering", "Product", "Human Resources", "Marketing", "Design", "Sales", "Finance"];

  const showToast = (msg: string) => { setToastMessage(msg); setTimeout(() => setToastMessage(null), 3000); };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault(); setIsSaving(true);
    await new Promise(r => setTimeout(r, 600));
    updateUserProfile({ name, email, position, department, bio, avatar, location });
    setIsSaving(false); showToast("Profile updated successfully!");
  };

  const handleToggle = (key: keyof typeof userSettings) => {
    updateUserSettings({ [key]: !userSettings[key] }); showToast("Preferences saved.");
  };

  const tabs: { id: Tab; icon: React.ElementType; label: string }[] = [
    { id: "profile", icon: User, label: "Profile" },
    { id: "appearance", icon: Sun, label: "Appearance" },
    { id: "notifications", icon: Bell, label: "Notifications" },
    { id: "ai", icon: Sparkles, label: "AI Preferences" },
  ];

  return (
    <div className="w-full  mx-auto space-y-4 sm:space-y-6 p-3 sm:p-5 lg:p-6 pb-24">

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 z-50 bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-2xl font-semibold text-xs sm:text-sm flex items-center justify-between sm:justify-start gap-2 max-w-md mx-auto sm:mx-0">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* ── Hero Profile Banner ── */}
      <SectionCard>
        <div className="relative h-28 sm:h-36 lg:h-44 bg-gradient-to-br from-[#6366F1] via-[#818CF8] to-[#A78BFA] overflow-hidden">
          <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
          <div className="absolute top-4 left-8 w-16 h-16 bg-indigo-300/20 rounded-full blur-lg" />
          <button className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-[11px] sm:text-xs font-bold transition-all">
            <Camera className="w-3.5 h-3.5" /><span className="hidden sm:inline">Edit Cover</span>
          </button>
        </div>

        <div className="px-4 sm:px-6 pb-5">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4 -mt-8 sm:-mt-12">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 shrink-0">
              <img src={avatar || userProfile.avatar} alt={name}
                className="w-full h-full rounded-2xl object-cover ring-4 ring-white dark:ring-[#111827] shadow-xl" />
              <button
                type="button"
                onClick={() => setActiveTab("profile")}
                className="absolute -bottom-1 -right-1 sm:-bottom-1.5 sm:-right-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-[#6366F1] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <Edit3 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            </div>
            <div className="flex-1 min-w-0 pb-1">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <h1 className="text-base sm:text-lg lg:text-xl font-extrabold text-slate-900 dark:text-white leading-tight truncate">
                    {name || userProfile.name}
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5 truncate">
                    {position || userProfile.position} ·{" "}
                    <span className="text-[#6366F1] dark:text-indigo-400 font-bold">{department || userProfile.department}</span>
                  </p>
                </div>
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-[10px] font-black uppercase tracking-wide shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />Active
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 mt-4">
            <StatPill icon={Building2} label="Dept" value={department || userProfile.department} />
            <StatPill icon={MapPin} label="Location" value={location || userProfile.location || "Remote"} />
            <StatPill icon={Calendar} label="Joined" value="March 2024" />
            <StatPill icon={MessageSquare} label="AI Queries" value={String(totalMessages)} />
          </div>
        </div>
      </SectionCard>

      {/* ── Tab Bar ── */}
      <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto pb-0.5 scrollbar-none bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-2xl p-1.5 sm:p-2 shadow-xs">
        {tabs.map(t => (
          <TabBtn key={t.id} active={activeTab === t.id} onClick={() => setActiveTab(t.id)} icon={t.icon} label={t.label} />
        ))}
      </div>

      {/* ── Profile Tab ── */}
      {activeTab === "profile" && (
        <form onSubmit={handleSaveProfile}>
          <SectionCard>
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
              <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3 sm:pb-4">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-[#6366F1]" />
                </div>
                <div>
                  <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">Personal Information</h2>
                  <p className="text-[11px] text-slate-500">Update your public profile and contact details</p>
                </div>
              </div>

              {/* Avatar row */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <img src={avatar || userProfile.avatar} alt={name}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover shadow-md ring-2 ring-[#6366F1]/20 shrink-0" />
                <div className="flex-1 space-y-1 min-w-0">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Avatar Image URL</label>
                  <input type="url" value={avatar} onChange={e => setAvatar(e.target.value)} placeholder="https://..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#6366F1]/50 transition-all placeholder:text-slate-400" />
                </div>
              </div>

              {/* Fields grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                {[
                  { id: "full-name", label: "Full Name", val: name, set: setName, Icon: User, ph: "Jane Doe", req: true },
                  { id: "email", label: "Email Address", val: email, set: setEmail, Icon: Mail, ph: "jane@co.com", req: true },
                  { id: "pos", label: "Job Title", val: position, set: setPosition, Icon: Briefcase, ph: "Senior Engineer", req: true },
                ].map(f => (
                  <div key={f.id} className="space-y-1.5">
                    <label htmlFor={f.id} className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      {f.label}{f.req && <span className="text-[#6366F1] ml-0.5">*</span>}
                    </label>
                    <div className="relative">
                      <f.Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input id={f.id} type="text" value={f.val} onChange={e => f.set(e.target.value)}
                        placeholder={f.ph} required={f.req}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#6366F1]/50 transition-all placeholder:text-slate-400" />
                    </div>
                  </div>
                ))}

                {/* Department */}
                <div className="space-y-1.5">
                  <label htmlFor="dept" className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Department<span className="text-[#6366F1] ml-0.5">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <select id="dept" value={department} onChange={e => setDepartment(e.target.value as Department)}
                      className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#6366F1]/50 transition-all appearance-none">
                      {DEPTS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                    <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none rotate-90" />
                  </div>
                </div>

                {/* Location */}
                <div className="sm:col-span-2 space-y-1.5">
                  <label htmlFor="loc" className="block text-xs font-bold text-slate-700 dark:text-slate-300">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input id="loc" type="text" value={location} onChange={e => setLocation(e.target.value)}
                      placeholder="San Francisco, CA"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#6366F1]/50 transition-all placeholder:text-slate-400" />
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-1.5">
                <label htmlFor="bio" className="block text-xs font-bold text-slate-700 dark:text-slate-300">Short Bio</label>
                <textarea id="bio" rows={3} value={bio} onChange={e => setBio(e.target.value)}
                  placeholder="Write a short description about yourself..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#6366F1]/50 transition-all placeholder:text-slate-400 resize-none" />
              </div>

              <div className="flex justify-end pt-1">
                <button type="submit" disabled={isSaving}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-2xl bg-[#6366F1] hover:bg-indigo-600 disabled:opacity-70 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]">
                  {isSaving
                    ? <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Saving…</>
                    : <><Save className="w-4 h-4" />Save Profile</>}
                </button>
              </div>
            </div>
          </SectionCard>
        </form>
      )}

      {/* ── Appearance Tab ── */}
      {activeTab === "appearance" && (
        <SectionCard>
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3 sm:pb-4">
              <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/80 flex items-center justify-center shrink-0">
                <Sun className="w-4 h-4 text-amber-500" />
              </div>
              <div>
                <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">Appearance & Theme</h2>
                <p className="text-[11px] text-slate-500">Current: <span className="font-bold text-[#6366F1]">{theme.toUpperCase()}</span></p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {([
                { id: "light", icon: Sun, label: "Light Mode", desc: "Clean, bright UI", gradient: "from-amber-100 to-amber-50", iconColor: "text-amber-500" },
                { id: "dark", icon: Moon, label: "Dark Mode", desc: "Easy on the eyes", gradient: "from-slate-800 to-slate-900", iconColor: "text-indigo-400" },
                { id: "system", icon: Laptop, label: "System Auto", desc: "Follows your OS", gradient: "from-purple-100 to-indigo-100 dark:from-purple-900 dark:to-indigo-900", iconColor: "text-purple-500" },
              ] as const).map(({ id, icon: Icon, label, desc, gradient, iconColor }) => (
                <button key={id} type="button"
                  onClick={() => { setTheme(id); showToast("Theme updated!"); }}
                  className={`group p-4 sm:p-5 rounded-2xl border-2 flex flex-col items-center gap-2.5 sm:gap-3 transition-all ${theme === id ? "border-[#6366F1] bg-indigo-50 dark:bg-indigo-950/30 ring-4 ring-[#6366F1]/10" : "border-slate-200 dark:border-slate-700 hover:border-slate-300"}`}>
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                    <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${iconColor}`} />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{label}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{desc}</p>
                  </div>
                  {theme === id && (
                    <div className="w-5 h-5 rounded-full bg-[#6366F1] flex items-center justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </SectionCard>
      )}

      {/* ── Notifications Tab ── */}
      {activeTab === "notifications" && (
        <SectionCard>
          <div className="p-4 sm:p-6">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3 sm:pb-4 mb-1">
              <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950/80 flex items-center justify-center shrink-0">
                <Bell className="w-4 h-4 text-purple-500" />
              </div>
              <div>
                <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">Notification Preferences</h2>
                <p className="text-[11px] text-slate-500">Control how and when you receive updates</p>
              </div>
            </div>
            {([
              { key: "emailNotifications", title: "Email Digest & Alerts", desc: "Weekly summaries of AI policy updates and team announcements.", icon: Mail, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/80" },
              { key: "slackNotifications", title: "Slack Workspace Sync", desc: "Forward urgent employee query responses to your Slack DM.", icon: MessageSquare, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-950/80" },
              { key: "desktopAlerts", title: "Desktop Push Alerts", desc: "Receive real-time browser push notifications for critical updates.", icon: Bell, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950/80" },
              { key: "aiInsightsDigest", title: "AI Insights Digest", desc: "Auto-generate quarterly department headcount trend reports.", icon: Sparkles, color: "text-[#6366F1]", bg: "bg-indigo-50 dark:bg-indigo-950/80" },
            ] as const).map(({ key, title, desc, icon: Icon, color, bg }) => (
              <div key={key} className="flex items-center justify-between py-3.5 sm:py-4 border-b border-slate-100 dark:border-slate-800 last:border-0 gap-3 sm:gap-4">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-4 h-4 ${color}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{title}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{desc}</p>
                  </div>
                </div>
                <Toggle id={`toggle-${key}`} checked={!!userSettings[key]} onChange={() => handleToggle(key)} />
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* ── AI Preferences Tab ── */}
      {activeTab === "ai" && (
        <SectionCard>
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3 sm:pb-4">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-[#6366F1]" />
              </div>
              <div>
                <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">AI Assistant Preferences</h2>
                <p className="text-[11px] text-slate-500">Tune how your AI assistant behaves</p>
              </div>
            </div>

            <div className="flex items-center justify-between py-2 gap-3">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">Auto Voice Output</p>
                  <p className="text-[11px] text-slate-500 truncate">Read AI responses aloud automatically</p>
                </div>
              </div>
              <Toggle id="toggle-autoVoice" checked={!!userSettings.autoVoiceOutput} onChange={() => handleToggle("autoVoiceOutput")} />
            </div>

            <div className="space-y-3 border-t border-slate-100 dark:border-slate-800 pt-4">
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Response Style</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Choose how creative or precise AI replies should be</p>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {(["precise", "balanced", "creative"] as const).map(mode => (
                  <button key={mode} type="button"
                    onClick={() => { updateUserSettings({ aiCreativity: mode }); showToast("AI style updated."); }}
                    className={`p-2.5 sm:p-3 rounded-2xl border-2 flex flex-col items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold transition-all ${userSettings.aiCreativity === mode ? "border-[#6366F1] bg-indigo-50 dark:bg-indigo-950/40 text-[#6366F1]" : "border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-300"}`}>
                    <span className="text-lg sm:text-xl">{mode === "precise" ? "🎯" : mode === "balanced" ? "⚖️" : "🎨"}</span>
                    <span className="capitalize">{mode}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-3">
              <p className="text-xs font-bold text-slate-900 dark:text-white">Your AI Activity</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-center">
                  <p className="text-xl sm:text-2xl font-black text-[#6366F1]">{chatSessions.length}</p>
                  <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Chat Sessions</p>
                </div>
                <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-center">
                  <p className="text-xl sm:text-2xl font-black text-emerald-600">{totalMessages}</p>
                  <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Total Messages</p>
                </div>
                <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/40 text-center col-span-2 sm:col-span-1">
                  <p className="text-xl sm:text-2xl font-black text-purple-600">98%</p>
                  <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Resolution Rate</p>
                </div>
              </div>
            </div>
          </div>
        </SectionCard>
      )}
    </div>
  );
}
