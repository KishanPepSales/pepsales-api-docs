import React, { useState } from 'react';
import { login } from '../services/authService';

/**
 * LoginModal Component
 * Displays a modal with email/password form for user authentication
 * Migrated to Tailwind CSS
 */
export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(email, password);
      
      if (result.success) {
        // Clear form
        setEmail('');
        setPassword('');
        setError('');
        
        // Notify parent component
        if (onLoginSuccess) {
          onLoginSuccess(result.data);
        }
        
        // Close modal
        onClose();
        
        // Trigger custom event for navbar update
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('auth-login'));
        }
      } else {
        setError(result.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] animate-fade-in"
      onClick={handleClose}
    >
      <div 
        className="bg-[var(--ifm-background-color)] dark:bg-[var(--ifm-background-surface-color)] rounded-xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] w-[90%] max-w-[440px] max-h-[90vh] overflow-y-auto animate-slide-up border border-[var(--ifm-color-emphasis-300)] dark:border-[var(--ifm-color-emphasis-400)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-[var(--ifm-color-emphasis-300)]">
          <h2 className="m-0 text-2xl font-semibold text-white dark:text-[var(--ifm-heading-color)]">Sign In</h2>
          <button
            className="bg-transparent border-none text-3xl leading-none text-gray-500 dark:text-[var(--ifm-color-content-secondary)] cursor-pointer p-0 w-8 h-8 flex items-center justify-center rounded-md transition-all duration-200 hover:bg-[var(--ifm-color-emphasis-200)] hover:text-gray-700 dark:hover:text-[var(--ifm-color-content)]"
            onClick={handleClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div 
              className="bg-[var(--ifm-color-danger)] dark:bg-red-500/20 dark:text-red-300 dark:border dark:border-red-500/30 text-[var(--ifm-color-danger-contrast-background)] px-4 py-3 rounded-lg mb-6 text-sm font-medium"
              role="alert"
            >
              {error}
            </div>
          )}

          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-white dark:text-[var(--ifm-color-content)] mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 text-base border border-[var(--ifm-color-emphasis-300)] dark:border-[var(--ifm-color-emphasis-400)] rounded-lg bg-white dark:bg-[var(--ifm-background-color)] text-gray-900 dark:text-[var(--ifm-color-content)] transition-all duration-200 box-border focus:outline-none focus:border-[var(--ifm-color-primary)] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)] dark:focus:shadow-[0_0_0_3px_rgba(96,165,250,0.2)] disabled:opacity-60 disabled:cursor-not-allowed placeholder:text-gray-400 dark:placeholder:text-[var(--ifm-color-content-secondary)]"
              placeholder="Enter your email"
              required
              autoComplete="email"
              disabled={loading}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-white dark:text-[var(--ifm-color-content)] mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 text-base border border-[var(--ifm-color-emphasis-300)] dark:border-[var(--ifm-color-emphasis-400)] rounded-lg bg-white dark:bg-[var(--ifm-background-color)] text-gray-900 dark:text-[var(--ifm-color-content)] transition-all duration-200 box-border focus:outline-none focus:border-[var(--ifm-color-primary)] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)] dark:focus:shadow-[0_0_0_3px_rgba(96,165,250,0.2)] disabled:opacity-60 disabled:cursor-not-allowed placeholder:text-gray-400 dark:placeholder:text-[var(--ifm-color-content-secondary)]"
              placeholder="Enter your password"
              required
              autoComplete="current-password"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 text-base font-semibold text-white bg-[var(--ifm-color-primary)] border-none rounded-lg cursor-pointer transition-all duration-200 mt-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none enabled:hover:bg-[var(--ifm-color-primary-dark)] enabled:hover:-translate-y-0.5 enabled:hover:shadow-[0_4px_12px_rgba(37,99,235,0.3)] enabled:active:translate-y-0"
            disabled={loading || !email || !password}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
