import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SoilDetection() {
  const [formData, setFormData] = useState({
    ph: "7.0", 
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temp: "",
    hum: "",
    rain: "",
  });

  const [errors, setErrors] = useState({});
  const [result, setResult] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    let newErrors = {};

    if (!formData.ph || formData.ph < 4.5 || formData.ph > 9.0)
      newErrors.ph = "pH must be between 4.5 and 9.0";

    if (!formData.nitrogen || formData.nitrogen < 10 || formData.nitrogen > 120)
      newErrors.nitrogen = "Nitrogen must be between 10 and 120";

    if (!formData.phosphorus || formData.phosphorus < 5 || formData.phosphorus > 90)
      newErrors.phosphorus = "Phosphorus must be between 5 and 90";

    if (!formData.potassium || formData.potassium < 10 || formData.potassium > 150)
      newErrors.potassium = "Potassium must be between 10 and 150";

    if (!formData.temp || formData.temp < 5 || formData.temp > 50)
      newErrors.temp = "Temperature must be between 5 and 50 °C";

    if (!formData.hum || formData.hum < 10 || formData.hum > 100)
      newErrors.hum = "Humidity must be between 10 and 100 %";

    if (!formData.rain || formData.rain < 50 || formData.rain > 3000)
      newErrors.rain = "Rainfall must be between 50 and 3000 mm";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDetectFromData = async () => {
    if (!validateForm()) return;

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
          } catch {
            console.error("Invalid JSON format from backend:", reco);
          }
        }
        setResult(JSON.stringify(reco, null, 2));
        navigate("/result", { state: { recoCrop: reco, formData } });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center pt-20 px-4">
      <h1 className="text-3xl font-bold text-green-700 mb-8">Soil Detection</h1>

      <div className="w-full max-w-3xl bg-white border border-green-600 shadow-lg rounded-xl p-8">
        {/* FORM INPUT SECTION */}
        <form className="space-y-4 text-left">
          <input
            type="number"
            name="ph"
            value={formData.ph}
            onChange={handleChange}
            placeholder="pH (4.5 - 9.0)"
            min="4.5"
            max="9.0"
            step="0.1"
            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-green-300"
          />
          {errors.ph && <p className="text-red-600 text-sm">{errors.ph}</p>}

          <input
            type="number"
            name="nitrogen"
            value={formData.nitrogen}
            onChange={handleChange}
            placeholder="Nitrogen (10 - 120)"
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.nitrogen && <p className="text-red-600 text-sm">{errors.nitrogen}</p>}

          <input
            type="number"
            name="phosphorus"
            value={formData.phosphorus}
            onChange={handleChange}
            placeholder="Phosphorus (5 - 90)"
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.phosphorus && <p className="text-red-600 text-sm">{errors.phosphorus}</p>}

          <input
            type="number"
            name="potassium"
            value={formData.potassium}
            onChange={handleChange}
            placeholder="Potassium (10 - 150)"
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.potassium && <p className="text-red-600 text-sm">{errors.potassium}</p>}

          <input
            type="number"
            name="temp"
            value={formData.temp}
            onChange={handleChange}
            placeholder="Temperature (5 - 50 °C)"
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.temp && <p className="text-red-600 text-sm">{errors.temp}</p>}

          <input
            type="number"
            name="hum"
            value={formData.hum}
            onChange={handleChange}
            placeholder="Humidity (10 - 100 %)"
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.hum && <p className="text-red-600 text-sm">{errors.hum}</p>}

          <input
            type="number"
            name="rain"
            value={formData.rain}
            onChange={handleChange}
            placeholder="Rainfall (50 - 3000 mm)"
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.rain && <p className="text-red-600 text-sm">{errors.rain}</p>}
        </form>

        <button
          onClick={handleDetectFromData}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition"
        >
          Detect from Data
        </button>
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
