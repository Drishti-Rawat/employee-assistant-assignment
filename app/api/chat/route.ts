import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, userContext } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid message history payload" },
        { status: 400 }
      );
    }

    const lastUserMessage = messages[messages.length - 1]?.text || "";

    const apiKey =
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY ||
      process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    // If Gemini API Key exists, call the real API
    if (apiKey) {
      try {
        const systemInstruction = `You are "EmpPulse AI", an executive employee assistant dashboard AI for an enterprise company.
You assist employees and managers with:
1. Company HR policies (PTO, parental leave, remote work guidelines, learning stipends)
2. Employee directory queries & org structure
3. Department analytics and headcount summaries
4. Writing professional emails, onboarding plans, and performance summaries.

Keep responses concise, clear, helpful, and formatted with markdown list items or bold text where appropriate.`;

        // Format conversation history for Gemini API
        const contents = messages.map((m: any) => ({
          role: m.sender === "user" ? "user" : "model",
          parts: [{ text: m.text }],
        }));

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents,
              systemInstruction: {
                parts: [{ text: systemInstruction }],
              },
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 800,
              },
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const candidateText =
            data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidateText) {
            return NextResponse.json({
              reply: candidateText,
              suggestedActions: [
                "Draft follow-up email",
                "Search employee directory",
                "Export analytics breakdown",
              ],
            });
          }
        } else {
          const errText = await response.text();
          console.warn("Gemini API Error response:", errText);
        }
      } catch (geminiError) {
        console.error("Gemini fetch error, falling back to smart engine:", geminiError);
      }
    }

    // Fallback Smart Assistant Engine (Works seamlessly offline/without API key)
    const lower = lastUserMessage.toLowerCase();
    let replyText = "";
    let suggestions: string[] = [];

    if (lower.includes("leave") || lower.includes("pto") || lower.includes("vacation") || lower.includes("policy")) {
      replyText = `### 🌴 Annual Paid Leave & PTO Policy Summary\n\n- **Standard Paid Time Off**: Full-time team members receive **22 days of PTO per calendar year**, accrued monthly.\n- **Sick & Wellness Leave**: **10 dedicated days** for health and mental wellness.\n- **Parental Leave**: **16 weeks fully paid** primary caregiver leave; **8 weeks** secondary caregiver leave.\n- **Rollover**: Up to **5 unused PTO days** can roll over into Q1 of the following year.\n\n*To apply for leave, submit your request via the Profile Settings or notify your manager 2 weeks prior.*`;
      suggestions = [
        "How do I request parental leave?",
        "What is our remote work stipend policy?",
        "Show HR department contacts",
      ];
    } else if (lower.includes("engineering") || lower.includes("developer") || lower.includes("tech") || lower.includes("react")) {
      replyText = `### 💻 Engineering Department Overview\n\nOur Engineering team currently consists of **5 active team members** across Frontend, Backend, AI/ML, and Cloud DevOps:\n\n1. **Alexandra Chen** – Staff Frontend Architect *(React, Next.js, System Design)*\n2. **Marcus Vance** – Senior Backend Engineer *(Go, Node.js, PostgreSQL)*\n3. **Amara Nwosu** – AI & ML Solutions Lead *(PyTorch, LLMs, RAG Pipelines)*\n4. **Lucas Meyer** – DevOps & Cloud Engineer *(AWS, Terraform, Kubernetes)*\n\nWould you like me to connect you or generate an introduction draft?`;
      suggestions = [
        "Filter directory by Engineering",
        "View Engineering budget & stats",
        "Draft tech team intro email",
      ];
    } else if (lower.includes("headcount") || lower.includes("analytics") || lower.includes("department") || lower.includes("count")) {
      replyText = `### 📊 Company Headcount & Department Distribution\n\n- **Total Active Workforce**: **124 Employees** across 6 core departments.\n- **Engineering**: **42 members** (34% of total)\n- **Sales & Business Dev**: **28 members** (23% of total)\n- **Marketing & Growth**: **18 members** (15% of total)\n- **Product & Design**: **16 members** (13% of total)\n- **Human Resources & Finance**: **20 members** (15% of total)\n\n📈 **Workplace Model**: 45% Remote, 40% Hybrid, 15% On-Site Headquarters.`;
      suggestions = [
        "Open Analytics Dashboard",
        "Export workforce report to CSV",
        "Who is Head of People & Culture?",
      ];
    } else if (lower.includes("onboarding") || lower.includes("welcome") || lower.includes("email") || lower.includes("draft")) {
      replyText = `### ✉️ Generated Employee Onboarding Email Draft\n\n**Subject**: Welcome to the Team, [Employee Name]! 🎉\n\nHi [Employee Name],\n\nWe are thrilled to welcome you to the company as our new **[Position]** in **[Department]**!\n\nHere are your key first-week links:\n- 📖 **Employee Handbook & Policies**: [Company Wiki]\n- 💬 **Team Slack Channel**: #welcome-[department]\n- 👤 **IT & Setup Portal**: Contact Lucas Meyer (DevOps Lead)\n\nWe look forward to meeting you at our Monday Team Sync!\n\nBest regards,\n**${userContext?.name || "Alex Sterling"}**\n${userContext?.position || "Senior Operations Lead"}`;
      suggestions = [
        "Copy draft to clipboard",
        "Customize onboarding checklist",
        "Schedule welcome call",
      ];
    } else {
      replyText = `Thank you for your question! I analyzed your query: **"${lastUserMessage}"**.\n\nI can assist you with:\n- 🔍 **Employee Directory**: Finding team members, roles, contact emails, and technical skills.\n- 📊 **Department Analytics**: Real-time headcount, active status breakdown, and metrics.\n- 📋 **Company Policies**: PTO, parental leave, remote work stipends, and onboarding guides.\n- 📝 **Automated Tasks**: Draft emails, generate team performance outlines, or prepare meeting agendas.\n\nHow would you like to proceed?`;
      suggestions = [
        "What is our annual leave policy?",
        "Find senior engineers in directory",
        "Show department headcount breakdown",
      ];
    }

    return NextResponse.json({
      reply: replyText,
      suggestedActions: suggestions,
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process AI assistant response", details: error?.message },
      { status: 500 }
    );
  }
}
