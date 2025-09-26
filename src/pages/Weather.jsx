import React, { useEffect, useState } from "react";
import axios from "axios";
import WeatherCard from "../components/cards/WeatherCard";
import WeatherDayCard from "../components/cards/WeatherDayCard";

function Weather() {
  const [next7Days, setNext7Days] = useState([]);
  const [prev7Days, setPrev7Days] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleWeatherReport = async () => {
      try {
        setLoading(true);

        // ✅ Fetch next 7 days
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/weather/next/7days?city=haridwar`
        );
        if (response.status === 200) {
          setNext7Days(response.data.slice(0, 7));
        }

        // ✅ Fetch previous 7 days
        const res = await axios.get(
          `${import.meta.env.VITE_URL}/weather/previous/7days?city=haridwar`
        );
        if (res.status === 200) {
          console.log(res.data);
          setPrev7Days(res.data);
        }
      } catch (error) {
        console.error("Error fetching weather:", error);
      } finally {
        setLoading(false);
      }
    };

    handleWeatherReport();
  }, []);

  // ✅ Function to get day name
  const getDayName = (datetime, idx) => {
    if (idx === 0) return "Today";
    const date = new Date(datetime);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  // ✅ Function to get weather icon based on conditions
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

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-12 h-12 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        next7Days.length > 0 &&
        prev7Days.length > 0 && (
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mt-22">
              {/* Left Section */}
              <div className="lg:col-span-2 flex flex-col">
                {/* Current Weather */}
                <div className="flex items-center space-x-6 mb-8">
                  <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-6 rounded-2xl animate-float">
                    <img
                      src={getWeatherIcon(next7Days[0].conditions)}
                      alt="weather-icon"
                      className="h-16 w-16"
                    />
                  </div>
                  <div>
                    <div className="text-5xl font-bold text-gray-900 mb-2">
                      {next7Days[0].temp}°C
                    </div>
                    <div className="text-sm text-gray-500">
                      Feels like {next7Days[0].temp}°C
                    </div>
                  </div>
                </div>

                {/* Weather Stats Grid */}
                <div className="grid grid-cols-4 md:grid-cols-4 gap-4 mb-8">
                  <WeatherCard
                    name="Humidity"
                    value={next7Days[0].humidity}
                    image="https://unpkg.com/lucide-static/icons/droplets.svg"
                  />
                  <WeatherCard
                    name="Wind"
                    value={`${next7Days[0].wind} Km/h`}
                    image="https://unpkg.com/lucide-static/icons/wind.svg"
                  />
                  <WeatherCard
                    name="Visibility"
                    value={`${next7Days[0].visibility} Km`}
                    image="https://unpkg.com/lucide-static/icons/eye.svg"
                  />
                  <WeatherCard
                    name="UV Index"
                    value={next7Days[0].uvindex}
                    image="https://unpkg.com/lucide-static/icons/sun.svg"
                  />
                  <WeatherCard
                    name="Pressure"
                    value={`${next7Days[0].pressure} hpa`}
                    image="https://unpkg.com/lucide-static/icons/gauge.svg"
                  />
                  <WeatherCard
                    name="Feels Like"
                    value={`${next7Days[0].temp} °C`}
                    image="https://unpkg.com/lucide-static/icons/thermometer.svg"
                  />
                  <WeatherCard
                    name="Sunrise"
                    value={next7Days[0].sunrise}
                    image="https://unpkg.com/lucide-static/icons/sunrise.svg"
                  />
                  <WeatherCard
                    name="Sunset"
                    value={next7Days[0].sunset}
                    image="https://unpkg.com/lucide-static/icons/sunset.svg"
                  />
                </div>
              </div>

              {/* Right Section */}
              <div className="flex flex-col">
                <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                  Farming Recommendations
                </h4>
                <div className="space-y-4 overflow-y-auto pr-2 flex-1">
                  <div className="border-l-4 p-4 rounded-r-lg border-l-yellow-500 bg-yellow-50 transition-all hover:shadow-md transform duration-200">
                    <div className="flex items-start space-x-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-yellow-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                        <path d="M12 9v4"></path>
                        <path d="M12 17h.01"></path>
                      </svg>
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-900 mb-1">
                          High humidity alert
                        </h5>
                        <p className="text-sm text-gray-700 mb-2">
                          Monitor crops for fungal diseases and improve
                          ventilation
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            Check crops twice daily
                          </span>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            medium priority
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* More recommendations here */}
                </div>
              </div>
            </div>

            {/* Next 7 Days Forecast */}
            <div className="bg-sky-100 h-105 mt-8">
              <h1 className="text-center text-3xl font-bold my-2 py-5">
                Next 7 Days Weather Report
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 px-6 mt-auto">
                {next7Days.map((dayData, idx) => (
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
            </div>

            {/* Previous 7 Days Forecast */}
            <div className="bg-sky-100 h-105 mt-8">
              <h1 className="text-center text-3xl font-bold my-2 py-5">
                Previous 7 Days Weather Report
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 px-6 mt-auto">
                {prev7Days.map((dayData, idx) => (
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
            </div>
          </div>
        )
      )}
    </>
  );
}

export default Weather;
