import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const WeatherChart = ({ forecastData }) => {
  if (!forecastData || !forecastData.list) return null;

  // Extract data for chart. Since it provides every 3 hours for 5 days, 
  // taking the next 8 points gives us a 24-hour forecast roughly.
  const dataPoints = forecastData.list.slice(0, 8);
  
  const labels = dataPoints.map(item => {
    const date = new Date(item.dt * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  });

  const temperatures = dataPoints.map(item => item.main.temp);

  const data = {
    labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: temperatures,
        borderColor: '#38bdf8',
        backgroundColor: 'rgba(56, 189, 248, 0.2)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#818cf8',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#f8fafc',
          font: {
            family: "'Inter', sans-serif"
          }
        }
      },
      title: {
        display: true,
        text: '24-Hour Temperature Forecast',
        color: '#f8fafc',
        font: {
          family: "'Inter', sans-serif",
          size: 16
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#fff',
        bodyColor: '#cbd5e1',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
      }
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#94a3b8',
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#94a3b8',
        }
      }
    }
  };

  return (
    <div className="glass-panel" style={{ height: '350px', marginTop: '1.5rem', position: 'relative' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default WeatherChart;
