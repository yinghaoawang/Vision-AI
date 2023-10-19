import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import stripe from "@/lib/stripe";

export async function GET(request: NextRequest) {
  const { userId } = getAuth(request);
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const user = await clerkClient.users.getUser(userId);
  const userEmail = user.emailAddresses?.[0].emailAddress;

  const matchingCustomers = await stripe.customers.list({ email: userEmail });
  const matchingCustomer = matchingCustomers?.data?.[0];

  const customer =
    matchingCustomer ||
    (await stripe.customers.create({
      email: userEmail,
    }));

  const session = await stripe.billingPortal.sessions.create({
    customer: customer.id,
    return_url: `${process.env.DOMAIN_URL}/dashboard`,
  });

  return NextResponse.json(session);
}
