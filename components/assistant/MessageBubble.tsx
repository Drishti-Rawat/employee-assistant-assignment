"use client";

import React, { useState, useEffect } from "react";
import { ChatMessage } from "@/types";
import { Sparkles, Copy, Check, AlertCircle, ArrowUpRight } from "lucide-react";
import { useApp } from "@/context/AppContext";

interface MessageBubbleProps {
  message: ChatMessage;
  onSuggestedClick?: (prompt: string) => void;
  isLatest?: boolean;
}

export function MessageBubble({ message, onSuggestedClick, isLatest }: MessageBubbleProps) {
  const { userProfile } = useApp();
  const [copied, setCopied] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const isAI = message.sender === "ai";

  // Typing animation simulation for newest AI messages
  useEffect(() => {
    if (isAI && isLatest) {
      let index = 0;
      setDisplayedText("");
      const fullText = message.text;
      const speed = Math.max(5, Math.min(25, Math.floor(1000 / fullText.length)));
      
      const interval = setInterval(() => {
        if (index < fullText.length) {
          setDisplayedText(fullText.substring(0, index + 1));
          index++;
        } else {
          setDisplayedText(fullText);
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    } else {
      setDisplayedText(message.text);
    }
  }, [message.text, isAI, isLatest]);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper renderer for simple markdown rendering (bold, headers, bullets)
  const renderFormattedText = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, idx) => {
      if (line.startsWith("### ")) {
        return (
          <h4 key={idx} className="text-sm sm:text-base font-bold text-amber-900 dark:text-amber-300 mt-2 mb-1">
            {line.replace("### ", "")}
          </h4>
        );
      }
      if (line.startsWith("- ") || line.startsWith("* ")) {
        const bulletContent = line.substring(2);
        return (
          <li key={idx} className="ml-4 list-disc text-stone-700 dark:text-stone-300 my-0.5">
            <span dangerouslySetInnerHTML={{ __html: formatBold(bulletContent) }} />
          </li>
        );
      }
      if (line.trim() === "") {
        return <div key={idx} className="h-2" />;
      }
      return (
        <p key={idx} className="text-stone-800 dark:text-stone-200 leading-relaxed my-1">
          <span dangerouslySetInnerHTML={{ __html: formatBold(line) }} />
        </p>
      );
    });
  };

  const formatBold = (str: string) => {
    return str.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-stone-900 dark:text-white">$1</strong>');
  };

  return (
    <div className={`flex gap-3 text-xs sm:text-sm ${isAI ? "justify-start" : "justify-end"}`}>
      {/* AI Avatar */}
      {isAI && (
        <div className="w-8 h-8 rounded-xl bg-amber-800 flex items-center justify-center text-white shrink-0 shadow-md shadow-amber-800/20">
          <Sparkles className="w-4 h-4" />
        </div>
      )}

      {/* Message Content Box */}
      <div className={`space-y-2 max-w-[88%] sm:max-w-[78%] ${!isAI && "flex flex-col items-end"}`}>
        {/* Top bar with sender & timestamp */}
        <div className="flex items-center gap-2 px-1 text-[11px] text-stone-400">
          <span className="font-semibold">{isAI ? "WorkWise AI" : userProfile.name}</span>
          <span>•</span>
          <span>{message.timestamp}</span>
        </div>

        {/* Bubble container */}
        <div
          className={`p-4 rounded-2xl relative shadow-xs group ${
            isAI
              ? message.isError
                ? "bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-900 dark:text-red-200"
                : "bg-white dark:bg-[#24201D] border border-amber-200/60 dark:border-stone-800 text-stone-900 dark:text-stone-100 rounded-tl-xs"
              : "bg-amber-800 text-white rounded-tr-xs shadow-md shadow-amber-800/10"
          }`}
        >
          {message.isError && (
            <div className="flex items-center gap-1.5 text-red-600 dark:text-red-400 font-semibold mb-2 text-xs">
              <AlertCircle className="w-4 h-4" />
              API Notice
            </div>
          )}

          {isAI ? renderFormattedText(displayedText) : <p className="leading-relaxed whitespace-pre-wrap">{message.text}</p>}

          {/* Copy Button for AI response */}
          {isAI && (
            <button
              onClick={handleCopy}
              className="absolute top-2.5 right-2.5 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 bg-stone-100 dark:bg-stone-800 text-stone-500 hover:text-stone-900 dark:hover:text-white transition-opacity"
              title="Copy message"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>

        {/* Suggested Actions Prompt Chips under AI response */}
        {isAI && message.suggestedActions && message.suggestedActions.length > 0 && (
          <div className="pt-1 flex flex-wrap gap-1.5">
            {message.suggestedActions.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => onSuggestedClick && onSuggestedClick(prompt)}
                className="text-[11px] px-3 py-1.5 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-amber-100 dark:hover:bg-amber-950/80 text-stone-700 dark:text-stone-300 hover:text-amber-800 dark:hover:text-amber-300 border border-amber-200/60 dark:border-stone-800 transition-colors flex items-center gap-1 group/btn"
              >
                <span>{prompt}</span>
                <ArrowUpRight className="w-3 h-3 text-stone-400 group-hover/btn:text-amber-800 transition-colors" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* User Avatar */}
      {!isAI && (
        <img
          src={userProfile.avatar}
          alt={userProfile.name}
          className="w-8 h-8 rounded-xl object-cover ring-2 ring-amber-800/20 shrink-0"
        />
      )}
    </div>
  );
}
