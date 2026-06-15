const DEMO_CITIES = [
  "London",
  "New York",
  "Tokyo",
  "Sydney",
  "Paris",
  "Dubai",
  "Singapore",
  "Toronto",
];

const pickTone = (city) => {
  const hash = city
    .toLowerCase()
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);

  const tones = [
    {
      main: 18,
      feels_like: 19,
      icon: "01d",
      desc: "clear sky",
      humidity: 35,
      wind: 4,
    },
    {
      main: 22,
      feels_like: 23,
      icon: "02d",
      desc: "few clouds",
      humidity: 48,
      wind: 7,
    },
    {
      main: 16,
      feels_like: 16,
      icon: "04d",
      desc: "broken clouds",
      humidity: 56,
      wind: 9,
    },
    {
      main: 24,
      feels_like: 25,
      icon: "10d",
      desc: "light rain",
      humidity: 62,
      wind: 11,
    },
    {
      main: 28,
      feels_like: 31,
      icon: "11d",
      desc: "thunderstorm",
      humidity: 65,
      wind: 14,
    },
  ];

  return tones[hash % tones.length];
};

export const createDemoWeather = (city) => {
  const tone = pickTone(city);
  const now = Math.floor(Date.now() / 1000);

  return {
    coord: { lon: 0, lat: 0 },
    weather: [
      { id: 800, main: "Clear", description: tone.desc, icon: tone.icon },
    ],
    base: "stations",
    main: {
      temp: tone.main,
      feels_like: tone.feels_like,
      temp_min: tone.main - 2,
      temp_max: tone.main + 3,
      pressure: 1015,
      humidity: tone.humidity,
      sea_level: 1015,
      grnd_level: 1008,
    },
    visibility: 10000,
    wind: { speed: tone.wind, deg: 180, gust: tone.wind + 2 },
    clouds: { all: 20 },
    dt: now,
    sys: {
      type: 1,
      id: 1,
      country: "XX",
      sunrise: now - 3600,
      sunset: now + 3600,
    },
    timezone: 0,
    id: hashCode(city),
    name: city || "Demo City",
  };
};

export const createDemoForecast = (city) => {
  const tone = pickTone(city);
  const baseTemp = tone.main;

  return {
    list: Array.from({ length: 15 }, (_, index) => ({
      dt: Math.floor(Date.now() / 1000) + index * 3 * 3600,
      main: {
        temp: baseTemp + ((index % 3) - 1),
        feels_like: baseTemp + ((index % 3) - 1) + 1,
        humidity: tone.humidity + ((index + 1) % 4) * 3,
      },
      weather: [{ icon: tone.icon, description: tone.desc }],
      wind: { speed: tone.wind + (index % 2) },
    })),
  };
};

export const createDemoSuggestions = (query) => {
  return DEMO_CITIES.filter((city) =>
    city.toLowerCase().includes(query.toLowerCase()),
  )
    .slice(0, 5)
    .map((city) => ({
      name: city,
      country: "Demo",
      lat: 0,
      lon: 0,
    }));
};

export const createDemoAirQuality = () => ({
  dt: Math.floor(Date.now() / 1000),
  main: { aqi: 2 },
  components: {
    co: 233.64,
    no: 0.01,
    no2: 12.5,
    o3: 68.2,
    so2: 1.2,
    pm2_5: 8.4,
    pm10: 14.1,
    nh3: 0.5,
  },
});

const hashCode = (value) => {
  return value.split("").reduce((hash, char) => {
    hash = (hash << 5) - hash + char.charCodeAt(0);
    return hash & hash;
  }, 0);
};
