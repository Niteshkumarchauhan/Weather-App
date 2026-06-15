import axios from "axios";
import {
  createDemoAirQuality,
  createDemoForecast,
  createDemoSuggestions,
  createDemoWeather,
} from "./demoWeatherData";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const GEO_URL = "https://api.openweathermap.org/geo/1.0";
const DEMO_MODE =
  !API_KEY || API_KEY.trim() === "" || API_KEY === "your_api_key_here";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: "metric",
  },
});

/**
 * Fetch current weather by city name
 */
export const fetchCurrentWeather = async (city) => {
  if (DEMO_MODE) return createDemoWeather(city);

  try {
    const response = await api.get("/weather", {
      params: { q: city },
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 401 || error.response?.status === 429) {
      return createDemoWeather(city);
    }
    throw error;
  }
};

/**
 * Fetch current weather by coordinates
 */
export const fetchCurrentWeatherByCoords = async (lat, lon) => {
  if (DEMO_MODE) return createDemoWeather("Your location");

  try {
    const response = await api.get("/weather", {
      params: { lat, lon },
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 401 || error.response?.status === 429) {
      return createDemoWeather("Your location");
    }
    throw error;
  }
};

/**
 * Fetch 5-day / 3-hour forecast by city name
 */
export const fetchForecast = async (city) => {
  if (DEMO_MODE) return createDemoForecast(city);

  try {
    const response = await api.get("/forecast", {
      params: { q: city },
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 401 || error.response?.status === 429) {
      return createDemoForecast(city);
    }
    throw error;
  }
};

/**
 * Fetch 5-day / 3-hour forecast by coordinates
 */
export const fetchForecastByCoords = async (lat, lon) => {
  if (DEMO_MODE) return createDemoForecast("Your location");

  try {
    const response = await api.get("/forecast", {
      params: { lat, lon },
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 401 || error.response?.status === 429) {
      return createDemoForecast("Your location");
    }
    throw error;
  }
};

/**
 * Geocoding: search city suggestions
 */
export const fetchCitySuggestions = async (query) => {
  if (DEMO_MODE) return createDemoSuggestions(query);

  try {
    const response = await axios.get(`${GEO_URL}/direct`, {
      params: {
        q: query,
        limit: 5,
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 401 || error.response?.status === 429) {
      return createDemoSuggestions(query);
    }
    throw error;
  }
};

/**
 * Fetch air quality by coordinates
 */
export const fetchAirQuality = async (lat, lon) => {
  if (DEMO_MODE) return createDemoAirQuality();

  try {
    const response = await axios.get(`${BASE_URL}/air_pollution`, {
      params: { lat, lon, appid: API_KEY },
    });
    return response.data.list[0];
  } catch (error) {
    if (error.response?.status === 401 || error.response?.status === 429) {
      return createDemoAirQuality();
    }
    throw error;
  }
};

/**
 * Process raw forecast into next 24 hours (3-hour intervals)
 */
export const processHourlyForecast = (forecastList) => {
  return forecastList.slice(0, 8).map((item) => {
    const date = new Date(item.dt * 1000);
    return {
      time: date.toLocaleTimeString("en-US", {
        hour: "numeric",
        hour12: true,
      }),
      dt: item.dt,
      temp: Math.round(item.main.temp),
      icon: item.weather[0].icon,
      description: item.weather[0].description,
      pop: Math.round((item.pop || 0) * 100),
      humidity: item.main.humidity,
    };
  });
};

/**
 * Process raw forecast list into daily summaries (one entry per day)
 */
export const processDailyForecast = (forecastList) => {
  const dailyMap = {};

  forecastList.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    if (!dailyMap[dayKey]) {
      dailyMap[dayKey] = {
        date: dayKey,
        dt: item.dt,
        temps: [],
        icons: [],
        descriptions: [],
        humidity: [],
        wind: [],
      };
    }

    dailyMap[dayKey].temps.push(item.main.temp);
    dailyMap[dayKey].icons.push(item.weather[0].icon);
    dailyMap[dayKey].descriptions.push(item.weather[0].description);
    dailyMap[dayKey].humidity.push(item.main.humidity);
    dailyMap[dayKey].wind.push(item.wind.speed);
  });

  return Object.values(dailyMap)
    .slice(0, 5)
    .map((day) => ({
      date: day.date,
      dt: day.dt,
      tempMax: Math.round(Math.max(...day.temps)),
      tempMin: Math.round(Math.min(...day.temps)),
      icon: day.icons[Math.floor(day.icons.length / 2)],
      description: day.descriptions[Math.floor(day.descriptions.length / 2)],
      humidity: Math.round(
        day.humidity.reduce((a, b) => a + b, 0) / day.humidity.length,
      ),
      wind:
        Math.round(
          (day.wind.reduce((a, b) => a + b, 0) / day.wind.length) * 10,
        ) / 10,
    }));
};
