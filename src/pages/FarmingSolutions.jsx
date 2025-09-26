import React from "react";
import { motion } from "framer-motion";
import ServiceCard from "../components/cards/ServiceCard";

const serviceData = [
  {
    name: "Crop Advisory with AI",
    description: "Get AI-powered guidance for crop planning, cultivation, and yield optimization.",
    image: "https://unpkg.com/lucide-static/icons/sprout.svg",
  },
  {
    name: "Weather Forecasting",
    description: "Receive hyperlocal weather updates to make timely farming decisions.",
    image: "https://unpkg.com/lucide-static/icons/cloud-snow.svg",
  },
  {
    name: "Soil Detection",
    description: "Analyze your soil for pH, nutrients, and moisture for better crop health.",
    image: "https://unpkg.com/lucide-static/icons/test-tube.svg",
  },
  {
    name: "Disease Detection",
    description: "Detect crop diseases and get recommendations for organic and chemical treatments.",
    image: "https://unpkg.com/lucide-static/icons/stethoscope.svg",
  },
  {
    name: "Market Price",
    description: "Check the latest market prices for crops to maximize your profits.",
    image: "https://unpkg.com/lucide-static/icons/bar-chart-2.svg",
  },
  {
    name: "Chat with AI",
    description: "Interact with an AI assistant to get answers and guidance for farming queries.",
    image: "https://unpkg.com/lucide-static/icons/message-square.svg",
  },
];

function FarmingSolutions() {
  return (
    <div className="max-w-full ">
      {/* Header Section */}
      <div className="text-center bg-gray-50">
        <div className="flex items-center justify-center space-x-2 mb-4 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="lucide lucide-sparkles h-6 w-6 text-green-600 animate-pulse"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
            <path d="M5 3v4"></path>
            <path d="M19 17v4"></path>
            <path d="M3 5h4"></path>
            <path d="M17 19h4"></path>
          </svg>
          <span className="text-green-600 font-semibold text-xl">
            Complete Solutions
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="lucide lucide-sparkles h-6 w-6 text-green-600 animate-pulse"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
            <path d="M5 3v4"></path>
            <path d="M19 17v4"></path>
            <path d="M3 5h4"></path>
            <path d="M17 19h4"></path>
          </svg>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Complete Farming Solutions
        </h2>
        <p className="text-xl text-green-700 max-w-3xl mx-auto ">
          From seed to harvest, DigiShivar AI provides comprehensive support for
          every aspect of modern agriculture
        </p>
      </div>

      {/* Services Grid with Motion */}
      {/* <div className=" bg-amber-400  "> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-30 py-10 mt-0 bg-gray-50" >
        {serviceData.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, y: -12, rotate: 1 }}
            whileTap={{ scale: 1.05, y: -12, rotate: 1 }}
             className=""
          >
            <ServiceCard
              name={item.name}
              description={item.description}
              image={item.image}
            />
          </motion.div>
        ))}
      </div>
      {/* </div> */}

      {/* CTA Section */}
      {/* <div className="mt-20 relative">
        <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 rounded-3xl p-8 text-center text-white relative overflow-hidden">
          
        </div>
      </div> */}
    </div>
  );
}

export default FarmingSolutions;
