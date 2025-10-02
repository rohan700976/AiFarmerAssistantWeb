import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import jwtDecode from 'jwt-decode';  // ✅ FIXED import

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [activities, setActivities] = useState([]);
  const [sensorData, setSensorData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/auth/login');
      return;
    }

    // Log dashboard view
    const logActivity = async () => {
      try {
        const decoded = jwtDecode(token); 
        await axios.post('http://localhost:3000/api/log-activity', {
          userId: decoded.userId,
          action: 'Viewed dashboard',
        });
      } catch (err) {
        console.error('Error logging activity:', err.message);
      }
    };
    logActivity();

    // Fetch activities
    const fetchActivities = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/activities', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setActivities(res.data);
      } catch (err) {
        console.error('Error fetching activities:', err.message);
      }
    };
    fetchActivities();

    // Fetch ThingSpeak data
    const fetchSensorData = async () => {
      try {
        const res = await axios.get(
          'https://api.thingspeak.com/channels/YOUR_CHANNEL_ID/feeds.json?api_key=YOUR_READ_API_KEY'
        );
        setSensorData(res.data.feeds || []);

        const decoded = jwtDecode(token);
        await axios.post('http://localhost:3000/api/log-activity', {
          userId: decoded.userId,
          action: `Viewed sensor data: ${res.data.feeds[0]?.field1 || 'N/A'}`,
        });
      } catch (err) {
        console.error('Error fetching sensor data:', err.message);
      }
    };

    // fetchSensorData();
  }, [navigate]);

  // ✅ Ensure numbers
  const chartData = {
    labels: sensorData.map(d => new Date(d.created_at).toLocaleTimeString()),
    datasets: [
      {
        label: 'Soil Moisture',
        data: sensorData.map(d => Number(d.field1) || 0),
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h2 className="text-2xl font-semibold">AI Farmer Assistant Dashboard</h2>
          <p className="mt-4">Welcome! Track your farming data here.</p>
          
          <h3 className="mt-6 text-lg font-semibold">Soil Moisture</h3>
          {sensorData.length > 0 ? (
            <Line data={chartData} />
          ) : (
            <p>No sensor data available.</p>
          )}
          
          <h3 className="mt-6 text-lg font-semibold">Activity Log</h3>
          <ul className="mt-2">
            {activities.map((activity, index) => (
              <li key={index} className="text-gray-700">
                {activity.action} at{' '}
                {activity.timestamp
                  ? new Date(activity.timestamp).toLocaleString()
                  : 'N/A'}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
