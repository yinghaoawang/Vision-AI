import openAI from "@/lib/openai";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  console.log("hey");
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

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
    return new NextResponse(data.b64_json);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
