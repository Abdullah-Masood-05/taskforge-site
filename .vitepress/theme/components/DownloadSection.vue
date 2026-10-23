<script setup lang="ts">
import { onMounted, ref } from 'vue';

interface Asset {
  name: string;
  size: number;
  browser_download_url: string;
}

interface Release {
  version: string;
  assets: Asset[];
  failed: boolean;
}

const desktopRepo = 'Abdullah-Masood-05/taskforge-desktop';
const mobileRepo = 'Abdullah-Masood-05/taskforge-mobile';

const desktop = ref<Release>({ version: '', assets: [], failed: false });
const mobile = ref<Release>({ version: '', assets: [], failed: false });

function fmtSize(bytes: number): string {
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function kindOf(assetName: string): string {
  const n = assetName.toLowerCase();
  if (n.endsWith('.msi')) return 'Windows installer (MSI)';
  if (n.endsWith('.exe')) return 'Windows setup (NSIS)';
  if (n.includes('arm64-v8a')) return 'most Android phones';
  if (n.includes('universal')) return 'any Android device, larger';
  if (n.includes('armeabi-v7a')) return 'older 32-bit phones';
  if (n.includes('x86_64')) return 'emulators';
  return 'Download';
}

// Order mobile APKs so the one most people need comes first.
function apkRank(assetName: string): number {
  const order = ['arm64-v8a', 'universal', 'armeabi-v7a', 'x86_64'];
  const i = order.findIndex((k) => assetName.includes(k));
  return i === -1 ? order.length : i;
}

async function load(repo: string, pattern: RegExp, target: typeof desktop) {
  try {
    const resp = await fetch(`https://api.github.com/repos/${repo}/releases/latest`);
    if (!resp.ok) throw new Error(String(resp.status));
    const release = await resp.json();
    const assets: Asset[] = (release.assets ?? [])
      .filter((a: Asset) => pattern.test(a.name))
      .map((a: Asset) => ({
        name: a.name,
        size: a.size,
        browser_download_url: a.browser_download_url,
      }));
    target.value = {
      version: release.tag_name ?? '',
      assets,
      failed: assets.length === 0,
    };
  } catch {
    // Rate-limited or offline: fall back to the static release-page link.
    target.value = { version: '', assets: [], failed: true };
  }
}

onMounted(async () => {
  await Promise.all([
    load(desktopRepo, /\.(msi|exe)$/i, desktop),
    load(mobileRepo, /\.apk$/i, mobile),
  ]);
  mobile.value.assets.sort((x, y) => apkRank(x.name) - apkRank(y.name));
});
</script>

<template>
  <div class="dl-grid">
    <div class="dl-card">
      <h3>
        TaskForge Mobile <span v-if="mobile.version" class="version">{{ mobile.version }}</span>
      </h3>
      <p class="subtitle">Flutter app for Android, on the same accounts and API as the web app.</p>
      <template v-if="!mobile.failed">
        <a
          v-for="(a, i) in mobile.assets"
          :key="a.name"
          :href="a.browser_download_url"
          class="asset"
          :class="{ primary: i === 0 }"
        >
          <span>📱 {{ a.name }} <span class="kind">({{ kindOf(a.name) }})</span></span>
          <span class="size">{{ fmtSize(a.size) }}</span>
        </a>
      </template>
      <a v-else :href="`https://github.com/${mobileRepo}/releases/latest`" class="asset primary">
        View releases on GitHub →
      </a>
      <p class="subtitle" style="margin-top: 8px">
        Android asks you to allow installs from your browser the first time.
        See the <a href="/taskforge-site/guide/mobile">mobile guide</a> for which file to pick.
      </p>
    </div>
    <div class="dl-card">
      <h3>
        TaskForge Desktop <span v-if="desktop.version" class="version">{{ desktop.version }}</span>
      </h3>
      <p class="subtitle">Native Windows app: a Tauri shell around the full TaskForge UI.</p>
      <template v-if="!desktop.failed">
        <a
          v-for="(a, i) in desktop.assets"
          :key="a.name"
          :href="a.browser_download_url"
          class="asset"
          :class="{ primary: i === 0 }"
        >
          <span>📦 {{ a.name }} <span class="kind">({{ kindOf(a.name) }})</span></span>
          <span class="size">{{ fmtSize(a.size) }}</span>
        </a>
      </template>
      <a v-else :href="`https://github.com/${desktopRepo}/releases/latest`" class="asset primary">
        View releases on GitHub →
      </a>
    </div>
    <div class="dl-card">
      <h3>TaskForge Web</h3>
      <p class="subtitle">Nothing to install: the same product in your browser.</p>
      <a href="https://taskforge-app-869.netlify.app" class="asset primary">
        Open the web app →
      </a>
      <p class="subtitle" style="margin-top: 8px">
        Works in any modern browser. Create an account or use the
        <a href="/taskforge-site/reference/demo-data">demo credentials</a>.
      </p>
    </div>
  </div>
</template>

<style scoped>
.dl-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  margin: 24px 0;
}
.dl-card {
  border: 1px solid var(--vp-c-divider);
  /* the one sanctioned thin amber rule on this page */
  border-top: 2px solid var(--vp-c-brand-1);
  border-radius: 12px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
}
.dl-card h3 {
  margin: 0 0 4px;
}
.version {
  font-size: 0.8em;
  color: var(--vp-c-text-2);
  font-weight: 600;
}
.subtitle {
  margin: 0 0 12px;
  font-size: 0.9em;
  color: var(--vp-c-text-2);
}
/* Secondary assets: neutral soft surface with a hairline border. */
.asset {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 12px;
  margin-bottom: 8px;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  font-size: 0.88em;
  text-decoration: none;
  color: var(--vp-c-text-1);
  word-break: break-all;
}
.asset:hover {
  background: var(--vp-c-bg-elv);
  border-color: var(--vp-c-text-3);
}
/* Primary asset: INVERTED, never amber. */
.asset.primary {
  background: var(--vp-c-text-1);
  border-color: transparent;
  color: var(--vp-c-bg);
  font-weight: 600;
}
.asset.primary:hover {
  opacity: 0.92;
  color: var(--vp-c-bg);
}
.asset.primary .size {
  color: var(--vp-c-bg);
  opacity: 0.65;
}
.kind {
  color: inherit;
  opacity: 0.65;
  font-weight: 400;
}
.size {
  color: var(--vp-c-text-2);
  white-space: nowrap;
}
</style>
