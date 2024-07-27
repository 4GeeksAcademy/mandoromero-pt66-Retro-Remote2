import React, { useState } from 'react';

export const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const passwordErrors = validatePassword(password);
    if (password !== confirmPassword) {
      passwordErrors.confirmPassword = 'Passwords do not match';
    }
    if (Object.keys(passwordErrors).length > 0) {
      setErrors(passwordErrors);
    } else {
      // Handle successful form submission
      console.log('Form submitted', { firstName, lastName, email, password });
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
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
          {errors.length && <p>{errors.length}</p>}
          {errors.uppercase && <p>{errors.uppercase}</p>}
          {errors.lowercase && <p>{errors.lowercase}</p>}
          {errors.number && <p>{errors.number}</p>}
          {errors.specialCharacter && <p>{errors.specialCharacter}</p>}
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

