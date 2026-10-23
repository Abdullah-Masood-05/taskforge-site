# Building the mobile app

The mobile app is a Flutter app for Android and iOS, using Riverpod for
state, Dio for HTTP and go_router for navigation. Source:
[taskforge-mobile](https://github.com/Abdullah-Masood-05/taskforge-mobile).
If you just want to install it, use the [published APKs](/guide/mobile) instead.

## Prerequisites

- [Flutter](https://docs.flutter.dev/get-started/install) on the stable
  channel (Dart 3.5 or newer)
- Android: Android Studio or the Android SDK command-line tools, plus
  JDK 17 (the version CI uses)
- iOS: a Mac with Xcode, and an Apple developer account to sign builds for
  a real device

Run `flutter doctor` to check that the toolchain is complete.

## Development

```bash
git clone https://github.com/Abdullah-Masood-05/taskforge-mobile.git
cd taskforge-mobile

flutter pub get

# Run against the hosted production API
flutter run
```

With no extra flags the app uses the hosted API at
`https://taskforge-api-mu6x.onrender.com` and its WebSocket endpoint at
`wss://taskforge-api-mu6x.onrender.com`.

## Pointing at your own backend

The API and WebSocket URLs are compile-time values. Pass them with
`--dart-define`:

```bash
flutter run \
  --dart-define=API_URL=http://10.0.2.2:8000 \
  --dart-define=WS_URL=ws://10.0.2.2:8000
```

`10.0.2.2` is the Android emulator's alias for the host machine's
`localhost`, so this reaches a [backend](/self-hosting/backend) running
locally on port 8000. On a physical phone, use your computer's LAN address
instead and make sure the backend listens on that interface. For a deployed
backend, use its `https://` and `wss://` URLs.

Pass the same `--dart-define` flags to `flutter build` when you build a
release for your own server. The app adds `/api/v1` to `API_URL` itself, so
give it the bare origin.

To get the demo accounts on a local backend, seed it first:

```bash
python manage.py seed
python manage.py seed_demo_project --large-project
```

### WebSockets and the Origin header

Native WebSocket clients send no `Origin` header, and Channels'
`AllowedHostsOriginValidator` rejects handshakes without one in production.
The app sends the API's own origin (the value of `API_URL`) as the `Origin`
header. That host is already in the backend's `ALLOWED_HOSTS`, so live board
updates work without any extra backend or Render settings.

## Release builds

```bash
# Universal APK
flutter build apk --release

# One APK per ABI (arm64-v8a, armeabi-v7a, x86_64)
flutter build apk --release --split-per-abi

# App Bundle for store upload
flutter build appbundle --release

# iOS without code signing (what CI runs)
flutter build ios --release --no-codesign
```

Android artifacts land in `build/app/outputs/flutter-apk/` and
`build/app/outputs/bundle/release/`. The Android application ID is
`dev.taskforge.taskforge_mobile`.

## Signing

Android release builds use the debug key unless a release keystore is
configured. To sign with your own key, put the keystore at
`android/app/release.jks` and create `android/key.properties`:

```properties
storeFile=release.jks
storePassword=your-store-password
keyAlias=your-key-alias
keyPassword=your-key-password
```

Both paths are in `.gitignore`. Phones will not install an update
signed with a different key over an existing install, so pick one key and
keep using it.

iOS builds need signing through Xcode with your own team and bundle ID
before they can run on a device.

## CI and releases

`.github/workflows/ci.yml` runs on pushes to `main` and on pull requests. It checks
formatting with `dart format`, runs `flutter analyze` and `flutter test`,
builds a release APK and uploads it as a workflow artifact, and builds iOS
with `--no-codesign`.

`.github/workflows/release.yml` runs when a `v*` tag is pushed, and can also
be started by hand with an existing tag. It builds the universal APK, the
per-ABI APKs and the App Bundle, writes `SHA256SUMS.txt`, and attaches all
of them to a GitHub release named after the tag. Files are named
`TaskForge-x.y.z-universal.apk`, `TaskForge-x.y.z-<abi>.apk` and
`TaskForge-x.y.z.aab`.

To sign releases with your own key, add these repository secrets:

| Secret | Value |
|---|---|
| `ANDROID_KEYSTORE_BASE64` | The keystore file, base64 encoded |
| `ANDROID_KEYSTORE_PASSWORD` | The keystore password |
| `ANDROID_KEY_ALIAS` | The key alias |
| `ANDROID_KEY_PASSWORD` | The key password |

The workflow writes them to `android/app/release.jks` and
`android/key.properties` before building. If `ANDROID_KEYSTORE_BASE64` is
empty, the release is signed with the debug key.

## Versioning

The app version is the `version` field in `pubspec.yaml`, for example
`1.0.0+1`, where the part after `+` is the Android build number. Bump it
before tagging a release, and keep the tag in step (`v1.0.0` for `1.0.0`).
