import React, { useState } from 'react';
import axios from 'axios';
import '../assets/css/Login.css'; // Import your CSS file for styling

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate email
    if (!validateEmail(email)) {
      newErrors.email = 'Email is not valid';
    }

    // Validate password
    if (!password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setLoading(true);
      setErrors({});
      try {
        const response = await axios.post('https://your-backend-api.com/login', {
          email,
          password,
        });
        console.log('Login successful:', response.data);
        // Handle successful login (e.g., store tokens, redirect, etc.)
      } catch (error) {
        console.error('Login error:', error);
        setErrors({ server: 'Invalid email or password. Please try again.' });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="labels">
            <label htmlFor="email">Email:</label>
            <label htmlFor="password">Password:</label>
          </div>
          <div className="inputs">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="error-messages">
          {errors.email && <p>{errors.email}</p>}
          {errors.password && <p>{errors.password}</p>}
          {errors.server && <p>{errors.server}</p>}
        </div>
        {loading ? <p>Loading...</p> : <button type="submit">Login</button>}
      </form>
    </div>
  );
};
