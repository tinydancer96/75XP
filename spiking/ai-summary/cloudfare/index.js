import base_prompt from "../base_prompt.js";
import data from "../request.js";
import dotenv from "dotenv";

dotenv.config({ path: `.env` });

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const MODEL = process.env.CLOUDFLARE_MODEL;

if (!API_TOKEN || !ACCOUNT_ID || !MODEL) {
  console.error("Missing environment variables");
  process.exit();
}

const response = await fetch(
  `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/run/${MODEL}`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({
      prompt: `${base_prompt} ${data}`,
    }),
  },
);

const output = await response.json();
console.log(output);
