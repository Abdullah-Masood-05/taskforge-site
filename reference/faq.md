# FAQ & troubleshooting

## Using TaskForge

**Is the web app free to use?**
Yes — [taskforge-app-869.netlify.app](https://taskforge-app-869.netlify.app)
is open; create an account or use the [demo credentials](/reference/demo-data).

**Do web and desktop share data?**
Yes. Both talk to the same API with the same account — a card you move on
desktop is moved on the web instantly.

**Why are my dashboard charts empty?**
The dashboard is computed from task data: the timeline needs tasks with
start/due dates, velocity needs a week or two of completed work, and the
donut needs open tasks with priorities set. New projects start dark —
see [feeding the dashboard](/guide/dashboard#feeding-the-dashboard). To
preview a fully lit dashboard, open the demo project.

**Why can't I edit anything in an organization?**
You're probably a **Viewer** there. Roles are per-organization — ask an
Admin to bump you to Member.

**Can I move a project to another organization?**
Export it as JSON from the actions menu, switch organizations, and import
it — columns, labels, tasks and dates all travel. Assignees are matched by
email. See [Import & export](/guide/import-export).

**Windows says the desktop installer is unrecognized.**
The installers aren't code-signed. SmartScreen shows "Windows protected
your PC" — click **More info → Run anyway**.

## Self-hosting

**The frontend loads but every request fails.**
Almost always one of three things: the backend isn't running, `NEXT_PUBLIC_API_URL`
points to the wrong origin, or CORS — add your frontend origin to
`CORS_ALLOWED_ORIGINS` in the backend environment.

**Login returns 401 with correct credentials.**
Did you run `python manage.py seed`? The demo users only exist after
seeding. For your own account, register first via the UI or
`POST /api/v1/auth/register/`.

**The API returns 429 Too Many Requests.**
Anonymous traffic is rate-limited. Authenticate for a higher budget, and
honor the `Retry-After` header. If your *platform's health checker* is what's
being throttled, point it at `/health/` — that endpoint is exempt from
throttling by design.

**WebSocket updates don't arrive in production.**
Serve the backend with an ASGI server (Daphne is configured) — a plain
WSGI deployment silently drops the Channels layer. Also check that
`NEXT_PUBLIC_WS_URL` uses `wss://` behind TLS.

**Port 3000 or 8000 is already taken.**

```bash
# Frontend on another port
bun run dev -- -p 3001

# Backend on another port
python manage.py runserver 127.0.0.1:8001
```

**Where do I report bugs?**
Open an issue on the matching repository —
[backend](https://github.com/Abdullah-Masood-05/taskforge-backend/issues),
[frontend](https://github.com/Abdullah-Masood-05/taskforge-frontend/issues) or
[desktop](https://github.com/Abdullah-Masood-05/taskforge-desktop/issues) —
with steps to reproduce and a screenshot where it helps.
