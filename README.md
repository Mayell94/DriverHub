<p align="center">
  <img src="https://img.shields.io/badge/React_Native-0.81-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Expo_SDK-54-000020?style=for-the-badge&logo=expo&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Platform-Android_%7C_iOS-green?style=for-the-badge&logo=android&logoColor=white" />
</p>

<h1 align="center">Driver Hub</h1>

<p align="center">
  <strong>The social platform built for car enthusiasts.</strong><br/>
  Track your garage. Find your crew. Own the road.
</p>

<p align="center">
  <a href="#-vision">Vision</a> &bull;
  <a href="#-features">Features</a> &bull;
  <a href="#-tech-stack">Tech Stack</a> &bull;
  <a href="#-architecture">Architecture</a> &bull;
  <a href="#-getting-started">Getting Started</a> &bull;
  <a href="#-roadmap">Roadmap</a>
</p>

---

## The Problem

Car culture lives on back roads, in group chats, and at midnight meets — not on generic social media. There's no single app where you can track your build, find your friends on the road, discover scenic routes, earn recognition for your passion, and connect with your local car community.

**Driver Hub changes that.**

---

## Vision

> *The definitive app for car enthusiasts worldwide. The Strava of driving. The Discord of car culture.*

We're building the platform that every petrolhead opens daily — before a drive, during a meet, after a build. Not a niche tool. Not a side project. A world-class product for a massive, underserved community.

**Read the full vision:** [`VISION.md`](./VISION.md)

---

## Features

### Virtual Garage

Your garage is your identity. Every car tells your story.

```
+--------------------------------------------------+
|  MY GARAGE                              + ADD     |
|--------------------------------------------------|
|  [911 GT3 RS]     2024 Porsche    518 HP         |
|   3 mods  2 photos               ⚙️ 📸          |
|--------------------------------------------------|
|  [M3 Competition]  2023 BMW      503 HP          |
|   2 mods  1 photo                ⚙️ 📸          |
|--------------------------------------------------|
|  [GR Supra]        2024 Toyota   382 HP          |
|   3 mods  2 photos               ⚙️ 📸          |
+--------------------------------------------------+
```

- Real-world specs auto-filled from a built-in database (11+ cars and growing)
- Track every modification with before/after documentation
- Photo galleries per car, shareable to the community feed
- Build timelines showing your car's evolution from stock

### Live Map & Drive Tracking

The killer feature. Know where your crew is, right now.

```
+--------------------------------------------------+
|  LIVE MAP                    3 friends nearby     |
|                                                   |
|        [Jake] 🟢              [You] 🟠           |
|           \                    /                  |
|            ----[road]----------                   |
|           /                                       |
|     [Carlos] 🟢                                  |
|       DRIVING                                     |
|                                                   |
|  +--------------------------------------------+  |
|  | 🟢 LIVE  Sunset Canyon Run · 3 drivers     |  |
|  |          [ JOIN LIVE DRIVE → ]              |  |
|  +--------------------------------------------+  |
+--------------------------------------------------+
```

- Real-time friend positions with online/driving/offline status
- Live drives — start a route, friends see you in real time and can join
- Drive recording with GPS, speed, elevation, and duration
- Convoy mode with group tracking and voice chat
- Mount mode — landscape HUD optimised for phone mounts
- Road ratings and scenic route discovery

### Community Feed

No algorithms. Just your people, in order.

```
+--------------------------------------------------+
|  COMMUNITY FEED                                   |
|--------------------------------------------------|
|  [J] Jake R. · Nissan GT-R · 25m ago            |
|  "Just finished a full titanium exhaust install   |
|   on the GT-R. The sound is absolutely mental 🔊"|
|  [📸 photo]                                      |
|  ❤️ 42    💬 2    ↗ Share                        |
|--------------------------------------------------|
|  [M] Mia T. · Mazda RX-7 FD · 2h ago            |
|  "Golden hour + mountain road + rotary noises     |
|   = perfection. This is why we drive."            |
|  [📸 photo]                                      |
|  ❤️ 87    💬 1    ↗ Share                        |
+--------------------------------------------------+
```

