import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import replicate from "@/lib/replicate";

export const runtime = "edge";
export const dynamic = "force-dynamic";

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
            "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
            {
              input: {
                prompt,
              },
            },
          )
          .then((response) => {
            status.done = true;
            controller.enqueue(
              encoder.encode(
                stringifyForSSE({ url: (response as [string])[0] }),
              ),
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

  const body = await request.json();
  const { messages } = body;
  const prompt = messages?.[messages.length - 1]?.content;

  return new NextResponse(createStreamForPrompt({ prompt }), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}