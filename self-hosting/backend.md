# Self-hosting the backend

The API is a Django 5 + Django REST Framework project backed by PostgreSQL
and Redis. Source: [taskforge-backend](https://github.com/Abdullah-Masood-05/taskforge-backend).

## Quick start with Docker

The fastest path — Postgres, Redis and the API in one command:

```bash
git clone https://github.com/Abdullah-Masood-05/taskforge-backend.git
cd taskforge-backend

# 1. Copy the example environment file and adjust values as needed
cp .env.example .env

# 2. Build and start everything
docker compose up --build -d
```

Migrations and demo seeding run automatically on first start. You now have:

- API at `http://localhost:8000/api/v1/`
- Swagger UI at `http://localhost:8000/api/v1/docs/`
- Redoc at `http://localhost:8000/api/v1/redoc/`
- Health check at `http://localhost:8000/health/`

## Running it without Docker

You'll need Python 3.12, PostgreSQL and Redis running locally.

```bash
# 1. Create a virtual environment (uv shown; python -m venv works too)
uv venv --python 3.12
uv pip install -r requirements/dev.txt

# 2. Point .env at your Postgres/Redis (see .env.example)

# 3. Migrate and seed
uv run python manage.py migrate
uv run python manage.py seed

# 4. Run the server
uv run python manage.py runserver 127.0.0.1:8000
```

`seed` creates a demo organization and users; add the fully populated
showcase project with:

```bash
uv run python manage.py seed_demo_project --large-project --reset
```

See [Demo data](/reference/demo-data) for what that includes.

## Environment variables

The essentials (full list in `.env.example`):

| Variable | Purpose |
|---|---|
| `SECRET_KEY` | Django secret — generate a long random value |
| `DATABASE_URL` | Postgres DSN, e.g. `postgres://user:pass@localhost:5432/taskforge` |
| `REDIS_URL` | Redis DSN, e.g. `redis://localhost:6379/0` |
| `ALLOWED_HOSTS` | Comma-separated hostnames for production |
| `CORS_ALLOWED_ORIGINS` | Your frontend's origin(s) |
| `DEBUG` | `False` in production |

## Production notes

- Serve with an ASGI server (the project ships with **Daphne**) — the
  notification layer uses Django Channels over WebSockets.
- Point your platform's **health check at `/health/`**. The endpoint is
  deliberately exempt from API rate limiting — platform probes fire every
  few seconds and must never be throttled into a 429/restart loop.
- Run `python manage.py migrate` on every deploy; migrations are
  data-preserving.
- The test suite (`pytest`) covers models, permissions and the API — run it
  against your configuration before going live.

## Deploying to Render

The repository includes a `render.yaml` blueprint — create a new Blueprint
service from the repo and Render provisions the web service and database.
Set the environment variables above in the service settings, and make sure
the service's health check path is `/health/`.
