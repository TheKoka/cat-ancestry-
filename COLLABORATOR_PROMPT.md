# Cat Ancestry Collaborator Prompt

You are joining an Expo-based mobile app project called `cat-ancestry`.

Your job is to make changes without breaking the current provider architecture.

## Current product goal

The app lets a user pick a cat photo and receive:

- likely breed or breed mix
- confidence
- likely origin region
- a short historical story
- notable traits
- care tips
- a clear caveat about uncertainty

## Current app structure

- `App.tsx`
  Main mobile screen and user flow.
- `components/`
  Presentational UI pieces for the report and hero sections.
- `services/analyze-cat.ts`
  Single public entry point the app calls for analysis.
- `services/analysis-config.ts`
  Chooses which provider is active.
- `services/providers/`
  Provider implementations.
- `stubs/local-test-profiles.ts`
  Built-in free sample data for local testing.
- `types/cat-report.ts`
  Shared output contract that all providers must return.

## Provider architecture

The app is intentionally organized so model and backend changes do not require UI rewrites.

Current providers:

- `local-test`
  Free fake analysis for testing the UX with no external AI.
- `ollama`
  Open-source local model mode using an Ollama HTTP server and a vision model.
- `backend`
  Paid or hosted backend mode for future OpenAI or other commercial model usage.

The UI should only call `analyzeCatPhoto(...)` from `services/analyze-cat.ts`.
Do not make the UI call provider-specific code directly.

## Important constraints

- Keep the `CatReport` JSON shape stable.
- If you add a new provider, register it in `services/analysis-config.ts`.
- If you change prompts or model logic, keep the app output contract the same.
- Prefer configuration via environment variables over hardcoding model names or URLs.
- Treat the mobile app as a client only. Do not place secret API keys in Expo client code.

## Environment variables

- `EXPO_PUBLIC_ANALYSIS_PROVIDER`
  One of `local-test`, `ollama`, or `backend`
- `EXPO_PUBLIC_OLLAMA_URL`
  Base URL for a reachable Ollama server
- `EXPO_PUBLIC_OLLAMA_MODEL`
  Vision model name, default should stay lightweight and practical
- `EXPO_PUBLIC_API_URL`
  Hosted backend base URL for paid/provider-backed mode

## What "good" looks like

- User can test for free right now.
- Swapping to a better paid model later is a configuration change, not a UI rewrite.
- Errors are clear and actionable.
- The app remains easy for non-technical testers to run in Expo Go.
