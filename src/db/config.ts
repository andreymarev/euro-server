import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();
const dbUri: string = process.env.DBURI || '';

const sequelizeConnection = new Sequelize(dbUri);

export default sequelizeConnection;
