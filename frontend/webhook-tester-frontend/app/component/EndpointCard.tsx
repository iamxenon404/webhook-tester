'use client';

import { useState } from 'react';

interface EndpointCardProps {
  id: string;
  url: string;
}

export default function EndpointCard({ id, url }: EndpointCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400 uppercase tracking-widest">Webhook Endpoint</span>
        <span className="text-xs text-gray-500 font-mono">{id}</span>
      </div>

      <div className="flex items-center gap-2 bg-gray-800 rounded-md px-3 py-2">
        <span className="text-green-400 font-mono text-sm truncate flex-1">{url}</span>
        <button
          onClick={handleCopy}
          className="text-xs px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 text-white transition-colors shrink-0"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>

      <a
        href={`/logs/${id}`}
        className="text-center text-sm bg-indigo-600 hover:bg-indigo-500 text-white rounded-md py-2 transition-colors"
      >
        View Logs →
      </a>
    </div>
  );
}