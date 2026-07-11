import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'TaskForge',
  description:
    'Multi-tenant project management — Kanban boards, a mission-control project dashboard, and a native desktop app.',
  base: '/taskforge-site/',
  // README.md is for GitHub (its image path is repo-relative), not a site page.
  srcExclude: ['README.md'],
  lastUpdated: true,
  // Dead links are a build failure, not a warning.
  ignoreDeadLinks: false,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/taskforge-site/logo.svg' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'TaskForge' }],
    [
      'meta',
      {
        property: 'og:description',
        content:
          'Multi-tenant project management — Kanban boards, a mission-control project dashboard, and a native desktop app.',
      },
    ],
    ['meta', { property: 'og:image', content: 'https://abdullah-masood-05.github.io/taskforge-site/og-image.png' }],
    ['meta', { property: 'og:url', content: 'https://abdullah-masood-05.github.io/taskforge-site/' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'TaskForge' }],
    [
      'meta',
      {
        name: 'twitter:description',
        content:
          'Multi-tenant project management — Kanban boards, a mission-control project dashboard, and a native desktop app.',
      },
    ],
    ['meta', { name: 'twitter:image', content: 'https://abdullah-masood-05.github.io/taskforge-site/og-image.png' }],
  ],
  appearance: 'dark',
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: 'Guide', link: '/guide/what-is-taskforge' },
      { text: 'Self-hosting', link: '/self-hosting/backend' },
      { text: 'Reference', link: '/reference/api' },
      { text: 'Web App', link: 'https://taskforge-app-869.netlify.app' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Getting started',
          items: [
            { text: 'What is TaskForge?', link: '/guide/what-is-taskforge' },
            { text: 'Quickstart', link: '/guide/quickstart' },
          ],
        },
        {
          text: 'Using TaskForge',
          items: [
            { text: 'Organizations & teams', link: '/guide/organizations' },
            { text: 'Projects & the Kanban board', link: '/guide/board' },
            { text: 'The project dashboard', link: '/guide/dashboard' },
            { text: 'Import, export & reports', link: '/guide/import-export' },
            { text: 'The desktop app', link: '/guide/desktop' },
          ],
        },
      ],
      '/self-hosting/': [
        {
          text: 'Self-hosting',
          items: [
            { text: 'Backend (Django API)', link: '/self-hosting/backend' },
            { text: 'Frontend (Next.js)', link: '/self-hosting/frontend' },
            { text: 'Desktop (Tauri)', link: '/self-hosting/desktop' },
          ],
        },
      ],
      '/reference/': [
        {
          text: 'Reference',
          items: [
            { text: 'REST API', link: '/reference/api' },
            { text: 'Demo data & credentials', link: '/reference/demo-data' },
            { text: 'FAQ & troubleshooting', link: '/reference/faq' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Abdullah-Masood-05/taskforge-backend' },
    ],
    footer: {
      message: 'TaskForge — web, API and desktop.',
      copyright: 'TaskForge',
    },
    search: { provider: 'local' },
  },
});
