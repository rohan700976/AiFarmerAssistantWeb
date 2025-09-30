import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SoilDetection() {
  const [activeTab, setActiveTab] = useState("image");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
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
  const [iotClicked, setIotClicked] = useState(false); // ✅ track IoT button state
  const navigate = useNavigate();

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

  // ✅ Old flow: Detect from Data → direct navigate
  const handleDetectFromData = () => {
    navigate("/result", { state: { formData } });
  };

  // ✅ Image flow
  const handleDetectFromImage = () => {
    navigate("/result", { state: { formData, image: selectedFile } });
  };

  // ✅ IoT Button
  const handleIoT = () => {
    if (!iotClicked) {
      // First click → fetch IoT data (simulate)
      const success = Math.random() > 0.5;
      let newData = {};
      if (success) {
        newData = {
          ph: (Math.random() * 14).toFixed(2),
          nitrogen: Math.floor(Math.random() * 100),
          phosphorus: Math.floor(Math.random() * 100),
          potassium: Math.floor(Math.random() * 100),
          temp: (20 + Math.random() * 15).toFixed(1),
          hum: Math.floor(40 + Math.random() * 60),
          rain: Math.floor(Math.random() * 300),
        };
        alert("✅ IoT data received!");
      } else {
        newData = {
          ph: (Math.random() * 14).toFixed(2),
          nitrogen: Math.floor(Math.random() * 100),
          phosphorus: Math.floor(Math.random() * 100),
          potassium: Math.floor(Math.random() * 100),
          temp: (20 + Math.random() * 15).toFixed(1),
          hum: Math.floor(40 + Math.random() * 60),
          rain: Math.floor(Math.random() * 300),
        };
        alert("⚠️ IoT device not responding, random values filled!");
      }
      setFormData(newData);
      setIotClicked(true);
    } else {
      // Second click → Navigate
      navigate("/result", { state: { formData } });
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center pt-25 px-4 ">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Soil Detection
      </h1>

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
              onClick={handleDetectFromImage}
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition"
            >
              Detect from Image
            </button>
          </>
        ) : (
          <>
            {/* FORM INPUT SECTION */}
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
                    className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-green-300  text-gray-950"
                  />
                  {errors[field] && (
                    <p className="text-red-600 text-sm mt-1">{errors[field]}</p>
                  )}
                </div>
              ))}
            </form>

            {/* Detect from Data → direct next page */}
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

      {/* RESULT SECTION */}
      {result && (
        <div className="mt-8 bg-green-100 text-green-800 px-6 py-4 rounded-lg shadow max-w-3xl whitespace-pre-line">
          {result}
        </div>
      )}
    </div>
  );
}
