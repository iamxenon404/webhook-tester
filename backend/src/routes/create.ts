import { Router, Request, Response } from 'express';
import { createEndpoint } from '../utils/storage';
import { generateId } from '../utils/idgen';

const router = Router();

router.post('/', (req: Request, res: Response) => {
  const id = generateId();
  createEndpoint(id);

  const protocol = process.env.NODE_ENV === 'production' ? 'https' : req.protocol;
  const baseUrl = `${protocol}://${req.get('host')}`;

  res.status(201).json({
    id,
    url: `${baseUrl}/hook/${id}`,
  });
});

export default router;