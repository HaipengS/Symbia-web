# Symbia

Symbia is a brand and materials website for Kombucha Bioleather: a bacterial-cellulose material grown from a symbiotic culture of bacteria and yeast, rather than conventionally manufactured or chrome tanned.

The current site is a brand, research and partnership experience. It introduces the material, documents Symbia's work and impact, presents the product archive, and turns visitor interest into waitlist registrations or qualified enquiries.

## Live product scope

| Route | Purpose |
| --- | --- |
| `/` | Animated wordmark introduction, process, community impact, work archive and waitlist entry points. |
| `/about` | Brand and material story, timeline, product categories, video and press coverage. |
| `/impact` | Community training programmes and measurable impact. |
| `/research` | Supplier partnership proposition and six-step feedstock workflow. |
| `/gallery` | Editorial archive of products, materials and events. |
| `/contact` | Topic-led contact form for general, partnership and supplier enquiries. |

The homepage is intentionally separate from the shared site layout: its logo animation transitions into the navigation on scroll. All other public routes share the static navbar and footer.

## Stack

- Next.js 16 with the App Router
- React 19 and TypeScript
- Tailwind CSS 4
- Supabase for best-effort archival records
- Google Sheets as the operational waitlist tracker
- Resend for contact-notification email
- Vercel for preview and production deployment

## Repository map

```text
app/
  page.tsx                 Homepage and animated logo introduction
  (site)/                  Shared shell and public content routes
  actions/                 Waitlist and contact server actions
components/                Navigation, forms, galleries and editorial UI
lib/                       Integrations, validation, rate limiting and shared state
data/                      Data-driven gallery content
public/                    Brand, material, process, product and event media
Server/                    Local FastAPI chatbot prototype and knowledge base
```

`Server/` is an experimental local chatbot service. It is not part of the deployed visitor flow unless its API is separately deployed and configured.

## Local development

### Requirements

- Node.js 20 or later
- npm

### Run the site

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Verify a change

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Environment configuration

Create a local `.env.local` file. Never commit it or paste its values into issues, pull requests, screenshots or documentation.

| Variable | Required for | Notes |
| --- | --- | --- |
| `GOOGLE_SHEETS_CLIENT_EMAIL` | Waitlist tracker | Service-account email with Editor access to the target sheet. |
| `GOOGLE_SHEETS_PRIVATE_KEY` | Waitlist tracker | Store escaped newlines as `\\n`. |
| `WAITLIST_SHEET_ID` | Waitlist tracker | Google Sheet ID. |
| `WAITLIST_SHEET_TAB` | Waitlist tracker | Optional; defaults to `Sheet1`. |
| `RESEND_API_KEY` | Contact email | Enables notification emails. |
| `CONTACT_FROM_EMAIL` | Contact email | A verified Resend sender, e.g. `Symbia <notifications@symbia.studio>`. |
| `CONTACT_TO_EMAIL` | Contact email | Optional recipient override; defaults to the configured Symbia contact address. |
| `NEXT_PUBLIC_SUPABASE_URL` | Archive mirror | Supabase project URL. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` or `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Archive mirror | Public Supabase key; the app accepts either supported name. |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side archive mirror | Keep server-only; never expose it with a `NEXT_PUBLIC_` prefix. |

### Form delivery model

Waitlist signups are written to Google Sheets as the primary working tracker. Supabase is a best-effort mirror, so a temporary Supabase outage does not discard a signup.

Contact submissions first attempt an email notification through Resend and then attempt a Supabase archive copy. A visitor sees a failure only when neither delivery path succeeds.

Both public forms validate and normalize server-side, write spreadsheet values as literal text, protect email headers, and apply a per-address in-memory rate limit of five submissions per 15 minutes. The in-memory limiter is a pragmatic baseline; a multi-instance retail product should replace it with a shared Redis/KV-backed limiter.

## Design and content principles

- The site is editorial first: material, process and proof are more important than generic sustainability claims.
- About tells the brand and product story; Impact owns training and metrics; Research owns the supplier proposition. Avoid repeating the same facts across all three.
- Use real, attributable imagery and describe what is shown rather than implying an unsupported supply-chain claim.
- Preserve the warm-white, earth, coral and blush palette; display type is Roxborough CF and body type is Inter.
- The responsive container is designed around a wide editorial layout with progressive gutters. Check desktop and mobile when changing any grid or media crop.

## Deployment

The project is designed to deploy on Vercel. Configure production environment variables in the Vercel project before enabling forms.

The delivered GitHub pull request was merged into `main` as commit `e809910` on 2026-08-06. Its Vercel status was successful; Supabase Preview was intentionally skipped.

## Future plan: Symbia retail phase

The current website establishes the brand, partnership pipeline and product evidence. The next phase can turn it into a retail experience once product assortment, fulfillment and market requirements are confirmed.

### Phase 1 — Commerce foundation

- Define product catalogue data: SKU, material/story, variants, dimensions, care instructions, price, inventory and product photography.
- Add a dedicated sales area: `/shop`, collection pages and individual `/products/[slug]` product-detail pages.
- Build reusable storefront components for product cards, image galleries, variant selection, availability, size/care information and related products.
- Choose and integrate a commerce backend and payment provider, then model tax, shipping regions, returns and order-confirmation emails before accepting live payments.

### Phase 2 — Checkout and customer accounts

- Add cart and checkout, including stock validation, shipping calculation, payment confirmation and order-status communication.
- Add user login, registration, password reset and secure session management.
- Provide an account area for profile settings, saved addresses, order history, order tracking and returns/support requests.
- Add privacy policy, terms, returns policy, consent handling and appropriate retention/deletion controls before storing customer data.

### Phase 3 — Retail operations and growth

- Build an internal product and order operations workflow, or integrate the selected commerce platform's admin tools.
- Support limited drops, pre-orders or made-to-order products where material availability is variable.
- Add inventory alerts, fulfillment status, customer support handoff and analytics for conversion, retention and campaign attribution.
- Consider an authenticated wholesale/partner portal only after the public retail workflow is stable.

### Before implementation begins

The retail phase needs explicit choices on the commerce platform, payment provider, countries/currencies, taxes, fulfillment partner, returns policy, inventory source of truth and whether products are in-stock, made-to-order or pre-order. Those choices determine the data model and should be settled before building login or checkout screens.

## Contribution notes

- Keep secrets in `.env.local`; `.env*` is ignored by Git.
- Do not commit generated folders such as `.next/` or `node_modules/`.
- Treat content claims, impact figures and external press links as source-backed editorial content; verify them before publishing changes.
- Run lint, type checking and a production build before opening a pull request.
