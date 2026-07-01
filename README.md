# Sepanta LLC — Website

Marketing website for **Sepanta LLC**, built with **Next.js (App Router, TypeScript)** and **Tailwind CSS v4**, optimized for **Vercel**. Live at **https://sepanta.llc**.

## Tech stack

- [Next.js 15](https://nextjs.org/) (App Router, React 19, TypeScript)
- [Tailwind CSS v4](https://tailwindcss.com/) (CSS-first theme tokens)
- [lucide-react](https://lucide.dev/) icons
- [Resend](https://resend.com/) for the contact form email
- Fonts via `next/font`: **Space Grotesk** (headings) + **Inter** (body)

## Pages

| Route       | Description                                                    |
| ----------- | ------------------------------------------------------------- |
| `/`         | One-page landing (hero, about, what we do, CTA)               |
| `/contact`  | Contact form → `POST /api/contact` (Resend)                   |
| `/privacy`  | GDPR-compliant Privacy Policy                                 |
| `/terms`    | Terms & Conditions (governing law: Maryland, USA)             |
| `/api/contact` | Route handler that emails contact submissions             |

Plus `sitemap.xml`, `robots.txt`, a generated Open Graph image, and a 404 page — all via Next.js conventions.

## Local development

```bash
# 1. Install dependencies
npm install

# 2. Copy the environment template and fill it in (see checklist below)
cp .env.example .env.local

# 3. Start the dev server
npm run dev
# → http://localhost:3000

# Production build (also run before deploying)
npm run build
npm start
```

## Deploying to Vercel

1. Push this project to a Git repository (GitHub/GitLab/Bitbucket).
2. In [Vercel](https://vercel.com/new), **Import** the repository. Vercel auto-detects Next.js — no build config needed.
3. Under **Settings → Environment Variables**, add every variable listed in `.env.example` (see checklist below).
4. Deploy.

### Pointing the `sepanta.llc` domain at Vercel

1. In your Vercel project: **Settings → Domains → Add** → enter `sepanta.llc` (and optionally `www.sepanta.llc`).
2. Vercel shows the DNS records to create. In your domain registrar's DNS settings:
   - For the apex `sepanta.llc`: add an **A record** to the IP Vercel provides (or an `ALIAS`/`ANAME` to `cname.vercel-dns.com` if your registrar supports it).
   - For `www`: add a **CNAME** record pointing to `cname.vercel-dns.com`.
3. Wait for DNS to propagate; Vercel provisions the SSL certificate automatically.
4. Set `NEXT_PUBLIC_SITE_URL=https://sepanta.llc` in the Vercel environment variables so canonical URLs, the sitemap, and robots use the right host.

## Contact form / email setup (Resend)

The contact form posts to `app/api/contact/route.ts`, which sends an email via Resend.

1. Create a Resend account and an **API key**.
2. **Verify your sending domain** in Resend (e.g. `sepanta.llc`) and set `CONTACT_FROM_EMAIL` to an address on that domain (e.g. `no-reply@sepanta.llc`). For quick testing you can use Resend's `onboarding@resend.dev`.
3. Set `CONTACT_EMAIL` to the inbox that should receive submissions.
4. Add `RESEND_API_KEY`, `CONTACT_EMAIL`, and `CONTACT_FROM_EMAIL` in `.env.local` and in Vercel.

Until these are set, the form returns a friendly "not configured yet" message instead of sending.

---

## ✅ Go-live checklist

### Environment variables (set in `.env.local` and in Vercel)

| Variable              | Required | Purpose                                                        |
| --------------------- | :------: | -------------------------------------------------------------- |
| `RESEND_API_KEY`      |   Yes    | Resend API key used to send contact-form emails                |
| `CONTACT_EMAIL`       |   Yes    | Inbox that receives contact-form submissions                   |
| `CONTACT_FROM_EMAIL`  | Optional | Verified Resend sender (defaults to `onboarding@resend.dev`)   |
| `NEXT_PUBLIC_SITE_URL`| Optional | Canonical site URL (defaults to `https://sepanta.llc`)         |

### Content placeholders to replace

All placeholders live in **`lib/site.ts`** unless noted:

- [ ] `contactEmail` — replace `[YOUR EMAIL]` with your real contact email (used on the contact page, privacy policy, and terms).
- [ ] `address` — replace `[YOUR ADDRESS]` with your registered business address (used in the privacy policy data-controller section and the contact page).
- [ ] `governingLawState` / `country` — confirm **Maryland / United States** are correct for your Terms.
- [ ] `LEGAL_LAST_UPDATED` / `LEGAL_LAST_UPDATED_LABEL` — set the "Last updated" date shown on `/privacy` and `/terms`.
- [ ] **Privacy Policy** (`app/privacy/page.tsx`) — review the data-retention period placeholder and the "additional processors" placeholder, and confirm the listed processors (Vercel, Resend) match reality.
- [ ] **Analytics** (`components/Analytics.tsx`) — optional: wire up Vercel Analytics or Google Analytics inside the consent-gated block (a commented example is included). Nothing loads until the visitor accepts.

### Legal review

> ⚠️ The Privacy Policy and Terms & Conditions are **templates**, not legal advice. Have them reviewed by a qualified lawyer before publishing. (A disclaimer comment is included at the top of each legal page's source.)

### Nice-to-haves

- [ ] Replace the generated Open Graph image (`app/opengraph-image.tsx`) if you want custom artwork.
- [ ] Add a real favicon set if you need more than the SVG icon (`app/icon.svg`).

---

## Project structure

```
sepanta-website/
├── app/
│   ├── layout.tsx            # Shared shell: fonts, metadata, nav, footer, cookie banner
│   ├── page.tsx              # Home (one-page landing)
│   ├── globals.css           # Tailwind v4 + design tokens
│   ├── icon.svg              # Favicon
│   ├── opengraph-image.tsx   # Generated OG image
│   ├── sitemap.ts            # sitemap.xml
│   ├── robots.ts             # robots.txt
│   ├── not-found.tsx         # 404
│   ├── contact/page.tsx
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   └── api/contact/route.ts  # Contact form handler (Resend)
├── components/               # Navbar, Footer, Logo, CookieConsent, Analytics, ContactForm, …
├── lib/
│   ├── site.ts               # Central site config + placeholders
│   └── cookie-consent.ts     # Consent state helpers
└── public/logo.svg
```

## Accessibility & privacy notes

- Semantic HTML, a "skip to content" link, visible keyboard focus states, and labelled form fields.
- Respects `prefers-reduced-motion` (scroll animations are disabled).
- **Privacy-first cookie consent:** no non-essential scripts load until the visitor explicitly accepts. Choice is stored in `localStorage` and changeable anytime via the footer "Cookie Settings" link.
