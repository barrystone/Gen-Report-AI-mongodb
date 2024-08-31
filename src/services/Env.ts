import { Service } from 'typedi';
import dotenv from 'dotenv';

dotenv.config();

@Service()
export default class Env {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public readonly MONGODB_URI = process.env.MONGODB_URI;
  public readonly OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  public readonly GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  public readonly WAKATIME_API_URL = process.env.WAKATIME_API_URL;
  public readonly CODING_RECORD_SCHEDULE_FREQUENCY =
    process.env.CODING_RECORD_SCHEDULE_FREQUENCY;
  public readonly REPORT_SCHEDULE_FREQUENCY =
    process.env.REPORT_SCHEDULE_FREQUENCY;

  public readonly PORT = process.env.PORT || 3000;
}
