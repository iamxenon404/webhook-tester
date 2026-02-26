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

  const copyUrl = () => {
    navigator.clipboard.writeText(hookUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors"
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
        <header className="mb-10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 shadow-inner">
              <Zap className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Inspector Node</h1>
              <p className="text-slate-500 font-mono text-xs">{id}</p>
            </div>
          </div>

          {/* Webhook URL Terminal Card */}
          <div className="group relative bg-[#0A0A0A] border border-white/10 rounded-xl p-4 overflow-hidden">
             <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
               <Terminal className="w-12 h-12 text-white -rotate-12 translate-x-4 translate-y-2" />
             </div>
             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Listener Gateway</p>
             <div className="flex items-center justify-between gap-4">
                <code className="text-sm font-mono text-indigo-300 break-all bg-black/40 px-3 py-2 rounded border border-white/5 flex-1">
                  {hookUrl}
                </code>
                <button 
                  onClick={copyUrl}
                  className={`shrink-0 p-2.5 rounded-lg border transition-all ${
                    copied ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-400'
                  }`}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
             </div>
          </div>
        </header>

        {/* Content Section */}
        <section className="space-y-6">
          {error && (
            <div className="bg-rose-500/5 border border-rose-500/20 p-4 rounded-xl flex items-center gap-3 text-rose-400 text-xs uppercase tracking-wider">
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
                  Capture History <span className="text-white ml-2">({logs.length})</span>
                </h2>
                <div className="h-px w-full bg-white/5" />
              </div>
              <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {[...logs].reverse().map((log, i) => (
                  <LogEntry key={i} {...log} />
                ))}
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="py-32 flex flex-col items-center justify-center border border-dashed border-white/5 rounded-3xl bg-white/[0.01] transition-all">
              <div className="p-5 rounded-full bg-white/5 border border-white/10 mb-6">
                <Activity className="w-10 h-10 text-slate-700" />
              </div>
              <h3 className="text-slate-300 font-medium tracking-tight">Waiting for inbound data...</h3>
              <p className="text-xs text-slate-500 mt-2 font-mono">Status: ACTIVE_LISTENER_IDLE</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}