import { useState, useRef, useEffect } from "react";
import { fetchCitySuggestions } from "../services/weatherApi";

const SearchBar = ({ onSearch, onLocationSearch, loading }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [fetchingSuggestions, setFetchingSuggestions] = useState(false);
  const debounceRef = useRef(null);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (value.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setFetchingSuggestions(true);
      try {
        const results = await fetchCitySuggestions(value);
        setSuggestions(results);
        setShowSuggestions(results.length > 0);
      } catch {
        setSuggestions([]);
      } finally {
        setFetchingSuggestions(false);
      }
    }, 350);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const cityName = suggestion.state
      ? `${suggestion.name}, ${suggestion.state}, ${suggestion.country}`
      : `${suggestion.name}, ${suggestion.country}`;
    setQuery(suggestion.name);
    onSearch(suggestion.name);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-2">
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            placeholder="Search for a city..."
            disabled={loading}
            className="w-full pl-12 pr-4 py-4 glass-strong rounded-2xl text-white placeholder-white/40
                       focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30
                       transition-all duration-300 text-base disabled:opacity-50"
          />
          {fetchingSuggestions && (
            <div className="absolute inset-y-0 right-4 flex items-center">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white/80 rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* Search Button */}
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400
                     text-white font-semibold rounded-2xl transition-all duration-300 
                     disabled:opacity-50 disabled:cursor-not-allowed
                     hover:shadow-lg hover:shadow-amber-500/30 hover:-translate-y-0.5 active:translate-y-0
                     whitespace-nowrap"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          ) : (
            <span>Search</span>
          )}
        </button>

        {/* Location Button */}
        <button
          type="button"
          onClick={onLocationSearch}
          disabled={loading}
          title="Use my location"
          className="px-4 py-4 glass-strong hover:bg-white/15 text-white rounded-2xl 
                     transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                     hover:-translate-y-0.5 active:translate-y-0"
        >
          <svg
            className="w-5 h-5"
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
        </button>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          className="absolute top-full left-0 right-0 mt-2 glass-strong rounded-2xl overflow-hidden z-50
                        shadow-2xl shadow-black/40 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {suggestions.map((s, i) => (
            <button
              key={`${s.lat}-${s.lon}-${i}`}
              onClick={() => handleSuggestionClick(s)}
              className="w-full flex items-center gap-3 px-5 py-3.5 text-left hover:bg-white/10
                         transition-colors duration-150 border-b border-white/5 last:border-0"
            >
              <svg
                className="w-4 h-4 text-white/40 flex-shrink-0"
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
              <div>
                <span className="text-white font-medium">{s.name}</span>
                <span className="text-white/50 text-sm ml-2">
                  {s.state ? `${s.state}, ` : ""}
                  {s.country}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
