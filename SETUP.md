# 🚀 Quick Setup Guide

## Step 1: Get API Keys

### OpenAI API Key
1. Visit https://platform.openai.com/api/keys
2. Sign up or log in with your OpenAI account
3. Click "Create new secret key"
4. Copy the key (it won't be shown again)

### OpenWeather API Key
1. Visit https://openweathermap.org/api
2. Sign up for a free account
3. Go to "API keys" section
4. Copy your API key

## Step 2: Configure Environment Variables

1. Open the `.env` file in the project root
2. Replace the placeholder values:
   ```
   OPENAI_API_KEY=sk-your-actual-key-here
   OPENWEATHER_API_KEY=your-actual-key-here
   ```

## Step 3: Install Dependencies

Already done! But if needed, run:
```bash
npm install
```

## Step 4: Run the Application

### Web Interface (Recommended)
```bash
npm start
```

Then open your browser and go to: **http://localhost:3000**

### CLI Interface (Alternative)
```bash
npm run cli
```

## Step 5: Start Asking!

Example queries:
- "What's the weather in London?"
- "How cold is it in Tokyo?"
- "Tell me about New York weather"
- "Is it sunny in Paris?"

## Troubleshooting

### Error: "Cannot find package..."
Run: `npm install`

### Error: "API key is missing"
Make sure your `.env` file has valid API keys from OpenAI and OpenWeather.

### Port already in use
Edit `.env` and change the PORT:
```
PORT=3001
```

### Cities not found
Try using the full city name or add the country code:
- Instead of: "Mumbai"
- Try: "Mumbai, India"

## Testing Without Live API Calls

If you want to test the UI without using real API keys, you can mock the backend response in `src/server.js`. This is useful for development.

## Need Help?

- OpenAI Docs: https://platform.openai.com/docs
- OpenWeather Docs: https://openweathermap.org/api
- Node.js Docs: https://nodejs.org/docs
