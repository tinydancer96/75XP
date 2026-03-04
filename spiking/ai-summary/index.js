import { GoogleGenerativeAI } from "@google/generative-ai";
import base_prompt from "./base_prompt.js";
import weekly_data from "./request.js";

const genAI = new GoogleGenerativeAI("");

const model = genAI.getGenerativeModel({
  model: "gemini-3-flash-preview",
  systemInstruction: base_prompt,
  generationConfig: {
    responseMimeType: "application/json",
  },
});

// Each weekly call only sends the data
async function generateWeeklySummary(weeklyData) {
  const prompt = JSON.stringify(weeklyData);

  try {
    const result = await model.generateContent(prompt);
    return JSON.parse(result.response.text());
  } catch (error) {
    console.error("Gemini API error:", error);
    throw error;
  }
}

generateWeeklySummary(weekly_data);
