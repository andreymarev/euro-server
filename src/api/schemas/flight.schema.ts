import { number, object, string, TypeOf, union } from 'zod';

export const createFlightSchema = object({
  body: object({
    origin: string({
      required_error: 'Origin is required',
    }).length(3, 'IATA City code must be 3 chars long'),
    destination: string({
      required_error: 'Destination is required',
    }).length(3, 'IATA City code must be 3 chars long'),
    departureDate: string({
      required_error: 'Departure date is required',
    }),
    seatAvailability: number({
      required_error: 'Seat Availability is required',
    }),
    priceAmmount: number({
      required_error: 'Price amount is required',
    }),
    priceCurrency: string({
      required_error: 'Price currency is required',
    }).length(3, 'Currency abbreviation must be 3 chars long'),
  }),
});

export const getFlightsSchema = object({
  params: object({
    origin: string({
      required_error: 'Origin is required',
    }).length(3, 'IATA City code must be 3 chars long'),
    destination: string({
      required_error: 'Destination is required',
    }).length(3, 'IATA City code must be 3 chars long'),
  }),
  query: object({
    departureDate: string({
      required_error: 'Departure Date is required',
    }),
    returnDate: string({
      required_error: 'Return Date is required',
    }),
  }),
});

export type CreateFlightInput = TypeOf<typeof createFlightSchema>;
export type GetFlightInput = TypeOf<typeof getFlightsSchema>;
