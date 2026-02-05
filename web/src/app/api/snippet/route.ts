import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import OpenAI from 'openai';

// Initialize OpenAI (Make sure you have your key in .env!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    // 1. Get data from the Chrome Extension
    const body = await req.json();
    const { code, sourceUrl } = body;

    console.log("🔹 Received Snippet:", code.substring(0, 20) + "...");

    // 2. Ask OpenAI to analyze it
    // (If you don't have a Key yet, we can mock this part)
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a code archivist. Analyze the code snippet. Return a JSON object with these keys: 'title' (short name), 'language' (e.g. typescript), 'explanation' (1 sentence summary), and 'tags' (array of 3 strings)."
        },
        { role: "user", content: code },
      ],
      model: "gpt-3.5-turbo",
      response_format: { type: "json_object" },
    });

    const aiData = JSON.parse(completion.choices[0].message.content || "{}");

    // 3. Save to Database
    const savedSnippet = await prisma.snippet.create({
      data: {
        code: code,
        sourceUrl: sourceUrl,
        title: aiData.title || "Untitled Snippet",
        language: aiData.language || "text",
        explanation: aiData.explanation || "No explanation",
        tags: aiData.tags || [],
      },
    });

    console.log("✅ Saved to DB with ID:", savedSnippet.id);
    
    return NextResponse.json({ success: true, data: savedSnippet });

  } catch (error) {
    console.error("❌ Error saving snippet:", error);
    return NextResponse.json({ success: false, error: 'Failed to save' }, { status: 500 });
  }
}