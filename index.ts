import express, { Application, Request, Response } from 'express';
import routes from './src/api/routes';
import log from './src/utils/logger';

const app: Application = express();
const port = 3000;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);

try {
  app.listen(port, () => {
    log.info(`Server running on http://localhost:${port}`);
  });
} catch (error: any) {
  log.error(`Error occurred: ${error.message}`);
}
