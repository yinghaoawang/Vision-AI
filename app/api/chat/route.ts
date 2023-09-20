import { getCurrentUser } from '@/actions/auth';
import openAI, { OpenAIError } from '@/lib/openai';
import { NextRequest, NextResponse } from 'next/server';
import { APIError } from 'openai';

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const aiMessage = await openAI.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: []
    });
    console.log('Session', JSON.stringify(currentUser, null, 2));

    return NextResponse.json(JSON.stringify(aiMessage));
  } catch (error) {
    console.error(error);
    if (error instanceof APIError) {
      return NextResponse.json({ message: error?.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
