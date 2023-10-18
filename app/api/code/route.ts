import openAI from "@/lib/openai";
import { getAuth } from "@clerk/nextjs/server";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export const runtime = "edge";
const tokenCost = 10;

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userData = await prisma.userData.findFirst({
      where: {
        userId,
      },
    });

    if (userData == null)
      throw new Error("User data does not exist for " + userId);

    if (userData.tokens < tokenCost)
      return NextResponse.json(
        {
          message: "Not enough tokens",
        },
        { status: 400, statusText: "TOKENS_EXHAUSTED" },
      );

    const body = await request.json();
    const { messages } = body;
    const content =
      "You are an assistant that generates code for the user given their prompt.";

    const systemMessage = {
      role: "system",
      content,
    };

    const aiMessage = await openAI.createChatCompletion({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [systemMessage, ...messages],
      user: userId,
    });
    const stream = OpenAIStream(aiMessage);

    await prisma.userData.update({
      where: {
        userId,
      },
      data: {
        tokens: userData.tokens - tokenCost,
      },
    });

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
