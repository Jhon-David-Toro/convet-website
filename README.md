# CONVET

Web application and design system for **CONVET** (Contreras Veterinary Services N.V.), a veterinary clinic in Savaneta, Aruba. The project turns the clinic's Figma file into a working front end: the public website, the sign-in flow, the customer app, and the staff and admin tools.

> **Status: `0.1.0`, front end only.** There is no backend yet. All data is mock data kept in the `*.constants.ts` files of `src/lib`, and forms accept callbacks so an API can be plugged in later. Changes made in the UI are not saved and are lost on reload.

## Contents

- [Tech stack](#tech-stack)
- [Quick start](#quick-start)
- [Scripts](#scripts)
- [Environment variables](#environment-variables)
- [What is in the app](#what-is-in-the-app)
- [Project structure](#project-structure)
- [Conventions](#conventions)
- [Testing and quality](#testing-and-quality)
- [SEO and performance](#seo-and-performance)
- [Known limitations](#known-limitations)
- [Contributing](#contributing)

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19 with the React Compiler enabled |
| Language | TypeScript (strict) |
| Styling | SCSS Modules and design tokens in `src/styles` |
| Icons | `lucide-react`, imported through `@/components/ui/Icon` |
| Images | `next/image` with photos served from Cloudinary |
| Tests | Vitest, Testing Library, jsdom |
| Package manager | pnpm |

Next.js 16 has breaking changes compared with older versions. Before changing routing, metadata or caching code, read the guides in `node_modules/next/dist/docs/`.

## Quick start

Requirements: Node.js 20 or later and [pnpm](https://pnpm.io).

```bash
pnpm install
cp .env.example .env.local   # optional, see "Environment variables"
pnpm dev
```

Open <http://localhost:3000>. The app runs without any environment variable: the map is drawn as a stylized illustration and photos fall back to `public/photos/<name>.jpg`.

## Scripts

```bash
pnpm dev          # development server
pnpm build        # production build (also type-checks)
pnpm start        # serve the production build
pnpm typecheck    # tsc --noEmit
pnpm lint         # eslint
pnpm test         # vitest run
pnpm test:coverage  # vitest run with a coverage report in coverage/index.html
```

Before finishing any change, run `typecheck`, `lint`, `test` and `build`.

## Environment variables

Put them in `.env.local`. All of them are optional.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public address of the site. Used for the sitemap, canonical URLs and share images. Defaults to `https://convet.aw`. **Set it to the real domain before publishing.** |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary account that hosts the photos. Without it, photos load from `public/photos/`. |
| `NEXT_PUBLIC_CLOUDINARY_FOLDER` | Folder inside the Cloudinary account, if the photos are not at the root. |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps Embed API key. Without it the contact map is a stylized illustration. |

## What is in the app

Every screen follows a Figma frame (file "Pagina"). Pages are responsive: desktop, tablet and mobile.

### Public website

| Route | Page |
| --- | --- |
| `/` | Home: hero, quick access, location |
| `/services`, `/services/[slug]` | Service list and detail |
| `/products`, `/products/[slug]` | Product catalog and detail (no prices, no online sales) |
| `/contact` | Contact form, map and phones |

### Authentication

`/sign-in`, `/sign-up`, `/verify-email`, `/forgot-password` and `/two-step-verification` (staff). The pending email is kept in `sessionStorage` for now, never in the URL.

### Customer app (`/app`)

| Route | Page |
| --- | --- |
| `/app` | Overview |
| `/app/pets`, `/app/pets/[petId]/[tab]` | My pets and pet profile (overview, vaccines, history…) |
| `/app/appointments` | Upcoming, past and cancelled appointments; cancel with undo |
| `/app/reschedule/[id]` | Reschedule an appointment |
| `/app/profile` | Profile and settings |
| `/book` | Booking wizard: pet, service, vet, day and time, review, confirmation |

### Staff area (`/staff`)

Today (schedule by vet), appointments table, patient record, client detail and visit record (`/staff`, `/staff/schedule`, `/staff/patients/[petId]`, `/staff/clients/[clientId]`, `/staff/visits/[visitId]`).

### Admin area (`/admin`)

Dashboard, schedule, appointments, clients and pets, inventory (stock, product lots, receive stock, stock movements), suppliers, services, products, team, locations and settings. Admin shares the shell of the staff area with its own navigation.

The customer, staff and admin areas are not indexed by search engines.

## Project structure

```
src/
  app/                  Routes (App Router). Pages only compose sections.
    (public pages)      /, services, products, contact
    app/                Customer app (+ reschedule)
    staff/  admin/      Staff and admin areas
    book/               Booking wizard
    robots.ts sitemap.ts
  components/
    ui/                 Generic components (Button, Select, Modal, Table cells…)
    patterns/           Domain components (AppointmentCard, DataTable, StatGrid…)
    sections/           Page-level sections built from ui and patterns
  lib/                  Shared code, one folder per domain
    shared/             cx, hooks, keys, labels (used by many components)
    site/               clinic data, SEO, photos, WhatsApp links
    auth/               auth copy, validation, pending email
    customer/ booking/  customer area and booking: data, types, helpers
    staff/ admin/       staff and admin areas: data, types, helpers
    catalog/            services and products
  styles/               Tokens (foundations), mixins (abstracts), reset (base)
```

Every component lives in its own folder:

```
src/components/ui/Select/
  Select.tsx            component (named export)
  Select.types.ts       every type
  Select.constants.ts   every constant
  Select.utils.ts       pure logic
  Select.module.scss    styles
  Select.test.tsx       tests
  index.ts              public exports
  hooks/                state and behavior
  parts/                sub-components
```

Mock data lives in `src/lib`: `customer/`, `booking/`, `staff/` and `admin/`. Replacing those modules with API calls is the main step to connect a backend.

## Conventions

The full rules are in [`CLAUDE.md`](./CLAUDE.md). The most important ones:

- **Language:** code, comments, docs and commit messages are in English.
- **Constants and types** never live in `.tsx`, hooks or utils: constants go in `X.constants.ts`, types in `X.types.ts`. Types and constants carry no comments; functions are documented with JSDoc.
- **Complexity:** every function stays at 10 or less (Code Metrics). Split into `parts/`, `hooks/` and `X.utils.ts` instead of growing a component.
- **Effects** only call a named function; the logic lives in utils.
- **Styles** use tokens (`var(--spacing-16)`, `typography.style("body-m")`), and class names are built with `cx()`.
- **Components** accept native attributes (`...rest`), are Server Components by default, and treat accessibility as part of the component (roles, keyboard, 44 px touch targets).
- **No deprecated APIs.** ESLint enforces `@typescript-eslint/no-deprecated`.
- **Git:** conventional commits, subject only, one commit per component or section.

## Testing and quality

```bash
pnpm test
```

Each component has a `*.test.tsx` next to it (Vitest and Testing Library), and shared logic has its own tests. The suite has about 600 tests and covers more than 99 % of the statements. Tests run in a shared VM context (`pool: "vmThreads"`) to stay fast.

## SEO and performance

- Metadata, Open Graph and Twitter cards in `src/app/layout.tsx`; per-page titles and descriptions; canonical URLs on service and product pages.
- `robots.txt` and `sitemap.xml` are generated (`src/app/robots.ts`, `src/app/sitemap.ts`).
- JSON-LD (`VeterinaryCare`) on the home page.
- Public pages are statically generated; fonts load through `next/font`; images are served as AVIF or WebP, and images visible on load use `priority`.

## Known limitations

- No backend: data is mock data and nothing persists.
- Some navigation targets do not exist yet (for example "Health records" and "Settings" in the customer app, and "Inventory" in the staff area).
- Some row actions and buttons ("...", "New client", "Invite team member"…) are visual only.
- The Figma file has small inconsistencies between frames (dates, counts). Where they conflict, the mock data picks one value.

## Contributing

1. Create a branch from `main`.
2. Follow the conventions above and reuse existing components before creating new ones.
3. Run `pnpm typecheck`, `pnpm lint`, `pnpm test` and `pnpm build`.
4. Commit with a conventional message and no body, for example `feat: added Button component`.
