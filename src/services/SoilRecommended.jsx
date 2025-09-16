import React from 'react'
import wheatImage from '../assets/images/wheatImage.jpg'

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

  return (
   <div className="p-6 max-w-5xl mx-auto space-y-8">
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
    <td className="border-b border-gray-200 p-2">pH</td>
    <td className="border-b border-gray-200 p-2">6.5</td>
    <td className="border-b border-gray-200 p-2">6.0 - 7.0</td>
    <td className="border-b border-gray-200 p-2">✅ Match</td>
  </tr>
  <tr className="bg-green-50">
    <td className="border-b border-gray-200 p-2">Nitrogen</td>
    <td className="border-b border-gray-200 p-2">45</td>
    <td className="border-b border-gray-200 p-2">40 - 60</td>
    <td className="border-b border-gray-200 p-2">✅ Match</td>
  </tr>
  <tr className="bg-green-50">
    <td className="border-b border-gray-200 p-2">Phosphorus</td>
    <td className="border-b border-gray-200 p-2">35</td>
    <td className="border-b border-gray-200 p-2">30 - 50</td>
    <td className="border-b border-gray-200 p-2">✅ Match</td>
  </tr>
  <tr className="bg-green-50">
    <td className="border-b border-gray-200 p-2">Potassium</td>
    <td className="border-b border-gray-200 p-2">25</td>
    <td className="border-b border-gray-200 p-2">20 - 40</td>
    <td className="border-b border-gray-200 p-2">✅ Match</td>
  </tr>
  <tr className="bg-green-50">
    <td className="border-b border-gray-200 p-2">Moisture</td>
    <td className="border-b border-gray-200 p-2">40%</td>
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