# 🌤️ Weather Forecast AI Assistant

A conversational weather application that uses OpenAI's function calling to fetch real-time weather data for any city worldwide.

## Features

- 💬 Chat with an AI assistant about weather
- 🌍 Get weather for any city in the world
- 📊 Real-time weather data (temperature, humidity, wind speed, etc.)
- 🤖 Intelligent responses using OpenAI
- ⚡ Function calling integration with OpenWeather API

## Prerequisites

- Node.js 18+ installed
- OpenAI API key
- OpenWeather API key

## Installation

1. Clone the repository:
```bash
cd weather-forecast-ai
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file from the example:
```bash
cp .env.example .env
```

4. Add your API keys to `.env`:
```
OPENAI_API_KEY=your_openai_api_key_here
OPENWEATHER_API_KEY=your_openweather_api_key_here
```

## Getting API Keys

### OpenAI API Key
1. Go to https://platform.openai.com
2. Sign up or log in
3. Navigate to API keys section
4. Create a new API key
5. Copy and paste it into `.env`

### OpenWeather API Key
1. Go to https://openweathermap.org/api
2. Sign up for a free account
3. Navigate to API keys section
4. Copy your API key
5. Paste it into `.env`

## Usage

Start the web application:
```bash
npm start
```

Then open your browser and navigate to: **http://localhost:3000**

Or run the CLI version:
```bash
npm run cli
```

### Features

- 🎨 **Beautiful Web UI** - Chat interface with real-time responses
- ⌨️ **Interactive Input** - Ask weather questions in an input box
- 💬 **Conversation History** - See all your queries and responses
- 🎯 **Quick Suggestions** - Click suggestion buttons for quick queries
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🌐 **CLI Alternative** - Use the command-line interface if preferred

## Project Structure

```
weather-forecast-ai/
├── src/
│   ├── server.js          # Express server with web API
│   ├── cli.js             # CLI interface (alternative)
│   ├── index.js           # CLI entry point
│   ├── openaiClient.js    # OpenAI integration and function calling
│   ├── weatherApi.js      # OpenWeather API integration
├── public/
│   ├── index.html         # Web UI
│   ├── styles.css         # Styling
│   ├── script.js          # Frontend JavaScript
├── package.json           # Project dependencies
├── .env.example           # Environment variables template
└── README.md              # This file
```

## How It Works

1. **User Input**: User asks about weather in a specific city
2. **OpenAI Processing**: Message is sent to OpenAI with function definitions
3. **Function Calling**: OpenAI decides to call the `get_weather_forecast` function
4. **Weather API**: Function fetches real data from OpenWeather API
5. **Response**: OpenAI generates a friendly, informative response with the weather data

## Technologies Used

- **Node.js**: JavaScript runtime
- **Express.js**: Web server framework
- **OpenAI SDK**: For AI integration and function calling
- **Axios**: HTTP client for API requests
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management
- **Vanilla JavaScript**: Interactive frontend
- **CSS3**: Modern styling and animations

## Error Handling

The application includes error handling for:
- Missing API keys
- Invalid city names
- Network errors
- API rate limits

## License

ISC

## Support

For issues or questions, please refer to:
- [OpenAI Documentation](https://platform.openai.com/docs)
- [OpenWeather API Docs](https://openweathermap.org/api)
