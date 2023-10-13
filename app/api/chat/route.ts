import { getCurrentUser } from "@/actions/auth";
import openAI from "@/lib/openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextRequest, NextResponse } from "next/server";

export const runtime =
  process.env.NODE_ENV === "production" ? "edge" : "nodejs";

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { messages } = body;

    const aiMessage = await openAI.createChatCompletion({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages
    })
    const stream = OpenAIStream(aiMessage);
    return new StreamingTextResponse(stream)
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
