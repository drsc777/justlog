import React, { createContext, useState, useEffect, useContext } from 'react';

// Create Auth Context
export const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    // Simulating loading user data from localStorage
    const userData = localStorage.getItem('justLogUser');
    
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
    
    setLoading(false);
  }, []);

  // Login function
  const login = (userData) => {
    localStorage.setItem('justLogUser', JSON.stringify(userData));
    setCurrentUser(userData);
  };

  // Signup function
  const signup = async (email, password, displayName) => {
    // This would connect to a real auth API in production
    const newUser = {
      uid: `user_${Date.now()}`,
      email,
      displayName,
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('justLogUser', JSON.stringify(newUser));
    setCurrentUser(newUser);
    return newUser;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('justLogUser');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
}; 