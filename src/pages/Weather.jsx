import React, { useEffect, useState } from "react";
import axios from "axios";
import WeatherCard from "../components/cards/WeatherCard";
import WeatherDayCard from "../components/cards/WeatherDayCard";

function Weather({ city = "haridwar" }) {  // City ko prop se le sakte ho, default Haridwar
  const [next7Days, setNext7Days] = useState([]);
  const [prev7Days, setPrev7Days] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleWeatherReport = async () => {
      try {
        setLoading(true);
        setError(null);  // Reset error on retry

        // ✅ Fetch next 7 days
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/weather/next/7days?city=${city}`
        );
        if (response.status === 200 && Array.isArray(response.data)) {
          setNext7Days(response.data);
        }

        // ✅ Fetch previous 7 days
        const res = await axios.get(
          `${import.meta.env.VITE_URL}/weather/previous/7days?city=${city}`
        );
        if (res.status === 200 && Array.isArray(res.data)) {
          // Reverse previous data to show most recent first (e.g., Yesterday before older days)
          setPrev7Days([...res.data].reverse());
        }
      } catch (error) {
        console.error("Error fetching weather:", error);
        setError("Failed to fetch weather data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (city) {  // Only fetch if city is valid
      handleWeatherReport();
    }
  }, [city]);  // Re-fetch if city changes

  const getDayName = (datetime) => {
    const date = new Date(datetime);
    const today = new Date();
    today.setHours(0, 0, 0, 0);  // Normalize to start of day

    const diffTime = date - today;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays === -1) return "Yesterday";
    if (diffDays > 0) return `Day +${diffDays}`;
    if (diffDays < 0) return `Day ${Math.abs(diffDays)} ago`;

    // Fallback to short weekday
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  const getWeatherIcon = (condition) => {
    if (!condition) return "https://unpkg.com/lucide-static/icons/cloud.svg";
    const lower = condition.toLowerCase();
    if (lower.includes("rain"))
      return "https://unpkg.com/lucide-static/icons/cloud-rain.svg";
    if (lower.includes("cloud"))
      return "https://unpkg.com/lucide-static/icons/cloud.svg";
    if (lower.includes("sun") || lower.includes("clear"))
      return "https://unpkg.com/lucide-static/icons/sun.svg";
    if (lower.includes("snow"))
      return "https://unpkg.com/lucide-static/icons/cloud-snow.svg";
    if (lower.includes("storm") || lower.includes("thunder"))
      return "https://unpkg.com/lucide-static/icons/cloud-lightning.svg";
    return "https://unpkg.com/lucide-static/icons/cloud.svg";
  };

  const renderSection = (title, data, isNext = true) => (
    <div className="bg-sky-100 mt-8">
      <h1 className="text-center text-3xl font-bold my-2 py-5">
        {title}
      </h1>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 px-6">
          {data.map((dayData, idx) => (
            <WeatherDayCard
              key={idx}
              day={getDayName(dayData.date)}
              temp={dayData.temp}
              humidity={dayData.humidity}
              wind={dayData.wind}
              sunrise={dayData.sunrise}
              sunset={dayData.sunset}
              icon={getWeatherIcon(dayData.condition)}
            />
          ))}
        </div>
      ) : (
        <p className="text-center py-4 text-gray-500">No data available for this section.</p>
      )}
    </div>
  );

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-2 text-lg">Loading weather...</span>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        </div>
      ) : (
        <div className="p-8">
          {/* Next 7 Days Forecast */}
          {renderSection("Next 7 Days Weather Report", next7Days)}

          {/* Previous 7 Days Report */}
          {renderSection("Previous 7 Days Weather Report", prev7Days, false)}
        </div>
      )}
    </>
  );
}

export default Weather;
