const popularCities = [
  { name: "New York", emoji: "🗽" },
  { name: "London", emoji: "🎡" },
  { name: "Tokyo", emoji: "🗼" },
  { name: "Paris", emoji: "🗼" },
  { name: "Mumbai", emoji: "🇮🇳" },
  { name: "Dubai", emoji: "🏙️" },
];

const WelcomeScreen = ({ onSearch }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="relative mb-8">
        <div className="text-8xl animate-float">🌤️</div>
        <div className="absolute -top-2 -right-6 premium-badge text-[9px]">PRO</div>
      </div>

      <h2 className="text-white text-4xl font-bold mb-2 text-shadow tracking-tight">
        AeroCast Pro
      </h2>
      <p className="text-amber-400/60 text-sm font-medium mb-4 tracking-wide">
        Premium Weather Intelligence
      </p>
      <p className="text-white/50 text-base max-w-lg mb-10 leading-relaxed">
        Real-time conditions, 24-hour forecasts, air quality monitoring,
        smart insights, and saved cities — all in one premium experience.
      </p>

      <div className="w-full max-w-lg">
        <p className="text-white/30 text-xs uppercase tracking-widest mb-4">
          Popular Cities
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {popularCities.map((city) => (
            <button
              key={city.name}
              onClick={() => onSearch(city.name)}
              className="glass-card rounded-xl px-4 py-2.5 flex items-center gap-2
                         hover:bg-amber-500/10 hover:border-amber-400/20 hover:-translate-y-0.5
                         transition-all duration-200 text-white/70 hover:text-white text-sm font-medium"
            >
              <span>{city.emoji}</span>
              <span>{city.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12 w-full max-w-3xl">
        {[
          { icon: "⏰", label: "24-Hour Forecast" },
          { icon: "🌿", label: "Air Quality" },
          { icon: "✨", label: "Smart Insights" },
          { icon: "⭐", label: "Saved Cities" },
        ].map((f) => (
          <div
            key={f.label}
            className="glass-card rounded-2xl p-4 flex flex-col items-center gap-2 premium-border"
          >
            <span className="text-2xl">{f.icon}</span>
            <span className="text-white/50 text-xs font-medium">{f.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WelcomeScreen;
