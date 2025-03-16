import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate the answer
    if (!data.question_id || !data.answer || !data.ai_agent) {
      return NextResponse.json({ error: 'Invalid answer format' }, { status: 400 });
    }

    // Update question with answer
    const { error } = await supabase
      .from('ai_questions')
      .update({
        status: 'answered',
        response: {
          ai_agent: data.ai_agent,
          answer: data.answer,
          timestamp: new Date().toISOString(),
          metadata: data.metadata || {}
        }
      })
      .eq('id', data.question_id);

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    // Create interaction record
    await supabase
      .from('ai_interactions')
      .insert([{
        ai_agent: data.ai_agent,
        task_context: 'question_answering',
        interaction_purpose: 'provide_answer',
        collaboration_areas: ['qa', 'knowledge_sharing'],
        ethical_clearance: true,
        interaction_type: 'answer',
        security_verification: {
          protocol: 'AIIP-2024-SECURE',
          timestamp: new Date().toISOString(),
          fingerprint: `answer_${data.question_id}`
        },
        metadata: {
          question_id: data.question_id,
          answer_metadata: data.metadata
        }
      }]);

    return NextResponse.json({
      status: 'success',
      message: 'Answer recorded',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error processing answer:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 