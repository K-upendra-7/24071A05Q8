import React, { useState } from 'react';

function Contact() {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent successfully!');
    setMessage('');
  };

  return (
    <div>
      <div className="hero-section" style={{ padding: '2rem 0' }}>
        <h1>Contact Us</h1>
        <p>Have questions? We would love to hear from you.</p>
      </div>
      <div className="auth-card" style={{ maxWidth: '600px' }}>
        <h2>Send a Message</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" className="form-input" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" className="form-input" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" className="form-input" rows="4" value={message} onChange={e => setMessage(e.target.value)} required style={{ resize: 'vertical' }}></textarea>
          </div>
          <button type="submit" className="btn">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
