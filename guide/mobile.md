# The mobile app

TaskForge Mobile is a Flutter app for Android and iOS. It talks to the same
API as the web and desktop apps, so your accounts, organizations, projects
and boards are the same on every client. The look follows the web app's
dark theme with amber accents and monospace section labels.

## Install

Android builds are published on
[GitHub releases](https://github.com/Abdullah-Masood-05/taskforge-mobile/releases/latest).
Each release has these files:

| File | Pick it if |
|---|---|
| `TaskForge-x.y.z-universal.apk` | You are not sure which one to use. It runs on any Android phone. |
| `TaskForge-x.y.z-arm64-v8a.apk` | Your phone is a recent 64-bit ARM device (most phones from the last several years) and you want a smaller download |
| `TaskForge-x.y.z-armeabi-v7a.apk` | Your phone is an older 32-bit ARM device |
| `TaskForge-x.y.z-x86_64.apk` | You are installing on an x86_64 Android emulator |
| `TaskForge-x.y.z.aab` | You are publishing to a store. Phones cannot install an App Bundle directly. |

A `SHA256SUMS.txt` file with checksums for every artifact is attached to the
same release.

Download the APK on the phone and open it. Android asks you to allow
installs from unknown sources for the browser or file manager you opened it
from; allow it once and the install continues.

::: info Signing
Release APKs are signed with the debug key unless the repository has its own
signing key configured. Android treats them like any other sideloaded app.
If you later install a build signed with a different key, uninstall the old
one first.
:::

There is no iOS download. The iOS app builds in CI without code signing, and
there is no App Store or TestFlight release. To run it on an iPhone, build it
from source with your own Apple developer account; see
[building the mobile app](/self-hosting/mobile).

## Sign in

The mobile app uses the same accounts as the web app. Sign in with your
existing email and password, or register a new account from the welcome
screen. The login screen has a **Use demo account** button that fills in the
admin [demo credentials](/reference/demo-data). The Member and Viewer demo
accounts work too, with the same password.

The hosted API runs on Render's free tier, which sleeps after a quiet spell.
The first request after that can take a minute or so. The app pings the
server as soon as it opens or comes back to the foreground, and it keeps
retrying requests while the server boots, so screens fill in on their own
once it is up. The login and register screens show a "waking up the server"
hint during the wait.

Your session is kept between launches. Expired access tokens are refreshed in
the background, the same way the web app does it.

## A tour of the app

The bottom tab bar has four tabs: Home, Projects, Inbox and Profile.

### Home

The home dashboard has a greeting, summary stats, your organization cards
and the active organization's projects. The organization switcher at the
top changes the active organization and has an option to create a new one.

### Projects

The projects list has search, an Active / Archived / All scope, status
filters and sorting by date created, due date or priority. Members and
Admins can create, edit, archive and delete projects from here.

### Project board

Opening a project shows four tabs:

| Tab | What it shows |
|---|---|
| Board | The Kanban columns and task cards |
| Overview | Progress, the priority donut and weekly velocity |
| Timeline | A Gantt-style timeline of tasks with dates |
| Activity | The project's activity feed |

To move a card, long-press it and drag it to another column, or open the
card menu and pick **Move to…** to choose the column from a list. The board
can be filtered by priority, assignee, label or text, and you can add new
columns. The project menu has **Export JSON**, which shows the project's JSON
template so you can copy it, and **Export PDF report**, which generates a
report on the server and opens it when ready.

Changes made by other people arrive live over a WebSocket, so the board
updates without a refresh.

### Task detail

Tapping a card opens the task. Status, priority, assignees, labels, start
and due dates, progress and description are all editable in place. The task
screen also has subtasks, comments, the task's activity history and its
attachments. You can open and remove attachments on mobile, but uploading
files is only available on the web app.

### Inbox

The inbox lists your notifications and loads more as you scroll. Swipe a
notification to mark it read, or use **Mark all read**. The Inbox tab shows
the unread count as a badge.

### Profile

The profile screen lists your organizations and has actions to edit your
profile (name, bio and timezone), change your password and sign out. It
also links to the web app and to this documentation.

### Organization

The organization screen has Overview, Members and Settings tabs. Admins can
invite people, change member roles, see pending invitations and edit the
organization's settings. Other roles see the member list as read-only.

### Billing

The billing screen shows the organization's current plan and the pricing
table, and links to the Stripe customer portal for plan changes.

## Differences from the web app

The mobile app covers the day-to-day work on a board, with a few gaps:

- File uploads are web only. Attachments added on the web can be opened on
  mobile.
- Importing a project from a JSON template is web only. Export works on
  mobile.
- There is no iOS download; iOS users need to build the app themselves.

## Updating

Download the newer APK from the releases page and install it over the
existing app. Your data lives on the server, so nothing needs to be
migrated. If Android refuses the update because the signature differs,
uninstall the old version and install the new one.

## Building from source

Developers can build the app themselves or point it at their own backend;
see [building the mobile app](/self-hosting/mobile).
