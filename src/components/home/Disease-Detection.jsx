import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DiseaseDetection() {
  const [activeTab, setActiveTab] = useState("upload");
  const navigate=useNavigate();

  const handleClick=()=>{
    navigate('/disease-detail');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-50 p-6">
      <div className="max-w-3xl h-[580px] mx-auto bg-white rounded-2xl shadow-xl p-6 mt-20 py-10">
        {/* Header */}
        <h1 className="text-2xl font-bold text-green-700 mb-10 text-center">
          🌱 Plant Disease Detection
        </h1>

        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setActiveTab("upload")}
            className={`px-6 py-2 rounded-l-lg font-medium transition ${
              activeTab === "upload"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Upload Image
          </button>
          <button
            onClick={() => setActiveTab("form")}
            className={`px-6 py-2 rounded-r-lg font-medium transition ${
              activeTab === "form"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Enter Data
          </button>
        </div>

        {/* Upload Image Section */}
        {activeTab === "upload" && (
          <div className="text-center">
            <label className="block mb-8 text-lg font-medium text-gray-700">
              Upload plant leaf image for detection
            </label>
            <input
              type="file"
              accept="image/*"
              className="block w-full text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            />
            <button 
            onClick={handleClick}
            className="mt-8 px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
              Detect Disease
            </button>
          </div>
        )}

        {/* Form Section */}
        {activeTab === "form" && (
          <form className="space-y-4 mb-6">
            <div>
              <label className="block mb-1 text-gray-700">Leaf Color</label>
              <input
                type="text"
                placeholder="e.g., Yellow, Brown"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700">Spots on Leaves</label>
              <input
                type="text"
                placeholder="e.g., Black spots, White patches"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700">Other Symptoms</label>
              <textarea
                rows="3"
                placeholder="Describe the plant condition"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
              ></textarea>
            </div>
            <button
              
              type="submit"
              className="w-full py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
            >
              Detect Disease
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
