import { useState, useCallback, useEffect } from "react";
import {
  fetchCurrentWeather,
  fetchCurrentWeatherByCoords,
  fetchForecast,
  fetchForecastByCoords,
  fetchAirQuality,
  processDailyForecast,
  processHourlyForecast,
} from "../services/weatherApi";

const SAVED_CITIES_KEY = "aerocast_saved_cities";

const loadSavedCities = () => {
  try {
    const stored = localStorage.getItem(SAVED_CITIES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [airQuality, setAirQuality] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("metric");
  const [savedCities, setSavedCities] = useState(loadSavedCities);

  useEffect(() => {
    localStorage.setItem(SAVED_CITIES_KEY, JSON.stringify(savedCities));
  }, [savedCities]);

  const convertTemp = useCallback(
    (celsius) => {
      if (unit === "imperial") return Math.round((celsius * 9) / 5 + 32);
      return Math.round(celsius);
    },
    [unit],
  );

  const tempSymbol = unit === "imperial" ? "°F" : "°C";

  const processWeatherData = useCallback(async (weatherData, forecastData) => {
    setWeather(weatherData);
    setForecast(processDailyForecast(forecastData.list));
    setHourlyForecast(processHourlyForecast(forecastData.list));

    const { lat, lon } = weatherData.coord;
    try {
      const aqiData = await fetchAirQuality(lat, lon);
      setAirQuality(aqiData);
    } catch {
      setAirQuality(null);
    }
  }, []);

  const handleError = useCallback((err) => {
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
    setHourlyForecast([]);
    setAirQuality(null);
  }, []);

  const searchByCity = useCallback(
    async (city) => {
      if (!city.trim()) return;
      setLoading(true);
      setError(null);
      try {
        const [weatherData, forecastData] = await Promise.all([
          fetchCurrentWeather(city),
          fetchForecast(city),
        ]);
        await processWeatherData(weatherData, forecastData);
      } catch (err) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    },
    [processWeatherData, handleError],
  );

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
          await processWeatherData(weatherData, forecastData);
        } catch (err) {
          handleError(err);
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Location access denied. Please search by city name.");
        setLoading(false);
      },
    );
  }, [processWeatherData, handleError]);

  const toggleUnit = useCallback(() => {
    setUnit((prev) => (prev === "metric" ? "imperial" : "metric"));
  }, []);

  const saveCity = useCallback((cityName) => {
    setSavedCities((prev) => {
      if (prev.some((c) => c.name === cityName) || prev.length >= 6) return prev;
      return [...prev, { name: cityName, savedAt: Date.now() }];
    });
  }, []);

  const removeCity = useCallback((cityName) => {
    setSavedCities((prev) => prev.filter((c) => c.name !== cityName));
  }, []);

  return {
    weather,
    forecast,
    hourlyForecast,
    airQuality,
    loading,
    error,
    unit,
    tempSymbol,
    convertTemp,
    searchByCity,
    searchByLocation,
    toggleUnit,
    savedCities,
    saveCity,
    removeCity,
  };
};

export default useWeather;
