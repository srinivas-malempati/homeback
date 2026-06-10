import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM = `You are HomeBack, an expert NRI relocation advisor helping Indian families move back to India from the USA.
Always include: real dollar amounts, specific tax percentages, numbered action items, warnings about costly mistakes.
End every response with "⭐ Bottom Line:" — a clear recommendation.
Use emojis as section headers. Be direct and specific.`;

export async function POST(req: NextRequest) {
  try {
    const { prompt, type } = await req.json();
    if (!prompt || !type) return NextResponse.json({ error: "Missing prompt or type" }, { status: 400 });

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content: prompt },
      ],
      max_tokens: 1024,
      temperature: 0.7,
    });

    const text = completion.choices[0]?.message?.content ?? "No response received.";
    return NextResponse.json({ result: text });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
