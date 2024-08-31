import { Service } from 'typedi';
import OpenAI from 'openai';
import Env from './Env';

@Service()
export default class OpenAIService {
  private readonly TAG = OpenAIService.name as 'OpenAIService';
  private openai: OpenAI;

  constructor(private readonly Env: Env) {
    this.openai = new OpenAI({
      apiKey: this.Env.OPENAI_API_KEY
    });

    console.info(`#${this.TAG} initialized`);
  }

  async generateSummary(data: string): Promise<string> {
    try {
      const response = await this.openai.completions.create({
        model: 'gpt-3.5-turbo',
        prompt: `Summarize the following coding activity: ${data}`,
        max_tokens: 150
      });
      return response.choices[0].text?.trim() || 'No summary generated';
    } catch (error) {
      console.error('generateSummary Error:', error);
      throw error;
    }
  }

  async generatePrediction(data: string): Promise<string> {
    try {
      const response = await this.openai.completions.create({
        model: 'gpt-3.5-turbo',
        prompt: `Predict future coding trends based on: ${data}`,
        max_tokens: 150
      });
      return response.choices[0].text?.trim() || 'No prediction generated';
    } catch (error) {
      console.error('generatePrediction Error:', error);
      throw error;
    }
  }
}
