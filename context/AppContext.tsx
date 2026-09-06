"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Employee, UserProfile, UserSettings, ChatSession, ChatMessage } from "@/types";
import { MOCK_EMPLOYEES, INITIAL_USER_PROFILE, INITIAL_SETTINGS } from "@/data/mockEmployees";

interface AppContextType {
  theme: "light" | "dark" | "system";
  setTheme: (theme: "light" | "dark" | "system") => void;
  toggleTheme: () => void;
  
  employees: Employee[];
  addEmployee: (employee: Omit<Employee, "id">) => void;
  
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  
  userSettings: UserSettings;
  updateUserSettings: (settings: Partial<UserSettings>) => void;
  
  chatSessions: ChatSession[];
  activeSessionId: string;
  setActiveSessionId: (id: string) => void;
  currentMessages: ChatMessage[];
  addChatMessage: (message: Omit<ChatMessage, "id" | "timestamp">) => void;
  createNewChatSession: () => void;
  clearChatHistory: () => void;
  deleteChatSession: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_SESSION: ChatSession = {
  id: "session-1",
  title: "General HR & Assistant QA",
  createdAt: new Date().toISOString(),
  messages: [
    {
      id: "msg-1",
      sender: "ai",
      text: "Hello! I am your AI Employee Assistant. How can I help you today? You can ask about company policies, leave requests, employee directory info, or team analytics.",
      timestamp: "10:00 AM",
      category: "general",
      suggestedActions: [
        "What is our annual leave policy?",
        "Find React developers in Engineering",
        "Summarize department headcount",
        "Draft new employee onboarding email",
      ],
    },
  ],
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Theme state defaulting to LIGHT mode for crisp clean white aesthetic
  const [theme, setThemeState] = useState<"light" | "dark" | "system">("light");

  // Employees state
  const [employees, setEmployees] = useState<Employee[]>(MOCK_EMPLOYEES);

  // User Profile state
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);

  // User Settings state
  const [userSettings, setUserSettings] = useState<UserSettings>({
    ...INITIAL_SETTINGS,
    theme: "light",
  });

  // Chat sessions state
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([DEFAULT_SESSION]);
  const [activeSessionId, setActiveSessionId] = useState<string>("session-1");

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("app_theme") as "light" | "dark" | "system" | null;
      if (savedTheme) {
        setThemeState(savedTheme);
      }

      const savedEmployees = localStorage.getItem("app_employees");
      if (savedEmployees) {
        setEmployees(JSON.parse(savedEmployees));
      }

      const savedProfile = localStorage.getItem("app_profile");
      if (savedProfile) {
        setUserProfile(JSON.parse(savedProfile));
      }

      const savedSettings = localStorage.getItem("app_settings");
      if (savedSettings) {
        setUserSettings(JSON.parse(savedSettings));
      }

      const savedSessions = localStorage.getItem("app_chat_sessions");
      if (savedSessions) {
        const parsed = JSON.parse(savedSessions);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setChatSessions(parsed);
          setActiveSessionId(parsed[0].id);
        }
      }
    } catch (e) {
      console.error("Failed to load state from localStorage:", e);
    }
  }, []);

  // Sync dark class on document element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "light") {
      root.classList.remove("dark");
    } else {
      // System mode
      const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (isSystemDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
    localStorage.setItem("app_theme", theme);
  }, [theme]);

  // Persist employees when updated
  const addEmployee = (newEmp: Omit<Employee, "id">) => {
    const created: Employee = {
      ...newEmp,
      id: `EMP-${Math.floor(100 + Math.random() * 900)}`,
    };
    const updated = [created, ...employees];
    setEmployees(updated);
    localStorage.setItem("app_employees", JSON.stringify(updated));
  };

  // Persist user profile
  const updateUserProfile = (partial: Partial<UserProfile>) => {
    setUserProfile((prev) => {
      const updated = { ...prev, ...partial };
      localStorage.setItem("app_profile", JSON.stringify(updated));
      return updated;
    });
  };

  // Persist user settings
  const updateUserSettings = (partial: Partial<UserSettings>) => {
    setUserSettings((prev) => {
      const updated = { ...prev, ...partial };
      if (partial.theme) {
        setThemeState(partial.theme);
      }
      localStorage.setItem("app_settings", JSON.stringify(updated));
      return updated;
    });
  };

  const setTheme = (newTheme: "light" | "dark" | "system") => {
    setThemeState(newTheme);
    setUserSettings((prev) => ({ ...prev, theme: newTheme }));
  };

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  };

  // Chat helper logic
  const activeSession = chatSessions.find((s) => s.id === activeSessionId) || chatSessions[0] || DEFAULT_SESSION;
  const currentMessages = activeSession ? activeSession.messages : [];

  const addChatMessage = (msg: Omit<ChatMessage, "id" | "timestamp">) => {
    const timestamp = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(new Date());

    const newMsg: ChatMessage = {
      ...msg,
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp,
    };

    setChatSessions((prevSessions) => {
      const updated = prevSessions.map((session) => {
        if (session.id === activeSessionId) {
          let title = session.title;
          if (session.messages.length <= 1 && msg.sender === "user") {
            title = msg.text.length > 28 ? msg.text.substring(0, 28) + "..." : msg.text;
          }
          return {
            ...session,
            title,
            messages: [...session.messages, newMsg],
          };
        }
        return session;
      });
      localStorage.setItem("app_chat_sessions", JSON.stringify(updated));
      return updated;
    });
  };

  const createNewChatSession = () => {
    const newSession: ChatSession = {
      id: `session-${Date.now()}`,
      title: "New Conversation",
      createdAt: new Date().toISOString(),
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: "ai",
          text: "Starting a new assistant session. How can I assist you with company info or employee tasks?",
          timestamp: new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "numeric", hour12: true }).format(new Date()),
          category: "general",
          suggestedActions: [
            "Show team members in Product",
            "What's our policy on remote work?",
            "View department analytics summary",
          ],
        },
      ],
    };
    const updated = [newSession, ...chatSessions];
    setChatSessions(updated);
    setActiveSessionId(newSession.id);
    localStorage.setItem("app_chat_sessions", JSON.stringify(updated));
  };

  const clearChatHistory = () => {
    const reset = [DEFAULT_SESSION];
    setChatSessions(reset);
    setActiveSessionId(DEFAULT_SESSION.id);
    localStorage.setItem("app_chat_sessions", JSON.stringify(reset));
  };

  const deleteChatSession = (id: string) => {
    if (chatSessions.length <= 1) {
      clearChatHistory();
      return;
    }
    const updated = chatSessions.filter((s) => s.id !== id);
    setChatSessions(updated);
    if (activeSessionId === id) {
      setActiveSessionId(updated[0].id);
    }
    localStorage.setItem("app_chat_sessions", JSON.stringify(updated));
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        employees,
        addEmployee,
        userProfile,
        updateUserProfile,
        userSettings,
        updateUserSettings,
        chatSessions,
        activeSessionId,
        setActiveSessionId,
        currentMessages,
        addChatMessage,
        createNewChatSession,
        clearChatHistory,
        deleteChatSession,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
