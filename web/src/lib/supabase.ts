import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseEnabled = Boolean(supabaseUrl && supabaseKey);

let supabaseClient: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseEnabled) {
    return null;
  }

  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl as string, supabaseKey as string);
  }

  return supabaseClient;
}

function throwSupabaseDisabled(): never {
  throw new Error('Supabase integration is disabled for this project.');
}

function requireSupabaseClient(): SupabaseClient {
  const client = getSupabaseClient();
  if (!client) {
    throwSupabaseDisabled();
  }
  return client;
}

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

export const aiInteractions = {
  async create(interaction: Omit<AIInteraction, 'id'>) {
    const supabase = requireSupabaseClient();

    const { data, error } = await supabase
      .from('ai_interactions')
      .insert([interaction])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async list() {
    const supabase = getSupabaseClient();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('ai_interactions')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const supabase = getSupabaseClient();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('ai_interactions')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },
};

export const aiQuestions = {
  async createQuestion(question: {
    question: string;
    timestamp: string;
    protocol: string;
    metadata?: Record<string, any>;
  }) {
    const supabase = requireSupabaseClient();

    const { data, error } = await supabase
      .from('ai_questions')
      .insert([
        {
          ...question,
          status: 'pending',
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async list() {
    const supabase = getSupabaseClient();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('ai_questions')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) throw error;
    return data;
  },

  async updateResponse(id: string, response: AIQuestion['response']) {
    const supabase = requireSupabaseClient();

    const { data, error } = await supabase
      .from('ai_questions')
      .update({
        status: 'answered',
        response,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
