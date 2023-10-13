import { getCurrentUser } from "@/actions/auth";
import openAI from "@/lib/openai";
import { NextRequest, NextResponse } from "next/server";
import { APIError } from "openai";

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

    const aiMessage = await openAI.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    return NextResponse.json(JSON.stringify(aiMessage));
  } catch (error) {
    console.error(error);
    if (error instanceof APIError) {
      return NextResponse.json({ message: error?.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
