import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function generateSummary(data: string): Promise<string> {
  try {
    const response = await openai.completions.create({
      model: 'gpt-3.5-turbo',
      // model: 'text-embedding-3-small',
      prompt: `Summarize the following coding activity: ${data}`,
      max_tokens: 150
    });
    return response.choices[0].text?.trim() || 'No summary generated';
  } catch (error) {
    console.error('generateSummary Error:', error);
    throw error;
  }
}

export async function generatePrediction(data: string): Promise<string> {
  try {
    const response = await openai.completions.create({
      model: 'gpt-3.5-turbo',
      // model: 'text-embedding-3-small',
      prompt: `Predict future coding trends based on: ${data}`,
      max_tokens: 150
    });
    return response.choices[0].text?.trim() || 'No prediction generated';
  } catch (error) {
    console.error('generatePrediction Error:', error);
    throw error;
  }
}
