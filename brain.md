# BRAIN.md — Project Knowledge Base for "Windows 11 Portfolio"

> Read this file top to bottom and you will understand the entire codebase — no need to open other files unless you're about to edit them. Repo: https://github.com/Vidhitam-chakole/Portfolio (owner: Vidhitam Chakole). Live: https://portfolio-vidhitams-projects.vercel.app

---

## 1. What this project is

A **Windows 11 desktop-clone portfolio site**, built in React. Instead of a normal scrolling portfolio, the visitor "logs into Windows," lands on a fake desktop, and explores the owner's info through fake apps (File Explorer, Chrome/Edge browser, Calculator, VS Code, Recycle Bin, Spotify embed, fake PowerShell terminal) plus a goofy bonus app called **Desktop Destroyer** (a canvas-based "smash the screen" toy). Any username/password works to "log in" — there's no real auth.

- **Package name**: `windows`, **version**: `3.0.0`
- **Stack**: React 18 (Create React App / `react-scripts` 5), React Router DOM v6, Tailwind CSS 3 + DaisyUI, Framer Motion (drag/animation), react-draggable (window dragging), react-icons, expr-eval (calculator math), Vercel Analytics + Speed Insights.
- **Deploy target**: Vercel.

---

## 2. How to run it

```bash
npm install
npm start      # dev server → http://localhost:3000
npm run build  # production build
npm test
```

No environment variables or backend are required — everything is client-side/static, plus a couple of public third-party API/embeds (see §7).

---

## 3. High-level architecture / user flow

```
/               → Lockscreen page (video bg + Login form)
                  user types ANY name/password → navigate(`/${name}`)
/:name          → Main page = the actual "desktop" (Main.js in src/Pages)
```

