'use client';

import { useState } from 'react';
import { Plus, Webhook, AlertCircle, Inbox, Loader2, Cpu, Globe, ArrowUpRight } from 'lucide-react';
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
      setError('System Failure: Unable to reach API gateway.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-slate-300 selection:bg-indigo-500/30 font-sans">
      {/* Modern Background: Radial Glow */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[50%] -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[700px] mx-auto px-6 py-20">
        
        {/* Minimalist Header */}
        <header className="flex flex-col items-center mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium tracking-wider text-indigo-400 uppercase mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Production Ready
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-white mb-4 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
            Inspector
          </h1>
          <p className="text-slate-500 text-lg font-light leading-relaxed">
            The modern standard for capturing and debugging webhooks.
          </p>
        </header>

        {/* Main Interface Container */}
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-2 backdrop-blur-xl shadow-2xl">
          <div className="bg-[#0A0A0A] rounded-[14px] p-8 border border-white/5">
            
            <section className="space-y-10">
              {/* Ultra-Modern Button */}
              <button
                onClick={handleCreate}
                disabled={loading}
                className="group relative w-full flex items-center justify-between px-6 py-4 bg-white text-black rounded-xl font-semibold transition-all hover:bg-slate-200 active:scale-[0.98] disabled:opacity-50"
              >
                <div className="flex items-center gap-3">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                  <span>{loading ? 'Generating Node...' : 'Create New Endpoint'}</span>
                </div>
                <ArrowUpRight className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
              </button>

              {error && (
                <div className="flex items-center gap-3 bg-red-500/5 border border-red-500/20 p-4 rounded-xl text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              {/* List View */}
              {endpoints.length > 0 ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em]">Active Channels</h2>
                    <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded border border-white/10 text-slate-400 font-mono">
                      {endpoints.length} TOTAL
                    </span>
                  </div>
                  <div className="grid gap-3">
                    {endpoints.map((ep) => (
                      <EndpointCard key={ep.id} id={ep.id} url={ep.url} />
                    ))}
                  </div>
                </div>
              ) : (
                /* Empty State */
                !loading && (
                  <div className="py-12 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-xl bg-white/[0.01]">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
                      <Webhook className="w-6 h-6 text-slate-600" />
                    </div>
                    <p className="text-sm text-slate-500">No active endpoints detected.</p>
                  </div>
                )
              )}
            </section>
          </div>
        </div>

        {/* System Stats Footer */}
        <footer className="mt-12 grid grid-cols-2 gap-4">
          <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4 flex items-center gap-4">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <Cpu className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <p className="text-[10px] uppercase text-slate-500 font-bold tracking-tighter">Latency</p>
              <p className="text-xs text-slate-300 font-mono">24ms</p>
            </div>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4 flex items-center gap-4">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <Globe className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <p className="text-[10px] uppercase text-slate-500 font-bold tracking-tighter">Region</p>
              <p className="text-xs text-slate-300 font-mono">Global-Edge</p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}