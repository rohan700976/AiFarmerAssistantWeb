import React from "react";
import heroVideo from "../../assets/hero/hero.mp4";
import { motion } from "framer-motion";

function Hero() {
  return (
    <div className="relative h-screen w-[455px] overflow-hidden md:w-full border border-red-500 ">
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
      <div className="absolute  inset-0 flex flex-col items-center justify-center text-center text-white bg-black/50 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Main Title */}
        <motion.h1
          className="text-3xl sm:text-3xl md:text-3xl lg:text-5xl  font-bold leading-tight tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Your Smart Farming Companion
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          className="text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold mt-2 sm:mt-3 md:mt-4 lg:mt-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          Anytime, Anywhere
        </motion.h2>

        {/* Paragraph */}
        <motion.p
          className="mt-3 sm:mt-4 md:mt-6 lg:mt-8 max-w-[90%] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl text-lg sm:text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed"
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