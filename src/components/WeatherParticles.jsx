const WeatherParticles = ({ weatherCode, isDay }) => {
  if (!weatherCode) return null;

  const code = Math.floor(weatherCode / 100);

  if (code === 5 || code === 3) {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]" aria-hidden="true">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="rain-drop absolute w-0.5 bg-blue-300/30 rounded-full"
            style={{
              left: `${(i * 2.5) % 100}%`,
              height: `${8 + (i % 5) * 4}px`,
              animationDelay: `${(i % 20) * 0.15}s`,
              animationDuration: `${0.6 + (i % 4) * 0.2}s`,
            }}
          />
        ))}
      </div>
    );
  }

  if (code === 6) {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]" aria-hidden="true">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="snow-flake absolute w-1.5 h-1.5 bg-white/50 rounded-full"
            style={{
              left: `${(i * 3.3) % 100}%`,
              animationDelay: `${(i % 15) * 0.3}s`,
              animationDuration: `${3 + (i % 5) * 0.8}s`,
            }}
          />
        ))}
      </div>
    );
  }

  if (code === 8 && weatherCode === 800 && isDay) {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]" aria-hidden="true">
        <div className="sun-rays absolute top-20 right-20 w-32 h-32 opacity-10" />
      </div>
    );
  }

  return null;
};

export default WeatherParticles;
