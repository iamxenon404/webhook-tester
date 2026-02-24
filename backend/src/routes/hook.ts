import { Router, Request, Response } from 'express';
import { endpointExists, appendLog } from '../utils/storage';

const router = Router();

router.all('/:id', (req: Request, res: Response) => {
  const id = req.params.id as string;

  if (!endpointExists(id)) {
    res.status(404).json({ error: `No webhook endpoint found for id: ${id}` });
    return;
  }

  appendLog(id, {
    method: req.method,
    headers: req.headers as Record<string, string | string[]>,
    body: req.body ?? null,
    query: req.query as Record<string, string | string[]>,
    timestamp: Date.now(),
    ip: req.ip ?? req.socket.remoteAddress ?? 'unknown',
  });

  res.status(200).json({ received: true });
});

export default router;