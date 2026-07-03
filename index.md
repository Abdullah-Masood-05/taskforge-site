---
layout: home

hero:
  name: TaskForge
  text: Project management with a mission-control dashboard
  tagline: Multi-tenant organizations, a drag-and-drop Kanban board, live project analytics — on the web and as a native desktop app.
  image:
    src: /logo.svg
    alt: TaskForge
  actions:
    - theme: brand
      text: Open the web app
      link: https://taskforge-app-869.netlify.app
    - theme: alt
      text: Quickstart
      link: /guide/quickstart
    - theme: alt
      text: Download desktop
      link: '#download'

features:
  - icon: 🗂️
    title: Kanban that keeps up
    details: Drag-and-drop columns, multi-assignee avatar clusters, colored labels, due dates and per-card progress pills. Every change lands on the server instantly.
    link: /guide/board
  - icon: 📊
    title: A dashboard per project
    details: A Gantt-style timeline, weekly velocity chart, priority distribution donut and a live activity feed sit beside the board — no separate reporting tool.
    link: /guide/dashboard
  - icon: 🏢
    title: Real multi-tenancy
    details: Organizations with role-based access — Admin, Member, Viewer — backed by row-level isolation and JWT auth on a Django REST API.
    link: /guide/organizations
  - icon: 📦
    title: Portable projects
    details: Export any project as a JSON template and re-import it — columns, labels, tasks and assignees — with a preview before anything is written.
    link: /guide/import-export
  - icon: 🖥️
    title: Web and desktop
    details: The same UI ships as a Next.js web app and a Tauri-powered native Windows app with MSI and NSIS installers.
    link: /guide/desktop
  - icon: 🔌
    title: An API you can build on
    details: Every screen is driven by a documented REST API — Swagger UI and Redoc included, JWT authenticated, versioned under /api/v1/.
    link: /reference/api
---

<div id="download"></div>

## Download

<DownloadSection />

## Five minutes to a working board

<div class="tf-terminal">
<pre><span class="dim">1.</span> <span class="prompt">Sign up</span> <span class="out">— create your account on the web app or desktop app</span>
<span class="dim">2.</span> <span class="prompt">Create an organization</span> <span class="out">— your team's workspace, with its own members and roles</span>
<span class="dim">3.</span> <span class="prompt">Create a project</span> <span class="out">— set status, priority and a due date</span>
<span class="dim">4.</span> <span class="prompt">Add tasks</span> <span class="out">— assign teammates, pick labels and priorities, set dates</span>
<span class="dim">5.</span> <span class="prompt">Open the board</span> <span class="out">— drag cards through the workflow and watch the dashboard update</span></pre>
</div>

The full walkthrough, with screenshots, is in the [Quickstart](/guide/quickstart).

<div style="margin-top:48px; padding-top:24px; border-top:1px solid var(--vp-c-divider); display:flex; gap:24px; font-size:0.9em; flex-wrap:wrap;">
  <a href="https://github.com/Abdullah-Masood-05/taskforge-backend">Backend source</a>
  <a href="https://github.com/Abdullah-Masood-05/taskforge-frontend">Frontend source</a>
  <a href="https://github.com/Abdullah-Masood-05/taskforge-desktop">Desktop source</a>
</div>
