import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SoilDetection() {
  const [activeTab, setActiveTab] = useState("image");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const[recoCrop, setRecoCrop] = useState([]);
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

    const handleSoilDetection = async () => {
  try {
    const response = await axios.post(`http://localhost:8000/ai/soil/crop/recommendation`, {
      N: formData.nitrogen,
      P: formData.phosphorus,
      K: formData.potassium,
      temp: formData.temp,
      hum: formData.hum,
      ph: formData.ph,
      rain: formData.rain,
    });

    if (response.status === 200) {
      // console.log("Raw:", response.data.response);
      // console.log("Type before parsing:", Object.prototype.toString.call(response.data.response));

      // ✅ Convert string to array
      let reco = response.data.response;
      if (typeof reco === "string") {
        try {
          reco = JSON.parse(reco);
        } catch (e) {
          console.error("Invalid JSON format from backend:", reco);
        }
      }

      // console.log("Type after parsing:", Object.prototype.toString.call(reco)); // should be [object Array]
      // console.log("Parsed array:", reco);

      setRecoCrop(reco);
      // console.log(recoCrop[3]);
      navigate("/result", { state: { recoCrop: reco, formData } });
    }
  } catch (error) {
    console.error(error);
  }
};

const handleDetect = (recoCrop) => {
  navigate(`/result/${recoCrop}`, { state: { formData } });
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
  };

  // Fake Detection (Replace with API/ML model)
  // const handleDetect = (type) => {
  //   if (type === "image" && selectedFile) {
  //     setResult("📷 Soil detected from Image: Black Soil 🌱 (Best for Cotton & Oilseeds)");
  //   } else if (type === "form") {
  //     const { ph, nitrogen, phosphorus, potassium, moisture } = formData;
  //     if (!ph || !nitrogen || !phosphorus || !potassium || !moisture) {
  //       alert("⚠️ Please fill all form fields!");
  //       return;
  //     }
  //     setResult(
  //       `🧪 Soil detected from Data Input:
  //       - pH: ${ph}
  //       - Nitrogen: ${nitrogen}
  //       - Phosphorus: ${phosphorus}
  //       - Potassium: ${potassium}
  //       - Moisture: ${moisture}
  //       👉 Likely Soil Type: Alluvial Soil (Best for Wheat & Rice)`
  //     );
  //   } else {
  //     alert("Please provide input first!");
  //   }
  // };

  return (
    <div className="min-h-screen bg-green-50  flex flex-col items-center pt-30 px-4 ">
      <h1 className="text-3xl font-bold text-green-700  mb-8">
        Soil Detection
      </h1>

      {/* Toggle Tabs */}
      <div className="flex border rounded-xl overflow-hidden mb-6">
        <button
          onClick={() => setActiveTab("image")}
          className={`px-6 py-3 text-sm font-medium transition ${
            activeTab === "image"
              ?   "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          AI Image Analysis
        </button>
        <button
          onClick={() => setActiveTab("form")}
          className={`px-6 py-3 text-sm font-medium transition ${
            activeTab === "form"
              ?   "bg-green-600 text-white"
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
              <input
                type="number"
                name="ph"
                value={formData.ph}
                onChange={handleChange}
                placeholder="pH Value"
                className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-green-300  text-gray-950"
              />
              <input
                type="number"
                name="nitrogen"
                value={formData.nitrogen}
                onChange={handleChange}
                placeholder="Nitrogen Level"
                className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-green-300  text-gray-950"
              />
              <input
                type="number"
                name="phosphorus"
                value={formData.phosphorus}
                onChange={handleChange}
                placeholder="Phosphorus Level"
                className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-green-300  text-gray-950"
              />
              <input
                type="number"
                name="potassium"
                value={formData.potassium}
                onChange={handleChange}
                placeholder="Potassium Level"
                className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-green-300  text-gray-950"
              />
              <input
                type="number"
                name="temp"
                value={formData.temp}
                onChange={handleChange}
                placeholder="Temperature (°C)"
                className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-green-300  text-gray-950"
              />
              <input
                type="number"
                name="hum"
                value={formData.hum}
                onChange={handleChange}
                placeholder="Humidity (%)"
                className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-green-300  text-gray-950"
              />
              <input
                type="number"
                name="rain"
                value={formData.rain}
                onChange={handleChange}
                placeholder="Rainfall (mm)"
                className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-green-300  text-gray-950"
              />
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