import { InferAttributes, Model, InferCreationAttributes, DataTypes, Optional, CreationOptional } from 'sequelize';
import sequelizeConnection from '../config';

interface FlightAttributes {
  id?: number;
  origin: string;
  destination: string;
  departureDate: string;
  seatAvailability: number;
  priceAmmount: number;
  priceCurrency: string;
}

class Flight extends Model<InferAttributes<Flight>, InferCreationAttributes<Flight>> {
  declare id: CreationOptional<number>;
  declare origin: string;
  declare destination: string;
  declare departureDate: string;
  declare seatAvailability: number;
  declare priceAmmount: number;
  declare priceCurrency: string;
}

export interface FlightInput extends Optional<FlightAttributes, 'id'> {}
export interface FlightOuput extends Required<FlightAttributes> {}
Flight.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      // defaultValue: DataTypes.UUIDV4,
    },
    origin: {
      type: new DataTypes.STRING(3),
      allowNull: false,
    },
    destination: {
      type: new DataTypes.STRING(3),
      allowNull: false,
    },
    departureDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    seatAvailability: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    priceAmmount: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    priceCurrency: {
      type: new DataTypes.STRING(3),
      allowNull: false,
    },
  },
  { tableName: 'flights', timestamps: false, sequelize: sequelizeConnection }
);

export default Flight;