- **`src/App.js`**: Sets up `react-router-dom` with 2 lazy-loaded routes (`Lockscreen`, `Main`). Also globally disables the native right-click context menu everywhere EXCEPT elements marked `data-allow-context="true"`.
- **`src/Pages/lockscreen.js`**: Full-screen looping bg video (`/videos/background_login.mp4`) + `<Login />` centered on top.
- **`src/components/user/Login.jsx`**: Username + password form. No real validation — after ~3s fake "loading" spinner it calls `navigate(/${name})`. Stores name in `localStorage`. Shows Wifi/Accessibility/Power icons bottom-right; Power icon is just decorative here (real Power menu lives in StartMenu). Has an "I forgot my PIN" tooltip joke hinting the real name is "vidhitam."
- **`src/Pages/main.js`** (592 lines) — **the heart of the app**. Renders the whole desktop:
  - Desktop icons (draggable, from `src/data/data.js` → `appsData`)
  - Taskbar (bottom bar)
  - StartMenu (Windows Start menu fly-out)
  - All app windows (Explorer, Browser, Calculator, VsCode, RecycleBin, Apps [Spotify/Terminal], DesktopDestroyer) — each lazy-loaded and rendered conditionally based on a `windows` state object
  - Sleep/Shutdown full-screen overlays with audio + rotating fun images
  - `Torch` easter egg triggered when you "close" the window (see §6)
  - `Slider` — a full-screen lock-style overlay (search icon / photo icon / clock) that auto-triggers if the browser tab becomes hidden
  - Video wallpaper toggle (small draggable "Messi" icon bottom-right of taskbar) that swaps the CSS background image for a looping video (`/videos/messi.mp4`)
  - Auto-attempts Fullscreen API on load and on first click
  - Desktop rubber-band **selection box** (click-drag on empty desktop draws a translucent blue rectangle, currently cosmetic only — doesn't actually select icons)

### Window management model (important, non-obvious)
`Main.js` keeps one `windows` object (booleans per window id: `explorer, browser, chrome, edge, calculator, vscode, recycle, app, spotify, destroyer, start, menu`) plus:
- `activeWindow` (string) — which window is topmost/focused (z-40 vs z-30)
- `minimizedWindows` (a `Set`) — windows that are open but hidden (taskbar icon still shows)
- `input` — generic payload passed to whichever window needs a sub-mode (e.g. `"chrome"` vs `"edge"` for Browser, `"spotify"` vs `"terminal"` for Apps)
- `aboutMe` — payload passed to Explorer (`true` = show the "Home"/quick-access file-manager view; otherwise treated as opening the About-Me content)

All window opening/closing/minimizing goes through one function: `toggleWindow(window, input)` in `main.js`. Key quirks to know before touching this code:
- Only **one instance** of Browser/Apps window exists — `chrome` and `edge` both map onto the shared `browser` window state; `spotify` maps onto the shared `app` window state.
- If **Desktop Destroyer** is open, `toggleWindow` refuses to open/close any other window (`if (windows.destroyer && window !== 'destroyer') return;`) — it's meant to be a full-screen exclusive mode.
- Bounds (drag limits) for every window are computed in a `useMemo` from `useWindowSize()` (viewport) and fixed pixel sizes in `src/utils/constants.js` (`WINDOW_SIZES`).

---

## 4. Folder-by-folder map of `src/`

```
src/
  App.js                     Router + global context-menu blocker
  index.js                   ReactDOM root, Vercel Analytics/SpeedInsights, registers service worker
  index.css                  Tailwind directives + global styles (see below)
  Pages/
    lockscreen.js            Login screen wrapper
    main.js                  THE desktop (592 lines, see §3)
  data/
    data.js                  All "content" data: owner name/initials, desktop app list,
                              and EMPTY placeholder arrays for githubRepos / educationExperience /
                              skills / socialMediaLinks / workExperienceTemplate (see §8 — TODO content)
  utils/
    constants.js              WINDOW_SIZES, INTERVALS, CALCULATOR strings, MOTION_CONFIG
    helpers.js                 formatDate/formatTime, calculateWindowBounds, safeEvaluate (Function-based, not eval)
  hooks/
    index.js                  Barrel export of all hooks below
    useCurrentTime.js          ticking clock (1s)
    useDebounce.js              generic debounce wrapper
    useImagePreloader.js        preloads an array of image URLs, returns loaded bool
    useMediaPreloader.js        preloads audio URLs (best-effort, 5s timeout fallback)
    useTimeout.js                 set/clear timeout hook
    useWindowSize.js                debounced window width/height (150ms)
  components/
    apps/            — the "applications" that open as windows
      AboutMe.jsx        Content shown inside Explorer's non-"Home" pages: About Me / Education / Skills / My Stuffs (projects). Reads from data.js (currently mostly empty arrays → shows "No X listed" placeholders)
      Apps.jsx           Generic window shell reused for Spotify (iframe embed) and a fake PowerShell Terminal (local-only command echo, no real shell)
      Browser.jsx        Fake Chrome/Edge window; address bar rewrites any input into a Google search iframe (`google.com/search?igu=1&q=...`)
      Calculator.jsx     Real working calculator (expr-eval). Has an "easter egg": 1st and 5th "=" press always shows "Hello World" instead of the real result
      DesktopDestroyer.jsx  (1514 lines) Canvas mini-game — see §6
      Explorer.jsx       Fake File Explorer window. Two modes: "Home" (fake quick-access folder grid) and content mode showing AboutMe.jsx content, with sidebar nav (About Me/Education/Skills/My Stuffs) and browser-like back/forward history stack
      HelpMeEarn.jsx     STUB — feature was removed; file kept as no-op (`() => null`) so nothing breaks if still imported
      RecycleBin.jsx     Fake Recycle Bin window, visually identical chrome to Explorer, always shows "This folder is empty" / "0 items"
      Torch.jsx          Easter egg (see §6)
      VsCode.jsx         Fake VS Code window shell, shows "No project is embedded." (no real editor)
    layout/
      StartMenu.jsx      Windows-11-style Start menu flyout. Mostly static/decorative pinned-apps grid using external icon URLs from `laaouatni.github.io/w11CSS` (NOT wired to actually open those apps except via Power component). Shows the logged-in username (from route param) + initials avatar + Power button
      Taskbar.jsx        Bottom taskbar: Start button, pinned app icons (Explorer/Edge always shown; Chrome/Calculator/VSCode/RecycleBin/Spotify/Destroyer show only when open), system tray (Wifi/Volume/Battery/Bell icons, all decorative), live clock, draggable "Messi" wallpaper-toggle icon
    shared/            — small reusable pieces
      CalculatorButton.jsx   styled button w/ variant (number/operator/function/success/error)
      DraggableWindow.jsx    generic reusable window wrapper (Draggable + WindowTitleBar); used by Calculator. NOTE: most other app windows (Explorer, Browser, RecycleBin, VsCode, Apps) do NOT use this shared component — they hand-roll their own near-duplicate Draggable+titlebar JSX. This is duplicated code across ~5 files; a good refactor target.
      LoadingSpinner.jsx     5-dot pulsing loader (Windows 11 style)
      OptimizedImage.jsx     `<img>` wrapper with lazy loading + fade-in on load
      WindowTitleBar.jsx     title bar w/ minimize/maximize/close buttons, used by DraggableWindow
    user/
      Login.jsx          see §3
      UserProfile.jsx    Avatar circle: shows initials if a name is typed, else a generic animated gif avatar. Exports `generateInitials(name)` helper too (reused by StartMenu, Browser address bar avatar)
    utilities/
      Power.jsx          Power button + dropdown (Sleep / Shut Down / "Close the window?"). Triggers sleep/shutdown overlays in main.js and eventually the Torch easter egg
      RightClick.jsx     Custom right-click context menu. `option={true}` (always passed from main.js) shows a realistic Windows-style menu (View/Sort/Refresh/New/Display Settings/etc, all non-functional decoration). There's unused code for an `option=false` "Meow" joke menu variant
      Slider.jsx         Full-screen "lock/away" overlay with live clock, a random fun fact fetched from `https://uselessfacts.jsph.pl/random.json`, and 2 shortcut buttons (Google search icon, a photo link). Auto-shows when tab visibility is lost
```

---

## 5. Data model — `src/data/data.js`

This is the **single file to edit to personalize the portfolio's content**:

```js
ownerName = "Vidhitam Chakole"
ownerFirstName = "Vidhitam"
ownerInitials = "VC"
profileDescription = [ownerName]     // shown under name in AboutMe "About Me" tab

workExperienceTemplate = [...]        // shape example only, NOT rendered anywhere currently
githubRepos = []                      // EMPTY — feeds AboutMe "My Stuffs" tab (ProjectCard grid)
educationExperience = []              // EMPTY — feeds AboutMe "Education" timeline
skills = []                           // EMPTY — feeds AboutMe "Skills" tab
socialMediaLinks = {}                 // EMPTY — not currently consumed anywhere

appsData = [ ... 8 desktop icons ... ]  // Chrome, About Me (folder), Recycle Bin, Edge,
                                          Calculator, VS Code, Spotify, Desktop Destroyer
                                          each: { id, name, icon, action, subAction?, size }
```

`appsData[].action` maps directly to a key in `main.js`'s `windows` state object; `subAction` becomes the `input` argument passed to `toggleWindow`.

**⚠️ Important for anyone extending this project**: `githubRepos`, `educationExperience`, and `skills` are currently **empty arrays** — the UI already has fallback "No X listed" placeholder text wired up (see AboutMe.jsx), so the app doesn't crash, but the portfolio content itself is not filled in yet. If the goal is "make my portfolio show my real info," this file is the primary place to populate.

---

## 6. Notable custom / fun mechanics

- **Torch easter egg** (`components/apps/Torch.jsx`): triggered when the Power menu's "Close The Window?" option is clicked (sets `input = "close"` in main.js). After 3 seconds, the whole screen goes black except a moving flashlight-radius cursor spotlight (Framer Motion spring-smoothed), and a tiny "switch" icon appears at a random position on screen. You must find and click it (plays `/audio/switch.mp3`) to turn the lights back on. Before the blackout there's a 3s full-screen white "why would you close the window :C" message.
- **Sleep / Shutdown overlays** (in `main.js`): clicking Sleep in Power menu fades in a black overlay with a rotating gif/image carousel + looping `sleep.mp3`/`lullaby.mp3` audio and "Windows is now sleeping💤" text; clicking the overlay fades it back out. Shut Down instead shows an XP wallpaper joke image, "BYE BYE👋🏻", plays `shutdown.mp3`, then navigates back to `/` (lockscreen) after 2.7s.
- **Calculator easter egg**: on the 1st and every 5th "=" press it forces the display to show "Hello World" instead of the real computed result (`CALCULATOR.EASTER_EGG_MESSAGE` in constants.js), then resumes normal math.
- **Desktop Destroyer** (`components/apps/DesktopDestroyer.jsx`, 1514 lines) — a full-screen canvas toy, exclusive of all other windows while open. Layered canvas system: base `canvasRef`, `damageCanvasRef` (persists damage marks — sawcut/scorch/eaten/burn/paint/bullethole effects), `particleCanvasRef` (animated particles: circle/square/spark/ring, driven by `requestAnimationFrame`). 8 selectable tools (bottom toolbar, keys 1–8):
  1. Hammer — `FaHammer`, sound "crack"
  2. Chainsaw — `GiAxeSword`, sound "chainsaw" (continuous while mouse held)
  3. Fire — `FaBurn`, sound "fire" (continuous)
  4. Lightning — `FaBolt`, sound "zap" (continuous)
  5. Termites — `FaBug`, sound "eat" (has its own crawling termite particle system, `termitesRef`)
  6. Eraser — `FaBomb`, sound "erase" (continuous)
  7. Paint Gun — `GiMachineGun`, sound "paint" (continuous)
  8. Gun — `GiMachineGun`, sound "shot" (tap/debounced)
  Continuous tools loop their `.mp3` while the mouse button is held (from `/audio/destroyer/<tool>.mp3`); tap tools play once with a 100ms debounce.
- **Video wallpaper toggle**: small draggable circular "Messi" icon bottom-right of the taskbar; toggling it swaps the desktop's static CSS background image for a looping `<video src="/videos/messi.mp4">` layer (adds a `video-wallpaper-active` class to `<body>` to hide the CSS background cleanly).
- **Global right-click disable**: `App.js` prevents the native browser context menu everywhere except elements explicitly opted in via `data-allow-context="true"`; the custom `RightClick.jsx` menu is used instead on the desktop.
- **Auto-fullscreen**: `main.js` tries `document.documentElement.requestFullscreen()` on mount and again on the first click anywhere (browsers often block the on-mount attempt without a user gesture).
- **Slider "away" overlay**: `components/utilities/Slider.jsx` auto-triggers (via the Page Visibility API) if the browser tab loses focus/visibility while the menu isn't already open — mimics a lock-screen-esque "come back" prompt with a live clock and a fetched random fun fact from `https://uselessfacts.jsph.pl/random.json?language=en` (refetched every 10s while open).

---

## 7. External/third-party resources used (not self-hosted)

- Icons for many decorative StartMenu/Browser/Explorer items come from `https://laaouatni.github.io/w11CSS/images/*.ico` (a public Windows-11-CSS-icon-set repo — not this project's own asset).
- Spotify: public playlist iframe embed (`open.spotify.com/embed/playlist/...`).
- Fun-fact API: `https://uselessfacts.jsph.pl/random.json?language=en`.
- Background body image: `https://images5.alphacoders.com/...` (wallpaper site hotlink).
- Login/lockscreen bg video: local `/videos/background_login.mp4`.
- `Vercel Analytics` + `Vercel Speed Insights` — telemetry, no config needed beyond the npm packages already in `package.json`.

---

## 8. Known gaps / things flagged as TODO or incomplete (useful if asked to "continue the project")

1. `githubRepos`, `educationExperience`, `skills`, `socialMediaLinks` in `data.js` are all empty — the actual portfolio content (real projects, real education, real skills, social links) has not been filled in yet. UI gracefully shows "No X listed" fallbacks.
2. `workExperienceTemplate` exists as a shape example but nothing in the UI currently consumes/renders it — there's no "Work Experience" tab wired into Explorer/AboutMe yet.
3. `HelpMeEarn.jsx` is a dead stub — a feature that existed and was intentionally removed ("HelpMeEarn removed — kept file as a no-op stub..."). References to it were also removed from `main.js`/`Taskbar.jsx` (see the `{/* HelpMeEarn app removed */}` comments) — safe to delete entirely if desired.
4. Fake Terminal in `Apps.jsx` only echoes `Executed: <input>` for any command and supports `cls` to clear — not a real shell, easy to extend if someone wants fake command outputs.
5. VS Code window is just an empty shell ("No project is embedded.") — could be built out to show real code/projects.
6. The desktop rubber-band selection box in `main.js` is purely visual — dragging it doesn't actually select/highlight the desktop icons.
7. Several app windows (Explorer, Browser, RecycleBin, VsCode, Apps) duplicate near-identical Draggable + custom title-bar JSX instead of using the shared `DraggableWindow`/`WindowTitleBar` components that already exist in `src/components/shared/` — only `Calculator.jsx` currently uses the shared wrapper. Refactor opportunity to cut a lot of duplicate code.
8. `RightClick.jsx` has an unused `option={false}` branch that renders a joke "Meow" menu — currently `main.js` always passes `option={true}`, so that branch is dead code.
9. `public/docs/resume.pdf` exists as an asset but nothing in the code currently links/opens it (no "Resume" app/button wired up) — worth checking if that's intentional or a leftover to hook up.
10. README's feature list only mentions Chrome/Calculator/VS Code/Spotify/About Me; it doesn't mention Desktop Destroyer, Recycle Bin, Torch/Slider easter eggs, or the video wallpaper toggle — README is out of date vs. actual app features.

---

## 9. Public assets inventory (`public/`)

- `audio/` — `switch.mp3`, `sleep.mp3`, `lullaby.mp3`, `shutdown.mp3`, plus `audio/destroyer/{chainsaw,eraser,fire,gun,hammer,lightning,paintgun,termites}.mp3`
- `docs/resume.pdf` — present but unused in UI (see gap #9 above)
- `images/apps/` — desktop/taskbar icons (calculator, chrome, edge, explorer, folder, messi, recyclebin, switch, terminal, windows)
- `images/cursors/` — custom cursor images matching Desktop Destroyer tool names
- `images/folders/` — Explorer/RecycleBin sidebar icons (This PC, Desktop, Downloads, Documents, Music, Network, Photos, Videos, + category icons: communication/edu/gallery/home/management/me/problem/projects/resume/skills/teamwork)
- `images/fun/` — rotating images shown during the Sleep overlay + `xp.jpg` for Shutdown overlay
- `images/options/` — Explorer/RecycleBin toolbar icons (copy, cut, delete, details, dots, filter, new, paste, rename, share, sort, view)
- `videos/background_login.mp4` (lockscreen bg), `videos/messi.mp4` (video wallpaper)
- `screenshots/` — README preview images
- `manifest.json`, `robots.txt`, `sitemap.xml`, `service-worker.js`, `favicon.ico`, `logo192.png`, `logo512.png`

---

## 10. Quick "where do I edit X" cheatsheet

| Want to change...                          | Edit this file                                   |
|---------------------------------------------|---------------------------------------------------|
| Owner name / initials / bio                | `src/data/data.js`                                |
| Projects list ("My Stuffs")                 | `src/data/data.js` → `githubRepos`                |
| Education timeline                          | `src/data/data.js` → `educationExperience`        |
| Skills list                                 | `src/data/data.js` → `skills`                     |
| Desktop icons (add/remove an app)           | `src/data/data.js` → `appsData` (+ wire up new window state in `main.js`) |
| Window sizes                                 | `src/utils/constants.js` → `WINDOW_SIZES`         |
| Calculator behavior/easter egg               | `src/components/apps/Calculator.jsx`, `src/utils/constants.js` |
| Login screen text/behavior                   | `src/components/user/Login.jsx`                   |
| Start menu pinned apps (decorative)          | `src/components/layout/StartMenu.jsx`             |
| Taskbar icons/system tray                    | `src/components/layout/Taskbar.jsx`               |
| Desktop Destroyer tools/effects              | `src/components/apps/DesktopDestroyer.jsx`        |
| Sleep/Shutdown overlay content               | `src/Pages/main.js` (search `isSleeping`)         |
| Global styles / Tailwind base                | `src/index.css`, `tailwind.config.js`             |
| Fonts, meta tags, SEO                        | `public/index.html`                               |

---

## 11. Suggested prompt template for future AI work on this repo

When a task references "the project" going forward, treat this brain.md as ground truth about structure and behavior. Before making changes:
1. Check §10's cheatsheet first for the fastest file to touch.
2. Check §8 for known gaps — many asks ("add my real projects", "fill in skills") map directly to editing `src/data/data.js`.
3. Respect the window-management model in §3 if adding a new "app" window — it must be added to `windows` state, `appsData`, and typically to `Taskbar.jsx` for a taskbar icon when open.
4. Prefer reusing `src/components/shared/DraggableWindow.jsx` + `WindowTitleBar.jsx` for any brand-new window rather than copy-pasting the older hand-rolled pattern (see gap #7).
