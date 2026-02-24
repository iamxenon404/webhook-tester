import { randomBytes } from 'crypto';

export function generateId(length: number = 6): string {
  return randomBytes(length).toString('hex').slice(0, length);
}