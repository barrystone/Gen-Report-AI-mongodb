import { Service } from 'typedi';
import cron from 'node-cron';
import Report from '../models/report';
import { Request, Response } from 'express';
import OpenaiService from './OpenAIService';
import CodingRecordService from './CodingRecordService';

@Service()
export default class ReportService {
  private readonly TAG = ReportService.name as 'ReportService';

  constructor(
    private readonly codingRecordService: CodingRecordService,
    private readonly OpenaiService: OpenaiService
  ) {
    console.info(`#${this.TAG} initialized`);
  }

  async getReport(_: Request, res: Response): Promise<void> {
    try {
      // Get the latest report from MongoDB
      const report = await Report.findOne().sort({ createdAt: -1 });
      if (report) {
        res.json(report);
      } else {
        res.status(404).json({ message: 'No report found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to get report' });
    }
  }

  async generateReport(_: Request, res: Response): Promise<void> {
    try {
      // Generate and save the report
      const { summary, prediction } = await this.#generateAndSaveReport();

      res.json({ summary, prediction });
    } catch (error) {
      res.status(500).json({
        error:
          // `#${this.TAG} Failed to generate report: ${error}`
          `Failed to generate report: ${error}`
      });
    }
  }

  async #generateAndSaveReport(): Promise<{
    summary: string;
    prediction: string;
  }> {
    // Get historical data from MongoDB
    const codingRecord = await this.codingRecordService.getCodingRecordStr();

    // Generate a report
    const summary = await this.OpenaiService.generateSummary(codingRecord);
    const prediction = await this.OpenaiService.generatePrediction(
      codingRecord
    );

    // Save the report to MongoDB
    const report = new Report({ summary, prediction });
    await report.save();

    return { summary, prediction };
  }

  reportScheduler() {
    // Default to run daily at midnight (00:00) if no schedule frequency is provided
    const scheduleFrequency =
      process.env.REPORT_SCHEDULE_FREQUENCY || '0 0 * * *';

    // Use node-cron to create a scheduled task
    cron.schedule(scheduleFrequency, async () => {
      console.log(`Running scheduled task at ${new Date().toISOString()}`);
      try {
        // Generate report
        await this.#generateAndSaveReport();
        console.log('Report generated successfully');
      } catch (error) {
        console.error(
          // `#${this.TAG} Failed to generate report:`, error
          `Failed to generate report: ${error}`
        );
      }
    });
  }
}
