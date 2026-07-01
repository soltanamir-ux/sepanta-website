/**
 * Small helpers for GDPR cookie-consent state, shared by the banner
 * (components/CookieConsent.tsx) and the footer "Cookie Settings" link.
 *
 * Consent is stored in localStorage only — no cookies are set and no
 * non-essential scripts load until the user explicitly accepts.
 */

export const CONSENT_STORAGE_KEY = "sepanta-cookie-consent";

/** Fired to re-open the preferences banner (e.g. from the footer link). */
export const OPEN_PREFERENCES_EVENT = "sepanta:open-cookie-preferences";

/** Fired whenever consent changes so listeners can (de)activate scripts. */
export const CONSENT_CHANGE_EVENT = "sepanta:cookie-consent-change";

export type ConsentValue = "accepted" | "rejected";

export function getStoredConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  return value === "accepted" || value === "rejected" ? value : null;
}

export function setStoredConsent(value: ConsentValue): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  window.dispatchEvent(new CustomEvent<ConsentValue>(CONSENT_CHANGE_EVENT, { detail: value }));
}

/** Ask the banner to re-open so the user can change their choice. */
export function openCookiePreferences(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT));
}
