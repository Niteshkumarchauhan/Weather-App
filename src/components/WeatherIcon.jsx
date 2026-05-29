/**
 * Renders an OpenWeatherMap weather icon with optional size and animation
 */
const WeatherIcon = ({
  iconCode,
  size = "md",
  animate = false,
  className = "",
}) => {
  const sizes = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    xl: "w-32 h-32",
  };

  const imgSizes = {
    sm: 40,
    md: 64,
    lg: 96,
    xl: 128,
  };

  if (!iconCode) return null;

  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <div
      className={`${sizes[size]} ${animate ? "animate-float" : ""} ${className} flex items-center justify-center`}
    >
      <img
        src={iconUrl}
        alt="weather icon"
        width={imgSizes[size]}
        height={imgSizes[size]}
        className="w-full h-full object-contain drop-shadow-lg"
        style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.3))" }}
      />
    </div>
  );
};

export default WeatherIcon;
