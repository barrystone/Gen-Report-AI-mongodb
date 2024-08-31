import { Service } from 'typedi';
import { Request, Response } from 'express';
import cron from 'node-cron';
import CodingRecord from '../models/codingRecord';
import Env from './Env';

@Service()
export default class CodingRecordService {
  private readonly TAG = CodingRecordService.name as 'CodingRecordService';

  constructor(private readonly env: Env) {
    console.info(`#${this.TAG} initialized`);
  }

  async getCodingRecord(_: Request, res: Response): Promise<void> {
    try {
      // Fetch historical data from MongoDB
      const codingRecord = await this.getCodingRecordStr();
      res.json({ codingRecord });
    } catch (error) {
      res.status(500).json({
        error: `Failed to fetch coding record: ${error}`
        // error: `#${this.TAG} Failed to fetch coding record: ${error}`
      });
    }
  }

  async fetchCodingRecord(_: Request, res: Response): Promise<void> {
    try {
      // Fetch coding record from WakaTime API and save it to MongoDB
      await this.#fetchCodingRecordFromWakaTime();
      res
        .status(200)
        .json({ message: 'Coding record fetched and saved successfully' });
    } catch (error) {
      res.status(500).json({
        // error: `#${this.TAG} Failed to fetch and save coding record: ${error}`
        error: `Failed to fetch coding record: ${error}`
      });
    }
  }

  async getCodingRecordStr(): Promise<string> {
    try {
      // Fetch historical data from MongoDB
      const codingRecord = await CodingRecord.find().exec();

      // Convert the data to a string format
      return JSON.stringify(codingRecord);
    } catch (error) {
      console.error(
        // `#${this.TAG} Error fetching coding data from MongoDB: ${error}`
        `Error fetching coding data from MongoDB: ${error}`
      );
      throw new Error(
        // `#${this.TAG} Failed to fetch coding data from MongoDB`
        'Failed to fetch coding data from MongoDB'
      );
    }
  }

  codingRecordScheduler() {
    // Default to run daily at 11:55 PM (23:55) to ensure it runs before reportScheduler
    const scheduleFrequency =
      this.env.CODING_RECORD_SCHEDULE_FREQUENCY || '55 23 * * *';

    // Use node-cron to create a scheduled task
    cron.schedule(scheduleFrequency, async () => {
      console.log(
        `Running coding record scheduled task at ${new Date().toISOString()}`
      );
      try {
        await this.#fetchCodingRecordFromWakaTime();
      } catch (error) {
        console.error(
          // `#${this.TAG} Failed to fetch and save coding record: ${error}`
          `Failed to fetch and save coding record: ${error}`
        );
      }
    });
  }

  async #fetchCodingRecordFromWakaTime() {
    try {
      if (!this.env.WAKATIME_API_URL) {
        throw new Error('Please provide a WakaTime API URL in the .env file');
      }

      const response = await fetch(this.env.WAKATIME_API_URL);
      const { data } = await response.json();

      const codingRecord = new CodingRecord({ data });
      await codingRecord.save();

      console.log('Coding record saved successfully');
    } catch (error) {
      console.error(
        // `#${this.TAG} Failed to fetch coding record from WakaTime: ${error}`
        `Failed to fetch coding record from WakaTime: ${error}`
      );
    }
  }
}
