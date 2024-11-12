import { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext.jsx';

axios.defaults.withCredentials = true;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (credentials) => {
    try {
      const { data } = await axios.post('/api/users/login', credentials);
      setUser(data);
      setError(null); // Clear error on success
      setSuccess('Logged in successfully!'); // toast message on success
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to login. Please check your credentials.');
      setTimeout(() => setError(null), 3000);
    }
  };
  

  const signup = async (userInfo) => {
    try {
      const { data } = await axios.post('/api/users/signup', userInfo);
      setUser(data);
      setError(null);
      setSuccess('Signed up successfully!'); // toast message on success
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to sign up. Please try again.');
    }
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get('/api/users/profile');
      setUser(data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/users/logout');
      setUser(null);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to log out. Please try again.');
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error,success, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
