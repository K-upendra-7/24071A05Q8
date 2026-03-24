import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <div className="container">
      <h1>Register</h1>
      <form>
        <div className="form-group">
          <label>Full Name:</label>
          <input type="text" name="fullName" placeholder="Enter your full name" />
        </div>
        <div className="form-group">
          <label>Roll Number:</label>
          <input type="text" name="rollNo" placeholder="Enter your roll number" />
        </div>
        <div className="form-group">
          <label>Email Address:</label>
          <input type="email" name="email" placeholder="Enter your email" />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" placeholder="Create a password" />
        </div>
        <button type="submit">Create Account</button>
      </form>
      <div className="links">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
