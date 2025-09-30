import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function DiseaseDetection() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  // File Upload Handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);

    stopCamera();
  };

  // Start Camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setCameraActive(true);
        setPreview(null);
        setSelectedFile(null);
      }
    } catch (err) {
      console.error("Camera error:", err);
      alert("Camera not accessible. Check HTTPS & permissions.");
    }
  };

  // Stop Camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
    setCameraActive(false);
  };

  // Capture Photo from Camera
  const handleCapture = () => {
    if (!videoRef.current) return;

    const width = videoRef.current.videoWidth;
    const height = videoRef.current.videoHeight;
    canvasRef.current.width = width;
    canvasRef.current.height = height;

    const ctx = canvasRef.current.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, width, height);

    canvasRef.current.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], "captured_image.png", { type: "image/png" });

      // Save captured file in state
      setSelectedFile(file);

      // Generate preview
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }, "image/png");

    stopCamera();
  };

  // Navigate to Disease Detail
  const handleDetect = () => {
    if (!selectedFile) {
      alert("⚠️ Please select or capture an image first!");
      return;
    }
    navigate("/disease-detail", { state: { file: selectedFile } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-50 p-4">
      <div className="max-w-4xl h-[550px] mx-auto bg-white rounded-2xl shadow-xl p-6 mt-20">
        <h1 className="text-3xl font-bold text-green-700 mb-8 text-center mt-10">
          🌱 Plant Disease Detection
        </h1>

        <div className="flex flex-col md:flex-row gap-6 mb-6">
          {/* Image Upload */}
          <div className="flex-1 p-4 border rounded-xl shadow-sm bg-green-50 flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-2">Upload Image</h2>

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mb-2 h-48 w-auto rounded-lg object-cover shadow-md"
              />
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-gray-600 border border-gray-300 rounded-lg cursor-pointer bg-white p-2 focus:outline-none"
            />
          </div>

          {/* Camera Capture */}
          <div className="flex-1 p-4 border rounded-xl shadow-sm bg-green-50 flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-2">Live Camera</h2>

            {!cameraActive && (
              <button
                onClick={startCamera}
                className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition mb-2"
              >
                Start Camera
              </button>
            )}

            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-48 rounded-lg object-cover mb-2 ${cameraActive ? "block" : "hidden"}`}
            />

            {cameraActive && (
              <div className="flex gap-2 mb-2">
                <button
                  onClick={handleCapture}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
                >
                  Capture
                </button>
                <button
                  onClick={stopCamera}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
                >
                  Stop
                </button>
              </div>
            )}

            {/* New Input field below camera to show captured image as file */}
            {selectedFile && (
              <div className="w-full mt-2">
                <label className="block text-gray-700 font-semibold mb-1">
                  Captured Image File:
                </label>
                <input
                  type="text"
                  readOnly
                  value={selectedFile.name}
                  className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100 cursor-not-allowed"
                />
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleDetect}
          className="w-full md:w-1/2 mx-auto block px-6 py-3 bg-green-700 text-white font-semibold rounded-lg shadow hover:bg-green-800 transition"
        >
          Detect Disease
        </button>

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}
