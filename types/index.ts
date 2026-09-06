export type Department = 
  | "Engineering" 
  | "Product" 
  | "Human Resources" 
  | "Marketing" 
  | "Design" 
  | "Sales" 
  | "Finance";

export type EmployeeStatus = "Active" | "On Leave" | "Remote" | "Offline";

export interface Employee {
  id: string;
  name: string;
  department: Department;
  position: string;
  email: string;
  phone: string;
  avatar: string;
  status: EmployeeStatus;
  location: string;
  joinDate: string;
  skills: string[];
  bio?: string;
  performanceScore?: number;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  suggestedActions?: string[];
  category?: "policy" | "directory" | "analytics" | "general";
  isError?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: string;
  messages: ChatMessage[];
}

export interface UserProfile {
  name: string;
  email: string;
  position: string;
  department: Department;
  bio: string;
  avatar: string;
  location: string;
}

export interface UserSettings {
  theme: "light" | "dark" | "system";
  emailNotifications: boolean;
  slackNotifications: boolean;
  desktopAlerts: boolean;
  aiInsightsDigest: boolean;
  autoVoiceOutput: boolean;
  aiCreativity: "precise" | "balanced" | "creative";
}

export interface AnalyticsMetric {
  title: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  iconName: string;
}

export interface DepartmentStat {
  name: string;
  count: number;
  activeCount: number;
  avgSatisfaction: number;
  budget: string;
}

export interface LocationStat {
  name: string;
  value: number;
  color: string;
}
