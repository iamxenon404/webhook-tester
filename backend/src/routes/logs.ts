import { Router, Request, Response } from 'express';
import { getLogs } from '../utils/storage';

const router = Router();

router.get('/:id', (req: Request, res: Response) => {
  const id = req.params.id as string;
  const logs = getLogs(id);

  if (logs === null) {
    res.status(404).json({ error: `No webhook endpoint found for id: ${id}` });
    return;
  }

  res.status(200).json({ id, logs });
});

export default router;