'use client';

import { useState } from 'react';
import { ChevronRight, Clock, Globe, Hash, Braces, ListFilter } from 'lucide-react';

interface LogEntryProps {
  method: string;
  headers: Record<string, string | string[]>;
  body: unknown;
  query: Record<string, string | string[]>;
  timestamp: number;
  ip: string;
}

const methodStyles: Record<string, { bg: string; text: string; border: string }> = {
  GET: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
  POST: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  PUT: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
  PATCH: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20' },
  DELETE: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/20' },
};

export default function LogEntry({ method, headers, body, query, timestamp, ip }: LogEntryProps) {
  const [expanded, setExpanded] = useState(false);

  const style = methodStyles[method] ?? { bg: 'bg-slate-500/10', text: 'text-slate-400', border: 'border-slate-500/20' };
  const time = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div className={`group transition-all duration-200 border ${expanded ? 'border-white/10 bg-white/[0.02]' : 'border-white/5 bg-transparent'} rounded-xl overflow-hidden`}>
      {/* Clickable Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-4 px-4 py-3 hover:bg-white/[0.03] transition-colors text-left"
      >
        <div className={`w-16 py-1 rounded border ${style.border} ${style.bg} ${style.text} text-[10px] font-bold text-center tracking-widest`}>
          {method}
        </div>
        
        <div className="flex items-center gap-2 text-slate-500 font-mono text-xs">
          <Clock className="w-3.5 h-3.5" />
          {time}
        </div>

        <div className="hidden md:flex items-center gap-2 text-slate-600 font-mono text-[11px]">
          <Globe className="w-3.5 h-3.5" />
          {ip}
        </div>

        <div className="flex-1 flex justify-end">
          <ChevronRight className={`w-4 h-4 text-slate-600 transition-transform duration-300 ${expanded ? 'rotate-90 text-indigo-400' : ''}`} />
        </div>
      </button>

      {/* Details Area */}
      {expanded && (
        <div className="border-t border-white/5 grid grid-cols-1 lg:grid-cols-12 gap-px bg-white/5 animate-in slide-in-from-top-2 duration-300">
          
          {/* Metadata Sidebar (Query & IP) */}
          <div className="lg:col-span-4 bg-[#0A0A0A] p-4 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3">
                <ListFilter className="w-3 h-3 text-indigo-400" />
                Query Params
              </div>
              {Object.keys(query).length > 0 ? (
                <div className="space-y-2">
                  {Object.entries(query).map(([key, value]) => (
                    <div key={key} className="flex flex-col p-2 rounded bg-white/[0.02] border border-white/5">
                      <span className="text-indigo-400 text-[10px] font-mono">{key}</span>
                      <span className="text-slate-300 text-xs font-mono break-all">{String(value)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-[10px] text-slate-600 italic">No parameters detected</span>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3">
                <Hash className="w-3 h-3 text-indigo-400" />
                Network
              </div>
              <div className="text-xs font-mono text-slate-400 bg-white/[0.02] p-2 rounded border border-white/5">
                IP: {ip}
              </div>
            </div>
          </div>

          {/* Main Content Area (Body & Headers) */}
          <div className="lg:col-span-8 bg-[#0D0D0F] p-4 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3">
                <Braces className="w-3 h-3 text-indigo-400" />
                Payload
              </div>
              <pre className="p-4 rounded-lg bg-black/50 border border-white/5 text-[12px] font-mono leading-relaxed overflow-x-auto scrollbar-thin scrollbar-thumb-white/10">
                <code className="text-emerald-400">
                  {body ? JSON.stringify(body, null, 2) : '// No body content'}
                </code>
              </pre>
            </div>

            <div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3">
                <Globe className="w-3 h-3 text-indigo-400" />
                Headers
              </div>
              <div className="rounded-lg border border-white/5 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    {Object.entries(headers).map(([key, value], i) => (
                      <tr key={key} className={`${i % 2 === 0 ? 'bg-white/[0.02]' : 'bg-transparent'} border-b border-white/5 last:border-0`}>
                        <td className="py-2 px-3 text-[10px] font-mono text-slate-500 w-1/3">{key}</td>
                        <td className="py-2 px-3 text-[10px] font-mono text-indigo-300 break-all">{String(value)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}