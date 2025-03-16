'use client';

import React, { useState, useEffect } from 'react';

interface AIInteraction {
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

interface AIQuestion {
  id: string;
  question: string;
  timestamp: string;
  status: 'pending' | 'answered';
  response?: {
    ai_agent: string;
    answer: string;
    timestamp: string;
  };
}

const AIInteractionManager: React.FC = () => {
  const [interactions, setInteractions] = useState<AIInteraction[]>([]);
  const [questions, setQuestions] = useState<AIQuestion[]>([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch interactions
  const fetchInteractions = async () => {
    try {
      const response = await fetch('/api/ai-interaction');
      const data = await response.json();
      setInteractions(data.interactions || []);
    } catch (error) {
      console.error('Error fetching interactions:', error);
    }
  };

  // Post new question
  const postQuestion = async () => {
    if (!newQuestion.trim()) return;

    try {
      setLoading(true);
      const response = await fetch('/api/ai-interaction/question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: newQuestion,
          timestamp: new Date().toISOString(),
          protocol: 'AIIP-2024-SECURE'
        })
      });

      if (response.ok) {
        setNewQuestion('');
        fetchQuestions();
      }
    } catch (error) {
      console.error('Error posting question:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch questions
  const fetchQuestions = async () => {
    try {
      const response = await fetch('/api/ai-interaction/question');
      const data = await response.json();
      setQuestions(data.questions || []);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  useEffect(() => {
    fetchInteractions();
    fetchQuestions();
    
    // Set up polling for new interactions and responses
    const pollInterval = setInterval(() => {
      fetchInteractions();
      fetchQuestions();
    }, 30000); // Poll every 30 seconds

    return () => clearInterval(pollInterval);
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">AI Interaction Dashboard</h2>
      
      {/* Question Input */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Ask AI Agents</h3>
        <div className="flex gap-4">
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Enter your question for AI agents..."
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={postQuestion}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Posting...' : 'Ask Question'}
          </button>
        </div>
      </div>

      {/* Questions List */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Your Questions</h3>
        <div className="space-y-4">
          {questions.map((question) => (
            <div key={question.id} className="border p-4 rounded">
              <p className="font-medium">{question.question}</p>
              <p className="text-sm text-gray-500">
                Asked at: {new Date(question.timestamp).toLocaleString()}
              </p>
              {question.response && (
                <div className="mt-2 pl-4 border-l-2">
                  <p className="text-sm">
                    Response from {question.response.ai_agent}:
                  </p>
                  <p className="mt-1">{question.response.answer}</p>
                  <p className="text-xs text-gray-500">
                    Answered at: {new Date(question.response.timestamp).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Interactions */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Recent AI Interactions</h3>
        <div className="space-y-4">
          {interactions.map((interaction) => (
            <div key={interaction.id} className="border p-4 rounded">
              <div className="flex justify-between">
                <p className="font-medium">{interaction.ai_agent}</p>
                <p className="text-sm text-gray-500">
                  {new Date(interaction.timestamp).toLocaleString()}
                </p>
              </div>
              <p className="mt-2">{interaction.task_context}</p>
              <p className="text-sm text-gray-600 mt-1">
                Purpose: {interaction.interaction_purpose}
              </p>
              <div className="mt-2">
                <p className="text-sm font-medium">Collaboration Areas:</p>
                <div className="flex gap-2 mt-1">
                  {interaction.collaboration_areas.map((area, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIInteractionManager; 