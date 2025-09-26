import React from "react";
import { motion } from "framer-motion";
import { Printer, Clipboard, Share2 } from "lucide-react";

export default function DiseaseDetails() {
  const disease = {
    name: "Leaf Spot Disease",
    plant: "Tomato",
    severity: "Medium",
    images: [
      "https://tse4.mm.bing.net/th/id/OIP.p61Je7c2hrfYFwVG1Pn8bQHaHa?pid=Api&P=0&h=180", // simple image
      "https://tse4.mm.bing.net/th/id/OIP.p61Je7c2hrfYFwVG1Pn8bQHaHa?pid=Api&P=0&h=180", // symptom highlight image
    ],
    cause:
      "Usually caused by fungal pathogens (e.g. Alternaria, Cercospora). Favorable conditions are warm, wet, and humid weather; spread occurs by water splash, wind, and contaminated tools.",
    symptoms: [
      "Small brown or black spots on leaves",
      "Yellow halo surrounding spots",
      "Premature leaf yellowing and defoliation",
    ],
    treatmentSteps: [
      {
        title: "Sanitation — remove infected tissue",
        description:
          "Carefully remove and dispose (do not compost) heavily infected leaves and plant debris to reduce the source of spores.",
      },
      {
        title: "Improve microclimate",
        description:
          "Increase spacing between plants, prune lower leaves, and improve airflow so leaf surfaces dry faster after rain or irrigation.",
      },
      {
        title: "Change watering practices",
        description:
          "Avoid overhead/watering that wets the foliage. Use drip irrigation or water at the base early in the morning.",
      },
      {
        title: "Apply appropriate fungicide",
        description:
          "Use copper-based fungicides or a registered product for your crop—follow label rates and rotate modes of action to avoid resistance.",
      },
      {
        title: "Monitor and repeat",
        description:
          "Inspect regularly; retreat according to product label and remove new infected tissue promptly.",
      },
    ],
    preventionTips: [
      "Rotate crops to non-host plants",
      "Use disease-resistant varieties when available",
      "Seed and seedling health: buy certified seed",
      "Sanitize tools between plants",
    ],
  };

  const severityClasses = {
    Low: "bg-green-50 text-green-800 ring-green-200",
    Medium: "bg-yellow-50 text-yellow-800 ring-yellow-200",
    High: "bg-red-50 text-red-800 ring-red-200",
  }[disease.severity];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center p-6 mt-12">
      <motion.article
        role="article"
        aria-labelledby="disease-title"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full bg-white rounded-2xl shadow-2xl md:p-8 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Left: images + prevention */}
        <div className="space-y-8">
          {/* First image */}
          <div className="relative rounded-xl overflow-hidden">
            <img
              src={disease.images[0]}
              alt="simple view"
              className="w-full h-64  border"
            />
            <div
              className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold ring-1 ${severityClasses}`}
            >
              Severity: {disease.severity}
            </div>
          </div>

          {/* Second image with symptom markers */}
          <div className="relative rounded-xl overflow-hidden">
            <img
              src={disease.images[1]}
              alt="symptom view"
              className="w-full h-64  border"
            />
            {/* Example markers (can customize coordinates) */}
            <div className="absolute top-12 left-16">
              <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
              <span className="absolute left-6 top-0 text-xs bg-red-500 text-white px-1 rounded">
                Spot
              </span>
            </div>
            <div className="absolute bottom-10 right-20">
              <div className="w-4 h-4 bg-yellow-500 rounded-full border-2 border-white"></div>
              <span className="absolute left-6 top-0 text-xs bg-yellow-500 text-white px-1 rounded">
                Yellow halo
              </span>
            </div>
          </div>

          {/* Prevention below image 2 */}
          <section>
            <h2 className="text-lg font-semibold text-green-700">Prevention</h2>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {disease.preventionTips.map((tip, idx) => (
                <div
                  key={idx}
                  className="text-sm px-3 py-2 bg-green-50 rounded-lg shadow-sm"
                >
                  {tip}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right: details with treatment */}
        <div className="space-y-4 flex flex-col">
          <header>
            <h1
              id="disease-title"
              className="text-3xl font-extrabold text-green-800"
            >
              {disease.name}
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              A concise, actionable guide to recognize and treat this disease.
            </p>
          </header>

          <section>
            <h2 className="text-lg font-semibold text-green-700">Cause</h2>
            <p className="mt-2 text-gray-700 leading-relaxed">
              {disease.cause}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-green-700">Symptoms</h2>
            <ul className="mt-2 list-disc list-inside text-gray-700 space-y-1">
              {disease.symptoms.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </section>

          <section className="mt-2">
            <h2 className="text-lg font-semibold text-green-700">
              Treatment — Step by step
            </h2>
            <div className="grid gap-4 mt-3">
              {disease.treatmentSteps.map((step, i) => (
                <div
                  key={i}
                  className="p-4 bg-green-50 border border-green-100 rounded-xl shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex-none w-8 h-8 rounded-full bg-green-200 text-green-800 font-bold flex items-center justify-center">
                      {i + 1}
                    </div>
                    <div className="font-semibold text-green-900">
                      {step.title}
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </motion.article>
    </div>
  );
}
