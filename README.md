# ⛅ WeatherNow

A beautiful, modern weather application built with **React + Vite + Tailwind CSS v4**, featuring real-time weather data from the OpenWeatherMap API.

![WeatherNow Preview](https://via.placeholder.com/800x450/0f172a/38bdf8?text=WeatherNow+Weather+App)

## ✨ Features

- 🔍 **City Search** with autocomplete suggestions (geocoding API)
- 📍 **GPS Location** — detect your current location automatically
- 🌡️ **Current Weather** — temperature, feels-like, min/max
- 💧 **Humidity, Wind Speed & Direction, Visibility, Cloud Cover**
- 🌅 **Sunrise & Sunset** times (local timezone)
- 📅 **5-Day Forecast** with temperature range bars
- 🌡️ **°C / °F Toggle** — switch units instantly
- 🎨 **Dynamic Backgrounds** — gradient changes with weather conditions
- 💎 **Glassmorphism UI** — frosted glass cards with blur effects
- ⚡ **Skeleton Loading** — smooth shimmer animations while fetching
- ❌ **Error Handling** — friendly messages for all failure cases
- 📱 **Fully Responsive** — works great on mobile, tablet, and desktop

## 🚀 Getting Started

### 1. Get a Free API Key

Sign up at [OpenWeatherMap](https://openweathermap.org/api) and get a free API key.
The free tier includes:

- Current weather data
- 5-day / 3-hour forecast
- Geocoding API

### 2. Configure Environment

Copy `.env.example` to `.env` and add your API key:

```bash
cp .env.example .env
```

Edit `.env`:

```
VITE_OPENWEATHER_API_KEY=your_actual_api_key_here
```

> ⚠️ New API keys can take up to 2 hours to activate after registration.

### 3. Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🏗️ Project Structure

```
src/
├── components/
│   ├── SearchBar.jsx        # Search input with autocomplete
│   ├── CurrentWeather.jsx   # Main weather display + stats grid
│   ├── ForecastCard.jsx     # 5-day forecast section
│   ├── LoadingSkeleton.jsx  # Shimmer loading state
│   ├── ErrorMessage.jsx     # Error display component
│   ├── UnitToggle.jsx       # °C / °F switcher
│   ├── WeatherIcon.jsx      # OpenWeatherMap icon wrapper
│   └── WelcomeScreen.jsx    # Initial empty state
├── hooks/
│   └── useWeather.js        # Main data-fetching hook
├── services/
│   └── weatherApi.js        # Axios API calls + data processing
├── utils/
│   └── weatherUtils.js      # Helpers: gradients, formatting, labels
├── App.jsx                  # Root component + layout
├── main.jsx                 # React entry point
└── index.css                # Tailwind + custom utilities
```

## 🛠️ Tech Stack

| Technology         | Purpose                 |
| ------------------ | ----------------------- |
| React 19           | UI framework            |
| Vite 8             | Build tool & dev server |
| Tailwind CSS v4    | Utility-first styling   |
| Axios              | HTTP client             |
| OpenWeatherMap API | Weather data            |

## 📦 Build for Production

```bash
npm run build
npm run preview
```

## 🎨 Design Highlights

- **Glassmorphism** — `backdrop-filter: blur()` with semi-transparent backgrounds
- **Dynamic gradients** — background changes based on weather condition and time of day
- **Floating animation** — weather icon gently bobs up and down
- **Shimmer skeleton** — animated loading placeholders
- **Smooth transitions** — all state changes animate in/out

## 📄 License

MIT — free to use for personal and commercial projects.
