import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import stripe from "@/lib/stripe";

export type TokenOption = {
  price: number;
  tokens: number;
};

const tokenOptions: TokenOption[] = [
  {
    price: 5,
    tokens: 4000,
  },
  {
    price: 10,
    tokens: 9000,
  },
  {
    price: 20,
    tokens: 20000,
  },
];

export async function POST(request: NextRequest) {
  const { userId } = getAuth(request);
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const user = await clerkClient.users.getUser(userId);
  const userEmail = user.emailAddresses?.[0].emailAddress;

  const body = await request.json();
  const { product } = body;
  const matchingOption = tokenOptions.find((o) => o.tokens === product?.tokens);
  if (!matchingOption)
    return NextResponse.json({ message: "Invalid Product" }, { status: 500 });

  const customer = await stripe.customers.search({
    query: `email:${userEmail}`,
  });
  console.log(customer);

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "USD",
          product_data: {
            name: `${matchingOption.tokens} Tokens`,
          },
          unit_amount: matchingOption.price * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.DOMAIN_URL}/payment/success`,
    cancel_url: `${process.env.DOMAIN_URL}/payment/cancel`,
    customer_email: userEmail,
    payment_intent_data: {
      metadata: {
        userId,
        ...matchingOption,
      },
    },
  });

  return NextResponse.json(session);
}
