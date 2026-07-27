---
layout: home

hero:
  name: TaskForge
  text: Project management with a mission-control dashboard
  tagline: Multi-tenant organizations, a drag-and-drop Kanban board, and live project analytics, on the web and as a native desktop app.
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
    details: A Gantt-style timeline, weekly velocity chart, priority distribution donut and a live activity feed sit beside the board, so you don't need a separate reporting tool.
    link: /guide/dashboard
  - icon: 🏢
    title: Real multi-tenancy
    details: Organizations with role-based access (Admin, Member, Viewer), backed by row-level isolation and JWT auth on a Django REST API.
    link: /guide/organizations
  - icon: 📦
    title: Portable projects
    details: Export any project as a JSON template (columns, labels, tasks and assignees) and re-import it, with a preview before anything is written.
    link: /guide/import-export
  - icon: 🖥️
    title: Web and desktop
    details: The same UI ships as a Next.js web app and a Tauri-powered native Windows app with MSI and NSIS installers.
    link: /guide/desktop
  - icon: 🔌
    title: An API you can build on
    details: Every screen is driven by a documented REST API, with Swagger UI and Redoc included, JWT authenticated, versioned under /api/v1/.
    link: /reference/api
---

<div style="margin-top:48px; padding:32px; background:var(--vp-c-bg-soft); border-radius:12px; font-size:0.95em; line-height:1.7;">
  <p style="margin-top:0;">Most project management tools make you pick one: a snappy UI, or a backend that can actually handle a real team. TaskForge is four separate apps built around one core, so you don't have to choose.</p>
  <p><strong>Under the hood:</strong></p>
  <ul>
    <li>A Django REST API on PostgreSQL. Redis covers caching, the message broker, and websocket pub/sub, which is what keeps board updates near-instant.</li>
    <li>Celery workers run notifications, digests, and scheduled task rollovers outside the request path, so the API itself stays fast.</li>
    <li>The Next.js frontend uses optimistic UI and packages down to an ~8 MB desktop app with Tauri. An Electron build of the same app would land closer to 120 MB.</li>
    <li>A full documentation site covering setup, self-hosting, and the API reference.</li>
  </ul>
  <p style="margin-bottom:0;">This is still under active development, so expect things to change. Docs and all four repos are linked below if you want to look closer.</p>
</div>

<div id="download"></div>

## Download

<DownloadSection />

## Five minutes to a working board

<div class="tf-terminal">
<pre><span class="dim">1.</span> <span class="prompt">Sign up</span> <span class="out">: create your account on the web app or desktop app</span>
<span class="dim">2.</span> <span class="prompt">Create an organization</span> <span class="out">: your team's workspace, with its own members and roles</span>
<span class="dim">3.</span> <span class="prompt">Create a project</span> <span class="out">: set status, priority and a due date</span>
<span class="dim">4.</span> <span class="prompt">Add tasks</span> <span class="out">: assign teammates, pick labels and priorities, set dates</span>
<span class="dim">5.</span> <span class="prompt">Open the board</span> <span class="out">: drag cards through the workflow and watch the dashboard update</span></pre>
</div>

The full walkthrough, with screenshots, is in the [Quickstart](/guide/quickstart).

<div style="margin-top:48px; padding-top:24px; border-top:1px solid var(--vp-c-divider); display:flex; gap:24px; font-size:0.9em; flex-wrap:wrap;">
  <a href="https://github.com/Abdullah-Masood-05/taskforge-backend">Backend source</a>
  <a href="https://github.com/Abdullah-Masood-05/taskforge-frontend">Frontend source</a>
  <a href="https://github.com/Abdullah-Masood-05/taskforge-desktop">Desktop source</a>
</div>
