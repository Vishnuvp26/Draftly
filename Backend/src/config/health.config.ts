import { Router } from 'express';
import { HttpStatus } from '../constants/statusConstant';

const router = Router();

router.get('/', (req, res) => {
  res.status(HttpStatus.OK).json({ success: true });
});

export default router;