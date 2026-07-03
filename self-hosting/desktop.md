# Building the desktop app

The desktop app is a Vite 8 + React 19 UI inside a Tauri 2 shell. Source:
[taskforge-desktop](https://github.com/Abdullah-Masood-05/taskforge-desktop).
If you just want to install it, use the [published installers](/guide/desktop) instead.

## Prerequisites

- [Bun](https://bun.sh) 1.0+
- [Rust](https://rustup.rs) (stable toolchain — Tauri's shell is Rust)
- Windows: Visual Studio Build Tools with the C++ workload, and the
  WebView2 runtime (preinstalled on Windows 10/11)

## Development

```bash
git clone https://github.com/Abdullah-Masood-05/taskforge-desktop.git
cd taskforge-desktop

bun install

# Point the app at an API — local backend or the hosted one
cp .env.example .env
```

```env
VITE_API_URL=http://localhost:8000
```

Run the app in dev mode (Vite serves the UI on :5173, Tauri opens the
native window around it, with hot reload):

```bash
bun run tauri dev
```

## Release build

Production URLs come from `.env.production`. Build with:

```bash
bun run tauri build
```

Artifacts land in `src-tauri/target/release/bundle/`:

- `msi/TaskForge_x.y.z_x64_en-US.msi` — MSI installer
- `nsis/TaskForge_x.y.z_x64-setup.exe` — NSIS setup wizard

## Versioning

The app version lives in two places that must match:
`src-tauri/tauri.conf.json` (`version`) and `package.json`. Bump both
before building a release.
