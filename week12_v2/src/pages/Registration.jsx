import React, { useState } from 'react';

function Registration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    course: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Registration submitted temporarily! Form logic goes here.');
  };

  return (
    <div className="auth-card">
      <h2>Student Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" name="name" className="form-input" required onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" name="email" className="form-input" required onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="course">Course</label>
          <input type="text" id="course" name="course" className="form-input" required onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" className="form-input" required onChange={handleChange} />
        </div>
        <button type="submit" className="btn">Register</button>
      </form>
    </div>
  );
}

export default Registration;
