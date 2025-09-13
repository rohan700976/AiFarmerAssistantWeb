import React from "react";
import heroVideo from "../../assets/hero/hero.mp4";
import { motion } from "framer-motion";

function Hero() {
  return (
    <div className="relative h-screen w-full">
      {/* Background Video */}
      <video
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-screen object-cover"
      />

      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/30">
       
        <motion.h1
          className="text-4xl md:text-6xl font-bold mt-30 "
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Your Smart Farming Companion
        </motion.h1>

     
        <motion.h2
          className="text-2xl md:text-4xl font-semibold mt-4 "
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          Anytime, Anywhere
        </motion.h2>

 
        <motion.p
          className="mt-6 max-w-2xl text-lg md:text-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
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