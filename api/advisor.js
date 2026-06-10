export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { prompt, type } = req.body;
  if (!prompt || !type) return res.status(400).json({ error: "Missing prompt or type" });

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `You are HomeBack, an expert NRI relocation advisor helping Indian families move back to India from the USA.
Always include: real dollar amounts, specific tax percentages, numbered action items, warnings about costly mistakes.
End every response with "⭐ Bottom Line:" — a clear recommendation.
Use emojis as section headers. Be direct and specific. No vague advice.`,
          },
          { role: "user", content: prompt },
        ],
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    if (!response.ok) return res.status(500).json({ error: data.error?.message || "Groq API error" });

    const text = data.choices?.[0]?.message?.content || "No response received.";
    return res.status(200).json({ result: text });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Server error" });
  }
}
