import React, { useState, useEffect } from "react";
import wheatImage from "../assets/images/wheatImage.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

function SoilRecommended() {
  const location = useLocation();
  const { recoCrop = [], formData = {} } = location.state || {};

  const [defination, setDefination] = useState("");
  const [soilData, setSoilData] = useState([]);
  const [desiredCrop, setDesiredCrop] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("right");

  const [fertilizerData, setFertilizerData] = useState([]); // Hardcoded fertilizer
  const [soilInput, setSoilInput] = useState("");
  const [weatherInput, setWeatherInput] = useState("");
  const [varietyInput, setVarietyInput] = useState("");
  const [prediction, setPrediction] = useState(null);

  const navigate = useNavigate();
  const currentCrop = recoCrop[currentIndex] || "";

  const handleCrop = async (cropName) => {
    try {
      const definationRes = await axios.get(
        `${import.meta.env.VITE_URL}/ai/crop/details/${cropName}`
      );
      if (definationRes.status === 200) {
        setDefination(definationRes.data.response);
      }

      const soil_param = await axios.get(
        `${import.meta.env.VITE_URL}/ai/crop/soil_comparison/${cropName}`
      );
      if (soil_param.status === 200) {
        const parsed = parseMarkdownTable(soil_param.data.response);
        setSoilData(parsed);
      }

      // Hardcoded Fertilizer Recommendation
      setFertilizerData([
        { Fertilizer: "Urea", Quantity: "50 kg/ha", Timing: "Pre-sowing" },
        { Fertilizer: "DAP", Quantity: "30 kg/ha", Timing: "Sowing" },
        { Fertilizer: "Potash", Quantity: "20 kg/ha", Timing: "Vegetative stage" },
      ]);

    } catch (error) {
      console.error(error);
    }
  };

  function parseMarkdownTable(markdown) {
    const lines = markdown.trim().split("\n");
    const headers = lines[0].split("|").map((h) => h.trim()).filter(Boolean);

    const rows = lines.slice(2).map((line) =>
      line.split("|").map((cell) => cell.trim()).filter(Boolean)
    );

    return rows.map((row) => {
      const obj = {};
      headers.forEach((header, i) => {
        obj[header] = row[i];
      });
      return obj;
    });
  }

  useEffect(() => {
    if (currentCrop) {
      handleCrop(currentCrop);
    }
  }, [currentCrop]);

  const handleSearch = () => {
    if (!desiredCrop) {
      alert("⚠️ Please enter a crop name first!");
      return;
    }
    navigate("/desire-crop", { state: { crop: desiredCrop, formData } });
  };

  const handleNext = () => {
    setDirection("right");
    setCurrentIndex((prev) => (prev + 1) % recoCrop.length);
  };

  const handlePrev = () => {
    setDirection("left");
    setCurrentIndex((prev) =>
      prev === 0 ? recoCrop.length - 1 : prev - 1
    );
  };

  const handlePredict = () => {
    // Hardcoded prediction
    setPrediction(`Predicted yield for ${currentCrop}: 3.5 tons/ha`);
  };

  const variants = {
    enter: (dir) => ({
      x: dir === "right" ? 600 : -600,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: (dir) => ({
      x: dir === "right" ? -600 : 600,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.6, ease: "easeIn" },
    }),
  };

  return (
    <div className="relative p-6 max-w-6xl mx-auto mt-20 space-y-10">

      {/* Search Bar */}
      <div className="flex flex-col items-center gap-6 mt-5">
        <h1 className="text-4xl text-green-600 drop-shadow-md text-center font-bold">
          What You Grow
        </h1>
        <div className="flex items-center w-full max-w-md">
          <input
            type="text"
            value={desiredCrop}
            onChange={(e) => setDesiredCrop(e.target.value)}
            placeholder="Write your desired crop"
            className="flex-1 h-12 px-4 rounded-l-xl border border-gray-300 focus:outline-none focus:ring-0 focus:ring-green-500 shadow-sm"
          />
          <button
            onClick={handleSearch}
            className="h-12 px-6 bg-green-600 text-white font-semibold rounded-r-xl hover:bg-green-700 transition-all shadow-md"
          >
            Search
          </button>
        </div>
      </div>

      {/* Recommended Crop Card + Arrows */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-6 top-1/2 transform -translate-y-1/2
                     bg-green-600 text-white p-4 rounded-full shadow-lg
                     hover:bg-green-700 transition z-20"
        >
          ◀
        </button>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-6 top-1/2 transform -translate-y-1/2
                     bg-green-600 text-white p-4 rounded-full shadow-lg
                     hover:bg-green-700 transition z-20"
        >
          ▶
        </button>

        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentCrop}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="space-y-10"
          >
            <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              <img
                src={wheatImage}
                alt={currentCrop}
                className="w-full md:w-1/2 h-64 object-cover"
              />
              <div className="p-6 md:w-1/2 flex flex-col justify-between">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{currentCrop}</h2>
                <span className="inline-block bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
                  Recommended Crop {currentIndex + 1}/{recoCrop.length}
                </span>
                <p className="text-gray-700 mb-2">{defination}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Soil Parameter Comparison Table */}
      <div className="bg-white p-6 rounded-2xl shadow border border-gray-200 overflow-x-auto">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Soil Parameter Comparison
        </h3>
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b border-gray-300 p-2">Parameter</th>
              <th className="border-b border-gray-300 p-2">Your Soil</th>
              <th className="border-b border-gray-300 p-2">Optimal Range</th>
              <th className="border-b border-gray-300 p-2">Match</th>
            </tr>
          </thead>
          <tbody>
            {soilData.map((row, idx) => (
              <tr key={idx}>
                <td className="border-b border-gray-300 p-2">{row["Parameter"]}</td>
                <td className="border-b border-gray-300 p-2">{row["Your Soil"]}</td>
                <td className="border-b border-gray-300 p-2">{row["Optimal Range"]}</td>
                <td className="border-b border-gray-300 p-2">{row["Status"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Fertilizer Recommendation Table */}
      <div className="bg-white p-6 rounded-2xl shadow border border-gray-200 overflow-x-auto">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Fertilizer Recommendation
        </h3>
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b border-gray-300 p-2">Fertilizer</th>
              <th className="border-b border-gray-300 p-2">Quantity</th>
              <th className="border-b border-gray-300 p-2">Timing</th>
            </tr>
          </thead>
          <tbody>
            {fertilizerData.map((row, idx) => (
              <tr key={idx}>
                <td className="border-b border-gray-300 p-2">{row.Fertilizer}</td>
                <td className="border-b border-gray-300 p-2">{row.Quantity}</td>
                <td className="border-b border-gray-300 p-2">{row.Timing}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Yield Prediction Section */}
      <div className="bg-white p-6 rounded-2xl shadow border border-gray-200 space-y-4">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Yield Prediction
        </h3>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={soilInput}
            onChange={(e) => setSoilInput(e.target.value)}
            placeholder="Soil"
            className="flex-1 h-12 px-4 rounded border border-gray-300 shadow-sm"
          />
          <input
            type="text"
            value={weatherInput}
            onChange={(e) => setWeatherInput(e.target.value)}
            placeholder="Weather"
            className="flex-1 h-12 px-4 rounded border border-gray-300 shadow-sm"
          />
          <input
            type="text"
            value={varietyInput}
            onChange={(e) => setVarietyInput(e.target.value)}
            placeholder="Crop Variety"
            className="flex-1 h-12 px-4 rounded border border-gray-300 shadow-sm"
          />
        </div>
        <button
          onClick={handlePredict}
          className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-md"
        >
          Predict
        </button>
        {prediction && (
          <p className="mt-2 text-green-700 font-semibold">{prediction}</p>
        )}
      </div>

      {/* Recommended Crop Life Cycle */}
      <div className="bg-white p-6 rounded-2xl shadow border border-gray-200 overflow-x-auto">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          {currentCrop} Life Cycle (Month-wise)
        </h3>
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b border-gray-300 p-2">Month</th>
              <th className="border-b border-gray-300 p-2">Activity</th>
            </tr>
          </thead>
          <tbody>
            {[
              { Month: "Jan", Activity: "Soil Preparation" },
              { Month: "Feb", Activity: "Sowing" },
              { Month: "Mar", Activity: "Irrigation & Fertilizer" },
              { Month: "Apr", Activity: "Vegetative Growth" },
              { Month: "May", Activity: "Flowering" },
              { Month: "Jun", Activity: "Harvesting" },
              { Month: "Jul", Activity: "Post-Harvest Activities" },
            ].map((row, idx) => (
              <tr key={idx}>
                <td className="border-b border-gray-300 p-2">{row.Month}</td>
                <td className="border-b border-gray-300 p-2">{row.Activity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SoilRecommended;
