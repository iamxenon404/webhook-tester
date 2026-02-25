'use client';

import { useEffect, useState } from 'react';
import LogEntry from './LogEntry';

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

  const fetchLogs = async () => {
    try {
      const res = await fetch(`http://localhost:5000/${id}`);
      if (!res.ok) throw new Error('Endpoint not found');
      const data = await res.json();
      setLogs(data.logs);
      setError(null);
    } catch (err) {
      setError('Failed to fetch logs. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 3000);
    return () => clearInterval(interval);
  }, [id]);

  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-12">
      <div className="max-w-2xl mx-auto flex flex-col gap-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <a href="/" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
              ← Back
            </a>
            <h1 className="text-2xl font-bold tracking-tight mt-2">Request Logs</h1>
            <p className="text-gray-500 font-mono text-sm mt-1">{id}</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-green-400">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Live
          </div>
        </div>

        {/* Webhook URL reminder */}
        <div className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-sm font-mono text-gray-400">
          POST → <span className="text-green-400">http://localhost:5000/hook/{id}</span>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-900/40 border border-red-700 text-red-300 rounded-lg px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center text-gray-600 py-16">Fetching logs...</div>
        )}

        {/* Logs */}
        {!loading && logs.length > 0 && (
          <div className="flex flex-col gap-3">
            <h2 className="text-sm text-gray-400 uppercase tracking-widest">
              {logs.length} request{logs.length !== 1 ? 's' : ''} captured
            </h2>
            {[...logs].reverse().map((log, i) => (
              <LogEntry key={i} {...log} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && logs.length === 0 && !error && (
          <div className="text-center text-gray-600 py-16 border border-dashed border-gray-800 rounded-lg">
            Waiting for requests... Send something to the webhook URL above.
          </div>
        )}

      </div>
    </main>
  );
}