import {themes as prismThemes} from 'prism-react-renderer';

const config = {
  title: 'Beacon Documentation',
  tagline: 'Modern packaging to support the foundation for first-party web analytics',
  favicon: 'img/favicon.ico',

  url: 'https://deloitte.github.io',
  baseUrl: '/beacon/',

  organizationName: 'Deloitte',
  projectName: 'beacon',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/Deloitte/beacon/tree/main/docs/',
          sidebarCollapsed: false,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Beacon',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'documentationSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          type: 'docSidebar',
          sidebarId: 'examplesSidebar',
          position: 'left',
          label: 'Examples',
        },
        {
          href: 'https://github.com/Deloitte/beacon',
          position: 'right',
          className: 'navbar__item navbar__link header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    sidebar: {
      autoCollapseCategories: false,
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `This documentation site is built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;

