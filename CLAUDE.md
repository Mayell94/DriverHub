# Driver Hub — CLAUDE.md

## Project

Driver Hub is a car enthusiast social platform built with React Native + Expo. Users manage their virtual garage, chat with friends, browse forums, track friends on a live map, and customise themes. Migrated from a single-file React web prototype (`driver-hub.jsx`, kept as reference).

- **Tech stack:** React Native 0.81, Expo SDK 54, TypeScript, expo-router v6
- **Package manager:** npm
- **Node version:** 22.x (via fnm)

## Quick Commands

Always prefix with `rtk` for token efficiency:

```bash
rtk npm install              # Install dependencies
rtk npx expo start           # Dev server (Expo Go / emulator)
rtk npx expo run:android     # Local Android build
rtk npx expo run:ios         # Local iOS build (macOS only)
rtk npx tsc --noEmit         # TypeScript check
rtk npm test                 # Run tests
```

Even in chains: `rtk npm install && rtk npx expo start`

## Directory Structure

```
app/                    # expo-router file-based routes
  (tabs)/               # Tab layout group
    _layout.tsx         # Tab navigator config (5 tabs)
    index.tsx           # Feed tab (default)
    forum.tsx           # Forum tab
    friends.tsx         # Friends/Chat tab
    map.tsx             # Live Map tab
    me.tsx              # Profile/Garage/Settings tab
  _layout.tsx           # Root layout (theme provider, fonts)
components/             # Shared reusable components
  ui/                   # Primitives: Button, Avatar, SectionHeader, Badge
  cards/                # Feed post card, car card, friend card, thread card
  themed/               # Theme-aware: HazardBar, MStripeBar
lib/                    # Business logic and utilities
  themes.ts             # 4 theme definitions with full colour/font systems
  car-db.ts             # Car specs database (11 cars, real-world accurate)
  types.ts              # TypeScript interfaces
  context/              # React contexts (ThemeContext, UserContext)
  data/                 # Initial/mock data (friends, chats, posts, forum)
assets/                 # Static assets
  fonts/                # Custom fonts per theme (TTF files)
  images/               # App icons, splash screen
driver-hub.jsx          # ORIGINAL PROTOTYPE — migration reference only
```

## Conventions

- Styles use `StyleSheet.create()` — NEVER inline style objects in JSX
- Theme access via `useTheme()` hook from context
- All colours come from theme object — no hardcoded values in components
- Navigation via expo-router `<Link>` and `useRouter()`
- TypeScript strict mode — all props typed, no `any`
- Components use PascalCase filenames and named exports
- Platform-specific code uses `.ios.tsx` / `.android.tsx` suffixes when needed

## React Native Gotchas

- NO `<div>` → use `<View>`. NO `<span>/<p>` → use `<Text>`. NO `<button>` → use `<Pressable>`
- NO CSS: no `cursor`, no `hover`, no `text-decoration`, no CSS gradients
- Gradients: use `expo-linear-gradient` (LinearGradient component)
- Maps: use `react-native-maps` (MapView) — NOT canvas
- Custom fonts: load via `expo-font` in root layout, reference by string name
- `borderRadius` does not support percentages — use numeric values
- No `window` object — use `useWindowDimensions()` for screen size
- No `localStorage` — use `@react-native-async-storage/async-storage`
- Animations: use `react-native-reanimated` (not CSS transitions)

## Preserved Patterns from Prototype

- **4 themes:** Most Wanted, Horizon, Midnight, M Power — same colour keys
- **Theme context:** ThemeCtx / useTheme() — same hook API
- **M Power stripe:** `mTheme: true` triggers tri-colour bars (blue/purple/red)
- **HazardBar:** M stripe, hazard stripe, or gradient based on theme flags
- **CAR_DB:** 11 cars with real specs — preserve exact values
- **Colour keys:** bg, bgAlt, card, cardBorder, accent, accentHot, accentGlow, etc.

## Don't Touch

- Theme colour values — carefully tuned per theme
- CAR_DB spec data — real-world accurate values
- `driver-hub.jsx` — keep as migration reference until all features are ported
