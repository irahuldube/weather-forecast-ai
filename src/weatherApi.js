import axios from 'axios';

const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

/**
 * Fetch weather data for a specific city
 * @param {string} city - City name
 * @returns {Promise<Object>} Weather data
 */
export async function getWeatherByCityName(city) {
  try {
    const response = await axios.get(OPENWEATHER_BASE_URL, {
      params: {
        q: city,
        appid: OPENWEATHER_API_KEY,
        units: 'metric', // Use Celsius
      },
    });

    const data = response.data;
    return {
      city: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      feels_like: data.main.feels_like,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      description: data.weather[0].description,
      wind_speed: data.wind.speed,
      clouds: data.clouds.all,
      sunrise: new Date(data.sys.sunrise * 1000).toISOString(),
      sunset: new Date(data.sys.sunset * 1000).toISOString(),
    };
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error(`City "${city}" not found`);
    }
    throw new Error(`Failed to fetch weather data: ${error.message}`);
  }
}

/**
 * Get weather forecast for a city with extended details
 * @param {string} city - City name
 * @returns {Promise<string>} Formatted weather report
 */
export async function getWeatherForecast(city) {
  const weather = await getWeatherByCityName(city);
  
  const forecast = `
📍 Weather Forecast for ${weather.city}, ${weather.country}

🌡️ Temperature: ${weather.temperature}°C (feels like ${weather.feels_like}°C)
💧 Humidity: ${weather.humidity}%
🌪️ Wind Speed: ${weather.wind_speed} m/s
☁️ Cloud Coverage: ${weather.clouds}%
🔽 Pressure: ${weather.pressure} hPa

📝 Conditions: ${weather.description.charAt(0).toUpperCase() + weather.description.slice(1)}

🌅 Sunrise: ${weather.sunrise}
🌇 Sunset: ${weather.sunset}
  `;

  return forecast;
}
