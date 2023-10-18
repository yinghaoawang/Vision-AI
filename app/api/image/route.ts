import openAI from "@/lib/openai";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export const runtime = "edge";
const tokenCost = 50;

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
    const prompt = messages?.[messages.length - 1]?.content;

    const response = await openAI.createImage({
      prompt,
      user: userId,
      response_format: "b64_json",
      size: "256x256",
    });
    const data = (await response.json())?.data?.[0];

    await prisma.userData.update({
      where: {
        userId,
      },
      data: {
        tokens: userData.tokens - tokenCost,
      },
    });

    return new NextResponse(data.b64_json);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