- Posts, photos, videos, garage shares, drive completions
- Like, comment, and share with your crew
- Gallery sharing — post your car's full photo set from the garage

### Forums

Deep-dive discussions for the community.

```
+--------------------------------------------------+
|  THE FORUM                                        |
|--------------------------------------------------|
|  🔧 Tech Help          234 threads               |
|  ⚙️ Modifications      189 threads               |
|  📸 Photo Spots        156 threads               |
|  🤝 Meets & Events      98 threads               |
|  💰 Buy & Sell         312 threads               |
|--------------------------------------------------|
|  🔥 HOT  Build log: Supra 45→550whp   47 replies |
|  ✓ SOLVED  Best OBD2 for BMW F-series? 22 replies |
+--------------------------------------------------+
```

- Categories for every aspect of car culture
- Hot threads and solved tags for quick answers
- Community moderation through reputation system

### Progression & Gamification

The reason people come back every day.

```
+--------------------------------------------------+
|  DRIVER PROFILE                                   |
|                                                   |
|  [A] Alex Mercer         REP 2,840               |
|  @alexdrives · Essex, UK                          |
|  Level 24 — "Road Warrior"                        |
|                                                   |
|  +---------+---------+---------+---------+        |
|  | Drives  | Miles   | Cars    | Rep     |        |
|  |  142    |  8.4K   |   4     |  2.8K   |        |
|  +---------+---------+---------+---------+        |
|                                                   |
|  BADGES                                           |
|  🏆 Canyon King  ⚡ Speed Demon  🌅 Sunset Chaser |
|  🔧 Gearhead    🏁 Track Rat                     |
+--------------------------------------------------+
```

- **XP & Levels** — earn from drives, posts, forum help, events, mods logged
- **Achievements** — "Canyon Carver", "Night Owl", "Cross-Country", "Rotary Faithful"
- **Streaks** — daily activity streaks with weekly/monthly challenges
- **Reputation** — community-earned score that unlocks perks and authority
- **Seasonal rankings** — monthly leaderboards keep competition fresh

### Themes

Four hand-crafted visual themes inspired by car culture. Each with its own typography, colours, and personality.

```
┌─────────────────┬────────────────────────────────────┐
│ Most Wanted     │ Street racing legacy                │
│ ██ #E8A000      │ Black & amber, hazard stripe bars   │
│                 │ Teko + Barlow typefaces              │
├─────────────────┼────────────────────────────────────┤
│ Horizon         │ Festival vibes                      │
│ ██ #00D4FF      │ Deep blue & cyan glow               │
│                 │ Rajdhani + Exo 2 typefaces           │
├─────────────────┼────────────────────────────────────┤
│ Midnight        │ Clean & minimal                     │
│ ██ #A78BFA      │ Dark purple, understated             │
│                 │ Syne + Nunito Sans typefaces         │
├─────────────────┼────────────────────────────────────┤
│ M Power         │ BMW Motorsport heritage              │
│ ██ ██ ██        │ Blue / Purple / Red tri-stripe      │
│                 │ Bebas Neue + IBM Plex typefaces      │
└─────────────────┴────────────────────────────────────┘
```

More themes unlockable through progression — JDM Neon, GT Racing, Rally Dirt, Retro 80s, and brand partnerships.

---

## Tech Stack

### Core

