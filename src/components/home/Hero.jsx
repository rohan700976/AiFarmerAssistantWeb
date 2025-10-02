import React from "react";
import heroVideo from "../../assets/hero/hero.mp4";
import { motion } from "framer-motion";

function Hero() {
  return (
    <div className="relative h-screen w-full overflow-hidden border border-red-500">
      {/* Background Video */}
      <video
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/50 px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Main Title */}
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Your Smart Farming Companion
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-semibold mt-3 sm:mt-4 md:mt-5 px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          Anytime, Anywhere
        </motion.h2>

        {/* Paragraph */}
        <motion.p
          className="mt-4 sm:mt-6 md:mt-8 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-base sm:text-lg leading-relaxed px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          Empowering farmers with AI-driven crop advisory, real-time weather
          insights, pest diagnosis, market prices, and sustainable farming
          practices across India.
        </motion.p>
      </div>
    </div>
  );
}

export default Hero;