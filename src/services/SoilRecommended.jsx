import React from 'react'
import wheatImage from '../assets/images/wheatImage.jpg'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function SoilRecommended() {
      const idealSoil = {
    ph: { min: 6.0, max: 7.0 },
    nitrogen: { min: 40, max: 60 }, // in kg/ha
    phosphorus: { min: 30, max: 50 },
    potassium: { min: 20, max: 40 },
    moisture: { min: 35, max: 45 }, // in %
  };

  const checkMatch = (param, value) => {
    return value >= idealSoil[param].min && value <= idealSoil[param].max;
  };

   const location = useLocation();
    const { formData } = location.state || {};
    console.log(formData)

    const [crop, SetCrop] = useState("");
    const navigate=useNavigate();

    const handelSearch = () => {
  if (!crop) {
    alert("⚠️ Please enter a crop name first!");
    return;
  }
  navigate("/desire-crop", { state: { crop, formData } });
};

    // console.log(crop);

  return (
   <div className="p-6 max-w-5xl mx-auto space-y-8 mt-20">

   <div className="flex flex-col items-center gap-6 mt-5 ">
  <h1 className="text-4xl text-green-600 drop-shadow-md text-center font-bold">
    What You Grow
  </h1>

  <div className="flex items-center w-full max-w-md">
    <input
      type="text"
       value={crop}
      onChange={(e) => SetCrop(e.target.value)}
      placeholder="Write your desired crop"
      className="flex-1 h-12 px-4 rounded-l-xl border border-gray-300 focus:outline-none focus:ring-0 focus:ring-green-500 shadow-sm"
    />
  
    <button 
    onClick={handelSearch}
    className="h-12 px-6 bg-green-600 text-white font-semibold rounded-r-xl hover:bg-green-700 transition-all shadow-md">
      Search
    </button>
  </div>
</div>

      {/* Recommended Crop Card */}
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
        <img
          src={wheatImage}
          alt="Wheat"
          className="w-full md:w-1/2 h-64 object-cover"
        />
        <div className="p-6 md:w-1/2 flex flex-col justify-between">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Wheat</h2>
          <span className="inline-block bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
            Highly Recommended
          </span>
          <p className="text-gray-700 mb-2">
            Wheat grows best in soil with slightly acidic to neutral pH (6.0–7.0) and moderate nitrogen, phosphorus, and potassium. Your soil parameters are suitable, making it a perfect choice.
          </p>
          <p className="text-gray-700">
            Moisture should be moderate; excessive water can damage roots, while low moisture can reduce yield. Wheat thrives in well-drained loamy soil.
          </p>
        </div>
      </div>

      {/* Scientific Reason Section */}
      <div className="bg-white p-6 rounded-2xl shadow border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Why Wheat is Recommended
        </h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li><strong>pH:</strong> Wheat prefers 6.0–7.0. Your soil's pH is ideal for nutrient absorption.</li>
          <li><strong>Nitrogen (N):</strong> Promotes leaf growth and protein content in grains. Matched with your soil.</li>
          <li><strong>Phosphorus (P):</strong> Helps root development and flowering. Adequate in your soil.</li>
          <li><strong>Potassium (K):</strong> Improves stress resistance and grain quality. Your soil supports it.</li>
          <li><strong>Moisture:</strong> Wheat needs moderate moisture for germination and growth. Your soil falls in the optimal range.</li>
        </ul>
      </div>

      {/* Soil Comparison Table */}
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
  <tr className="bg-green-50">
    <td className="border-b border-gray-200 p-2">ph</td>
    <td className="border-b border-gray-200 p-2">{formData.ph}</td>
    <td className="border-b border-gray-200 p-2">6.0 - 7.0</td>
    <td className="border-b border-gray-200 p-2">✅ Match</td>
  </tr>
  <tr className="bg-green-50">
    <td className="border-b border-gray-200 p-2">Nitrogen</td>
    <td className="border-b border-gray-200 p-2">{formData.nitrogen}</td>
    <td className="border-b border-gray-200 p-2">40 - 60</td>
    <td className="border-b border-gray-200 p-2">✅ Match</td>
  </tr>
  <tr className="bg-green-50">
    <td className="border-b border-gray-200 p-2">Phosphorus</td>
    <td className="border-b border-gray-200 p-2">{formData.phosphorus}</td>
    <td className="border-b border-gray-200 p-2">30 - 50</td>
    <td className="border-b border-gray-200 p-2">✅ Match</td>
  </tr>
  <tr className="bg-green-50">
    <td className="border-b border-gray-200 p-2">Potassium</td>
    <td className="border-b border-gray-200 p-2">{formData.potassium}</td>
    <td className="border-b border-gray-200 p-2">20 - 40</td>
    <td className="border-b border-gray-200 p-2">✅ Match</td>
  </tr>
  <tr className="bg-green-50">
    <td className="border-b border-gray-200 p-2">Moisture</td>
    <td className="border-b border-gray-200 p-2">{formData.moisture}</td>
    <td className="border-b border-gray-200 p-2">35% - 45%</td>
    <td className="border-b border-gray-200 p-2">✅ Match</td>
  </tr>
</tbody>



          {/* <tbody>
            {Object.keys(soilInput).map((param) => {
              const isMatch = checkMatch(param, soilInput[param]);
              const displayName = param.charAt(0).toUpperCase() + param.slice(1);
              const optimalRange = `${idealSoil[param].min} - ${idealSoil[param].max}`;
              return (
                <tr key={param} className={isMatch ? "bg-green-50" : "bg-red-50"}>
                  <td className="border-b border-gray-200 p-2">{displayName}</td>
                  <td className="border-b border-gray-200 p-2">{soilInput[param]}</td>
                  <td className="border-b border-gray-200 p-2">{optimalRange}</td>
                  <td className="border-b border-gray-200 p-2">
                    {isMatch ? "✅ Match" : "❌ Not Match"}
                  </td>
                </tr>
              );
            })}
          </tbody> */}
        </table>
      </div>
    </div>
  )
}

export default SoilRecommended