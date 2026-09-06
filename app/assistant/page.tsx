"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { MessageBubble } from "@/components/assistant/MessageBubble";
import { VoiceInputModal } from "@/components/assistant/VoiceInputModal";
import {
  Sparkles,
  Send,
  Mic,
  Plus,
  Trash2,
  Download,
  MessageSquare,
  Zap,
  ShieldCheck,
} from "lucide-react";
import { exportToCSV } from "@/lib/utils";

const DEFAULT_SUGGESTIONS = [
  "What is our annual leave & PTO policy?",
  "Find senior React developers in Engineering",
  "Show department headcount breakdown",
  "Draft new employee onboarding email",
];

function AssistantContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query");

  const {
    chatSessions,
    activeSessionId,
    setActiveSessionId,
    currentMessages,
    addChatMessage,
    createNewChatSession,
    clearChatHistory,
    deleteChatSession,
    userProfile,
  } = useApp();

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages, isLoading]);

  // Handle incoming quick search query from header bar
  useEffect(() => {
    if (initialQuery && initialQuery.trim()) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  const handleSendMessage = async (textToSend?: string) => {
    const queryText = (textToSend || input).trim();
    if (!queryText || isLoading) return;

    setInput("");
    setApiError(null);

    // 1. Add User Message to Chat History
    addChatMessage({
      sender: "user",
      text: queryText,
    });

    setIsLoading(true);

    try {
      // Prepare full payload for backend route
      const historyPayload = [
        ...currentMessages.map((m) => ({ sender: m.sender, text: m.text })),
        { sender: "user", text: queryText },
      ];

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: historyPayload,
          userContext: userProfile,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned HTTP status ${res.status}`);
      }

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // 2. Add AI Response Message to Chat History
      addChatMessage({
        sender: "ai",
        text: data.reply || "I received your message and processed your request.",
        suggestedActions: data.suggestedActions || DEFAULT_SUGGESTIONS.slice(0, 3),
      });
    } catch (err: any) {
      console.error("AI Error:", err);
      setApiError(err.message || "Failed to reach AI service.");
      addChatMessage({
        sender: "ai",
        text: `⚠️ **API Notice**: Unable to complete request (${err.message || "Network error"}). I can still assist with employee directory or policy questions.`,
        isError: true,
        suggestedActions: ["Retry previous question", "Search Employee Directory"],
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceTranscript = (transcriptText: string) => {
    setInput(transcriptText);
    handleSendMessage(transcriptText);
  };

  const handleExportChat = () => {
    if (!currentMessages || currentMessages.length === 0) return;
    const formatted = currentMessages.map((m) => ({
      Sender: m.sender,
      Time: m.timestamp,
      Text: m.text,
    }));
    exportToCSV(formatted, `Chat_History_${activeSessionId}`);
  };

  return (
    <div className="h-[calc(100vh-6rem)] max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
      {/* LEFT CHAT SESSIONS SIDEBAR */}
      <div className="w-full md:w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 flex flex-col justify-between shrink-0 shadow-sm">
        <div className="space-y-4 flex-1 overflow-hidden flex flex-col">
          {/* New Session Button */}
          <button
            onClick={createNewChatSession}
            className="w-full py-2.5 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Conversation
          </button>

          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Chat History ({chatSessions.length})
            </span>
            <button
              onClick={clearChatHistory}
              title="Clear all local history"
              className="text-[11px] text-slate-400 hover:text-red-500 transition-colors"
            >
              Clear All
            </button>
          </div>

          {/* Session List */}
          <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
            {chatSessions.map((session) => {
              const isActive = session.id === activeSessionId;
              return (
                <div
                  key={session.id}
                  onClick={() => setActiveSessionId(session.id)}
                  className={`p-2.5 rounded-xl cursor-pointer text-xs transition-all flex items-center justify-between group ${
                    isActive
                      ? "bg-indigo-50 dark:bg-indigo-950/80 text-indigo-900 dark:text-indigo-200 font-semibold border border-indigo-200 dark:border-indigo-800"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <MessageSquare className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400"}`} />
                    <span className="truncate">{session.title}</span>
                  </div>
                  {chatSessions.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteChatSession(session.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500 transition-opacity"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar Footer info */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Gemini 1.5 API</span>
          </div>
          <button
            onClick={handleExportChat}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-[11px] flex items-center gap-1"
            title="Export chat history"
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        </div>
      </div>

      {/* MAIN CHAT LOG AREA */}
      <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col overflow-hidden shadow-sm">
        {/* Chat Top Banner */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-850/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                EmpPulse AI Assistant
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-medium">
                  Active
                </span>
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Ask policy questions, lookup employees, or draft workspace documents.
              </p>
            </div>
          </div>
        </div>

        {/* Message Log View */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {currentMessages.map((msg, index) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              onSuggestedClick={(promptText) => handleSendMessage(promptText)}
              isLatest={index === currentMessages.length - 1}
            />
          ))}

          {/* AI Typing / Loading Indicator */}
          {isLoading && (
            <div className="flex gap-3 items-center text-slate-400 text-xs">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white animate-pulse">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-tl-xs flex items-center gap-2 border border-slate-200 dark:border-slate-700">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                <span className="ml-1 text-slate-500 font-medium">Gemini AI is thinking...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompt Quick Chips */}
        <div className="px-6 py-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-wrap gap-2">
          {DEFAULT_SUGGESTIONS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="text-[11px] px-3 py-1 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 transition-colors flex items-center gap-1 shadow-2xs"
            >
              <Zap className="w-3 h-3 text-indigo-500" />
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask AI assistant a question or type a command..."
              className="w-full pl-4 pr-24 py-3.5 text-sm rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-slate-400"
            />
            <div className="absolute right-2 flex items-center gap-1.5">
              {/* Voice Microphone Button */}
              <button
                onClick={() => setIsVoiceModalOpen(true)}
                className="p-2 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-200/50 dark:hover:bg-slate-700 rounded-xl transition-colors"
                title="Voice Command"
              >
                <Mic className="w-4 h-4" />
              </button>

              {/* Send Button */}
              <button
                onClick={() => handleSendMessage()}
                disabled={!input.trim() || isLoading}
                className="p-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-xl shadow-md transition-all"
                title="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Voice Recognition Modal */}
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
