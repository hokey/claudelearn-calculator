# Plan: Android & iOS/iPad Support for ClaudeLearn Calculator

## Context

The calculator app currently runs as a web application: a React/Vite frontend talking to an Express/TypeScript backend. It has responsive CSS for mobile browsers but no native mobile apps. This plan outlines what would be needed to ship the calculator on Android and iOS/iPad as native apps.

---

## Recommended Approach: Expo (React Native)

Expo is the best fit here. It produces true native apps for both platforms from a single TypeScript codebase, integrates well with the existing calculator logic, and handles the iOS/Android build complexity for you.

### Why not the alternatives?
- **PWA**: iOS severely limits PWA capabilities (no home screen badge, unreliable service workers). Fine for a demo but not a real app.
- **Capacitor**: Wraps a WebView — native in name only. Fine if the web UI must be reused verbatim, but React Native gives a much better native feel.

---

## What Can Be Reused

| Existing Asset | Reusable? | Notes |
|---|---|---|
| `src/utils/calculator.ts` | ✅ Yes | Pure TypeScript logic, zero dependencies — copy directly |
| `src/utils/calculator.test.ts` | ✅ Yes | Jest tests work in Expo via `jest-expo` |
| `src/server/` (Express API) | ✅ Yes | Keep as-is; mobile app calls same API |
| `client/src/hooks/useCalculator.ts` | ✅ Yes | Pure state logic, no DOM dependencies |
| `client/src/services/api.ts` | ✅ Yes | Minimal changes to point at deployed API URL |
| React components (`.tsx`) | ⚠️ Partial | Logic reusable; JSX must switch `div`→`View`, `button`→`TouchableOpacity`, CSS → StyleSheet |

---

## New Work Required

### 1. Project Scaffold
- Create `mobile/` directory at repo root
- `npx create-expo-app mobile --template blank-typescript`
- Adds `app.json` (app name, bundle ID, icons, splash screen), `expo-constants`, etc.

### 2. Shared Logic Package (optional but clean)
- Extract `calculator.ts` and `useCalculator.ts` into `packages/core/`
- Configure npm workspaces so both `client/` and `mobile/` import from `@claudelearn/core`
- Avoids duplicating logic

### 3. Native UI Components
Rewrite the 5 calculator components using React Native primitives:

| Web component | Native equivalent |
|---|---|
| `Calculator.tsx` | Same structure, swap `div` → `View` |
| `Display.tsx` | `Text` inside `View`; `StyleSheet` for green glow via `textShadow` |
| `Button.tsx` | `TouchableOpacity` or `Pressable` with `StyleSheet` |
| `ButtonGrid.tsx` | `FlatList` or nested `View` rows with `flexDirection: 'row'` |
| `useCalculator.ts` | No changes needed |

### 4. API Configuration
- Add environment-aware base URL in `mobile/src/services/api.ts`
- Dev: point to local machine IP (e.g. `http://192.168.x.x:3000`)
- Production: point to deployed API URL
- Use `expo-constants` or a `.env` file with `EXPO_PUBLIC_API_URL`

### 5. Platform-Specific Adaptations

**iOS/iPad:**
- `app.json`: set `ios.supportsTablet: true` and `ios.bundleIdentifier`
- iPad layout: use `useWindowDimensions()` to render a wider button grid on large screens
- Test on iOS Simulator (requires macOS + Xcode)

**Android:**
- `app.json`: set `android.package` (e.g. `com.claudelearn.calculator`)
- Keyboard input: replace web `keydown` listeners with `TextInput` or hardware keyboard events via `useFocusEffect`
- Test on Android Emulator (AVD) or physical device

### 6. Icons & Splash Screen
- Provide `assets/icon.png` (1024×1024) and `assets/splash.png` (1284×2778)
- Expo's prebuild step handles resizing for all densities

### 7. Build & Distribution
- **Development**: `npx expo start` → scan QR code with Expo Go app (no Xcode/Android Studio needed for basic testing)
- **Production builds**: use EAS Build (`eas build --platform all`)
  - iOS: requires Apple Developer account ($99/yr) and provisioning profiles
  - Android: requires Google Play Console account ($25 one-time)
- **OTA updates**: Expo Updates allows JS bundle updates without App Store review

---

## File Structure After Implementation

```
claudelearn/
├── packages/
│   └── core/                    # NEW — shared calculator logic
│       ├── calculator.ts
│       └── useCalculator.ts
├── src/                         # Existing backend (unchanged)
├── client/                      # Existing web frontend (unchanged)
├── mobile/                      # NEW — Expo app
│   ├── app.json
│   ├── package.json
│   ├── App.tsx
│   └── src/
│       ├── components/
│       │   └── Calculator/      # Native versions of web components
│       ├── hooks/               # (or import from packages/core)
│       └── services/
│           └── api.ts
└── package.json                 # Update for npm workspaces
```

---

## Critical Files to Create/Modify

- `mobile/app.json` — app metadata, icon, splash, platform config
- `mobile/src/components/Calculator/Calculator.tsx` — native UI
- `mobile/src/services/api.ts` — API client with env-aware URL
- `package.json` — add `workspaces: ["client", "mobile", "packages/*"]`
- `packages/core/calculator.ts` — extracted shared logic

---

## Verification

1. `npx expo start` → open in Expo Go on iOS and Android device/simulator
2. Verify all 7 operations work (add, subtract, multiply, divide, sqrt, pow, mod)
3. Verify error states (division by zero, negative sqrt)
4. Verify iPad layout renders correctly (wider button grid)
5. Run `npm test` — existing Jest suite still passes unchanged
6. `eas build --platform all --profile preview` — produces installable `.ipa` / `.apk`
