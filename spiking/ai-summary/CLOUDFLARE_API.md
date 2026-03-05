# Cloudflare Workers AI — API Documentation

## Why We Chose Cloudflare Workers AI

### Speed

Cloudflare Workers AI runs on Cloudflare's global edge network, meaning inference happens geographically close to the user. In our testing, response times were significantly faster than Gemini's API — particularly for shorter prompts — due to lower network latency and edge-based execution.

### Cost

Cloudflare offers a generous free tier for Workers AI, making it practical for development and low-volume production use without incurring API costs.

### Model Access

Cloudflare provides access to open-source models like Meta's Llama 3.1 out of the box, without needing to manage infrastructure or GPU resources.

---

## Known Limitations

### Token Limit / Response Truncation

The primary drawback of Cloudflare Workers AI is that **responses can be cut off** when the output exceeds the model's token limit. This is particularly noticeable with structured outputs (e.g. JSON), where a truncated response will produce invalid JSON that cannot be parsed.

**Mitigation strategies:**

- Keep prompts concise to leave more room for the response
- Request shorter outputs explicitly in your prompt (e.g. _"Respond in under 200 words"_)
- Validate and handle truncated responses gracefully in code
- Consider chunking large inputs into smaller requests

---

## Setup

### Environment Variables

Create a `.env` file in your project root:

```env
CLOUDFLARE_ACCOUNT_ID=your_account_id_here
CLOUDFLARE_API_TOKEN=your_api_token_here
CLOUDFLARE_MODEL=@cf/meta/llama-3.1-8b-instruct
```

> ⚠️ Never commit `.env` to version control. Add it to `.gitignore`.

### Install Dependencies

```bash
npm install dotenv
```

---

## Basic Usage

### Minimal Example

```js
import dotenv from "dotenv";
dotenv.config();

const { CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN, CLOUDFLARE_MODEL } = process.env;

const response = await fetch(
  `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/run/${CLOUDFLARE_MODEL}`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
    },
    body: JSON.stringify({
      prompt: "Summarise the following text in 3 bullet points: ...",
    }),
  },
);

const output = await response.json();
console.log(output.result.response);
```

---

### Structured JSON Output

Request JSON from the model and parse the response:

````js
const response = await fetch(
  `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/run/${CLOUDFLARE_MODEL}`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
    },
    body: JSON.stringify({
      prompt: `
        Analyse the following data and respond ONLY with a JSON object.
        Do not include any explanation or markdown formatting.
        
        Data: ${yourData}
        
        Respond in this format:
        {
          "summary": "...",
          "highlights": ["...", "..."],
          "focus_areas": ["...", "..."]
        }
      `,
    }),
  },
);

const output = await response.json();

// Strip markdown code fences if model wraps response in ```json
const raw = output.result.response.replace(/```json|```/g, "").trim();

try {
  const parsed = JSON.parse(raw);
  console.log(parsed);
} catch (err) {
  // Response may have been truncated — handle gracefully
  console.error("Failed to parse response (possibly truncated):", raw);
}
````

---

### With Logging

```js
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

const { CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN, CLOUDFLARE_MODEL } = process.env;

async function runAI(prompt) {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/run/${CLOUDFLARE_MODEL}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
      },
      body: JSON.stringify({ prompt }),
    },
  );

  const output = await response.json();

  // Log to file
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const logData = {
    timestamp: new Date().toISOString(),
    success: output.success,
    response: output.result?.response,
    usage: output.result?.usage,
    errors: output.errors,
  };

  fs.mkdirSync("logs", { recursive: true });
  fs.writeFileSync(`logs/${timestamp}.json`, JSON.stringify(logData, null, 2));

  return output;
}

const result = await runAI("Your prompt here");
console.log(result.result.response);
```

---

## API Response Structure

A successful response looks like this:

```json
{
  "result": {
    "response": "The model's text output...",
    "usage": {
      "prompt_tokens": 654,
      "completion_tokens": 256,
      "total_tokens": 910
    }
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

| Field                            | Description                                    |
| -------------------------------- | ---------------------------------------------- |
| `result.response`                | The model's text output                        |
| `result.usage.prompt_tokens`     | Tokens used by the input prompt                |
| `result.usage.completion_tokens` | Tokens used by the model's response            |
| `result.usage.total_tokens`      | Total tokens consumed                          |
| `success`                        | `true` if the request succeeded                |
| `errors`                         | Array of error objects if something went wrong |

---

## Available Models

| Model                                  | Description                                  |
| -------------------------------------- | -------------------------------------------- |
| `@cf/meta/llama-3.1-8b-instruct`       | Fast, general-purpose (used in this project) |
| `@cf/meta/llama-3.1-70b-instruct`      | Larger, more capable — higher latency        |
| `@cf/mistral/mistral-7b-instruct-v0.1` | Lightweight alternative                      |

Full model list: [developers.cloudflare.com/workers-ai/models](https://developers.cloudflare.com/workers-ai/models/)

---

## Comparison: Cloudflare vs Gemini

|                       | Cloudflare Workers AI             | Gemini API               |
| --------------------- | --------------------------------- | ------------------------ |
| **Speed**             | ✅ Faster (edge network)          | 🔶 Slower (centralised)  |
| **Token limit**       | ⚠️ Lower — responses can truncate | ✅ Higher context window |
| **Free tier**         | ✅ Generous                       | ✅ Available             |
| **Structured output** | ⚠️ Requires careful prompting     | ✅ Native JSON mode      |
| **Model variety**     | ✅ Open-source models             | 🔶 Google models only    |

**Verdict:** Cloudflare is the better choice for speed-sensitive workloads with shorter outputs. For tasks requiring long, structured responses, Gemini may be more reliable due to its higher token limits.
