import { useState, useCallback } from "react";
import {
  fetchCurrentWeather,
  fetchCurrentWeatherByCoords,
  fetchForecast,
  fetchForecastByCoords,
  processDailyForecast,
} from "../services/weatherApi";

const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("metric"); // 'metric' | 'imperial'

  const convertTemp = useCallback(
    (celsius) => {
      if (unit === "imperial") return Math.round((celsius * 9) / 5 + 32);
      return Math.round(celsius);
    },
    [unit],
  );

  const tempSymbol = unit === "imperial" ? "°F" : "°C";

  const searchByCity = useCallback(async (city) => {
    if (!city.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const [weatherData, forecastData] = await Promise.all([
        fetchCurrentWeather(city),
        fetchForecast(city),
      ]);
      setWeather(weatherData);
      setForecast(processDailyForecast(forecastData.list));
    } catch (err) {
      if (err.response?.status === 404) {
        setError("City not found. Please check the spelling and try again.");
      } else if (err.response?.status === 401) {
        setError("Invalid API key. Please check your configuration.");
      } else if (err.code === "ERR_NETWORK") {
        setError("Network error. Please check your internet connection.");
      } else {
        setError("Something went wrong. Please try again.");
      }
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchByLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const { latitude: lat, longitude: lon } = coords;
          const [weatherData, forecastData] = await Promise.all([
            fetchCurrentWeatherByCoords(lat, lon),
            fetchForecastByCoords(lat, lon),
          ]);
          setWeather(weatherData);
          setForecast(processDailyForecast(forecastData.list));
        } catch (err) {
          setError("Failed to fetch weather for your location.");
          setWeather(null);
          setForecast([]);
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Location access denied. Please search by city name.");
        setLoading(false);
      },
    );
  }, []);

  const toggleUnit = useCallback(() => {
    setUnit((prev) => (prev === "metric" ? "imperial" : "metric"));
  }, []);

  return {
    weather,
    forecast,
    loading,
    error,
    unit,
    tempSymbol,
    convertTemp,
    searchByCity,
    searchByLocation,
    toggleUnit,
  };
};

export default useWeather;
