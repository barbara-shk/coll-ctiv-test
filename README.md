# Collctiv — Pot Creation Journey

A client-side implementation of the Collctiv pot-creation flow, built from the
provided Figma design. A visitor lands on the marketing homepage, picks a
category, names their pot, and is taken to the dynamically-rendered pot
information screen on the simulated `app.collctiv.com` subdomain. Any action
on that screen is intercepted by a sign-up modal.

## Tech stack

| Concern | Choice |
| --- | --- |
| Framework | **Next.js 16** (App Router, TypeScript, Turbopack) |
| Styling | **styled-components 6** with SSR registry + SWC plugin |
| Animation | **framer-motion** for modal + hero entrance micro-interactions |
| State | React Context + `localStorage` (survives the simulated domain hop) |
| Tests | **Vitest** + **React Testing Library** + **jsdom** |
| Fonts | **Inter** and **Montserrat** via `next/font/google` |

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000

npm test             # run the Vitest suite once
npm run test:watch   # interactive watch mode
npm run build        # production build
```

Requires Node 20+.

## Routes

| URL | Represents | Notes |
| --- | --- | --- |
| `/` | `collctiv.com` — marketing homepage with the pot-creation widget | Server-rendered, hydrates the form widget on the client |
| `/app/pot` | `app.collctiv.com/pot` — dynamic pot information screen | Reads the saved pot from `localStorage`, redirects back to `/` if none exists |

## Architectural decisions

### Cross-domain state hand-off

The brief asks us to treat the homepage and the pot screen as two separate
domains (`collctiv.com` and `app.collctiv.com`). In a real deployment they
would be different origins and could not share an in-memory store, so the
state hand-off has to happen through something the browser shares across
origins for the same eTLD+1 (a cookie scoped to the apex domain) or, more
practically for a coding exercise, through a per-origin store on each side
plus a redirect-URL / `postMessage` hand-off.

For this challenge I picked **`localStorage` keyed on `collctiv:pot`** with a
typed `PotContext` wrapper around it (`src/context/PotContext.tsx`). The
context:

- Reads on mount (`useEffect`) so SSR stays clean and avoids hydration
  warnings.
- Exposes a `hydrated` flag so consumers can avoid flashing fallback UI
  before the read completes.
- Listens to the `storage` event so a second tab on the same origin stays in
  sync (a stand-in for the cross-domain broadcast we'd add in production).
- Centralises writes through `savePot` so validation lives in one place.

Trade-off: this only models the data side of the cross-domain boundary. In
production we would (a) carry the pot ID in the redirect URL, (b) cookie-
share on the apex domain, or (c) call a hosted session endpoint to exchange
a token. Those are intentionally out of scope for a client-only challenge.

### Routing

I leaned on Next.js's file-based routing rather than conditional rendering:

```
src/app/
├── layout.tsx          # provider chain (styled-components SSR → theme → pot context)
├── page.tsx            # collctiv.com homepage
└── app/pot/page.tsx    # app.collctiv.com pot screen
```

`useRouter().push("/app/pot")` is invoked from the create-pot widget so the
URL changes — which mirrors what a real domain change would look like to the
end user — and the new route reads independently from `localStorage`. The
`/app/pot` page also guards against direct visits by redirecting back to `/`
when no pot exists.

### Component organisation

```
src/
├── styles/        # theme, GlobalStyles, ThemeProvider, styled-components.d.ts
├── components/
│   ├── ui/        # primitives (Button, Input, Logo, Icons, Container)
│   ├── site/      # marketing-side composites (Header, Hero, CreatePotWidget…)
│   └── app/       # app-side composites (PotPreview)
├── context/       # PotContext
├── types/         # PotCategory, CreatedPot, storage key, length cap
├── test/          # renderWithProviders helper
└── lib/           # styled-components SSR registry
```

Primitives are deliberately tiny so they can be re-used; composites do the
layout work. The pot context is the only shared mutable state.

### Validation & input sanitation

- Both the category radio group and the name input are required; submitting
  with either missing shows inline `role="alert"` errors and keeps the user
  on the page.
- The name input is hard-capped at **50 characters** (`POT_NAME_MAX_LENGTH`),
  collapses runs of whitespace, and strips `<` / `>` so the rendered pot
  title can be dropped straight into JSX without HTML smuggling. The
  character count is shown live.
- The category buttons use proper ARIA: `role="radiogroup"` + `aria-checked`
  on each option.

### Accessibility

- Semantic landmarks (`<header>`, `<main>`, `<footer>`, `<section>`,
  `<nav>`).
- Form errors are wired to `aria-invalid` and `role="alert"`.
- The sign-up modal locks body scroll, closes on `Escape`, and exposes
  `aria-modal="true"` with an `aria-labelledby` title.
- Visible focus rings via `:focus-visible` (overridden globally).
- Icons that exist purely for decoration are `aria-hidden`.

### Responsive design

- Mobile-first CSS with `theme.media.*` breakpoints (`md` 768, `lg` 1024,
  `xl` 1280).
- The category grid collapses from 4 → 2 columns under 768px.
- The hero illustration is hidden on small screens to keep above-the-fold
  focus on the widget itself.
- The pot screen's action card wraps on narrow viewports; the invite tiles
  go from 6 → 3 columns.

### Animations

Framer-motion handles three micro-interactions:

- Error messages fade/slide in on submit.
- Pot name and amount on the success screen do a staggered fade-up so the
  hand-off from the homepage feels intentional.
- The sign-up modal uses a backdrop fade + dialog scale-in/-out.

## Testing

`npm test` runs three suites covering the critical paths:

- `CreatePotWidget.test.tsx` — validation states (missing category, missing
  name, both), input sanitisation, happy-path persistence + navigation.
- `PotPreview.test.tsx` — dynamic name rendering, every interactive button
  triggers the sign-up modal, modal close-and-reopen behaviour.
- `PotContext.test.tsx` — `savePot` persistence, `clearPot` cleanup,
  re-hydration from existing storage.

11 tests, ~1.3s.

## Trade-offs accepted for the time-box

1. **Hand-drawn SVGs** for the cheerleader hero, payment-method chips, and
   social icons rather than ripping the assets out of Figma. The brand
   gradient and silhouette are recognisable and the spacing matches the
   design, but a production build would use the licensed brand assets.
2. **One large `/` page** instead of splitting the marketing site into
   per-section components with their own data. The brief is focused on the
   creation journey, so I prioritised hero + creation widget fidelity over
   the lower-funnel sections (testimonials, FAQ, etc.). Those are stubbed in
   `Sections.tsx` so the page reads as complete but they are not
   pixel-perfect.
3. **`localStorage`-only persistence**. A real implementation would also set
   a cookie on the apex domain and exchange a short-lived signed token in
   the redirect URL — see the *Cross-domain state hand-off* note above.
4. **No real auth**. The "Sign up with Email" form on the modal accepts any
   name + email and shows a confirmation state; nothing is sent anywhere.
5. **Mobile QA at one viewport (390 × 844)**. The layout uses
   percentage- and breakpoint-driven CSS so it scales smoothly between
   breakpoints, but I did not exercise every viewport between 320 and
   1440px.
6. **Tests cover logic, not visuals**. Pixel diffs against the Figma frames
   would be the next thing to add (Playwright + Percy/Chromatic).
