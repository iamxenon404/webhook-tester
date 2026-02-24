import { Request, Response, NextFunction } from 'express';
import express from 'express';

// Support JSON, URL-encoded, and raw text bodies
export const jsonParser = express.json();
export const urlencodedParser = express.urlencoded({ extended: true });
export const textParser = express.text();

// Fallback: if body is still empty, try to capture raw string
export function bodyFallback(req: Request, _res: Response, next: NextFunction): void {
  if (req.body === undefined) {
    req.body = null;
  }
  next();
} 