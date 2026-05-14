import React from 'react';

function About() {
  return (
    <div>
      <div className="hero-section" style={{ padding: '2rem 0' }}>
        <h1>About Us</h1>
        <p>Learn more about our mission to simplify education management.</p>
      </div>
      <div className="content-card">
        <h3>Our Vision</h3>
        <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>
          EduManage is built to provide an easy-to-use platform for students and administrators. We aim to bridge the gap between educational institutions and simple digital workflows. This application demonstrates a functional UI with robust routing capabilities.
        </p>
      </div>
    </div>
  );
}

export default About;
