import React, {useEffect} from 'react'
import axios from 'axios'
import WeatherCard from '../components/cards/WeatherCard'
import WeatherDayCard from '../components/cards/WeatherDayCard'

function Weather() {
    const days = ["Today", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    useEffect(() => {
      console.log("hello");
     const handleWeateherReport=async()=>{
        const response= await axios.get('http://10.18.65.11:8000/weather/next/7days?city=haridwar');
        // console.log(response.data);
        console.log(response.data.slice(0,7));
     }
    handleWeateherReport();
    }, [])
    

    return (
        <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mt-22">

                {/* Left Section */}
                <div className="lg:col-span-2 flex flex-col">
                    {/* Current Weather */}
                    <div className="flex items-center space-x-6 mb-8">
                        <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-6 rounded-2xl animate-float">
                            {/* Sun Icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="64"
                                height="64"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-sun h-16 w-16 text-yellow-500"
                            >
                                <circle cx="12" cy="12" r="4"></circle>
                                <path d="M12 2v2"></path>
                                <path d="M12 20v2"></path>
                                <path d="m4.93 4.93 1.41 1.41"></path>
                                <path d="m17.66 17.66 1.41 1.41"></path>
                                <path d="M2 12h2"></path>
                                <path d="M20 12h2"></path>
                                <path d="m6.34 17.66-1.41 1.41"></path>
                                <path d="m19.07 4.93-1.41 1.41"></path>
                            </svg>
                        </div>
                        <div>
                            <div className="text-5xl font-bold text-gray-900 mb-2">26°C</div>
                            <div className="text-lg text-gray-600 capitalize mb-1">
                                moderate rain
                            </div>
                            <div className="text-sm text-gray-500">Feels like 26°C</div>
                        </div>
                    </div>

                    {/* Weather Stats Grid */}
                    <div className="grid grid-cols-4 md:grid-cols-4 gap-4 mb-8">
                        <WeatherCard name="Humidity" value="88%" image="https://unpkg.com/lucide-static/icons/droplets.svg" />
                        <WeatherCard name="Wind" value="12 Km/h" image="https://unpkg.com/lucide-static/icons/wind.svg" />
                        <WeatherCard name="Visibility" value="10 Km" image="https://unpkg.com/lucide-static/icons/eye.svg" />
                        <WeatherCard name="UV Index" value="6" image="https://unpkg.com/lucide-static/icons/sun.svg" />
                        <WeatherCard name="Pressure" value="1006 hpa" image="https://unpkg.com/lucide-static/icons/gauge.svg" />
                        <WeatherCard name="Precipitation" value="2.37 mm" image="https://unpkg.com/lucide-static/icons/cloud-rain.svg" />
                        <WeatherCard name="Feels Like" value="26 C" image="https://unpkg.com/lucide-static/icons/thermometer.svg" />
                    </div>


                </div>

                {/* Right Section - Recommendations */}
                <div className="flex flex-col ">
                    <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 mr-2"
                            fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                        </svg>
                        Farming Recommendations
                    </h4>
                    <div className="space-y-4 overflow-y-auto pr-2 flex-1">
                        {/* Example Recommendation */}
                        <div className="border-l-4 p-4 rounded-r-lg border-l-yellow-500 bg-yellow-50 transition-all hover:shadow-md transform duration-200">
                            <div className="flex items-start space-x-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500"
                                    fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                                    <path d="M12 9v4"></path>
                                    <path d="M12 17h.01"></path>
                                </svg>
                                <div className="flex-1">
                                    <h5 className="font-semibold text-gray-900 mb-1">High humidity alert</h5>
                                    <p className="text-sm text-gray-700 mb-2">
                                        Monitor crops for fungal diseases and improve ventilation
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-500">Check crops twice daily</span>
                                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                            medium priority
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Repeat other recommendations */}
                    </div>

                    <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 mr-2"
                            fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                        </svg>
                        Farming Recommendations
                    </h4>
                    <div className="space-y-4 overflow-y-auto pr-2 flex-1">
                        {/* Example Recommendation */}
                        <div className="border-l-4 p-4 rounded-r-lg border-l-yellow-500 bg-yellow-50 transition-all hover:shadow-md transform duration-200">
                            <div className="flex items-start space-x-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500"
                                    fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                                    <path d="M12 9v4"></path>
                                    <path d="M12 17h.01"></path>
                                </svg>
                                <div className="flex-1">
                                    <h5 className="font-semibold text-gray-900 mb-1">High humidity alert</h5>
                                    <p className="text-sm text-gray-700 mb-2">
                                        Monitor crops for fungal diseases and improve ventilation
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-500">Check crops twice daily</span>
                                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                            medium priority
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Repeat other recommendations */}
                    </div>
                </div>
            </div>

            {/* 7 Days Forecast */}
            <div className='bg-sky-100 h-105'>
                <h1 className='text-center text-3xl font-bold my-2 py-5'> Next 7 Days Weather Report</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 px-6 mt-auto">

                    {days.map((day, idx) => (
                        <WeatherDayCard key={idx} day={day} />
                    ))}
                </div>
            </div>

            {/* 7 Days Forecast */}
            <div className='bg-sky-100 h-105'>
                <h1 className='text-center text-3xl font-bold my-2 py-5'> Previous 7 Days Weather Report</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 px-6 mt-auto ">

                    {days.map((day, idx) => (
                        <WeatherDayCard key={idx} day={day} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Weather
