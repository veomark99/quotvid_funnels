# QuotVid Funnels

Next.js (App Router) app for acquisition funnels (Pinterest-first, more platforms later). Integrates with the **QuotVid backend** for validation, pending signups, set-password emails, and plan assignment.

## Stack

- **Next.js** 16 · **React** 19 · **TypeScript** · **Tailwind CSS** v4

## Scripts

```bash
npm run dev      # local dev — http://localhost:3000
npm run build    # production build
npm run start    # run production server
npm run lint     # ESLint
```

## Environment

Copy `.env.example` to `.env.local` and fill values. The backend will require **CORS** for this origin plus a **server-to-server secret** (`FUNNEL_API_SECRET`) on funnel APIs.

## Routes

| Path | Behavior |
|------|----------|
| `/` | **404** — root is not listed as a funnel index; share only direct funnel URLs. |
| `/f/pinterest`, `/f/youtube`, … | Acquisition funnels — styles per route in `src/app/f/<slug>/` |
| Anything else | Branded **404** (`src/app/not-found.tsx`). |

Each funnel keeps its own scoped stylesheet + `layout.tsx`; shared `/f` typography is in `src/app/f/layout.tsx`. Copy & `AcquisitionFunnel` live in `src/components/funnel/` + `src/funnels/funnel-models.tsx`.

## Next steps (with backend)

1. POST pending user + JSONB persona draft from funnel form.
2. Email link to set password on main app or dedicated page.
3. Activate user, attach `pinterest-free-trial-5days`, seed persona, welcome email, first video job.

## Repo layout

- `src/app/` — routes and layouts  
- `src/` — shared components and `lib/` (env, API clients) as we add them
