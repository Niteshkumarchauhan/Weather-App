import WeatherIcon from "./WeatherIcon";
import {
  capitalize,
  formatTime,
  getWindDirection,
  getHumidityLabel,
} from "../utils/weatherUtils";

const StatCard = ({ icon, label, value, sub }) => (
  <div className="glass-card rounded-2xl p-4 flex flex-col gap-1 hover:bg-white/10 transition-colors duration-300">
    <div className="flex items-center gap-2 text-white/50 text-xs font-medium uppercase tracking-wider">
      <span>{icon}</span>
      <span>{label}</span>
    </div>
    <div className="text-white text-xl font-bold">{value}</div>
    {sub && <div className="text-white/40 text-xs">{sub}</div>}
  </div>
);

const CurrentWeather = ({ weather, convertTemp, tempSymbol, unit }) => {
  if (!weather) return null;

  const {
    name,
    sys,
    main,
    weather: conditions,
    wind,
    visibility,
    clouds,
    dt,
    timezone,
  } = weather;

  const condition = conditions[0];
  const isDay = condition.icon.endsWith("d");

  const localTime = new Date((dt + timezone) * 1000);
  const timeString = localTime.toUTCString().slice(17, 22);
  const dateString = localTime.toUTCString().slice(0, 16);

  const windSpeed =
    unit === "imperial"
      ? `${Math.round(wind.speed * 2.237)} mph`
      : `${Math.round(wind.speed * 3.6)} km/h`;

  const visibilityKm = visibility
    ? `${(visibility / 1000).toFixed(1)} km`
    : "N/A";

  return (
    <div className="w-full">
      {/* Main weather card */}
      <div className="glass rounded-3xl p-6 md:p-8 mb-4 premium-border">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Left: Location + Temp */}
          <div className="flex-1">
            {/* Location */}
            <div className="flex items-center gap-2 mb-1">
              <svg
                className="w-4 h-4 text-white/60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <h2 className="text-white/80 text-lg font-medium">
                {name}
                {sys?.country ? `, ${sys.country}` : ""}
              </h2>
            </div>

            {/* Date & Time */}
            <p className="text-white/40 text-sm mb-6">
              {dateString} · {timeString}
            </p>

            {/* Temperature */}
            <div className="flex items-start gap-4">
              <div>
                <span
                  className="text-white font-bold text-shadow"
                  style={{ fontSize: "clamp(4rem, 12vw, 7rem)", lineHeight: 1 }}
                >
                  {convertTemp(main.temp)}
                </span>
                <span className="text-white/70 text-4xl font-light">
                  {tempSymbol}
                </span>
              </div>
            </div>

            {/* Condition */}
            <p className="text-white/70 text-xl mt-2 font-medium">
              {capitalize(condition.description)}
            </p>

            {/* Feels like */}
            <p className="text-white/40 text-sm mt-1">
              Feels like {convertTemp(main.feels_like)}
              {tempSymbol} · H:{convertTemp(main.temp_max)}
              {tempSymbol} L:{convertTemp(main.temp_min)}
              {tempSymbol}
            </p>
          </div>

          {/* Right: Icon */}
          <div className="flex flex-col items-center gap-2">
            <WeatherIcon iconCode={condition.icon} size="xl" animate={true} />
            <div className="flex items-center gap-1.5 glass-card rounded-full px-4 py-1.5">
              <div
                className={`w-2 h-2 rounded-full ${isDay ? "bg-yellow-400" : "bg-blue-300"} animate-pulse`}
              />
              <span className="text-white/60 text-xs">
                {isDay ? "Daytime" : "Nighttime"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          icon="💧"
          label="Humidity"
          value={`${main.humidity}%`}
          sub={getHumidityLabel(main.humidity)}
        />
        <StatCard
          icon="💨"
          label="Wind"
          value={windSpeed}
          sub={`${getWindDirection(wind.deg)} · Gusts ${
            unit === "imperial"
              ? Math.round((wind.gust || wind.speed) * 2.237)
              : Math.round((wind.gust || wind.speed) * 3.6)
          } ${unit === "imperial" ? "mph" : "km/h"}`}
        />
        <StatCard
          icon="👁️"
          label="Visibility"
          value={visibilityKm}
          sub={
            visibility > 8000
              ? "Clear"
              : visibility > 4000
                ? "Moderate"
                : "Poor"
          }
        />
        <StatCard
          icon="☁️"
          label="Cloud Cover"
          value={`${clouds?.all ?? 0}%`}
          sub={
            clouds?.all > 80
              ? "Overcast"
              : clouds?.all > 40
                ? "Partly Cloudy"
                : "Mostly Clear"
          }
        />
        <StatCard
          icon="🌡️"
          label="Pressure"
          value={`${main.pressure} hPa`}
          sub={main.pressure > 1013 ? "High" : "Low"}
        />
        <StatCard
          icon="🌅"
          label="Sunrise"
          value={formatTime(sys.sunrise, timezone)}
          sub="Local time"
        />
        <StatCard
          icon="🌇"
          label="Sunset"
          value={formatTime(sys.sunset, timezone)}
          sub="Local time"
        />
        <StatCard
          icon="🌊"
          label="Sea Level"
          value={
            main.sea_level ? `${main.sea_level} hPa` : `${main.pressure} hPa`
          }
          sub="Pressure"
        />
      </div>
    </div>
  );
};

export default CurrentWeather;
