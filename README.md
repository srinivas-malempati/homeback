# 🏠 HomeBack — NRI US Exit Advisor

AI-powered relocation advisor for Indian families moving back to India from the USA.

## Features
- 🏡 Home Sale Advisor — Capital gains tax calculator, net proceeds, repatriation guide
- 💰 401k & Finance Advisor — Penalty math, DTAA treaty, rollover scenarios
- 📦 Shipping Advisor — Ship vs. sell calculator, container sizing, customs guide
- 🚗 Car Value Advisor — Market price estimate, platform comparison

## Tech Stack
- Next.js 15 + TypeScript + Tailwind CSS
- Groq API (llama-3.3-70b-versatile)
- Deployed on Vercel

## Local Setup

```bash
# 1. Install dependencies
npm install

# 2. Add your Groq API key (get free key at console.groq.com)
cp .env.example .env.local
# Edit .env.local → GROQ_API_KEY=your_real_key

# 3. Run locally
npm run dev
# Open http://localhost:3000
```

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to vercel.com → Import Project → Select repo
3. Add Environment Variable: GROQ_API_KEY = your key
4. Click Deploy ✓
