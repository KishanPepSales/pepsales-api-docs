/**
 * Authentication Service
 * Handles login, logout, and token management using localStorage
 */

const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  REFRESH_TOKEN: 'auth_refresh_token',
  USER: 'auth_user',
};

/**
 * Login function - calls the API and stores tokens/user data
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<{success: boolean, data?: object, error?: string}>}
 */
export async function login(email, password) {
  try {
    const response = await fetch('https://api1.pepsales.xyz/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer null',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || result.error || 'Login failed. Please check your credentials.',
      };
    }

    // Store tokens and user data
    if (result.data) {
      localStorage.setItem(STORAGE_KEYS.TOKEN, result.data.token || '');
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, result.data.refresh_token || '');
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(result.data.user || {}));
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: error.message || 'Network error. Please try again.',
    };
  }
}

/**
 * Logout function - clears all stored auth data
 */
export function logout() {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
  
  // Trigger custom event for components to react to logout
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('auth-logout'));
  }
}

/**
 * Get current user from localStorage
 * @returns {object|null}
 */
export function getUser() {
  if (typeof window === 'undefined') return null;
  
  const userStr = localStorage.getItem(STORAGE_KEYS.USER);
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch (e) {
    console.error('Error parsing user data:', e);
    return null;
  }
}

/**
 * Get current token from localStorage
 * @returns {string|null}
 */
export function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
}

/**
 * Get refresh token from localStorage
 * @returns {string|null}
 */
export function getRefreshToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
}

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export function isAuthenticated() {
  const token = getToken();
  return !!token;
}

