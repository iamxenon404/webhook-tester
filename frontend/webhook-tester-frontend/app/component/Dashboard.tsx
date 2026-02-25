'use client';

import { useState } from 'react';
import EndpointCard from './EndpointCard';

interface Endpoint {
  id: string;
  url: string;
}

export default function Dashboard() {
  const [endpoints, setEndpoints] = useState<Endpoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:5000/create', { method: 'POST' });
      const data = await res.json();
      setEndpoints((prev) => [data, ...prev]);
    } catch (err) {
      setError('Failed to connect to backend. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-12">
      <div className="max-w-2xl mx-auto flex flex-col gap-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">🪝 Webhook Tester</h1>
          <p className="text-gray-400 mt-2">
            Generate a unique webhook endpoint and inspect incoming requests in real time.
          </p>
        </div>

        {/* Create Button */}
        <button
          onClick={handleCreate}
          disabled={loading}
          className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-white transition-colors"
        >
          {loading ? 'Creating...' : '+ Create New Endpoint'}
        </button>

        {/* Error */}
        {error && (
          <div className="bg-red-900/40 border border-red-700 text-red-300 rounded-lg px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {/* Endpoints List */}
        {endpoints.length > 0 && (
          <div className="flex flex-col gap-4">
            <h2 className="text-sm text-gray-400 uppercase tracking-widest">Your Endpoints</h2>
            {endpoints.map((ep) => (
              <EndpointCard key={ep.id} id={ep.id} url={ep.url} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {endpoints.length === 0 && !loading && (
          <div className="text-center text-gray-600 py-16 border border-dashed border-gray-800 rounded-lg">
            No endpoints yet. Click the button above to create one.
          </div>
        )}

      </div>
    </main>
  );
}