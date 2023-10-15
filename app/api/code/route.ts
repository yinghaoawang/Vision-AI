import openAI from "@/lib/openai";
import { getAuth } from "@clerk/nextjs/server";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { messages } = body;
    const content =
      "You are an assistant that generates code for the user given their prompt.";

    const systemMessage = {
      role: "system",
      content,
    };

    console.log([systemMessage, ...messages]);

    const aiMessage = await openAI.createChatCompletion({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [systemMessage, ...messages],
      user: userId,
    });
    const stream = OpenAIStream(aiMessage);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
