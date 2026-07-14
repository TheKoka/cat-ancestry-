# Cat Ancestry

An Expo-based mobile app that analyzes a cat photo and returns:

- likely breed or breed mix
- confidence level
- likely origin region
- a short breed-history story
- notable traits
- care tips

## What this is

This repo is now a real Expo app base for iPhone, Android, and web. It includes:

- Expo app starter structure
- TypeScript setup
- native-friendly mobile UI
- photo picker flow
- typed API service layer
- pluggable analysis providers
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
EXPO_PUBLIC_ANALYSIS_PROVIDER=local-test
EXPO_PUBLIC_API_URL=https://your-api.example.com
EXPO_PUBLIC_OLLAMA_URL=http://192.168.1.100:11434
EXPO_PUBLIC_OLLAMA_MODEL=qwen2.5vl:3b
```

Supported providers:

- `local-test`: free built-in testing mode, no API billing
- `ollama`: free open-source local model mode
- `backend`: calls your own backend endpoint

## Free open-source mode with Ollama

If you want a real model without paying for API usage, use Ollama on your computer.

Recommended starting model:

- `qwen2.5vl:3b`

Why this one:

- modern vision-language model
- relatively lightweight
- easier to run locally than larger models

Install and run Ollama, then pull the model:

```powershell
ollama pull qwen2.5vl:3b
```

Start the server if needed, then set:

```powershell
EXPO_PUBLIC_ANALYSIS_PROVIDER=ollama
EXPO_PUBLIC_OLLAMA_URL=http://YOUR_COMPUTER_LAN_IP:11434
EXPO_PUBLIC_OLLAMA_MODEL=qwen2.5vl:3b
```

Notes:

- Your phone must be able to reach your computer on the same network.
- `127.0.0.1` will not work from Expo Go on your phone.
- If `qwen2.5vl:3b` is too heavy or slow, you can swap models later without changing the app UI.

For backend mode, the app will call:

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

If you do nothing, the app defaults to `local-test` mode so it works for free right away.

To switch to a real paid model later:

1. Build or deploy your backend.
2. Set:

   ```powershell
   EXPO_PUBLIC_ANALYSIS_PROVIDER=backend
   EXPO_PUBLIC_API_URL=https://your-api.example.com
   ```

3. Keep returning the same JSON contract to the app.

## Shipping

- `npm start` for Expo Go
- `npm run ios` / `npm run android` for native run commands
- `eas build --platform ios`
- `eas build --platform android`

You will still need to install dependencies and authenticate EAS before real store builds.
