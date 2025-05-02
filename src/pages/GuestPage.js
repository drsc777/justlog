import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../utils/AuthContext';

const GuestPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    isLogin: true
  });
  
  const [error, setError] = useState('');
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleToggleForm = () => {
    setFormData(prev => ({ ...prev, isLogin: !prev.isLogin }));
    setError('');
  };
  
  const handleGuestLogin = () => {
    // Create a guest user with limited access
    const guestUser = {
      uid: `guest_${Date.now()}`,
      displayName: 'Guest User',
      email: 'guest@example.com',
      isGuest: true
    };
    
    login(guestUser);
    navigate('/');
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.isLogin) {
      // Handle login
      if (!formData.email || !formData.password) {
        setError('Please fill in all fields');
        return;
      }
      
      // In a real app, we would authenticate with a backend
      // Here we're just simulating successful login
      const user = {
        uid: `user_${Date.now()}`,
        email: formData.email,
        displayName: 'User'
      };
      
      login(user);
      navigate('/');
    } else {
      // Handle signup
      if (!formData.displayName || !formData.email || !formData.password || !formData.confirmPassword) {
        setError('Please fill in all fields');
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
      
      // In a real app, we would create a user with a backend
      // Here we're just simulating successful signup
      const newUser = {
        uid: `user_${Date.now()}`,
        email: formData.email,
        displayName: formData.displayName
      };
      
      login(newUser);
      navigate('/');
    }
  };
  
  return (
    <Layout>
      <div className="guest-container">
        <h1>{formData.isLogin ? 'Login' : 'Sign Up'}</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          {!formData.isLogin && (
            <div className="form-group">
              <label htmlFor="displayName">Display Name</label>
              <input
                type="text"
                id="displayName"
                name="displayName"
                value={formData.displayName}
                onChange={handleInputChange}
                placeholder="What should we call you?"
              />
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Your email address"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Your password"
            />
          </div>
          
          {!formData.isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
              />
            </div>
          )}
          
          <button type="submit" className="btn">
            {formData.isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        
        <div className="auth-options">
          <button 
            className="btn-link" 
            onClick={handleToggleForm}
          >
            {formData.isLogin 
              ? "Don't have an account? Sign up" 
              : "Already have an account? Login"}
          </button>
          
          <div className="guest-option">
            <p>Don't want to create an account?</p>
            <button 
              className="btn guest-btn" 
              onClick={handleGuestLogin}
            >
              Continue as Guest
            </button>
            <p className="guest-note">
              Note: Guest accounts have limited functionality and data is not saved between sessions.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GuestPage; 