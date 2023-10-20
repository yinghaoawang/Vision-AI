import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import replicate from "@/lib/replicate";
import prisma from "@/lib/prismadb";

export const runtime = "edge";
const tokenCost = 200;

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const stringifyForSSE = (object: object) => {
  return `${JSON.stringify(object)}\n\n`;
};

const createStreamForPrompt = ({ prompt }: { prompt: string }) => {
  const status = {
    done: false,
  };

  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      controller.enqueue(
        encoder.encode(stringifyForSSE({ status: "starting" })),
      );

      try {
        replicate
          .run(
            "meta/musicgen:7a76a8258b23fae65c5a22debb8841d1d7e816b75c2f24218cd2bd8573787906",
            {
              input: {
                model_version: "melody",
                prompt,
              },
            },
          )
          .then((response) => {
            status.done = true;
            controller.enqueue(
              encoder.encode(stringifyForSSE({ url: response })),
            );
            controller.close();
          });

        while (!status.done) {
          await delay(1000);
          controller.enqueue(
            encoder.encode(stringifyForSSE({ status: "processing" })),
          );
        }
      } catch (error) {
        status.done = true;
        console.error(error);
        controller.enqueue(encoder.encode(stringifyForSSE({ error })));
        controller.close();
      }
    },
  });

  return readable;
};

export async function POST(request: NextRequest) {
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
        statusCode: "TOKENS_EXHAUSTED",
      },
      { status: 400, statusText: "TOKENS_EXHAUSTED" },
    );

  const body = await request.json();
  const { messages } = body;
  const prompt = messages?.[messages.length - 1]?.content;

  await prisma.userData.update({
    where: {
      userId,
    },
    data: {
      tokens: userData.tokens - tokenCost,
    },
  });

  return new NextResponse(createStreamForPrompt({ prompt }), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}
