import React, { useState, useEffect } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import { isAuthenticated } from '../services/authService';
import LoginModal from './LoginModal';
import ProfileMenu from './ProfileMenu';

/**
 * CustomNavbar Component
 * Custom navbar item that shows Login button or Profile menu based on auth state
 * Migrated to Tailwind CSS
 */
export default function CustomNavbar() {
  const [authenticated, setAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { colorMode, setColorMode } = useColorMode();

  useEffect(() => {
    // Check auth state on mount
    const checkAuth = () => {
      setAuthenticated(isAuthenticated());
    };

    checkAuth();

    // Listen for auth state changes
    const handleAuthChange = () => {
      checkAuth();
    };

    window.addEventListener('auth-login', handleAuthChange);
    window.addEventListener('auth-logout', handleAuthChange);

    return () => {
      window.removeEventListener('auth-login', handleAuthChange);
      window.removeEventListener('auth-logout', handleAuthChange);
    };
  }, []);

  const handleLoginSuccess = () => {
    setAuthenticated(true);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setAuthenticated(false);
  };

  const toggleColorMode = () => {
    setColorMode(colorMode === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <div className="flex items-center gap-3 lg:gap-2">
        {/* Dark Mode Toggle */}
        <button
          className="flex items-center justify-center w-9 h-9 p-0 bg-transparent border-none rounded-lg text-[var(--ifm-navbar-link-color)] cursor-pointer transition-all duration-200 hover:bg-[var(--ifm-color-emphasis-200)] dark:hover:bg-[var(--ifm-color-emphasis-300)] hover:text-[var(--ifm-navbar-link-hover-color)]"
          onClick={toggleColorMode}
          aria-label="Toggle dark mode"
        >
          {colorMode === 'dark' ? (
            <svg
              className="w-5 h-5 flex-shrink-0"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          ) : (
            <svg
              className="w-5 h-5 flex-shrink-0"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          )}
        </button>

        {/* Login Button or Profile Menu */}
        {authenticated ? (
          <ProfileMenu onLogout={handleLogout} />
        ) : (
          <button
            className="px-4 py-2 text-sm font-medium text-[var(--ifm-navbar-link-color)] bg-transparent border border-[var(--ifm-color-emphasis-300)] dark:border-[var(--ifm-color-emphasis-400)] rounded-lg cursor-pointer transition-all duration-200 whitespace-nowrap hover:bg-[var(--ifm-color-primary)] hover:text-white hover:border-[var(--ifm-color-primary)] hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_2px_8px_rgba(0,0,0,0.3)] active:translate-y-0 lg:px-3 lg:text-[0.8125rem]"
            onClick={() => setShowLoginModal(true)}
          >
            Sign In
          </button>
        )}
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}
