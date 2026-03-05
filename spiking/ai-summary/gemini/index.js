import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import base_prompt from '../base_prompt.js';
import weekly_data from '../request.js';

dotenv.config({ path: `.env` });
if (!process.env.API_KEY) console.error('No API_KEY present in env vars');

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({
  model: 'gemini-3-flash-preview',
  systemInstruction: base_prompt,
  generationConfig: {
    responseMimeType: 'application/json'
  }
});

// Each weekly call only sends the data
async function generateWeeklySummary(weeklyData) {
  const prompt = JSON.stringify(weeklyData);

  try {
    const result = await model.generateContent(prompt);
    console.log(result);
    // return JSON.parse(result.response.text());
  } catch (error) {
    console.error('Gemini API error:', error);
    throw error;
  }
}

generateWeeklySummary(weekly_data);
