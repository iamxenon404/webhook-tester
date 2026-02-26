'use client';

import { useEffect, useState, useCallback } from 'react';
import { ArrowLeft, Activity, Terminal, Copy, Check, Zap, Wifi } from 'lucide-react';
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

  const hookUrl = `http://localhost:5000/hook/${id}`;

  const fetchLogs = useCallback(async () => {
    try {
      const res = await fetch(`http://localhost:5000/${id}`);
      if (!res.ok) throw new Error('Endpoint not found');
      const data = await res.json();
      setLogs(data.logs);
      setError(null);
    } catch (err) {
      setError('System Link Failure: Backend unreachable.');
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
      console.error("Failed to copy:", err);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-indigo-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-gradient-to-b from-indigo-500/5 to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        
        {/* Top Nav & Breadcrumbs */}
        <nav className="flex items-center justify-between mb-12">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-all hover:-translate-x-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Return to Nexus
          </Link>
          <div className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/20">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest">Live_Syncing</span>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="mb-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 shadow-inner">
              <Zap className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Inspector Node</h1>
              <p className="text-slate-500 font-mono text-xs tracking-wider">{id}</p>
            </div>
          </div>

          {/* Webhook URL Terminal Card */}
          <div className={`group relative bg-[#0A0A0A] border rounded-xl p-5 overflow-hidden transition-all duration-500 ${copied ? 'border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.1)]' : 'border-white/10'}`}>
            {/* Background Icon Decor */}
            <div className="absolute top-0 right-0 p-2 opacity-[0.03] group-hover:opacity-10 transition-opacity pointer-events-none">
              <Terminal className="w-24 h-24 text-white -rotate-12 translate-x-8 translate-y-4" />
            </div>

            <div className="relative z-10">
              <div className="flex justify-between items-center mb-3">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Listener Gateway</p>
                
                {/* Success Message Label */}
                <div className={`flex items-center gap-1.5 transition-all duration-300 ${copied ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">URL Copied to clipboard</span>
                  <Check className="w-3 h-3 text-emerald-400" />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative flex-1 group/code overflow-hidden rounded-lg">
                  <code className="block w-full text-sm font-mono text-indigo-300 bg-black/40 px-4 py-3 border border-white/5 truncate">
                    {hookUrl}
                  </code>
                  {/* Glowing line effect on hover */}
                  <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-indigo-500 transition-all duration-500 group-hover/code:w-full" />
                </div>

                <button 
                  onClick={copyUrl}
                  className={`shrink-0 flex items-center gap-2 px-5 py-3 rounded-lg border font-bold text-[10px] uppercase tracking-widest transition-all active:scale-95 ${
                    copied 
                    ? 'bg-emerald-500 border-emerald-400 text-white' 
                    : 'bg-white border-transparent text-black hover:bg-slate-200'
                  }`}
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Done' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content Section */}
        <section className="space-y-6">
          {error && (
            <div className="bg-rose-500/5 border border-rose-500/20 p-4 rounded-xl flex items-center gap-3 text-rose-400 text-[10px] font-bold uppercase tracking-wider animate-in fade-in zoom-in-95">
              <Wifi className="w-4 h-4" />
              {error}
            </div>
          )}

          {loading ? (
            <div className="py-24 flex flex-col items-center gap-4 border border-white/5 rounded-3xl bg-white/[0.01]">
               <Activity className="w-8 h-8 text-indigo-500/20 animate-spin" />
               <p className="text-[10px] uppercase tracking-[0.3em] text-slate-600">Booting Protocol...</p>
            </div>
          ) : logs.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <h2 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] whitespace-nowrap">
                  Capture History <span className="text-white ml-2 font-mono">[{logs.length}]</span>
                </h2>
                <div className="h-px w-full bg-white/5" />
              </div>
              <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {[...logs].reverse().map((log, i) => (
                  <LogEntry key={i} {...log} />
                ))}
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="py-32 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-3xl bg-white/[0.01] transition-all hover:bg-white/[0.02] group">
              <div className="p-6 rounded-full bg-white/5 border border-white/10 mb-6 group-hover:scale-110 transition-transform duration-500">
                <Activity className="w-10 h-10 text-slate-700 group-hover:text-indigo-500/50 transition-colors" />
              </div>
              <h3 className="text-slate-300 font-medium tracking-tight">Waiting for inbound data...</h3>
              <p className="text-[10px] text-slate-600 mt-2 font-mono uppercase tracking-widest">Status: Node_Idle</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}