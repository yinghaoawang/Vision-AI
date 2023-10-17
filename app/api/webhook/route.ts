import stripe from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";

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
      console.log(session);
      console.log(session?.metadata);
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
