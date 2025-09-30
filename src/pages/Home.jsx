import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Contact from '../components/home/Contact';
import About from '../components/home/About';
import Hero from '../components/home/Hero';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testamonials';
import Choose from '../components/home/Choose';
import FarmingSolutions from './FarmingSolutions';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Yojana from '../components/home/Yojana';
import FarmerGrowthChart from '../components/home/FarmerGrowthChart';

function Home() {
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/auth/login'); // Redirect to login if not authenticated
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        setMessage('Error fetching profile: ' + (err.response?.data.message || err.message));
        localStorage.removeItem('token');
        navigate('/auth/login');
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setMessage('Logged out successfully');
    setDropdownOpen(false);
    navigate('/auth/login');
  };

  // Only render profile-related UI if authenticated (token exists)
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <div className="min-h-screen bg-gray-100">
      {isAuthenticated }

      <div className={isAuthenticated ? 'pt-16' : ''}> {/* Padding only if profile button is shown */}
        <Hero />
        <br />
        <FarmingSolutions />
        <Choose />
        <Yojana />
        <FarmerGrowthChart />
        <Contact />
        <Testimonials />
      </div>

      {message && (
        <div className="text-center mt-4">
          <p className={`text-center ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        </div>
      )}
    </div>
  );
}

export default Home;