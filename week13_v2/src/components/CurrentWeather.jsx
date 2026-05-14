import React from 'react';
import { Droplets, Wind, Thermometer, Cloud } from 'lucide-react';

const CurrentWeather = ({ data }) => {
  if (!data) return null;

  const { name, main, weather, wind } = data;
  const { temp, humidity, feels_like, temp_min, temp_max } = main;
  const condition = weather[0];

  return (
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{name}</h2>
          <p style={{ color: 'var(--text-muted)', textTransform: 'capitalize' }}>{condition.description}</p>
        </div>
        <img 
          src={`https://openweathermap.org/img/wn/${condition.icon}@2x.png`} 
          alt={condition.main} 
          style={{ width: '80px', height: '80px', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.2))' }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 'bold', margin: 0 }}>{Math.round(temp)}°</h1>
        <span style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>C</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Droplets size={20} color="var(--accent)" />
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Humidity</div>
            <div style={{ fontWeight: 'bold' }}>{humidity}%</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Wind size={20} color="var(--accent)" />
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Wind</div>
            <div style={{ fontWeight: 'bold' }}>{wind.speed} m/s</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Thermometer size={20} color="var(--accent)" />
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Feels Like</div>
            <div style={{ fontWeight: 'bold' }}>{Math.round(feels_like)}°C</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Cloud size={20} color="var(--accent)" />
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>High / Low</div>
            <div style={{ fontWeight: 'bold' }}>{Math.round(temp_max)}°C / {Math.round(temp_min)}°C</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
