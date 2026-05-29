const popularCities = [
  { name: "New York", emoji: "🗽" },
  { name: "London", emoji: "🎡" },
  { name: "Tokyo", emoji: "🗼" },
  { name: "Paris", emoji: "🗼" },
  { name: "Sydney", emoji: "🦘" },
  { name: "Dubai", emoji: "🏙️" },
];

const WelcomeScreen = ({ onSearch }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {/* Animated weather icon */}
      <div className="text-8xl mb-6 animate-float">🌤️</div>

      <h2 className="text-white text-3xl font-bold mb-3 text-shadow">
        Weather at a Glance
      </h2>
      <p className="text-white/50 text-base max-w-md mb-10 leading-relaxed">
        Search for any city to get real-time weather conditions, hourly updates,
        and a 5-day forecast — all in one beautiful view.
      </p>

      {/* Popular cities */}
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
                         hover:bg-white/15 hover:-translate-y-0.5 transition-all duration-200
                         text-white/70 hover:text-white text-sm font-medium"
            >
              <span>{city.emoji}</span>
              <span>{city.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12 w-full max-w-2xl">
        {[
          { icon: "🌡️", label: "Real-time Temp" },
          { icon: "📅", label: "5-Day Forecast" },
          { icon: "💨", label: "Wind & Humidity" },
          { icon: "📍", label: "GPS Location" },
        ].map((f) => (
          <div
            key={f.label}
            className="glass-card rounded-2xl p-4 flex flex-col items-center gap-2"
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
