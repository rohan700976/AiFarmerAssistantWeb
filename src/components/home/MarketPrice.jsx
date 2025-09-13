import React, { useState } from "react";

export default function MarketPrice() {
  const [search, setSearch] = useState("");
  const [selectedState, setSelectedState] = useState("All");

  // Dummy crop price data with 2-day records
  const data = [
    {
      id: 1,
      crop: "Wheat",
      price: "₹2200 / Quintal",
      mandi: "Delhi Mandi",
      state: "Delhi",
      previousPrices: [
        { date: "Yesterday", price: "₹2150 / Quintal" },
        { date: "2 days ago", price: "₹2100 / Quintal" },
      ],
    },
    {
      id: 2,
      crop: "Rice",
      price: "₹1800 / Quintal",
      mandi: "Lucknow Mandi",
      state: "UP",
      previousPrices: [
        { date: "Yesterday", price: "₹1820 / Quintal" },
        { date: "2 days ago", price: "₹1780 / Quintal" },
      ],
    },
    {
      id: 3,
      crop: "Sugarcane",
      price: "₹320 / Quintal",
      mandi: "Meerut Mandi",
      state: "UP",
      previousPrices: [
        { date: "Yesterday", price: "₹310 / Quintal" },
        { date: "2 days ago", price: "₹305 / Quintal" },
      ],
    },
    {
      id: 4,
      crop: "Cotton",
      price: "₹6200 / Quintal",
      mandi: "Nagpur Mandi",
      state: "Maharashtra",
      previousPrices: [
        { date: "Yesterday", price: "₹6150 / Quintal" },
        { date: "2 days ago", price: "₹6100 / Quintal" },
      ],
    },
    {
      id: 5,
      crop: "Pulses",
      price: "₹7500 / Quintal",
      mandi: "Indore Mandi",
      state: "MP",
      previousPrices: [
        { date: "Yesterday", price: "₹7400 / Quintal" },
        { date: "2 days ago", price: "₹7300 / Quintal" },
      ],
    },
  ];

  // Filter logic
  const filteredData = data.filter(
    (item) =>
      (selectedState === "All" || item.state === selectedState) &&
      item.crop.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
        🌾 Market Prices
      </h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="🔍 Search crop (e.g. Wheat)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* State Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {["All", "Delhi", "UP", "Maharashtra", "MP"].map((state) => (
          <button
            key={state}
            onClick={() => setSelectedState(state)}
            className={`px-5 py-2 rounded-full border transition-all ${
              selectedState === state
                ? "bg-green-600 text-white shadow-md"
                : "bg-white text-green-700 border-green-600 hover:bg-green-50"
            }`}
          >
            {state}
          </button>
        ))}
      </div>

      {/* Crop Price Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div
              key={item.id}
              className="bg-white border rounded-xl shadow-md hover:shadow-lg transition p-5 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  {item.crop}
                </h3>
                <p className="text-lg font-bold text-gray-800">{item.price}</p>
                <p className="text-sm text-gray-500 mt-2">
                  📍 {item.mandi} | {item.state}
                </p>

                {/* Previous Records */}
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">
                    Previous Records:
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {item.previousPrices.map((record, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{record.date}</span>
                        <span className="font-medium">{record.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button className="mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition">
                View Details
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            ❌ No crops found
          </p>
        )}
      </div>
    </div>
  );
}
