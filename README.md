# Collctiv - Pot Creation Journey

A client-side build of the Collctiv pot-creation flow. You land on the
marketing homepage (`collctiv.com`), pick a category, name a pot, and get
dropped onto a dynamically-rendered pot screen on the simulated
`app.collctiv.com` subdomain. Any action on that second screen pops a sign-up
modal.

Built with Next.js 16 (App Router) + TypeScript, styled-components,
framer-motion for a few small animations, and Vitest for tests.

---

## 1. Running it locally

Node 20+.

```bash
npm install
npm run dev          # http://localhost:3000

npm test             # one-shot Vitest run
npm run test:watch
npm run build
```

Two routes:

| URL | What it represents |
| --- | --- |
| `/` | `collctiv.com` - marketing page + pot-creation widget |
| `/app/pot` | `app.collctiv.com/pot` - the pot screen. Redirects to `/` if there's no pot in storage. |

---

## 2. How I thought about it

### The "cross-domain" hand-off

The two screens are meant to live on different origins, which means they can't share an in-memory store. 
For a client-only exercise I went with **`localStorage` under the key
`collctiv:pot`**, wrapped in a small `PotContext`
([src/context/PotContext.tsx](src/context/PotContext.tsx)). The context:

- Reads on mount inside `useEffect` so SSR doesn't blow up and there are no hydration mismatches.
- Has a `hydrated` flag so the pot screen doesn't flash fallback UI before the read finishes.
- Listens to the `storage` event so a second tab stays in sync - that's the same-origin stand-in for the cross-origin broadcast you'd want in production.
- Funnels every write through `savePot` so the sanitisation/validation rules live in one place.

After the user submits the widget, `useRouter().push("/app/pot")` changes the URL (so the address bar reflects the "domain change" the user would see for real) and the next route reads the pot independently. It's deliberately not a prop drill or a shared module import - I wanted the two screens to be as disconnected as they'd be in production.

### Routing & architecture

Next's file-based routing rather than conditional rendering on `/`:

```
src/app/
├── layout.tsx          # styled-components SSR → theme → pot context
├── page.tsx            # collctiv.com
└── app/pot/page.tsx    # app.collctiv.com/pot

src/components/
├── ui/             # primitives (Button, TextInput, Modal, …)
├── illustrations/  # large inline SVGs
├── shared/         # composites used by both site and app (SignUpModal)
├── site/           # marketing chrome (Hero, SiteHeader/Footer, CreatePotWidget)
│   └── landing/    # landing-page sections + their data/utils
└── app/            # app-side composites (PotPreview, PotFooter, InvitePanel)
```

The primitives are intentionally small so they can be reused; the composites
do the layout. The pot context is the only piece of shared mutable state.

### Additional info

- Both the category and the name are required in the form. Submitting without them shows inline `role="alert"` errors and keeps you on the page.
- The name input is capped at 50 chars, whitespace is collapsed, and `<` / `>` are stripped so the title can be rendered as plain JSX without sneaking markup in.
- The category group is a proper `role="radiogroup"` wth `aria-checked` on each option.
- The sign-up modal locks body scroll, closes on Escape, and has the usual `aria-modal` / `aria-labelledby` wiring.
- Layout is mobile-first; the category grid and the invite tiles each drop to fewer columns under 768px.

---

## 3. Trade-offs due to time

1. **`localStorage`-only state hand-off.** A real build would also set a cookie on the apex domain and pass a signed token in the redirect URL - see the section above.  
2. **No real auth.** The sign-up modal accepts any name + email and shows a confirmation state. Nothing is actually sent anywhere.
3. **Mobile QA on one viewport (390 × 844).** Layout is breakpoint-driven so
   it scales reasonably, but I didn't manually walk every viewport from
   320 → 1440.
4. **Tests are logic-only.** Validation states, input sanitisation, the happy-path persistence + navigation, the modal intercepting every CTA, and the `PotContext` persistence/clear/re-hydration are all covered. E2E tests using Playwright or Cypress would be step forward but manual testing is okay for this context. 
