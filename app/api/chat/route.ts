import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "mistral",
        prompt: `You are a helpful AI assistant for a portfolio website. Only answer questions about the portfolio, projects, skills, and experience. Keep responses concise.\n\nUser: ${message}\nAssistant:`,
        stream: false,
      }),
    })

    if (!response.ok) {
      return NextResponse.json({ error: "AI service unavailable. Please ensure Ollama is running." }, { status: 503 })
    }

    const data = await response.json()
    return NextResponse.json({ response: data.response })
  } catch (error) {
    return NextResponse.json({ error: "Failed to connect to AI service" }, { status: 500 })
  }
}
