import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SoilDetection() {
  const [activeTab, setActiveTab] = useState("image");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    ph: "7.0", // Default average soil pH in India (editable)
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temp: "",
    hum: "",
    rain: "0", // Default, will be updated from API
  });
  const [result, setResult] = useState("");
  const [sensorData, setSensorData] = useState(null); // Latest sensor reading
  const navigate = useNavigate();

  // Fetch live sensor data from backend
  const fetchSensorData = async () => {
    try {
      const token = localStorage.getItem("token"); // Assume stored after login
      if (!token) throw new Error("No auth token");
      const response = await axios.get("http://localhost:3000/api/sensor-data", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.length > 0) {
        const latest = response.data[0]; // Latest reading
        setSensorData(latest);
        setFormData((prev) => ({
          ...prev,
          temp: latest.temperature.toString(),
          hum: latest.humidity.toString(),
          nitrogen: latest.npk?.n?.toString() || "",
          phosphorus: latest.npk?.p?.toString() || "",
          potassium: latest.npk?.k?.toString() || "",
        }));
      }
    } catch (error) {
      console.error("Sensor data fetch error:", error);
    }
  };

  // Fetch rainfall from weather API using geolocation
  const fetchRainfall = async () => {
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your free API key from openweathermap.org
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        );
        const rain = response.data.rain?.["1h"] || 0; // Rainfall in last hour (mm)
        setFormData((prev) => ({ ...prev, rain: rain.toString() }));
      }, (error) => {
        console.error("Geolocation error:", error);
        // Fallback: Default rain 0 if permission denied
      });
    } catch (error) {
      console.error("Weather API error:", error);
    }
  };

  // Auto-refresh sensor data every 30 seconds and fetch on mount
  useEffect(() => {
    fetchSensorData();
    fetchRainfall(); // Fetch rain once on load
    const interval = setInterval(fetchSensorData, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  // Validation Function
  const validateForm = () => {
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `${key.toUpperCase()} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSoilDetection = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        `http://localhost:8000/ai/soil/crop/recommendation`,
        {
          N: formData.nitrogen,
          P: formData.phosphorus,
          K: formData.potassium,
          temp: formData.temp,
          hum: formData.hum,
          ph: formData.ph,
          rain: formData.rain,
        }
      );

      if (response.status === 200) {
        let reco = response.data.response;
        if (typeof reco === "string") {
          try {
            reco = JSON.parse(reco);
          } catch (e) {
            console.error("Invalid JSON format from backend:", reco);
          }
        }
        setRecoCrop(reco);
        navigate("/result", { state: { recoCrop: reco, formData } });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDetect = (recoCrop) => {
    navigate(`/result`, { state: { formData } });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center pt-30 px-4">
      <h1 className="text-3xl font-bold text-green-700 mb-8">Soil Detection</h1>

      {/* Toggle Tabs */}
      <div className="flex border rounded-xl overflow-hidden mb-6">
        <button
          onClick={() => setActiveTab("image")}
          className={`px-6 py-3 text-sm font-medium transition ${
            activeTab === "image"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          AI Image Analysis
        </button>
        <button
          onClick={() => setActiveTab("form")}
          className={`px-6 py-3 text-sm font-medium transition ${
            activeTab === "form"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Enter Soil Data
        </button>
      </div>

      {/* Content */}
      <div className="w-full max-w-3xl bg-green-80 border border-green-600 shadow-lg rounded-xl p-8 text-center mb-20">
        {activeTab === "image" ? (
          <>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8">
              <div className="flex flex-col items-center space-y-4">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7v4a1 1 0 001 1h3m10-5h4a1 1 0 011 1v4m-5 10h4a1 1 0 001-1v-4M7 21H3a1 1 0 01-1-1v-4m5-10l5-5m0 0l5 5m-5-5v12"
                  />
                </svg>
                <p className="text-lg font-medium text-black">
                  Upload soil image for AI diagnosis
                </p>
                <p className="text-sm text-gray-700">
                  Supported formats: JPG, PNG, WebP (Max 5MB)
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="soil-upload"
                />
                <label
                  htmlFor="soil-upload"
                  className="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium"
                >
                  Choose File
                </label>
              </div>
            </div>
            {preview && (
              <div className="mt-6">
                <img
                  src={preview}
                  alt="Soil Preview"
                  className="rounded-lg shadow-md w-full h-56 object-cover"
                />
              </div>
            )}
            <button
              onClick={handleDetectFromImage}
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition"
            >
              Detect from Image
            </button>
          </>
        ) : (
          <>
            {/* FORM INPUT SECTION with Live Data */}
            <form className="space-y-4 text-left">
              {[
                "ph",
                "nitrogen",
                "phosphorus",
                "potassium",
                "temp",
                "hum",
                "rain",
              ].map((field) => (
                <div key={field}>
                  <input
                    type="number"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder={field.toUpperCase()}
                    className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-green-300 text-gray-950"
                  />
                  {errors[field] && (
                    <p className="text-red-600 text-sm mt-1">{errors[field]}</p>
                  )}
                </div>
              ))}
            </form>
            <button
              onClick={handleDetectFromData}
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition"
            >
              Detect from Data
            </button>

            {/* ✅ Detect from IoT button */}
            <button
              onClick={handleIoT}
              className="mt-3 w-full  bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition"
            >
              {iotClicked ? "Go to Result" : "Detect from IoT"}
            </button>
          </>
        )}
      </div>

      {/* Live Sensor Data Display */}
      {sensorData && (
        <div className="mt-8 bg-green-100 text-green-800 px-6 py-4 rounded-lg shadow max-w-3xl">
          <h2 className="text-xl font-bold mb-4">Live IoT Sensor Readings (Auto-Refreshing)</h2>
          <p><strong>Temperature:</strong> {sensorData.temperature} °C</p>
          <p><strong>Humidity:</strong> {sensorData.humidity} %</p>
          <p><strong>Moisture:</strong> {sensorData.moisture} %</p>
          {sensorData.npk && (
            <>
              <p><strong>Nitrogen (N):</strong> {sensorData.npk.n} ppm</p>
              <p><strong>Phosphorus (P):</strong> {sensorData.npk.p} ppm</p>
              <p><strong>Potassium (K):</strong> {sensorData.npk.k} ppm</p>
            </>
          )}
          <p className="text-sm mt-4">Data last updated: {new Date(sensorData.timestamp).toLocaleString()}</p>
        </div>
      )}

      {/* RESULT SECTION */}
      {result && (
        <div className="mt-8 bg-green-100 text-green-800 px-6 py-4 rounded-lg shadow max-w-3xl whitespace-pre-line">
          {result}
        </div>
      )}
    </div>
  );
}