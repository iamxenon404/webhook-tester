'use client';

import { useState } from 'react';
import { Plus, Webhook, AlertCircle, Inbox, Loader2 } from 'lucide-react';
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
    <main className="min-h-screen bg-[#030712] text-slate-200 selection:bg-indigo-500/30">
      {/* Subtle Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 py-16 lg:py-24">
        {/* Header Section */}
        <header className="flex flex-col items-center text-center mb-12">
          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 mb-6">
            <Webhook className="w-10 h-10 text-indigo-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
            Webhook Tester
          </h1>
          <p className="text-slate-400 text-lg max-w-md leading-relaxed">
            Generate secure, unique endpoints to intercept and debug HTTP payloads in real-time.
          </p>
        </header>

        {/* Action Bar */}
        <div className="mb-10">
          <button
            onClick={handleCreate}
            disabled={loading}
            className="group relative w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-white transition-all duration-200 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] active:scale-[0.98]"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
            )}
            <span className="tracking-wide">
              {loading ? 'Generating Endpoint...' : 'Create New Endpoint'}
            </span>
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl px-4 py-4 mb-8 animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Content Area */}
        <section>
          {endpoints.length > 0 ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">
                  Active Endpoints ({endpoints.length})
                </h2>
                <div className="h-px flex-1 bg-slate-800 ml-4"></div>
              </div>
              <div className="grid gap-4 animate-in fade-in duration-500">
                {endpoints.map((ep) => (
                  <EndpointCard key={ep.id} id={ep.id} url={ep.url} />
                ))}
              </div>
            </div>
          ) : (
            /* Empty State */
            !loading && (
              <div className="flex flex-col items-center justify-center py-20 px-6 rounded-3xl border border-dashed border-slate-800 bg-slate-900/20 backdrop-blur-sm transition-all duration-300">
                <div className="p-4 rounded-full bg-slate-900 mb-4 border border-slate-800">
                  <Inbox className="w-8 h-8 text-slate-600" />
                </div>
                <h3 className="text-slate-300 font-medium mb-1">No endpoints active</h3>
                <p className="text-slate-500 text-sm text-center">
                  Your generated webhook URLs will appear here for inspection.
                </p>
              </div>
            )
          )}
        </section>
      </div>
    </main>
  );
}