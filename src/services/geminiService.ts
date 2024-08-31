// import { Service } from 'typedi';
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import dotenv from 'dotenv';
// import Env from './Env';

// dotenv.config();

// interface ExtendedModelParams {
//   model: string;
//   prompt: string;
//   temperature: number;
//   maxOutputTokens: number;
// }

// @Service()
// export default class GeminiService {
//   private client: GoogleGenerativeAI;

//   constructor(private readonly env: Env) {
//     if (!this.env.GEMINI_API_KEY) {
//       throw new Error('GEMINI_API_KEY is not set');
//     }
//     this.client = new GoogleGenerativeAI(this.env.GEMINI_API_KEY);
//   }

//   async generateSummary(data: string): Promise<string> {
//     try {
//       const params: ExtendedModelParams = {
//         model: 'models/text-bison-001',
//         prompt: `Summarize the following coding activity: ${data}`,
//         temperature: 0.5,
//         maxOutputTokens: 150
//       };

//       const response = await this.client.getGenerativeModel(params);
//       return response.candidates[0]?.output?.trim() || 'No summary generated';
//     } catch (error) {
//       console.error('generateSummary Error:', error);
//       throw error;
//     }
//   }

//   async generatePrediction(data: string): Promise<string> {
//     try {
//       const params: ExtendedModelParams = {
//         model: 'models/text-bison-001',
//         prompt: `Predict future coding trends based on: ${data}`,
//         temperature: 0.7,
//         maxOutputTokens: 150
//       };

//       const response = await this.client.getGenerativeModel(params);
//       return (
//         response.candidates[0]?.output?.trim() || 'No prediction generated'
//       );
//     } catch (error) {
//       console.error('generatePrediction Error:', error);
//       throw error;
//     }
//   }
// }
