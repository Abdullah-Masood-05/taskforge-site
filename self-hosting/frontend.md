# Self-hosting the frontend

The web app is a Next.js 16 (App Router) + React 19 project managed with
Bun. Source: [taskforge-frontend](https://github.com/Abdullah-Masood-05/taskforge-frontend).

## Local development

```bash
git clone https://github.com/Abdullah-Masood-05/taskforge-frontend.git
cd taskforge-frontend

# Install dependencies
bun install

# Point the app at your API
cp .env.local.example .env.local
```

Set the API origin in `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Then start the dev server and open `http://localhost:3000`:

```bash
bun run dev
```

The app expects a running [backend](/self-hosting/backend) — start that
first, or point `NEXT_PUBLIC_API_URL` at a hosted instance.

## Production build

```bash
bun run build   # optimized build in .next/
bun start       # serve it
```

A `Dockerfile` is included for containerized deploys:

```bash
docker build -t taskforge-frontend .
docker run -p 3000:3000 taskforge-frontend
```

## Deploying to Netlify

The hosted instance runs on Netlify with the repository git-connected —
every push to the main branch triggers a CI build on Netlify's
infrastructure. To replicate:

1. Create a Netlify site and connect the repository.
2. Build command `bun run build`, publish directory `.next` (the Next.js
   runtime plugin handles the rest).
3. Set the environment variables in the site settings:

```env
NEXT_PUBLIC_API_URL=https://your-api.example.com
NEXT_PUBLIC_WS_URL=wss://your-api.example.com
```

::: warning Build in CI, not locally
Prefer git-connected CI builds over `netlify deploy --build` from a
workstation — local builds bake your local `.env.local` (localhost URLs)
into the production bundle, and Next.js edge-function bundling is not
reliable on Windows.
:::
