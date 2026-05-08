# AI Citation Tracking — DataForSEO LLM Mentions

## What is it?

DataForSEO LLM Mentions tracks whether your brand appears in AI-generated answers
from ChatGPT, Perplexity, Google Gemini, and Claude when users search for your
target keywords. This is the emerging "GEO" (Generative Engine Optimisation)
equivalent of rank tracking.

## How to sign up

1. Go to https://dataforseo.com and register with any email.
2. Deposit a minimum of ~$1 to activate the account.
3. Your API login is the email used at sign-up.
4. Find your API password in the DataForSEO dashboard under **API Access**.

## Adding credentials

Set the following environment variables in Vercel (and `.env.local`):

```
DATAFORSEO_LOGIN=your@email.com
DATAFORSEO_PASSWORD=your_api_password
```

Once set, the cron at `/api/cron/llm-mentions` (runs Monday 05:00 UTC) will
automatically start saving results to the `LlmMention` table.

## Expected weekly cost

The cron checks 4 keywords x 4 LLMs = 16 tasks per run.
DataForSEO LLM Mentions costs roughly $0.20 per 100 tasks.
Estimated weekly spend: **< $0.05** — effectively free.
Monthly: < $0.25.

A more aggressive setup (daily, 20 keywords) would cost ~$3/month.

## Tracked keywords (configurable in route.ts)

- "best Istanbul sunset cruise"
- "Bosphorus dinner cruise"
- "Istanbul yacht charter"
- "MerrySails"

## Stored data

Each run saves one `LlmMention` row per keyword/LLM combination with:
- `brandMentioned` — whether MerrySails appeared in the answer
- `brandPosition` — rank position (0 = not mentioned)
- `citationContext` — the sentence containing the brand mention
- `snapshotAt` — timestamp for trend charts
