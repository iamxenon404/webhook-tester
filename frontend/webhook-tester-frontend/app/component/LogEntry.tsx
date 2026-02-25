'use client';

import { useState } from 'react';

interface LogEntryProps {
  method: string;
  headers: Record<string, string | string[]>;
  body: unknown;
  query: Record<string, string | string[]>;
  timestamp: number;
  ip: string;
}

const methodColors: Record<string, string> = {
  GET: 'bg-blue-600',
  POST: 'bg-green-600',
  PUT: 'bg-yellow-600',
  PATCH: 'bg-orange-600',
  DELETE: 'bg-red-600',
};

export default function LogEntry({ method, headers, body, query, timestamp, ip }: LogEntryProps) {
  const [expanded, setExpanded] = useState(false);

  const badgeColor = methodColors[method] ?? 'bg-gray-600';
  const time = new Date(timestamp).toLocaleString();

  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden">
      {/* Header Row */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 px-4 py-3 bg-gray-900 hover:bg-gray-800 transition-colors text-left"
      >
        <span className={`text-xs font-bold px-2 py-1 rounded ${badgeColor} text-white uppercase`}>
          {method}
        </span>
        <span className="text-gray-400 text-sm flex-1">{time}</span>
        <span className="text-gray-500 text-xs font-mono">{ip}</span>
        <span className="text-gray-500 text-sm ml-2">{expanded ? '▲' : '▼'}</span>
      </button>

      {/* Expanded Details */}
      {expanded && (
        <div className="bg-gray-950 px-4 py-4 flex flex-col gap-4 text-sm">

          {/* Body */}
          <div>
            <p className="text-gray-400 uppercase text-xs tracking-widest mb-1">Body</p>
            <pre className="bg-gray-900 rounded p-3 text-green-300 overflow-x-auto text-xs">
              {body ? JSON.stringify(body, null, 2) : 'No body'}
            </pre>
          </div>

          {/* Query Params */}
          <div>
            <p className="text-gray-400 uppercase text-xs tracking-widest mb-1">Query Params</p>
            <pre className="bg-gray-900 rounded p-3 text-blue-300 overflow-x-auto text-xs">
              {Object.keys(query).length > 0 ? JSON.stringify(query, null, 2) : 'No query params'}
            </pre>
          </div>

          {/* Headers */}
          <div>
            <p className="text-gray-400 uppercase text-xs tracking-widest mb-1">Headers</p>
            <pre className="bg-gray-900 rounded p-3 text-yellow-300 overflow-x-auto text-xs">
              {JSON.stringify(headers, null, 2)}
            </pre>
          </div>

        </div>
      )}
    </div>
  );
}