| Technology | Purpose | Version |
|:-----------|:--------|:--------|
| ![React Native](https://img.shields.io/badge/React_Native-61DAFB?style=flat-square&logo=react&logoColor=black) | Cross-platform mobile framework | 0.81 |
| ![Expo](https://img.shields.io/badge/Expo-000020?style=flat-square&logo=expo&logoColor=white) | Build toolchain, managed workflow | SDK 54 |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) | Type-safe codebase (strict mode) | 5.9 |
| ![expo-router](https://img.shields.io/badge/expo--router-000020?style=flat-square&logo=expo&logoColor=white) | File-based navigation | v6 |

### Key Libraries

| Library | Purpose |
|:--------|:--------|
| `react-native-maps` | Live map with friend positions and drive tracking |
| `react-native-reanimated` | 60fps animations for transitions and UI polish |
| `expo-linear-gradient` | Theme gradient backgrounds |
| `expo-font` | Custom typography per theme (8 font families) |
| `@react-native-async-storage` | Local data persistence |

### Planned (Phase 2+)

| Technology | Purpose |
|:-----------|:--------|
| Supabase / Firebase | Auth, real-time database, storage |
| WebSockets | Live map presence and messaging |
| Expo Notifications | Push alerts for drives, events, messages |
| EAS Build | Cloud builds for App Store and Google Play |
| OBD2 / Bluetooth | Car telemetry integration |

---

## Architecture

```
driver-hub/
├── app/                        # expo-router file-based routes
│   ├── (tabs)/                 # Tab navigator group
│   │   ├── _layout.tsx         # 5-tab config (Feed, Forum, Friends, Map, Me)
│   │   ├── index.tsx           # Feed tab
│   │   ├── forum.tsx           # Forum tab
│   │   ├── friends.tsx         # Friends & messaging
│   │   ├── map.tsx             # Live map
│   │   └── me.tsx              # Profile, garage, settings
│   └── _layout.tsx             # Root layout (theme provider, fonts)
├── components/
│   ├── ui/                     # Button, Avatar, SectionHeader, Badge
│   ├── cards/                  # PostCard, CarCard, FriendCard, ThreadCard
│   └── themed/                 # HazardBar, MStripeBar, themed decorators
├── lib/
│   ├── themes.ts               # 4 theme definitions (colours, fonts, gradients)
│   ├── car-db.ts               # Vehicle specs database
│   ├── types.ts                # TypeScript interfaces
│   ├── context/                # ThemeContext, UserContext
│   └── data/                   # Mock data (friends, posts, forums, garage)
├── assets/
│   ├── fonts/                  # TTF files for all theme typefaces
│   └── images/                 # App icons, splash screen
├── driver-hub.jsx              # Original prototype (migration reference)
├── CLAUDE.md                   # AI agent configuration
└── VISION.md                   # Full product vision document
```

---

## Getting Started

### Prerequisites

- Node.js 22+ (we recommend [fnm](https://github.com/Schniz/fnm))
- Expo Go app on your phone ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779))

### Install & Run

```bash
git clone https://github.com/Mayell94/DriverHub.git
cd DriverHub
npm install
npx expo start
```

Scan the QR code with Expo Go, or press:
- `a` — open Android emulator
- `w` — open in web browser

---

## Roadmap

```
Phase 1 — Foundation          ◄── YOU ARE HERE
├── Expo scaffold + project config
├── Theme system (4 themes)
├── Core tabs: Feed, Forum, Friends, Map, Me
├── Virtual garage with specs + mods
└── Local-only data

Phase 2 — Social
├── User auth + cloud profiles
├── Real-time messaging
├── Push notifications
├── Feed with media uploads
└── Friend system with presence

Phase 3 — Live Map
├── Real-time friend positions
├── Drive recording + history
├── Route sharing + ratings
├── Convoy mode
└── Mount mode HUD

Phase 4 — Progression
├── XP + levelling system
├── Achievements + badges
├── Streaks + challenges
├── Reputation system
└── Leaderboards

Phase 5 — Scale
├── OBD2 telemetry
├── CarPlay / Android Auto
├── Premium tier + theme store
├── Brand partnerships
└── Global launch
```

---

## Project Status

**Phase 1 — Foundation.** Migrating from a fully working web prototype (`driver-hub.jsx`) to React Native + Expo. The prototype demonstrates the complete UI, all 4 themes, and every feature's interaction model — it serves as the blueprint for the native implementation.

---

## Contributing

Not open for contributions yet — we're in early development. Star the repo to follow along.

---

## License

MIT

---

<p align="center">
  <strong>This is the app we wish existed. Now we're building it.</strong>
</p>
