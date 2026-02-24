export interface RequestLog {
  method: string;
  headers: Record<string, string | string[]>;
  body: unknown;
  query: Record<string, string | string[]>;
  timestamp: number;
  ip: string;
}

// In-memory store: id -> list of captured requests
const store: Record<string, RequestLog[]> = {};

export function createEndpoint(id: string): void {
  store[id] = [];
}

export function endpointExists(id: string): boolean {
  return id in store;
}

export function appendLog(id: string, log: RequestLog): void {
  store[id].push(log);
}

export function getLogs(id: string): RequestLog[] | null {
  if (!endpointExists(id)) return null;
  return store[id];
}