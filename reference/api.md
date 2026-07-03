# REST API

Every screen in TaskForge — web and desktop — is driven by a public REST
API. Anything the UI does, you can script.

## Interactive docs

The API is fully described by an OpenAPI schema (drf-spectacular):

| | Hosted | Self-hosted |
|---|---|---|
| **Swagger UI** | [taskforge-api-mu6x.onrender.com/api/v1/docs/](https://taskforge-api-mu6x.onrender.com/api/v1/docs/) | `/api/v1/docs/` |
| **Redoc** | [taskforge-api-mu6x.onrender.com/api/v1/redoc/](https://taskforge-api-mu6x.onrender.com/api/v1/redoc/) | `/api/v1/redoc/` |
| **Raw schema** | `/api/v1/schema/` | `/api/v1/schema/` |

![Swagger UI for the TaskForge API](/screenshots/swagger.png)

All endpoints are versioned under `/api/v1/`.

## Authentication

JWT (SimpleJWT). Log in, keep the access token, refresh when it expires:

```bash
BASE=https://taskforge-api-mu6x.onrender.com/api/v1

# Log in → { "access": "...", "refresh": "..." }
curl -X POST $BASE/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@taskforge.dev", "password": "TaskForge2024!"}'

# Authenticated request
curl -H "Authorization: Bearer $ACCESS" $BASE/auth/me/

# Refresh
curl -X POST $BASE/auth/token/refresh/ -d "refresh=$REFRESH"
```

Auth endpoints: `auth/register/`, `auth/login/`, `auth/token/refresh/`,
`auth/logout/` (blacklists the refresh token), `auth/me/`,
`auth/change-password/`.

## Organization scoping

TaskForge is multi-tenant: project and task endpoints operate **inside an
organization**. Tell the API which one with the `X-Organization-Slug`
header:

```bash
curl -H "Authorization: Bearer $ACCESS" \
     -H "X-Organization-Slug: taskforge-demo" \
     $BASE/projects/
```

Your role in that organization (Admin / Member / Viewer) determines what
each endpoint allows — the same rules the UI enforces.

## Endpoint map

| Area | Endpoints |
|---|---|
| **Organizations** | `organizations/` — list, create, detail, members, invites |
| **Projects** | `projects/`, `projects/{id}/`, `projects/{id}/archive/` |
| **Project analytics** | `projects/{id}/timeline/`, `projects/{id}/analytics/`, `projects/{id}/activity/` |
| **Import / export** | `projects/{id}/export/` (JSON), `projects/import/` (multipart `file` field) |
| **Workflow columns** | `projects/{id}/statuses/`, `.../reorder/` |
| **Labels** | `projects/{id}/labels/` |
| **Tasks** | `projects/{id}/tasks/`, `.../tasks/{id}/`, `.../tasks/{id}/move/` |
| **Subtasks & comments** | `tasks/{id}/subtasks/`, `tasks/{id}/comments/`, `tasks/{id}/activity/` |
| **Notifications** | `notifications/`, `notifications/unread-count/`, `notifications/mark-all-read/` |
| **PDF reports** | `reports/` (create job), `reports/{id}/` (poll status), `reports/{id}/download/` |
| **Health** | `/health/` — DB + Redis check, unauthenticated, never throttled |

The dashboard rail maps directly onto the three analytics endpoints:
`timeline/` feeds the Gantt panel, `analytics/` the velocity chart and
distribution donut, `activity/` the feed.

## Rate limiting

Anonymous requests are throttled; authenticated traffic gets a higher
budget. If you receive `429 Too Many Requests`, back off — the response's
`Retry-After` header tells you how long.

## WebSockets

Board changes broadcast over Django Channels at the same host
(`wss://…`). The web and desktop clients use this for live updates; the
REST API remains the source of truth if you'd rather poll.
