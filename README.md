<p align="center">
  <img src="public/logo.svg" alt="TaskForge logo" width="110"/>
</p>

<h1 align="center">TaskForge Docs</h1>

<p align="center">
  <a href="https://vitepress.dev"><img src="https://img.shields.io/badge/VitePress-1.6-5C73E7?logo=vite&logoColor=white" alt="VitePress"/></a>
  <a href="https://bun.sh"><img src="https://img.shields.io/badge/Bun-latest-000000?logo=bun&logoColor=white" alt="Bun"/></a>
  <a href="https://pages.github.com"><img src="https://img.shields.io/badge/GitHub%20Pages-deployed-222222?logo=github&logoColor=white" alt="GitHub Pages"/></a>
</p>

The documentation website for [TaskForge](https://taskforge-app-869.netlify.app) —
usage guides, self-hosting instructions and the API reference. Built with
VitePress and deployed to GitHub Pages on every push to `main`.

## Development

```bash
bun install
bun run docs:dev       # http://localhost:5173
```

## Build

```bash
bun run docs:build     # output in .vitepress/dist — dead links fail the build
bun run docs:preview   # serve the built site locally
```

## Structure

```
index.md            # landing page (hero, downloads, quick tour)
guide/              # how to use TaskForge (quickstart, board, dashboard, …)
self-hosting/       # running the backend / frontend / desktop yourself
reference/          # REST API, demo data, FAQ
.vitepress/         # config + theme (amber dark theme, download component)
public/screenshots/ # images used across the guide
```

## Related repositories

- [taskforge-backend](https://github.com/Abdullah-Masood-05/taskforge-backend) — Django REST API
- [taskforge-frontend](https://github.com/Abdullah-Masood-05/taskforge-frontend) — Next.js web app
- [taskforge-desktop](https://github.com/Abdullah-Masood-05/taskforge-desktop) — Tauri desktop app
