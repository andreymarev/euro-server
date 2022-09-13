import { Router } from 'express';
import flightsRouter from './flight';

const router = Router();

router.use('/flights', flightsRouter);

export default router;
