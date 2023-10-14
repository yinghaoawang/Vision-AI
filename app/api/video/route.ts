import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import replicate from "@/lib/replicate";

export const runtime = "edge";

const createStreamForPrompt = ({ prompt }: { prompt: string }) => {
  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      controller.enqueue(
        encoder.encode(JSON.stringify({ status: "starting" })),
      );
      try {
        const response = (await replicate.run(
          "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
          {
            input: {
              prompt,
            },
          },
        )) as [string];

        controller.enqueue(
          encoder.encode(JSON.stringify({ url: response[0] })),
        );
        controller.close();
      } catch (error) {
        controller.enqueue(encoder.encode(JSON.stringify({ error })));
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

  const body = await request.json();
  const { messages } = body;
  const prompt = messages?.[messages.length - 1]?.content;

  return new Response(createStreamForPrompt({ prompt }), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
