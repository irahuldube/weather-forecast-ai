import readline from 'readline';
import dotenv from 'dotenv';
import { chatWithWeatherAI } from './openaiClient.js';

// Load environment variables
dotenv.config();

// Validate required environment variables
if (!process.env.OPENAI_API_KEY) {
  console.error('❌ Error: OPENAI_API_KEY is not set in .env file');
  process.exit(1);
}

if (!process.env.OPENWEATHER_API_KEY) {
  console.error('❌ Error: OPENWEATHER_API_KEY is not set in .env file');
  process.exit(1);
}

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  console.log('🌤️  Weather Forecast AI Assistant');
  console.log('================================');
  console.log('Ask me about the weather in any city!');
  console.log('Type "exit" to quit.\n');

  const askQuestion = () => {
    rl.question('You: ', async (userInput) => {
      const input = userInput.trim();

      if (input.toLowerCase() === 'exit') {
        console.log('\n👋 Goodbye!');
        rl.close();
        return;
      }

      if (!input) {
        askQuestion();
        return;
      }

      try {
        console.log('\n⏳ Processing your request...\n');
        const response = await chatWithWeatherAI(input);
        console.log(`\nAssistant: ${response}\n`);
      } catch (error) {
        console.error(`\n❌ Error: ${error.message}\n`);
      }

      askQuestion();
    });
  };

  askQuestion();
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
