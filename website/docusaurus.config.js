const {themes} = require('prism-react-renderer');
const lightTheme = themes.github;
const darkTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Logion SDK',
  tagline: 'The blockchain infrastructure of safe digital ownership',
  url: 'https://logion-network.github.io/',
  baseUrl: '/logion-api/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logion32.png',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'logion-network', // Usually your GitHub org/user name.
  projectName: 'logion-api', // Usually your repo name.
  trailingSlash: false,

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
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
          sidebarItemsGenerator: async function({defaultSidebarItemsGenerator, ...args}) {
            const sidebarItems = await defaultSidebarItemsGenerator(args);
            const reference = sidebarItems.find(item => item.label === "Reference");
            if(reference) {
              const packagesIndex = reference.items.findIndex(item => item.type === "doc" && item.id === "reference/modules");
              if(packagesIndex !== -1) {
                const packages = reference.items[packagesIndex];
                packages.label = "Packages";
                reference.items.splice(packagesIndex, 1);
                reference.items = [ packages ].concat(reference.items);
              }
            }
            return sidebarItems;
          },
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/logion-network/logion-api/tree/main/website/',
        },
        blog: {
          showReadingTime: true,
          editUrl:
              'https://github.com/logion-network/logion-api/tree/main/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Logion SDK',
        logo: {
          alt: 'logion Logo',
          src: 'img/logion218-twitter.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Introduction',
          },
          {
            to: '/docs/category/extension',
            position: 'left',
            label: 'Extension',
          },
          {
            to: '/docs/category/client',
            position: 'left',
            label: 'Client',
          },
          {
            to: '/docs/reference/modules',
            position: 'left',
            label: 'Reference',
          },
          {
            href: 'https://github.com/logion-network/logion-api',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Introduction',
                to: '/docs/intro',
              },
              {
                to: '/docs/category/extension',
                label: 'Extension',
              },
              {
                to: '/docs/category/client',
                label: 'Client',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/FvnxrtCYr6',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/logion_network',
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/company/logion-network/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Website',
                href: 'https://logion.network/',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/logion-network/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Logion AISBL. Built with Docusaurus.`,
      },
      prism: {
        theme: lightTheme,
        darkTheme: darkTheme,
      },
    }),
};

module.exports = config;
