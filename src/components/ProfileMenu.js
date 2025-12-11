import React, { useState, useRef, useEffect } from 'react';
import { getUser, getToken, logout } from '../services/authService';

/**
 * ProfileMenu Component
 * Displays user profile dropdown with name, email, token, and logout button
 * Migrated to Tailwind CSS
 */
export default function ProfileMenu({ onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Load user data on mount
    const loadUserData = () => {
      setUser(getUser());
      setToken(getToken());
    };

    loadUserData();

    // Listen for auth events
    const handleAuthChange = () => {
      loadUserData();
    };

    window.addEventListener('auth-login', handleAuthChange);
    window.addEventListener('auth-logout', handleAuthChange);

    return () => {
      window.removeEventListener('auth-login', handleAuthChange);
      window.removeEventListener('auth-logout', handleAuthChange);
    };
  }, []);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    if (onLogout) {
      onLogout();
    }
    // Trigger event for navbar update
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('auth-logout'));
    }
  };

  const handleCopyToken = async () => {
    if (!token) return;

    try {
      // Use modern Clipboard API
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(token);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = token;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error('Fallback copy failed:', err);
        }
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.error('Failed to copy token:', err);
    }
  };

  if (!user) {
    return null;
  }

  const userInitials = user.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : user.email
    ? user.email[0].toUpperCase()
    : 'U';

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        className="bg-transparent border-none cursor-pointer p-0 flex items-center justify-center transition-transform duration-200 hover:scale-105 active:scale-95"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--ifm-color-primary)] to-[var(--ifm-color-primary-dark)] text-white flex items-center justify-center font-semibold text-sm border-2 border-[var(--ifm-background-color)] shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-all duration-200 hover:shadow-[0_4px_8px_rgba(0,0,0,0.15)]">
          {userInitials}
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] right-0 bg-[var(--ifm-background-surface-color)] dark:bg-[var(--ifm-background-surface-color)] border border-[var(--ifm-color-emphasis-300)] dark:border-[var(--ifm-color-emphasis-400)] rounded-xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] dark:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3),0_10px_10px_-5px_rgba(0,0,0,0.2)] min-w-[320px] max-w-[400px] z-[1000] animate-slide-down overflow-hidden lg:right-[-1rem] lg:min-w-[280px]">
          <div className="flex items-center gap-4 p-5 bg-[var(--ifm-background-color)]">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--ifm-color-primary)] to-[var(--ifm-color-primary-dark)] text-white flex items-center justify-center font-semibold text-lg flex-shrink-0">
              {userInitials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-base font-semibold text-[var(--ifm-heading-color)] mb-1 overflow-hidden text-ellipsis whitespace-nowrap">
                {user.name || 'User'}
              </div>
              <div className="text-sm text-[var(--ifm-color-content-secondary)] overflow-hidden text-ellipsis whitespace-nowrap">
                {user.email || ''}
              </div>
            </div>
          </div>

          <div className="h-px bg-[var(--ifm-color-emphasis-300)] m-0"></div>

          <div className="p-4 px-5">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-[var(--ifm-color-content-secondary)] uppercase tracking-wider m-0">
                Token
              </label>
              {token && (
                <button
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-all duration-200 whitespace-nowrap focus:outline-none focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)] ${
                    copied
                      ? 'bg-[var(--ifm-color-success)] border-[var(--ifm-color-success)] text-white animate-copy-success'
                      : 'bg-[var(--ifm-color-emphasis-100)] dark:bg-[var(--ifm-color-emphasis-200)] border border-[var(--ifm-color-emphasis-300)] dark:border-[var(--ifm-color-emphasis-400)] text-[var(--ifm-color-content)] hover:bg-[var(--ifm-color-emphasis-200)] dark:hover:bg-[var(--ifm-color-emphasis-300)] hover:border-[var(--ifm-color-primary)] hover:text-[var(--ifm-color-primary)] hover:-translate-y-0.5 active:translate-y-0'
                  }`}
                  onClick={handleCopyToken}
                  aria-label={copied ? 'Token copied' : 'Copy token'}
                  title={copied ? 'Copied!' : 'Copy token'}
                >
                  {copied ? (
                    <svg
                      className="w-4 h-4 flex-shrink-0 transition-transform duration-200"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4 flex-shrink-0 transition-transform duration-200 hover:scale-110"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  )}
                  <span className="text-xs font-medium transition-all duration-200">
                    {copied ? 'Copied!' : 'Copy'}
                  </span>
                </button>
              )}
            </div>
            <div className="bg-[var(--ifm-background-color)] border border-[var(--ifm-color-emphasis-300)] rounded-lg p-3 max-h-[120px] overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[var(--ifm-color-emphasis-400)] [&::-webkit-scrollbar-thumb]:rounded-sm [&::-webkit-scrollbar-thumb]:hover:bg-[var(--ifm-color-emphasis-500)]">
              <code className="block text-xs font-mono text-[var(--ifm-color-content)] break-all leading-6 m-0 whitespace-pre-wrap">
                {token || 'No token'}
              </code>
            </div>
          </div>

          <div className="h-px bg-[var(--ifm-color-emphasis-300)] m-0"></div>

          <button
            className="w-full px-5 py-3 bg-transparent border-none text-[var(--ifm-color-danger)] text-sm font-medium cursor-pointer transition-all duration-200 text-left border-t border-[var(--ifm-color-emphasis-300)] hover:bg-[var(--ifm-color-emphasis-100)] dark:hover:bg-[var(--ifm-color-emphasis-200)] hover:text-[var(--ifm-color-danger-dark)]"
            onClick={handleLogout}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
