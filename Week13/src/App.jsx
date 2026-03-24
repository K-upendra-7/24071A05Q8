import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./App.css";

import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler
);

function App() {
  const apiKey = import.meta.env.VITE_WEATHERAPI;

  const { register, handleSubmit } = useForm();

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const [weather, setWeather] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState("");

  const fetchWeatherData = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
    const res = await fetch(url);

    if (!res.ok) throw new Error("City not found");
    return res.json();
  };

  const processData = (data) => {
    const segments = data.list.slice(0, 8);

    return {
      labels: segments.map((item) =>
        new Date(item.dt * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        })
      ),
      temps: segments.map((item) => item.main.temp),
      current: segments[0]
    };
  };

  const renderChart = (labels, temps) => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(chartRef.current, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Temperature (°C)",
            data: temps,
            borderWidth: 2,
            tension: 0.3,
            fill: true
          }
        ]
      }
    });
  };

  useEffect(() => {
    if (chartData) {
      renderChart(chartData.labels, chartData.temps);
    }
  }, [chartData]);

  useEffect(() => {
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  const handleSearch = async ({ city }) => {
    try {
      setError("");
      const data = await fetchWeatherData(city);
      const processed = processData(data);

      setWeather({
        city: data.city.name,
        temp: processed.current.main.temp,
        desc: processed.current.weather[0].description
      });

      setChartData({
        labels: processed.labels,
        temps: processed.temps
      });
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setChartData(null);
    }
  };

  return (
    <div className="app-container">
      <h1>Weather Graph</h1>

      <form onSubmit={handleSubmit(handleSearch)}>
        <input
          placeholder="Enter city"
          {...register("city", { required: true })}
        />
        <button type="submit">Get Weather</button>
      </form>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.city}</h2>
          <p>{Math.round(weather.temp)}°C</p>
          <p>{weather.desc}</p>

          <canvas ref={chartRef}></canvas>
        </div>
      )}
    </div>
  );
}

export default App;
