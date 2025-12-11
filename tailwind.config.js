/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,md,mdx}',
    './docs/**/*.{md,mdx}',
    './docusaurus.config.js',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Map Docusaurus/Infima color variables to Tailwind
        primary: {
          DEFAULT: '#2563eb',
          dark: '#1d4ed8',
          darker: '#1e40af',
          darkest: '#1e3a8a',
          light: '#3b82f6',
          lighter: '#60a5fa',
          lightest: '#93c5fd',
        },
        // Dark mode primary colors
        'primary-dark': {
          DEFAULT: '#60a5fa',
          dark: '#3b82f6',
          darker: '#2563eb',
          darkest: '#1d4ed8',
          light: '#93c5fd',
          lighter: '#bfdbfe',
          lightest: '#dbeafe',
        },
        // Background colors
        background: {
          DEFAULT: 'var(--ifm-background-color)',
          surface: 'var(--ifm-background-surface-color)',
        },
        // Content colors
        content: {
          DEFAULT: 'var(--ifm-color-content)',
          secondary: 'var(--ifm-color-content-secondary)',
        },
        // Emphasis colors (for borders, dividers, etc.)
        emphasis: {
          100: 'var(--ifm-color-emphasis-100)',
          200: 'var(--ifm-color-emphasis-200)',
          300: 'var(--ifm-color-emphasis-300)',
          400: 'var(--ifm-color-emphasis-400)',
          500: 'var(--ifm-color-emphasis-500)',
        },
        // Status colors
        success: 'var(--ifm-color-success)',
        danger: 'var(--ifm-color-danger)',
        warning: 'var(--ifm-color-warning)',
        info: 'var(--ifm-color-info)',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
          'sans-serif',
        ],
        mono: [
          'SF Mono',
          'Monaco',
          'Cascadia Code',
          'Roboto Mono',
          'Consolas',
          'Courier New',
          'monospace',
        ],
      },
      borderRadius: {
        global: 'var(--ifm-global-radius)',
      },
      boxShadow: {
        'lw': 'var(--ifm-global-shadow-lw)',
        'md': 'var(--ifm-global-shadow-md)',
        'tl': 'var(--ifm-global-shadow-tl)',
      },
      spacing: {
        'navbar-height': 'var(--ifm-navbar-height)',
        'horizontal': 'var(--ifm-spacing-horizontal)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.2s ease-out',
        'copy-success': 'copySuccess 0.3s ease',
        'pulse': 'pulse 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        copySuccess: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true, // Keep preflight enabled for full migration
  },
};

