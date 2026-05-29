import { useState, useEffect } from "react";
import useWeather from "./hooks/useWeather";
import { getWeatherGradient, isDaytime } from "./utils/weatherUtils";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import ForecastSection from "./components/ForecastCard";
import LoadingSkeleton from "./components/LoadingSkeleton";
import ErrorMessage from "./components/ErrorMessage";
import UnitToggle from "./components/UnitToggle";
import WelcomeScreen from "./components/WelcomeScreen";

// Animated background orbs
const BackgroundOrbs = ({ gradient }) => (
  <div
    className="fixed inset-0 overflow-hidden pointer-events-none"
    aria-hidden="true"
  >
    <div
      className={`absolute inset-0 bg-gradient-to-br ${gradient} transition-all duration-1000`}
    />
    {/* Orb 1 */}
    <div
      className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 blur-3xl
                    bg-gradient-to-br from-blue-400 to-cyan-400 animate-pulse-slow"
    />
    {/* Orb 2 */}
    <div
      className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-15 blur-3xl
                    bg-gradient-to-br from-indigo-500 to-purple-500 animate-pulse-slow"
      style={{ animationDelay: "1.5s" }}
    />
    {/* Orb 3 */}
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64
                    rounded-full opacity-10 blur-3xl bg-gradient-to-br from-sky-400 to-blue-600
                    animate-pulse-slow"
      style={{ animationDelay: "3s" }}
    />
    {/* Grid overlay */}
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    />
  </div>
);

const App = () => {
  const {
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
  } = useWeather();

  const [dismissedError, setDismissedError] = useState(false);

  // Reset dismissed state when a new error comes in
  useEffect(() => {
    if (error) setDismissedError(false);
  }, [error]);

  // Determine background gradient
  const weatherCode = weather?.weather?.[0]?.id;
  const isDay = weather
    ? isDaytime(weather.dt, weather.sys.sunrise, weather.sys.sunset)
    : true;
  const gradient = getWeatherGradient(weatherCode, isDay);

  const hasData = weather && !loading;
  const showError = error && !dismissedError;

  return (
    <div className="min-h-screen relative">
      <BackgroundOrbs gradient={gradient} />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-20 glass border-b border-white/5">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-2xl">⛅</span>
              <span className="text-white font-bold text-lg hidden sm:block tracking-tight">
                WeatherNow
              </span>
            </div>

            {/* Unit Toggle */}
            <UnitToggle unit={unit} onToggle={toggleUnit} />
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 space-y-6">
          {/* Search */}
          <SearchBar
            onSearch={searchByCity}
            onLocationSearch={searchByLocation}
            loading={loading}
          />

          {/* Error */}
          {showError && (
            <ErrorMessage
              message={error}
              onDismiss={() => setDismissedError(true)}
            />
          )}

          {/* Loading */}
          {loading && <LoadingSkeleton />}

          {/* Weather Data */}
          {hasData && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <CurrentWeather
                weather={weather}
                convertTemp={convertTemp}
                tempSymbol={tempSymbol}
                unit={unit}
              />
              <ForecastSection
                forecast={forecast}
                convertTemp={convertTemp}
                tempSymbol={tempSymbol}
              />
            </div>
          )}

          {/* Welcome screen */}
          {!loading && !weather && !error && (
            <WelcomeScreen onSearch={searchByCity} />
          )}

          {/* Welcome screen after dismissed error */}
          {!loading && !weather && error && dismissedError && (
            <WelcomeScreen onSearch={searchByCity} />
          )}
        </main>

        {/* Footer */}
        <footer className="text-center py-6 text-white/20 text-xs">
          <p>
            Powered by{" "}
            <a
              href="https://openweathermap.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white/60 transition-colors underline underline-offset-2"
            >
              OpenWeatherMap
            </a>{" "}
            · Built with React + Vite + Tailwind CSS
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
