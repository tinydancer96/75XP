# Tech Stack - Spiking & RATS

## Gemini API Integration Guide

We are using Google's Gemini 1.5 Flash model via the Generative Language REST API. This model is free to use under standard rate limits, making it ideal for a demo build. We can also pass contextual data like the user's streak count and current day number to make summaries more personalized

## AI Model

|                 |                                                                |
| --------------- | -------------------------------------------------------------- |
| **Model**       | `gemini-1.5-flash`                                             |
| **Cost**        | Free tier, no billing required                                 |
| **Rate limits** | 15 req/min, 1,000 req/day                                      |
| **Key**         | Generate at [aistudio.google.com](https://aistudio.google.com) |

## Endpoint

```
POST https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_API_KEY
```

## Request Structure

```json
{
  "contents": [
    {
      "parts": [{ "text": "<YOUR_PROMPT_HERE>" }]
    }
  ],
  "generationConfig": {
    "temperature": 0.7,
    "maxOutputTokens": 300
  }
}
```

- **temperature** — creativity vs. predictability (0.7 = balanced, coach-like tone)
- **maxOutputTokens** — caps response length to limit token usage (300–400 is sufficient for our use case)

## User Form Fields

| Field          | Type         | Description            |
| -------------- | ------------ | ---------------------- |
| `mood`         | Number (1–5) | Mood rating            |
| `achievements` | Text         | What they accomplished |
| `challenges`   | Text         | Obstacles faced        |
| `focus`        | Text         | Tomorrow's priority    |

Optional context for personalization: `streak` (perfect days), `dayNumber` (e.g. Day 12/75)

## Response

```json
{
  "candidates": [
    {
      "content": {
        "parts": [{ "text": "<AI_SUMMARY>" }]
      }
    }
  ]
}
```

Extract the summary with:

```javascript
const summary = data.candidates[0].content.parts[0].text;
```

## Notes

- Store API key in `.env`, **never commit** to version control
- Free tier is sufficient for demo and testing
- Can adjust `temperature` to 0.8 for more personality
- Reduce `maxOutputTokens` to 200 to shorten responses

## Documentation & References

- [Gemini API Overview](https://ai.google.dev/gemini-api/docs)
- [Gemini REST API Reference](https://ai.google.dev/api/generate-content)
- [Gemini Models List](https://ai.google.dev/gemini-api/docs/models)
- [Google AI Studio](https://aistudio.google.com)
