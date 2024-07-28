import React, { useState } from 'react';
import axios from 'axios';
import '../assets/css/SignUp.css';

export const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateName = (name) => {
    const nameRegex = /^[A-Za-z]+$/;
    return nameRegex.test(name);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const errors = {};
    if (password.length < 8) {
      errors.length = 'Password must be at least 8 characters long';
    }
    if (!/[A-Z]/.test(password)) {
      errors.uppercase = 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(password)) {
      errors.lowercase = 'Password must contain at least one lowercase letter';
    }
    if (!/[0-9]/.test(password)) {
      errors.number = 'Password must contain at least one number';
    }
    if (!/[!@#$%^&*]/.test(password)) {
      errors.specialCharacter = 'Password must contain at least one special character';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate first name
    if (!validateName(firstName)) {
      newErrors.firstName = 'First name must contain only letters';
    }

    // Validate last name
    if (!validateName(lastName)) {
      newErrors.lastName = 'Last name must contain only letters';
    }

    // Validate email
    if (!validateEmail(email)) {
      newErrors.email = 'Email is not valid';
    }

    // Validate password
    const passwordErrors = validatePassword(password);
    if (Object.keys(passwordErrors).length > 0) {
      Object.assign(newErrors, passwordErrors);
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setLoading(true);
      setErrors({});
      try {
        const response = await axios.post('https://your-backend-api.com/register', {
          firstName,
          lastName,
          email,
          password,
        });
        setSuccess(true);
      } catch (error) {
        if (error.response && error.response.data.message) {
          setErrors({ server: error.response.data.message });
        } else {
          setErrors({ server: 'An error occurred during registration. Please try again.' });
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {success ? (
        <div className="success-message">Registration successful! Please check your email for confirmation.</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="labels">
              <label htmlFor="firstName">First Name:</label>
              <label htmlFor="lastName">Last Name:</label>
              <label htmlFor="email">Email (Username):</label>
              <label htmlFor="password">Password:</label>
              <label htmlFor="confirmPassword">Confirm Password:</label>
            </div>
            <div className="inputs">
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
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
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="error-messages">
            {errors.firstName && <p>{errors.firstName}</p>}
            {errors.lastName && <p>{errors.lastName}</p>}
            {errors.email && <p>{errors.email}</p>}
            {errors.length && <p>{errors.length}</p>}
            {errors.uppercase && <p>{errors.uppercase}</p>}
            {errors.lowercase && <p>{errors.lowercase}</p>}
            {errors.number && <p>{errors.number}</p>}
            {errors.specialCharacter && <p>{errors.specialCharacter}</p>}
            {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
            {errors.server && <p>{errors.server}</p>}
          </div>
          {loading ? <p>Loading...</p> : <button type="submit">Sign Up</button>}
        </form>
      )}
    </div>
  );
};

