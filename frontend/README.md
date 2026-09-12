# KAALYUG — Frontend

> React 19 + Vite + TypeScript + Tailwind CSS 4 + React Router 7 single-page app.
> This branch (`miku`) contains the **pages-based frontend redesign** merged from `drj` — see [Changelog](#7-changelog-drj-branch--frontend-only) below.

---

## 1. Requirements

| Tool | Version |
| --- | --- |
| Node.js | **>= 20, < 23** |
| npm | 10+ (ships with Node 20) |

## 2. Running the frontend (dev)

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 (Vite prints the exact URL in the terminal).

Other scripts:

```bash
npm run build    # production build into dist/
npm run start    # preview the production build (vite preview)
npm run lint     # eslint over src/
```

## 3. Environment variables

Copy `.env.example` to `.env` (and never commit it):

```bash
VITE_API_URL=http://localhost:5000/api          # Kaalyug marketplace API
```

Defaults when the variable is missing:

* **Dev** — marketplace: `http://localhost:5000/api`
* **Production (Vercel)** — same-origin rewrite `/marketplace-api/*` configured in `vercel.json`

## 4. Running the whole stack (frontend + backend)

```bash
# terminal 1 — marketplace API (repo root /backend)
cd backend && npm install && npm run dev   # default port 5000

# terminal 2 — frontend
cd frontend && npm run dev                 # default port 5173
```

Create an account on `/register`, then sign in on `/login`. Admin accounts get access to `/admin`.

## 5. Deployment (Vercel / Render)

* The `vercel.json` SPA rewrites (`/(.*)` → `/index.html`) mean **all new routes work on refresh and direct visits** — no server changes needed.
* Set `VITE_API_URL` in your host's environment settings (or rely on the same-origin rewrite in production).
* Root `render.yaml` can also deploy the API + frontend as separate Render services.

## 6. Project structure (pages system)

```
frontend/src/
├── App.tsx              # route table (layout route + auth routes)
├── components/          # UI sections + Layout shell (Navbar/Footer/Outlet)
│   ├── Layout.tsx       # NEW — shared shell: Navbar + <Outlet/> + Footer, scroll-to-top
│   └── Hero.tsx, Marketplace.tsx, Publish.tsx, Ecosystem.tsx, Stats.tsx, CTA.tsx, Footer.tsx
├── pages/
│   ├── Home.tsx             # /            (Hero + Stats + CTA)
│   ├── MarketplacePage.tsx  # /marketplace (live data, filters + search)
│   ├── PublishPage.tsx      # /publish     (publish a project form)
│   ├── EcosystemPage.tsx    # /ecosystem   (open-source + community layers + Stats)
│   ├── Login.tsx            # /login
│   ├── Register.tsx         # /register
│   └── Admin.tsx            # /admin (admin-only guard)
└── lib/                 # api.ts (base URL, error helpers), auth.ts
```

## 7. Changelog (drj branch) — frontend only

**Redesign: one-pager → real `/pages` route system, same visual look kept.**

* **NEW routes** — every former home-page section is now its own page/URL:
  * `/` — landing (hero, stats, CTA)
  * `/marketplace` — project browser
  * `/publish` — publish form
  * `/ecosystem` — ecosystem info
* **NEW `components/Layout.tsx`** — shared shell (Navbar + `<Outlet/>` + Footer) used by all main routes; scrolls to top on navigation.
* **`App.tsx` rewritten** — nested layout route with `react-router-dom` `<Outlet/>`; auth pages (`/login`, `/register`, `/admin`) stay standalone full-screen.
* **`Navbar.tsx`** — anchor links (`#marketplace`…) replaced with `<Link>` routes + **active-page highlight**; logo now links home.
* **`Hero.tsx` / `CTA.tsx` / `Footer.tsx`** — buttons and links point to the new routes instead of hash anchors.
* **Section components untouched internally** — all styling, gradients, glass cards, data fetching and behavior are exactly as before (same looks).
* **Standalone pages get a small top padding wrapper** so they sit nicely below the sticky navbar.
* **Verified:** all deep links work on Vercel/Render thanks to the existing `vercel.json` SPA fallback rewrite.
* **Lato font** — loaded via Google Fonts (`@import` in `index.html`) and set as the app-wide `font-family` in `styles.css`.
**Follow-up changes (auth gating + cleanup):**

* **Guests only see public data** — unauthenticated visitors can browse `/`, `/marketplace`, `/ecosystem`, but the **Publish (upload) page is hidden and locked**:
  * `Navbar.tsx` — the Publish link only renders for logged-in users (session is read synchronously, so there is no flash of the link before login state loads; it re-checks on every route change).
  * `App.tsx` — new `RequireAuth` route guard: visiting `/publish` without a session redirects to `/login`. After login, the Publish page appears in the nav and works exactly as before.
* **Lato font** — loaded from Google Fonts in `index.html` and set as the global `font-family` in `styles.css` (replacing Inter as primary).
* **Removed Vite/Next starter branding** — deleted the leftover `public/*.svg` icon files (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`); the app uses Font Awesome icons everywhere, no local SVGs remain.
* **Login pages unchanged** — `/login` and `/register` keep the same glass-card style; they now simply inherit the Lato font too.

**UI polish pass (theme cleanup):**

* **Removed all purple / "AI glow" styling** — every `#7647ff` / `#9b5dff` accent, glow shadow and purple radial background is gone; the theme is now one consistent **dark neutral + teal (`#71e5d1`)** accent used across navbar, hero, marketplace chips, publish, ecosystem, stats, CTA and footer.
* **Landing page got real content** — new **`HowItWorks`** section ("Three steps. That's it.") between the hero and stats: create an account → discover projects → publish your work.
* **Login/Register always in the nav** — the navbar now shows a **Login** button and a solid teal **Register** button for guests on all screen sizes (previously the login link was hidden on mobile).
* **Navbar is responsive** — links wrap instead of disappearing on small screens; the logo mark is a flat teal tile (no gradient/glow).
* **Typography fixed** — all the unreadable 7–9px labels bumped to 10–13px, body copy raised to 13–15px, headings use `clamp()` for sane scaling; full **Lato** typeface throughout.
* **Primary buttons** (auth forms, register) are solid teal with dark text; project-card preview tiles use neutral gradients instead of colored glows.
* **Cosmic whale logo (`public/logo.jpeg`)** now used in three places:
  * **Navbar** — the logo tile is the actual whale artwork (`<img src="/logo.jpeg">`, rounded).
  * **Favicon** — `index.html` links `/logo.jpeg` as the browser-tab icon.
  * **Hero backdrop** — the landing hero renders the whale as a large dimmed background (28% opacity + dark gradient overlay) behind the headline, keeping text fully readable.

**miku branch — synced with drj + backend fixes:**

* **Frontend fully synced with `drj`** — the `/pages` route system, Lato font, teal theme, auth gating, HowItWorks landing section, whale logo (navbar/favicon/hero) are all present here.
* **YugCoin wallet integration removed** — the separate wallet service, its login/register pages (`/yugcoin/*`), the `/wallet` route, the wallet backend endpoints and models were all removed; Kaalyug is now a single self-contained marketplace app.
