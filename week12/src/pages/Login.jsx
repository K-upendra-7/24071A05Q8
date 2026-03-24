import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="container">
      <h1>Login</h1>
      <form>
        <div className="form-group">
          <label>Email Address:</label>
          <input type="email" name="email" placeholder="Enter your email" />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" placeholder="Enter your password" />
        </div>
        <button type="submit">Sign In</button>
      </form>
      <div className="links">
        Don't have an account? <Link to="/register">Register</Link>
      </div>
    </div>
  );
}
