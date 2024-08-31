import 'reflect-metadata';
import express from 'express';
import routes from './api/routes';
import { connectToMongoDB } from './config/database';
import CodingRecordService from './services/CodingRecordService';
import ReportService from './services/ReportService';
import Container from 'typedi';
import Env from './services/Env';

main();

async function main() {
  try {
    // Connect to MongoDB
    await connectToMongoDB();
  } catch (error) {
    console.error('Failed to start server due to database connection error');
  }

  const app = express();
  app.use(express.json());
  app.use('/api', routes);

  const env = Container.get(Env);

  app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
  });

  // Start coding record scheduler
  Container.get(CodingRecordService).codingRecordScheduler();
  // Start report scheduler
  Container.get(ReportService).reportScheduler();
}
