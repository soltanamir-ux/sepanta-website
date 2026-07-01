"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";
import {
  OPEN_PREFERENCES_EVENT,
  getStoredConsent,
  setStoredConsent,
} from "@/lib/cookie-consent";

/**
 * GDPR cookie-consent banner.
 *
 * - Shown on first visit (no stored choice).
 * - "Accept" / "Reject" / "Cookie Settings" options.
 * - Choice is persisted in localStorage; non-essential scripts are gated
 *   by that choice in components/Analytics.tsx — nothing non-essential
 *   loads until the user accepts.
 * - Re-opens when the footer "Cookie Settings" link dispatches
 *   OPEN_PREFERENCES_EVENT.
 */
export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analyticsOn, setAnalyticsOn] = useState(false);

  // Avoid hydration mismatch: decide visibility only on the client.
  useEffect(() => {
    setMounted(true);
    const stored = getStoredConsent();
    if (stored === null) {
      setVisible(true);
    } else {
      setAnalyticsOn(stored === "accepted");
    }
  }, []);

  // Re-open from the footer "Cookie Settings" link.
  useEffect(() => {
    const openPrefs = () => {
      setAnalyticsOn(getStoredConsent() === "accepted");
      setShowSettings(true);
      setVisible(true);
    };
    window.addEventListener(OPEN_PREFERENCES_EVENT, openPrefs);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, openPrefs);
  }, []);

  const close = useCallback(() => {
    setVisible(false);
    setShowSettings(false);
  }, []);

  const accept = useCallback(() => {
    setStoredConsent("accepted");
    close();
  }, [close]);

  const reject = useCallback(() => {
    setStoredConsent("rejected");
    close();
  }, [close]);

  const savePreferences = useCallback(() => {
    setStoredConsent(analyticsOn ? "accepted" : "rejected");
    close();
  }, [analyticsOn, close]);

  if (!mounted || !visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="mx-auto max-w-2xl rounded-2xl border border-line bg-elevated/95 p-5 shadow-2xl shadow-black/60 backdrop-blur-md sm:p-6">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 hidden rounded-lg bg-accent/15 p-2 text-accent sm:inline-flex" aria-hidden="true">
            <Cookie size={20} />
          </span>
          <div className="flex-1">
            <h2 id="cookie-consent-title" className="text-base font-semibold text-ink">
              We value your privacy
            </h2>
            <p id="cookie-consent-desc" className="mt-1 text-sm leading-relaxed text-muted">
              We use essential cookies to make our site work. With your consent we may also use
              analytics cookies to understand how the site is used. You can change your choice at any
              time. Read our{" "}
              <Link href="/privacy" className="text-accent underline underline-offset-2 hover:text-glow">
                Privacy Policy
              </Link>
              .
            </p>

            {showSettings && (
              <fieldset className="mt-4 space-y-3 rounded-xl border border-line bg-surface/60 p-4">
                <legend className="sr-only">Cookie preferences</legend>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-ink">Essential cookies</p>
                    <p className="text-xs text-muted">Required for the site to function. Always on.</p>
                  </div>
                  <span className="rounded-full bg-line px-2.5 py-1 text-xs font-medium text-muted">
                    Always on
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 border-t border-line pt-3">
                  <label htmlFor="analytics-toggle" className="cursor-pointer">
                    <span className="block text-sm font-medium text-ink">Analytics cookies</span>
                    <span className="block text-xs text-muted">
                      Help us improve by measuring anonymous usage.
                    </span>
                  </label>
                  <input
                    id="analytics-toggle"
                    type="checkbox"
                    checked={analyticsOn}
                    onChange={(e) => setAnalyticsOn(e.target.checked)}
                    className="h-5 w-5 shrink-0 cursor-pointer accent-accent"
                  />
                </div>
              </fieldset>
            )}

            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
              {showSettings ? (
                <button
                  type="button"
                  onClick={savePreferences}
                  className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-midnight transition-colors hover:bg-accent-strong"
                >
                  Save preferences
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={accept}
                    className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-midnight transition-colors hover:bg-accent-strong"
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    onClick={reject}
                    className="rounded-full border border-line bg-transparent px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-surface"
                  >
                    Reject
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSettings(true)}
                    className="rounded-full px-4 py-2 text-sm font-semibold text-muted transition-colors hover:text-ink"
                  >
                    Cookie Settings
                  </button>
                </>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={reject}
            aria-label="Dismiss and reject non-essential cookies"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-muted transition-colors hover:text-ink"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
