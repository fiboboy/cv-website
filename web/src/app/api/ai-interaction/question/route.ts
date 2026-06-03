import { NextResponse } from 'next/server';

const disabledPayload = {
  status: 'disabled',
  message: 'Question intake for AI interaction is disabled.',
};

export async function POST() {
  return NextResponse.json(disabledPayload, { status: 410 });
}

export async function GET() {
  return NextResponse.json(
    {
      ...disabledPayload,
      questions: [],
    },
    { status: 200 }
  );
}
