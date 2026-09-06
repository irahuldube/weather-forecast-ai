import OpenAI from 'openai';
import dotenv from 'dotenv';
import { getWeatherForecast } from './weatherApi.js';

// Load environment variables
dotenv.config();

// Validate API key
if (!process.env.OPENAI_API_KEY) {
  console.error('❌ Error: OPENAI_API_KEY is not set in .env file');
  process.exit(1);
}

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define tools for OpenAI to use
const tools = [
  {
    type: 'function',
    function: {
      name: 'get_weather_forecast',
      description:
        'Get the current weather forecast for a specific city. Returns temperature, humidity, wind speed, and weather conditions.',
      parameters: {
        type: 'object',
        properties: {
          city: {
            type: 'string',
            description: 'The name of the city to get weather for (e.g., "London", "New York", "Tokyo")',
          },
        },
        required: ['city'],
      },
    },
  },
];

/**
 * Process tool calls from OpenAI
 * @param {string} toolName - Name of the tool to call
 * @param {Object} toolInput - Input parameters for the tool
 * @returns {Promise<string>} Result of the tool call
 */
async function processToolCall(toolName, toolInput) {
  if (toolName === 'get_weather_forecast') {
    const forecast = await getWeatherForecast(toolInput.city);
    return forecast;
  }
  throw new Error(`Unknown tool: ${toolName}`);
}

/**
 * Chat with OpenAI about weather
 * @param {string} userMessage - User's question or request
 * @returns {Promise<string>} OpenAI's response
 */
export async function chatWithWeatherAI(userMessage) {
  const messages = [
    {
      role: 'system',
      content:
        'You are a helpful weather assistant. When users ask about the weather in any city, use the get_weather_forecast function to fetch real weather data and provide a friendly, informative response. Always be polite and provide weather information when requested.',
    },
    {
      role: 'user',
      content: userMessage,
    },
  ];

  let response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    max_tokens: 1024,
    tools: tools,
    messages: messages,
  });

  // Handle tool use in an agentic loop
  while (response.choices[0].finish_reason === 'tool_calls') {
    const toolCall = response.choices[0].message.tool_calls[0];

    const toolName = toolCall.function.name;
    const toolInput = JSON.parse(toolCall.function.arguments);

    console.log(`\n🔧 Using tool: ${toolName}`);
    console.log(`📥 Input: ${JSON.stringify(toolInput)}`);

    let toolResult;
    try {
      toolResult = await processToolCall(toolName, toolInput);
      console.log(`✅ Tool executed successfully`);
    } catch (error) {
      toolResult = `Error: ${error.message}`;
      console.log(`❌ Tool error: ${error.message}`);
    }

    // Add assistant response and tool result to messages
    messages.push({
      role: 'assistant',
      content: response.choices[0].message.content,
      tool_calls: response.choices[0].message.tool_calls,
    });

    messages.push({
      role: 'tool',
      tool_call_id: toolCall.id,
      content: toolResult,
    });

    // Get next response from OpenAI
    response = await client.chat.completions.create({
      model: 'gpt-5.5',
      max_tokens: 1024,
      tools: tools,
      messages: messages,
    });
  }

  // Extract final text response
  const finalResponse = response.choices[0].message.content || 'No response generated';

  return finalResponse;
}
