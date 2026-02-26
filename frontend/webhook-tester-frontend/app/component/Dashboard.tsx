'use client';

import { useState, useEffect } from 'react';
import { Plus, Webhook, AlertCircle, Loader2, Cpu, Globe, ArrowUpRight, Sun, Moon } from 'lucide-react';
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
      setError('XEN_LINK_ERROR: API gateway unreachable.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#000000] text-zinc-900 dark:text-zinc-400 selection:bg-indigo-500/30 font-sans transition-colors duration-300">
      
      {/* Dynamic Background UI */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Dark Mode Aura */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-500/10 dark:bg-indigo-900/20 blur-[120px] rounded-full opacity-50 dark:opacity-100" />
        {/* Light Mode Subtle Grid (Optional touch) */}
        <div className="absolute inset-0 bg-[url('https://play.tailwindcss.com/img/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-[0.05] dark:opacity-[0.02]" />
      </div>

      <div className="relative z-10 max-w-[700px] mx-auto px-6 py-12">
        
        {/* XenLog Header Nav */}
        <nav className="flex items-center justify-between mb-20">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-zinc-900 dark:bg-white shadow-xl shadow-indigo-500/10">
              <Webhook className="w-5 h-5 text-white dark:text-black" />
            </div>
            <span className="text-xl font-black tracking-tighter italic uppercase text-zinc-900 dark:text-white">
              XenLog<span className="text-indigo-600 dark:text-indigo-500">404</span>
            </span>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-200/50 dark:bg-white/5 border border-zinc-300 dark:border-white/10 text-[10px] font-bold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Nexus_Live
             </div>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="flex flex-col items-center mb-16 text-center">
          <h1 className="text-6xl font-black tracking-tighter text-zinc-900 dark:text-white mb-6">
            Inspector
          </h1>
          <p className="text-zinc-500 dark:text-zinc-500 text-lg font-medium leading-relaxed max-w-md">
            The elite standard for capturing and debugging webhooks in real-time.
          </p>
        </header>

        {/* Interface Container */}
        <div className="bg-zinc-200/50 dark:bg-zinc-900/20 border border-zinc-200 dark:border-white/10 rounded-3xl p-2 backdrop-blur-2xl shadow-2xl shadow-black/5">
          <div className="bg-white dark:bg-[#050505] rounded-[22px] p-8 border border-zinc-100 dark:border-white/5">
            
            <section className="space-y-10">
              {/* Deploy Button */}
              <button
                onClick={handleCreate}
                disabled={loading}
                className="group relative w-full flex items-center justify-between px-6 py-5 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-2xl font-bold transition-all hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 shadow-xl shadow-indigo-500/10"
              >
                <div className="flex items-center gap-3">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                  <span className="tracking-tight uppercase text-xs font-black">{loading ? 'Spawning Node...' : 'Deploy New Endpoint'}</span>
                </div>
                <ArrowUpRight className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
              </button>

              {error && (
                <div className="flex items-center gap-3 bg-rose-500/5 border border-rose-500/20 p-4 rounded-xl text-rose-500 dark:text-rose-400 text-xs font-bold uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              {/* Node List */}
              <div className="space-y-6">
                <div className="flex items-center justify-between px-1">
                  <h2 className="text-[10px] font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-[0.3em]">Active_Nodes</h2>
                  <span className="text-[10px] bg-zinc-100 dark:bg-white/5 px-2 py-0.5 rounded border border-zinc-200 dark:border-white/10 text-zinc-500 font-mono">
                    {endpoints.length} CHANNELS
                  </span>
                </div>

                {endpoints.length > 0 ? (
                  <div className="grid gap-4">
                    {endpoints.map((ep) => (
                      <EndpointCard key={ep.id} id={ep.id} url={ep.url} />
                    ))}
                  </div>
                ) : (
                  !loading && (
                    <div className="py-20 flex flex-col items-center justify-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50/50 dark:bg-white/[0.01]">
                      <Webhook className="w-8 h-8 text-zinc-300 dark:text-zinc-800 mb-4" />
                      <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-700 uppercase tracking-widest">Awaiting First Deployment</p>
                    </div>
                  )
                )}
              </div>
            </section>
          </div>
        </div>

        {/* Performance Footer */}
        <footer className="mt-12 grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-[#050505] border border-zinc-200 dark:border-white/10 rounded-2xl p-5 flex items-center gap-4 transition-transform hover:-translate-y-1">
            <div className="p-2.5 bg-indigo-500/10 rounded-xl">
              <Cpu className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-[10px] uppercase text-zinc-400 dark:text-zinc-600 font-black tracking-tighter">Throughput</p>
              <p className="text-xs text-zinc-900 dark:text-zinc-300 font-mono font-bold tracking-tight">24ms / Global</p>
            </div>
          </div>
          <div className="bg-white dark:bg-[#050505] border border-zinc-200 dark:border-white/10 rounded-2xl p-5 flex items-center gap-4 transition-transform hover:-translate-y-1">
            <div className="p-2.5 bg-emerald-500/10 rounded-xl">
              <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-[10px] uppercase text-zinc-400 dark:text-zinc-600 font-black tracking-tighter">Status</p>
              <p className="text-xs text-zinc-900 dark:text-zinc-300 font-mono font-bold tracking-tight">Syncing_v1.0</p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}