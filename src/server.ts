import express from 'express';
import dotenv from 'dotenv';
import routes from './api/routes';
import { connectToMongoDB } from './config/database';
import { codingRecordScheduler } from './services/codingRecordService';
import { reportScheduler } from './services/reportService';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectToMongoDB();

    // Start coding record scheduler
    codingRecordScheduler();
    // Start report scheduler
    reportScheduler();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server due to database connection error');
  }
};

startServer();
