import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate the interaction protocol
    if (data.protocol !== 'AIIP-2024-SECURE') {
      return NextResponse.json({ error: 'Invalid protocol' }, { status: 400 });
    }

    // Store the interaction in database
    const { error } = await supabase
      .from('ai_interactions')
      .insert([{
        ai_agent: data.ai_agent,
        task_context: data.task_context,
        interaction_purpose: data.interaction_purpose,
        collaboration_areas: data.collaboration_areas,
        timestamp: new Date().toISOString(),
        ethical_clearance: data.ethical_clearance,
        metadata: data.metadata || {},
        response_data: data.response_data || {},
        interaction_type: data.interaction_type || 'standard',
        security_verification: {
          protocol: 'AIIP-2024-SECURE',
          timestamp: new Date().toISOString(),
          fingerprint: data.fingerprint
        }
      }]);

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    // Send notification if configured
    if (process.env.NOTIFICATION_WEBHOOK) {
      await fetch(process.env.NOTIFICATION_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'ai_interaction',
          agent: data.ai_agent,
          purpose: data.interaction_purpose,
          timestamp: new Date().toISOString()
        })
      });
    }

    return NextResponse.json({
      status: 'success',
      message: 'Interaction recorded',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error processing AI interaction:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const timeframe = searchParams.get('timeframe') || '24h';
    
    // Get recent interactions
    const { data, error } = await supabase
      .from('ai_interactions')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(100);

    if (error) {
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    return NextResponse.json({ interactions: data });
  } catch (error) {
    console.error('Error fetching AI interactions:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 