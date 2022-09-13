import { Request, Response } from 'express';
import { createFlight, getAllOriginDestinationFlights } from '../../services/flight.service';
import { Op } from 'sequelize';
import { CreateFlightInput, GetFlightInput } from '../../schemas/flight.schema';

export async function createFlightHandler(req: Request<unknown, unknown, CreateFlightInput['body']>, res: Response) {
  try {
    const flight = await createFlight(req.body);
    return res.status(201).send(flight);
  } catch (e: any) {
    return res.status(409).send(e.message);
  }
}

export async function getFligtsHandler(
  req: Request<GetFlightInput['params'], unknown, unknown, GetFlightInput['query']>,
  res: Response
) {
  try {
    const promotions = await getAllOriginDestinationFlights(req.params, req.query);
    return res.send([promotions]);
  } catch (e: any) {
    return res.status(400).send(e.message);
  }
}
