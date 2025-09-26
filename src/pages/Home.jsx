import React from 'react'
import Contact from '../components/home/Contact'
import About from '../components/home/About'
import Hero from '../components/home/Hero'
import HowItWorks from '../components/home/HowItWorks'
import Testimonials from '../components/home/Testamonials'
import Choose from '../components/home/Choose'
import FarmingSolutions from './FarmingSolutions'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'



function Home() {
  
  return (
    <div className=''>
      <Hero/>
       <br />
      
      <FarmingSolutions/>
      {/* <About/> */}
      <Choose/>
      {/* <HowItWorks/> */}
      <Contact/>
      
      <Testimonials/>
    </div>
  )
}

export default Home