# The desktop app

TaskForge Desktop is the full TaskForge UI in a native window — a Tauri 2
shell around the same board, dashboard and organization screens as the web
app, talking to the same API and the same account.

## Install

Grab the latest release from the [download section](/#download) or straight
from [GitHub releases](https://github.com/Abdullah-Masood-05/taskforge-desktop/releases/latest).
Two Windows installers are published per release:

| Installer | Pick it if |
|---|---|
| `TaskForge_x.y.z_x64_en-US.msi` | You prefer MSI (corporate/managed machines, silent installs) |
| `TaskForge_x.y.z_x64-setup.exe` | You want the standard setup wizard (NSIS) |

Run either one, then launch **TaskForge** from the Start menu.

::: info Windows SmartScreen
The installers are not code-signed, so SmartScreen may show "Windows
protected your PC" on first run. Click **More info → Run anyway**.
:::

## Sign in

The desktop app uses the same accounts as the web app — sign in with your
existing credentials (or the [demo credentials](/reference/demo-data)) and
your organizations, boards and notifications are all there. Data lives on
the server, so web and desktop stay in sync automatically.

## What's different from the web app?

Functionally nothing — the point is parity. You get the same Kanban board,
project dashboard, import/export and notifications. The differences are
around the edges:

- **A real window** — no browser chrome, its own taskbar entry, remembers
  its size and position
- **Fast startup** — the UI is bundled locally (Vite build inside the Tauri
  shell); only data goes over the network
- **Small footprint** — Tauri uses the system WebView2 runtime instead of
  shipping a browser

## Updating

Install a newer release over the existing one — either installer upgrades
in place; your data is on the server, so nothing is migrated locally.

## Building from source

Developers can build the desktop app themselves — see
[Self-hosting → Desktop](/self-hosting/desktop).
