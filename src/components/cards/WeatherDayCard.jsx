import React from "react";

function WeatherDayCard({
  day,
  temp,
  humidity,
  wind,
  sunrise,
  sunset,
  icon
}) {
  return (
    <div
      className="text-center w-full p-4 bg-gradient-to-br from-gray-50 to-gray-100 
        rounded-3xl border border-gray-200 hover:border-blue-300 hover:shadow-xl 
        transition-all duration-300 transform hover:scale-105 mx-auto"
    >
      {/* Day */}
      <div className="font-bold text-gray-900 mb-2 text-xl">{day}</div>

      {/* Weather Icon */}
      <div className="flex justify-center mb-2 animate-float">
        <img src={icon} alt="weather-icon" className="h-16 w-16" />
      </div>

      {/* Temperature */}
      <div className="flex items-center justify-center mb-2 space-x-2">
        <span className="text-2xl font-bold text-gray-900">{temp}°C</span>
        {/* {tempMin && tempMax && (
          <span className="text-sm text-gray-500">
            / {tempMin}°C - {tempMax}°C
          </span>
        )} */}
      </div>

      {/* Rain Chance */}
      {/* {rainChance && (
        <div
          className="flex items-center justify-center text-sm text-blue-700 
            bg-blue-50 rounded-full px-3 py-1 mb-3 font-medium"
        >
          Rain: {rainChance}%
        </div>
      )} */}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
        {humidity && (
          <div className="flex justify-between px-2">
            <span>Humidity:</span>
            <span className="font-semibold">{humidity}%</span>
          </div>
        )}
        {wind && (
          <div className="flex justify-between px-2">
            <span>Wind:</span>
            <span className="font-semibold">{wind} km/h</span>
          </div>
        )}
        {sunrise && (
          <div className="flex justify-between px-2">
            <span>Sunrise:</span>
            <span className="font-semibold">{sunrise}</span>
          </div>
        )}
        {sunset && (
          <div className="flex justify-between px-2">
            <span>Sunset:</span>
            <span className="font-semibold">{sunset}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherDayCard;
