import dayjs from 'dayjs';
import { Op } from 'sequelize';
import Flight, { FlightInput, FlightOuput } from '../../db/models/flight.model';

export async function createFlight(input: FlightInput): Promise<FlightOuput> {
  try {
    return await Flight.create(input);
  } catch (e: any) {
    throw new Error(e);
  }
}

interface PromotionsOutput {
  depart: FlightOuput[];
  return: FlightOuput[];
}

interface PromoFlights {
  depart: Array<Flight>;
  return: Array<Flight>;
}

export async function getAllOriginDestinationFlights(params: any, query: any): Promise<PromotionsOutput> {
  const isAmadeusSearch = query.service && query.service === 'amadeusBestPrice';

  try {
    const departRange = createDateRange(query.departureDate);
    const returnRange = createDateRange(query.returnDate);

    const flights = await Flight.findAll({
      where: {
        [Op.or]: [
          {
            origin: params.origin,
            destination: params.destination,
            departureDate: isAmadeusSearch ? { [Op.or]: departRange } : query.departureDate,
          },
          {
            origin: params.destination,
            destination: params.origin,
            departureDate: isAmadeusSearch ? { [Op.or]: returnRange } : query.returnDate,
          },
        ],
      },
      order: [['priceAmmount', 'ASC']],
    });

    const promosResult: PromoFlights = { depart: [], return: [] };
    flights.map((f) => {
      if (f.origin === params.origin) promosResult.depart.push(f);
      if (f.origin === params.destination) promosResult.return.push(f);
    });

    return promosResult;
  } catch (e: any) {
    throw new Error(e);
  }
}

const createDateRange = (departureDate: string) => {
  const range: Array<string> = [];

  for (let i = 1; i <= 5; i++) {
    const nextDay = dayjs(departureDate).add(i, 'day').format('YYYY-MM-DD');
    const prevDay = dayjs(departureDate).subtract(i, 'day').format('YYYY-MM-DD');
    range.push(nextDay);
    range.unshift(prevDay);
  }

  return range;
};
