import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';  // Import যোগ (path adjust)

const AuthModal = ({ isOpen, onClose }) => {
  const { login } = useAuth();  // Context use যোগ
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const endpoint = isSignup ? '/api/auth/signup' : '/api/auth/login';
    const body = isSignup 
      ? formData 
      : { email: formData.email, password: formData.password };

    try {
      const response = await fetch('http://localhost:8081' + endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await response.text();
      if (response.ok) {
        alert(data);  // Success message
        // User data extract + login state update যোগ
        const userData = isSignup 
          ? { username: formData.username, email: formData.email } 
          : { username: data.split('Welcome back, ')[1]?.split('!')[0] || 'User', email: formData.email };
        login(userData);  // AuthContext login call
        resetForm();  // Form reset 
        onClose();  // Modal close
      } else {
        setError(data || 'Something went wrong!');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Reset function 
  const resetForm = () => {
    setFormData({ username: '', email: '', password: '' });
    setError('');
  };

  // Toggle function 
  const toggleAuth = () => {
    setIsSignup(!isSignup);
    resetForm();  
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{isSignup ? 'Sign Up' : 'Log In'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {isSignup && (
            <input
              type="text"
              placeholder="Username"
              className="input input-bordered w-full"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="btn btn-primary w-full text-white bg-gradient-to-r from-yellow-500 to-yellow-600 border-0" disabled={loading}>
            {loading ? 'Loading...' : (isSignup ? 'Sign Up' : 'Log In')}
          </button>
        </form>
        <p className="text-center mt-4 text-sm opacity-80">
          {isSignup ? 'Already have an account?' : "Don't have an account?"} {' '}
          <button 
            type="button" 
            onClick={toggleAuth}  // Toggle function use 
            className="text-blue-500 underline hover:text-blue-700 cursor-pointer"
          >
            {isSignup ? 'Log In' : 'Sign Up'}
          </button>
        </p>
        <div className="modal-action">
          <button type="button" className="btn btn-primary bg-red-600 border-0" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;