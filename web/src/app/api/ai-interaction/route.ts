import { NextResponse } from 'next/server';

const disabledPayload = {
  status: 'disabled',
  message: 'AI interaction storage is no longer active for this portfolio.',
};

export async function POST() {
  return NextResponse.json(disabledPayload, { status: 410 });
}

export async function GET() {
  return NextResponse.json(
    {
      ...disabledPayload,
      interactions: [],
    },
    { status: 200 }
  );
}
