import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SoilDetection() {
  const [activeTab, setActiveTab] = useState("image");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [recoCrop, setRecoCrop] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    ph: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temp: "",
    hum: "",
    rain: "",
  });
  const [result, setResult] = useState("");
  const navigate = useNavigate();
  
  const validateForm = () => {
    let newErrors = {};

    // pH validation (4.5 - 9.0)
    if (!formData.ph) {
      newErrors.ph = "pH is required";
    } else if (formData.ph < 4.5 || formData.ph > 9.0) {
      newErrors.ph = "pH must be between 4.5 and 9.0";
    }

    // Nitrogen validation (10 - 120)
    if (!formData.nitrogen) {
      newErrors.nitrogen = "Nitrogen is required";
    } else if (formData.nitrogen < 10 || formData.nitrogen > 120) {
      newErrors.nitrogen = "Nitrogen must be between 10 and 120";
    }

    // Phosphorus validation (5 - 90)
    if (!formData.phosphorus) {
      newErrors.phosphorus = "Phosphorus is required";
    } else if (formData.phosphorus < 5 || formData.phosphorus > 90) {
      newErrors.phosphorus = "Phosphorus must be between 5 and 90";
    }

    // Potassium validation (10 - 150)
    if (!formData.potassium) {
      newErrors.potassium = "Potassium is required";
    } else if (formData.potassium < 10 || formData.potassium > 150) {
      newErrors.potassium = "Potassium must be between 10 and 150";
    }

    // Temperature validation (5 - 50 °C)
    if (!formData.temp) {
      newErrors.temp = "Temperature is required";
    } else if (formData.temp < 5 || formData.temp > 50) {
      newErrors.temp = "Temperature must be between 5 and 50 °C";
    }

    // Humidity validation (10 - 100 %)
    if (!formData.hum) {
      newErrors.hum = "Humidity is required";
    } else if (formData.hum < 10 || formData.hum > 100) {
      newErrors.hum = "Humidity must be between 10 and 100 %";
    }

    // Rainfall validation (50 - 3000 mm)
    if (!formData.rain) {
      newErrors.rain = "Rainfall is required";
    } else if (formData.rain < 50 || formData.rain > 3000) {
      newErrors.rain = "Rainfall must be between 50 and 3000 mm";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSoilDetection = async () => {
    if (!validateForm()) return; // Stop if validation fails

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

  // Handle File Upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle Form Input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on typing
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center pt-30 px-4 ">
      <h1 className="text-3xl font-bold text-green-700 mb-8">
        Soil Detection
      </h1>

      {/* Toggle Tabs */}
      <div className="flex border rounded-xl overflow-hidden mb-6">
        <button
          onClick={() => setActiveTab("image")}
          className={`px-6 py-3 text-sm font-medium transition ${activeTab === "image"
            ? "bg-green-600 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          AI Image Analysis
        </button>
        <button
          onClick={() => setActiveTab("form")}
          className={`px-6 py-3 text-sm font-medium transition ${activeTab === "form"
            ? "bg-green-600 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          Enter Soil Data
        </button>
      </div>

      {/* Content */}
      <div className="w-full max-w-3xl bg-green-80 border border-green-600 shadow-lg rounded-xl p-8 text-center">
        {activeTab === "image" ? (
          <>
            {/* IMAGE UPLOAD SECTION */}
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
                <p className="text-lg font-medium text-black ">
                  Upload soil image for AI diagnosis
                </p>
                <p className="text-sm text-gray-700 ">
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
              onClick={() => handleDetect("image")}
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition"
            >
              Detect from Image
            </button>
          </>
        ) : (
          <>
            {/* FORM INPUT SECTION */}
            <form className="space-y-4 text-left">
              {/* Soil pH */}
              <div>
                <input
                  type="number"
                  name="ph"
                  value={formData.ph}
                  onChange={handleChange}
                  placeholder="pH (4.5 - 9.0)"
                  min="4.5"
                  max="9.0"
                  step="0.1"
                  className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-green-300 text-gray-950"
                />
                {errors.ph && <p className="text-red-600 text-sm mt-1">{errors.ph}</p>}
              </div>

              {/* Nitrogen */}
              <div>
                <input
                  type="number"
                  name="nitrogen"
                  value={formData.nitrogen}
                  onChange={handleChange}
                  placeholder="Nitrogen (10 - 120 kg/ha)"
                  min="10"
                  max="120"
                  step="1"
                  className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-green-300 text-gray-950"
                />
                {errors.nitrogen && (
                  <p className="text-red-600 text-sm mt-1">{errors.nitrogen}</p>
                )}
              </div>

              {/* Phosphorus */}
              <div>
                <input
                  type="number"
                  name="phosphorus"
                  value={formData.phosphorus}
                  onChange={handleChange}
                  placeholder="Phosphorus (5 - 90 kg/ha)"
                  min="5"
                  max="90"
                  step="1"
                  className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-green-300 text-gray-950"
                />
                {errors.phosphorus && (
                  <p className="text-red-600 text-sm mt-1">{errors.phosphorus}</p>
                )}
              </div>

              {/* Potassium */}
              <div>
                <input
                  type="number"
                  name="potassium"
                  value={formData.potassium}
                  onChange={handleChange}
                  placeholder="Potassium (10 - 150 kg/ha)"
                  min="10"
                  max="150"
                  step="1"
                  className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-green-300 text-gray-950"
                />
                {errors.potassium && (
                  <p className="text-red-600 text-sm mt-1">{errors.potassium}</p>
                )}
              </div>

              {/* Temperature */}
              <div>
                <input
                  type="number"
                  name="temp"
                  value={formData.temp}
                  onChange={handleChange}
                  placeholder="Temperature (5 - 50 °C)"
                  min="5"
                  max="50"
                  step="0.5"
                  className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-green-300 text-gray-950"
                />
                {errors.temp && (
                  <p className="text-red-600 text-sm mt-1">{errors.temp}</p>
                )}
              </div>

              {/* Humidity */}
              <div>
                <input
                  type="number"
                  name="hum"
                  value={formData.hum}
                  onChange={handleChange}
                  placeholder="Humidity (10% - 100%)"
                  min="10"
                  max="100"
                  step="1"
                  className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-green-300 text-gray-950"
                />
                {errors.hum && (
                  <p className="text-red-600 text-sm mt-1">{errors.hum}</p>
                )}
              </div>

              {/* Rainfall */}
              <div>
                <input
                  type="number"
                  name="rain"
                  value={formData.rain}
                  onChange={handleChange}
                  placeholder="Rainfall (50 - 3000 mm)"
                  min="50"
                  max="3000"
                  step="1"
                  className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-green-300 text-gray-950"
                />
                {errors.rain && (
                  <p className="text-red-600 text-sm mt-1">{errors.rain}</p>
                )}
              </div>
            </form>


            <button
              onClick={handleSoilDetection}
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition"
            >
              Detect from Data
            </button>
          </>
        )}
      </div>

      {/* RESULT SECTION */}
      {result && (
        <div className="mt-8 bg-green-100 text-green-800 px-6 py-4 rounded-lg shadow max-w-3xl whitespace-pre-line">
          {result}
        </div>
      )}
    </div>
  );
}
