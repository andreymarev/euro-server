import { Router } from 'express';
import { createFlightHandler, getFligtsHandler } from '../controllers/flight/flight.controller';
import { createFlightSchema, getFlightsSchema } from '../schemas/flight.schema';
import validate from '../middleware/validateResource';

const flightsRouter = Router();

flightsRouter.post('/', validate(createFlightSchema), createFlightHandler);

flightsRouter.get('/:origin/:destination', validate(getFlightsSchema), getFligtsHandler);

export default flightsRouter;
