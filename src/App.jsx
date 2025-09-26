import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/public/Layout'
import Home from './pages/Home'
import Contact from './components/home/Contact'
import About from './components/home/About'
import Hero from './components/home/Hero'
import HowItWorks from './components/home/HowItWorks'
import Testimonials from './components/home/Testamonials'
import Choose from './components/home/Choose'   // ✅ Fixed uppercase
import SoilDetection from "./components/home/Soil-Detection";
import MarketPrice from "./components/home/MarketPrice";
import Diseasedetection from "./components/home/Disease-Detection";
import Weather from './pages/Weather'
import SoilRecommended from './services/SoilRecommended'
import FarmerChatbot from './services/FarmerChatBot'
import DesireCrop from './services/DesireCrop'
import DiseaseDetails from './pages/DiseaseDetails'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
         
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="choose" element={<Choose />} />
          <Route path="howitworks" element={<HowItWorks />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="hero" element={<Hero />} />
          <Route path="/soil-detection" element={<SoilDetection />} />
          <Route path="contact" element={<Contact />} />
          <Route path="/market-price" element={<MarketPrice/>} />
          <Route path="/disease-detection" element={<Diseasedetection/>} />
          <Route path='/weather' element={<Weather/>}/>
          <Route path='/result/:recoCrop' element={<SoilRecommended/>}/>
          <Route path='/ai-chatbot' element={<FarmerChatbot/>}/>
          <Route path='desire-crop' element={<DesireCrop/>}/>
          <Route path='/disease-detail' element={<DiseaseDetails/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
