'use client';

import { useEffect, useState, useCallback } from 'react';
import { ArrowLeft, Activity, Terminal, Copy, Check, Zap, Wifi, Sun, Moon } from 'lucide-react';
import LogEntry from './LogEntry';
import Link from 'next/link';

interface Log {
  method: string;
  headers: Record<string, string | string[]>;
  body: unknown;
  query: Record<string, string | string[]>;
  timestamp: number;
  ip: string;
}

interface LogViewerProps {
  id: string;
}

export default function LogViewer({ id }: LogViewerProps) {
  const [logs, setLogs] = useState<Log[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const hookUrl = `http://localhost:5000/hook/${id}`;

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  const fetchLogs = useCallback(async () => {
    try {
      const res = await fetch(`http://localhost:5000/${id}`);
      if (!res.ok) throw new Error('Endpoint not found');
      const data = await res.json();
      setLogs(data.logs);
      setError(null);
    } catch (err) {
      setError('XEN_LINK_FAILURE: Nexus connection lost.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 3000);
    return () => clearInterval(interval);
  }, [fetchLogs]);

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(hookUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#000000] text-zinc-900 dark:text-zinc-400 selection:bg-indigo-500/30 font-sans transition-colors duration-700 overflow-x-hidden">
      
      {/* ELITE NEBULA BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-500/10 dark:bg-indigo-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        
        {/* Navigation */}
        <nav className="flex items-center justify-between mb-16">
          <Link 
            href="/" 
            className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600 hover:text-indigo-500 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            Return_to_Nexus
          </Link>
          
          <div className="flex items-center gap-4">
            {/* <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-zinc-200 dark:bg-white/5 border border-zinc-300 dark:border-white/10 text-zinc-600 dark:text-zinc-400"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button> */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Live_Capture</span>
            </div>
          </div>
        </nav>

        {/* Hero Branding */}
        <header className="mb-12 space-y-8">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-zinc-900 dark:bg-white shadow-2xl">
              <Zap className="w-8 h-8 text-white dark:text-black" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tighter italic uppercase">
                Inspector<span className="text-indigo-600 dark:text-indigo-500">_Node</span>
              </h1>
              <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em]">Hardware_ID: {id}</p>
            </div>
          </div>

          {/* URL Terminal Interface */}
          <div className={`group relative bg-white dark:bg-[#050505] border transition-all duration-500 rounded-3xl p-6 overflow-hidden ${copied ? 'border-emerald-500/50 shadow-[0_0_40px_rgba(16,185,129,0.1)]' : 'border-zinc-200 dark:border-white/10 shadow-2xl'}`}>
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity pointer-events-none">
              <Terminal className="w-32 h-32 text-zinc-900 dark:text-white -rotate-12 translate-x-12" />
            </div>

            <div className="relative z-10">
              <div className="flex justify-between items-center mb-4">
                <p className="text-[10px] font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-[0.4em]">Listener_Gateway</p>
                {copied && (
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest animate-in fade-in slide-in-from-right-2">
                    Uplink_Copied_to_Clipboard
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative flex-1 group/code overflow-hidden rounded-xl">
                  <code className="block w-full text-sm font-mono text-indigo-600 dark:text-indigo-400 bg-zinc-50 dark:bg-white/[0.03] px-5 py-4 border border-zinc-200 dark:border-white/5 truncate">
                    {hookUrl}
                  </code>
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-indigo-500 transition-all duration-700 group-hover/code:w-full" />
                </div>

                <button 
                  onClick={copyUrl}
                  className={`shrink-0 flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 shadow-xl ${
                    copied 
                    ? 'bg-emerald-500 text-white shadow-emerald-500/20' 
                    : 'bg-zinc-900 dark:bg-white text-white dark:text-black hover:opacity-90 shadow-indigo-500/10'
                  }`}
                >
                  {copied ? <Check className="w-4 h-4 stroke-[3]" /> : <Copy className="w-4 h-4 stroke-[3]" />}
                  {copied ? 'Done' : 'Copy_Node'}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content Pipeline */}
        <section className="space-y-8">
          {error && (
            <div className="bg-rose-500/5 border border-rose-500/20 p-5 rounded-2xl flex items-center gap-4 text-rose-500 text-[10px] font-black uppercase tracking-widest animate-pulse">
              <Wifi className="w-5 h-5" />
              {error}
            </div>
          )}

          {loading ? (
            <div className="py-32 flex flex-col items-center gap-6 border border-zinc-200 dark:border-white/5 rounded-[40px] bg-white dark:bg-white/[0.01]">
                <Activity className="w-10 h-10 text-indigo-500 animate-spin" />
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400 dark:text-zinc-700">Synchronizing_Datastreams...</p>
            </div>
          ) : logs.length > 0 ? (
            <div className="space-y-6">
              <div className="flex items-center gap-6 px-2">
                <h2 className="text-[10px] font-black text-zinc-400 dark:text-zinc-700 uppercase tracking-[0.4em] whitespace-nowrap">
                  Intercept_History <span className="text-zinc-900 dark:text-indigo-500 ml-3 font-mono">[{logs.length}]</span>
                </h2>
                <div className="h-[1px] w-full bg-zinc-200 dark:bg-white/5" />
              </div>
              <div className="flex flex-col gap-4">
                {[...logs].reverse().map((log, i) => (
                  <LogEntry key={i} {...log} />
                ))}
              </div>
            </div>
          ) : (
            /* Empty Data State */
            <div className="py-40 flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 dark:border-zinc-900 rounded-[40px] bg-zinc-50/50 dark:bg-white/[0.01] transition-all hover:bg-zinc-100 dark:hover:bg-white/[0.02] group">
              <div className="p-8 rounded-[32px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 shadow-2xl">
                <Activity className="w-12 h-12 text-zinc-300 dark:text-zinc-800 group-hover:text-indigo-500 transition-colors" />
              </div>
              <h3 className="text-zinc-900 dark:text-zinc-300 font-black uppercase tracking-widest text-xs">Awaiting Inbound Transmission</h3>
              <p className="text-[10px] text-zinc-400 dark:text-zinc-700 mt-3 font-mono uppercase tracking-[0.3em]">Status: Listening_on_Node_{id.slice(0,4)}</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}