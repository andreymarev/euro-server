import express, { Application, NextFunction, Request, Response } from 'express';
import routes from './src/api/routes';
import log from './src/utils/logger';
import * as dotenv from 'dotenv';

dotenv.config();
const app: Application = express();
const port = process.env.PORT;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/api/v1', routes);

try {
  app.listen(port, () => {
    log.info(`Server running on http://localhost:${port}`);
  });
} catch (error: any) {
  log.error(`Error occurred: ${error.message}`);
}
