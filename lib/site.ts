/**
 * Central site configuration.
 *
 * Placeholders wrapped in [SQUARE BRACKETS] must be filled in before going
 * live — see README.md "Placeholder checklist".
 */

export const siteConfig = {
  name: "Sepanta",
  legalName: "Sepanta LLC",
  // Canonical production URL (no trailing slash). Overridable via env.
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://sepanta.llc",
  description:
    "Sepanta LLC is a software company that builds apps and practical tools that solve everyday problems for people.",
  tagline: "We build apps that solve everyday problems.",

  // ── Contact / legal details (fill these in — see README) ──────────────
  contactEmail: "[YOUR EMAIL]", // e.g. hello@sepanta.llc
  address: "[YOUR ADDRESS]", // registered business address
  governingLawState: "Maryland",
  country: "United States",

  // ── Navigation ────────────────────────────────────────────────────────
  nav: [
    { label: "About", href: "/#about" },
    { label: "What We Do", href: "/#what-we-do" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

/** ISO date used as the "Last updated" stamp on the legal pages. */
export const LEGAL_LAST_UPDATED = "2026-07-01";

/** Human-readable version of {@link LEGAL_LAST_UPDATED}. */
export const LEGAL_LAST_UPDATED_LABEL = "July 1, 2026";
