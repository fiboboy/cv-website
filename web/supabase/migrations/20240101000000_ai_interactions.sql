-- Create AI interactions table
CREATE TABLE ai_interactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    ai_agent VARCHAR NOT NULL,
    task_context TEXT NOT NULL,
    interaction_purpose TEXT NOT NULL,
    collaboration_areas TEXT[] NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL,
    ethical_clearance BOOLEAN NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    response_data JSONB DEFAULT '{}'::jsonb,
    interaction_type VARCHAR NOT NULL,
    security_verification JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create AI questions table
CREATE TABLE ai_questions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    question TEXT NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL,
    status VARCHAR NOT NULL,
    protocol VARCHAR NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    response JSONB DEFAULT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updating updated_at
CREATE TRIGGER update_ai_questions_updated_at
    BEFORE UPDATE ON ai_questions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better query performance
CREATE INDEX idx_ai_interactions_timestamp ON ai_interactions(timestamp);
CREATE INDEX idx_ai_interactions_ai_agent ON ai_interactions(ai_agent);
CREATE INDEX idx_ai_questions_timestamp ON ai_questions(timestamp);
CREATE INDEX idx_ai_questions_status ON ai_questions(status);

-- Add RLS (Row Level Security) policies
ALTER TABLE ai_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_questions ENABLE ROW LEVEL SECURITY;

-- Create policies for ai_interactions
CREATE POLICY "Enable read access for all users" ON ai_interactions
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated AI agents" ON ai_interactions
    FOR INSERT WITH CHECK (
        auth.role() = 'authenticated' AND 
        security_verification->>'protocol' = 'AIIP-2024-SECURE'
    );

-- Create policies for ai_questions
CREATE POLICY "Enable read access for all users" ON ai_questions
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON ai_questions
    FOR INSERT WITH CHECK (
        auth.role() = 'authenticated' AND 
        protocol = 'AIIP-2024-SECURE'
    );

-- Create policy for updating questions (e.g., when AI responds)
CREATE POLICY "Enable update for authenticated AI agents" ON ai_questions
    FOR UPDATE USING (
        auth.role() = 'authenticated' AND 
        protocol = 'AIIP-2024-SECURE'
    ); 