# Demo data & credentials

TaskForge ships with a reproducible demo environment so you can explore a
fully populated product instead of an empty board.

## Demo credentials

| Role | Email | Password |
|---|---|---|
| Admin | `admin@taskforge.dev` | `TaskForge2024!` |
| Member | `alice@taskforge.dev` | `TaskForge2024!` |
| Viewer | `bob@taskforge.dev` | `TaskForge2024!` |

Demo organization slug: **`taskforge-demo`**.

Log in as each role to feel the difference: the Admin can manage members
and projects, the Member can work the board, the Viewer sees everything
but can change nothing.

## The showcase project

**"Platform Relaunch Q1"** is a large, realistic project built specifically
to light up every panel of the [dashboard](/guide/dashboard):

- 8 team members with avatars
- 5 workflow columns (Backlog, To-Do, In Progress, In Review, Done)
- 7 colored labels
- ~150 tasks with 1–3 assignees each, priorities, start/due dates spread
  over eight months, and progress on in-flight work
- ~200 backfilled activity entries, so the velocity chart and activity
  feed have history from the first login

## Seeding it yourself (self-hosted)

Two management commands, run in order:

```bash
# Organization + users (the credentials above)
python manage.py seed

# The showcase project
python manage.py seed_demo_project --large-project --reset
```

Flags:

- `--large-project` — the full ~150-task board (default is ~50)
- `--reset` — delete and recreate **only** this demo project; other
  organizations and projects are untouched

Seeding is deterministic where it matters (same users, same structure), so
docs, screenshots and tests stay reproducible.
