"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { VoiceInputModal } from "@/components/assistant/VoiceInputModal";
import {
  Sparkles,
  Send,
  Mic,
  Paperclip,
  Users,
  FileText,
  PlusCircle,
  Headphones,
  Calendar,
  ChevronRight,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Check,
  Zap,
  ExternalLink,
  ShieldCheck,
  Clock,
} from "lucide-react";

interface LocalMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  isCustomFormatted?: boolean;
  bulletItems?: string[];
  numberedSteps?: string[];
  linkHref?: string;
  linkText?: string;
  suggestedPrompts?: string[];
}

const INITIAL_MESSAGES: LocalMessage[] = [
  {
    id: "m-1",
    sender: "user",
    text: "What is our leave policy?",
    timestamp: "10:24 AM",
  },
  {
    id: "m-2",
    sender: "ai",
    text: "Here's the leave policy at WorkWise:",
    timestamp: "10:24 AM",
    isCustomFormatted: true,
    bulletItems: [
      "18 days of paid annual leave",
      "10 days of sick leave",
      "5 days of casual leave",
      "Maternity/Paternity leave as per company policy",
    ],
    linkText: "You can apply for leave through the HR portal. Let me know if you need the link or more details!",
  },
  {
    id: "m-3",
    sender: "user",
    text: "How do I apply for leave?",
    timestamp: "10:26 AM",
  },
  {
    id: "m-4",
    sender: "ai",
    text: "You can apply for leave in a few simple steps:",
    timestamp: "10:26 AM",
    isCustomFormatted: true,
    numberedSteps: [
      "Go to the HR Portal",
      "Click on Leaves > Apply Leave",
      "Select the dates and reason",
      "Submit for approval",
    ],
    linkHref: "/directory",
    linkText: "Open HR Portal",
  },
];

const QUICK_ACTIONS = [
  { label: "Find a colleague", icon: Users, prompt: "Show me the employee directory" },
  { label: "Company policies", icon: FileText, prompt: "What are our core company policies?" },
  { label: "Raise a request", icon: PlusCircle, prompt: "How do I submit an HR request?" },
  { label: "IT support", icon: Headphones, prompt: "I need help with IT & tech support" },
  { label: "Book a meeting room", icon: Calendar, prompt: "How do I book a conference room?" },
];

const SUGGESTED_PROMPTS = [
  "What are the work from home policies?",
  "How do I reset my password?",
  "Tell me about our health insurance.",
  "List upcoming company holidays.",
  "Who is in the product team?",
];

function AssistantContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query");

  const { userProfile } = useApp();

  const [messages, setMessages] = useState<LocalMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [feedbackState, setFeedbackState] = useState<Record<string, "up" | "down" | null>>({});
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialQuery && initialQuery.trim()) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  const handleSendMessage = async (textToSend?: string) => {
    const queryText = (textToSend || input).trim();
    if (!queryText || isLoading) return;

    const timeString = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const newUserMsg: LocalMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: queryText,
      timestamp: timeString,
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const historyPayload = messages.map((m) => ({ sender: m.sender, text: m.text }));
      historyPayload.push({ sender: "user", text: queryText });

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: historyPayload,
          userContext: userProfile,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const data = await res.json();
      const aiReply = data.reply || "I've processed your request. Let me know if you need anything else!";

      const newAiMsg: LocalMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestedPrompts: data.suggestedActions || SUGGESTED_PROMPTS.slice(0, 3),
      };

      setMessages((prev) => [...prev, newAiMsg]);
    } catch (err: any) {
      console.error("AI Assistant Error:", err);
      const fallbackMsg: LocalMessage = {
        id: `ai-err-${Date.now()}`,
        sender: "ai",
        text: `I'm currently unable to reach the cloud AI service, but I can help you navigate policies or locate colleagues in the directory!`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFeedback = (id: string, type: "up" | "down") => {
    setFeedbackState((prev) => ({
      ...prev,
      [id]: prev[id] === type ? null : type,
    }));
  };

  const handleVoiceTranscript = (transcriptText: string) => {
    setInput(transcriptText);
    handleSendMessage(transcriptText);
  };

  return (
    <div className="w-full h-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 overflow-hidden">
      
      {/* LEFT & CENTER MAIN AI ASSISTANT COLUMN (FIXED H-FULL, NO PAGE SCROLL) */}
      <div className="lg:col-span-8 flex flex-col h-full min-h-0 space-y-4 overflow-hidden">
        
        {/* 1. COMPACT WELCOME HEADER BAR (DESKTOP / TABLET ONLY) */}
        <div className="hidden sm:flex shrink-0 relative overflow-hidden rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 px-3.5 py-2 shadow-2xs items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Robot Laptop Image */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-indigo-500/20 dark:from-indigo-950/40 dark:to-purple-950/40 flex items-center justify-center p-1 shrink-0">
              <img
                src="/robot-laptop.png"
                alt="WorkWise Robot Laptop"
                className="w-full h-full object-contain drop-shadow-md animate-float"
              />
            </div>

            <div className="flex items-center gap-2.5">
              <h1 className="text-xs sm:text-sm font-extrabold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
                Hi, I'm <span className="text-[#6366F1] dark:text-indigo-400">WorkWise AI 👋</span>
              </h1>
              <span className="hidden xl:inline-block text-slate-300 dark:text-slate-700">•</span>
              <p className="hidden xl:inline-block text-xs text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
                Your workplace assistant for policies, people & tools
              </p>
            </div>
          </div>

          {/* Badges Row */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-[#6366F1] dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/40">
              <Sparkles className="w-2.5 h-2.5" />
              Helpful
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-[#6366F1] dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/40">
              <ShieldCheck className="w-2.5 h-2.5 text-emerald-500" />
              Secure
            </span>
            <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-[#6366F1] dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/40">
              <Clock className="w-2.5 h-2.5" />
              Always here
            </span>
          </div>
        </div>

        {/* 2. CHAT FEED & FIXED BOTTOM INPUT CONTAINER (FULL EDGE-TO-EDGE ON MOBILE) */}
        <div className="flex-1 min-h-0 bg-white dark:bg-[#111827] border-0 sm:border border-slate-200/80 dark:border-slate-800/80 rounded-none sm:rounded-3xl p-3 sm:p-5 shadow-xs flex flex-col justify-between overflow-hidden">
          
          {/* MOBILE CHAT HEADER BAR (ONLY SHOWN ON MOBILE < SM) */}
          <div className="flex sm:hidden items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center p-0.5">
                <img src="/robot-laptop.png" alt="AI" className="w-full h-full object-contain" />
              </div>
              <span className="font-extrabold text-xs text-slate-900 dark:text-white">WorkWise AI</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-[#6366F1] dark:text-indigo-400">
              Active Assistant
            </span>
          </div>
          
          {/* SCROLLABLE CHAT MESSAGES THREAD (ONLY THIS PORTION SCROLLS) */}
          <div className="flex-1 min-h-0 overflow-y-auto space-y-5 pr-2">
            {messages.map((msg) => {
              const isAI = msg.sender === "ai";
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 text-xs sm:text-sm ${isAI ? "justify-start" : "justify-end"}`}
                >
                  {/* AI Small Robot Avatar */}
                  {isAI && (
                    <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200/60 dark:border-indigo-800/60 flex items-center justify-center p-0.5 shrink-0 overflow-hidden shadow-2xs">
                      <img
                        src="/robot-avatar.png"
                        alt="AI Avatar"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}

                  {/* Message Bubble Body */}
                  <div className={`space-y-1 max-w-[88%] sm:max-w-[82%] ${!isAI && "flex flex-col items-end"}`}>
                    <div
                      className={`p-3.5 rounded-2xl relative shadow-2xs ${
                        isAI
                          ? "bg-slate-50/90 dark:bg-[#1F2937]/90 border border-slate-200/60 dark:border-slate-700/60 text-slate-800 dark:text-slate-100 rounded-tl-xs"
                          : "bg-[#6366F1] text-white rounded-tr-xs shadow-md shadow-indigo-500/15"
                      }`}
                    >
                      <p className="font-semibold text-xs sm:text-sm leading-relaxed">{msg.text}</p>

                      {/* Custom Formatted Bullet List */}
                      {msg.bulletItems && (
                        <ul className="mt-2.5 space-y-1.5 text-xs sm:text-sm">
                          {msg.bulletItems.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-slate-700 dark:text-slate-200 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1] mt-1.5 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Custom Formatted Numbered Steps */}
                      {msg.numberedSteps && (
                        <div className="mt-2.5 space-y-1.5 text-xs sm:text-sm">
                          {msg.numberedSteps.map((step, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <span className="w-4.5 h-4.5 rounded-full bg-[#6366F1] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                                {i + 1}
                              </span>
                              <span className="text-slate-700 dark:text-slate-200 font-medium">{step}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Optional Direct Link / Footer Text */}
                      {msg.linkText && (
                        <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300">
                          {msg.linkHref ? (
                            <div className="flex items-center gap-1.5">
                              <span>Here's the direct link:</span>
                              <Link
                                href={msg.linkHref}
                                className="font-bold text-[#6366F1] dark:text-indigo-400 hover:underline flex items-center gap-1"
                              >
                                {msg.linkText}
                                <ExternalLink className="w-3 h-3" />
                              </Link>
                            </div>
                          ) : (
                            <p>{msg.linkText}</p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Footer Row: Timestamp & Action Buttons */}
                    <div className="flex items-center justify-between px-1 text-[10px] text-slate-400 w-full">
                      <span>{msg.timestamp}</span>

                      {isAI && (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleCopy(msg.id, msg.text)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 active:scale-90 transition-all"
                            title="Copy text"
                          >
                            {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            onClick={() => handleFeedback(msg.id, "up")}
                            className={`p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-90 transition-all ${
                              feedbackState[msg.id] === "up" ? "text-[#6366F1] dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60" : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                            }`}
                            title="Helpful"
                          >
                            <ThumbsUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleFeedback(msg.id, "down")}
                            className={`p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-90 transition-all ${
                              feedbackState[msg.id] === "down" ? "text-red-500 bg-red-50 dark:bg-red-950/60" : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                            }`}
                            title="Not helpful"
                          >
                            <ThumbsDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* User Avatar */}
                  {!isAI && (
                    <img
                      src={userProfile.avatar}
                      alt={userProfile.name}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/20 shrink-0"
                    />
                  )}
                </div>
              );
            })}

            {/* AI Thinking Animation Indicator */}
            {isLoading && (
              <div className="flex gap-3 items-center text-slate-400 text-xs">
                <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200/60 flex items-center justify-center p-0.5 animate-bounce">
                  <img src="/robot-avatar.png" alt="AI" className="w-full h-full object-contain" />
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2.5 rounded-2xl rounded-tl-xs flex items-center gap-2 border border-slate-200 dark:border-slate-700">
                  <span className="w-2 h-2 rounded-full bg-[#6366F1] animate-ping" />
                  <span className="text-slate-600 dark:text-slate-300 font-medium text-xs">WorkWise AI is generating response...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* 3. PERMANENTLY PINNED CHAT INPUT BAR WITH MOBILE QUICK PROMPT CHIPS */}
          <div className="shrink-0 pt-2 border-t border-slate-100 dark:border-slate-800/60 space-y-2">
            
            {/* MOBILE QUICK ACTION CHIPS (HORIZONTAL CAROUSEL ONLY ON MOBILE) */}
            <div className="flex sm:hidden shrink-0 overflow-x-auto no-scrollbar gap-2 pb-1">
              {QUICK_ACTIONS.map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(action.prompt)}
                  className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50/90 dark:bg-indigo-950/70 border border-indigo-200/70 dark:border-indigo-800/60 text-[#6366F1] dark:text-indigo-300 text-[11px] font-semibold active:scale-95 transition-all shadow-2xs"
                >
                  <action.icon className="w-3.5 h-3.5" />
                  <span>{action.label}</span>
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="relative flex items-center w-full rounded-full bg-slate-50/90 dark:bg-[#1A2333]/90 backdrop-blur-md border border-slate-200/90 dark:border-slate-700/90 p-1.5 pl-4 shadow-sm focus-within:ring-2 focus-within:ring-[#6366F1]/50 transition-all"
            >
              <button
                type="button"
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 active:scale-90 transition-all rounded-full"
                title="Attach file"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-transparent text-xs sm:text-sm text-slate-900 dark:text-white px-2 focus:outline-none placeholder:text-slate-400 font-medium"
              />

              <div className="flex items-center gap-1 pr-1">
                <button
                  type="button"
                  onClick={() => setIsVoiceModalOpen(true)}
                  className="p-2 text-slate-400 hover:text-[#6366F1] dark:hover:text-indigo-400 active:scale-90 transition-all rounded-full"
                  title="Voice command"
                >
                  <Mic className="w-4 h-4" />
                </button>

                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-8.5 h-8.5 rounded-full bg-[#6366F1] hover:bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/25 disabled:opacity-40 transition-all hover:scale-105 active:scale-95"
                  title="Send message"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            <p className="text-[10px] text-center text-slate-400 mt-1">
              WorkWise AI can make mistakes. Please verify important information.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR: QUICK ACTIONS & SUGGESTED PROMPTS (DESKTOP ONLY, SCROLLABLE INDEPENDENTLY) */}
      <div className="hidden lg:flex flex-col lg:col-span-4 h-full min-h-0 overflow-y-auto space-y-4 pr-1">
        
        {/* QUICK ACTIONS CARD */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#6366F1] fill-current" />
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
              Quick Actions
            </h3>
          </div>

          <div className="space-y-1.5">
            {QUICK_ACTIONS.map((action, idx) => {
              const Icon = action.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(action.prompt)}
                  className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 hover:bg-indigo-50/80 dark:hover:bg-indigo-950/50 border border-slate-100 dark:border-slate-800/60 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-6.5 h-6.5 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-[#6366F1] dark:text-indigo-400 flex items-center justify-center shrink-0">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span>{action.label}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#6366F1] group-hover:translate-x-0.5 transition-all" />
                </button>
              );
            })}
          </div>
        </div>

        {/* SUGGESTED PROMPTS CARD */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#6366F1]" />
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
              Suggested Prompts
            </h3>
          </div>

          <div className="space-y-1.5">
            {SUGGESTED_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="w-full text-left flex items-center justify-between p-2.5 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 hover:bg-indigo-50/80 dark:hover:bg-indigo-950/50 border border-slate-100 dark:border-slate-800/60 text-slate-700 dark:text-slate-300 text-xs font-medium transition-all group"
              >
                <span className="line-clamp-1 flex-1 pr-2">{prompt}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#6366F1] shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* BOTTOM PROMOTIONAL CARD - MATCHING DESIGN MOCKUP WITH BOOKS.PNG */}
        <div className="relative overflow-hidden rounded-3xl bg-[#EEF2FF] dark:bg-[#1E1B4B]/80 border border-indigo-100/80 dark:border-indigo-800/40 p-5 shadow-2xs group min-h-[140px] flex flex-col justify-between">
          {/* Title & Subtitle */}
          <div className="relative z-10 space-y-1 max-w-[150px]">
            <h4 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight leading-tight">
              Make work<br />easier, together.
            </h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium leading-normal">
              Empower team productivity with real-time AI assistance.
            </p>
          </div>

          {/* Bottom Tag */}
          <div className="relative z-10 pt-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#6366F1]/10 dark:bg-white/10 text-[#6366F1] dark:text-indigo-300 border border-[#6366F1]/20 dark:border-white/20">
              <Sparkles className="w-3 h-3 text-[#6366F1] dark:text-indigo-300" />
              WorkWise Enterprise
            </span>
          </div>

          {/* 3D Books Illustration Image (Vertically Centered on Right Side) */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 w-32 h-32 sm:w-36 sm:h-36 pointer-events-none">
            <img
              src="/books.png"
              alt="WorkWise Productivity"
              className="w-full h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>



      {/* VOICE COMMAND MODAL */}
      <VoiceInputModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onTranscriptComplete={handleVoiceTranscript}
      />
    </div>
  );
}

export default function AssistantPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading AI Assistant...</div>}>
      <AssistantContent />
    </Suspense>
  );
}
