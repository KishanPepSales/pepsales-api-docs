/**
 * Creating a sidebar enables you to:
 * - create an ordered group of docs
 * - render a sidebar for each doc of that group
 * - provide next/previous navigation
 *
 * The sidebars can be generated from the filesystem, or explicitly defined here.
 *
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  docs: [
    'intro',
    {
      type: 'category',
      label: 'Guides',
      collapsed: false,
      items: [
        'guides/authentication',
        'guides/rate-limits',
        'guides/errors',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      collapsed: false,
      items: [
        'reference/overview',
        'reference/auth',
        'reference/analyze-call',
        'reference/api-reference',
      ],
    },
  ],
};

module.exports = sidebars;
