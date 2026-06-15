import { useState, useEffect } from "react";
import useWeather from "./hooks/useWeather";
import { getWeatherGradient, isDaytime } from "./utils/weatherUtils";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import ForecastSection from "./components/ForecastCard";
import HourlyForecast from "./components/HourlyForecast";
import AirQualityCard from "./components/AirQualityCard";
import WeatherInsights from "./components/WeatherInsights";
import SavedCities from "./components/SavedCities";
import WeatherParticles from "./components/WeatherParticles";
import LoadingSkeleton from "./components/LoadingSkeleton";
import ErrorMessage from "./components/ErrorMessage";
import UnitToggle from "./components/UnitToggle";
import WelcomeScreen from "./components/WelcomeScreen";

const BackgroundOrbs = ({ gradient }) => (
  <div
    className="fixed inset-0 overflow-hidden pointer-events-none"
    aria-hidden="true"
  >
    <div
      className={`absolute inset-0 bg-gradient-to-br ${gradient} transition-all duration-1000`}
    />
    <div
      className="absolute -top-40 -right-40 w-[28rem] h-[28rem] rounded-full opacity-20 blur-3xl
                    bg-gradient-to-br from-amber-400/40 to-orange-500/30 animate-pulse-slow"
    />
    <div
      className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-15 blur-3xl
                    bg-gradient-to-br from-indigo-500 to-purple-500 animate-pulse-slow"
      style={{ animationDelay: "1.5s" }}
    />
    <div
      className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full opacity-10 blur-3xl
                    bg-gradient-to-br from-cyan-400 to-blue-600 animate-pulse-slow"
      style={{ animationDelay: "3s" }}
    />
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
  } = useWeather();

  const [dismissedError, setDismissedError] = useState(false);

  useEffect(() => {
    if (error) setDismissedError(false);
  }, [error]);

  const weatherCode = weather?.weather?.[0]?.id;
  const isDay = weather
    ? isDaytime(weather.dt, weather.sys.sunrise, weather.sys.sunset)
    : true;
  const gradient = getWeatherGradient(weatherCode, isDay);

  const hasData = weather && !loading;
  const showError = error && !dismissedError;
  const currentCity = weather?.name;

  return (
    <div className="min-h-screen relative">
      <BackgroundOrbs gradient={gradient} />
      <WeatherParticles weatherCode={weatherCode} isDay={isDay} />

      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="sticky top-0 z-20 glass border-b border-amber-400/10">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500
                              flex items-center justify-center shadow-lg shadow-amber-500/20">
                <span className="text-lg">⛅</span>
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold text-lg tracking-tight">
                    AeroCast
                  </span>
                  <span className="premium-badge">PRO</span>
                </div>
                <p className="text-white/30 text-[10px] tracking-widest uppercase">
                  Premium Weather
                </p>
              </div>
            </div>

            <UnitToggle unit={unit} onToggle={toggleUnit} />
          </div>
        </header>

        <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8 space-y-6">
          <SearchBar
            onSearch={searchByCity}
            onLocationSearch={searchByLocation}
            loading={loading}
          />

          <SavedCities
            cities={savedCities}
            currentCity={currentCity}
            onSelect={searchByCity}
            onRemove={removeCity}
            onSave={saveCity}
          />

          {showError && (
            <ErrorMessage
              message={error}
              onDismiss={() => setDismissedError(true)}
            />
          )}

          {loading && <LoadingSkeleton />}

          {hasData && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <CurrentWeather
                weather={weather}
                convertTemp={convertTemp}
                tempSymbol={tempSymbol}
                unit={unit}
              />

              <HourlyForecast
                hourly={hourlyForecast}
                convertTemp={convertTemp}
                tempSymbol={tempSymbol}
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <WeatherInsights weather={weather} />
                <AirQualityCard airQuality={airQuality} />
              </div>

              <ForecastSection
                forecast={forecast}
                convertTemp={convertTemp}
                tempSymbol={tempSymbol}
              />
            </div>
          )}

          {!loading && !weather && !error && (
            <WelcomeScreen onSearch={searchByCity} />
          )}

          {!loading && !weather && error && dismissedError && (
            <WelcomeScreen onSearch={searchByCity} />
          )}
        </main>

        <footer className="text-center py-6 text-white/20 text-xs">
          <p>
            Powered by{" "}
            <a
              href="https://openweathermap.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400/40 hover:text-amber-400/60 transition-colors underline underline-offset-2"
            >
              OpenWeatherMap
            </a>{" "}
            · AeroCast Pro · React + Vite + Tailwind
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
