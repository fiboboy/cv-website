import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate the request
    if (!data.question || !data.protocol || data.protocol !== 'AIIP-2024-SECURE') {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    // Store the question
    const { error } = await supabase
      .from('ai_questions')
      .insert([{
        question: data.question,
        timestamp: new Date().toISOString(),
        status: 'pending',
        protocol: data.protocol,
        metadata: data.metadata || {}
      }]);

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    // Notify about new question if webhook is configured
    if (process.env.QUESTION_NOTIFICATION_WEBHOOK) {
      await fetch(process.env.QUESTION_NOTIFICATION_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'new_question',
          question: data.question,
          timestamp: new Date().toISOString()
        })
      });
    }

    return NextResponse.json({
      status: 'success',
      message: 'Question recorded',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error processing question:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    let query = supabase
      .from('ai_questions')
      .select('*')
      .order('timestamp', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query.limit(50);

    if (error) {
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    return NextResponse.json({ questions: data });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 