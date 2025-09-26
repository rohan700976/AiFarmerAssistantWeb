import React, { useState, useEffect } from 'react';
import wheatImage from '../assets/images/wheatImage.jpg';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function SoilRecommended() {
  const location = useLocation(); 
const { recoCrop = [], formData = {} } = location.state || {};
  console.log(recoCrop);
  const [defination, setDefination] = useState('');
  const [cropsData, setCropsData] = useState([]);
  const [soilData, setSoilData] = useState([]);
  const [details, setDetails] = useState('');
  const [desiredCrop, setDesiredCrop] = useState('');
  const navigate = useNavigate();

  const handleCrop = async () =>{
    try {
      const defination = await axios.get(`${import.meta.env.VITE_URL}/ai/crop/details/${recoCrop[0]}`);
      if(defination.status == 200){
        console.log("Raw:", defination.data.response);
      console.log("Type before parsing:", Object.prototype.toString.call(defination.data.response));
      setDefination(defination.data.response);
      }

      const soil_param = await axios.get(`${import.meta.env.VITE_URL}/ai/crop/soil_comparison/${recoCrop[0]}`);
      if(soil_param.status == 200){
        console.log("raw:", soil_param.data.response);
          const parsed = parseMarkdownTable(soil_param.data.response);
          setSoilData(parsed);
      }
    } catch (error) {
      console.error(error);
      
    }
  } 


  function parseMarkdownTable(markdown) {
  const lines = markdown.trim().split("\n");

  // First line = headers
  const headers = lines[0].split("|").map(h => h.trim()).filter(Boolean);

  // Baaki rows
  const rows = lines.slice(2).map(line =>
    line.split("|").map(cell => cell.trim()).filter(Boolean)
  );

  // Convert to array of objects
  return rows.map(row => {
    const obj = {};
    headers.forEach((header, i) => {
      obj[header] = row[i];
    });
    return obj;
  });
}


  useEffect(() => {
    handleCrop();
  },[]);

  const handleSearch = () => {
    if (!desiredCrop) {
      alert('⚠️ Please enter a crop name first!');
      return;
    }
    navigate('/desire-crop', { state: { crop: desiredCrop, formData } });
  };

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
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{recoCrop[0]}</h2>
          <span className="inline-block bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
            Highly Recommended
          </span>
          <p className="text-gray-700 mb-2">{defination}</p>
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
    </div>
  );
}

export default SoilRecommended;