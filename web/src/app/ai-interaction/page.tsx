import AIInteractionManager from '../components/AIInteractionManager';

export default function AIInteractionPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            AI Interaction Hub
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Monitor and manage your interactions with AI agents
          </p>
        </div>
        <AIInteractionManager />
      </div>
    </div>
  );
} 