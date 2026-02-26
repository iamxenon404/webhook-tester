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
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Manual theme toggle for XenLog404
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

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
    <main className="min-h-screen bg-zinc-50 dark:bg-[#000000] text-zinc-900 dark:text-zinc-400 selection:bg-indigo-500/30 font-sans transition-colors duration-700 overflow-x-hidden">
      
      {/* ELITE BACKGROUND UI */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* The Grid Mesh */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] brightness-100 dark:brightness-0" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        {/* Layered Nebula (No more simple blue glow) */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute top-[-10%] right-1/4 w-[400px] h-[400px] bg-purple-500/10 dark:bg-purple-900/10 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[700px] mx-auto px-6 py-12">
        
        {/* XenLog Header Nav */}
        <nav className="flex items-center justify-between mb-20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-zinc-900 dark:bg-white shadow-2xl transition-transform hover:rotate-12">
              <Webhook className="w-5 h-5 text-white dark:text-black" />
            </div>
            <span className="text-xl font-black tracking-tighter italic uppercase text-zinc-900 dark:text-white">
              XenLog<span className="text-indigo-600 dark:text-indigo-500">404</span>
            </span>
          </div>
          
          <div className="flex items-center gap-4">
             {/* <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-zinc-200 dark:bg-white/5 border border-zinc-300 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:text-indigo-500 transition-all"
             >
               {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
             </button> */}
             <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                System_Online
             </div>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="flex flex-col items-center mb-16 text-center">
          <h1 className="text-7xl font-black tracking-tighter text-zinc-900 dark:text-white mb-6 bg-gradient-to-b from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-500 bg-clip-text text-transparent">
            Inspector
          </h1>
          <p className="text-zinc-500 dark:text-zinc-500 text-lg font-medium leading-relaxed max-w-md">
            The elite standard for capturing and debugging webhooks in real-time.
          </p>
        </header>

        {/* Interface Container */}
        <div className="relative group">
          {/* Subtle Outer Border Glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[32px] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
          
          <div className="relative bg-zinc-200/50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/10 rounded-[32px] p-2 backdrop-blur-3xl shadow-2xl">
            <div className="bg-white dark:bg-[#050505] rounded-[26px] p-8 border border-zinc-100 dark:border-white/5">
              
              <section className="space-y-10">
                {/* Deploy Button */}
                <button
                  onClick={handleCreate}
                  disabled={loading}
                  className="group relative w-full flex items-center justify-between px-6 py-5 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-2xl font-black transition-all hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 overflow-hidden"
                >
                  {/* Button Shine Animation */}
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 dark:via-black/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  
                  <div className="flex items-center gap-3 relative z-10">
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                    <span className="tracking-widest uppercase text-xs font-black">{loading ? 'Spawning Node...' : 'Deploy New Endpoint'}</span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity relative z-10" />
                </button>

                {error && (
                  <div className="flex items-center gap-3 bg-rose-500/5 border border-rose-500/20 p-4 rounded-xl text-rose-500 dark:text-rose-400 text-[10px] font-black uppercase tracking-widest animate-shake">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                  </div>
                )}

                {/* Node List */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between px-1">
                    <h2 className="text-[10px] font-black text-zinc-400 dark:text-zinc-700 uppercase tracking-[0.4em]">Active_Network_Nodes</h2>
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
                      <div className="py-24 flex flex-col items-center justify-center border border-dashed border-zinc-200 dark:border-zinc-900 rounded-3xl bg-zinc-50/50 dark:bg-white/[0.01] group/empty">
                        <Webhook className="w-10 h-10 text-zinc-300 dark:text-zinc-800 mb-4 group-hover/empty:scale-110 transition-transform" />
                        <p className="text-[10px] font-black text-zinc-400 dark:text-zinc-800 uppercase tracking-[0.2em]">Awaiting Uplink Deployment</p>
                      </div>
                    )
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Performance Footer */}
        <footer className="mt-16 grid grid-cols-2 gap-4">
          {[
            { label: 'Throughput', value: '24ms / Global', icon: Cpu, color: 'text-indigo-500' },
            { label: 'Security', value: 'AES-256 Enabled', icon: Globe, color: 'text-emerald-500' }
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-[#050505] border border-zinc-200 dark:border-white/10 rounded-2xl p-5 flex items-center gap-4 group hover:border-indigo-500/50 transition-colors cursor-default shadow-sm">
              <div className={`p-2.5 rounded-xl bg-zinc-100 dark:bg-white/5 group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div>
                <p className="text-[10px] uppercase text-zinc-400 dark:text-zinc-600 font-black tracking-tighter">{stat.label}</p>
                <p className="text-xs text-zinc-900 dark:text-zinc-300 font-mono font-bold tracking-tight">{stat.value}</p>
              </div>
            </div>
          ))}
        </footer>
      </div>
    </main>
  );
}