import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { chatWithWeatherAI } from './openaiClient.js';

// Load environment variables
dotenv.config();

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Validate required environment variables
if (!process.env.OPENAI_API_KEY) {
  console.error('❌ Error: OPENAI_API_KEY is not set in .env file');
  process.exit(1);
}

if (!process.env.OPENWEATHER_API_KEY) {
  console.error('❌ Error: OPENWEATHER_API_KEY is not set in .env file');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// API endpoint for weather queries
app.post('/api/weather', async (req, res) => {
  try {
    const { message } = req.body;

    console.log(`📨 Received message: "${message}"`);

    if (!message || message.trim() === '') {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log('🔄 Processing with OpenAI...');
    const response = await chatWithWeatherAI(message);
    console.log('✅ Got response from OpenAI');
    
    res.json({ response });
  } catch (error) {
    console.error('❌ Server Error:', error);
    res.status(500).json({ error: error.message || 'Failed to process weather request' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🌤️  Weather Forecast AI Server`);
  console.log(`================================`);
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log(`📱 Open your browser and navigate to the URL above`);
  console.log(`\nType Ctrl+C to stop the server\n`);
});
