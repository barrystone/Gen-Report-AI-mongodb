import cron from 'node-cron';
import Report from '../models/report';
import { Request, Response } from 'express';
import { generateSummary, generatePrediction } from './openaiService';
import { getCodingRecordStr } from './codingRecordService';

export async function getReport(req: Request, res: Response): Promise<void> {
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

export async function generateReport(
  req: Request,
  res: Response
): Promise<void> {
  try {
    // Generate and save the report
    const { summary, prediction } = await generateAndSaveReport();

    res.json({ summary, prediction });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate report' });
  }
}

async function generateAndSaveReport(): Promise<{
  summary: string;
  prediction: string;
}> {
  // Get historical data from MongoDB
  const codingRecord = await getCodingRecordStr();

  // Generate a report
  const summary = await generateSummary(codingRecord);
  const prediction = await generatePrediction(codingRecord);

  // Save the report to MongoDB
  const report = new Report({ summary, prediction });
  await report.save();

  return { summary, prediction };
}

export function reportScheduler() {
  // Default to run daily at midnight (00:00) if no schedule frequency is provided
  const scheduleFrequency =
    process.env.REPORT_SCHEDULE_FREQUENCY || '0 0 * * *';

  // Use node-cron to create a scheduled task
  cron.schedule(scheduleFrequency, async () => {
    console.log(`Running scheduled task at ${new Date().toISOString()}`);
    try {
      // Generate report
      await generateAndSaveReport();
      console.log('Report generated successfully');
    } catch (error) {
      console.error('Failed to generate report:', error);
    }
  });
}
