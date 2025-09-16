import React from "react";

function WeatherDayCard({ day }) {
  return (
    <div
      className="text-center w-full p-2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl 
      hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 transform hover:scale-105 
      border border-gray-200 hover:border-blue-300 hover:shadow-lg mx-auto "
    >
      {/* Day */}
      <div className="font-bold text-gray-900 mb-3 text-xl">{day}</div>

      {/* Weather Icon */}
      <div className="flex justify-center mb-2 animate-float">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          
        >
          <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
          <path d="M16 14v6"></path>
          <path d="M8 14v6"></path>
          <path d="M12 16v6"></path>
        </svg>
      </div>

      {/* Weather Info */}
      <div className="space-y-3">
        {/* Temperature */}
        <div className="flex items-center justify-center space-x-2">
          <span className="text-xl font-bold text-gray-900">26°</span>
          <span className="text-base text-gray-600">/ 20°</span>
        </div>

        {/* Rain Chance */}
        <div
          className="flex items-center justify-center text-sm text-blue-600 
          bg-blue-50 rounded-sm px-8 py-3"
        >
          <span>Rain: 100%</span>
        </div>

        {/* New Fields */}
        <div className="flex items-center justify-between text-sm text-gray-700 px-6">
          <span>Humidity:</span>
          <span className="font-semibold">75%</span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-700 px-6">
          <span>Wind:</span>
          <span className="font-semibold">12 km/h</span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-700 px-6">
          <span>Sunrise:</span>
          <span className="font-semibold">6:20 AM</span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-700 px-6">
          <span>Sunset:</span>
          <span className="font-semibold">6:45 PM</span>
        </div>
      </div>
    </div>
  );
}

export default WeatherDayCard;
