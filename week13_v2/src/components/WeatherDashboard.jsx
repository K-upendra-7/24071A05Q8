import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { fetchCurrentWeather, fetchForecast } from '../services/weatherService';
import CurrentWeather from './CurrentWeather';
import WeatherChart from './WeatherChart';

const WeatherDashboard = () => {
  const [city, setCity] = useState('London');
  const [searchInput, setSearchInput] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadData = async (cityName) => {
    if (!cityName) return;
    setLoading(true);
    setError(null);
    try {
      const [current, fore] = await Promise.all([
        fetchCurrentWeather(cityName),
        fetchForecast(cityName)
      ]);
      setCurrentWeather(current);
      setForecast(fore);
    } catch (err) {
      setError(err.message || 'Failed to load weather data. Please ensure you have configured a valid OpenWeatherMap API key.');
      setCurrentWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadData(city);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCity(searchInput.trim());
      loadData(searchInput.trim());
      setSearchInput('');
    }
  };

  return (
    <div style={{ maxWidth: '800px', width: '100vw', padding: '0 1rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Search Bar */}
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Enter city name..."
          style={{
            flex: 1,
            padding: '1rem 1.5rem',
            borderRadius: '2rem',
            border: '1px solid rgba(255,255,255,0.2)',
            background: 'rgba(15, 23, 42, 0.6)',
            color: '#fff',
            fontSize: '1rem',
            outline: 'none',
            backdropFilter: 'blur(8px)'
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '0 1.5rem',
            borderRadius: '2rem',
            border: 'none',
            background: 'var(--accent)',
            color: '#0f172a',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            transition: 'background 0.3s ease'
          }}
        >
          <Search size={20} />
        </button>
      </form>

      {/* States */}
      {loading && <div style={{ textAlign: 'center', color: 'var(--accent)', padding: '2rem' }}>Loading weather data...</div>}
      
      {error && (
        <div style={{ 
          padding: '1rem', 
          background: 'rgba(239, 68, 68, 0.2)', 
          border: '1px solid rgba(239, 68, 68, 0.5)',
          borderRadius: '1rem',
          color: '#f87171',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}

      {/* Main Content */}
      {!loading && !error && currentWeather && forecast && (
        <>
          <CurrentWeather data={currentWeather} />
          <WeatherChart forecastData={forecast} />
        </>
      )}

    </div>
  );
};

export default WeatherDashboard;
