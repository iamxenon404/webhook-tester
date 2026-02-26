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
      console.error('XEN_CLIPBOARD_ERROR:', err);
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-white/5 bg-white dark:bg-[#080808] p-5 transition-all duration-300 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-0.5">
      
      {/* Node ID Badge - Top Right */}
      <div className="absolute top-0 right-0 px-3 py-1 bg-zinc-100 dark:bg-white/5 border-b border-l border-zinc-200 dark:border-white/5 rounded-bl-xl transition-colors group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20">
        <span className="text-[9px] font-black font-mono text-zinc-500 dark:text-zinc-500 group-hover:text-indigo-500 uppercase tracking-[0.2em]">
          NODE_ID: {id.slice(0, 8)}
        </span>
      </div>

      <div className="flex flex-col gap-5">
        {/* Header Info */}
        <div className="flex items-center gap-4">
          <div className="p-2.5 rounded-xl bg-zinc-900 dark:bg-white/5 border border-zinc-800 dark:border-white/10 group-hover:scale-110 transition-transform duration-500">
            <Terminal className="w-4 h-4 text-zinc-400 group-hover:text-indigo-400 transition-colors" />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-[10px] text-zinc-400 dark:text-zinc-600 font-black uppercase tracking-[0.15em] mb-0.5">
              Gateway_Endpoint
            </span>
            <code className="text-sm font-mono text-zinc-900 dark:text-zinc-200 truncate pr-16 font-medium">
              {url}
            </code>
          </div>
        </div>

        {/* Action Interface */}
        <div className="flex items-center gap-3 pt-4 border-t border-zinc-100 dark:border-white/5">
          {/* Copy Action */}
          <button
            onClick={copyToClipboard}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 ${
              copied 
              ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-600 dark:text-emerald-400' 
              : 'bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/10 hover:border-zinc-300 dark:hover:border-white/20'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Copied_Success</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Copy_URL</span>
              </>
            )}
          </button>

          {/* Log Access */}
          <Link
            href={`/logs/${id}`}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-indigo-600 hover:bg-black dark:hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-zinc-900/10 dark:shadow-indigo-500/20 group/btn"
          >
            <Activity className="w-3.5 h-3.5 group-hover/btn:animate-pulse" />
            <span>Intercept</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-30 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}