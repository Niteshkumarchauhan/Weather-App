import WeatherIcon from "./WeatherIcon";
import { capitalize } from "../utils/weatherUtils";

const ForecastCard = ({ day, convertTemp, tempSymbol, index }) => {
  const animationDelay = `${index * 80}ms`;

  return (
    <div
      className="glass-card rounded-2xl p-4 flex flex-col items-center gap-3 min-w-[130px]
                 hover:bg-white/12 hover:-translate-y-1 transition-all duration-300 cursor-default"
      style={{ animationDelay }}
    >
      {/* Day */}
      <div className="text-white/60 text-xs font-semibold uppercase tracking-wider">
        {day.date.split(",")[0]}
      </div>
      <div className="text-white/40 text-xs">
        {day.date.split(",").slice(1).join(",").trim()}
      </div>

      {/* Icon */}
      <WeatherIcon iconCode={day.icon} size="md" />

      {/* Description */}
      <div className="text-white/60 text-xs text-center leading-tight">
        {capitalize(day.description)}
      </div>

      {/* Temps */}
      <div className="flex items-center gap-2 mt-auto">
        <span className="text-white font-bold text-lg">
          {convertTemp(day.tempMax)}
          {tempSymbol}
        </span>
        <span className="text-white/40 text-sm">
          {convertTemp(day.tempMin)}
          {tempSymbol}
        </span>
      </div>

      {/* Humidity */}
      <div className="flex items-center gap-1 text-blue-300/70 text-xs">
        <span>💧</span>
        <span>{day.humidity}%</span>
      </div>
    </div>
  );
};

const ForecastSection = ({ forecast, convertTemp, tempSymbol }) => {
  if (!forecast || forecast.length === 0) return null;

  return (
    <div className="glass rounded-3xl p-6">
      <div className="flex items-center gap-2 mb-5">
        <svg
          className="w-5 h-5 text-white/50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <h3 className="text-white/70 text-sm font-semibold uppercase tracking-wider">
          5-Day Forecast
        </h3>
      </div>

      {/* Scrollable forecast row */}
      <div className="flex gap-3 overflow-x-auto forecast-scroll pb-2">
        {forecast.map((day, i) => (
          <ForecastCard
            key={day.dt}
            day={day}
            convertTemp={convertTemp}
            tempSymbol={tempSymbol}
            index={i}
          />
        ))}
      </div>

      {/* Temperature range bar */}
      <div className="mt-5 space-y-2">
        {forecast.map((day) => {
          const allTemps = forecast.flatMap((d) => [d.tempMin, d.tempMax]);
          const globalMin = Math.min(...allTemps);
          const globalMax = Math.max(...allTemps);
          const range = globalMax - globalMin || 1;
          const leftPct =
            ((convertTemp(day.tempMin) - convertTemp(globalMin)) /
              (convertTemp(globalMax) - convertTemp(globalMin) || 1)) *
            100;
          const widthPct =
            ((convertTemp(day.tempMax) - convertTemp(day.tempMin)) /
              (convertTemp(globalMax) - convertTemp(globalMin) || 1)) *
            100;

          return (
            <div
              key={`bar-${day.dt}`}
              className="flex items-center gap-3 text-xs"
            >
              <span className="text-white/40 w-8">
                {day.date.split(",")[0]}
              </span>
              <span className="text-white/50 w-10 text-right">
                {convertTemp(day.tempMin)}
                {tempSymbol}
              </span>
              <div className="flex-1 h-1.5 bg-white/10 rounded-full relative overflow-hidden">
                <div
                  className="absolute h-full rounded-full bg-gradient-to-r from-blue-400 to-orange-400"
                  style={{
                    left: `${leftPct}%`,
                    width: `${Math.max(widthPct, 8)}%`,
                  }}
                />
              </div>
              <span className="text-white/70 w-10">
                {convertTemp(day.tempMax)}
                {tempSymbol}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastSection;
