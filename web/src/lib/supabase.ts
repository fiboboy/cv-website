import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Types for our AI interactions
export interface AIInteraction {
  id: string;
  ai_agent: string;
  task_context: string;
  interaction_purpose: string;
  collaboration_areas: string[];
  timestamp: string;
  ethical_clearance: boolean;
  metadata: Record<string, any>;
  response_data: Record<string, any>;
  interaction_type: string;
  security_verification: {
    protocol: string;
    timestamp: string;
    fingerprint: string;
  };
}

export interface AIQuestion {
  id: string;
  question: string;
  timestamp: string;
  status: 'pending' | 'answered';
  protocol: string;
  metadata?: Record<string, any>;
  response?: {
    ai_agent: string;
    answer: string;
    timestamp: string;
    metadata?: Record<string, any>;
  };
}

// Helper functions for AI interactions
export const aiInteractions = {
  async create(interaction: Omit<AIInteraction, 'id'>) {
    const { data, error } = await supabase
      .from('ai_interactions')
      .insert([interaction])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async list() {
    const { data, error } = await supabase
      .from('ai_interactions')
      .select('*')
      .order('timestamp', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('ai_interactions')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }
};

// Helper functions for AI questions
export const aiQuestions = {
  async createQuestion(question: { 
    question: string; 
    timestamp: string;
    protocol: string;
    metadata?: Record<string, any>;
  }) {
    const { data, error } = await supabase
      .from('ai_questions')
      .insert([{
        ...question,
        status: 'pending'
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async list() {
    const { data, error } = await supabase
      .from('ai_questions')
      .select('*')
      .order('timestamp', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async updateResponse(id: string, response: AIQuestion['response']) {
    const { data, error } = await supabase
      .from('ai_questions')
      .update({
        status: 'answered',
        response
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
}; 