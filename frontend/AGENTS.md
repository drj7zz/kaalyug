# Frontend Agent Notes

Kaalyug's frontend is a **Vite + React 19 + React Router 7** single-page app (TypeScript, Tailwind utilities).
Do **not** scaffold Next.js, server components, route handlers, or `next/*` imports.

## Stack & conventions

- Build / dev: `npm run dev` (Vite), `npm run build` (Vite build), `npm run lint` (ESLint `src`).
- Routing: declarative `<Routes>` / `<Route>` in `src/App.tsx`. Page components live in `src/pages/`, shared UI in `src/components/`.
- API base URL: `marketplaceApiUrl` from `src/lib/api.ts`. In prod Vite the path `/marketplace-api/*` is rewritten to the Render backend via `vercel.json`.
- Auth/session helper: `src/lib/auth.ts` (`getSession`, `saveSession`, `UserSession`). Avoid duplicating `localStorage` reads.
- Path alias: `@/*` → `src/*` (remember to keep `paths` in `tsconfig.json` if you add new top-level folders).

## Touching backend endpoints

- Backend lives at `../backend` (Express). Endpoints mounted in `backend/server.js`:
  - `POST /api/users/register`, `POST /api/users/login`, `GET /api/users/me`
  - `GET /api/projects`, `POST /api/projects`, `GET /api/projects/mine`
  - `GET /api/admin/dashboard`
  - `GET /api/wallet/balance/:userId`, `POST /api/wallet/payment`, `POST /api/wallet/send`,
    `GET /api/wallet/history/:userId`, `GET /api/wallet/payments/:reference`, `GET /api/wallet/transactions/:reference`

## Style & UI helpers

- Global styles: `src/styles.css` + `src/theme.css`. Use the existing `glass-card`, `auth-*`, `btn-primary`, `btn-secondary` classes when possible.
- Icons: FontAwesome 6 (`<i className="fa-solid fa-..." />`) — already imported via the public stylesheet.
- Do not introduce a CSS-in-JS layer; keep utility classes in `styles.css`.

## When working on this tree

- Run `npx tsc --noEmit` before pushing if you touched `.ts` / `.tsx`.
- `vite-out.log` is build noise — leave it ignored.
