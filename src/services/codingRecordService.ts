import { Request, Response } from 'express';
import CodingRecord from '../models/codingRecord';
import cron from 'node-cron';
import dotenv from 'dotenv';

dotenv.config();

export async function getCodingRecord(
  req: Request,
  res: Response
): Promise<void> {
  try {
    // Fetch historical data from MongoDB
    const codingRecord = await getCodingRecordStr();
    res.json({ codingRecord });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch coding record' });
  }
}

export async function fetchCodingRecord(
  req: Request,
  res: Response
): Promise<void> {
  try {
    // Fetch coding record from WakaTime API and save it to MongoDB
    await fetchCodingRecordFromWakaTime();
    res
      .status(200)
      .json({ message: 'Coding record fetched and saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch coding record' });
  }
}

export async function getCodingRecordStr(): Promise<string> {
  try {
    // Fetch historical data from MongoDB
    const codingRecord = await CodingRecord.find().exec();

    // Convert the data to a string format
    return JSON.stringify(codingRecord);
  } catch (error) {
    console.error('Error fetching coding data from MongoDB:', error);
    throw new Error('Failed to fetch coding data from MongoDB');
  }
}

export function codingRecordScheduler() {
  // Default to run daily at 11:55 PM (23:55) to ensure it runs before reportScheduler
  const scheduleFrequency =
    process.env.CODING_RECORD_SCHEDULE_FREQUENCY || '55 23 * * *';

  // Use node-cron to create a scheduled task
  cron.schedule(scheduleFrequency, async () => {
    console.log(
      `Running coding record scheduled task at ${new Date().toISOString()}`
    );
    try {
      await fetchCodingRecordFromWakaTime();
    } catch (error) {
      console.error('Failed to fetch and save coding record:', error);
    }
  });
}

export async function fetchCodingRecordFromWakaTime() {
  try {
    if (!process.env.WAKATIME_API_URL) {
      throw new Error('WakaTime API URL is not provided');
    }

    const response = await fetch(process.env.WAKATIME_API_URL);
    const { data } = await response.json();

    const codingRecord = new CodingRecord({ data });
    console.log('🚀 codingRecord:', codingRecord);
    await codingRecord.save();

    console.log('Coding record saved successfully');
  } catch (error) {
    console.error('Failed to fetch coding record from WakaTime:', error);
  }
}
