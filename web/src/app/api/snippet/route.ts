import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { GoogleGenAI } from "@google/genai";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const snippet = await prisma.snippet.findFirst({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    if (!snippet) {
      return NextResponse.json({ snippet: null });
    }

    return NextResponse.json({
      snippet: {
        id: snippet.id,
        title: snippet.title,
        code: snippet.code,
        language: snippet.language,
        sourceUrl: snippet.sourceUrl,
        createdAt: snippet.createdAt,
      },
    });
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    // 1. Get the current user 
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Read the request body
    const { code, sourceUrl } = await req.json();

    if (typeof code !== "string" || !code.trim()) {
      return NextResponse.json(
        { success: false, error: "Code is required" },
        { status: 400 }
      );
    }

    // 3. Default AI Data (Fallback)
    let aiData = {
      title: "Untitled Snippet",
      language: "text",
      description: "",
      formattedContent: code,
      tags: ["pending"],
    };

    // 4. Call Gemini
    if (process.env.GEMINI_API_KEY) {
      try {
        const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

        const prompt = `
          Analyze this code snippet or text:
          "${code}"

          1. Generate a short title (max 5 words).
          2. Generate a concise description/explanation of what the code does (max 2 sentences).
          3. Generate 5-9 relevant tags.
          4. Detect the primary language.
          5. FORMAT THE CONTENT: If the input is mixed text and code, reformat it into valid Markdown. 
             - Use standard text for explanations.
             - Use \`\`\`language blocks for code.
             - Fix indentation if broken.
          
          Return JSON: { "title": "...", "description": "...", "tags": ["..."], "language": "...", "formattedContent": "..." }
        `;

        const response = await genAI.models.generateContent({
          model: "gemini-2.5-flash",
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }]
            }
          ],
          config: {
            responseMimeType: "application/json",
          }
        });

        if (response.text) {
          aiData = JSON.parse(response.text);
          console.log("⚡ Gemini Success:", aiData.title);
        }

      } catch (err) {
        console.error("❌ Gemini failed:", err);
      }
    }

    // 5. Save to Database
    const snippet = await prisma.snippet.create({
      data: {
        userId: session.user.id, // Connect to the logged-in user
        title: aiData.title || "Untitled",
        explanation: aiData.description || "",
        code: aiData.formattedContent || code,
        language: aiData.language || "text",
        tags: aiData.tags || [],
        sourceUrl: sourceUrl || "",
      },
    });

    return NextResponse.json({ success: true, snippet });

  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}