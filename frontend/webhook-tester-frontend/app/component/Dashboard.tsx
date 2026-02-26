'use client';

import { useState } from 'react';
import { Plus, Webhook, AlertCircle, Inbox, Loader2, Terminal, ShieldCheck } from 'lucide-react';
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
      setError('Connection timeout: Backend unreachable.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0c] text-slate-300 font-mono selection:bg-indigo-500/40">
      {/* Dev Trait: Subtle Grid Background */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z' fill='%23ffffff' fill-opacity='1'/%3E%3C/svg%3E")` }} 
      />

      {/* Main Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        
        {/* Top Utility Bar */}
        <div className="flex justify-between items-center mb-12 px-4 py-2 border-x border-t border-white/10 rounded-t-xl bg-white/5 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-slate-500">System v1.0.4</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-emerald-500 uppercase tracking-widest animate-pulse">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
            Server: Online
          </div>
        </div>

        {/* Content Border Box */}
        <div className="border border-white/10 rounded-b-xl bg-black/40 backdrop-blur-sm p-8 shadow-2xl">
          
          {/* Header */}
          <header className="mb-12 border-b border-white/5 pb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-500/10 rounded border border-indigo-500/20">
                <Terminal className="w-6 h-6 text-indigo-400" />
              </div>
              <h1 className="text-2xl font-bold tracking-tighter text-white">
                REQUEST_INSPECTOR_
              </h1>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xl">
              Initialize a dynamic hook instance to capture, parse, and debug inbound HTTP transmissions in an isolated sandbox environment.
            </p>
          </header>

          {/* Action Area */}
          <section className="space-y-8">
            <button
              onClick={handleCreate}
              disabled={loading}
              className="group relative w-full overflow-hidden rounded-md border border-indigo-500/50 bg-indigo-500/10 px-6 py-4 transition-all hover:bg-indigo-500/20 active:scale-[0.99]"
            >
              {/* Button Inner Effect */}
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              
              <div className="flex items-center justify-center gap-3">
                {loading ? <Loader2 className="w-5 h-5 animate-spin text-indigo-400" /> : <Plus className="w-5 h-5 text-indigo-400" />}
                <span className="text-sm font-bold tracking-[0.2em] text-indigo-100 uppercase">
                  {loading ? 'Executing...' : 'Deploy New Endpoint'}
                </span>
              </div>
            </button>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-3 border border-red-500/20 bg-red-500/5 p-4 rounded text-red-400 text-xs uppercase tracking-wider">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            {/* Endpoints List */}
            {endpoints.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-slate-600 font-bold">
                  <span>Active_Nodes</span>
                  <div className="h-[1px] flex-1 bg-white/5" />
                  <span>{endpoints.length}</span>
                </div>
                <div className="grid gap-3">
                  {endpoints.map((ep) => (
                    <EndpointCard key={ep.id} id={ep.id} url={ep.url} />
                  ))}
                </div>
              </div>
            ) : (
              /* Empty State: Dev Style */
              !loading && (
                <div className="relative overflow-hidden group py-16 px-6 rounded border border-white/5 bg-white/[0.02] flex flex-col items-center justify-center text-center">
                  <div className="absolute inset-0 bg-scanline pointer-events-none opacity-10" />
                  <Inbox className="w-10 h-10 text-slate-700 mb-4 group-hover:text-indigo-500/50 transition-colors" />
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-600 mb-1">Waiting for user input...</p>
                  <p className="text-[10px] text-slate-700 font-mono">Run "Deploy New Endpoint" to begin</p>
                </div>
              )
            )}
          </section>
        </div>

        {/* Footer Trait */}
        <div className="mt-6 flex justify-between items-center px-4 text-[10px] text-slate-600 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3 h-3" />
            Secure Tunneling Active
          </div>
          <div>Localhost:5000</div>
        </div>
      </div>

      <style jsx>{`
        .bg-scanline {
          background: linear-gradient(
            to bottom,
            transparent 50%,
            rgba(0, 0, 0, 0.5) 51%,
            transparent 51%
          );
          background-size: 100% 4px;
        }
      `}</style>
    </main>
  );
}