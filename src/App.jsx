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
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
