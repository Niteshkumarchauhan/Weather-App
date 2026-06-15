import {
  getClothingAdvice,
  getComfortIndex,
  getComfortLabel,
  getDewPoint,
  estimateUVIndex,
  getUVLabel,
  isDaytime,
} from "../utils/weatherUtils";

const InsightCard = ({ icon, title, value, sub, accent }) => (
  <div className="glass-card rounded-2xl p-4 flex items-start gap-3 hover:bg-white/10 transition-colors">
    <span className="text-2xl flex-shrink-0">{icon}</span>
    <div>
      <p className="text-white/40 text-[10px] uppercase tracking-wider font-medium">
        {title}
      </p>
      <p className={`text-white font-bold text-lg ${accent || ""}`}>{value}</p>
      {sub && <p className="text-white/40 text-xs mt-0.5">{sub}</p>}
    </div>
  </div>
);

const WeatherInsights = ({ weather }) => {
  if (!weather) return null;

  const { main, weather: conditions, wind, clouds, dt, sys } = weather;
  const weatherCode = conditions[0]?.id;
  const isDay = isDaytime(dt, sys.sunrise, sys.sunset);

  const comfortIndex = getComfortIndex(main.temp, main.humidity, wind.speed);
  const comfort = getComfortLabel(comfortIndex);
  const dewPoint = getDewPoint(main.temp, main.humidity);
  const uvIndex = estimateUVIndex(isDay, clouds?.all ?? 0);
  const uv = getUVLabel(uvIndex);
  const clothing = getClothingAdvice(main.temp, weatherCode);

  return (
    <div className="glass rounded-3xl p-6">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-lg">✨</span>
        <h3 className="text-white/70 text-sm font-semibold uppercase tracking-wider">
          Smart Insights
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <InsightCard
          icon="😊"
          title="Comfort Index"
          value={`${comfortIndex}/100`}
          sub={comfort.label}
          accent={comfort.color}
        />
        <InsightCard
          icon="👕"
          title="What to Wear"
          value={clothing}
        />
        <InsightCard
          icon="💧"
          title="Dew Point"
          value={`${dewPoint}°C`}
          sub={
            dewPoint > 18
              ? "Muggy conditions"
              : dewPoint > 13
                ? "Noticeable humidity"
                : "Dry & comfortable"
          }
        />
        <InsightCard
          icon="☀️"
          title="UV Index"
          value={isDay ? uvIndex : "0"}
          sub={isDay ? uv.label : "Nighttime"}
          accent={isDay ? uv.color : "text-white/40"}
        />
      </div>
    </div>
  );
};

export default WeatherInsights;
