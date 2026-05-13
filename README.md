# Cricket Manager (localhost-ready)

A playable cricket manager game using real player names. Build an XI, respect budget/role constraints, and simulate a T20 score.

## Run now on localhost

```bash
python3 -m http.server 8080
```

Open: <http://localhost:8080>

## What is included

- Player market with real cricket names.
- Search + role filters.
- Squad builder with:
  - 11-player limit
  - budget cap (100)
  - role requirements (min batters, bowlers, all-rounder, wicketkeeper)
- Auto-pick XI button.
- Match simulation button.
- Requested "abdulls" included:
  - Abdul Samad
  - Abdullah Shafique
  - Abdullah Al Mamun

## Deploy to Vercel

This app is static. Deploy as-is:

```bash
npx vercel
```
