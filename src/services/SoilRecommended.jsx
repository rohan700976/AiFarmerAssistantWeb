import React, { useState, useEffect } from 'react';
import wheatImage from '../assets/images/wheatImage.jpg';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function SoilRecommended() {
  const { recoCrop } = useParams();
  const [idealSoil, setIdealSoil] = useState({
    ph: { min: 6.0, max: 7.0 },
    N: { min: 40, max: 60 },
    P: { min: 30, max: 50 },
    K: { min: 20, max: 40 },
    temp: { min: 20, max: 30 },
    hum: { min: 50, max: 70 },
    rain: { min: 100, max: 200 },
  });
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  const [desiredCrop, setDesiredCrop] = useState('');
  const navigate = useNavigate();
  const { state: { formData } = {} } = useLocation();

  // Function to parse the string output
  const parseStringOutput = (outputString) => {
    try {
      // Remove curly braces and split by commas to get key-value pairs
      const cleanedString = outputString.replace(/[{}"]/g, '');
      const pairs = cleanedString.split(',').map(item => item.trim());
      const parsedData = {};

      pairs.forEach(pair => {
        const [key, value] = pair.split(':').map(item => item.trim());
        if (key === 'Why Recommended') {
          parsedData.reason = value;
        } else {
          // Handle ranges like "5.5-6.5"
          const [min, max] = value.includes('-') ? value.split('-').map(Number) : [Number(value), Number(value)];
          parsedData[key] = { min, max };
        }
      });

      return parsedData;
    } catch (error) {
      console.error('Error parsing string output:', error);
      return {};
    }
  };

  const checkMatch = (param, value) => {
    const idealKey = param === 'nitrogen' ? 'N' : param === 'phosphorus' ? 'P' : param === 'potassium' ? 'K' : param;
    const range = idealSoil[idealKey];
    if (!range) return false;
    return value >= range.min && value <= range.max;
  };

  const paramMap = {
    ph: 'pH',
    nitrogen: 'Nitrogen',
    phosphorus: 'Phosphorus',
    potassium: 'Potassium',
    temp: 'Temperature',
    hum: 'Humidity',
    rain: 'Rainfall',
  };

  const handleSearch = () => {
    if (!desiredCrop) {
      alert('⚠️ Please enter a crop name first!');
      return;
    }
    navigate('/desire-crop', { state: { crop: desiredCrop, formData } });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        // Simulate API response with the provided string output
        const stringOutput = `"Why Recommended": "High yield and adaptability", "pH": 5.5-6.5, "N": 60-80, "P": 15-30, "K": 60-80, "Moisture": 80-100`;
        const parsedData = parseStringOutput(stringOutput);

        // Update idealSoil with parsed ranges
        setIdealSoil({
          ph: parsedData.pH || { min: 6.0, max: 7.0 },
          N: parsedData.N || { min: 40, max: 60 },
          P: parsedData.P || { min: 30, max: 50 },
          K: parsedData.K || { min: 20, max: 40 },
          Moisture: parsedData.Moisture || { min: 50, max: 70 },
        });

        // Update reason
        setReason(parsedData.reason || 'No reason provided');

        // Fetch details (unchanged, assuming API provides a string)
        const detailsResponse = await axios.get(`http://localhost:8000/ai/crop/details/${recoCrop}`);
        setDetails(detailsResponse.data.response);
      } catch (error) {
        console.error('Error fetching or parsing data:', error);
      }
    }
    fetchData();
  }, [recoCrop]);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 mt-20">
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

      {/* Recommended Crop Card */}
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
        <img
          src={wheatImage}
          alt="Wheat"
          className="w-full md:w-1/2 h-64 object-cover"
        />
        <div className="p-6 md:w-1/2 flex flex-col justify-between">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{recoCrop}</h2>
          <span className="inline-block bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
            Highly Recommended
          </span>
          <p className="text-gray-700 mb-2">{details}</p>
        </div>
      </div>

      {/* Scientific Reason Section */}
      {/* <div className="bg-white p-6 rounded-2xl shadow border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Why {recoCrop} is Recommended
        </h3>
        <p className="text-gray-700">{reason}</p>
      </div> */}

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
            {Object.keys(formData || {}).map((param) => {
              const displayName = paramMap[param] || param;
              const value = formData[param];
              const idealKey = param === 'nitrogen' ? 'N' : param === 'phosphorus' ? 'P' : param === 'potassium' ? 'K' : param;
              const ideal = idealSoil[idealKey];
              if (!ideal) return null;
              const isMatch = checkMatch(param, value);
              const optimalRange = `${ideal.min} - ${ideal.max}`;
              return (
                <tr key={param} className={isMatch ? 'bg-green-50' : 'bg-red-50'}>
                  <td className="border-b border-gray-200 p-2">{displayName}</td>
                  <td className="border-b border-gray-200 p-2">{value}</td>
                  <td className="border-b border-gray-200 p-2">{optimalRange}</td>
                  <td className="border-b border-gray-200 p-2">
                    {isMatch ? '✅ Match' : '❌ Not Match'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SoilRecommended;