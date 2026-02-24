import { Router, Request, Response } from 'express';
import { generateId } from '../utils/idGen';
import { createEndpoint } from '../utils/storage';

const router = Router();

router.post('/', (req: Request, res: Response) => {
  const id = generateId();
  createEndpoint(id);

  const baseUrl = `${req.protocol}://${req.get('host')}`;

  res.status(201).json({
    id,
    url: `${baseUrl}/hook/${id}`,
  });
});

export default router;