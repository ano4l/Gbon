# Gabon Connect — Demo Website

Pitch demo built from `GABON CONNECT .pdf` (brief v2). Static, no backend, French-first with an English toggle.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs dist/
```

## Forms (waitlist, partner contact, connect requests, readiness results)

Copy `.env.example` to `.env` and set `VITE_FORMSPREE_ID` to a Formspree form ID for real email capture.
Without it, submissions are saved to `localStorage` (`gc-submissions`) so the demo still shows a working flow.

## Structure

- `src/pages/` — Home, Readiness (Pillar A), Network + Profile (Pillar B), Opportunities (Pillar C, 3 tabs), About, Partner (Pillar D)
- `src/lib/readinessRules.js` — rule-based eligibility engine (150M FCFA SME threshold, SGG, BCEG, ANPI, label startup 2026, Kimba Connect, joint bids)
- `src/data/` — seed content: institutions, taxonomy, 8 sample profiles, resources, public digest, funding, stories
- `src/i18n/` — FR (default) / EN dictionaries

## Deploy

Vercel or Netlify, framework preset **Vite**. SPA rewrites are included (`vercel.json`, `public/_redirects`).

## Guardrails honoured

No tender publication or bid submission, no official-status claims, no live government data, no payments. All public-sector content is labeled as illustrative and links out to lejmp.com / SIGFiP / ANPI / SGG / Kimba Connect.
