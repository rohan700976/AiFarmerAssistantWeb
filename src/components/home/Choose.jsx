import React from 'react'
import { motion } from 'framer-motion'
// import images if needed

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
  hover: { 
    scale: 1.05, 
    y: -5, 
    boxShadow: "0 15px 40px rgba(0,255,162,0.4)",
    rotate: 1,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

const Choose = () => {
  const cards = [
    {
      "title": "AI-Powered Disease Detection",
    "desc": "Quickly identify crop diseases using advanced AI image recognition, reducing crop loss and ensuring timely treatment.",
      bg: "#14532d", // dark green
    },
    {
       "title": "Accurate Soil Analysis",
    "desc": "Get detailed insights into soil health, nutrients, and moisture levels to improve productivity and choose the right fertilizers.",
      bg: "#166534", // medium green
    },
    {
      "title": "24/7 AI Chatbot Support",
    "desc": "Farmers can ask questions anytime and get instant guidance about crops, farming techniques, and market updates.",
      bg: "#14532d",
    },
    {
       "title": "Real-Time Weather Forecasting",
    "desc": "Access hyper-local and accurate weather predictions to plan irrigation, harvesting, and protect crops from climate risks.",
      bg: "#166534",
    },
    {
      "title": "Smart & Affordable Solutions",
    "desc": "Our platform combines cutting-edge AI with cost-effective tools, making modern farming accessible for every farmer.",
      bg: "#14532d",
    },
    {
      title: "Freelancers with a Company Mindset",
      desc: "We combine the affordability of freelancers with the professionalism of an agency.",
      bg: "#166534",
    }
  ];

  return (
    <section className="bg-gray-50 overflow-hidden text-white">
      <div className="px-8 mx-auto max-w-7xl sm:px-6 lg:px-18 lg:mb-27 mb-7">
        <div className="text-center">
          <h2 className="relative text-3xl sm:text-5xl md:text-2xl lg:text-5xl font-serif font-bold mb-5 mt-4 text-green-600">
            WHY CHOOSE US ??
          </h2>
        </div>

        <div className="grid grid-cols-2 pt-5 text-center h-auto md:grid-cols-3 xl:mt-8 md:h-120 xl:h-120 gap-4">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="relative group rounded-2xl border border-green-700 shadow-[0_8px_30px_rgba(0,255,162,0.2)] p-8 flex flex-col items-center text-center cursor-pointer"
              style={{ backgroundColor: card.bg }}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              whileTap="hover"
              viewport={{ once: true, amount: 0.3 }}
            >
              <h3 className="mt-4 text-lg font-semibold text-green-400 font-pj">{card.title}</h3>
              <p className="mt-3 text-sm font-pj hidden md:block">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Choose
