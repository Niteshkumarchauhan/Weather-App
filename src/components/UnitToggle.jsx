const UnitToggle = ({ unit, onToggle }) => {
  const isCelsius = unit === "metric";

  return (
    <button
      onClick={onToggle}
      className="glass-card rounded-xl px-4 py-2 flex items-center gap-2 hover:bg-white/15
                 transition-all duration-300 hover:-translate-y-0.5 group"
      title={`Switch to ${isCelsius ? "Fahrenheit" : "Celsius"}`}
    >
      <span
        className={`text-sm font-bold transition-colors duration-200 ${isCelsius ? "text-white" : "text-white/30"}`}
      >
        °C
      </span>
      <div className="relative w-8 h-4 bg-white/10 rounded-full">
        <div
          className={`absolute top-0.5 w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400
                      transition-all duration-300 ${isCelsius ? "left-0.5" : "left-4"}`}
        />
      </div>
      <span
        className={`text-sm font-bold transition-colors duration-200 ${!isCelsius ? "text-white" : "text-white/30"}`}
      >
        °F
      </span>
    </button>
  );
};

export default UnitToggle;
