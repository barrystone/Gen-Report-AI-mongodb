// import { GoogleGenerativeAI } from '@google/generative-ai';
// import dotenv from 'dotenv';

// dotenv.config();

// // 創建 Google Generative AI 客戶端

// if (!process.env.GEMINI_API_KEY) {
//     throw new Error('GEMINI_API_KEY is not set');
// }

// const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // Extend the ModelParams type to include the prompt property
// interface ExtendedModelParams {
//     model: string;
//     prompt: string;
//     temperature: number;
//     maxOutputTokens: number;
// }

// // 產生摘要
// export async function generateSummary(data: string): Promise<string> {
//     try {
//         const params: ExtendedModelParams = {
//             model: 'models/text-bison-001', // 生成文本的模型名稱
//             prompt: `Summarize the following coding activity: ${data}`,
//             temperature: 0.5, // 控制生成的隨機性
//             maxOutputTokens: 150 // 最大輸出 token 數量
//         };

//         const response = await client.getGenerativeModel(params);

//         return response.
//     } catch (error) {
//         console.error('generateSummary Error:', error);
//         throw error;
//     }
// }

// // 產生預測
// export async function generatePrediction(data: string): Promise<string> {
//     try {
//         const params: ExtendedModelParams = {
//             model: 'models/text-bison-001', // 預測的模型名稱
//             prompt: `Predict future coding trends based on: ${data}`,
//             temperature: 0.7, // 更高的隨機性以產生預測
//             maxOutputTokens: 150
//         };

//         const response = await client.getGenerativeModel(params);

//         return response.candidates[0]?.output?.trim() || 'No prediction generated';
//     } catch (error) {
//         console.error('generatePrediction Error:', error);
//         throw error;
//     }
// }
