import base_prompt from '../base_prompt.js';
import data from '../request.js';

const ACCOUNT_ID = '';
const API_TOKEN = '';
const MODEL = '@cf/meta/llama-3.1-8b-instruct';

const response = await fetch(
  `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/run/${MODEL}`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`
    },
    body: JSON.stringify({
      prompt: `${base_prompt} ${data}`
    })
  }
);

const output = await response.json();
console.log(output);
