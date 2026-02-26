'use client';

import { useState } from 'react';
import { 
  ChevronRight, 
  Clock, 
  Globe, 
  Hash, 
  Braces, 
  ListFilter, 
  FileCode, 
  AlignLeft 
} from 'lucide-react';

interface LogEntryProps {
  method: string;
  headers: Record<string, string | string[]>;
  body: unknown;
  query: Record<string, string | string[]>;
  timestamp: number;
  ip: string;
}

const methodStyles: Record<string, { bg: string; text: string; border: string }> = {
  GET: { bg: 'bg-blue-500/10', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-500/20' },
  POST: { bg: 'bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-500/20' },
  PUT: { bg: 'bg-amber-500/10', text: 'text-amber-600 dark:text-amber-400', border: 'border-amber-500/20' },
  PATCH: { bg: 'bg-orange-500/10', text: 'text-orange-600 dark:text-orange-400', border: 'border-orange-500/20' },
  DELETE: { bg: 'bg-rose-500/10', text: 'text-rose-600 dark:text-rose-400', border: 'border-rose-500/20' },
};

export default function LogEntry({ method, headers, body, query, timestamp, ip }: LogEntryProps) {
  const [expanded, setExpanded] = useState(false);
  const [payloadStyle, setPayloadStyle] = useState<'pretty' | 'minified'>('pretty');

  const style = methodStyles[method] ?? { bg: 'bg-zinc-500/10', text: 'text-zinc-500', border: 'border-zinc-500/20' };
  const time = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

  return (
    <div className={`group transition-all duration-300 border rounded-2xl overflow-hidden ${
      expanded 
      ? 'border-indigo-500/30 bg-white dark:bg-[#0A0A0A] shadow-2xl' 
      : 'border-zinc-200 dark:border-white/5 bg-white/50 dark:bg-[#050505] hover:border-zinc-300 dark:hover:border-white/10'
    }`}>
      
      {/* Clickable Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-4 px-5 py-4 hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors text-left"
      >
        <div className={`w-16 py-1 rounded-lg border font-black text-[9px] text-center tracking-[0.2em] uppercase transition-transform group-hover:scale-105 ${style.border} ${style.bg} ${style.text}`}>
          {method}
        </div>
        
        <div className="flex items-center gap-2 text-zinc-400 dark:text-zinc-600 font-mono text-[10px] font-bold">
          <Clock className="w-3.5 h-3.5" />
          {time}
        </div>

        <div className="hidden md:flex items-center gap-2 text-zinc-400 dark:text-zinc-800 font-mono text-[10px] font-black uppercase tracking-tighter">
          <Globe className="w-3.5 h-3.5" />
          {ip}
        </div>

        <div className="flex-1 flex justify-end">
          <div className={`p-1 rounded-md transition-colors ${expanded ? 'bg-indigo-500/10' : ''}`}>
            <ChevronRight className={`w-4 h-4 text-zinc-300 dark:text-zinc-700 transition-transform duration-500 ${expanded ? 'rotate-90 text-indigo-500' : ''}`} />
          </div>
        </div>
      </button>

      {/* Details Area */}
      {expanded && (
        <div className="border-t border-zinc-100 dark:border-white/5 grid grid-cols-1 lg:grid-cols-12 gap-px bg-zinc-200 dark:bg-white/5 animate-in slide-in-from-top-4 duration-500">
          
          {/* Metadata Sidebar */}
          <div className="lg:col-span-4 bg-white dark:bg-[#080808] p-6 space-y-8">
            <section>
              <div className="flex items-center gap-2 text-[9px] font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-[0.3em] mb-4">
                <ListFilter className="w-3 h-3 text-indigo-500" />
                Query_Params
              </div>
              {Object.keys(query).length > 0 ? (
                <div className="space-y-2">
                  {Object.entries(query).map(([key, value]) => (
                    <div key={key} className="flex flex-col p-3 rounded-xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-100 dark:border-white/5">
                      <span className="text-indigo-600 dark:text-indigo-400 text-[9px] font-black font-mono uppercase tracking-tighter">{key}</span>
                      <span className="text-zinc-900 dark:text-zinc-300 text-xs font-mono break-all mt-1">{String(value)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-[10px] text-zinc-400 dark:text-zinc-800 font-black uppercase tracking-widest italic">Null_Params</span>
              )}
            </section>

            <section>
              <div className="flex items-center gap-2 text-[9px] font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-[0.3em] mb-4">
                <Hash className="w-3 h-3 text-indigo-500" />
                Source_Node
              </div>
              <div className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-white/[0.02] p-3 rounded-xl border border-zinc-100 dark:border-white/5">
                IP_ADDR: {ip}
              </div>
            </section>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8 bg-zinc-50 dark:bg-[#0C0C0C] p-6 space-y-8">
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-[9px] font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-[0.3em]">
                  <Braces className="w-3 h-3 text-indigo-500" />
                  Raw_Payload
                </div>

                {/* Style Toggle Interface */}
                <div className="flex bg-zinc-100 dark:bg-white/5 p-1 rounded-xl border border-zinc-200 dark:border-white/5 shadow-inner">
                  <button
                    onClick={() => setPayloadStyle('pretty')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter transition-all ${
                      payloadStyle === 'pretty'
                        ? 'bg-white dark:bg-zinc-800 text-indigo-500 shadow-sm'
                        : 'text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-300'
                    }`}
                  >
                    <FileCode className="w-3 h-3" />
                    Pretty
                  </button>
                  <button
                    onClick={() => setPayloadStyle('minified')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter transition-all ${
                      payloadStyle === 'minified'
                        ? 'bg-white dark:bg-zinc-800 text-indigo-500 shadow-sm'
                        : 'text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-300'
                    }`}
                  >
                    <AlignLeft className="w-3 h-3" />
                    Minified
                  </button>
                </div>
              </div>

              <div className="relative group/payload">
                {/* Style Indicator Label */}
                <div className="absolute top-3 right-4 z-10 opacity-0 group-hover/payload:opacity-100 transition-opacity">
                  <span className="text-[8px] font-mono font-black text-zinc-500 dark:text-zinc-700 uppercase tracking-widest bg-zinc-800 dark:bg-white/5 px-2 py-1 rounded">
                    {payloadStyle === 'pretty' ? 'Parsing_Active' : 'Stream_Compact'}
                  </span>
                </div>

                <pre className={`p-5 rounded-2xl border transition-all duration-500 overflow-x-auto shadow-2xl ${
                  payloadStyle === 'pretty'
                    ? 'bg-zinc-900 dark:bg-black border-zinc-800 dark:border-white/5 text-[12px] leading-relaxed'
                    : 'bg-zinc-950 dark:bg-[#050505] border-indigo-500/20 text-[11px] leading-tight font-light'
                }`}>
                  <code className={payloadStyle === 'pretty' ? 'text-emerald-500 dark:text-emerald-400' : 'text-indigo-400/80 dark:text-indigo-300/70'}>
                    {body ? (
                      payloadStyle === 'pretty' 
                        ? JSON.stringify(body, null, 2) 
                        : JSON.stringify(body)
                    ) : (
                      '// VOID_BODY'
                    )}
                  </code>
                </pre>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 text-[9px] font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-[0.3em] mb-4">
                <Globe className="w-3 h-3 text-indigo-500" />
                Transmission_Headers
              </div>
              <div className="rounded-2xl border border-zinc-200 dark:border-white/5 overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    {Object.entries(headers).map(([key, value], i) => (
                      <tr key={key} className={`${i % 2 === 0 ? 'bg-white dark:bg-white/[0.02]' : 'bg-transparent'} border-b border-zinc-100 dark:border-white/5 last:border-0`}>
                        <td className="py-3 px-4 text-[10px] font-black font-mono text-zinc-400 dark:text-zinc-600 uppercase w-1/3 tracking-tighter">{key}</td>
                        <td className="py-3 px-4 text-[10px] font-mono text-indigo-600 dark:text-indigo-300 break-all">{String(value)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}