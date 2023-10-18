import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { clerkClient } from "@clerk/nextjs";

export async function GET(request: NextRequest) {
  const { userId } = getAuth(request);
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const user = await clerkClient.users.getUser(userId);
  if (user == null) {
    return NextResponse.json(
      { message: "User is signed in but does not exist " + userId },
      { status: 500 },
    );
  }

  const userData = await prisma.userData.findFirst({
    where: {
      userId,
    },
  });

  if (userData == null) {
    console.error(`User data does not exist for ${userId}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }

  return NextResponse.json({ user, userData });
}
