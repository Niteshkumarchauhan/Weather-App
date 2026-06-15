import WeatherIcon from "./WeatherIcon";

const HourlyForecast = ({ hourly, convertTemp, tempSymbol }) => {
  if (!hourly || hourly.length === 0) return null;

  const temps = hourly.map((h) => convertTemp(h.temp));
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);
  const range = maxTemp - minTemp || 1;

  return (
    <div className="glass rounded-3xl p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-amber-400/70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-white/70 text-sm font-semibold uppercase tracking-wider">
            24-Hour Forecast
          </h3>
        </div>
        <span className="premium-badge text-[10px]">PRO</span>
      </div>

      <div className="flex gap-3 overflow-x-auto forecast-scroll pb-2">
        {hourly.map((hour, i) => {
          const temp = convertTemp(hour.temp);
          const barHeight =
            20 + ((temp - minTemp) / range) * 60;

          return (
            <div
              key={hour.dt}
              className="glass-card rounded-2xl p-3 flex flex-col items-center gap-2 min-w-[88px]
                         hover:bg-white/10 transition-all duration-300"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="text-white/50 text-xs font-medium">
                {i === 0 ? "Now" : hour.time}
              </span>
              <WeatherIcon iconCode={hour.icon} size="sm" />
              <span className="text-white font-bold text-base">
                {temp}
                {tempSymbol}
              </span>
              {hour.pop > 0 && (
                <span className="text-blue-300/70 text-[10px]">{hour.pop}%</span>
              )}
              <div
                className="w-1.5 rounded-full bg-gradient-to-t from-amber-500/40 to-amber-300/80 mt-1"
                style={{ height: `${barHeight}px` }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;
