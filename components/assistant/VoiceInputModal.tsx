"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, X, Sparkles, Volume2, RotateCcw } from "lucide-react";

interface VoiceInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTranscriptComplete: (transcript: string) => void;
}

export function VoiceInputModal({
  isOpen,
  onClose,
  onTranscriptComplete,
}: VoiceInputModalProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setErrorMsg("Web Speech API is not supported in this browser. You can type your query directly.");
      return;
    }

    try {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
        setErrorMsg(null);
      };

      recognition.onresult = (event: any) => {
        let currentText = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentText += event.results[i][0].transcript;
        }
        setTranscript(currentText);
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error);
        setIsListening(false);
        if (event.error !== "no-speech") {
          setErrorMsg(`Voice error: ${event.error}. Please try again.`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.error(e);
      setErrorMsg("Failed to start voice input. Please check microphone permissions.");
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setIsListening(false);
      setTranscript("");
      setErrorMsg(null);
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
      return;
    }

    startListening();

    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleUseTranscript = () => {
    if (transcript.trim()) {
      onTranscriptComplete(transcript);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl relative space-y-6 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 relative">
            {isListening ? (
              <>
                <span className="absolute inset-0 rounded-full bg-indigo-500/40 animate-ping" />
                <Mic className="w-8 h-8 relative z-10 animate-bounce" />
              </>
            ) : (
              <MicOff className="w-8 h-8 opacity-75" />
            )}
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            {isListening ? "Listening to your voice..." : "Voice Input"}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isListening
              ? "Speak your question clearly into your microphone"
              : "Click below to review or send your voice prompt"}
          </p>
        </div>

        {errorMsg ? (
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-xs text-amber-700 dark:text-amber-300 text-center">
            {errorMsg}
          </div>
        ) : (
          <div className="min-h-24 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-sm text-slate-800 dark:text-slate-200 flex items-center justify-center text-center italic">
            {transcript ? `"${transcript}"` : isListening ? "Listening..." : "No audio detected yet."}
          </div>
        )}

        <div className="flex flex-col gap-2">
          {!isListening && (
            <button
              onClick={startListening}
              className="w-full py-2 px-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-[#6366F1] dark:text-indigo-300 font-bold text-xs hover:bg-indigo-100 transition-all flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Tap to Listen Again</span>
            </button>
          )}

          <div className="flex items-center gap-3">
            <button
              onClick={handleUseTranscript}
              disabled={!transcript.trim()}
              className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Send Voice Prompt
            </button>
            <button
              onClick={onClose}
              className="py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
