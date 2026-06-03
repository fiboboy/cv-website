import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    {
      status: 'disabled',
      message: 'Answer recording is disabled.',
    },
    { status: 410 }
  );
}
