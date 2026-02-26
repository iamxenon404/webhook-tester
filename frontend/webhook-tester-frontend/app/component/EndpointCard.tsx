'use client';

import { useState } from 'react';
import { Copy, Check, ExternalLink, Terminal, Activity } from 'lucide-react';
import Link from 'next/link';

interface EndpointCardProps {
  id: string;
  url: string;
}

export default function EndpointCard({ id, url }: EndpointCardProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.03] p-4 transition-all hover:border-indigo-500/30 hover:bg-white/[0.05]">
      {/* Dev Trait: Top-right ID Badge */}
      <div className="absolute top-0 right-0 px-3 py-1 bg-indigo-500/10 border-b border-l border-white/5 rounded-bl-lg">
        <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest">ID: {id}</span>
      </div>

      <div className="flex flex-col gap-4">
        {/* URL Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-black/40 border border-white/5">
            <Terminal className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 transition-colors" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">Endpoint URL</span>
            <code className="text-sm font-mono text-slate-200 truncate max-w-[280px] md:max-w-md">
              {url}
            </code>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center gap-2 pt-2 border-t border-white/5">
          {/* Copy Button */}
          <button
            onClick={copyToClipboard}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border transition-all text-xs font-medium ${
              copied 
              ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' 
              : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied to Clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy URL</span>
              </>
            )}
          </button>

          {/* View Logs Link */}
          <Link
            href={`/logs/${id}`}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-500/20"
          >
            <Activity className="w-3.5 h-3.5" />
            <span>View Logs</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-50" />
          </Link>
        </div>
      </div>
    </div>
  );
}