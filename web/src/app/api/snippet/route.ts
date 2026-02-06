import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const { code, sourceUrl } = await req.json();

    if (typeof code !== "string" || !code.trim()) {
      return NextResponse.json(
        { success: false, error: "Code is required" },
        { status: 400 }
      );
    }

    let aiData = {
      title: "Untitled Snippet",
      language: "text",
      explanation: "AI processing skipped.",
      tags: ["pending"],
    };

    if (process.env.GEMINI_API_KEY) {
      try {
        const ai = new GoogleGenAI({
          apiKey: process.env.GEMINI_API_KEY,
        });

        const prompt = `
            Return ONLY valid JSON:
            {
            "title": "short title",
            "language": "programming language",
            "explanation": "one sentence explanation",
            "tags": ["tag1", "tag2", "tag3"]
            }

        Code:
        ${code}
        `.trim();

        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: prompt,
        });

        if (!response.text) {
            throw new Error("Gemini returned no text");
        }
        aiData = JSON.parse(response.text);
        console.log("⚡ Gemini Success:", aiData.title);

      } catch (err) {
        console.error("❌ Gemini failed:", err);
      }
    }

    const snippet = await prisma.snippet.create({
      data: {
        code,
        sourceUrl,
        title: aiData.title,
        language: aiData.language,
        explanation: aiData.explanation,
        tags: aiData.tags,
      },
    });

    return NextResponse.json({ success: true, snippet });

  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}
