import stripe from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import prisma from "@/lib/prismadb";

export async function POST(request: NextRequest) {
  let event: Stripe.Event | undefined;
  const signature = headers().get("stripe-signature");
  try {
    event = stripe.webhooks.constructEvent(
      await request.text(),
      signature,
      process.env.STRIPE_WEBHOOK_SECRET_KEY,
    );
  } catch (error) {
    console.error(`⚠️  Webhook signature verification failed.`, error);
    return NextResponse.json({ message: "Bad Request" }, { status: 400 });
  }

  const session = event?.data.object as Stripe.Checkout.Session;

  // Handle the event
  switch (event?.type) {
    case "payment_intent.succeeded":
      const metadata = session?.metadata;
      const clerkTokens = metadata?.tokens as string | null;
      const clerkUserId = metadata?.userId as string | null;

      if (clerkTokens == null || clerkUserId == null) {
        throw new Error("Tokens or userId is messing from the metadata.");
      }

      const userData = await prisma.userData.findFirst({
        where: {
          userId: clerkUserId,
        },
      });

      if (userData == null)
        throw new Error("UserData for user could not be found");

      const newTokensAmt = parseInt(clerkTokens) + userData.tokens;

      await prisma.userData.update({
        where: {
          id: userData.id,
        },
        data: {
          tokens: newTokensAmt,
        },
      });

      console.log('new tokens', newTokensAmt);

      break;

    default:
      console.error(`Unhandled event type: ${event?.type || "null"}.`);
      return Response.json(
        { message: "Internal Server Error" },
        { status: 500 },
      );
  }

  return new NextResponse(null, { status: 200 });
}
