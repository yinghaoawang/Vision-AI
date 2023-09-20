import bcrypt from 'bcrypt';
import prisma from '@/lib/prismadb';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError, z } from 'zod';
import { Prisma } from '@prisma/client';

const UserData = z.object({
  email: z.string().email(),
  name: z.string().min(3).max(36),
  password: z.string().min(6).max(36)
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, password } = body;
    const hashedPassword = await bcrypt.hash(password, 12);

    UserData.parse({
      email,
      name,
      password
    });

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword
      }
    });
    return NextResponse.json(user);
  } catch (error: any) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          message: error.message
        },
        { status: 500 }
      );
    } else if (error instanceof ZodError) {
      const errorDetail = error.errors.at(0);
      return NextResponse.json(
        {
          message: errorDetail?.path.at(0) + ': ' + errorDetail?.message
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
