const SavedCities = ({ cities, currentCity, onSelect, onRemove, onSave }) => {
  if (!cities.length && !currentCity) return null;

  const isSaved = currentCity && cities.some((c) => c.name === currentCity);

  return (
    <div className="glass rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm">⭐</span>
          <h3 className="text-white/60 text-xs font-semibold uppercase tracking-wider">
            Saved Cities
          </h3>
        </div>
        {currentCity && !isSaved && (
          <button
            onClick={() => onSave(currentCity)}
            className="text-amber-400/80 hover:text-amber-300 text-xs font-medium
                       transition-colors flex items-center gap-1"
          >
            <span>+</span> Save {currentCity}
          </button>
        )}
      </div>

      {cities.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {cities.map((city) => (
            <div
              key={city.name}
              className={`group flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm
                          transition-all duration-200 cursor-pointer
                          ${
                            currentCity === city.name
                              ? "bg-amber-500/20 border border-amber-400/30 text-amber-200"
                              : "glass-card text-white/70 hover:bg-white/12 hover:text-white"
                          }`}
            >
              <button
                onClick={() => onSelect(city.name)}
                className="font-medium"
              >
                {city.name}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(city.name);
                }}
                className="opacity-0 group-hover:opacity-100 text-white/30 hover:text-red-400
                           transition-all text-xs ml-1"
                title="Remove"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white/30 text-xs">
          Search a city and tap Save to add favorites.
        </p>
      )}
    </div>
  );
};

export default SavedCities;
