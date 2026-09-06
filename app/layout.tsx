import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { AppShell } from "@/components/AppShell";

const inter = Inter({ subsets: ["latin"] });
const caveat = Caveat({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-caveat" });

export const metadata: Metadata = {
  title: "EmpPulse AI | Enterprise Employee Assistant & HR Dashboard",
  description:
    "A modern AI-powered Employee Assistant Dashboard featuring smart Q&A, employee directory search, real-time analytics, and personalized settings.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${inter.className} ${caveat.variable} min-h-full flex flex-col font-sans bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100`}>
        <AppProvider>
          <AppShell>{children}</AppShell>
        </AppProvider>
      </body>
    </html>
  );
}
