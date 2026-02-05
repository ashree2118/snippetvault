import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { code, sourceUrl } = body;

    console.log("🔹 API Received Code:", code.substring(0, 20) + "...");

    let aiData = {
      title: "Untitled Snippet",
      language: "text",
      explanation: "AI processing skipped (No Key)",
      tags: ["pending"]
    };

    // ONLY call OpenAI if the Key exists in .env
    if (process.env.OPENAI_API_KEY) {
      try {
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        const completion = await openai.chat.completions.create({
          messages: [
            {
              role: "system",
              content: "Analyze this code. Return JSON with: title, language, explanation (1 sentence), tags (array of 3)."
            },
            { role: "user", content: code },
          ],
          model: "gpt-3.5-turbo",
          response_format: { type: "json_object" },
        });
        aiData = JSON.parse(completion.choices[0].message.content || "{}");
      } catch (e) {
        console.error("⚠️ OpenAI Error (Skipping):", e);
      }
    }

    // Save to Database
    const snippet = await prisma.snippet.create({
      data: {
        code: code,
        sourceUrl: sourceUrl,
        title: aiData.title,
        language: aiData.language,
        explanation: aiData.explanation,
        tags: aiData.tags,
      },
    });

    console.log("✅ Saved to DB:", snippet.id);
    return NextResponse.json({ success: true, snippet });

  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}