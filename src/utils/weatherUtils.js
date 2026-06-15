/**
 * Returns a gradient class based on weather condition and time of day
 */
export const getWeatherGradient = (weatherCode, isDay = true) => {
  if (!weatherCode) return "from-slate-900 via-blue-950 to-slate-900";

  const code = Math.floor(weatherCode / 100);

  if (!isDay) {
    return "from-slate-950 via-indigo-950 to-slate-900";
  }

  switch (code) {
    case 2: // Thunderstorm
      return "from-slate-900 via-purple-950 to-slate-800";
    case 3: // Drizzle
      return "from-slate-800 via-blue-900 to-slate-700";
    case 5: // Rain
      return "from-slate-900 via-blue-900 to-indigo-900";
    case 6: // Snow
      return "from-slate-700 via-blue-800 to-slate-600";
    case 7: // Atmosphere (fog, mist)
      return "from-slate-700 via-gray-800 to-slate-600";
    case 8: // Clear / Clouds
      if (weatherCode === 800) return "from-sky-900 via-blue-800 to-indigo-900"; // Clear
      if (weatherCode <= 802) return "from-blue-900 via-sky-800 to-slate-800"; // Few/scattered clouds
      return "from-slate-800 via-blue-900 to-slate-700"; // Broken/overcast
    default:
      return "from-slate-900 via-blue-950 to-slate-900";
  }
};

/**
 * Returns accent color class based on weather condition
 */
export const getWeatherAccent = (weatherCode) => {
  if (!weatherCode) return "from-blue-400 to-cyan-400";
  const code = Math.floor(weatherCode / 100);
  switch (code) {
    case 2:
      return "from-purple-400 to-pink-400";
    case 3:
      return "from-blue-300 to-cyan-300";
    case 5:
      return "from-blue-400 to-indigo-400";
    case 6:
      return "from-blue-200 to-white";
    case 7:
      return "from-gray-300 to-slate-300";
    case 8:
      if (weatherCode === 800) return "from-yellow-300 to-orange-300";
      return "from-blue-300 to-sky-300";
    default:
      return "from-blue-400 to-cyan-400";
  }
};

/**
 * Returns a weather emoji icon based on OpenWeather icon code
 */
export const getWeatherEmoji = (iconCode) => {
  const map = {
    "01d": "☀️",
    "01n": "🌙",
    "02d": "⛅",
    "02n": "☁️",
    "03d": "☁️",
    "03n": "☁️",
    "04d": "☁️",
    "04n": "☁️",
    "09d": "🌧️",
    "09n": "🌧️",
    "10d": "🌦️",
    "10n": "🌧️",
    "11d": "⛈️",
    "11n": "⛈️",
    "13d": "❄️",
    "13n": "❄️",
    "50d": "🌫️",
    "50n": "🌫️",
  };
  return map[iconCode] || "🌡️";
};

/**
 * Returns wind direction label from degrees
 */
export const getWindDirection = (degrees) => {
  const dirs = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return dirs[Math.round(degrees / 22.5) % 16];
};

/**
 * Returns UV index label
 */
export const getUVLabel = (uvi) => {
  if (uvi <= 2) return { label: "Low", color: "text-green-400" };
  if (uvi <= 5) return { label: "Moderate", color: "text-yellow-400" };
  if (uvi <= 7) return { label: "High", color: "text-orange-400" };
  if (uvi <= 10) return { label: "Very High", color: "text-red-400" };
  return { label: "Extreme", color: "text-purple-400" };
};

/**
 * Returns humidity comfort label
 */
export const getHumidityLabel = (humidity) => {
  if (humidity < 30) return "Dry";
  if (humidity < 60) return "Comfortable";
  if (humidity < 80) return "Humid";
  return "Very Humid";
};

/**
 * Format Unix timestamp to readable time
 */
export const formatTime = (unixTimestamp, timezone = 0) => {
  const date = new Date((unixTimestamp + timezone) * 1000);
  return date.toUTCString().slice(17, 22);
};

/**
 * Check if it's daytime based on sunrise/sunset
 */
export const isDaytime = (dt, sunrise, sunset) => {
  return dt >= sunrise && dt <= sunset;
};

/**
 * Capitalize first letter of each word
 */
export const capitalize = (str) => str.replace(/\b\w/g, (c) => c.toUpperCase());

/**
 * Calculate dew point from temp (°C) and humidity (%)
 */
export const getDewPoint = (temp, humidity) => {
  const a = 17.27;
  const b = 237.7;
  const alpha = (a * temp) / (b + temp) + Math.log(humidity / 100);
  return Math.round((b * alpha) / (a - alpha));
};

/**
 * Comfort index 0–100 from temp, humidity, and wind (m/s)
 */
export const getComfortIndex = (temp, humidity, windSpeed) => {
  let score = 100;
  if (temp < 5 || temp > 35) score -= 30;
  else if (temp < 10 || temp > 30) score -= 15;
  if (humidity > 80) score -= 20;
  else if (humidity > 65) score -= 10;
  if (windSpeed > 15) score -= 15;
  else if (windSpeed > 10) score -= 8;
  return Math.max(0, Math.min(100, score));
};

/**
 * Clothing advice based on temperature and condition
 */
export const getClothingAdvice = (temp, weatherCode) => {
  const code = weatherCode ? Math.floor(weatherCode / 100) : 8;
  if (code === 6) return "Heavy coat, gloves & warm layers";
  if (code === 2 || code === 5) return "Waterproof jacket & umbrella";
  if (temp >= 30) return "Light breathable fabrics & sun protection";
  if (temp >= 22) return "T-shirt or light layers";
  if (temp >= 15) return "Light jacket or sweater";
  if (temp >= 8) return "Warm jacket recommended";
  return "Heavy winter clothing";
};

/**
 * AQI label and color from OpenWeather 1–5 scale
 */
export const getAQILabel = (aqi) => {
  const levels = {
    1: { label: "Good", color: "text-emerald-400", bg: "bg-emerald-500" },
    2: { label: "Fair", color: "text-lime-400", bg: "bg-lime-500" },
    3: { label: "Moderate", color: "text-yellow-400", bg: "bg-yellow-500" },
    4: { label: "Poor", color: "text-orange-400", bg: "bg-orange-500" },
    5: { label: "Very Poor", color: "text-red-400", bg: "bg-red-500" },
  };
  return levels[aqi] || levels[3];
};

/**
 * Estimate UV index from time of day and cloud cover
 */
export const estimateUVIndex = (isDay, cloudCover = 0) => {
  if (!isDay) return 0;
  const base = 8;
  const reduction = Math.round((cloudCover / 100) * base * 0.7);
  return Math.max(1, base - reduction);
};

/**
 * Comfort label from index score
 */
export const getComfortLabel = (index) => {
  if (index >= 80) return { label: "Excellent", color: "text-emerald-400" };
  if (index >= 60) return { label: "Good", color: "text-lime-400" };
  if (index >= 40) return { label: "Fair", color: "text-yellow-400" };
  if (index >= 20) return { label: "Uncomfortable", color: "text-orange-400" };
  return { label: "Poor", color: "text-red-400" };
};
