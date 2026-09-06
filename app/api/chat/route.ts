import { NextRequest, NextResponse } from "next/server";
import { MOCK_EMPLOYEES } from "@/data/mockEmployees";

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

    // Create detailed company knowledge context from employee data and policies
    const employeeDirectorySummary = MOCK_EMPLOYEES.map(
      (e) => `- ${e.name} (${e.position}, ${e.department} Dept) | Email: ${e.email} | Location: ${e.location} | Skills: ${e.skills.join(", ")}`
    ).join("\n");

    const systemInstruction = `You are "WorkWise AI", the dedicated internal workplace and employee assistant for WorkWise enterprise.
Your primary role is to assist employees and managers strictly with company-related matters.

COMPANY KNOWLEDGE & CONTEXT:
1. EMPLOYEE DIRECTORY & ROLES:
${employeeDirectorySummary}

2. HR & LEAVE POLICIES:
- Annual PTO: 22 paid days per calendar year (accrued monthly). Up to 5 unused days roll over to Q1 of next year.
- Sick & Mental Wellness Leave: 10 dedicated paid days.
- Parental Leave: 16 weeks fully paid for primary caregivers; 8 weeks for secondary caregivers.
- Remote Work Policy: Hybrid model (40% hybrid, 45% fully remote, 15% HQ on-site). $500 annual home office equipment stipend.
- Learning & Development: $1,200 annual learning stipend per employee for courses, certifications, and books.

3. WORKPLACE OPERATIONS & IT SUPPORT:
- HR Portal: Access leave application, performance reviews, and benefits enrolment under Profile Settings or Directory.
- IT Support: Contact Lucas Meyer (DevOps & Cloud Lead) or submit an IT ticket for hardware/software/password resets.
- Meeting Rooms: Conference rooms can be reserved via Google Calendar / HR portal integrations.

STRICT BOUNDARY INSTRUCTIONS:
- You must ONLY answer questions that are related to company operations, HR policies, employee directory, department analytics, professional onboarding/email drafting, IT support, and workplace productivity.
- Current active user speaking with you: ${userContext?.name || "Alex Sterling"} (${userContext?.position || "Senior Operations Lead"}, ${userContext?.department || "Human Resources"}).
- IF THE USER ASKS OFF-TOPIC, UNRELATED, OR NON-COMPANY QUESTIONS (such as cooking recipes, sports scores, movie trivia, general entertainment, gaming, or non-work topics), YOU MUST POLITELY DECLINE using this exact tone:
"I am WorkWise AI, your dedicated company workplace assistant. I am configured strictly to assist with WorkWise company policies, employee directory queries, department analytics, and workplace tasks. How can I help you with your work today?"
- Always maintain a professional, helpful, concise, and enterprise-friendly tone. Format your answers clearly using markdown list items and bold headers where applicable.`;

    // If Gemini API Key exists, call the real API
    if (apiKey) {
      try {
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
                temperature: 0.5,
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
                "What are our core HR policies?",
                "Search employee directory",
                "Show department headcount breakdown",
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

    // Fallback Smart Assistant Engine (Offline / without API key)
    const lower = lastUserMessage.toLowerCase();
    let replyText = "";
    let suggestions: string[] = [];

    // Off-topic filter check for fallback engine
    const offTopicKeywords = ["recipe", "cook", "pizza", "movie", "football", "soccer", "cricket", "game", "president", "weather in", "joke", "song", "lyrics"];
    const isOffTopic = offTopicKeywords.some(kw => lower.includes(kw));

    if (isOffTopic) {
      replyText = `I am **WorkWise AI**, your dedicated workplace assistant.\n\nI am configured strictly to assist with **WorkWise company policies, employee directory queries, department analytics, and workplace tasks**.\n\nHow can I assist you with your work today?`;
      suggestions = [
        "What is our annual leave policy?",
        "Find senior engineers in directory",
        "Show department headcount breakdown",
      ];
    } else if (lower.includes("leave") || lower.includes("pto") || lower.includes("vacation") || lower.includes("policy")) {
      replyText = `### 🌴 Annual Paid Leave & PTO Policy Summary\n\n- **Standard Paid Time Off**: Full-time team members receive **22 days of PTO per calendar year**, accrued monthly.\n- **Sick & Wellness Leave**: **10 dedicated days** for health and mental wellness.\n- **Parental Leave**: **16 weeks fully paid** primary caregiver leave; **8 weeks** secondary caregiver leave.\n- **Rollover**: Up to **5 unused PTO days** can roll over into Q1 of the following year.\n\n*To apply for leave, submit your request via Profile Settings or notify your manager.*`;
      suggestions = [
        "How do I request parental leave?",
        "What is our remote work stipend policy?",
        "Show HR department contacts",
      ];
    } else if (lower.includes("engineering") || lower.includes("developer") || lower.includes("tech") || lower.includes("react")) {
      replyText = `### 💻 Engineering Department Overview\n\nOur Engineering team currently consists of **5 active team members**:\n\n1. **Alexandra Chen** – Staff Frontend Architect *(React, Next.js, System Design)*\n2. **Marcus Vance** – Senior Backend Engineer *(Go, Node.js, PostgreSQL)*\n3. **Amara Nwosu** – AI & ML Solutions Lead *(PyTorch, LLMs, RAG Pipelines)*\n4. **Lucas Meyer** – DevOps & Cloud Engineer *(AWS, Terraform, Kubernetes)*\n\nWould you like me to connect you or generate an introduction draft?`;
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
      replyText = `### ✉️ Generated Employee Onboarding Email Draft\n\n**Subject**: Welcome to the Team, [Employee Name]! 🎉\n\nHi [Employee Name],\n\nWe are thrilled to welcome you to WorkWise as our new **[Position]** in **[Department]**!\n\nHere are your key first-week links:\n- 📖 **Employee Handbook & Policies**: [Company Wiki]\n- 💬 **Team Slack Channel**: #welcome-[department]\n- 👤 **IT & Setup Portal**: Contact Lucas Meyer (DevOps Lead)\n\nWe look forward to meeting you at our Monday Team Sync!\n\nBest regards,\n**${userContext?.name || "Alex Sterling"}**\n${userContext?.position || "Senior Operations Lead"}`;
      suggestions = [
        "Copy draft to clipboard",
        "Customize onboarding checklist",
        "Schedule welcome call",
      ];
    } else {
      replyText = `Thank you for your question! I am **WorkWise AI**, your enterprise workplace assistant.\n\nI can assist you with:\n- 🔍 **Employee Directory**: Finding team members, contact emails, roles, and skills.\n- 📊 **Department Analytics**: Real-time headcount, active status breakdown, and metrics.\n- 📋 **Company Policies**: PTO, parental leave, remote work stipends, and onboarding guides.\n- 📝 **Workplace Tasks**: Drafting emails, performance summaries, or team meeting agendas.\n\nHow can I help you today?`;
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
