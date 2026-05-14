import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="hero-section">
      <h1>Welcome to EduManage</h1>
      <p>A modern, efficient, and simple student management system to handle your academic administrative tasks seamlessly.</p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
        <Link to="/register" className="btn" style={{ width: 'auto', padding: '0.75rem 2rem' }}>Get Started</Link>
        <Link to="/login" className="btn" style={{ width: 'auto', padding: '0.75rem 2rem', backgroundColor: 'transparent', border: '1px solid var(--primary-color)' }}>Login</Link>
      </div>
    </div>
  );
}

export default Home;
