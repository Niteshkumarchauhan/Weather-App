import { getAQILabel } from "../utils/weatherUtils";

const PollutantBar = ({ label, value, max }) => {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px]">
        <span className="text-white/40 uppercase tracking-wider">{label}</span>
        <span className="text-white/60">{value.toFixed(1)}</span>
      </div>
      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-amber-400"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

const AirQualityCard = ({ airQuality }) => {
  if (!airQuality) return null;

  const { main, components } = airQuality;
  const aqiInfo = getAQILabel(main.aqi);

  return (
    <div className="glass rounded-3xl p-6 premium-border">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="text-lg">🌿</span>
          <h3 className="text-white/70 text-sm font-semibold uppercase tracking-wider">
            Air Quality
          </h3>
        </div>
        <span className={`text-sm font-bold ${aqiInfo.color}`}>
          {aqiInfo.label}
        </span>
      </div>

      <div className="flex items-center gap-6 mb-6">
        <div className="relative w-20 h-20 flex-shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(main.aqi / 5) * 264} 264`}
              className={aqiInfo.color}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-white text-2xl font-bold">{main.aqi}</span>
            <span className="text-white/40 text-[9px] uppercase">AQI</span>
          </div>
        </div>

        <div className="flex-1 space-y-2">
          <PollutantBar label="PM2.5" value={components.pm2_5} max={50} />
          <PollutantBar label="PM10" value={components.pm10} max={80} />
          <PollutantBar label="O₃" value={components.o3} max={120} />
        </div>
      </div>

      <p className="text-white/40 text-xs leading-relaxed">
        {main.aqi <= 2
          ? "Air quality is satisfactory. Ideal for outdoor activities."
          : main.aqi <= 3
            ? "Acceptable air quality. Sensitive groups may experience minor issues."
            : "Consider limiting prolonged outdoor exertion."}
      </p>
    </div>
  );
};

export default AirQualityCard;
