// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'API Documentation',
  tagline: 'Build powerful applications with our comprehensive REST API',
  favicon: 'img/CheetaIconLoading.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: 'docs',
          editUrl: undefined,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig: ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        defaultMode: 'light',
        respectPrefersColorScheme: true,
        disableSwitch: true, // Disabled because we have a custom toggle in CustomNavbar
      },
      navbar: {
        logo: {
          alt: 'API Documentation Logo',
          src: 'img/CheetaIconLoading.png',
          srcDark: 'img/CheetaIconLoading.png',
          href: '/',
          width: 32,
          height: 32,
        },
        title: 'Pepsales Docs',
        hideOnScroll: false,
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docs',
            position: 'left',
            label: 'API Reference',
          },
          {
            type: 'custom-navbar',
            position: 'right',
            mobile: false, // hide from mobile drawer; keep only API Reference there
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Introduction',
                to: '/docs/intro',
              },
              {
                label: 'API Reference',
                to: '/docs/reference/api-reference',
              },
            ],
          },
          {
            title: 'Guides',
            items: [
              {
                label: 'Authentication',
                to: '/docs/guides/authentication',
              },
              {
                label: 'Rate Limits',
                to: '/docs/guides/rate-limits',
              },
              {
                label: 'Error Handling',
                to: '/docs/guides/errors',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Pepsales.ai',
                href: 'https://app.pepsales.xyz/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Pepsales API Documentation.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'json', 'yaml', 'javascript', 'python'],
      },
      // algolia: {
      //   // Optional: Add Algolia search configuration if needed
      //   // appId: 'YOUR_APP_ID',
      //   // apiKey: 'YOUR_SEARCH_API_KEY',
      //   // indexName: 'YOUR_INDEX_NAME',
      // },
    }),
};

export default config;
