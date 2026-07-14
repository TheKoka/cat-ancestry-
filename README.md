# Cat Ancestry

An Expo Router starter for a mobile app that analyzes a cat photo and returns:

- likely breed or breed mix
- confidence level
- likely origin region
- a short breed-history story
- notable traits
- care tips

## What this is

This repo is now a real Expo app base for iPhone, Android, and web. It includes:

- Expo Router app structure
- TypeScript setup
- native-friendly mobile UI
- photo picker flow
- typed API service layer
- `eas.json` starter profiles for store builds

## Quick start

1. Install dependencies:

   ```powershell
   npm install
   ```

2. Start the app:

   ```powershell
   npm start
   ```

3. Open it in Expo Go, iOS Simulator, or Android Emulator.

## Backend setup

This app is designed to call a backend endpoint instead of putting your OpenAI secret in the mobile app.

Create a `.env` file:

```powershell
EXPO_PUBLIC_API_URL=https://your-api.example.com
```

The app will call:

```text
POST {EXPO_PUBLIC_API_URL}/api/analyze
```

Expected JSON response:

```json
{
  "report": {
    "headline": "Velvet Sultan of the Silk Road",
    "likelyBreed": "Domestic longhair with Persian and Turkish Angora influence",
    "confidence": "Moderate",
    "originRegion": "Eastern Mediterranean and West Asia",
    "originStory": "A short historical story here.",
    "visualSummary": "A concise visual summary here.",
    "personalityRead": "A concise personality summary here.",
    "notableTraits": ["Trait one", "Trait two"],
    "careTips": ["Tip one", "Tip two"],
    "caveat": "Photo-based breed reads are estimates, not genetic proof."
  }
}
```

If `EXPO_PUBLIC_API_URL` is missing, the app falls back to a built-in demo report so the starter still runs immediately.

## Shipping

- `npm start` for Expo Go
- `npm run ios` / `npm run android` for native run commands
- `eas build --platform ios`
- `eas build --platform android`

You will still need to install dependencies and authenticate EAS before real store builds.
